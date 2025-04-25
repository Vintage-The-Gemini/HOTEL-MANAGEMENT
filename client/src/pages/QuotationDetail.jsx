// src/pages/QuotationDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  UserGroupIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  PaperClipIcon,
  ChatBubbleLeftEllipsisIcon,
  PencilSquareIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

// Mock data for the demo
const mockQuotationDetails = {
  id: 'Q-001',
  reference: 'Q-ACM-2304-0001',
  inquiryId: 'INQ-001',
  client: { 
    id: '1',
    name: 'Acme Corporation', 
    email: 'info@acme.com',
    phone: '555-123-4567',
    contact: 'John Doe'
  },
  eventDetails: {
    type: 'CONFERENCE',
    startDate: '2023-07-10',
    endDate: '2023-07-12',
    guestCount: 50
  },
  lineItems: [
    { 
      category: 'CONFERENCE', 
      description: 'Main Conference Room (Ballroom A)', 
      quantity: 2, 
      unit: 'Days', 
      unitPrice: 1500, 
      subtotal: 3000 
    },
    { 
      category: 'CONFERENCE', 
      description: 'Projector & Sound System', 
      quantity: 2, 
      unit: 'Days', 
      unitPrice: 250, 
      subtotal: 500 
    },
    { 
      category: 'LODGING', 
      description: 'Deluxe Room (Single Occupancy)', 
      quantity: 25, 
      unit: 'Nights', 
      unitPrice: 150, 
      subtotal: 3750 
    },
    { 
      category: 'FOOD_BEVERAGE', 
      description: 'Lunch Buffet', 
      quantity: 50, 
      unit: 'Persons', 
      unitPrice: 35, 
      subtotal: 1750 
    },
    { 
      category: 'FOOD_BEVERAGE', 
      description: 'Coffee Breaks', 
      quantity: 100, 
      unit: 'Servings', 
      unitPrice: 10, 
      subtotal: 1000 
    },
  ],
  subtotal: 10000,
  discounts: [
    { type: 'CORPORATE', description: 'Corporate Client Discount', amount: 500 }
  ],
  taxes: [
    { name: 'Sales Tax', rate: 8.5, amount: 807.5 }
  ],
  total: 10307.5,
  status: 'SENT',
  validUntil: '2023-05-22',
  notes: [
    { 
      text: 'Initial quotation based on client requirements.', 
      addedBy: 'John Doe', 
      addedAt: '2023-05-15T09:30:00' 
    },
    { 
      text: 'Added corporate discount as per sales manager approval.', 
      addedBy: 'Jane Smith', 
      addedAt: '2023-05-15T11:15:00' 
    }
  ],
  createdAt: '2023-05-15T09:00:00',
  updatedAt: '2023-05-15T11:15:00',
  createdBy: 'John Doe'
};

const QuotationDetail = () => {
  const { id } = useParams();
  const [quotation, setQuotation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    // Simulate API call to fetch quotation details
    const timer = setTimeout(() => {
      setQuotation(mockQuotationDetails);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
    
    // In a real app, you would fetch the data from your API
    // const fetchQuotationDetails = async () => {
    //   try {
    //     const response = await axios.get(`/api/quotations/${id}`);
    //     setQuotation(response.data);
    //   } catch (error) {
    //     console.error('Error fetching quotation details:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // 
    // fetchQuotationDetails();
  }, [id]);

  const handleAddNote = (e) => {
    e.preventDefault();
    
    if (!newNote.trim()) return;
    
    // In a real app, you would send this to your API
    const noteToAdd = {
      text: newNote,
      addedBy: 'Current User',
      addedAt: new Date().toISOString()
    };
    
    setQuotation({
      ...quotation,
      notes: [...quotation.notes, noteToAdd]
    });
    
    setNewNote('');
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
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

  // Format status for display
  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
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
      <div className="px-4 sm:px-6 md:px-0 flex items-center">
        <Link to="/quotations" className="mr-2 text-primary-600 hover:text-primary-900">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Quotation {quotation.reference}</h1>
        <span className={`ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(quotation.status)}`}>
          {formatStatus(quotation.status)}
        </span>
      </div>
      
      <div className="mt-6">
        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PencilSquareIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Edit Quotation
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <DocumentTextIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Download PDF
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <EnvelopeIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Send to Client
          </button>
          <div className="flex-grow"></div>
          <select
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            value={quotation.status}
            onChange={() => {}}
          >
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('details')}
              className={`${
                activeTab === 'details'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('items')}
              className={`${
                activeTab === 'items'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Line Items
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`${
                activeTab === 'notes'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Notes
            </button>
          </nav>
        </div>
        
        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Client Information</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Client name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <BuildingOfficeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {quotation.client.name}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Contact person</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {quotation.client.contact}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <EnvelopeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {quotation.client.email}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <PhoneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {quotation.client.phone}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Event Details</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Event type</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {quotation.eventDetails.type === 'CONFERENCE' ? 'Conference' : 
                       quotation.eventDetails.type === 'LODGING' ? 'Lodging' : 'Mixed'}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Start date</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {new Date(quotation.eventDetails.startDate).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">End date</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {new Date(quotation.eventDetails.endDate).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Guest count</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <UserGroupIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {quotation.eventDetails.guestCount}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Quotation Summary</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Reference</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {quotation.reference}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Related inquiry</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <Link to={`/inquiries/${quotation.inquiryId}`} className="text-primary-600 hover:text-primary-900">
                        {quotation.inquiryId}
                      </Link>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid until</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(quotation.validUntil).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Created by</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {quotation.createdBy}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Created at</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(quotation.createdAt).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Financial Summary</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Subtotal</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {formatCurrency(quotation.subtotal)}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Discounts</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {quotation.discounts.length > 0 ? (
                        quotation.discounts.map((discount, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{discount.description}</span>
                            <span className="text-red-600">-{formatCurrency(discount.amount)}</span>
                          </div>
                        ))
                      ) : (
                        <span>No discounts applied</span>
                      )}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Taxes</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {quotation.taxes.map((tax, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{tax.name} ({tax.rate}%)</span>
                          <span>{formatCurrency(tax.amount)}</span>
                        </div>
                      ))}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 font-bold">Total</dt>
                    <dd className="mt-1 text-sm font-bold text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-900" />
                      {formatCurrency(quotation.total)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
        
        {/* Line Items Tab */}
        {activeTab === 'items' && (
          <div className="mt-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Line Items</h3>
              </div>
              <div className="border-t border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {quotation.lineItems.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.category === 'CONFERENCE' ? 'bg-blue-100 text-blue-800' : 
                              item.category === 'LODGING' ? 'bg-green-100 text-green-800' : 
                              item.category === 'FOOD_BEVERAGE' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {item.category.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {item.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            {formatCurrency(item.unitPrice)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                            {formatCurrency(item.subtotal)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <th colSpan="5" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                          Subtotal:
                        </th>
                        <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                          {formatCurrency(quotation.subtotal)}
                        </td>
                      </tr>
                      {quotation.discounts.map((discount, index) => (
                        <tr key={`discount-${index}`}>
                          <th colSpan="5" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                            {discount.description}:
                          </th>
                          <td className="px-6 py-3 text-right text-sm font-medium text-red-600">
                            -{formatCurrency(discount.amount)}
                          </td>
                        </tr>
                      ))}
                      {quotation.taxes.map((tax, index) => (
                        <tr key={`tax-${index}`}>
                          <th colSpan="5" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                            {tax.name} ({tax.rate}%):
                          </th>
                          <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                            {formatCurrency(tax.amount)}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <th colSpan="5" className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                          Total:
                        </th>
                        <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                          {formatCurrency(quotation.total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="mt-6">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Notes</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Communication history and important information about this quotation.</p>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <ul className="space-y-4">
                    {quotation.notes.map((note, index) => (
                      <li key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-900">{note.text}</p>
                            <div className="mt-1 text-xs text-gray-500 flex items-center">
                              <span>{note.addedBy}</span>
                              <span className="mx-1">•</span>
                              <span>{new Date(note.addedAt).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <form onSubmit={handleAddNote}>
                    <label htmlFor="new-note" className="block text-sm font-medium text-gray-700">
                      Add a note
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="new-note"
                        name="new-note"
                        rows={3}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Add your note here..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                      />
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Add Note
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationDetail;