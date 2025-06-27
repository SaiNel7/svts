import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import RideCard from '../components/RideCard';

export default function Home() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterLocation, setFilterLocation] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('rides')
        .select('*')
        .order('created_at', { ascending: false });

      if (filterLocation) {
        query = query.ilike('from_location', `%${filterLocation}%`);
      }
      if (filterDate) {
        query = query.eq('leave_date', filterDate);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setRides(data || []);
    } catch (error) {
      console.error('Error fetching rides:', error);
      setError('Failed to load rides. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilterLocation('');
    setFilterDate('');
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchRides();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading rides...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
     {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Rides</h2>
          <form onSubmit={handleFilterSubmit} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location (Zip Code)
              </label>
              <input
                type="text"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                placeholder="Enter zip code"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leave Date
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Rides Grid */}
        {rides.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No rides found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filterLocation || filterDate 
                ? 'Try adjusting your filters or post a new ride.'
                : 'Get started by posting the first ride.'
              }
            </p>
            <div className="mt-6">
              <button
                onClick={() => window.location.href = '/post-ride'}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Post a Ride
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))}
          </div>
        )}

        {/* Results Count */}
        {rides.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Showing {rides.length} ride{rides.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}