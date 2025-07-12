import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Filter, SlidersHorizontal, Upload, FileText, Send, X, Star, Bookmark, Clock, DollarSign, Users, Building, Calendar } from 'lucide-react';
import { Job } from '../../types';

const FindJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showJobDetailsModal, setShowJobDetailsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>(['3', '5']); // Sample saved job IDs
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    coverLetter: '',
    resume: null as File | null,
    expectedSalary: '',
    availableStartDate: '',
    workExperience: '',
    education: '',
    skills: '',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    references: '',
    additionalNotes: ''
  });

  // Sample job data with comprehensive information
  const sampleJobs: Job[] = [
    {
      _id: '1',
      title: 'Senior Frontend Developer',
      description: 'We are looking for an experienced frontend developer to join our dynamic team. You will be responsible for building user-facing features and ensuring great user experience. Work with cutting-edge technologies including React, TypeScript, and modern CSS frameworks. You will collaborate with designers, backend developers, and product managers to deliver high-quality web applications.',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: { min: 120000, max: 160000 },
      type: 'full-time',
      requirements: ['React', 'TypeScript', 'CSS', 'JavaScript', 'Git', 'Redux', 'Testing', 'Webpack', 'Node.js'],
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
      description: 'Join our startup as a full stack engineer. Work on cutting-edge technology and help build products that millions of users love. You\'ll be involved in both frontend and backend development, working with modern technologies and agile methodologies.',
      company: 'StartupXYZ',
      location: 'New York, NY',
      salary: { min: 100000, max: 140000 },
      type: 'full-time',
      requirements: ['Node.js', 'React', 'MongoDB', 'Express', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL'],
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
      description: 'We are seeking a creative UI/UX designer to create amazing user experiences. You will work closely with our product team to design intuitive and beautiful interfaces. Experience with design systems and user research is highly valued.',
      company: 'Design Studio',
      location: 'Remote',
      salary: { min: 80000, max: 110000 },
      type: 'full-time',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems'],
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
      description: 'Looking for a skilled backend developer to work on our API infrastructure and database systems. You\'ll be responsible for building scalable and secure backend services that power our applications.',
      company: 'DataTech Solutions',
      location: 'Austin, TX',
      salary: { min: 95000, max: 130000 },
      type: 'full-time',
      requirements: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Redis', 'API Design', 'Microservices'],
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
      description: 'Join our infrastructure team to help scale our platform. Experience with cloud technologies required. You\'ll work on CI/CD pipelines, monitoring, and deployment automation.',
      company: 'CloudFirst',
      location: 'Seattle, WA',
      salary: { min: 110000, max: 150000 },
      type: 'full-time',
      requirements: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux', 'Monitoring', 'Jenkins'],
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
      description: 'Great opportunity for students to gain experience in digital marketing and social media management. You\'ll work on campaigns, content creation, and analytics.',
      company: 'Marketing Pro',
      location: 'Los Angeles, CA',
      salary: { min: 15, max: 20 },
      type: 'internship',
      requirements: ['Social Media', 'Content Creation', 'Analytics', 'Communication', 'Creativity'],
      postedBy: 'employer6',
      applications: ['11', '12'],
      ratings: [],
      averageRating: 4.1,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const [filteredJobs, setFilteredJobs] = useState(sampleJobs);
  const [recentSearches, setRecentSearches] = useState([
    'Frontend Developer',
    'React Developer',
    'UI/UX Designer',
    'Full Stack'
  ]);

  const handleSearch = () => {
    let filtered = sampleJobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
      // Add to recent searches if not already there
      if (searchTerm && !recentSearches.includes(searchTerm)) {
        setRecentSearches([searchTerm, ...recentSearches.slice(0, 4)]);
      }
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

  const handleApply = (jobId: string) => {
    const job = sampleJobs.find(j => j._id === jobId);
    if (job) {
      setSelectedJob(job);
      setShowApplicationModal(true);
    }
  };

  const handleViewDetails = (jobId: string) => {
    const job = sampleJobs.find(j => j._id === jobId);
    if (job) {
      setSelectedJob(job);
      setShowJobDetailsModal(true);
    }
  };

  const handleSave = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      alert('Job removed from saved jobs!');
    } else {
      setSavedJobs([...savedJobs, jobId]);
      alert('Job saved successfully!');
    }
  };

  const handleSubmitApplication = () => {
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'coverLetter', 'resume'];
    const missingFields = requiredFields.filter(field => {
      if (field === 'resume') return !applicationData.resume;
      return !applicationData[field as keyof typeof applicationData];
    });

    if (missingFields.length > 0) {
      alert('Please fill in all required fields: ' + missingFields.join(', '));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(applicationData.phone.replace(/\s/g, ''))) {
      alert('Please enter a valid phone number.');
      return;
    }

    // Simulate application submission
    alert(`Application submitted successfully for ${selectedJob?.title}!`);
    setShowApplicationModal(false);
    setApplicationData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      coverLetter: '',
      resume: null,
      expectedSalary: '',
      availableStartDate: '',
      workExperience: '',
      education: '',
      skills: '',
      portfolioUrl: '',
      linkedinUrl: '',
      githubUrl: '',
      references: '',
      additionalNotes: ''
    });
    setSelectedJob(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setApplicationData({ ...applicationData, resume: file });
    }
  };

  const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];
  const salaryRanges = [
    { label: 'Under $50k', value: '0-50000' },
    { label: '$50k - $80k', value: '50000-80000' },
    { label: '$80k - $120k', value: '80000-120000' },
    { label: '$120k - $160k', value: '120000-160000' },
    { label: 'Above $160k', value: '160000-999999' }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Recent searches:</p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(search);
                    handleSearch();
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

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
          <div key={job._id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
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
                    {formatDate(job.createdAt)}
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
                  onClick={() => handleSave(job._id)}
                  className={`p-2 rounded-lg transition-colors ${
                    savedJobs.includes(job._id)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${savedJobs.includes(job._id) ? 'fill-current' : ''}`} />
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
              <div className="flex items-center text-gray-500 text-sm">
                <Users className="w-4 h-4 mr-1" />
                {job.applications.length} applications
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                  >
                    {req}
                  </span>
                ))}
                {job.requirements.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                    +{job.requirements.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => handleApply(job._id)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Apply Now
              </button>
              <button
                onClick={() => handleViewDetails(job._id)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
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

      {/* Job Details Modal */}
      {showJobDetailsModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                <button
                  onClick={() => setShowJobDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedJob.requirements.map((req, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-gray-700">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Job Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{selectedJob.company}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          ${selectedJob.salary.min.toLocaleString()} - ${selectedJob.salary.max.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700 capitalize">{selectedJob.type}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">Posted {formatDate(selectedJob.createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{selectedJob.applications.length} applications</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setShowJobDetailsModal(false);
                        handleApply(selectedJob._id);
                      }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    >
                      Apply for this Job
                    </button>
                    <button
                      onClick={() => handleSave(selectedJob._id)}
                      className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        savedJobs.includes(selectedJob._id)
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {savedJobs.includes(selectedJob._id) ? 'Saved' : 'Save Job'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Apply for {selectedJob.title}</h2>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">{selectedJob.title}</h3>
                <p className="text-gray-600">{selectedJob.company}</p>
                <p className="text-sm text-gray-500">{selectedJob.location}</p>
              </div>

              <div className="space-y-6">
                {/* Personal Information Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={applicationData.fullName}
                        onChange={(e) => setApplicationData({ ...applicationData, fullName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={applicationData.email}
                        onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={applicationData.phone}
                        onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={applicationData.address}
                        onChange={(e) => setApplicationData({ ...applicationData, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="City, State, Country"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information Section */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Salary
                      </label>
                      <input
                        type="text"
                        value={applicationData.expectedSalary}
                        onChange={(e) => setApplicationData({ ...applicationData, expectedSalary: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., $80,000 - $100,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Start Date
                      </label>
                      <input
                        type="date"
                        value={applicationData.availableStartDate}
                        onChange={(e) => setApplicationData({ ...applicationData, availableStartDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Experience Summary
                      </label>
                      <textarea
                        value={applicationData.workExperience}
                        onChange={(e) => setApplicationData({ ...applicationData, workExperience: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Briefly describe your relevant work experience..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Education Background
                      </label>
                      <textarea
                        value={applicationData.education}
                        onChange={(e) => setApplicationData({ ...applicationData, education: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your educational qualifications..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Key Skills
                      </label>
                      <input
                        type="text"
                        value={applicationData.skills}
                        onChange={(e) => setApplicationData({ ...applicationData, skills: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., JavaScript, React, Node.js, Python..."
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Links Section */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Links (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Portfolio URL
                      </label>
                      <input
                        type="url"
                        value={applicationData.portfolioUrl}
                        onChange={(e) => setApplicationData({ ...applicationData, portfolioUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={applicationData.linkedinUrl}
                        onChange={(e) => setApplicationData({ ...applicationData, linkedinUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub Profile
                      </label>
                      <input
                        type="url"
                        value={applicationData.githubUrl}
                        onChange={(e) => setApplicationData({ ...applicationData, githubUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Resume *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {applicationData.resume ? (
                          <span className="text-green-600 font-medium">✓ {applicationData.resume.name}</span>
                        ) : (
                          'Click to upload your resume'
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                    </label>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        References
                      </label>
                      <textarea
                        value={applicationData.references}
                        onChange={(e) => setApplicationData({ ...applicationData, references: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Professional references (Name, Title, Company, Contact)..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={applicationData.additionalNotes}
                        onChange={(e) => setApplicationData({ ...applicationData, additionalNotes: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Any additional information you'd like to share..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowApplicationModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitApplication}
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindJobs;