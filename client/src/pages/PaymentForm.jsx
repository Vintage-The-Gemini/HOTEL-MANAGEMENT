// client/src/pages/PaymentForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);
  const [payment, setPayment] = useState({
    amount: 0,
    method: 'BANK_TRANSFER',
    reference: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Mock function to fetch invoice data
  const fetchInvoice = async (id) => {
    // In a real app, this would call your API
    return {
      id,
      invoiceNumber: `INV-20250420-00${id}`,
      reference: `Q-20250420-00${id}`,
      clientName: 'Samuel Kamau',
      clientEmail: 'skamau@company.co.ke',
      clientPhone: '0712-345-678',
      issueDate: '2025-04-20',
      dueDate: '2025-05-20',
      total: 72105,
      amountPaid: 0,
      balance: 72105,
      status: 'PENDING',
      payments: []
    };
  };

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        setLoading(true);
        const data = await fetchInvoice(invoiceId);
        setInvoice(data);
        setPayment(prev => ({ ...prev, amount: data.balance }));
        setLoading(false);
      } catch (error) {
        console.error('Error loading invoice:', error);
        setLoading(false);
      }
    };
    
    loadInvoice();
  }, [invoiceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In a real app, this would call your API to record the payment
    console.log('Payment data:', payment);
    
    // Simulate success
    alert(`Payment of KES ${payment.amount.toLocaleString()} recorded successfully.`);
    
    // Redirect back to the invoice
    navigate(`/invoices/${invoiceId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
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
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
          <h2 className="text-2xl font-bold text-white">Record Payment</h2>
          <p className="text-green-100">Invoice: {invoice.invoiceNumber}</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Invoice Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-y-2">
                <p className="text-gray-600">Client:</p>
                <p className="font-medium">{invoice.clientName}</p>
                
                <p className="text-gray-600">Invoice Total:</p>
                <p className="font-medium">KES {invoice.total.toLocaleString()}</p>
                
                {invoice.amountPaid > 0 && (
                  <>
                    <p className="text-gray-600">Amount Paid:</p>
                    <p className="font-medium">KES {invoice.amountPaid.toLocaleString()}</p>
                  </>
                )}
                
                <p className="text-gray-600">Balance Due:</p>
                <p className="font-medium">KES {invoice.balance.toLocaleString()}</p>
                
                <p className="text-gray-600">Due Date:</p>
                <p className="font-medium">{new Date(invoice.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount (KES)</label>
                <input
                  type="number"
                  min="1"
                  max={invoice.balance}
                  value={payment.amount}
                  onChange={(e) => setPayment({...payment, amount: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={payment.method}
                  onChange={(e) => setPayment({...payment, method: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                  <option value="MPESA">M-PESA</option>
                  <option value="CREDIT_CARD">Credit Card</option>
                  <option value="CASH">Cash</option>
                  <option value="CHEQUE">Cheque</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Reference</label>
                <input
                  type="text"
                  value={payment.reference}
                  onChange={(e) => setPayment({...payment, reference: e.target.value})}
                  placeholder="e.g. Transaction ID, Cheque number, etc."
                  className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                <input
                  type="date"
                  value={payment.date}
                  onChange={(e) => setPayment({...payment, date: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={payment.notes}
                  onChange={(e) => setPayment({...payment, notes: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                  rows="3"
                  placeholder="Any additional information about this payment"
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(`/invoices/${invoiceId}`)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Record Payment
              </button>
            </div>
          </form>
          
          {invoice.payments && invoice.payments.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Previous Payments</h3>
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoice.payments.map((payment, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{payment.method.replace('_', ' ')}</td>
                      <td className="px-4 py-2">{payment.reference}</td>
                      <td className="px-4 py-2 text-right">KES {payment.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;