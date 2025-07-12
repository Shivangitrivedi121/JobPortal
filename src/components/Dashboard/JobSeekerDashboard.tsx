import React from 'react';
import { Search, Bookmark, FileText, TrendingUp, MapPin, Clock, Star, Users, Building, Calendar, Eye, Send } from 'lucide-react';
import StatsCard from './StatsCard';

const JobSeekerDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Applications Sent',
      value: '24',
      icon: FileText,
      color: 'blue' as const,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Saved Jobs',
      value: '8',
      icon: Bookmark,
      color: 'green' as const,
      trend: { value: 25, isPositive: true }
    },
    {
      title: 'Profile Views',
      value: '156',
      icon: TrendingUp,
      color: 'purple' as const,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Response Rate',
      value: '67%',
      icon: TrendingUp,
      color: 'yellow' as const,
      trend: { value: 15, isPositive: true }
    }
  ];

  const recentApplications = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      status: 'interview',
      appliedDate: '2 days ago',
      salary: '$120,000 - $160,000',
      interviewDate: '2024-01-25'
    },
    {
      id: '2',
      jobTitle: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      status: 'pending',
      appliedDate: '1 week ago',
      salary: '$100,000 - $140,000',
      interviewDate: null
    },
    {
      id: '3',
      jobTitle: 'UI/UX Designer',
      company: 'Design Studio',
      location: 'Remote',
      status: 'accepted',
      appliedDate: '2 weeks ago',
      salary: '$80,000 - $110,000',
      interviewDate: null
    },
    {
      id: '4',
      jobTitle: 'React Developer',
      company: 'WebAgency',
      location: 'Austin, TX',
      status: 'rejected',
      appliedDate: '3 weeks ago',
      salary: '$85,000 - $115,000',
      interviewDate: null
    }
  ];

  const recommendedJobs = [
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'InnovateTech',
      location: 'San Francisco, CA',
      salary: '$130,000 - $170,000',
      type: 'full-time',
      rating: 4.7,
      applications: 23,
      postedDate: '1 day ago'
    },
    {
      id: '2',
      title: 'Frontend Engineer',
      company: 'NextGen Solutions',
      location: 'Remote',
      salary: '$110,000 - $150,000',
      type: 'full-time',
      rating: 4.5,
      applications: 15,
      postedDate: '3 days ago'
    },
    {
      id: '3',
      title: 'JavaScript Developer',
      company: 'CodeCraft',
      location: 'New York, NY',
      salary: '$95,000 - $125,000',
      type: 'full-time',
      rating: 4.3,
      applications: 31,
      postedDate: '5 days ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleViewApplication = (applicationId: string) => {
    alert(`Viewing application details for ${applicationId}`);
  };

  const handleApplyToJob = (jobId: string) => {
    alert(`Applying to job ${jobId}`);
  };

  const handleSaveJob = (jobId: string) => {
    alert(`Job ${jobId} saved to your saved jobs!`);
  };

  const handleViewJobDetails = (jobId: string) => {
    alert(`Viewing job details for ${jobId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Seeker Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your job search progress and discover new opportunities</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
          <Search className="w-5 h-5" />
          <span>Find Jobs</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Search className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700">Search Jobs</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <FileText className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700">Update Resume</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <Bookmark className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700">Saved Jobs</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors">
            <TrendingUp className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700">Profile Analytics</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div key={application.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{application.jobTitle}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Building className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-600">{application.company}</p>
                    </div>
                  </div>
                  <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    <span className="ml-1 capitalize">{application.status}</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {application.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {application.appliedDate}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">{application.salary}</span>
                  <button
                    onClick={() => handleViewApplication(application.id)}
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                </div>

                {application.interviewDate && (
                  <div className="mt-3 p-2 bg-purple-50 rounded border border-purple-200">
                    <div className="flex items-center text-purple-800 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      Interview scheduled for {application.interviewDate}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recommended for You</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <div key={job.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Building className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-yellow-700">{job.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {job.applications} applications
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-green-600">{job.salary}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {job.type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Posted {job.postedDate}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSaveJob(job.id)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleViewJobDetails(job.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleApplyToJob(job.id)}
                      className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
          <span className="text-sm text-gray-500">85% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Resume Uploaded</p>
              <p className="text-xs text-gray-500">✓ Complete</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Skills Added</p>
              <p className="text-xs text-gray-500">✓ Complete</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Portfolio Link</p>
              <p className="text-xs text-yellow-600">Add portfolio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;