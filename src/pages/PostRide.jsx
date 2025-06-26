import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';


function PostRide() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState(null);
  const [fromLocation, setFromLocation] = useState('');
  const [leaveDate, setLeaveDate] = useState('');
  const [seats, setSeats] = useState(null);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const rideData = new FormData();
    rideData.append('name', name);
    rideData.append('contact', contact);
    rideData.append('fromLocation', fromLocation);
    rideData.append('leaveDate', leaveDate);
    rideData.append('seats', seats);
    rideData.append('notes', notes);
    
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 pt-8">
      <h1 className="text-2xl font-bold mb-2">Post a Ride</h1>
      <p className="mb-6">This is where you can post a new ride.</p>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col text-sm font-medium">
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 border rounded"
              placeholder="Jatayu"/>
            </label>
            <label className="flex flex-col text-sm font-medium">
              Phone Number:
              <input
                type="tel"
                value={contact || ''}
                onChange={(e) => setContact(e.target.value)}
                className="mt-1 p-2 border rounded"
                pattern="[0-9]{10}"
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter 10-digit phone number"
                required
              />
            </label>
            <label className="flex flex-col text-sm font-medium">
              Start Location (Zip / Postal Code):
              <input type="text" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} className="mt-1 p-2 border rounded" 
              placeholder="14543"/>
            </label>
            <label className="flex flex-col text-sm font-medium">
              Leave Date:
              <input type="date" value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} className="mt-1 p-2 border rounded" />
            </label>
            <label className="flex flex-col text-sm font-medium">
              Seats Available:
              <input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} className="mt-1 p-2 border rounded"
              placeholder="0"/>
            </label>
            <label className="flex flex-col text-sm font-medium">
              Notes:
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 p-2 border rounded" 
              placeholder="Enter any additional information (preferred time, luggage space, etc.)"/>
            </label>
            <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Post Ride</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostRide;


// add feature to show all rides posted by the user
