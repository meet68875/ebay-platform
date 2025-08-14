// src/features/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../constants/axiosInstance";

// --- Thunks ---

// 1. Place Order
export const placeOrderToAPI = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await authApi.post("/orders", orderData, config);
      return data.data; // Order created
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to place order"
      );
    }
  }
);

// 2. Get All Orders for Logged-in User
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await authApi.get("/orders", config);
      return data.data; // Orders array
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// --- Slice ---

const initialState = {
  orders: [],
  orderLoading: false,
  orderSuccess: false,
  orderError: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
    resetOrderState: (state) => {
      state.orderLoading = false;
      state.orderSuccess = false;
      state.orderError = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Place Order
      .addCase(placeOrderToAPI.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(placeOrderToAPI.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderSuccess = true;
        state.orders.unshift(action.payload); // Add new order to list
      })
      .addCase(placeOrderToAPI.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload;
      })

      // Fetch Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload;
      });
  },
});

// --- Exports ---
export const { clearOrders, resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
