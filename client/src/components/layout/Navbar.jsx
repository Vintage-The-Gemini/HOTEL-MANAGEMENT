// src/components/layout/Navbar.jsx
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BellIcon, 
  UserCircleIcon, 
  Bars3Icon, 
  CogIcon 
} from '@heroicons/react/24/outline';

const Navbar = ({ setSidebarOpen, user }) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const userDropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock notifications
  const notifications = [
    { _id: '1', title: 'New Inquiry', message: 'Acme Corp has submitted a new inquiry', isRead: false, createdAt: new Date() },
    { _id: '2', title: 'Quotation Accepted', message: 'Wayne Enterprises has accepted quotation Q-WAY-2304-0004', isRead: false, createdAt: new Date(Date.now() - 3600000) },
    { _id: '3', title: 'Payment Received', message: 'Payment received from Globex Inc', isRead: false, createdAt: new Date(Date.now() - 7200000) }
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              className="md:hidden px-4 text-gray-500 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">HotelMS</span>
            </div>
          </div>

          <div className="flex items-center">
            {/* Notifications dropdown */}
            <div className="relative ml-3" ref={notificationsRef}>
              <button
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>

              {notificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    <div className="px-4 py-2 font-medium text-gray-700 border-b border-gray-200">
                      Notifications
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <button
                          key={notification._id}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="font-medium">{notification.title}</div>
                          <div>{notification.message}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {notification.createdAt.toLocaleString()}
                          </div>
                        </button>
                      ))}
                    </div>
                    <Link
                      to="/notifications"
                      className="block px-4 py-2 text-sm text-center text-blue-600 hover:text-blue-700 border-t border-gray-200"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User dropdown */}
            <div className="relative ml-3" ref={userDropdownRef}>
              <button
                className="flex text-sm rounded-full focus:outline-none"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="flex items-center">
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-700 hidden md:block">{user?.name || 'Admin User'}</span>
                </div>
              </button>

              {userDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      <div>{user?.name || 'Admin User'}</div>
                      <div className="text-xs text-gray-500">{user?.email || 'admin@hotelms.com'}</div>
                    </div>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <CogIcon className="mr-2 h-4 w-4" />
                        Settings
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;