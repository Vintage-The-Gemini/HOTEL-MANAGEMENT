// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-4/12 mb-6 md:mb-0">
            <h4 className="text-2xl font-bold mb-4">HotelFlow</h4>
            <p className="text-gray-400">
              Simplifying hotel management with our comprehensive booking and sales pipeline solution.
            </p>
          </div>
          
          <div className="w-full md:w-3/12 mb-6 md:mb-0">
            <h5 className="text-lg font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link to="/inquiries" className="text-gray-400 hover:text-white transition-colors duration-200">Inquiries</Link></li>
              <li><Link to="/bookings" className="text-gray-400 hover:text-white transition-colors duration-200">Bookings</Link></li>
              <li><Link to="/reports" className="text-gray-400 hover:text-white transition-colors duration-200">Reports</Link></li>
            </ul>
          </div>
          
          <div className="w-full md:w-3/12">
            <h5 className="text-lg font-bold mb-4">Contact</h5>
            <p className="text-gray-400 mb-2">Email: info@hotelflow.com</p>
            <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} HotelFlow Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;