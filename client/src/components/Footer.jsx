// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-4/12 mb-6 md:mb-0">
            <h4 className="text-2xl font-bold mb-4">Hotel<span className="text-teal-400">Flow</span></h4>
            <p className="text-gray-400">
              Streamline your hotel operations with our comprehensive booking and sales pipeline solution.
            </p>
          </div>
          
          <div className="w-full md:w-3/12 mb-6 md:mb-0">
            <h5 className="text-lg font-bold mb-4 text-teal-400">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">Dashboard</Link></li>
              <li><Link to="/quotations" className="text-gray-400 hover:text-white transition-colors duration-200">Quotations</Link></li>
              <li><Link to="/invoices" className="text-gray-400 hover:text-white transition-colors duration-200">Invoices</Link></li>
              <li><Link to="/bookings" className="text-gray-400 hover:text-white transition-colors duration-200">Bookings</Link></li>
              <li><Link to="/reports" className="text-gray-400 hover:text-white transition-colors duration-200">Reports</Link></li>
            </ul>
          </div>
          
          <div className="w-full md:w-3/12">
            <h5 className="text-lg font-bold mb-4 text-teal-400">Contact</h5>
            <p className="text-gray-400 mb-2">Email: info@hotelflow.co.ke</p>
            <p className="text-gray-400">Phone: +254 712 345 678</p>
            <p className="text-gray-400 mt-2">Moi Avenue, Nairobi</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} HotelFlow Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;