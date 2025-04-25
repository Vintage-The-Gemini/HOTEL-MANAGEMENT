// client/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/60 shadow-xl rounded-3xl p-10 max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 mb-4">
          Welcome to HotelFlow
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          Simplify hotel management with our all-in-one booking and sales pipeline solution.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/inquiry"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-300"
          >
            Start an Inquiry
          </Link>
          <Link
            to="/booking"
            className="bg-white text-purple-600 hover:text-white hover:bg-purple-500 border border-purple-600 px-6 py-3 rounded-full text-lg font-medium transition-all duration-300"
          >
            Make a Booking
          </Link>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-600">
        Manage inquiries, quotes, bookings, and reports — all in one place.
      </div>
    </div>
  );
};

export default Home;
