import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import AuthPage from './components/AuthPage';
import CalculatorPage from './components/CalculatorPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handlePageChange} />;
      case 'about':
        return <AboutPage />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} user={user} onLogout={handleLogout} />;
      case 'calculator':
        return <CalculatorPage />;
      default:
        return <HomePage onNavigate={handlePageChange} />;
    }
  };

  return (
    <div className="App">
      <Header 
        currentPage={currentPage} 
        onNavigate={handlePageChange}
        user={user}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
}

export default App;