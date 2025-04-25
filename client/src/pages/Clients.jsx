// src/pages/Clients.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Mock data for the demo
const mockClients = [
  { 
    id: '1', 
    name: 'Acme Corporation', 
    type: 'CORPORATE', 
    contact: 'John Doe', 
    email: 'john@acme.com', 
    phone: '555-123-4567',
    totalBookings: 12,
    lastBookingDate: '2023-04-15'
  },
  { 
    id: '2', 
    name: 'Globex Inc', 
    type: 'CORPORATE', 
    contact: 'Jane Smith', 
    email: 'jane@globex.com', 
    phone: '555-987-6543',
    totalBookings: 8,
    lastBookingDate: '2023-05-02'
  },
  { 
    id: '3', 
    name: 'Stark Industries', 
    type: 'CORPORATE', 
    contact: 'Tony Stark', 
    email: 'tony@stark.com', 
    phone: '555-111-2222',
    totalBookings: 15,
    lastBookingDate: '2023-05-10'
  },
  { 
    id: '4', 
    name: 'Wayne Enterprises', 
    type: 'CORPORATE', 
    contact: 'Bruce Wayne', 
    email: 'bruce@wayne.com', 
    phone: '555-333-4444',
    totalBookings: 7,
    lastBookingDate: '2023-03-25'
  },
  { 
    id: '5', 
    name: 'Michael Johnson', 
    type: 'INDIVIDUAL', 
    contact: 'Michael Johnson', 
    email: 'michael@example.com', 
    phone: '555-555-5555',
    totalBookings: 3,
    lastBookingDate: '2023-05-05'
  },
  { 
    id: '6', 
    name: 'Sarah Williams', 
    type: 'INDIVIDUAL', 
    contact: 'Sarah Williams', 
    email: 'sarah@example.com', 
    phone: '555-666-7777',
    totalBookings: 2,
    lastBookingDate: '2023-04-18'
  }
];

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setClients(mockClients);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter clients based on search term and filter type
  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'ALL' || client.type === filterType;
    
    return matchesSearch && matchesType;
  });

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
        <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
      </div>
      
      <div className="mt-6">
        {/* Actions bar */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-l-md pl-10 sm:text-sm border-gray-300"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="ALL">All Types</option>
                <option value="CORPORATE">Corporate</option>
                <option value="INDIVIDUAL">Individual</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Client
            </button>
          </div>
        </div>
        
        {/* Clients table */}
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
                        Name
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
                        Contact
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Bookings
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
                    {filteredClients.map((client) => (
                      <tr key={client.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {client.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            client.type === 'CORPORATE' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {client.type === 'CORPORATE' ? 'Corporate' : 'Individual'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {client.contact}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {client.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {client.totalBookings} <span className="text-xs text-gray-400">(Last: {new Date(client.lastBookingDate).toLocaleDateString()})</span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            to={`/clients/${client.id}`}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            View<span className="sr-only">, {client.name}</span>
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
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;