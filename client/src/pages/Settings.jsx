// src/pages/Settings.jsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  UserIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  BellIcon,
  LockClosedIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock profile data for demo
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '555-123-4567',
    position: 'Sales Representative',
    bio: 'Experienced sales representative with a focus on hospitality services.'
  });
  
  // Mock hotel data for demo
  const [hotelData, setHotelData] = useState({
    name: 'Grand Plaza Hotel',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA'
    },
    contact: {
      email: 'info@grandplaza.com',
      phone: '555-987-6543',
      website: 'www.grandplaza.com'
    },
    taxSettings: {
      salesTax: 8.5,
      serviceTax: 3.0
    }
  });
  
  // Mock branding data for demo
  const [brandingData, setBrandingData] = useState({
    primaryColor: '#0ea5e9',
    secondaryColor: '#0369a1',
    logo: 'https://example.com/logo.png'
  });

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      newInquiry: true,
      newQuotation: true,
      quotationStatus: true,
      paymentReceived: true
    },
    inApp: {
      newInquiry: true,
      newQuotation: true,
      quotationStatus: true,
      paymentReceived: true,
      taskAssigned: true
    }
  });

  // Mock security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    lastPasswordChange: '2023-04-15'
  });

  // Mock billing data
  const [billingData, setBillingData] = useState({
    plan: 'Professional',
    billingCycle: 'Monthly',
    amount: 49.99,
    nextBillingDate: '2023-06-15',
    paymentMethod: {
      type: 'Credit Card',
      last4: '4242',
      expiry: '05/25'
    }
  });
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setHotelData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setHotelData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleBrandingChange = (e) => {
    const { name, value } = e.target;
    setBrandingData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    const [category, setting] = name.split('.');
    
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: checked
      }
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurityData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'hotel', name: 'Hotel Details', icon: BuildingOfficeIcon },
    { id: 'branding', name: 'Branding', icon: PaintBrushIcon },
    { id: 'billing', name: 'Billing', icon: CreditCardIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: LockClosedIcon }
  ];

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>
      
      <div className="mt-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="sm:hidden">
              <select
                onChange={(e) => setActiveTab(e.target.value)}
                value={activeTab}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                {tabs.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        ${activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                      `}
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Personal Information</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                      Position
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="position"
                        id="position"
                        value={profileData.position}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description about yourself.
                    </p>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                      Profile photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Hotel Details Tab */}
          {activeTab === 'hotel' && (
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Hotel Information</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Hotel name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={hotelData.name}
                        onChange={handleHotelChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Address</h4>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">
                          Street address
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="address.street"
                            id="address.street"
                            value={hotelData.address.street}
                            onChange={handleHotelChange}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="address.city"
                            id="address.city"
                            value={hotelData.address.city}
                            onChange={handleHotelChange}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label htmlFor="address.state" className="block text-sm font-medium text-gray-700">
                          State / Province
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="address.state"
                            id="address.state"
                            value={hotelData.address.state}
                            onChange={handleHotelChange}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label htmlFor="address.postalCode" className="block text-sm font-medium text-gray-700">
                          ZIP / Postal code
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="address.postalCode"
                            id="address.postalCode"
                            value={hotelData.address.postalCode}
                            onChange={handleHotelChange}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="address.country" className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <div className="mt-1">
                          <select
                            id="address.country"
                            name="address.country"
                            value={hotelData.address.country}
                            onChange={handleHotelChange}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="USA">United States</option>
                            <option value="CAN">Canada</option>
                            <option value="GBR">United Kingdom</option>
                            <option value="AUS">Australia</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h4>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="contact.email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            name="contact.email"
                            id="contact.email"
                            value={hotelData.contact.email}
                            onChange={handleHotelChange}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="contact.phone" className="block text-sm font-medium text-gray-700">
                          Phone number
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="contact.phone"
                            id="contact.phone"
                            value={hotelData.contact.phone}
                            onChange={handleHotelChange}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="contact.website" className="block text-sm font-medium text-gray-700">
                          Website
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="contact.website"
                            id="contact.website"
                            value={hotelData.contact.website}
                            onChange={handleHotelChange}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Tax Settings</h4>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="taxSettings.salesTax" className="block text-sm font-medium text-gray-700">
                          Sales Tax (%)
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            step="0.01"
                            name="taxSettings.salesTax"
                            id="taxSettings.salesTax"
                            value={hotelData.taxSettings.salesTax}
                            onChange={handleHotelChange}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="taxSettings.serviceTax" className="block text-sm font-medium text-gray-700">
                          Service Tax (%)
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            step="0.01"
                            name="taxSettings.serviceTax"
                            id="taxSettings.serviceTax"
                            value={hotelData.taxSettings.serviceTax}
                            onChange={handleHotelChange}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Branding Tab */}
          {activeTab === 'branding' && (
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Branding Settings</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                      Logo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
                      Primary Color
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="color"
                        name="primaryColor"
                        id="primaryColor"
                        value={brandingData.primaryColor}
                        onChange={handleBrandingChange}
                        className="h-8 w-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      />
                      <input
                        type="text"
                        name="primaryColor"
                        value={brandingData.primaryColor}
                        onChange={handleBrandingChange}
                        className="ml-2 shadow-sm focus:ring-primary-500 focus:border-primary-500 block sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">
                      Secondary Color
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="color"
                        name="secondaryColor"
                        id="secondaryColor"
                        value={brandingData.secondaryColor}
                        onChange={handleBrandingChange}
                        className="h-8 w-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      />
                      <input
                        type="text"
                        name="secondaryColor"
                        value={brandingData.secondaryColor}
                        onChange={handleBrandingChange}
                        className="ml-2 shadow-sm focus:ring-primary-500 focus:border-primary-500 block sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-16 h-16 rounded-full" 
                          style={{ backgroundColor: brandingData.primaryColor }}
                        ></div>
                        <div>
                          <p className="text-lg font-bold" style={{ color: brandingData.primaryColor }}>{hotelData.name}</p>
                          <div className="mt-2">
                            <button
                              type="button"
                              className="px-4 py-2 text-sm font-medium text-white rounded-md"
                              style={{ backgroundColor: brandingData.primaryColor }}
                            >
                              Primary Button
                            </button>
                            <button
                              type="button"
                              className="ml-2 px-4 py-2 text-sm font-medium text-white rounded-md"
                              style={{ backgroundColor: brandingData.secondaryColor }}
                            >
                              Secondary Button
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Billing Information</h3>
              
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-900 mb-2">Current Plan</h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl font-bold text-gray-900">{billingData.plan}</p>
                      <p className="text-sm text-gray-500">
                        {billingData.billingCycle} billing at ${billingData.amount}/month
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Next billing date: