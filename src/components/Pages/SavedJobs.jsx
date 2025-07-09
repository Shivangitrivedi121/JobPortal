import React, { useState } from 'react';
import { Bookmark, Trash2, ExternalLink, MapPin, Clock, DollarSign, Star } from 'lucide-react';
import JobCard from '../Jobs/JobCard';

const SavedJobs = () => {
  // Sample saved jobs data
  const [savedJobs, setSavedJobs] = useState([
    {
      _id: '1',
      title: 'Senior Frontend Developer',
      description: 'We are looking for an experienced frontend developer to join our dynamic team. You will be responsible for building user-facing features and ensuring great user experience.',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: { min: 120000, max: 160000 },
      type: 'full-time',
      requirements: ['React', 'TypeScript', 'CSS', 'JavaScript', 'Git'],
      benefits: ['Health Insurance', 'Remote Work', '401k'],
      postedBy: 'employer1',
      applications: ['1', '2', '3'],
      ratings: [],
      averageRating: 4.5,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      savedDate: '2024-01-15'
    },
    {
      _id: '2',
      title: 'UI/UX Designer',
      description: 'We are seeking a creative UI/UX designer to create amazing user experiences. You will work closely with our product team.',
      company: 'Design Studio',
      location: 'Remote',
      salary: { min: 80000, max: 110000 },
      type: 'full-time',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      benefits: ['Remote Work', 'Creative Freedom', 'Conference Budget'],
      postedBy: 'employer3',
      applications: ['6'],
      ratings: [],
      averageRating: 4.8,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      savedDate: '2024-01-12'
    },
    {
      _id: '3',
      title: 'DevOps Engineer',
      description: 'Join our infrastructure team to help scale our platform. Experience with cloud technologies required.',
      company: 'CloudFirst',
      location: 'Seattle, WA',
      salary: { min: 110000, max: 150000 },
      type: 'full-time',
      requirements: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
      benefits: ['Remote Work', 'Learning Budget', 'Stock Options'],
      postedBy: 'employer5',
      applications: ['10'],
      ratings: [],
      averageRating: 4.6,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      savedDate: '2024-01-10'
    }
  ]);

  const handleRemoveFromSaved = (jobId) => {
    setSavedJobs(savedJobs.filter(job => job._id !== jobId));
  };

  const handleApply = (jobId) => {
    alert(`Applied to job ${jobId}! This would normally submit an application.`);
  };

  const handleSave = (jobId) => {
    // This would normally toggle the save status
    alert(`Job ${jobId} save status toggled!`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
          <p className="text-gray-600 mt-1">Jobs you've bookmarked for later</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Bookmark className="w-4 h-4" />
          <span>{savedJobs.length} saved jobs</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{savedJobs.length}</div>
            <div className="text-sm text-gray-600">Total Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {savedJobs.filter(job => job.type === 'full-time').length}
            </div>
            <div className="text-sm text-gray-600">Full-time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {savedJobs.filter(job => job.location.includes('Remote')).length}
            </div>
            <div className="text-sm text-gray-600">Remote</div>
          </div>
        </div>
      </div>

      {/* Saved Jobs List */}
      {savedJobs.length > 0 ? (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <div key={job._id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Saved {formatDate(job.savedDate)}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium mb-2">{job.company}</p>
                  <div className="flex items-center text-gray-500 text-sm space-x-4 mb-3">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-2 mb-3">{job.description}</p>
                  
                  {/* Requirements */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements.slice(0, 4).map((req, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                      >
                        {req}
                      </span>
                    ))}
                    {job.requirements.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                        +{job.requirements.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {job.averageRating > 0 && (
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-yellow-700">{job.averageRating.toFixed(1)}</span>
                    </div>
                  )}
                  <button
                    onClick={() => handleRemoveFromSaved(job._id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Posted {formatDate(job.createdAt)}
                  </div>
                  <span>{job.applications.length} applications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleApply(job._id)}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs yet</h3>
          <p className="text-gray-500 mb-4">Start saving jobs you're interested in to see them here</p>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            Browse Jobs
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;