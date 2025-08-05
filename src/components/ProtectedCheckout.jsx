// src/components/ProtectedCheckout.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import OrderSummaryPage from '../pages/CheckoutPage';

const ProtectedCheckout = () => {
  const { cartItems } = useSelector((state) => state.cart);

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return <OrderSummaryPage />;
};

export default ProtectedCheckout;