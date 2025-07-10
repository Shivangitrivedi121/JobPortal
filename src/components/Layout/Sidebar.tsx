import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Users, 
  FileText, 
  Star, 
  Settings, 
  PlusCircle,
  Search,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const adminMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Briefcase, label: 'All Jobs', path: '/admin/jobs' },
    { icon: FileText, label: 'Applications', path: '/admin/applications' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const employerMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/employer' },
    { icon: PlusCircle, label: 'Post Job', path: '/employer/post-job' },
    { icon: Briefcase, label: 'My Jobs', path: '/employer/jobs' },
    { icon: FileText, label: 'Applications', path: '/employer/applications' },
    { icon: Star, label: 'Reviews', path: '/employer/reviews' },
  ];

  const jobseekerMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/jobseeker' },
    { icon: Search, label: 'Find Jobs', path: '/jobseeker/search' },
    { icon: FileText, label: 'My Applications', path: '/jobseeker/applications' },
    { icon: Star, label: 'Saved Jobs', path: '/jobseeker/saved' },
    { icon: Settings, label: 'Profile', path: '/jobseeker/profile' },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return adminMenuItems;
      case 'employer':
        return employerMenuItems;
      case 'jobseeker':
        return jobseekerMenuItems;
      default:
        return [];
    }
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-md
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-gray-200 lg:block
      `}>
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">JobPortal</span>
            </div>
            
            <nav className="mt-8 flex-1 px-4 space-y-2">
              {getMenuItems().map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActiveLink(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${
                    isActiveLink(item.path)
                      ? 'text-blue-700'
                      : 'text-gray-500 group-hover:text-blue-700'
                  }`} />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 px-4 pb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
              <div className="text-sm font-medium">
                {user?.role === 'admin' && 'Admin Panel'}
                {user?.role === 'employer' && 'Employer Dashboard'}
                {user?.role === 'jobseeker' && 'Job Seeker Dashboard'}
              </div>
              <div className="text-xs opacity-90 mt-1">
                Manage your {user?.role === 'admin' ? 'platform' : user?.role === 'employer' ? 'jobs' : 'career'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;