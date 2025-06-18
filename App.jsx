import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LoanCalculator from './components/LoanCalculator';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    console.log("Logging in user:", userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleRegister = (userData) => {
    console.log("Registering user:", userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} user={user} />
        
        <div className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? 
                <Navigate to="/calculator" /> : 
                <Login onLogin={handleLogin} />
            } />
            
            <Route path="/register" element={
              isAuthenticated ? 
                <Navigate to="/calculator" /> : 
                <Register onRegister={handleRegister} />
            } />
            
            <Route path="/calculator" element={
                <LoanCalculator />
            } />
            
            <Route path="/" element={<Navigate to={isAuthenticated ? "/calculator" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;