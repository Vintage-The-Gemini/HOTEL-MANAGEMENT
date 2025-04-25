// client/src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, value, description, icon, color, linkTo }) => (
  <Link 
    to={linkTo}
    className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
  >
    <div className="p-5">
      <div className="flex items-center">
        <div className={`rounded-full p-3 ${color}`}>
          {icon}
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  </Link>
);

const RecentActivity = ({ date, title, description, type }) => {
  let typeColor = '';
  switch (type) {
    case 'inquiry':
      typeColor = 'bg-blue-100 text-blue-800';
      break;
    case 'quotation':
      typeColor = 'bg-purple-100 text-purple-800';
      break;
    case 'booking':
      typeColor = 'bg-green-100 text-green-800';
      break;
    default:
      typeColor = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <div className="flex py-4">
      <div className="flex-shrink-0 mr-4">
        <div className="w-2 h-2 mt-2 rounded-full bg-primary-500"></div>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-sm font-medium text-gray-900">{title}</h4>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
          <div className="flex items-center">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColor}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            <span className="ml-3 text-xs text-gray-500">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  // Mock data for dashboard metrics
  const metrics = [
    {
      title: 'Total Quotations',
      value: '42',
      description: '6 new quotations this week',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-primary-600',
      linkTo: '/quotations'
    },
    {
      title: 'Pending Inquiries',
      value: '18',
      description: '3 inquiries awaiting response',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
        </svg>
      ),
      color: 'bg-secondary-600',
      linkTo: '/inquiries'
    },
    {
      title: 'Active Bookings',
      value: '24',
      description: '5 check-ins scheduled today',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-accent-600',
      linkTo: '/bookings'
    },
    {
      title: 'Revenue This Month',
      value: '$15,240',
      description: '12% increase from last month',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-600',
      linkTo: '/reports'
    }
  ];

  // Mock data for recent activity
  const activities = [
    {
      date: '5m ago',
      title: 'New Quote Created',
      description: 'John Doe created a new quotation for Diamond Suite',
      type: 'quotation'
    },
    {
      date: '2h ago',
      title: 'Quotation Approved',
      description: 'Q-2023042 was approved by the client',
      type: 'quotation'
    },
    {
      date: '3h ago',
      title: 'New Inquiry Received',
      description: 'Sarah Johnson inquired about conference facilities',
      type: 'inquiry'
    },
    {
      date: '1d ago',
      title: 'Booking Confirmed',
      description: 'David Miller confirmed booking #BK1042',
      type: 'booking'
    },
    {
      date: '2d ago',
      title: 'Inquiry Updated',
      description: 'Emma Wilson updated her inquiry details',
      type: 'inquiry'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your hotel management system.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <DashboardCard key={index} {...metric} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6 lg:col-span-1">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <ul className="space-y-3">
            <li>
              <Link 
                to="/quotations/new" 
                className="flex items-center p-3 bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-md transition-colors"
              >
                <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Quotation
              </Link>
            </li>
            <li>
              <Link 
                to="/inquiry" 
                className="flex items-center p-3 bg-secondary-50 text-secondary-700 hover:bg-secondary-100 rounded-md transition-colors"
              >
                <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Add New Inquiry
              </Link>
            </li>
            <li>
              <Link 
                to="/reports" 
                className="flex items-center p-3 bg-accent-50 text-accent-700 hover:bg-accent-100 rounded-md transition-colors"
              >
                <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                View Reports
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all
            </a>
          </div>
          <div className="divide-y divide-gray-200">
            {activities.map((activity, index) => (
              <RecentActivity key={index} {...activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;