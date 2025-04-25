// client/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary-700">Hotel<span className="text-accent-600">Flow</span></span>
            </div>
            <p className="mt-2 text-sm text-gray-500 max-w-md">
              Streamline your hotel management process with our comprehensive booking and quotation system.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
                Navigation
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-500 hover:text-primary-700 text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-gray-500 hover:text-primary-700 text-sm">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/inquiries" className="text-gray-500 hover:text-primary-700 text-sm">
                    Inquiries
                  </Link>
                </li>
                <li>
                  <Link to="/quotations" className="text-gray-500 hover:text-primary-700 text-sm">
                    Quotations
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/reports" className="text-gray-500 hover:text-primary-700 text-sm">
                    Reports
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary-700 text-sm">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary-700 text-sm">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
                Contact
              </h3>
              <p className="text-sm text-gray-500">
                <span className="block">Email: support@hotelflow.com</span>
                <span className="block mt-1">Phone: +1 (555) 123-4567</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} HotelFlow. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-primary-700 mr-4">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-primary-700">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;