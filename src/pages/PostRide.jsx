import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';


function PostRide() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState(null);
  const [fromLocation, setFromLocation] = useState('');
  const [leaveDate, setLeaveDate] = useState('');
  const [seats, setSeats] = useState(null);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Validate required fields
      if (!name || !contact || !fromLocation || !leaveDate || seats === null) {
        throw new Error('Please fill in all required fields');
      }

      // Insert ride data into Supabase
      const { data, error } = await supabase
        .from('rides')
        .insert([
          {
            name: name,
            contact: contact,
            from_location: fromLocation,
            leave_date: leaveDate,
            seats: parseInt(seats),
            notes: notes,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      // Clear form on success
      setName('');
      setContact(null);
      setFromLocation('');
      setLeaveDate('');
      setSeats(null);
      setNotes('');
      
      setMessage('Ride posted successfully!');
      
    } catch (error) {
      console.error('Error posting ride:', error);
      setMessage(error.message || 'Failed to post ride. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 pt-8">
      <h1 className="text-2xl font-bold mb-2">Post a Ride</h1>
      <p className="mb-6">This is where you can post a new ride.</p>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {message && (
          <div className={`mb-4 p-3 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col text-sm font-medium">
              Name:
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="mt-1 p-2 border rounded"
                placeholder="Jatayu"
                required
              />
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
              <input 
                type="text" 
                value={fromLocation} 
                onChange={(e) => setFromLocation(e.target.value)} 
                className="mt-1 p-2 border rounded" 
                placeholder="14543"
                required
              />
            </label>
            <label className="flex flex-col text-sm font-medium">
              Leave Date:
              <input 
                type="date" 
                value={leaveDate} 
                onChange={(e) => setLeaveDate(e.target.value)} 
                className="mt-1 p-2 border rounded"
                required
              />
            </label>
            <label className="flex flex-col text-sm font-medium">
              Seats Available:
              <input 
                type="number" 
                value={seats || ''} 
                onChange={(e) => setSeats(e.target.value)} 
                className="mt-1 p-2 border rounded"
                placeholder="0"
                min="0"
                required
              />
            </label>
            <label className="flex flex-col text-sm font-medium">
              Notes:
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                className="mt-1 p-2 border rounded" 
                placeholder="Enter any additional information (preferred time, luggage space, etc.)"
              />
            </label>
            <button 
              type="submit" 
              disabled={isLoading}
              className={`mt-4 py-2 px-4 rounded font-medium ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isLoading ? 'Posting...' : 'Post Ride'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostRide;


// add feature to show all rides posted by the user
