import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout, user }) {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Loan Calculator
          </Link>
          
          <div>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="hidden md:inline">Welcome, {user?.email}</span>
                <button
                  onClick={onLogout}
                  className="bg-white text-blue-600 py-1 px-3 rounded hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="bg-blue-500 py-1 px-3 rounded hover:bg-blue-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 py-1 px-3 rounded hover:bg-gray-100 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;