import React from 'react';
import { MapPin, Clock, DollarSign, Star, Bookmark, Users } from 'lucide-react';

const JobCard = ({ job, onApply, onSave, showApplicationCount = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const formattedDate = job.createdAt ? formatDate(job.createdAt) : 'Recently posted';

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
          <p className="text-gray-600 font-medium mb-1">{job.company}</p>
          <div className="flex items-center text-gray-500 text-sm space-x-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formattedDate}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {job.averageRating > 0 && (
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium text-yellow-700">{job.averageRating.toFixed(1)}</span>
            </div>
          )}
          <button
            onClick={() => onSave?.(job._id)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 line-clamp-2">{job.description}</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-green-600">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="font-medium">
              ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
            </span>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {job.type}
          </span>
        </div>
        {showApplicationCount && (
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="w-4 h-4 mr-1" />
            {job.applications?.length || 0} applications
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {job.requirements?.slice(0, 3).map((req, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
            >
              {req}
            </span>
          ))}
          {job.requirements?.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
              +{job.requirements.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => onApply?.(job._id)}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          Apply Now
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;