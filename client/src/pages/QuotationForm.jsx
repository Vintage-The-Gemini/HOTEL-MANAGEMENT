// client/src/pages/QuotationForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const QuotationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [quotation, setQuotation] = useState({
    reference: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    eventDate: '',
    validUntil: '',
    lineItems: [],
    subtotal: 0,
    discount: { type: 'percentage', value: 0 },
    tax: { rate: 10, amount: 0 },
    total: 0,
    notes: '',
    status: 'DRAFT'
  });

  const [newItem, setNewItem] = useState({
    description: '',
    quantity: 1,
    unitPrice: 0,
    category: 'ACCOMMODATION'
  });

  // Mock function to get a quotation by ID
  const fetchQuotation = async (id) => {
    // In a real app, this would fetch from your API
    return {
      reference: `Q-${id}`,
      clientName: 'Samuel Kamau',
      clientEmail: 'skamau@company.co.ke',
      clientPhone: '0712-345-678',
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
      status: 'DRAFT'
    };
  };

  // Load the quotation if we're editing
  useEffect(() => {
    if (isEditing) {
      const loadQuotation = async () => {
        try {
          const data = await fetchQuotation(id);
          setQuotation(data);
        } catch (error) {
          console.error('Error loading quotation:', error);
        }
      };
      
      loadQuotation();
    } else {
      // Generate a unique reference for new quotations
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const reference = `Q-${today.getFullYear()}${month}${day}-${randomNum}`;
      
      // Set default validity (7 days from today)
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + 7);
      
      setQuotation(prev => ({
        ...prev,
        reference,
        validUntil: validUntil.toISOString().split('T')[0]
      }));
    }
  }, [id, isEditing]);

  // Calculate totals whenever line items, discount, or tax rate changes
  useEffect(() => {
    const calculateTotals = () => {
      // Calculate subtotal
      const subtotal = quotation.lineItems.reduce((sum, item) => {
        return sum + (item.quantity * item.unitPrice);
      }, 0);
      
      // Calculate discount
      let discountAmount = 0;
      if (quotation.discount.type === 'percentage') {
        discountAmount = subtotal * (quotation.discount.value / 100);
      } else {
        discountAmount = quotation.discount.value;
      }
      
      // Calculate tax
      const taxableAmount = subtotal - discountAmount;
      const taxAmount = taxableAmount * (quotation.tax.rate / 100);
      
      // Calculate total
      const total = taxableAmount + taxAmount;
      
      setQuotation(prev => ({
        ...prev,
        subtotal,
        tax: { ...prev.tax, amount: taxAmount },
        total
      }));
    };
    
    calculateTotals();
  }, [quotation.lineItems, quotation.discount, quotation.tax.rate]);

  const handleAddItem = () => {
    const item = {
      id: Date.now(), // Use timestamp as temporary ID
      ...newItem
    };
    
    setQuotation(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, item]
    }));
    
    // Reset the form for next item
    setNewItem({
      description: '',
      quantity: 1,
      unitPrice: 0,
      category: 'ACCOMMODATION'
    });
  };

  const handleRemoveItem = (id) => {
    setQuotation(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In a real app, you would send this to your backend API
    console.log('Submitting quotation:', quotation);
    
    // Redirect to quotation list
    navigate('/quotations');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
          <h2 className="text-2xl font-bold text-white">
            {isEditing ? 'Edit Quotation' : 'Create New Quotation'}
          </h2>
          <p className="text-emerald-100">Reference: {quotation.reference}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Client Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={quotation.clientName}
                    onChange={(e) => setQuotation({...quotation, clientName: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={quotation.clientEmail}
                    onChange={(e) => setQuotation({...quotation, clientEmail: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={quotation.clientPhone}
                    onChange={(e) => setQuotation({...quotation, clientPhone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Quotation Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={quotation.eventDate}
                    onChange={(e) => setQuotation({...quotation, eventDate: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                  <input
                    type="date"
                    value={quotation.validUntil}
                    onChange={(e) => setQuotation({...quotation, validUntil: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={quotation.status}
                    onChange={(e) => setQuotation({...quotation, status: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="SENT">Sent</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Line Items</h3>
            
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-6 gap-4 mb-2">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Item description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="ACCOMMODATION">Accommodation</option>
                    <option value="CONFERENCE">Conference</option>
                    <option value="TRANSPORT">Transport</option>
                    <option value="FOOD_BEVERAGE">Food & Beverage</option>
                    <option value="SERVICE">Service</option>
                    <option value="CUSTOM">Custom</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newItem.unitPrice}
                    onChange={(e) => setNewItem({...newItem, unitPrice: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="p-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 w-full"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </div>
            
            {quotation.lineItems.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full mb-4">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-left">Category</th>
                      <th className="p-2 text-right">Quantity</th>
                      <th className="p-2 text-right">Unit Price</th>
                      <th className="p-2 text-right">Amount</th>
                      <th className="p-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotation.lineItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-2">{item.description}</td>
                        <td className="p-2">{item.category.replace('_', ' ')}</td>
                        <td className="p-2 text-right">{item.quantity}</td>
                        <td className="p-2 text-right">KES {item.unitPrice.toLocaleString()}</td>
                        <td className="p-2 text-right">KES {(item.quantity * item.unitPrice).toLocaleString()}</td>
                        <td className="p-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic text-center py-4">No items added yet</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={quotation.notes}
                  onChange={(e) => setQuotation({...quotation, notes: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                  rows="4"
                  placeholder="Additional notes or special requests"
                ></textarea>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal:</span>
                  <span>KES {quotation.subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="font-medium">Discount:</label>
                  <select
                    value={quotation.discount.type}
                    onChange={(e) => setQuotation(prev => ({
                      ...prev,
                      discount: { ...prev.discount, type: e.target.value }
                    }))}
                    className="p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                  <input
                    type="number"
                    min="0"
                    step={quotation.discount.type === 'percentage' ? '1' : '0.01'}
                    value={quotation.discount.value}
                    onChange={(e) => setQuotation(prev => ({
                      ...prev,
                      discount: { ...prev.discount, value: parseFloat(e.target.value) || 0 }
                    }))}
                    className="w-20 p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <span>
                    {quotation.discount.type === 'percentage' ? 
                      `(KES ${Math.round(quotation.subtotal * quotation.discount.value / 100).toLocaleString()})` : 
                      ''}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="font-medium">Tax Rate:</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={quotation.tax.rate}
                    onChange={(e) => setQuotation(prev => ({
                      ...prev,
                      tax: { ...prev.tax, rate: parseFloat(e.target.value) || 0 }
                    }))}
                    className="w-20 p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <span>%</span>
                  <span>(KES {Math.round(quotation.tax.amount).toLocaleString()})</span>
                </div>
                
                <div className="pt-4 border-t flex justify-between items-center font-bold">
                  <span>Total:</span>
                  <span className="text-lg">KES {Math.round(quotation.total).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/quotations')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              {isEditing ? 'Update Quotation' : 'Create Quotation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuotationForm;