import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Inquiry from './pages/Inquiry';
import Booking from './pages/Booking';
import Reports from './pages/Reports';
import Quote from './pages/Quote';

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/inquiries' element={<Inquiry />} />
        <Route path='/bookings' element={<Booking />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/quote' element={<Quote />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
