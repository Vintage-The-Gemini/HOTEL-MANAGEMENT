// client/src/pages/QuotationForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuotationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  // Standard service options
  const serviceOptions = [
    { id: 'room-standard', name: 'Standard Room', basePrice: 100 },
    { id: 'room-deluxe', name: 'Deluxe Room', basePrice: 180 },
    { id: 'room-executive', name: 'Executive Suite', basePrice: 250 },
    { id: 'room-family', name: 'Family Room', basePrice: 220 },
    { id: 'conf-small', name: 'Small Conference Room', basePrice: 300 },
    { id: 'conf-large', name: 'Large Conference Room', basePrice: 500 },
    { id: 'transport-airport', name: 'Airport Transfer', basePrice: 50 },
    { id: 'transport-city', name: 'City Tour Transport', basePrice: 150 },
    { id: 'food-breakfast', name: 'Breakfast Package', basePrice: 25 },
    { id: 'food-fullboard', name: 'Full Board Meals', basePrice: 80 },
    { id: 'spa-standard', name: 'Spa Standard Package', basePrice: 90 },
    { id: 'spa-premium', name: 'Spa Premium Package', basePrice: 150 },
  ];

  // Initial state
  const initialQuotationState = {
    id: isEditing ? id : `Q-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`,
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
    status: 'Draft',
    notes: '',
    items: [],
    discounts: [],
    tax: { rate: 10, name: 'VAT' }
  };

  // State for the quotation
  const [quotation, setQuotation] = useState(initialQuotationState);
  
  // State for form validations
  const [errors, setErrors] = useState({});
  
  // State for a new item being added
  const [newItem, setNewItem] = useState({
    serviceId: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
    isCustom: false
  });

  // State for a new discount being added
  const [newDiscount, setNewDiscount] = useState({
    description: '',
    type: 'percentage',
    value: 0
  });

  // Fetch quotation data if editing
  useEffect(() => {
    if (isEditing) {
      // This would typically be an API call, but for demo we'll simulate it
      // In a real app, you'd fetch from your backend
      const mockFetchQuotation = async () => {
        // Mock data for editing - in a real app this would come from your API
        if (id === 'Q-2023-001') {
          setQuotation({
            id: 'Q-2023-001',
            clientName: 'John Doe',
            clientEmail: 'john.doe@example.com',
            clientPhone: '+1 (555) 123-4567',
            validUntil: '2023-05-10',
            status: 'Pending',
            notes: 'Client requires early check-in',
            items: [
              { id: '1', serviceId: 'room-deluxe', description: 'Deluxe Room', quantity: 3, unitPrice: 180, isCustom: false },
              { id: '2', serviceId: 'transport-airport', description: 'Airport Transfer', quantity: 1, unitPrice: 50, isCustom: false },
              { id: '3', serviceId: 'custom-1', description: 'Spa Package', quantity: 2, unitPrice: 90, isCustom: true }
            ],
            discounts: [
              { id: '1', description: 'Loyalty Discount', type: 'percentage', value: 10 }
            ],
            tax: { rate: 10, name: 'VAT' }
          });
        } else {
          // If we don't have mock data for this ID, redirect to the listing page
          navigate('/quotations');
        }
      };
      
      mockFetchQuotation();
    }
  }, [id, isEditing, navigate]);

  // Calculate subtotal, discount, tax, and total
  const calculateTotals = () => {
    // Calculate subtotal
    const subtotal = quotation.items.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0);
    
    // Calculate discount amount
    const discountAmount = quotation.discounts.reduce((sum, discount) => {
      if (discount.type === 'percentage') {
        return sum + (subtotal * discount.value / 100);
      } else {
        return sum + discount.value;
      }
    }, 0);
    
    // Calculate tax
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * (quotation.tax.rate / 100);
    
    // Calculate total
    const total = taxableAmount + taxAmount;
    
    return {
      subtotal,
      discountAmount,
      taxAmount,
      total
    };
  };

  const { subtotal, discountAmount, taxAmount, total } = calculateTotals();

  // Handle input changes for the main form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuotation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle changes to new item form
  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'serviceId' && value && !newItem.isCustom) {
      // If selecting a predefined service, auto-fill details
      const selectedService = serviceOptions.find(service => service.id === value);
      if (selectedService) {
        setNewItem(prev => ({
          ...prev,
          serviceId: value,
          description: selectedService.name,
          unitPrice: selectedService.basePrice
        }));
        return;
      }
    }
    
    setNewItem(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Math.max(1, parseInt(value) || 1) : value,
      [name === 'isCustom' && value === 'true' ? 'serviceId' : '']: name === 'isCustom' && value === 'true' ? `custom-${Date.now()}` : prev.serviceId
    }));
  };

  // Handle changes to new discount form
  const handleNewDiscountChange = (e) => {
    const { name, value } = e.target;
    setNewDiscount(prev => ({
      ...prev,
      [name]: name === 'value' ? (parseFloat(value) || 0) : value
    }));
  };

  // Add a new item to the quotation
  const handleAddItem = () => {
    if (!newItem.description || newItem.unitPrice <= 0) {
      setErrors(prev => ({
        ...prev,
        newItem: 'Please provide a description and a valid price'
      }));
      return;
    }
    
    setQuotation(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}`,
          ...newItem
        }
      ]
    }));
    
    // Reset new item form
    setNewItem({
      serviceId: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      isCustom: false
    });
    
    // Clear error if any
    setErrors(prev => ({
      ...prev,
      newItem: null
    }));
  };

  // Add a new discount to the quotation
  const handleAddDiscount = () => {
    if (!newDiscount.description || newDiscount.value <= 0) {
      setErrors(prev => ({
        ...prev,
        newDiscount: 'Please provide a description and a valid value'
      }));
      return;
    }
    
    setQuotation(prev => ({
      ...prev,
      discounts: [
        ...prev.discounts,
        {
          id: `discount-${Date.now()}`,
          ...newDiscount
        }
      ]
    }));
    
    // Reset new discount form
    setNewDiscount({
      description: '',
      type: 'percentage',
      value: 0
    });
    
    // Clear error if any
    setErrors(prev => ({
      ...prev,
      newDiscount: null
    }));
  };

  // Remove an item from the quotation
  const handleRemoveItem = (itemId) => {
    setQuotation(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  // Remove a discount from the quotation
  const handleRemoveDiscount = (discountId) => {
    setQuotation(prev => ({
      ...prev,
      discounts: prev.discounts.filter(discount => discount.id !== discountId)
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!quotation.clientName) newErrors.clientName = 'Client name is required';
    if (!quotation.clientEmail) newErrors.clientEmail = 'Client email is required';
    if (quotation.items.length === 0) newErrors.items = 'Add at least one item to the quotation';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form - in a real app, this would be an API call
    console.log('Submitting quotation:', quotation);
    
    // Redirect to quotation list
    navigate('/quotations');
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? `Edit Quotation ${id}` : 'Create New Quotation'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {isEditing ? 'Update the quotation details below.' : 'Fill in the details to create a new quotation.'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Client Information */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Client Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
                Client Name
              </label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={quotation.clientName}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${errors.clientName ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
              />
              {errors.clientName && (
                <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>
              )}
            </div>
            <div>
              <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">
                Client Email
              </label>
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                value={quotation.clientEmail}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${errors.clientEmail ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
              />
              {errors.clientEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.clientEmail}</p>
              )}
            </div>
            <div>
              <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700">
                Client Phone
              </label>
              <input
                type="text"
                id="clientPhone"
                name="clientPhone"
                value={quotation.clientPhone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700">
                Valid Until
              </label>
              <input
                type="date"
                id="validUntil"
                name="validUntil"
                value={quotation.validUntil}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        
        {/* Items Section */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Items</h2>
          
          {/* Existing Items */}
          {quotation.items.length > 0 ? (
            <div className="mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quotation.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.description}
                          {item.isCustom && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              Custom
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${item.unitPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${(item.quantity * item.unitPrice).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-md p-4 mb-6 text-center">
              <p className="text-gray-500">No items added to this quotation yet.</p>
              {errors.items && (
                <p className="mt-1 text-sm text-red-600">{errors.items}</p>
              )}
            </div>
          )}
          
          {/* Add New Item Form */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Add New Item</h3>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-1">
                <label htmlFor="isCustom" className="block text-sm font-medium text-gray-700">
                  Item Type
                </label>
                <select
                  id="isCustom"
                  name="isCustom"
                  value={newItem.isCustom.toString()}
                  onChange={handleNewItemChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="false">Standard</option>
                  <option value="true">Custom</option>
                </select>
              </div>
              
              {!newItem.isCustom && (
                <div className="md:col-span-2">
                  <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700">
                    Service
                  </label>
                  <select
                    id="serviceId"
                    name="serviceId"
                    value={newItem.serviceId}
                    onChange={handleNewItemChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} (${service.basePrice})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className={`${newItem.isCustom ? 'md:col-span-3' : 'md:col-span-1'}`}>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newItem.description}
                  onChange={handleNewItemChange}
                  placeholder={newItem.isCustom ? "Enter custom service description" : ""}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              <div className="md:col-span-1">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={newItem.quantity}
                  onChange={handleNewItemChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              <div className="md:col-span-1">
                <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
                  Unit Price ($)
                </label>
                <input
                  type="number"
                  id="unitPrice"
                  name="unitPrice"
                  min="0"
                  step="0.01"
                  value={newItem.unitPrice}
                  onChange={handleNewItemChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              <div className="md:col-span-1 flex items-end">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 w-full justify-center"
                >
                  Add Item
                </button>
              </div>
            </div>
            {errors.newItem && (
              <p className="mt-2 text-sm text-red-600">{errors.newItem}</p>
            )}
          </div>
        </div>
        
        {/* Discounts Section */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Discounts</h2>
          
          {/* Existing Discounts */}
          {quotation.discounts.length > 0 ? (
            <div className="mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quotation.discounts.map((discount) => (
                      <tr key={discount.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {discount.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {discount.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value.toFixed(2)}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => handleRemoveDiscount(discount.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-md p-4 mb-6 text-center">
              <p className="text-gray-500">No discounts added to this quotation yet.</p>
            </div>
          )}
          
          {/* Add New Discount Form */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Add New Discount</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="discountDescription" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="discountDescription"
                  name="description"
                  value={newDiscount.description}
                  onChange={handleNewDiscountChange}
                  placeholder="e.g., Early Payment Discount"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              <div className="md:col-span-1">
                <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="discountType"
                  name="type"
                  value={newDiscount.type}
                  onChange={handleNewDiscountChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              
              <div className="md:col-span-1">
                <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700">
                  {newDiscount.type === 'percentage' ? 'Percentage (%)' : 'Amount ($)'}
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="discountValue"
                    name="value"
                    min="0"
                    step={newDiscount.type === 'percentage' ? '1' : '0.01'}
                    value={newDiscount.value}
                    onChange={handleNewDiscountChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddDiscount}
                    className="ml-3 mt-1 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            {errors.newDiscount && (
              <p className="mt-2 text-sm text-red-600">{errors.newDiscount}</p>
            )}
          </div>
        </div>
        
        {/* Tax & Notes Section */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Tax Settings</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="taxName" className="block text-sm font-medium text-gray-700">
                    Tax Name
                  </label>
                  <input
                    type="text"
                    id="taxName"
                    name="tax.name"
                    value={quotation.tax.name}
                    onChange={(e) => setQuotation(prev => ({
                      ...prev,
                      tax: { ...prev.tax, name: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    id="taxRate"
                    name="tax.rate"
                    min="0"
                    step="0.01"
                    value={quotation.tax.rate}
                    onChange={(e) => setQuotation(prev => ({
                      ...prev,
                      tax: { ...prev.tax, rate: parseFloat