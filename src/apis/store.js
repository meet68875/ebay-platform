import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../features/productSlice"
import authReducer from "../features/authSlice"
import cartReducer from "../features/cartSlice"
import orderReducer from "../features/orderSlice"
import wishlistReducer from "../features/wishlistSlice"
export const store = configureStore({
  reducer: {
  products: productReducer,
  auth: authReducer,
   cart: cartReducer,
   order: orderReducer,
   wishlist: wishlistReducer,
  },
});
