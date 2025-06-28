import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PostRide from './pages/PostRide';
import RequestRide from './pages/RequestRide';
import ViewRequests from './pages/ViewRequests';
import ViewRides from './pages/ViewRides';

export default function App() {
  return (
    <Router>
      <div className= "min-h-screen bg-gray-50 text-gray-900">
        <nav className="bg-white shadow p-4 flex justify-between">
          <Link to="/" className="text-xl font-semibold">SVTS RideShare</Link>
          <div className = "flex space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/view-rides" className="hover:underline">View Rides</Link>
            <Link to="/post-ride" className="hover:underline">Post a Ride</Link>
            <Link to="/request-ride" className="hover:underline">Request a Ride</Link>
            <Link to="/view-requests" className="hover:underline">View Requests</Link>
            <Link to="/Profile" className="hover:underline">Profile</Link>
          </div>
        </nav>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/view-rides" element={<ViewRides />} />
            <Route path="/post-ride" element={<PostRide />} />
            <Route path="/request-ride" element={<RequestRide />} />
            <Route path="/view-requests" element={<ViewRequests />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}