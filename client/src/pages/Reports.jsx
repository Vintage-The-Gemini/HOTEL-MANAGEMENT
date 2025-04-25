import React from 'react';

const Reports = () => {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold text-indigo-600'>Reports Overview</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-white p-4 shadow rounded'>
          <h4 className='text-lg font-semibold mb-2'>Daily Revenue</h4>
          <p className='text-2xl text-green-600'>$3,450</p>
        </div>
        <div className='bg-white p-4 shadow rounded'>
          <h4 className='text-lg font-semibold mb-2'>Occupancy Rate</h4>
          <p className='text-2xl text-blue-600'>78%</p>
        </div>
        <div className='bg-white p-4 shadow rounded'>
          <h4 className='text-lg font-semibold mb-2'>Unpaid Invoices</h4>
          <p className='text-2xl text-red-600'>$600</p>
        </div>
        <div className='bg-white p-4 shadow rounded'>
          <h4 className='text-lg font-semibold mb-2'>Repeat Guests</h4>
          <p className='text-2xl text-purple-600'>15</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
