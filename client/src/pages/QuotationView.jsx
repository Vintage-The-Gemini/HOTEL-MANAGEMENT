// client/src/pages/QuotationView.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuotationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef();
  
  const [loading, setLoading] = useState(true);
  const [quotation, setQuotation] = useState(null);
  
  // Mock function to fetch a quotation by ID
  const fetchQuotation = async (id) => {
    // In a real app, this would fetch from your API
    return {
      id,
      reference: `Q-20250420-00${id}`,
      clientName: 'Samuel Kamau',
      clientEmail: 'skamau@company.co.ke',
      clientPhone: '0712-345-678',
      clientAddress: {
        street: 'Kimathi Street, CBD',
        city: 'Nairobi',
        postalCode: '00100',
        country: 'Kenya'
      },
      eventDate: '2025-05-10',
      validUntil: '2025-04-25',
      lineItems: [
        { id: 1, description: 'Deluxe Room (3 nights)', quantity: 1, unitPrice: 45000, category: 'ACCOMMODATION' },
        { id: 2, description: 'Airport Transfer', quantity: 2, unitPrice: 6000, category: 'TRANSPORT' },
        { id: 3, description: 'Welcome Dinner', quantity: 4, unitPrice: 4500, category: 'FOOD_BEVERAGE' }
      ],
      subtotal: 69000,
      discount: { type: 'percentage', value: 5 },
      tax: { rate: 16, amount: 10488 },
      total: 72105,
      notes: 'Client requested early check-in if possible.',
      status: 'DRAFT',
      createdAt: '2025-04-20',
      createdBy: 'Joseph Ochieng'
    };
  };

  useEffect(() => {
    const loadQuotation = async () => {
      try {
        setLoading(true);
        const data = await fetchQuotation(id);
        setQuotation(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading quotation:', error);
        setLoading(false);
      }
    };
    
    loadQuotation();
  }, [id]);

  const handleDownloadPDF = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800">Quotation Not Found</h2>
          <p className="text-red-600 mt-2">The requested quotation could not be found.</p>
          <button
            onClick={() => navigate('/quotations')}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Back to Quotations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Quotation Details</h2>
        <div className="space-x-2">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Download PDF
          </button>
          <button
            onClick={() => navigate('/quotations')}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Back to List
          </button>
        </div>
      </div>
      
      <div ref={printRef} className="bg-white rounded-lg shadow-lg p-8 print:shadow-none">
        <div className="print:p-0">
          {/* Header */}
          <div className="flex justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-emerald-600">QUOTATION</h1>
              <p className="text-gray-600 mt-1">{quotation.reference}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">HotelFlow Management</div>
              <p className="text-gray-600">Moi Avenue, Nairobi</p>
              <p className="text-gray-600">info@hotelflow.co.ke | +254 712 345 678</p>
            </div>
          </div>
          
          {/* Client & Quotation Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Client Information</h2>
              <div className="text-gray-600">
                <p className="font-medium">{quotation.clientName}</p>
                {quotation.clientAddress && (
                  <>
                    <p>{quotation.clientAddress.street}</p>
                    <p>{quotation.clientAddress.city}, {quotation.clientAddress.postalCode}</p>
                    <p>{quotation.clientAddress.country}</p>
                  </>
                )}
                <p className="mt-2">{quotation.clientEmail}</p>
                <p>{quotation.clientPhone}</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Quotation Details</h2>
              <div className="text-gray-600">
                <div className="grid grid-cols-2 gap-2">
                  <p className="font-medium">Date Issued:</p>
                  <p>{new Date(quotation.createdAt).toLocaleDateString()}</p>
                  
                  <p className="font-medium">Valid Until:</p>
                  <p>{new Date(quotation.validUntil).toLocaleDateString()}</p>
                  
                  {quotation.eventDate && (
                    <>
                      <p className="font-medium">Event Date:</p>
                      <p>{new Date(quotation.eventDate).toLocaleDateString()}</p>
                    </>
                  )}
                  
                  <p className="font-medium">Status:</p>
                  <p>{quotation.status.charAt(0) + quotation.status.slice(1).toLowerCase()}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Line Items */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Services & Products</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left border-b-2 border-gray-200">Description</th>
                  <th className="p-2 text-center border-b-2 border-gray-200">Quantity</th>
                  <th className="p-2 text-right border-b-2 border-gray-200">Unit Price</th>
                  <th className="p-2 text-right border-b-2 border-gray-200">Amount</th>
                </tr>
              </thead>
              <tbody>
                {quotation.lineItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="p-2 text-left">
                      <div className="font-medium">{item.description}</div>
                      <div className="text-sm text-gray-500">{item.category.replace('_', ' ')}</div>
                    </td>
                    <td className="p-2 text-center">{item.quantity}</td>
                    <td className="p-2 text-right">KES {item.unitPrice.toLocaleString()}</td>
                    <td className="p-2 text-right">KES {(item.quantity * item.unitPrice).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Summary */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span className="font-medium">Subtotal:</span>
                <span>KES {quotation.subtotal.toLocaleString()}</span>
              </div>
              
              {quotation.discount.value > 0 && (
                <div className="flex justify-between py-2 text-gray-600">
                  <span>Discount ({quotation.discount.type === 'percentage' ? `${quotation.discount.value}%` : 'Fixed'}):</span>
                  <span>- KES {Math.round(quotation.discount.type === 'percentage' ? 
                    (quotation.subtotal * quotation.discount.value / 100) : 
                    quotation.discount.value).toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between py-2 text-gray-600">
                <span>VAT ({quotation.tax.rate}%):</span>
                <span>KES {Math.round(quotation.tax.amount).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-2 border-t border-gray-200 font-bold text-lg">
                <span>Total:</span>
                <span>KES {Math.round(quotation.total).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Notes & Terms */}
          <div className="border-t border-gray-200 pt-4">
            {quotation.notes && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Notes</h2>
                <p className="text-gray-600">{quotation.notes}</p>
              </div>
            )}
            
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Terms & Conditions</h2>
              <ol className="list-decimal list-inside text-gray-600 pl-4 space-y-1">
                <li>This quotation is valid until the date specified above.</li>
                <li>Prices are subject to change if the quotation expires.</li>
                <li>A 50% deposit is required to confirm the booking.</li>
                <li>Cancellation within 7 days of the event will incur a 30% fee.</li>
                <li>All prices are inclusive of 16% VAT.</li>
              </ol>
            </div>
            
            <div className="mt-8 text-center text-gray-500">
              <p>Thank you for your business!</p>
              <p className="text-sm mt-1">If you have any questions, please contact us at bookings@hotelflow.co.ke</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationView;