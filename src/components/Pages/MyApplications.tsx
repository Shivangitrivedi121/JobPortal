import React, { useState } from 'react';
import { FileText, MapPin, Clock, Eye, Filter, Calendar, Download, MessageSquare } from 'lucide-react';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  status: 'pending' | 'reviewed' | 'interview' | 'accepted' | 'rejected';
  appliedDate: string;
  salary: string;
  type: string;
  coverLetter: string;
  resume: string;
  notes: string;
  interviewDate: string | null;
  feedback: string;
  applicationNumber: string;
}

const MyApplications: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Sample applications data with comprehensive information
  const sampleApplications: Application[] = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      status: 'interview',
      appliedDate: '2024-01-15',
      salary: '$120,000 - $160,000',
      type: 'full-time',
      coverLetter: 'I am excited to apply for this position as a Senior Frontend Developer. With over 5 years of experience in React and modern web technologies...',
      resume: 'john_doe_resume.pdf',
      notes: 'Technical interview scheduled for next week',
      interviewDate: '2024-01-25',
      feedback: 'Great portfolio and technical skills. Moving to final round.',
      applicationNumber: 'APP-2024-001'
    },
    {
      id: '2',
      jobTitle: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      status: 'pending',
      appliedDate: '2024-01-18',
      salary: '$100,000 - $140,000',
      type: 'full-time',
      coverLetter: 'With my experience in full stack development using Node.js and React, I believe I would be a great fit for this role...',
      resume: 'john_doe_resume.pdf',
      notes: 'Application submitted successfully',
      interviewDate: null,
      feedback: '',
      applicationNumber: 'APP-2024-002'
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
      coverLetter: 'As a passionate designer with expertise in user-centered design principles...',
      resume: 'john_doe_resume.pdf',
      notes: 'Offer letter received',
      interviewDate: '2024-01-12',
      feedback: 'Excellent design portfolio and communication skills. Welcome to the team!',
      applicationNumber: 'APP-2024-003'
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
      coverLetter: 'I would like to contribute to your backend team with my expertise in Python and database design...',
      resume: 'john_doe_resume.pdf',
      notes: 'Position filled internally',
      interviewDate: null,
      feedback: 'Strong technical background but position was filled internally. We encourage you to apply for future openings.',
      applicationNumber: 'APP-2024-004'
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
      coverLetter: 'My experience with cloud infrastructure and DevOps practices makes me an ideal candidate...',
      resume: 'john_doe_resume.pdf',
      notes: 'Application under review by hiring team',
      interviewDate: null,
      feedback: '',
      applicationNumber: 'APP-2024-005'
    },
    {
      id: '6',
      jobTitle: 'Marketing Intern',
      company: 'Marketing Pro',
      location: 'Los Angeles, CA',
      status: 'pending',
      appliedDate: '2024-01-20',
      salary: '$15 - $20/hour',
      type: 'internship',
      coverLetter: 'As a marketing student, I am eager to gain hands-on experience in digital marketing...',
      resume: 'john_doe_resume.pdf',
      notes: 'Recently submitted',
      interviewDate: null,
      feedback: '',
      applicationNumber: 'APP-2024-006'
    }
  ];

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
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
      return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
    }
    if (sortBy === 'company') {
      return a.company.localeCompare(b.company);
    }
    if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const statusCounts = sampleApplications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleDownloadResume = (resumeName: string) => {
    alert(`Downloading ${resumeName}...`);
  };

  const handleViewDetails = (applicationId: string) => {
    alert(`Viewing details for application ${applicationId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600 mt-1">Track your job application progress and status updates</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{sampleApplications.length}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending || 0}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{statusCounts.reviewed || 0}</div>
          <div className="text-sm text-gray-600">Reviewed</div>
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
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{application.jobTitle}</h3>
                  <span className="text-sm text-gray-500">#{application.applicationNumber}</span>
                </div>
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
                  <span className={`px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs`}>
                    {application.type}
                  </span>
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
                <div className="flex items-start text-blue-800">
                  <MessageSquare className="w-4 h-4 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Feedback: </span>
                    {application.feedback}
                  </div>
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
                <button
                  onClick={() => handleDownloadResume(application.resume)}
                  className="flex items-center hover:text-blue-600 transition-colors"
                >
                  <Download className="w-4 h-4 mr-1" />
                  {application.resume}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleViewDetails(application.id)}
                  className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
              </div>
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