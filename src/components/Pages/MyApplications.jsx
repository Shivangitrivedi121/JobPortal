import React, { useState } from 'react';
import { FileText, MapPin, Clock, Eye, Filter, Calendar } from 'lucide-react';

const MyApplications = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Sample applications data
  const sampleApplications = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      status: 'pending',
      appliedDate: '2024-01-15',
      salary: '$120,000 - $160,000',
      type: 'full-time',
      coverLetter: 'I am excited to apply for this position...',
      resume: 'john_doe_resume.pdf',
      notes: '',
      interviewDate: null,
      feedback: ''
    },
    {
      id: '2',
      jobTitle: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      status: 'interview',
      appliedDate: '2024-01-10',
      salary: '$100,000 - $140,000',
      type: 'full-time',
      coverLetter: 'With my experience in full stack development...',
      resume: 'john_doe_resume.pdf',
      notes: 'Technical interview scheduled',
      interviewDate: '2024-01-20',
      feedback: 'Great technical skills, moving to next round'
    },
    {
      id: '3',
      jobTitle: 'UI/UX Designer',
      company: 'Design Studio',
      location: 'Remote',
      status: 'accepted',
      appliedDate: '2024-01-05',
      salary: '$80,000 - $110,000',
      type: 'full-time',
      coverLetter: 'As a passionate designer...',
      resume: 'john_doe_resume.pdf',
      notes: 'Offer accepted',
      interviewDate: '2024-01-12',
      feedback: 'Excellent portfolio and communication skills'
    },
    {
      id: '4',
      jobTitle: 'Backend Developer',
      company: 'DataTech Solutions',
      location: 'Austin, TX',
      status: 'rejected',
      appliedDate: '2024-01-08',
      salary: '$95,000 - $130,000',
      type: 'full-time',
      coverLetter: 'I would like to contribute to your backend team...',
      resume: 'john_doe_resume.pdf',
      notes: 'Position filled',
      interviewDate: null,
      feedback: 'Strong candidate but position was filled internally'
    },
    {
      id: '5',
      jobTitle: 'DevOps Engineer',
      company: 'CloudFirst',
      location: 'Seattle, WA',
      status: 'reviewed',
      appliedDate: '2024-01-12',
      salary: '$110,000 - $150,000',
      type: 'full-time',
      coverLetter: 'My experience with cloud infrastructure...',
      resume: 'john_doe_resume.pdf',
      notes: 'Application under review',
      interviewDate: null,
      feedback: ''
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'interview':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'interview':
        return <Calendar className="w-4 h-4" />;
      case 'accepted':
        return <FileText className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredApplications = statusFilter 
    ? sampleApplications.filter(app => app.status === statusFilter)
    : sampleApplications;

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.appliedDate) - new Date(a.appliedDate);
    }
    if (sortBy === 'company') {
      return a.company.localeCompare(b.company);
    }
    if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const statusCounts = sampleApplications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600 mt-1">Track your job application progress</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{sampleApplications.length}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending || 0}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{statusCounts.interview || 0}</div>
          <div className="text-sm text-gray-600">Interview</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{statusCounts.accepted || 0}</div>
          <div className="text-sm text-gray-600">Accepted</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-red-600">{statusCounts.rejected || 0}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="interview">Interview</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Application Date</option>
              <option value="company">Company</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {sortedApplications.map((application) => (
          <div key={application.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{application.jobTitle}</h3>
                <p className="text-gray-600 font-medium mb-2">{application.company}</p>
                <div className="flex items-center text-gray-500 text-sm space-x-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {application.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Applied {formatDate(application.appliedDate)}
                  </div>
                  <span className="text-green-600 font-medium">{application.salary}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                  {getStatusIcon(application.status)}
                  <span className="ml-1 capitalize">{application.status}</span>
                </span>
              </div>
            </div>

            {application.interviewDate && (
              <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center text-purple-800">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-medium">Interview scheduled for {formatDate(application.interviewDate)}</span>
                </div>
              </div>
            )}

            {application.feedback && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-blue-800">
                  <span className="font-medium">Feedback: </span>
                  {application.feedback}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Resume: {application.resume}</span>
                <span className={`px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs`}>
                  {application.type}
                </span>
              </div>
              <button className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedApplications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-500">
            {statusFilter ? 'Try changing your filter criteria' : 'Start applying to jobs to see them here'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyApplications;