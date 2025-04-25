// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Helper function for active nav links
  const activeClass = "text-teal-100 bg-teal-700 px-3 py-2 rounded";
  const inactiveClass = "text-white hover:text-teal-100 hover:bg-teal-700 px-3 py-2 rounded transition-colors duration-200";
  
  return (
    <nav className="bg-teal-600 shadow-lg text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-extrabold tracking-tight">
            Hotel<span className="text-teal-300">Flow</span>
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
          <div className="hidden md:flex space-x-1 items-center">
            <NavLink 
              to="/"
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
              end
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/quotations"
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              Quotations
            </NavLink>
            <NavLink 
              to="/invoices"
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              Invoices
            </NavLink>
            <NavLink 
              to="/bookings"
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              Bookings
            </NavLink>
            <NavLink 
              to="/reports"
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              Reports
            </NavLink>
            <Link 
              to="/quotations/new" 
              className="bg-white text-teal-600 hover:bg-teal-50 ml-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              New Quotation
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-teal-500">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                `block py-2 px-3 rounded ${isActive ? 'bg-teal-700 text-white' : 'text-white hover:bg-teal-700'}`
              }
              onClick={() => setIsMenuOpen(false)}
              end
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/quotations"
              className={({ isActive }) => 
                `block py-2 px-3 rounded ${isActive ? 'bg-teal-700 text-white' : 'text-white hover:bg-teal-700'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Quotations
            </NavLink>
            <NavLink 
              to="/invoices"
              className={({ isActive }) => 
                `block py-2 px-3 rounded ${isActive ? 'bg-teal-700 text-white' : 'text-white hover:bg-teal-700'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Invoices
            </NavLink>
            <NavLink 
              to="/bookings"
              className={({ isActive }) => 
                `block py-2 px-3 rounded ${isActive ? 'bg-teal-700 text-white' : 'text-white hover:bg-teal-700'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Bookings
            </NavLink>
            <NavLink 
              to="/reports"
              className={({ isActive }) => 
                `block py-2 px-3 rounded ${isActive ? 'bg-teal-700 text-white' : 'text-white hover:bg-teal-700'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Reports
            </NavLink>
            <Link 
              to="/quotations/new" 
              className="block mt-3 text-center bg-white text-teal-600 px-4 py-2 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              New Quotation
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;