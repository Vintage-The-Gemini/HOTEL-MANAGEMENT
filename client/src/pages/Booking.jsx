import React from 'react';

const Booking = () => {
  const bookings = [
    { id: 'BK1001', client: 'John Doe', room: 'Deluxe Suite', status: 'Paid' },
    { id: 'BK1002', client: 'Jane Smith', room: 'Standard', status: 'Pending' },
    { id: 'BK1003', client: 'Alan King', room: 'Executive', status: 'Paid' },
  ];

  return (
    <div className='overflow-x-auto'>
      <h2 className='text-2xl font-bold text-indigo-600 mb-4'>Bookings</h2>
      <table className='min-w-full bg-white rounded shadow'>
        <thead>
          <tr className='bg-indigo-100 text-left'>
            <th className='p-3'>Booking ID</th>
            <th className='p-3'>Client</th>
            <th className='p-3'>Room</th>
            <th className='p-3'>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id} className='border-b hover:bg-gray-100'>
              <td className='p-3'>{b.id}</td>
              <td className='p-3'>{b.client}</td>
              <td className='p-3'>{b.room}</td>
              <td className='p-3'>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${b.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
