import React, { useState } from 'react';

const Inquiry = () => {
  const [form, setForm] = useState({
    name: '', email: '', contact: '', message: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className='max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg'>
      <h2 className='text-2xl font-bold text-indigo-600 mb-4'>Submit an Inquiry</h2>
      <form className='space-y-4'>
        <input type='text' name='name' placeholder='Full Name' value={form.name} onChange={handleChange} className='w-full p-2 border rounded' />
        <input type='email' name='email' placeholder='Email Address' value={form.email} onChange={handleChange} className='w-full p-2 border rounded' />
        <input type='text' name='contact' placeholder='Phone Number' value={form.contact} onChange={handleChange} className='w-full p-2 border rounded' />
        <textarea name='message' placeholder='Inquiry Details' value={form.message} onChange={handleChange} className='w-full p-2 border rounded'></textarea>
        <button type='button' className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700'>Submit</button>
      </form>
    </div>
  );
};

export default Inquiry;
