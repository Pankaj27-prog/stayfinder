import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero-bg.png';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Find Your Perfect Stay Anywhere, Anytime</h1>
        <p className="hero-subtitle">Discover the best rooms, hotels, and stays tailored to your needs. Affordable, convenient, and just a few clicks away!</p>
        <button className="hero-btn" onClick={handleAuthClick}>
          <span style={{marginRight: '8px'}}>{isLoggedIn ? '🔓' : '🔒'}</span> {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default HeroSection; 