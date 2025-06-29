import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (!cart) {
    return <div style={{padding: 40, textAlign: 'center'}}>Your cart is empty.</div>;
  }

  const { room, quantity } = cart;
  const nights = cart.nights || 1;
  const guests = cart.guests || 1;
  const subtotal = room.price * nights * guests * quantity;
  const discount = room.oldPrice ? (room.oldPrice - room.price) * nights * guests * quantity : 0;
  const total = subtotal;

  return (
    <div style={{maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 32}}>
      <h1 style={{fontSize: 48, fontWeight: 800, marginBottom: 24}}>Cart</h1>
      <hr style={{marginBottom: 24}} />
      <div style={{display: 'flex', gap: 32}}>
        <div style={{flex: 2}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
            <img src={room.image} alt={room.title} style={{width: 120, height: 90, objectFit: 'cover', borderRadius: 8}} />
            <div>
              <div style={{fontWeight: 700, fontSize: 20}}>{room.title}</div>
              <div style={{color: '#888', textDecoration: 'line-through'}}>{room.oldPrice && `₹${room.oldPrice.toLocaleString()}`}</div>
              <div style={{fontWeight: 700, fontSize: 18, color: '#222'}}>₹{room.price.toLocaleString()}</div>
              {room.oldPrice && <div style={{background: '#f3f3f3', color: '#222', fontWeight: 600, borderRadius: 6, padding: '2px 10px', display: 'inline-block', marginTop: 4}}>SAVE ₹{(room.oldPrice-room.price).toLocaleString()}</div>}
            </div>
          </div>
          <div style={{marginTop: 18, fontSize: 28, fontWeight: 700}}>{room.location}</div>
          <div style={{color: '#444', marginBottom: 12}}>{room.guests} guests  {room.bedrooms} bedrooms  {room.beds} beds  {room.bathrooms} bathrooms</div>
          
          {/* Booking Details */}
          {cart.checkIn && cart.checkOut && (
            <div style={{background: '#f7f7f7', borderRadius: 8, padding: 16, marginBottom: 16}}>
              <div style={{fontWeight: 600, marginBottom: 8}}>Booking Details:</div>
              <div style={{color: '#666', marginBottom: 4}}>Check-in: {new Date(cart.checkIn).toLocaleDateString()}</div>
              <div style={{color: '#666', marginBottom: 4}}>Check-out: {new Date(cart.checkOut).toLocaleDateString()}</div>
              <div style={{color: '#666', marginBottom: 4}}>Nights: {nights}</div>
              <div style={{color: '#666'}}>Guests: {guests}</div>
            </div>
          )}
          
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12}}>
            <button onClick={() => updateQuantity(Math.max(1, quantity-1))} style={{padding: '2px 10px', fontSize: 18, borderRadius: 4, border: '1px solid #ccc', background: '#fafafa'}}>–</button>
            <span style={{fontWeight: 600, fontSize: 18}}>{quantity}</span>
            <button onClick={() => updateQuantity(quantity+1)} style={{padding: '2px 10px', fontSize: 18, borderRadius: 4, border: '1px solid #ccc', background: '#fafafa'}}>+</button>
          </div>
          <button onClick={removeFromCart} style={{color: '#ea580c', background: 'none', border: 'none', marginTop: 8, cursor: 'pointer'}}>Remove item</button>
        </div>
        <div style={{flex: 1, background: '#f7f7f7', borderRadius: 10, padding: 24, minWidth: 260}}>
          <div style={{fontWeight: 700, fontSize: 18, marginBottom: 18}}>CART TOTALS</div>
          {/* Coupon section can be added here */}
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          {discount > 0 && (
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
              <span>Discount</span>
              <span style={{color: '#22c55e'}}>-₹{discount.toLocaleString()}</span>
            </div>
          )}
          <hr />
          <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 22, margin: '18px 0'}}>
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <button style={{width: '100%', background: '#23272f', color: '#fff', padding: '14px 0', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 18, cursor: 'pointer', opacity: 1, marginTop: 10}}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 