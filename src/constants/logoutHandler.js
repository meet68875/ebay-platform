// src/constants/logoutHandler.js
import storage from "../utils/helpers/localStorageHelper";

// Importing store inside logoutHandler, NOT in axiosInstance
import { logout } from "../features/authSlice";

const logoutHandler = () => {
  console.log("Logging out user due to token expiration...");
  storage.removeItem("authToken");
  storage.removeItem("user");
  store.dispatch(logout());
};

export default logoutHandler;
