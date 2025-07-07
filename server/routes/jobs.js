const express = require('express');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Rating = require('../models/Rating');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all jobs (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, location, type } = req.query;
    const query = { isActive: true };

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (type) {
      query.type = type;
    }

    const jobs = await Job.find(query)
      .populate('postedBy', 'name email')
      .populate('applications')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Add ratings to jobs
    const jobsWithRatings = await Promise.all(
      jobs.map(async (job) => {
        const ratings = await Rating.find({ job: job._id });
        const averageRating = ratings.length > 0 
          ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
          : 0;

        return {
          ...job.toObject(),
          ratings,
          averageRating: Math.round(averageRating * 10) / 10
        };
      })
    );

    const total = await Job.countDocuments(query);

    res.json({
      jobs: jobsWithRatings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email')
      .populate({
        path: 'applications',
        populate: {
          path: 'applicant',
          select: 'name email'
        }
      });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Get ratings
    const ratings = await Rating.find({ job: job._id }).populate('user', 'name');
    const averageRating = ratings.length > 0 
      ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
      : 0;

    res.json({
      ...job.toObject(),
      ratings,
      averageRating: Math.round(averageRating * 10) / 10
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create job (employer only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'employer' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const job = new Job({
      ...req.body,
      postedBy: req.user.userId
    });

    await job.save();
    await job.populate('postedBy', 'name email');

    res.status(201).json(job);
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update job (employer only)
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user owns the job or is admin
    if (job.postedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('postedBy', 'name email');

    res.json(updatedJob);
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete job (employer only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user owns the job or is admin
    if (job.postedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Rate job (authenticated users only)
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const jobId = req.params.id;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user has already rated this job
    const existingRating = await Rating.findOne({
      job: jobId,
      user: req.user.userId
    });

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      existingRating.comment = comment;
      await existingRating.save();
      await existingRating.populate('user', 'name');
      res.json(existingRating);
    } else {
      // Create new rating
      const newRating = new Rating({
        job: jobId,
        user: req.user.userId,
        rating,
        comment
      });

      await newRating.save();
      await newRating.populate('user', 'name');
      res.status(201).json(newRating);
    }
  } catch (error) {
    console.error('Rate job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;