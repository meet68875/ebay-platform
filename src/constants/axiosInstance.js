// src/constants/axiosInstance.js
import axios from "axios";
import storage from "../utils/helpers/localStorageHelper";

const NODE_URL = import.meta.env.VITE_NODE_URL || "http://localhost:5000/api";
const PUBLIC_API_URL =
  import.meta.env.VITE_PUBLIC_API_URL || "https://api.escuelajs.co/api/v1";

// Default API instance (public API)
const axiosInstance = axios.create({
  baseURL: PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Auth API instance (Node backend)
export const authApi = axios.create({
  baseURL: NODE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token to both instances
const attachTokenInterceptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = storage.getItem("authToken");
      console.log("token", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        storage.removeItem("authToken");
        storage.removeItem("user");

        console.error("Unauthorized: Token invalid or expired.");
      }
      return Promise.reject(error);
    }
  );
};

attachTokenInterceptor(axiosInstance);
attachTokenInterceptor(authApi);

export default axiosInstance;
