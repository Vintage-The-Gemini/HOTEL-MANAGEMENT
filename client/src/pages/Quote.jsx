import React from 'react';

const Quote = () => {
  return (
    <div className='max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md'>
      <h2 className='text-2xl font-bold text-indigo-600 mb-4'>Quotation Summary</h2>
      <ul className='divide-y'>
        <li className='py-2 flex justify-between'>
          <span>Room Cost (3 nights)</span>
          <span>$300</span>
        </li>
        <li className='py-2 flex justify-between'>
          <span>Transport</span>
          <span>$50</span>
        </li>
        <li className='py-2 flex justify-between'>
          <span>Seasonal Discount</span>
          <span>-$30</span>
        </li>
        <li className='py-2 flex justify-between font-semibold'>
          <span>Total (incl. tax)</span>
          <span>$350</span>
        </li>
      </ul>
      <button className='mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'>Send Quote</button>
    </div>
  );
};

export default Quote;
