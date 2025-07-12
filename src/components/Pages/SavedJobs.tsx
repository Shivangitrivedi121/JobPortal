import React, { useState } from 'react';
import { Bookmark, Trash2, ExternalLink, MapPin, Clock, DollarSign, Star, Search, Filter, Building, Users } from 'lucide-react';
import { Job } from '../../types';

const SavedJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('savedDate');

  // Sample saved jobs data with comprehensive information
  const [savedJobs, setSavedJobs] = useState<(Job & { savedDate: string })[]>([
    {
      _id: '1',
      title: 'Senior Frontend Developer',
      description: 'We are looking for an experienced frontend developer to join our dynamic team. You will be responsible for building user-facing features and ensuring great user experience. Work with cutting-edge technologies including React, TypeScript, and modern CSS frameworks.',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: { min: 120000, max: 160000 },
      type: 'full-time',
      requirements: ['React', 'TypeScript', 'CSS', 'JavaScript', 'Git', 'Redux', 'Testing'],
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
      description: 'We are seeking a creative UI/UX designer to create amazing user experiences. You will work closely with our product team to design intuitive and beautiful interfaces.',
      company: 'Design Studio',
      location: 'Remote',
      salary: { min: 80000, max: 110000 },
      type: 'full-time',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Wireframing'],
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
      description: 'Join our infrastructure team to help scale our platform. Experience with cloud technologies required. You\'ll work on CI/CD pipelines, monitoring, and deployment automation.',
      company: 'CloudFirst',
      location: 'Seattle, WA',
      salary: { min: 110000, max: 150000 },
      type: 'full-time',
      requirements: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux', 'Monitoring'],
      postedBy: 'employer5',
      applications: ['10'],
      ratings: [],
      averageRating: 4.6,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      savedDate: '2024-01-10'
    },
    {
      _id: '4',
      title: 'Full Stack Engineer',
      description: 'Join our startup as a full stack engineer. Work on cutting-edge technology and help build products that millions of users love.',
      company: 'StartupXYZ',
      location: 'New York, NY',
      salary: { min: 100000, max: 140000 },
      type: 'full-time',
      requirements: ['Node.js', 'React', 'MongoDB', 'Express', 'AWS', 'Docker'],
      postedBy: 'employer2',
      applications: ['4', '5'],
      ratings: [],
      averageRating: 4.2,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      savedDate: '2024-01-08'
    },
    {
      _id: '5',
      title: 'Marketing Intern',
      description: 'Great opportunity for students to gain experience in digital marketing and social media management.',
      company: 'Marketing Pro',
      location: 'Los Angeles, CA',
      salary: { min: 15, max: 20 },
      type: 'internship',
      requirements: ['Social Media', 'Content Creation', 'Analytics', 'Communication'],
      postedBy: 'employer6',
      applications: ['11', '12'],
      ratings: [],
      averageRating: 4.1,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      savedDate: '2024-01-05'
    }
  ]);

  const handleRemoveFromSaved = (jobId: string) => {
    setSavedJobs(savedJobs.filter(job => job._id !== jobId));
    alert('Job removed from saved jobs!');
  };

  const handleApply = (jobId: string) => {
    alert(`Applying for job ${jobId}! This would open the application form.`);
  };

  const handleViewDetails = (jobId: string) => {
    alert(`Viewing details for job ${jobId}! This would show the full job description.`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter and sort jobs
  const filteredJobs = savedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === '' || job.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'savedDate':
        return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
      case 'postedDate':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'company':
        return a.company.localeCompare(b.company);
      case 'salary':
        return b.salary.max - a.salary.max;
      default:
        return 0;
    }
  });

  const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
          <p className="text-gray-600 mt-1">Jobs you've bookmarked for later review</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Bookmark className="w-4 h-4" />
          <span>{savedJobs.length} saved jobs</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {Math.round(savedJobs.reduce((sum, job) => sum + job.averageRating, 0) / savedJobs.length * 10) / 10}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search saved jobs..."
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
            {jobTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="savedDate">Sort by: Saved Date</option>
            <option value="postedDate">Sort by: Posted Date</option>
            <option value="company">Sort by: Company</option>
            <option value="salary">Sort by: Salary</option>
          </select>
          
          <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            <Filter className="w-5 h-5 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Saved Jobs List */}
      {sortedJobs.length > 0 ? (
        <div className="space-y-4">
          {sortedJobs.map((job) => (
            <div key={job._id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Saved {formatDate(job.savedDate)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-600 font-medium">{job.company}</p>
                  </div>
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
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {job.applications.length} applications
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleViewDetails(job._id)}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || typeFilter ? 'No matching saved jobs' : 'No saved jobs yet'}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || typeFilter 
              ? 'Try adjusting your search criteria' 
              : 'Start saving jobs you\'re interested in to see them here'
            }
          </p>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            Browse Jobs
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;