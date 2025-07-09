import React, { useState } from 'react';
import { Briefcase, Search, Filter, Eye, Edit3, Trash2, Users, Calendar } from 'lucide-react';

const AllJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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
      postedBy: {
        _id: 'emp1',
        name: 'Jane Smith',
        email: 'jane.smith@techcorp.com'
      },
      applications: ['1', '2', '3', '4', '5'],
      isActive: true,
      createdAt: '2024-01-15',
      expiresAt: '2024-02-15'
    },
    {
      _id: '2',
      title: 'Full Stack Engineer',
      description: 'Join our startup as a full stack engineer. Work on cutting-edge technology.',
      company: 'StartupXYZ',
      location: 'New York, NY',
      salary: { min: 100000, max: 140000 },
      type: 'full-time',
      requirements: ['Node.js', 'React', 'MongoDB', 'Express', 'AWS'],
      postedBy: {
        _id: 'emp2',
        name: 'Mike Johnson',
        email: 'mike@startupxyz.com'
      },
      applications: ['6', '7'],
      isActive: true,
      createdAt: '2024-01-10',
      expiresAt: '2024-02-10'
    },
    {
      _id: '3',
      title: 'UI/UX Designer',
      description: 'We are seeking a creative UI/UX designer to create amazing user experiences.',
      company: 'Design Studio',
      location: 'Remote',
      salary: { min: 80000, max: 110000 },
      type: 'full-time',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      postedBy: {
        _id: 'emp3',
        name: 'Sarah Wilson',
        email: 'sarah@designstudio.com'
      },
      applications: ['8'],
      isActive: false,
      createdAt: '2024-01-05',
      expiresAt: '2024-02-05'
    },
    {
      _id: '4',
      title: 'Marketing Intern',
      description: 'Great opportunity for students to gain experience in digital marketing.',
      company: 'Marketing Pro',
      location: 'Los Angeles, CA',
      salary: { min: 15, max: 20 },
      type: 'internship',
      requirements: ['Social Media', 'Content Creation', 'Analytics'],
      postedBy: {
        _id: 'emp4',
        name: 'David Brown',
        email: 'david@marketingpro.com'
      },
      applications: ['9', '10'],
      isActive: true,
      createdAt: '2024-01-12',
      expiresAt: '2024-02-12'
    }
  ];

  const filteredJobs = sampleJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === '' || job.type === typeFilter;
    const matchesStatus = statusFilter === '' || 
                         (statusFilter === 'active' && job.isActive) ||
                         (statusFilter === 'inactive' && !job.isActive);
    
    return matchesSearch && matchesType && matchesStatus;
  });

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

  const getTypeColor = (type) => {
    switch (type) {
      case 'full-time':
        return 'bg-blue-100 text-blue-800';
      case 'part-time':
        return 'bg-green-100 text-green-800';
      case 'contract':
        return 'bg-yellow-100 text-yellow-800';
      case 'internship':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewJob = (jobId) => {
    alert(`View job details for ${jobId}`);
  };

  const handleEditJob = (jobId) => {
    alert(`Edit job ${jobId}`);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      alert(`Delete job ${jobId}`);
    }
  };

  const handleToggleStatus = (jobId) => {
    alert(`Toggle status for job ${jobId}`);
  };

  const jobStats = {
    total: sampleJobs.length,
    active: sampleJobs.filter(j => j.isActive).length,
    totalApplications: sampleJobs.reduce((total, job) => total + job.applications.length, 0),
    avgApplications: Math.round(sampleJobs.reduce((total, job) => total + job.applications.length, 0) / sampleJobs.length)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Jobs</h1>
          <p className="text-gray-600 mt-1">Manage all job postings on the platform</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{jobStats.total}</div>
          <div className="text-sm text-gray-600">Total Jobs</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{jobStats.active}</div>
          <div className="text-sm text-gray-600">Active Jobs</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{jobStats.totalApplications}</div>
          <div className="text-sm text-gray-600">Total Applications</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{jobStats.avgApplications}</div>
          <div className="text-sm text-gray-600">Avg Applications</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.company}</div>
                      <div className="text-sm text-gray-500">{job.postedBy.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(job.type)}`}>
                        {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{job.applications.length}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        job.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {job.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {job.isActive && (
                        <div className="text-xs text-gray-500 mt-1">
                          Expires in {getDaysUntilExpiry(job.expiresAt)} days
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                      {formatDate(job.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewJob(job._id)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Job"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditJob(job._id)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit Job"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Job"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;