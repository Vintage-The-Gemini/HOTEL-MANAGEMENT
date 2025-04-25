// client/src/pages/Quotations.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Quotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Mock data for demo purposes
  const mockQuotations = [
    {
      id: '1',
      reference: 'Q-20250420-001',
      clientName: 'Samuel Kamau',
      eventDate: '2025-05-10',
      validUntil: '2025-04-27',
      total: 72105,
      status: 'DRAFT',
      createdAt: '2025-04-20'
    },
    {
      id: '2',
      reference: 'Q-20250419-002',
      clientName: 'Wanjiku Enterprises Ltd',
      eventDate: '2025-06-15',
      validUntil: '2025-04-26',
      total: 125075,
      status: 'SENT',
      createdAt: '2025-04-19'
    },
    {
      id: '3',
      reference: 'Q-20250418-003',
      clientName: 'Onyango Holdings',
      eventDate: '2025-05-22',
      validUntil: '2025-04-25',
      total: 89550,
      status: 'ACCEPTED',
      createdAt: '2025-04-18'
    },
    {
      id: '4',
      reference: 'Q-20250417-004',
      clientName: 'Esther Njeri',
      eventDate: '2025-07-05',
      validUntil: '2025-04-24',
      total: 158025,
      status: 'REJECTED',
      createdAt: '2025-04-17'
    },
    {
      id: '5',
      reference: 'Q-20250416-005',
      clientName: 'Mombasa Beach Resort',
      eventDate: '2025-06-30',
      validUntil: '2025-04-23',
      total: 93500,
      status: 'EXPIRED',
      createdAt: '2025-04-16'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchQuotations = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setQuotations(mockQuotations);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching quotations:', error);
        setLoading(false);
      }
    };

    fetchQuotations();
  }, []);

  const getFilteredQuotations = () => {
    if (filter === 'all') {
      return quotations;
    }
    return quotations.filter(q => q.status === filter);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      // In a real app, this would call an API
      setQuotations(quotations.filter(q => q.id !== id));
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-200 text-gray-800';
      case 'SENT':
        return 'bg-blue-100 text-blue-800';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'EXPIRED':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quotations</h2>
        <Link 
          to="/quotations/new" 
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          Create New Quotation
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('DRAFT')} 
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'DRAFT' 
                  ? 'bg-gray-300 text-gray-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Draft
            </button>
            <button 
              onClick={() => setFilter('SENT')} 
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'SENT' 
                  ? 'bg-blue-200 text-blue-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sent
            </button>
            <button 
              onClick={() => setFilter('ACCEPTED')} 
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'ACCEPTED' 
                  ? 'bg-green-200 text-green-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Accepted
            </button>
            <button 
              onClick={() => setFilter('REJECTED')} 
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'REJECTED' 
                  ? 'bg-red-200 text-red-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600 mb-2"></div>
            <p className="text-gray-500">Loading quotations...</p>
          </div>
        ) : getFilteredQuotations().length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No quotations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getFilteredQuotations().map((quotation) => (
                  <tr key={quotation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          to={`/quotations/edit/${quotation.id}`} 
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(quotation.id)}
                          className="text-red-600 hover:text-red-900 ml-3"
                        >
                          Delete
                        </button>
                        <Link 
                          to={`/quotations/download/${quotation.id}`} 
                          className="text-emerald-600 hover:text-emerald-900 ml-3"
                        >
                          Download PDF
                        </Link>
                        {quotation.status === 'ACCEPTED' && (
                          <Link 
                            to={`/invoices/create/${quotation.id}`} 
                            className="text-blue-600 hover:text-blue-900 ml-3"
                          >
                            Create Invoice
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

export default Quotations