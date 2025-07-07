import React from 'react';
import { PlusCircle, Briefcase, Users, Eye, Star, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';
import JobCard from '../Jobs/JobCard';

const EmployerDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Active Jobs',
      value: '12',
      icon: Briefcase,
      color: 'blue' as const,
      trend: { value: 20, isPositive: true }
    },
    {
      title: 'Applications',
      value: '89',
      icon: Users,
      color: 'green' as const,
      trend: { value: 15, isPositive: true }
    },
    {
      title: 'Profile Views',
      value: '245',
      icon: Eye,
      color: 'purple' as const,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Average Rating',
      value: '4.8',
      icon: Star,
      color: 'yellow' as const,
      trend: { value: 5, isPositive: true }
    }
  ];

  const sampleJobs = [
    {
      _id: '1',
      title: 'Senior Software Engineer',
      description: 'We are looking for a skilled software engineer to join our team.',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      salary: { min: 120000, max: 180000 },
      type: 'full-time' as const,
      requirements: ['React', 'Node.js', 'TypeScript'],
      postedBy: 'employer1',
      applications: ['1', '2', '3'],
      ratings: [],
      averageRating: 4.5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '2',
      title: 'Frontend Developer',
      description: 'Looking for a creative frontend developer.',
      company: 'Design Studio',
      location: 'New York, NY',
      salary: { min: 80000, max: 120000 },
      type: 'full-time' as const,
      requirements: ['React', 'CSS', 'JavaScript'],
      postedBy: 'employer1',
      applications: ['4', '5'],
      ratings: [],
      averageRating: 4.2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
          <PlusCircle className="w-5 h-5" />
          <span>Post New Job</span>
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
            <PlusCircle className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700">Post Job</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <Users className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700">View Applications</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <TrendingUp className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700">Analytics</span>
          </button>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Recent Jobs</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {sampleJobs.map((job) => (
            <JobCard key={job._id} job={job} showApplicationCount={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;