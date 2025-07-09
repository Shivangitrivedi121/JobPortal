import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Edit3, Save, X, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  // Sample profile data
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. I love working with modern technologies and solving complex problems.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'TypeScript', 'Docker'],
    experience: [
      {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        duration: '2022 - Present',
        description: 'Lead development of customer-facing web applications using React and Node.js. Mentored junior developers and improved system performance by 40%.'
      },
      {
        id: 2,
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        duration: '2020 - 2022',
        description: 'Built and maintained multiple web applications from scratch. Worked closely with design team to implement pixel-perfect UIs.'
      },
      {
        id: 3,
        title: 'Frontend Developer',
        company: 'WebAgency',
        duration: '2019 - 2020',
        description: 'Developed responsive websites and web applications for various clients. Specialized in React and modern CSS frameworks.'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of California, Berkeley',
        year: '2019'
      },
      {
        id: 2,
        degree: 'Full Stack Web Development Bootcamp',
        school: 'Coding Academy',
        year: '2018'
      }
    ]
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEdit = (section) => {
    setEditingSection(section);
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
    setEditingSection(null);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
    setEditingSection(null);
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      title: '',
      company: '',
      duration: '',
      description: ''
    };
    setTempData({
      ...tempData,
      experience: [...tempData.experience, newExp]
    });
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: '',
      school: '',
      year: ''
    };
    setTempData({
      ...tempData,
      education: [...tempData.education, newEdu]
    });
  };

  const removeExperience = (id) => {
    setTempData({
      ...tempData,
      experience: tempData.experience.filter(exp => exp.id !== id)
    });
  };

  const removeEducation = (id) => {
    setTempData({
      ...tempData,
      education: tempData.education.filter(edu => edu.id !== id)
    });
  };

  const updateExperience = (id, field, value) => {
    setTempData({
      ...tempData,
      experience: tempData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const updateEducation = (id, field, value) => {
    setTempData({
      ...tempData,
      education: tempData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and career details</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => handleEdit('all')}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        )}
        {isEditing && (
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCancel}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Basic Information */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={tempData.name}
                  onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                  className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none"
                />
                <input
                  type="email"
                  value={tempData.email}
                  onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                  className="text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.email}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            {isEditing ? (
              <input
                type="tel"
                value={tempData.phone}
                onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="text-gray-700">{profileData.phone}</span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            {isEditing ? (
              <input
                type="text"
                value={tempData.location}
                onChange={(e) => setTempData({ ...tempData, location: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="text-gray-700">{profileData.location}</span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
        {isEditing ? (
          <textarea
            value={tempData.bio}
            onChange={(e) => setTempData({ ...tempData, bio: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about yourself..."
          />
        ) : (
          <p className="text-gray-700">{profileData.bio}</p>
        )}
      </div>

      {/* Skills */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={tempData.skills.join(', ')}
              onChange={(e) => setTempData({ ...tempData, skills: e.target.value.split(', ').filter(s => s.trim()) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter skills separated by commas"
            />
            <p className="text-sm text-gray-500">Separate skills with commas</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
          {isEditing && (
            <button
              onClick={addExperience}
              className="flex items-center px-3 py-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Experience
            </button>
          )}
        </div>
        <div className="space-y-4">
          {(isEditing ? tempData.experience : profileData.experience).map((exp, index) => (
            <div key={exp.id} className="border-l-4 border-blue-500 pl-4">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                      placeholder="Job Title"
                    />
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company"
                  />
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Duration (e.g., 2020 - 2022)"
                  />
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Job description..."
                  />
                </div>
              ) : (
                <div>
                  <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Education</h3>
          {isEditing && (
            <button
              onClick={addEducation}
              className="flex items-center px-3 py-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Education
            </button>
          )}
        </div>
        <div className="space-y-4">
          {(isEditing ? tempData.education : profileData.education).map((edu, index) => (
            <div key={edu.id} className="border-l-4 border-green-500 pl-4">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                      placeholder="Degree"
                    />
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="School/Institution"
                  />
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Year"
                  />
                </div>
              ) : (
                <div>
                  <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                  <p className="text-green-600 font-medium">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;