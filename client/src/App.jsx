// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';

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
    // Initialize Tailwind from CDN for the prototype
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(tailwindScript);
    
    // Configure Tailwind
    const tailwindConfig = document.createElement('script');
    tailwindConfig.textContent = `
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: {
                50: '#f0f9ff',
                100: '#e0f2fe',
                200: '#bae6fd',
                300: '#7dd3fc',
                400: '#38bdf8',
                500: '#0ea5e9',
                600: '#0284c7',
                700: '#0369a1',
                800: '#075985',
                900: '#0c4a6e',
              },
            }
          }
        }
      }
    `;
    document.head.appendChild(tailwindConfig);
    
    // Set a mock user in localStorage for the components that need it
    localStorage.setItem('user', JSON.stringify({
      id: '1',
      name: 'Admin User',
      email: 'admin@hotelms.com',
      role: 'HOTEL_ADMIN'
    }));
    
    // Set a mock token
    localStorage.setItem('token', 'mock-jwt-token');
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Main layout with dashboard - no auth protection */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="inquiries/:id" element={<InquiryDetail />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="quotations/:id" element={<QuotationDetail />} />
          <Route path="clients" element={<Clients />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Redirect any other route to the dashboard */}
        <Route path="*" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;