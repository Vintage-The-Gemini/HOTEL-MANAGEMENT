// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inquiry from './pages/Inquiry';
import Quote from './pages/Quote';
import Booking from './pages/Booking';
import Reports from './pages/Reports';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Quotations from './pages/Quotations';
import QuotationForm from './pages/QuotationForm';
import QuotationView from './pages/QuotationView';
import Invoices from './pages/Invoices';
import InvoiceForm from './pages/InvoiceForm';
import InvoiceView from './pages/InvoiceView';
import PaymentForm from './pages/PaymentForm';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4 container mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/inquiries" element={<Inquiry />} />
          <Route path="/reports" element={<Reports />} />
          
          {/* Quotation Routes */}
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/quotations/new" element={<QuotationForm />} />
          <Route path="/quotations/edit/:id" element={<QuotationForm />} />
          <Route path="/quotations/:id" element={<QuotationView />} />
          <Route path="/quotations/download/:id" element={<QuotationView />} />
          
          {/* Invoice Routes */}
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/create/:quotationId" element={<InvoiceForm />} />
          <Route path="/invoices/edit/:id" element={<InvoiceForm />} />
          <Route path="/invoices/:id" element={<InvoiceView />} />
          <Route path="/invoices/download/:id" element={<InvoiceView />} />
          
          {/* Payment Routes */}
          <Route path="/payments/create/:invoiceId" element={<PaymentForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;