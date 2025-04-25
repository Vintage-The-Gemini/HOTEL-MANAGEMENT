// client/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-primary-700">
            Hotel<span className="text-accent-600">Flow</span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            <Link 
              to="/dashboard" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/dashboard') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary-700'
              } transition-colors duration-200`}
            >
              Dashboard
            </Link>
            <Link 
              to="/inquiries" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/inquiries') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary-700'
              } transition-colors duration-200`}
            >
              Inquiries
            </Link>
            <Link 
              to="/quotations" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/quotations') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary-700'
              } transition-colors duration-200`}
            >
              Quotations
            </Link>
            <Link 
              to="/bookings" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/bookings') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary-700'
              } transition-colors duration-200`}
            >
              Bookings
            </Link>
            <Link 
              to="/reports" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/reports') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary-700'
              } transition-colors duration-200`}
            >
              Reports
            </Link>
            <Link 
              to="/quotations/new" 
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              + New Quotation
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <Link
              to="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/dashboard') ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/inquiries"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/inquiries') ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Inquiries
            </Link>
            <Link
              to="/quotations"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/quotations') ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Quotations
            </Link>
            <Link
              to="/bookings"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/bookings') ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Bookings
            </Link>
            <Link
              to="/reports"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/reports') ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Reports
            </Link>
            <Link
              to="/quotations/new"
              className="block mt-3 px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
              onClick={() => setIsMenuOpen(false)}
            >
              + New Quotation
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;