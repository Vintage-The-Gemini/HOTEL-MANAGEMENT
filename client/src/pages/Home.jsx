// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1">
    <div className="text-indigo-500 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl overflow-hidden shadow-2xl">
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Simplify Your Hotel Management
            </h1>
            <p className="text-lg md:text-xl mb-8 text-indigo-100">
              Streamline inquiries, quotes, bookings, and reports with our all-in-one solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/inquiry"
                className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-md"
              >
                Start an Inquiry
              </Link>
              <Link
                to="/booking"
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300"
              >
                Make a Booking
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg transform rotate-3">
              <div className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-inner">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Hotel Check-In</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-20"></div>
                    <div className="h-2 bg-gray-300 rounded w-16"></div>
                  </div>
                  <div className="h-10 bg-gray-100 rounded"></div>
                  <div className="flex space-x-2">
                    <div className="h-12 bg-indigo-100 rounded flex-1"></div>
                    <div className="h-12 bg-pink-100 rounded flex-1"></div>
                  </div>
                  <div className="flex justify-end">
                    <div className="h-8 w-24 bg-indigo-500 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features that Simplify Your Workflow</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
            title="Inquiry Management"
            description="Capture and track all client inquiries efficiently in one place."
          />
          <FeatureCard 
            icon={<svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="Bookings Simplified"
            description="Create, manage, and track all bookings with ease."
          />
          <FeatureCard 
            icon={<svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="Instant Quotes"
            description="Generate accurate quotes quickly for your clients."
          />
          <FeatureCard 
            icon={<svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            title="Comprehensive Reports"
            description="Get insights into your business with detailed analytics."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-8 md:p-12 shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Transform Your Hotel Management?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of hotels that have simplified their operations with HotelFlow.
            </p>
            <Link to="/inquiry" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-md">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;