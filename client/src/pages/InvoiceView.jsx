// client/src/pages/InvoiceView.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InvoiceView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef();
  
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);
  
  // Mock function to fetch an invoice by ID
  const fetchInvoice = async (id) => {
    // In a real app, this would fetch from your API
    return {
      id,
      invoiceNumber: `INV-20250420-00${id}`,
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
      issueDate: '2025-04-20',
      dueDate: '2025-05-20',
      lineItems: [
        { id: 1, description: 'Deluxe Room (3 nights)', quantity: 1, unitPrice: 45000, category: 'ACCOMMODATION' },
        { id: 2, description: 'Airport Transfer', quantity: 2, unitPrice: 6000, category: 'TRANSPORT' },
        { id: 3, description: 'Welcome Dinner', quantity: 4, unitPrice: 4500, category: 'FOOD_BEVERAGE' }
      ],
      subtotal: 69000,
      discount: { type: 'percentage', value: 5 },
      tax: { rate: 16, amount: 10488 },
      total: 72105,
      amountPaid: 0,
      balance: 72105,
      paymentTerms: 'Payment due within 30 days of invoice date.',
      notes: 'Please include the invoice number in your payment reference.',
      status: 'PENDING'
    };
  };

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        setLoading(true);
        const data = await fetchInvoice(id);
        setInvoice(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading invoice:', error);
        setLoading(false);
      }
    };
    
    loadInvoice();
  }, [id]);

  const handleDownloadPDF = () => {
    window.print();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID':
        return 'text-green-600';
      case 'PARTIALLY_PAID':
        return 'text-blue-600';
      case 'OVERDUE':
        return 'text-red-600';
      case 'CANCELLED':
        return 'text-gray-600';
      default:
        return 'text-yellow-600';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800">Invoice Not Found</h2>
          <p className="text-red-600 mt-2">The requested invoice could not be found.</p>
          <button
            onClick={() => navigate('/invoices')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Back to Invoices
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Invoice #{invoice.invoiceNumber}</h2>
        <div className="space-x-2">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
          <button
            onClick={() => navigate('/invoices')}
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
              <h1 className="text-3xl font-bold text-indigo-600">INVOICE</h1>
              <p className="text-gray-600 mt-1">{invoice.invoiceNumber}</p>
              <p className="text-sm text-gray-500">Quotation Ref: {invoice.reference}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">HotelFlow Management</div>
              <p className="text-gray-600">Moi Avenue, Nairobi</p>
              <p className="text-gray-600">info@hotelflow.co.ke | +254 712 345 678</p>
            </div>
          </div>
          
          {/* Status Banner */}
          <div className={`mb-6 p-3 rounded ${
            invoice.status === 'PAID' ? 'bg-green-100' : 
            invoice.status === 'PARTIALLY_PAID' ? 'bg-blue-100' : 
            invoice.status === 'OVERDUE' ? 'bg-red-100' : 
            invoice.status === 'CANCELLED' ? 'bg-gray-100' : 'bg-yellow-100'
          }`}>
            <div className={`text-center font-bold ${getStatusColor(invoice.status)}`}>
              {invoice.status === 'PAID' ? 'PAID IN FULL' : 
               invoice.status === 'PARTIALLY_PAID' ? 'PARTIALLY PAID' : 
               invoice.status === 'OVERDUE' ? 'PAYMENT OVERDUE' : 
               invoice.status === 'CANCELLED' ? 'CANCELLED' : 'PAYMENT PENDING'}
            </div>
          </div>
          
          {/* Client & Invoice Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Bill To</h2>
              <div className="text-gray-600">
                <p className="font-medium">{invoice.clientName}</p>
                {invoice.clientAddress && (
                  <>
                    <p>{invoice.clientAddress.street}</p>
                    <p>{invoice.clientAddress.city}, {invoice.clientAddress.postalCode}</p>
                    <p>{invoice.clientAddress.country}</p>
                  </>
                )}
                <p className="mt-2">{invoice.clientEmail}</p>
                <p>{invoice.clientPhone}</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Invoice Details</h2>
              <div className="text-gray-600">
                <div className="grid grid-cols-2 gap-2">
                  <p className="font-medium">Issue Date:</p>
                  <p>{new Date(invoice.issueDate).toLocaleDateString()}</p>
                  
                  <p className="font-medium">Due Date:</p>
                  <p>{new Date(invoice.dueDate).toLocaleDateString()}</p>
                  
                  <p className="font-medium">Status:</p>
                  <p className={getStatusColor(invoice.status)}>
                    {invoice.status.replace('_', ' ').charAt(0) + 
                     invoice.status.replace('_', ' ').slice(1).toLowerCase()}
                  </p>
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
                {invoice.lineItems.map((item) => (
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
                <span>KES {invoice.subtotal.toLocaleString()}</span>
              </div>
              
              {invoice.discount.value > 0 && (
                <div className="flex justify-between py-2 text-gray-600">
                  <span>Discount ({invoice.discount.type === 'percentage' ? `${invoice.discount.value}%` : 'Fixed'}):</span>
                  <span>- KES {Math.round(invoice.discount.type === 'percentage' ? 
                    (invoice.subtotal * invoice.discount.value / 100) : 
                    invoice.discount.value).toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between py-2 text-gray-600">
                <span>VAT ({invoice.tax.rate}%):</span>
                <span>KES {Math.round(invoice.tax.amount).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-2 border-t border-gray-200 font-bold">
                <span>Total:</span>
                <span>KES {Math.round(invoice.total).toLocaleString()}</span>
              </div>
              
              {invoice.amountPaid > 0 && (
                <div className="flex justify-between py-2 text-green-600">
                  <span>Amount Paid:</span>
                  <span>KES {Math.round(invoice.amountPaid).toLocaleString()}</span>
                </div>
              )}
              
              {invoice.status !== 'PAID' && invoice.status !== 'CANCELLED' && (
                <div className="flex justify-between py-2 border-t border-gray-200 font-bold text-lg">
                  <span>Balance Due:</span>
                  <span className={invoice.status === 'OVERDUE' ? 'text-red-600' : ''}>
                    KES {Math.round(invoice.balance).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Payment Instructions */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Payment Instructions</h2>
            <div className="mb-4 bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">Bank Transfer Details:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-gray-600">
                <p>Bank Name:</p>
                <p>Kenya Commercial Bank</p>
                
                <p>Account Name:</p>
                <p>HotelFlow Management Ltd</p>
                
                <p>Account Number:</p>
                <p>1234567890</p>
                
                <p>Branch:</p>
                <p>Moi Avenue</p>
                
                <p>Swift Code:</p>
                <p>KCBLKENX</p>
              </div>
              <p className="mt-4 text-gray-700">{invoice.paymentTerms}</p>
            </div>
            
            {invoice.notes && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Notes</h2>
                <p className="text-gray-600">{invoice.notes}</p>
              </div>
            )}
            
            <div className="mt-8 text-center text-gray-500">
              <p>Thank you for your business!</p>
              <p className="text-sm mt-1">If you have any questions, please contact us at accounts@hotelflow.co.ke</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;