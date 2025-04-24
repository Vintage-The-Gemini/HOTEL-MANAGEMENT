import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Check if a menu item is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Define navigation menu items based on user role
  const getMenuItems = () => {
    const menuItems = [
      { name: 'Dashboard', path: '/', icon: '📊' },
      { name: 'Inquiries', path: '/inquiries', icon: '📝' },
      { name: 'Quotations', path: '/quotations', icon: '💼' },
      { name: 'Bookings', path: '/bookings', icon: '📅' },
      { name: 'Invoices', path: '/invoices', icon: '💰' },
      { name: 'Clients', path: '/clients', icon: '👥' },
    ];
    
    // Add admin-specific menu items
    if (user?.role === 'SYSTEM_ADMIN' || user?.role === 'HOTEL_ADMIN') {
      menuItems.push(
        { name: 'Agents', path: '/agents', icon: '🤝' },
        { name: 'Reports', path: '/reports', icon: '📈' },
        { name: 'Settings', path: '/settings', icon: '⚙️' }
      );
    }
    
    // Add hotel management for system admin
    if (user?.role === 'SYSTEM_ADMIN') {
      menuItems.push({ name: 'Hotels', path: '/hotels', icon: '🏨' });
    }
    
    return menuItems;
  };

  return (
    <div className="bg-indigo-800 text-white w-64 p-4 hidden md:block">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hotel Manager</h1>
        <p className="text-indigo-200 text-sm mt-1">Sales Pipeline</p>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {getMenuItems().map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded-lg ${
                  isActive(item.path)
                    ? 'bg-indigo-700 text-white'
                    : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 mb-6">
        <div className="flex items-center p-4">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-lg">{user?.name?.charAt(0) || 'U'}</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-indigo-200">{user?.role || 'Role'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
