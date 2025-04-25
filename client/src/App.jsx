// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Inquiry from './pages/Inquiry';
import Quote from './pages/Quote';
import Booking from './pages/Booking';
import Reports from './pages/Reports';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4 container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookings" element={<Booking />} />  {/* Added for nav compatibility */}
          <Route path="/inquiries" element={<Inquiry />} />  {/* Added for nav compatibility */}
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;