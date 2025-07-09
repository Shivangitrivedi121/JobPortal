import React, { useState } from 'react';
import { Briefcase, Users, Eye, Edit3, Trash2, Plus, Calendar, DollarSign, MapPin } from 'lucide-react';

const MyJobs = () => {
  const [activeTab, setActiveTab] = useState('active');

  // Sample jobs data
  const sampleJobs = [
    {
      _id: '1',
      title: 'Senior Frontend Developer',
      description: 'We are looking for an experienced frontend developer to join our dynamic team.',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: { min: 120000, max: 160000 },
      type: 'full-time',
      requirements: ['React', 'TypeScript', 'CSS', 'JavaScript', 'Git'],
      benefits: ['Health Insurance', 'Remote Work', '401k'],
      applications: ['1', '2', '3', '4', '5'],
      isActive: true,
      createdAt: '2024-01-15',
      expiresAt: '2024-02-15'
    },
    {
      _id: '2',
      title: 'Full Stack Engineer',
      description: 'Join our startup as a full stack engineer. Work on cutting-edge technology.',
      company: 'TechCorp Inc.',
      location: 'New York, NY',
      salary: { min: 100000, max: 140000 },
      type: 'full-time',
      requirements: ['Node.js', 'React', 'MongoDB', 'Express', 'AWS'],
      benefits: ['Equity', 'Flexible Hours', 'Learning Budget'],
      applications: ['6', '7'],
      isActive: true,
      createdAt: '2024-01-10',
      expiresAt: '2024-02-10'
    },
    {
      _id: '3',
      title: 'UI/UX Designer',
      description: 'We are seeking a creative UI/UX designer to create amazing user experiences.',
      company: 'TechCorp Inc.',
      location: 'Remote',
      salary: { min: 80000, max: 110000 },
      type: 'full-time',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      benefits: ['Remote Work', 'Creative Freedom', 'Conference Budget'],
      applications: ['8'],
      isActive: false,
      createdAt: '2024-01-05',
      expiresAt: '2024-02-05'
    }
  ];

  const activeJobs = sampleJobs.filter(job => job.isActive);
  const inactiveJobs = sampleJobs.filter(job => !job.isActive);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleEdit = (jobId) => {
    alert(`Edit job ${jobId} - This would open the edit form`);
  };

  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      alert(`Delete job ${jobId} - This would delete the job`);
    }
  };

  const handleToggleStatus = (jobId) => {
    alert(`Toggle status for job ${jobId} - This would activate/deactivate the job`);
  };

  const JobCard = ({ job }) => {
    const daysUntilExpiry = getDaysUntilExpiry(job.expiresAt);
    
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                job.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {job.isActive ? 'Active' : 'Inactive'}
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
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {job.type}
              </span>
            </div>
            <p className="text-gray-700 text-sm line-clamp-2 mb-3">{job.description}</p>
          </div>
        </div>

        {/* Applications and Expiry Info */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-blue-600">
              <Users className="w-4 h-4 mr-1" />
              <span className="font-medium">{job.applications.length} applications</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {daysUntilExpiry > 0 
                  ? `Expires in ${daysUntilExpiry} days`
                  : 'Expired'
                }
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Posted {formatDate(job.createdAt)}
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
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

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleEdit(job._id)}
              className="flex items-center px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              Edit
            </button>
            <button
              onClick={() => handleToggleStatus(job._id)}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                job.isActive
                  ? 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50'
                  : 'text-green-600 hover:text-green-700 hover:bg-green-50'
              }`}
            >
              {job.isActive ? 'Deactivate' : 'Activate'}
            </button>
            <button
              onClick={() => handleDelete(job._id)}
              className="flex items-center px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              View Applications
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
          <p className="text-gray-600 mt-1">Manage your job postings and applications</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
          <Plus className="w-4 h-4 mr-2" />
          Post New Job
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{sampleJobs.length}</div>
          <div className="text-sm text-gray-600">Total Jobs</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{activeJobs.length}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {sampleJobs.reduce((total, job) => total + job.applications.length, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Applications</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(sampleJobs.reduce((total, job) => total + job.applications.length, 0) / sampleJobs.length)}
          </div>
          <div className="text-sm text-gray-600">Avg Applications</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('active')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'active'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Active Jobs ({activeJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('inactive')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'inactive'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Inactive Jobs ({inactiveJobs.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'active' && (
            <div className="space-y-6">
              {activeJobs.length > 0 ? (
                activeJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active jobs</h3>
                  <p className="text-gray-500 mb-4">Post your first job to start receiving applications</p>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                    Post a Job
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'inactive' && (
            <div className="space-y-6">
              {inactiveJobs.length > 0 ? (
                inactiveJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No inactive jobs</h3>
                  <p className="text-gray-500">Jobs that are closed or expired will appear here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyJobs;