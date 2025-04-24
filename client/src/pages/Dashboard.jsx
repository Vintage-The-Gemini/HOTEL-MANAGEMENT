import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    inquiries: 0,
    quotations: 0,
    bookings: 0,
    revenue: 0
  });

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
    
    // Mock data for now
    if (isAuthenticated) {
      setStats({
        inquiries: 12,
        quotations: 8,
        bookings: 5,
        revenue: 25000
      });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">{user?.name}</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                New Inquiries
              </h3>
              <p className="mt-2 text-3xl font-semibold text-indigo-600">{stats.inquiries}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                Active Quotations
              </h3>
              <p className="mt-2 text-3xl font-semibold text-green-600">{stats.quotations}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                Confirmed Bookings
              </h3>
              <p className="mt-2 text-3xl font-semibold text-blue-600">{stats.bookings}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                Revenue (USD)
              </h3>
              <p className="mt-2 text-3xl font-semibold text-yellow-600">
                ${stats.revenue.toLocaleString()}
              </p>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Welcome to Hotel Management System</h2>
            <p className="text-gray-600">
              This is a simplified dashboard for demonstration purposes. In a complete application,
              you would see detailed analytics, recent activities, and quick access to key features.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
