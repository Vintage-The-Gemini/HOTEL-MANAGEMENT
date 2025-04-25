// client/src/pages/Invoices.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Mock data for demo purposes
  const mockInvoices = [
    {
      id: '1',
      invoiceNumber: 'INV-20250420-001',
      reference: 'Q-20250420-001',
      clientName: 'Samuel Kamau',
      issueDate: '2025-04-20',
      dueDate: '2025-05-20',
      total: 72105,
      status: 'PENDING',
      createdAt: '2025-04-20'
    },
    {
      id: '2',
      invoiceNumber: 'INV-20250419-002',
      reference: 'Q-20250419-002',
      clientName: 'Wanjiku Enterprises Ltd',
      issueDate: '2025-04-19',
      dueDate: '2025-05-19',
      total: 125075,
      status: 'PAID',
      createdAt: '2025-04-19'
    },
    {
      id: '3',
      invoiceNumber: 'INV-20250418-003',
      reference: 'Q-20250418-003',
      clientName: 'Onyango Holdings',
      issueDate: '2025-04-18',
      dueDate: '2025-05-18',
      total: 89550,
      status: 'PARTIALLY_PAID',
      createdAt: '2025-04-18'
    },
    {
      id: '4',
      invoiceNumber: 'INV-20250417-004',
      reference: 'Q-20250417-004',
      clientName: 'Esther Njeri',
      issueDate: '2025-04-17',
      dueDate: '2025-04-17',
      total: 158025,
      status: 'OVERDUE',
      createdAt: '2025-04-17'
    },
    {
      id: '5',
      invoiceNumber: 'INV-20250416-005',
      reference: 'Q-20250416-005',
      clientName: 'Mombasa Beach Resort',
      issueDate: '2025-04-16',
      dueDate: '2025-05-16',
      total: 93500,
      status: 'CANCELLED',
      createdAt: '2025-04-16'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchInvoices = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setInvoices(mockInvoices);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const getFilteredInvoices = () => {
    if (filter === 'all') {
      return invoices;
    }
    return invoices.filter(inv => inv.status === filter);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      // In a real app, this would call an API
      setInvoices(invoices.filter(inv => inv.id !== id));
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PARTIALLY_PAID':
        return 'bg-blue-100 text-blue-800';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to format status display
  const formatStatus = (status) => {
    return status
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Invoices</h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('PENDING')} 
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'PENDING' 
                  ? 'bg-yellow-200 text-yellow-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter('PAID')} 
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'PAID' 
                  ? 'bg-green-200 text-green-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Paid
            </button>
            <button 
              onClick={() => setFilter('PARTIALLY_PAID')} 
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'PARTIALLY_PAID' 
                  ? 'bg-blue-200 text-blue-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Partially Paid
            </button>
            <button 
              onClick={() => setFilter('OVERDUE')} 
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'OVERDUE' 
                  ? 'bg-red-200 text-red-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Overdue
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-2"></div>
            <p className="text-gray-500">Loading invoices...</p>
          </div>
        ) : getFilteredInvoices().length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No invoices found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quotation Ref</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getFilteredInvoices().map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/invoices/${invoice.id}`} className="text-indigo-600 hover:text-indigo-800">
                        {invoice.invoiceNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/quotations/${invoice.reference.split('-')[1]}`} className="text-gray-600 hover:text-gray-800">
                        {invoice.reference}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{invoice.clientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                      KES {invoice.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(invoice.status)}`}>
                        {formatStatus(invoice.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          to={`/invoices/edit/${invoice.id}`} 
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(invoice.id)}
                          className="text-red-600 hover:text-red-900 ml-3"
                        >
                          Delete
                        </button>
                        <Link 
                          to={`/invoices/download/${invoice.id}`} 
                          className="text-blue-600 hover:text-blue-900 ml-3"
                        >
                          Download PDF
                        </Link>
                        {(invoice.status === 'PENDING' || invoice.status === 'PARTIALLY_PAID') && (
                          <Link 
                            to={`/payments/create/${invoice.id}`} 
                            className="text-green-600 hover:text-green-900 ml-3"
                          >
                            Record Payment
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;