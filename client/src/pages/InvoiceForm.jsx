// client/src/pages/InvoiceForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InvoiceForm = () => {
  const { quotationId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    reference: '',
    quotationId: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    issueDate: '',
    dueDate: '',
    lineItems: [],
    subtotal: 0,
    discount: { type: 'percentage', value: 0 },
    tax: { rate: 16, amount: 0 },
    total: 0,
    notes: '',
    paymentTerms: 'Payment due within 30 days of invoice date.',
    status: 'PENDING'
  });

  // Function to fetch quotation data
  const fetchQuotationData = async (id) => {
    // In a real app, this would call your API
    // For now, return mock data
    return {
      id: id,
      reference: `Q-20250420-00${id}`,
      clientName: 'Samuel Kamau',
      clientEmail: 'skamau@company.co.ke',
      clientPhone: '0712-345-678',
      eventDate: '2025-05-10',
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
      status: 'ACCEPTED'
    };
  };

  useEffect(() => {
    const loadQuotationData = async () => {
      try {
        setLoading(true);
        const quotation = await fetchQuotationData(quotationId);
        
        // Generate invoice number
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const invoiceNumber = `INV-${today.getFullYear()}${month}${day}-${randomNum}`;
        
        // Set due date (30 days from now)
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);
        
        setInvoice({
          invoiceNumber,
          reference: quotation.reference,
          quotationId: quotation.id,
          clientName: quotation.clientName,
          clientEmail: quotation.clientEmail,
          clientPhone: quotation.clientPhone,
          issueDate: today.toISOString().split('T')[0],
          dueDate: dueDate.toISOString().split('T')[0],
          lineItems: quotation.lineItems,
          subtotal: quotation.subtotal,
          discount: quotation.discount,
          tax: quotation.tax,
          total: quotation.total,
          notes: quotation.notes,
          paymentTerms: 'Payment due within 30 days of invoice date.',
          status: 'PENDING'
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading quotation data:', error);
        setLoading(false);
      }
    };
    
    loadQuotationData();
  }, [quotationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In a real app, this would send the invoice to your API
    console.log('Invoice data:', invoice);
    
    // Redirect to the invoices list page
    navigate('/invoices');
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('In a real application, this would download the invoice as a PDF');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h2 className="text-2xl font-bold text-white">Create Invoice</h2>
          <p className="text-blue-100">Based on Quotation: {invoice.reference}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Invoice Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                  <input
                    type="text"
                    value={invoice.invoiceNumber}
                    readOnly
                    className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={invoice.issueDate}
                    onChange={(e) => setInvoice({...invoice, issueDate: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={invoice.dueDate}
                    onChange={(e) => setInvoice({...invoice, dueDate: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={invoice.status}
                    onChange={(e) => setInvoice({...invoice, status: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PAID">Paid</option>
                    <option value="PARTIALLY_PAID">Partially Paid</option>
                    <option value="OVERDUE">Overdue</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Client Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={invoice.clientName}
                    onChange={(e) => setInvoice({...invoice, clientName: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={invoice.clientEmail}
                    onChange={(e) => setInvoice({...invoice, clientEmail: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={invoice.clientPhone}
                    onChange={(e) => setInvoice({...invoice, clientPhone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Line Items</h3>
            
            {invoice.lineItems.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full mb-4">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-left">Category</th>
                      <th className="p-2 text-right">Quantity</th>
                      <th className="p-2 text-right">Unit Price</th>
                      <th className="p-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.lineItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-2">{item.description}</td>
                        <td className="p-2">{item.category.replace('_', ' ')}</td>
                        <td className="p-2 text-right">{item.quantity}</td>
                        <td className="p-2 text-right">KES {item.unitPrice.toLocaleString()}</td>
                        <td className="p-2 text-right">KES {(item.quantity * item.unitPrice).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic text-center py-4">No items found</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                    <textarea
                      value={invoice.paymentTerms}
                      onChange={(e) => setInvoice({...invoice, paymentTerms: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      rows="2"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={invoice.notes}
                      onChange={(e) => setInvoice({...invoice, notes: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                      placeholder="Additional notes or special instructions"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal:</span>
                  <span>KES {invoice.subtotal.toLocaleString()}</span>
                </div>
                
                {invoice.discount.value > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Discount ({invoice.discount.type === 'percentage' ? `${invoice.discount.value}%` : 'Fixed'}):</span>
                    <span>KES {Math.round(invoice.discount.type === 'percentage' ? 
                      (invoice.subtotal * invoice.discount.value / 100) : 
                      invoice.discount.value).toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="font-medium">VAT ({invoice.tax.rate}%):</span>
                  <span>KES {Math.round(invoice.tax.amount).toLocaleString()}</span>
                </div>
                
                <div className="pt-4 border-t flex justify-between items-center font-bold">
                  <span>Total:</span>
                  <span className="text-lg">KES {Math.round(invoice.total).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/invoices')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Download PDF
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;