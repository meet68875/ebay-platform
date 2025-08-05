// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Using axios directly for auth for now
import axiosInstance from "../constants/axiosInstance"; // We'll update this later

const BASE_URL = "https://api.escuelajs.co/api/v1";

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      const token = response.data.access_token;

      // After a successful login, fetch the user's profile
      const userResponse = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // We store the token and user profile in a single payload
      const user = userResponse.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

// Async thunk to fetch user profile (e.g., on app load)
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return rejectWithValue("No token found.");
    }
    try {
      const response = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      console.log("user", user);
      localStorage.setItem("user", JSON.stringify(user));
      return { token, user };
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updatedUserData, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;
    const userId = auth.user.id;

    if (!token || !userId) {
      return rejectWithValue("Authentication token or user ID not found.");
    }

    try {
      // The API endpoint for updating a user is usually a PUT request with the user ID
      const response = await axios.put(
        `https://api.escuelajs.co/api/v1/users/${userId}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // The API returns the updated user data. We'll use this to update our state.
      const updatedUser = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password, avatar }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/`, {
        name,
        email,
        password,
        // The avatar is optional, so we provide a default if none is given
        avatar: avatar || "https://i.imgur.com/LDOO4Qs.jpg",
      });
      // The API returns the newly created user object
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // The API returns a specific error message, e.g., 'Email already exists'
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unexpected error occurred during signup.");
    }
  }
);

// Helper function to get initial state from local storage
const getInitialState = () => {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("user");

  return {
    isAuthenticated: !!token,
    token: token || null,
    user: user ? JSON.parse(user) : null,
    loading: false,
    error: null,
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer for user logout
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
    // You can add a reducer to clear errors if needed
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle signupUser
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        // We don't log the user in automatically. They'll be redirected to login page.
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Update the user object with the new data
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
