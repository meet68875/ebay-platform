// src/utils/localStorageHelper.js

const setItem = (key, value) => {
  try {
    const isObject = typeof value === 'object';
    const item = isObject ? JSON.stringify(value) : value;
    localStorage.setItem(key, item);
  } catch (error) {
    console.error(`Error setting ${key} in localStorage`, error);
  }
};

const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    // Try parsing only if it looks like JSON
    if (item && (item.startsWith('{') || item.startsWith('['))) {
      return JSON.parse(item);
    }
    return item;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage`, error);
    return null;
  }
};

const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage`, error);
  }
};

const clearUserData = (userId) => {
  removeItem("authToken");
  removeItem("user");
  removeItem(`cartItems-${userId}`);
  removeItem(`wishlist-${userId}`);
  removeItem(`orders-${userId}`);
};


const LOCAL_STORAGE_KEY = 'orders';

export const saveOrdersToLocalStorage = (orders) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving orders:', error);
    throw new Error('Failed to save orders');
  }
};

export const getOrdersFromLocalStorage = () => {
  try {
    const orders = localStorage.getItem(LOCAL_STORAGE_KEY);
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('Error loading orders:', error);
    return [];
  }
};

export const clearOrdersFromLocalStorage = () => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing orders:', error);
  }
};
// utils/localStorageHelper.js

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save to localStorage:", err);
  }
};

export const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Failed to load from localStorage:", err);
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Failed to remove from localStorage:", err);
  }
};

export default {
  setItem,
  getItem,
  removeItem,
  clearUserData,
};
