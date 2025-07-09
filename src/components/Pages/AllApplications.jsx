import React, { useState } from 'react';
import { FileText, Search, Filter, Eye, CheckCircle, XCircle, Clock, Calendar, User } from 'lucide-react';

const AllApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [jobFilter, setJobFilter] = useState('');

  // Sample applications data
  const sampleApplications = [
    {
      _id: '1',
      job: {
        _id: 'job1',
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.'
      },
      applicant: {
        _id: 'user1',
        name: 'John Doe',
        email: 'john.doe@example.com'
      },
      status: 'pending',
      coverLetter: 'I am excited to apply for this position...',
      resume: 'john_doe_resume.pdf',
      appliedDate: '2024-01-15',
      notes: '',
      interviewDate: null,
      feedback: ''
    },
    {
      _id: '2',
      job: {
        _id: 'job1',
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.'
      },
      applicant: {
        _id: 'user2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com'
      },
      status: 'interview',
      coverLetter: 'With my 5 years of experience...',
      resume: 'jane_smith_resume.pdf',
      appliedDate: '2024-01-14',
      notes: 'Strong candidate, scheduled for technical interview',
      interviewDate: '2024-01-22',
      feedback: 'Great portfolio and communication skills'
    },
    {
      _id: '3',
      job: {
        _id: 'job2',
        title: 'Full Stack Engineer',
        company: 'StartupXYZ'
      },
      applicant: {
        _id: 'user3',
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com'
      },
      status: 'accepted',
      coverLetter: 'I would love to join your team...',
      resume: 'mike_johnson_resume.pdf',
      appliedDate: '2024-01-12',
      notes: 'Excellent fit for the role',
      interviewDate: '2024-01-18',
      feedback: 'Outstanding technical skills and cultural fit'
    },
    {
      _id: '4',
      job: {
        _id: 'job3',
        title: 'UI/UX Designer',
        company: 'Design Studio'
      },
      applicant: {
        _id: 'user4',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com'
      },
      status: 'rejected',
      coverLetter: 'As a passionate designer...',
      resume: 'sarah_wilson_resume.pdf',
      appliedDate: '2024-01-10',
      notes: 'Good portfolio but not the right fit',
      interviewDate: null,
      feedback: 'Portfolio shows potential but lacks experience in our specific industry'
    },
    {
      _id: '5',
      job: {
        _id: 'job4',
        title: 'Marketing Intern',
        company: 'Marketing Pro'
      },
      applicant: {
        _id: 'user5',
        name: 'Alex Brown',
        email: 'alex.brown@example.com'
      },
      status: 'reviewed',
      coverLetter: 'I am eager to learn and contribute...',
      resume: 'alex_brown_resume.pdf',
      appliedDate: '2024-01-13',
      notes: 'Application under review',
      interviewDate: null,
      feedback: ''
    }
  ];

  const filteredApplications = sampleApplications.filter(app => {
    const matchesSearch = app.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || app.status === statusFilter;
    const matchesJob = jobFilter === '' || app.job._id === jobFilter;
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'interview':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleViewApplication = (applicationId) => {
    alert(`View application details for ${applicationId}`);
  };

  const handleUpdateStatus = (applicationId, newStatus) => {
    alert(`Update application ${applicationId} status to ${newStatus}`);
  };

  const applicationStats = {
    total: sampleApplications.length,
    pending: sampleApplications.filter(a => a.status === 'pending').length,
    interview: sampleApplications.filter(a => a.status === 'interview').length,
    accepted: sampleApplications.filter(a => a.status === 'accepted').length,
    rejected: sampleApplications.filter(a => a.status === 'rejected').length
  };

  // Get unique jobs for filter
  const uniqueJobs = [...new Map(sampleApplications.map(app => [app.job._id, app.job])).values()];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Applications</h1>
          <p className="text-gray-600 mt-1">Manage job applications across the platform</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{applicationStats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{applicationStats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{applicationStats.interview}</div>
          <div className="text-sm text-gray-600">Interview</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{applicationStats.accepted}</div>
          <div className="text-sm text-gray-600">Accepted</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-red-600">{applicationStats.rejected}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="interview">Interview</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Jobs</option>
            {uniqueJobs.map(job => (
              <option key={job._id} value={job._id}>
                {job.title} - {job.company}
              </option>
            ))}
          </select>
          
          <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div key={application._id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{application.applicant.name}</h3>
                    <p className="text-sm text-gray-600">{application.applicant.email}</p>
                  </div>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 font-medium">Applied for: {application.job.title}</p>
                  <p className="text-sm text-gray-500">{application.job.company}</p>
                  <p className="text-sm text-gray-500">Applied on {formatDate(application.appliedDate)}</p>
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

            {application.notes && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-gray-700">
                  <span className="font-medium">Notes: </span>
                  {application.notes}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Resume: {application.resume}</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleViewApplication(application._id)}
                  className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                {application.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(application._id, 'interview')}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Schedule Interview
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(application._id, 'rejected')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
                {application.status === 'interview' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(application._id, 'accepted')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(application._id, 'rejected')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-500">
            {statusFilter || jobFilter ? 'Try changing your filter criteria' : 'Applications will appear here as users apply for jobs'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllApplications;