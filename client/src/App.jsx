// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
// import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Main pages
import Dashboard from './pages/Dashboard';
import Inquiries from './pages/Inquiries';
import InquiryDetail from './pages/InquiryDetail';
import Quotations from './pages/Quotations';
import QuotationDetail from './pages/QuotationDetail';
import Clients from './pages/Clients';
import Settings from './pages/Settings';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration purposes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected routes with dashboard layout */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inquiries" element={<Inquiries />} />
              <Route path="/inquiries/:id" element={<InquiryDetail />} />
              <Route path="/quotations" element={<Quotations />} />
              <Route path="/quotations/:id" element={<QuotationDetail />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;