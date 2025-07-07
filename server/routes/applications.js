const express = require('express');
const Application = require('../models/Application');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// Apply for job
router.post('/', auth, async (req, res) => {
  try {
    const { jobId, coverLetter, resume } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.userId
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Create application
    const application = new Application({
      job: jobId,
      applicant: req.user.userId,
      coverLetter,
      resume
    });

    await application.save();
    
    // Add application to job
    job.applications.push(application._id);
    await job.save();

    await application.populate('applicant', 'name email');
    await application.populate('job', 'title company');

    res.status(201).json(application);
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's applications
router.get('/my-applications', auth, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.userId })
      .populate('job', 'title company location salary type createdAt')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get applications for employer's jobs
router.get('/employer-applications', auth, async (req, res) => {
  try {
    if (req.user.role !== 'employer' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get all jobs posted by the employer
    const jobs = await Job.find({ postedBy: req.user.userId }).select('_id');
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('applicant', 'name email profile')
      .populate('job', 'title company location')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get employer applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status (employer only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status, notes, interviewDate, feedback } = req.body;
    
    const application = await Application.findById(req.params.id)
      .populate('job', 'postedBy');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user owns the job or is admin
    if (application.job.postedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    application.status = status;
    if (notes) application.notes = notes;
    if (interviewDate) application.interviewDate = interviewDate;
    if (feedback) application.feedback = feedback;

    await application.save();
    await application.populate('applicant', 'name email');
    await application.populate('job', 'title company');

    res.json(application);
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all applications (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const applications = await Application.find()
      .populate('applicant', 'name email')
      .populate('job', 'title company location postedBy')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get all applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;