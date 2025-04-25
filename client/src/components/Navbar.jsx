// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-extrabold tracking-tight">
            Hotel<span className="text-pink-300">Flow</span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/inquiries" className="hover:text-pink-200 transition-colors duration-200 font-medium">
              Inquiries
            </Link>
            <Link to="/bookings" className="hover:text-pink-200 transition-colors duration-200 font-medium">
              Bookings
            </Link>
            <Link to="/quote" className="hover:text-pink-200 transition-colors duration-200 font-medium">
              Quote
            </Link>
            <Link to="/reports" className="hover:text-pink-200 transition-colors duration-200 font-medium">
              Reports
            </Link>
            <Link to="/inquiry" className="bg-white text-indigo-600 hover:bg-indigo-100 ml-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              New Inquiry
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-indigo-400">
            <Link to="/inquiries" className="block py-2 hover:bg-indigo-500 px-3 rounded" onClick={() => setIsMenuOpen(false)}>
              Inquiries
            </Link>
            <Link to="/bookings" className="block py-2 hover:bg-indigo-500 px-3 rounded" onClick={() => setIsMenuOpen(false)}>
              Bookings
            </Link>
            <Link to="/quote" className="block py-2 hover:bg-indigo-500 px-3 rounded" onClick={() => setIsMenuOpen(false)}>
              Quote
            </Link>
            <Link to="/reports" className="block py-2 hover:bg-indigo-500 px-3 rounded" onClick={() => setIsMenuOpen(false)}>
              Reports
            </Link>
            <Link to="/inquiry" className="block mt-2 text-center bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
              New Inquiry
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;