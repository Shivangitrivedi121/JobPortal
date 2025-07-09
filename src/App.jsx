import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import EmployerDashboard from './components/Dashboard/EmployerDashboard';
import JobSeekerDashboard from './components/Dashboard/JobSeekerDashboard';
import FindJobs from './components/Pages/FindJobs';
import MyApplications from './components/Pages/MyApplications';
import SavedJobs from './components/Pages/SavedJobs';
import Profile from './components/Pages/Profile';
import PostJob from './components/Pages/PostJob';
import MyJobs from './components/Pages/MyJobs';
import AllUsers from './components/Pages/AllUsers';
import AllJobs from './components/Pages/AllJobs';
import AllApplications from './components/Pages/AllApplications';

const AppContent = () => {
  const { user, isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (!isAuthenticated) {
    return showRegister ? (
      <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
        
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          
          <main className="flex-1 lg:ml-0 p-6">
            <div className="max-w-7xl mx-auto">
              <Routes>
                {/* Admin Routes */}
                {user?.role === 'admin' && (
                  <>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<AllUsers />} />
                    <Route path="/admin/jobs" element={<AllJobs />} />
                    <Route path="/admin/applications" element={<AllApplications />} />
                    <Route path="/admin/analytics" element={<div>Analytics Page</div>} />
                    <Route path="/admin/settings" element={<div>Settings Page</div>} />
                    <Route path="/" element={<Navigate to="/admin" replace />} />
                  </>
                )}

                {/* Employer Routes */}
                {user?.role === 'employer' && (
                  <>
                    <Route path="/employer" element={<EmployerDashboard />} />
                    <Route path="/employer/post-job" element={<PostJob />} />
                    <Route path="/employer/jobs" element={<MyJobs />} />
                    <Route path="/employer/applications" element={<AllApplications />} />
                    <Route path="/employer/reviews" element={<div>Reviews Page</div>} />
                    <Route path="/" element={<Navigate to="/employer" replace />} />
                  </>
                )}

                {/* Job Seeker Routes */}
                {user?.role === 'jobseeker' && (
                  <>
                    <Route path="/jobseeker" element={<JobSeekerDashboard />} />
                    <Route path="/jobseeker/search" element={<FindJobs />} />
                    <Route path="/jobseeker/applications" element={<MyApplications />} />
                    <Route path="/jobseeker/saved" element={<SavedJobs />} />
                    <Route path="/jobseeker/profile" element={<Profile />} />
                    <Route path="/" element={<Navigate to="/jobseeker" replace />} />
                  </>
                )}

                {/* Default redirect based on role */}
                <Route path="*" element={
                  <Navigate to={
                    user?.role === 'admin' ? '/admin' :
                    user?.role === 'employer' ? '/employer' :
                    '/jobseeker'
                  } replace />
                } />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;