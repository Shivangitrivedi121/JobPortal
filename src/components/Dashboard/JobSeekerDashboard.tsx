import React from 'react';
import { Search, Bookmark, FileText, TrendingUp, MapPin, Clock } from 'lucide-react';
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
      company: 'TechCorp',
      location: 'San Francisco, CA',
      status: 'pending',
      appliedDate: '2 days ago'
    },
    {
      id: '2',
      jobTitle: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      status: 'interview',
      appliedDate: '1 week ago'
    },
    {
      id: '3',
      jobTitle: 'React Developer',
      company: 'WebAgency',
      location: 'Remote',
      status: 'rejected',
      appliedDate: '2 weeks ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'interview':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Job Seeker Dashboard</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
      </div>

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
            <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{application.jobTitle}</h4>
                <p className="text-sm text-gray-600">{application.company}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {application.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {application.appliedDate}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;