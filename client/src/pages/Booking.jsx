// client/src/pages/Booking.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Booking = () => {
  // Mock data for bookings
  const initialBookings = [
    {
      id: 'BK-2023-001',
      clientName: 'John Doe',
      clientEmail: 'john.doe@example.com',
      roomType: 'Deluxe Suite',
      checkIn: '2023-05-10',
      checkOut: '2023-05-15',
      guests: 2,
      status: 'Confirmed',
      totalAmount: 1250.00,
      paymentStatus: 'Paid',
      createdAt: '2023-04-25'
    },
    {
      id: 'BK-2023-002',
      clientName: 'Jane Smith',
      clientEmail: 'jane.smith@example.com',
      roomType: 'Standard Room',
      checkIn: '2023-05-15',
      checkOut: '2023-05-18',
      guests: 1,
      status: 'Confirmed',
      totalAmount: 450.00,
      paymentStatus: 'Pending',
      createdAt: '2023-04-28'
    },
    {
      id: 'BK-2023-003',
      clientName: 'Michael Brown',
      clientEmail: 'michael.brown@example.com',
      roomType: 'Executive Suite',
      checkIn: '2023-06-01',
      checkOut: '2023-06-05',
      guests: 2,
      status: 'Pending',
      totalAmount: 1800.00,
      paymentStatus: 'Partial',
      createdAt: '2023-04-30'
    },
    {
      id: 'BK-2023-004',
      clientName: 'Emily Wilson',
      clientEmail: 'emily.wilson@example.com',
      roomType: 'Family Room',
      checkIn: '2023-05-20',
      checkOut: '2023-05-25',
      guests: 4,
      status: 'Cancelled',
      totalAmount: 2100.00,
      paymentStatus: 'Refunded',
      createdAt: '2023-04-15'
    },
    {
      id: 'BK-2023-005',
      clientName: 'David Miller',
      clientEmail: 'david.miller@example.com',
      roomType: 'Presidential Suite',
      checkIn: '2023-06-10',
      checkOut: '2023-06-15',
      guests: 2,
      status: 'Confirmed',
      totalAmount: 3500.00,
      paymentStatus: 'Paid',
      createdAt: '2023-04-22'
    }
  ];

  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle delete booking
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== id));
    }
  };

  // Handle view booking details
  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  // Handle update booking status
  const handleStatusChange = (id, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  // Status badge component with appropriate colors
  const StatusBadge = ({ status }) => {
    let badgeClass = '';
    
    switch (status) {
      case 'Confirmed':
        badgeClass = 'bg-green-100 text-green-800';
        break;
      case 'Pending':
        badgeClass = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Cancelled':
        badgeClass = 'bg-red-100 text-red-800';
        break;
      default:
        badgeClass = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeClass}`}>
        {status}
      </span>
    );
  };

  // Payment status badge component
  const PaymentBadge = ({ status }) => {
    let badgeClass = '';
    
    switch (status) {
      case 'Paid':
        badgeClass = 'bg-green-100 text-green-800';
        break;
      case 'Pending':
        badgeClass = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Partial':
        badgeClass = 'bg-blue-100 text-blue-800';
        break;
      case 'Refunded':
        badgeClass = 'bg-purple-100 text-purple-800';
        break;
      default:
        badgeClass = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeClass}`}>
        {status}
      </span>
    );
  };

  // Booking details modal
  const BookingDetailsModal = ({ booking, onClose }) => {
    if (!booking) return null;
    
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
          <div className="flex justify-between items-center p-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Booking Details - {booking.id}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Client Information</h4>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Name:</span> {booking.clientName}
                  </p>
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Email:</span> {booking.clientEmail}
                  </p>
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Guests:</span> {booking.guests}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Booking Information</h4>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Room Type:</span> {booking.roomType}
                  </p>
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Check-in:</span> {booking.checkIn}
                  </p>
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Check-out:</span> {booking.checkOut}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-500">Payment Details</h4>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Total Amount:</span> ${booking.totalAmount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Payment Status:</span> <PaymentBadge status={booking.paymentStatus} />
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-500">Booking Status</h4>
              <div className="mt-2">
                <div className="inline-flex items-center">
                  <StatusBadge status={booking.status} />
                  <span className="ml-2 text-sm text-gray-500">Created on {booking.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Print Booking
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and track all your hotel bookings in one place.
        </p>
      </div>
      
      {/* Filters and search */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-3 md:space-y-0">
          <div className="w-full md:w-64">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="search"
                type="search"
                placeholder="Search bookings..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 text-sm font-medium ${viewMode === 'list' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'} rounded-l-md`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 text-sm font-medium ${viewMode === 'calendar' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'} rounded-r-md`}
              >
                Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bookings list */}
      {viewMode === 'list' ? (
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                        <button
                          onClick={() => handleViewDetails(booking)}
                          className="hover:underline focus:outline-none"
                        >
                          {booking.id}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.clientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.roomType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.checkIn} to {booking.checkOut}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <PaymentBadge status={booking.paymentStatus} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleViewDetails(booking)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => handleDelete(booking.id)} 
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-500">
                      No bookings found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Calendar view (simplified for demo)
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Calendar View</h3>
            <p className="text-gray-500">
              Calendar view is under development. Please use list view for now.
            </p>
            <button
              onClick={() => setViewMode('list')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Switch to List View
            </button>
          </div>
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex justify-end">
        <Link
          to="/quotations/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create New Booking
        </Link>
      </div>
      
      {/* Booking details modal */}
      {isModalOpen && (
        <BookingDetailsModal 
          booking={selectedBooking} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
};

export default Booking;