// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../constants/axiosInstance";
import storage from "../utils/helpers/localStorageHelper";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await authApi.post("/users/login", { email, password });

      const token = data.data.token;
      const user = {
        _id: data.data._id,
        username: data.data.username,
        email: data.data.email
      };

      // Save to localStorage
      storage.setItem("authToken", token);
      storage.setItem("user", user);

      // Return shape matching reducer
      return { token, user };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Login failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "users/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await authApi.post("/users/register", {
        username,
        email,
        password,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Signup failed");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "users/fetchProfile",
  async (_, { rejectWithValue }) => {
    console.log("📡 fetchUserProfile thunk triggered");
    try {
      const token = storage.getItem("authToken");
      console.log("➡️ Sending request with token:", token);

      const { data } = await authApi.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ fetchUserProfile response:", data);
      storage.setItem("user", data);
      return { token, user: data };
    } catch (error) {
      console.error("❌ fetchUserProfile error:", error?.response || error);
      storage.removeItem("authToken");
      storage.removeItem("user");
      return rejectWithValue("Session expired. Please log in.");
    }
  }
);


export const updateUserProfile = createAsyncThunk(
  "users/updateProfile", // <-- unique name
  async (updatedUserData, { rejectWithValue }) => {
    try {
      const { data } = await authApi.put("/users/profile", updatedUserData);
      console.log("")
      storage.setItem("user", data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Update failed");
    }
  }
);




// ===== Initial State =====
const initialState = {
  isAuthenticated: !!storage.getItem("authToken"),
  token: storage.getItem("authToken") || null,
  user: storage.getItem("user") || null,
  loading: false,
  error: null,
};

// ===== Slice =====
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      storage.removeItem("authToken");
      storage.removeItem("user");
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      // Login
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, handleRejected)

      // Signup
      .addCase(signupUser.pending, handlePending)
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, handleRejected)

      // Fetch Profile
     .addCase(fetchUserProfile.pending, (state) => {
  console.log("⏳ fetchUserProfile pending");
  state.loading = true;
  state.error = null;
})
.addCase(fetchUserProfile.fulfilled, (state, action) => {
  console.log("✅ fetchUserProfile fulfilled:", action.payload);
  state.loading = false;
  state.isAuthenticated = true;
  state.token = action.payload.token;
  state.user = action.payload.user;
})
.addCase(fetchUserProfile.rejected, (state, action) => {
  console.log("❌ fetchUserProfile rejected:", action.payload);
  state.loading = false;
  state.error = action.payload;
})
      // Update Profile
      .addCase(updateUserProfile.pending, handlePending)
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, handleRejected);
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
