// client/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('-600', '-100')}`}>
        {icon}
      </div>
    </div>
  </div>
);

const ActivityItem = ({ date, title, description, type }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'quotation':
        return 'bg-emerald-100 text-emerald-800';
      case 'invoice':
        return 'bg-blue-100 text-blue-800';
      case 'payment':
        return 'bg-green-100 text-green-800';
      case 'booking':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex gap-4 py-3">
      <div className="flex-shrink-0 w-2 mt-2 rounded-full bg-gray-200"></div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <span className={`text-xs rounded-full px-2 py-1 font-medium ${getTypeColor(type)}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <p className="font-medium mt-1">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    pendingQuotations: 0,
    pendingInvoices: 0,
    totalRevenue: 0,
    occupancyRate: 0,
  });
  
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be separate API calls
        setTimeout(() => {
          // Mock stats data
          setStats({
            pendingQuotations: 5,
            pendingInvoices: 7,
            totalRevenue: 1250000,
            occupancyRate: 72,
          });
          
          // Mock recent activities
          setRecentActivities([
            {
              id: 1,
              date: '25 Apr, 2025',
              title: 'New quotation created',
              description: 'Q-20250425-001 for Ndubai Investments',
              type: 'quotation'
            },
            {
              id: 2,
              date: '24 Apr, 2025',
              title: 'Invoice sent',
              description: 'INV-20250424-003 for KES 89,550 to Onyango Holdings',
              type: 'invoice'
            },
            {
              id: 3,
              date: '23 Apr, 2025',
              title: 'Payment received',
              description: 'KES 125,075 from Wanjiku Enterprises Ltd',
              type: 'payment'
            },
            {
              id: 4,
              date: '22 Apr, 2025',
              title: 'New booking confirmed',
              description: 'BK1004 from Samuel Kamau for May 10-12, 2025',
              type: 'booking'
            },
            {
              id: 5,
              date: '21 Apr, 2025',
              title: 'Quotation accepted',
              description: 'Q-20250418-003 from Onyango Holdings',
              type: 'quotation'
            },
          ]);
          
          // Mock upcoming bookings
          setUpcomingBookings([
            {
              id: 'BK1004',
              clientName: 'Samuel Kamau',
              checkIn: '2025-05-10',
              checkOut: '2025-05-12',
              roomType: 'Deluxe Room',
              guests: 2,
              status: 'Confirmed'
            },
            {
              id: 'BK1005',
              clientName: 'Wanjiku Enterprises Ltd',
              checkIn: '2025-06-15',
              checkOut: '2025-06-18',
              roomType: 'Executive Suite',
              guests: 1,
              status: 'Pending'
            },
            {
              id: 'BK1006',
              clientName: 'Mombasa Beach Resort',
              checkIn: '2025-06-30',
              checkOut: '2025-07-05',
              roomType: 'Conference Hall',
              guests: 50,
              status: 'Confirmed'
            },
          ]);
          
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to HotelFlow Management System</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          <Link to="/quotations/new" className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            New Quotation
          </Link>
          <Link to="/invoices" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            View Invoices
          </Link>
          <Link to="/inquiry" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            New Booking
          </Link>
          <Link to="/reports" className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            View Reports
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Pending Quotations" 
          value={stats.pendingQuotations} 
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          }
          color="border-emerald-600"
        />
        <StatCard 
          title="Pending Invoices" 
          value={stats.pendingInvoices} 
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          }
          color="border-blue-600"
        />
        <StatCard 
          title="Total Revenue (KES)" 
          value={stats.totalRevenue.toLocaleString()} 
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          }
          color="border-green-600"
        />
        <StatCard 
          title="Occupancy Rate (%)" 
          value={stats.occupancyRate} 
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          }
          color="border-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
            <Link to="/activity" className="text-sm text-teal-600 hover:text-teal-800">View All</Link>
          </div>
          <div className="divide-y">
            {recentActivities.map(activity => (
              <ActivityItem 
                key={activity.id}
                date={activity.date}
                title={activity.title}
                description={activity.description}
                type={activity.type}
              />
            ))}
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Upcoming Bookings</h2>
            <Link to="/bookings" className="text-sm text-teal-600 hover:text-teal-800">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Client</th>
                  <th className="px-4 py-2">Check-in</th>
                  <th className="px-4 py-2">Room</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {upcomingBookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{booking.id}</td>
                    <td className="px-4 py-3 text-sm">{booking.clientName}</td>
                    <td className="px-4 py-3 text-sm">{new Date(booking.checkIn).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm">{booking.roomType}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;