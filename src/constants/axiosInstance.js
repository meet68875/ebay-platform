// src/constants/axiosInstance.js

import axios from 'axios';
import storage from '../utils/helpers/localStorageHelper'; // updated usage

const axiosInstance = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle unauthorized access
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.removeItem('authToken');
      storage.removeItem('user');
      console.error("Unauthorized: Token might be invalid or expired.");
      // Optionally redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
