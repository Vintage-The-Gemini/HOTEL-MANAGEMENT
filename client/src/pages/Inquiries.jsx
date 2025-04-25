// src/pages/Inquiries.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

// Mock data for the demo
const mockInquiries = [
  { 
    id: 'INQ-001', 
    client: { name: 'Acme Corporation', email: 'info@acme.com' }, 
    type: 'CONFERENCE', 
    createdAt: '2023-05-15', 
    eventStartDate: '2023-07-10',
    guestCount: 50,
    status: 'NEW',
    assignedTo: 'John Doe'
  },
  { 
    id: 'INQ-002', 
    client: { name: 'Globex Inc', email: 'bookings@globex.com' }, 
    type: 'LODGING', 
    createdAt: '2023-05-14', 
    eventStartDate: '2023-06-20',
    guestCount: 25,
    status: 'CONTACTED',
    assignedTo: 'Jane Smith'
  },
  { 
    id: 'INQ-003', 
    client: { name: 'Stark Industries', email: 'events@stark.com' }, 
    type: 'MIXED', 
    createdAt: '2023-05-13', 
    eventStartDate: '2023-08-05',
    guestCount: 100,
    status: 'QUOTATION_SENT',
    assignedTo: 'John Doe'
  },
  { 
    id: 'INQ-004', 
    client: { name: 'Wayne Enterprises', email: 'corporate@wayne.com' }, 
    type: 'CONFERENCE', 
    createdAt: '2023-05-12', 
    eventStartDate: '2023-07-15',
    guestCount: 75,
    status: 'QUALIFIED',
    assignedTo: 'Sarah Johnson'
  },
  { 
    id: 'INQ-005', 
    client: { name: 'LexCorp', email: 'events@lexcorp.com' }, 
    type: 'LODGING', 
    createdAt: '2023-05-11', 
    eventStartDate: '2023-06-15',
    guestCount: 30,
    status: 'CONVERTED',
    assignedTo: 'John Doe'
  },
  { 
    id: 'INQ-006', 
    client: { name: 'Oscorp Industries', email: 'info@oscorp.com' }, 
    type: 'MIXED', 
    createdAt: '2023-05-10', 
    eventStartDate: '2023-09-01',
    guestCount: 120,
    status: 'LOST',
    assignedTo: 'Jane Smith'
  }
];

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setInquiries(mockInquiries);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter inquiries based on search term and filters
  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || inquiry.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || inquiry.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'NEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONTACTED':
        return 'bg-blue-100 text-blue-800';
      case 'QUALIFIED':
        return 'bg-indigo-100 text-indigo-800';
      case 'QUOTATION_SENT':
        return 'bg-purple-100 text-purple-800';
      case 'CONVERTED':
        return 'bg-green-100 text-green-800';
      case 'LOST':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format status for display
  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
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
        <h1 className="text-2xl font-semibold text-gray-900">Inquiries</h1>
      </div>
      
      <div className="mt-6">
        {/* Actions bar */}
        <div className="md:flex md:items-center md:justify-between">
          {/* Search and filters */}
          <div className="flex-1 min-w-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="flex rounded-md shadow-sm flex-1">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-md pl-10 sm:text-sm border-gray-300"
                  placeholder="Search inquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <div className="inline-flex shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  <FunnelIcon className="h-4 w-4 mr-1" />
                  Status
                </span>
                <select
                  className="focus:ring-primary-500 focus:border-primary-500 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ALL">All</option>
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="QUALIFIED">Qualified</option>
                  <option value="QUOTATION_SENT">Quotation Sent</option>
                  <option value="CONVERTED">Converted</option>
                  <option value="LOST">Lost</option>
                </select>
              </div>
              
              <div className="inline-flex shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  <FunnelIcon className="h-4 w-4 mr-1" />
                  Type
                </span>
                <select
                  className="focus:ring-primary-500 focus:border-primary-500 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="ALL">All</option>
                  <option value="CONFERENCE">Conference</option>
                  <option value="LODGING">Lodging</option>
                  <option value="MIXED">Mixed</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Add new inquiry button */}
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Inquiry
            </button>
          </div>
        </div>
        
        {/* Inquiries table */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Client
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Event Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Assigned To
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredInquiries.map((inquiry) => (
                      <tr key={inquiry.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-primary-600 sm:pl-6">
                          <Link to={`/inquiries/${inquiry.id}`}>
                            {inquiry.id}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          <div className="font-medium">{inquiry.client.name}</div>
                          <div className="text-gray-500">{inquiry.client.email}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {inquiry.type === 'CONFERENCE' ? 'Conference' : 
                           inquiry.type === 'LODGING' ? 'Lodging' : 'Mixed'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(inquiry.eventStartDate).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(inquiry.status)}`}>
                            {formatStatus(inquiry.status)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {inquiry.assignedTo}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            to={`/inquiries/${inquiry.id}`}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            View<span className="sr-only">, {inquiry.id}</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* No results */}
        {filteredInquiries.length === 0 && (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No inquiries found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inquiries;