import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBookNow = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById('listings-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#listings-section';
    }
  };

  const handleScrollNav = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-main">Stay</span>
        <span className="logo-accent">finder.in</span>
        <div className="navbar-tagline">STAY EXPLORE REPEAT</div>
      </div>
      <div className="navbar-links">
        <Link to="/">HOME</Link>
        <a href="/booking" onClick={e => handleScrollNav(e, 'listings-section')}>BOOKING</a>
        <a href="/about" onClick={e => handleScrollNav(e, 'services-section')}>ABOUT US</a>
        <a href="/contact" onClick={e => handleScrollNav(e, 'services-section')}>CONTACT US</a>
        <button className="navbar-btn" onClick={handleBookNow}>BOOK NOW !</button>
      </div>
    </nav>
  );
};

export default Navbar; 