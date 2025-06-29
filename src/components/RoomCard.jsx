import React from 'react';
import './RoomCard.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ image, title, details }) => {
  const isLoggedIn = !!localStorage.getItem('token');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBook = () => {
    addToCart({ image, title, details, price: 8000, oldPrice: 9999, location: 'Entire home in Bhat, India', guests: 6, bedrooms: 2, beds: 4, bathrooms: 2 });
    navigate('/cart');
  };

  return (
    <div className="room-card">
      <img src={image} alt={title} className="room-card-img" />
      <div className="room-card-title">{title}</div>
      <div className="room-card-details">{details}</div>
      {isLoggedIn && (
        <button className="room-card-book-btn" onClick={handleBook} style={{marginTop: '12px'}}>Book Now</button>
      )}
    </div>
  );
};

export default RoomCard; 