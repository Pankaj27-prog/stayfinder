import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Booking = () => {
  const { addToCart } = useCart();
  const [selectedDates, setSelectedDates] = useState({
    checkIn: '',
    checkOut: ''
  });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guests, setGuests] = useState(1);

  // Sample room data
  const rooms = [
    {
      id: 1,
      title: "Deluxe Room",
      price: 2500,
      oldPrice: 3000,
      image: "/src/assets/room1.png",
      location: "Mumbai, Maharashtra",
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      description: "Spacious room with city view"
    },
    {
      id: 2,
      title: "Premium Suite",
      price: 4500,
      oldPrice: 5500,
      image: "/src/assets/room2.png",
      location: "Delhi, NCR",
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      description: "Luxury suite with balcony"
    },
    {
      id: 3,
      title: "Executive Room",
      price: 3500,
      oldPrice: 4000,
      image: "/src/assets/room3.png",
      location: "Bangalore, Karnataka",
      guests: 3,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      description: "Modern room with work desk"
    }
  ];

  const calculateNights = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    const checkIn = new Date(selectedDates.checkIn);
    const checkOut = new Date(selectedDates.checkOut);
    const diffTime = checkOut - checkIn;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    const nights = calculateNights();
    return selectedRoom.price * nights * guests;
  };

  const calculateDiscount = () => {
    if (!selectedRoom || !selectedRoom.oldPrice) return 0;
    const nights = calculateNights();
    return (selectedRoom.oldPrice - selectedRoom.price) * nights * guests;
  };

  const handleAddToCart = () => {
    if (selectedRoom && selectedDates.checkIn && selectedDates.checkOut) {
      addToCart({
        ...selectedRoom,
        checkIn: selectedDates.checkIn,
        checkOut: selectedDates.checkOut,
        nights: calculateNights(),
        guests: guests
      });
    }
  };

  return (
    <div style={{maxWidth: 1200, margin: '40px auto', padding: '0 20px'}}>
      <h1 style={{fontSize: 48, fontWeight: 800, marginBottom: 32, textAlign: 'center'}}>Book Your Stay</h1>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40}}>
        {/* Left Column - Room Selection */}
        <div>
          <h2 style={{fontSize: 28, fontWeight: 700, marginBottom: 24}}>Select Your Room</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            {rooms.map((room) => (
              <div 
                key={room.id}
                style={{
                  border: selectedRoom?.id === room.id ? '2px solid #23272f' : '1px solid #e5e5e5',
                  borderRadius: 12,
                  padding: 20,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => setSelectedRoom(room)}
              >
                <div style={{display: 'flex', gap: 16}}>
                  <img 
                    src={room.image} 
                    alt={room.title} 
                    style={{width: 100, height: 75, objectFit: 'cover', borderRadius: 8}}
                  />
                  <div style={{flex: 1}}>
                    <h3 style={{fontWeight: 700, fontSize: 18, marginBottom: 8}}>{room.title}</h3>
                    <p style={{color: '#666', marginBottom: 8}}>{room.description}</p>
                    <p style={{color: '#666', marginBottom: 8}}>{room.location}</p>
                    <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                      <span style={{color: '#666'}}>{room.guests} guests</span>
                      <span style={{color: '#666'}}>{room.bedrooms} bedroom</span>
                      <span style={{color: '#666'}}>{room.bathrooms} bathroom</span>
                    </div>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    {room.oldPrice && (
                      <div style={{color: '#888', textDecoration: 'line-through', fontSize: 14}}>
                        ₹{room.oldPrice.toLocaleString()}
                      </div>
                    )}
                    <div style={{fontWeight: 700, fontSize: 20, color: '#23272f'}}>
                      ₹{room.price.toLocaleString()}
                    </div>
                    <div style={{fontSize: 12, color: '#666'}}>per night</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Booking Details */}
        <div>
          <h2 style={{fontSize: 28, fontWeight: 700, marginBottom: 24}}>Booking Details</h2>
          
          {/* Date Selection */}
          <div style={{marginBottom: 24}}>
            <label style={{display: 'block', fontWeight: 600, marginBottom: 8}}>Check-in Date</label>
            <input
              type="date"
              value={selectedDates.checkIn}
              onChange={(e) => setSelectedDates(prev => ({...prev, checkIn: e.target.value}))}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: 8,
                fontSize: 16
              }}
            />
          </div>

          <div style={{marginBottom: 24}}>
            <label style={{display: 'block', fontWeight: 600, marginBottom: 8}}>Check-out Date</label>
            <input
              type="date"
              value={selectedDates.checkOut}
              onChange={(e) => setSelectedDates(prev => ({...prev, checkOut: e.target.value}))}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: 8,
                fontSize: 16
              }}
            />
          </div>

          {/* Guests Selection */}
          <div style={{marginBottom: 24}}>
            <label style={{display: 'block', fontWeight: 600, marginBottom: 8}}>Number of Guests</label>
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: 8,
                fontSize: 16
              }}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>

          {/* Booking Summary */}
          {selectedRoom && (
            <div style={{background: '#f7f7f7', borderRadius: 12, padding: 24, marginBottom: 24}}>
              <h3 style={{fontWeight: 700, fontSize: 20, marginBottom: 16}}>Booking Summary</h3>
              
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
                <span>Room:</span>
                <span>{selectedRoom.title}</span>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
                <span>Nights:</span>
                <span>{calculateNights()}</span>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
                <span>Guests:</span>
                <span>{guests}</span>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
                <span>Price per night:</span>
                <span>₹{selectedRoom.price.toLocaleString()}</span>
              </div>
              
              {calculateDiscount() > 0 && (
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
                  <span>Discount:</span>
                  <span style={{color: '#22c55e'}}>-₹{calculateDiscount().toLocaleString()}</span>
                </div>
              )}
              
              <hr style={{margin: '16px 0'}} />
              
              <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 20}}>
                <span>Total:</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedRoom || !selectedDates.checkIn || !selectedDates.checkOut}
            style={{
              width: '100%',
              background: selectedRoom && selectedDates.checkIn && selectedDates.checkOut ? '#23272f' : '#ccc',
              color: '#fff',
              padding: '16px',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 18,
              cursor: selectedRoom && selectedDates.checkIn && selectedDates.checkOut ? 'pointer' : 'not-allowed'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking; 