import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Donations from './pages/Donations';
import Resale from './pages/Resale';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route 
            path="/login" 
            element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/signup" 
            element={!currentUser ? <Signup /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route path="/donations" element={<Donations />} />
          <Route path="/resale" element={<Resale />} />
          <Route 
            path="/" 
            element={<Navigate to={currentUser ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
