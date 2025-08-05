// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart state from local storage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cartItems');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn("Could not load cart from local storage", e);
    return [];
  }
};

// Helper function to save cart state to local storage
const saveCartToLocalStorage = (cartItems) => {
  try {
    const serializedCart = JSON.stringify(cartItems);
    localStorage.setItem('cartItems', serializedCart);
  } catch (e) {
    console.warn("Could not save cart to local storage", e);
  }
};

// Calculate totals from the loaded cart items
const calculateTotals = (cartItems) => {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  return { totalQuantity, totalAmount };
};

const initialCartItems = loadCartFromLocalStorage();
const initialTotals = calculateTotals(initialCartItems);

const initialState = {
  cartItems: initialCartItems,
  totalQuantity: initialTotals.totalQuantity,
  totalAmount: initialTotals.totalAmount,
  loading: false, // For potential future async cart operations
  error: null, // For potential future errors
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to add an item to the cart
    addToCart: (state, action) => {
      const newItem = action.payload; // The product object
      const existingItem = state.cartItems.find(item => item.id === newItem.id);

      if (existingItem) {
        // If item already exists, increase its quantity
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        // If it's a new item, add it with quantity 1
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image || newItem.images[0], // Use first image if available
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      
      // Recalculate total quantity and amount for the entire cart
      state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

      // Save updated cart to local storage
      saveCartToLocalStorage(state.cartItems);
    },

    // Action to remove an item from the cart
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== idToRemove);

      // Recalculate totals
      state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

      // Save updated cart to local storage
      saveCartToLocalStorage(state.cartItems);
    },

    // Action to increase quantity of an item
    increaseQuantity: (state, action) => {
      const idToIncrease = action.payload;
      const item = state.cartItems.find(item => item.id === idToIncrease);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.price;
      }
      // Recalculate totals
      state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

      // Save updated cart to local storage
      saveCartToLocalStorage(state.cartItems);
    },

    // Action to decrease quantity of an item
    decreaseQuantity: (state, action) => {
      const idToDecrease = action.payload;
      const item = state.cartItems.find(item => item.id === idToDecrease);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
          item.totalPrice = item.quantity * item.price;
        } else {
          // If quantity becomes 0, remove the item
          state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== idToDecrease);
        }
      }
      // Recalculate totals
      state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

      // Save updated cart to local storage
      saveCartToLocalStorage(state.cartItems);
    },

    // Action to clear the entire cart
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cartItems'); // Clear from local storage
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;