// src/pages/SimpleDashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SimpleDashboard = () => {
  // Sample data for demonstration
  const inquiryCount = 8;
  const quotationCount = 5;
  const clientCount = 12;
  
  // Mock data for recent inquiries
  const recentInquiries = [
    { id: 'INQ-001', client: 'Acme Corp', date: '2023-05-15', status: 'NEW' },
    { id: 'INQ-002', client: 'Globex Inc', date: '2023-05-14', status: 'CONTACTED' },
    { id: 'INQ-003', client: 'Stark Industries', date: '2023-05-13', status: 'QUALIFIED' }
  ];
  
  // Mock data for recent quotations
  const recentQuotations = [
    { id: 'Q-001', client: 'Acme Corp', date: '2023-05-15', amount: 4500, status: 'SENT' },
    { id: 'Q-002', client: 'Globex Inc', date: '2023-05-14', amount: 8200, status: 'ACCEPTED' },
    { id: 'Q-003', client: 'Stark Industries', date: '2023-05-13', amount: 12000, status: 'REJECTED' }
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-2xl leading-6 font-medium text-gray-900">Dashboard</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            Create New Quotation
          </button>
        </div>
      </header>
      
      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Inquiries Stat */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Inquiries</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{inquiryCount}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/inquiries" className="font-medium text-primary-600 hover:text-primary-500">View all</Link>
            </div>
          </div>
        </div>

        {/* Quotations Stat */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Quotations</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{quotationCount}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/quotations" className="font-medium text-blue-600 hover:text-blue-500">View all</Link>
            </div>
          </div>
        </div>

        {/* Clients Stat */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Clients</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{clientCount}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/clients" className="font-medium text-green-600 hover:text-green-500">View all</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Inquiries */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Recent Inquiries</h3>
              <Link to="/inquiries" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                View all
              </Link>
            </div>
          </div>
          <div className="px-5 py-3">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentInquiries.map((inquiry) => (
                  <li key={inquiry.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 font-medium text-sm">
                            {inquiry.client.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {inquiry.client}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {new Date(inquiry.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            inquiry.status === 'NEW'
                              ? 'bg-yellow-100 text-yellow-800'
                              : inquiry.status === 'CONTACTED'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Quotations */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Recent Quotations</h3>
              <Link to="/quotations" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all
              </Link>
            </div>
          </div>
          <div className="px-5 py-3">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentQuotations.map((quotation) => (
                  <li key={quotation.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {quotation.client.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {quotation.client}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {formatCurrency(quotation.amount)} • {new Date(quotation.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            quotation.status === 'SENT'
                              ? 'bg-blue-100 text-blue-800'
                              : quotation.status === 'ACCEPTED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {quotation.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;