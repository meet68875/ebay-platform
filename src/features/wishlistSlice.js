import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const loadWishlistFromLocalStorage = (userId) => {
  if (userId) {
    try {
      const serializedState = localStorage.getItem(`wishlist-${userId}`);
      if (serializedState === null) {
        return [];
      }
      return JSON.parse(serializedState);
    } catch (error) {
      console.error("Could not load wishlist from local storage", error);
      return [];
    }
  }
  return [];
};

const saveWishlistToLocalStorage = (userId, items) => {
  if (userId) {
    try {
      const serializedState = JSON.stringify(items);
      localStorage.setItem(`wishlist-${userId}`, serializedState);
    } catch (error) {
      console.error("Could not save wishlist to local storage", error);
    }
  }
};

const initialState = {
  items: [],
  totalQuantity: 0,
};

const updateTotalQuantity = (state) => {
  state.totalQuantity = state.items.length;
};  

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    loadUserWishlist: (state, action) => {
      const userId = action.payload;
      state.items = loadWishlistFromLocalStorage(userId);
      updateTotalQuantity(state);
    },
    addToWishlist: (state, action) => {
      const { product, userId } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (!existingItem) {
        state.items.push(product);
        saveWishlistToLocalStorage(userId, state.items);
        toast.success(`${product.title} added to your wishlist!`);
      } else {
        toast.error(`${product.title} is already in your wishlist.`);
      }
      updateTotalQuantity(state);
    },
    removeFromWishlist: (state, action) => {
      const { productId, userId } = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      saveWishlistToLocalStorage(userId, state.items);
      toast.success("Item removed from wishlist.");
      updateTotalQuantity(state);
    },
    clearWishlist: (state) => {
      state.items = [];
      updateTotalQuantity(state);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  loadUserWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
