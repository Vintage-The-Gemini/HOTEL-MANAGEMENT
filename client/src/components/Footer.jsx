// client/src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center shadow-md">
      <p className="text-sm">© {new Date().getFullYear()} HotelFlow Management. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
