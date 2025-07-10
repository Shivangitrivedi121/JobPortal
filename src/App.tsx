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
import JobList from './components/Jobs/JobList';

const AppContent: React.FC = () => {
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

  const getDashboardRoute = () => {
    switch (user?.role) {
      case 'admin':
        return '/admin';
      case 'employer':
        return '/employer';
      case 'jobseeker':
        return '/jobseeker';
      default:
        return '/';
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
        
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          
          <main className="flex-1 lg:ml-0 p-6">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Navigate to={getDashboardRoute()} replace />} />
                <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to={getDashboardRoute()} replace />} />
                <Route path="/employer" element={user?.role === 'employer' ? <EmployerDashboard /> : <Navigate to={getDashboardRoute()} replace />} />
                <Route path="/jobseeker" element={user?.role === 'jobseeker' ? <JobSeekerDashboard /> : <Navigate to={getDashboardRoute()} replace />} />
                <Route path="/jobs" element={<JobList />} />
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