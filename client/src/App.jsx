// client/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Inquiry from './pages/Inquiry';
import Quote from './pages/Quote';
import Booking from './pages/Booking';
import Reports from './pages/Reports';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import QuotationList from './pages/QuotationList';
import QuotationForm from './pages/QuotationForm';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4 container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/inquiries" element={<Inquiry />} />
          <Route path="/quotations" element={<QuotationList />} />
          <Route path="/quotations/new" element={<QuotationForm />} />
          <Route path="/quotations/:id" element={<QuotationForm />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;