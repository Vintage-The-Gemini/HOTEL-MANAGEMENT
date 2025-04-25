import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-white shadow p-4 flex justify-between'>
      <Link to='/' className='text-xl font-bold text-indigo-600'>HotelApp</Link>
      <div className='space-x-4'>
        <Link to='/inquiries'>Inquiries</Link>
        <Link to='/bookings'>Bookings</Link>
        <Link to='/reports'>Reports</Link>
      </div>
    </nav>
  );
};

export default Navbar;
