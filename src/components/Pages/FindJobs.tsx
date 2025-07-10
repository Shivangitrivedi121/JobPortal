import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Filter, SlidersHorizontal, Upload, FileText, Send } from 'lucide-react';
import JobCard from '../Jobs/JobCard';
import { Job } from '../../types';

const FindJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resume: null as File | null
  });

  // Sample job data with more comprehensive information
  const sampleJobs: Job[] = [
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
      updatedAt: new Date().toISOString()
    },
    {
      _id: '2',
      title: 'Full Stack Engineer',
      description: 'Join our startup as a full stack engineer. Work on cutting-edge technology and help build products that millions of users love. You\'ll be involved in both frontend and backend development.',
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
      updatedAt: new Date().toISOString()
    },
    {
      _id: '3',
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
      updatedAt: new Date().toISOString()
    },
    {
      _id: '4',
      title: 'Backend Developer',
      description: 'Looking for a skilled backend developer to work on our API infrastructure and database systems. You\'ll be responsible for building scalable and secure backend services.',
      company: 'DataTech Solutions',
      location: 'Austin, TX',
      salary: { min: 95000, max: 130000 },
      type: 'full-time',
      requirements: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Redis', 'API Design'],
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
      requirements: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux', 'Monitoring'],
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
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSubmitApplication = () => {
    if (!applicationData.coverLetter || !applicationData.resume) {
      alert('Please fill in all required fields and upload your resume.');
      return;
    }

    // Simulate application submission
    alert(`Application submitted successfully for ${selectedJob?.title}!`);
    setShowApplicationModal(false);
    setApplicationData({ coverLetter: '', resume: null });
    setSelectedJob(null);
  };

  const handleSave = (jobId: string) => {
    alert(`Job ${jobId} saved to your saved jobs!`);
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

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Apply for {selectedJob.title}</h2>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">{selectedJob.title}</h3>
                <p className="text-gray-600">{selectedJob.company}</p>
                <p className="text-sm text-gray-500">{selectedJob.location}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                        {applicationData.resume ? applicationData.resume.name : 'Click to upload your resume'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                    </label>
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