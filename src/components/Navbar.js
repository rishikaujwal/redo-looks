import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Clothes App</Link>
        <div>
          {currentUser ? (
            <>
              <Link to="/dashboard" className="mr-4">Dashboard</Link>
              <Link to="/donations" className="mr-4">Donations</Link>
              <Link to="/resale" className="mr-4">Resale</Link>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/signup" className="mr-4">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
