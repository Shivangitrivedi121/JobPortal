import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Filter, SlidersHorizontal } from 'lucide-react';
import JobCard from '../Jobs/JobCard';

const FindJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Sample job data
  const sampleJobs = [
    {
      _id: '1',
      title: 'Senior Frontend Developer',
      description: 'We are looking for an experienced frontend developer to join our dynamic team. You will be responsible for building user-facing features and ensuring great user experience.',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: { min: 120000, max: 160000 },
      type: 'full-time',
      requirements: ['React', 'TypeScript', 'CSS', 'JavaScript', 'Git'],
      benefits: ['Health Insurance', 'Remote Work', '401k'],
      postedBy: 'employer1',
      applications: ['1', '2', '3'],
      ratings: [],
      averageRating: 4.5,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '2',
      title: 'Full Stack Engineer',
      description: 'Join our startup as a full stack engineer. Work on cutting-edge technology and help build products that millions of users love.',
      company: 'StartupXYZ',
      location: 'New York, NY',
      salary: { min: 100000, max: 140000 },
      type: 'full-time',
      requirements: ['Node.js', 'React', 'MongoDB', 'Express', 'AWS'],
      benefits: ['Equity', 'Flexible Hours', 'Learning Budget'],
      postedBy: 'employer2',
      applications: ['4', '5'],
      ratings: [],
      averageRating: 4.2,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '3',
      title: 'UI/UX Designer',
      description: 'We are seeking a creative UI/UX designer to create amazing user experiences. You will work closely with our product team.',
      company: 'Design Studio',
      location: 'Remote',
      salary: { min: 80000, max: 110000 },
      type: 'full-time',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      benefits: ['Remote Work', 'Creative Freedom', 'Conference Budget'],
      postedBy: 'employer3',
      applications: ['6'],
      ratings: [],
      averageRating: 4.8,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '4',
      title: 'Backend Developer',
      description: 'Looking for a skilled backend developer to work on our API infrastructure and database systems.',
      company: 'DataTech Solutions',
      location: 'Austin, TX',
      salary: { min: 95000, max: 130000 },
      type: 'full-time',
      requirements: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Redis'],
      benefits: ['Health Insurance', 'Stock Options', 'Gym Membership'],
      postedBy: 'employer4',
      applications: ['7', '8', '9'],
      ratings: [],
      averageRating: 4.3,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '5',
      title: 'DevOps Engineer',
      description: 'Join our infrastructure team to help scale our platform. Experience with cloud technologies required.',
      company: 'CloudFirst',
      location: 'Seattle, WA',
      salary: { min: 110000, max: 150000 },
      type: 'full-time',
      requirements: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
      benefits: ['Remote Work', 'Learning Budget', 'Stock Options'],
      postedBy: 'employer5',
      applications: ['10'],
      ratings: [],
      averageRating: 4.6,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '6',
      title: 'Marketing Intern',
      description: 'Great opportunity for students to gain experience in digital marketing and social media management.',
      company: 'Marketing Pro',
      location: 'Los Angeles, CA',
      salary: { min: 15, max: 20 },
      type: 'internship',
      requirements: ['Social Media', 'Content Creation', 'Analytics', 'Communication'],
      benefits: ['Mentorship', 'Networking', 'Certificate'],
      postedBy: 'employer6',
      applications: ['11', '12'],
      ratings: [],
      averageRating: 4.1,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const [filteredJobs, setFilteredJobs] = useState(sampleJobs);

  const handleSearch = () => {
    let filtered = sampleJobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(job => job.type === typeFilter);
    }

    if (salaryRange) {
      const [min, max] = salaryRange.split('-').map(Number);
      filtered = filtered.filter(job => 
        job.salary.min >= min && job.salary.max <= max
      );
    }

    setFilteredJobs(filtered);
  };

  const handleApply = (jobId) => {
    alert(`Applied to job ${jobId}! This would normally submit an application.`);
  };

  const handleSave = (jobId) => {
    alert(`Saved job ${jobId}! This would normally save the job to your saved list.`);
  };

  const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];
  const salaryRanges = [
    { label: 'Under $50k', value: '0-50000' },
    { label: '$50k - $80k', value: '50000-80000' },
    { label: '$80k - $120k', value: '80000-120000' },
    { label: '$120k - $160k', value: '120000-160000' },
    { label: 'Above $160k', value: '160000-999999' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Jobs</h1>
          <p className="text-gray-600 mt-1">Discover your next career opportunity</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Job title, keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="">All Types</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleSearch}
            className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </button>
        </div>

        {/* Advanced Filters */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-gray-600 hover:text-gray-900 text-sm"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Advanced Filters
          </button>
          <span className="text-sm text-gray-500">
            {filteredJobs.length} jobs found
          </span>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range
                </label>
                <select
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Salary</option>
                  {salaryRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onApply={handleApply}
            onSave={handleSave}
          />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default FindJobs;