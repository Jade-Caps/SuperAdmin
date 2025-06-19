// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // ✅ FIXED here
    const user = JSON.parse(localStorage.getItem('user'));

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (user?.dbName || user?.data?.dbName) {
      config.headers['x-tenant-db'] = user.dbName || user.data.dbName; // optional fallback
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
