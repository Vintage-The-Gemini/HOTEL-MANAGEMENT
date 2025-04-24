import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalInquiries: 0,
    activeQuotations: 0,
    confirmedBookings: 0,
    pendingPayments: 0
  });
  
  const [loading, setLoading] = useState(true);
  
  // Mock data for demo purposes
  const bookingData = [
    { name: 'Jan', inquiries: 40, quotations: 24, bookings: 18 },
    { name: 'Feb', inquiries: 35, quotations: 20, bookings: 15 },
    { name: 'Mar', inquiries: 50, quotations: 32, bookings: 22 },
    { name: 'Apr', inquiries: 60, quotations: 42, bookings: 30 },
    { name: 'May', inquiries: 45, quotations: 30, bookings: 20 },
    { name: 'Jun', inquiries: 70, quotations: 48, bookings: 38 },
  ];
  
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // For demo purposes, we'll just simulate a loading delay
    const timer = setTimeout(() => {
      setStats({
        totalInquiries: 78,
        activeQuotations: 32,
        confirmedBookings: 25,
        pendingPayments: 18
      });
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-500">Loading dashboard data...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Hotel Management System</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Total Inquiries</h3>
              <p className="text-3xl font-bold text-gray-800">{stats.totalInquiries}</p>
              <div className="text-green-500 text-sm mt-2">
                <span>↑ 12% from last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Active Quotations</h3>
              <p className="text-3xl font-bold text-gray-800">{stats.activeQuotations}</p>
              <div className="text-green-500 text-sm mt-2">
                <span>↑ 7% from last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Confirmed Bookings</h3>
              <p className="text-3xl font-bold text-gray-800">{stats.confirmedBookings}</p>
              <div className="text-green-500 text-sm mt-2">
                <span>↑ 5% from last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Pending Payments</h3>
              <p className="text-3xl font-bold text-gray-800">{stats.pendingPayments}</p>
              <div className="text-red-500 text-sm mt-2">
                <span>↑ 3% from last month</span>
              </div>
            </div>
          </div>
          
          {/* Main Dashboard Content */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Recent Activity
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Latest updates from the system.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    New Inquiry
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Corporate Event - ABC Corporation - 150 guests
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Quotation Sent
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Wedding Reception - John & Jane Smith - 75 guests
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Booking Confirmed
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Annual Conference - Tech Innovations Inc. - 200 attendees
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Payment Received
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    INV-2023-042 - Global Partners Ltd. - ,580.00
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          
          {/* Add more dashboard components here */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
