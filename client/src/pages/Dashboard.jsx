// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  ClipboardDocumentListIcon, 
  DocumentTextIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Mock data for the demo
const mockStats = {
  inquiries: {
    total: 35,
    new: 8,
    inProgress: 12,
    converted: 15
  },
  quotations: {
    total: 28,
    pending: 7,
    accepted: 15,
    rejected: 6
  },
  revenue: {
    total: 125000,
    thisMonth: 28500,
    lastMonth: 32000
  },
  clients: {
    total: 48,
    new: 5
  },
  recentInquiries: [
    { id: 'INQ-001', client: 'Acme Corp', date: '2023-05-15', type: 'Conference', status: 'NEW' },
    { id: 'INQ-002', client: 'Globex Inc', date: '2023-05-14', type: 'Lodging', status: 'CONTACTED' },
    { id: 'INQ-003', client: 'Stark Industries', date: '2023-05-13', type: 'Mixed', status: 'QUOTATION_SENT' },
    { id: 'INQ-004', client: 'Wayne Enterprises', date: '2023-05-12', type: 'Conference', status: 'QUALIFIED' }
  ],
  recentQuotations: [
    { id: 'Q-001', client: 'Acme Corp', date: '2023-05-15', amount: 4500, status: 'SENT' },
    { id: 'Q-002', client: 'Globex Inc', date: '2023-05-14', amount: 8200, status: 'ACCEPTED' },
    { id: 'Q-003', client: 'Stark Industries', date: '2023-05-13', amount: 12000, status: 'SENT' },
    { id: 'Q-004', client: 'Wayne Enterprises', date: '2023-05-12', amount: 6800, status: 'REJECTED' }
  ]
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(mockStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
    
    // In a real app, you would fetch data from your API
    // const fetchDashboardData = async () => {
    //   try {
    //     const response = await axios.get('/api/dashboard');
    //     setStats(response.data);
    //   } catch (error) {
    //     console.error('Error fetching dashboard data:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // 
    // fetchDashboardData();
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {user?.name || 'User'}! Here's what's happening with your hotel.
        </p>
      </div>

      <div className="mt-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Inquiries stat card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <ClipboardDocumentListIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Inquiries</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.inquiries.total}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/inquiries" className="font-medium text-primary-600 hover:text-primary-500">View all</Link>
              </div>
            </div>
          </div>

          {/* Quotations stat card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Quotations</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.quotations.total}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/quotations" className="font-medium text-blue-600 hover:text-blue-500">View all</Link>
              </div>
            </div>
          </div>

          {/* Revenue stat card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Monthly Revenue</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{formatCurrency(stats.revenue.thisMonth)}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/reports" className="font-medium text-green-600 hover:text-green-500">View reports</Link>
              </div>
            </div>
          </div>

          {/* Clients stat card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <UserGroupIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Clients</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.clients.total}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/clients" className="font-medium text-purple-600 hover:text-purple-500">View all</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent inquiries & quotations */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent inquiries */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-5 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Inquiries</h3>
                <Link to="/inquiries" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                  View all
                </Link>
              </div>
            </div>
            <div className="px-5 py-3">
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {stats.recentInquiries.map((inquiry) => (
                    <li key={inquiry.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {inquiry.status === 'NEW' ? (
                            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                              <ClockIcon className="h-5 w-5 text-red-600" />
                            </div>
                          ) : inquiry.status === 'QUOTATION_SENT' ? (
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <ClipboardDocumentListIcon className="h-5 w-5 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {inquiry.client}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {inquiry.type} • {new Date(inquiry.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <Link
                            to={`/inquiries/${inquiry.id}`}
                            className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Recent quotations */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-5 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Quotations</h3>
                <Link to="/quotations" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
            </div>
            <div className="px-5 py-3">
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {stats.recentQuotations.map((quotation) => (
                    <li key={quotation.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {quotation.status === 'ACCEPTED' ? (
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckCircleIcon className="h-5 w-5 text-green-600" />
                            </div>
                          ) : quotation.status === 'REJECTED' ? (
                            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                              <ClockIcon className="h-5 w-5 text-red-600" />
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {quotation.client}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {formatCurrency(quotation.amount)} • {new Date(quotation.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <Link
                            to={`/quotations/${quotation.id}`}
                            className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;