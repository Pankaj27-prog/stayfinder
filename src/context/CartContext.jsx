import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null); // { room, quantity }

  const addToCart = (room) => {
    setCart({ room, quantity: 1 });
  };

  const removeFromCart = () => {
    setCart(null);
  };

  const updateQuantity = (quantity) => {
    setCart((prev) => prev ? { ...prev, quantity } : prev);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}; 