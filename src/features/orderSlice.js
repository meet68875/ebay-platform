// src/features/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

// A constant for the local storage key is a good practice
const LOCAL_STORAGE_KEY = "orders";

// Helper function to safely get orders from local storage on initialization
const getOrdersFromLocalStorage = () => {
  try {
    const orders = localStorage.getItem(LOCAL_STORAGE_KEY);
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error("Failed to load orders from local storage:", error);
    return [];
  }
};

const initialState = {
  orders: getOrdersFromLocalStorage(),
  orderLoading: false,
  orderSuccess: false,
  orderError: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // This is the new, common method to add an order to the state and local storage.
    addOrder: (state, action) => {
      // Create a unique ID and timestamp for the new order
      const newOrder = {
        ...action.payload,
        id: "ORD-" + new Date().getTime(),
        date: new Date().toISOString(),
      };
      
      // Add the new order to the beginning of the orders array
      state.orders.unshift(newOrder);

      // Save the entire updated orders array back to local storage
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.orders));
        state.orderSuccess = true;
        state.orderError = null;
      } catch (error) {
        console.error("Failed to save orders to local storage:", error);
        state.orderError = "Failed to save order.";
        state.orderSuccess = false;
      }
    },
    
    // A method to clear all orders from both state and local storage
    clearOrders: (state) => {
      state.orders = [];
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    },

    // A utility to reset the status flags for a new operation
    resetOrderState: (state) => {
      state.orderLoading = false;
      state.orderSuccess = false;
      state.orderError = null;
    },
  },
});

export const { addOrder, clearOrders, resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;