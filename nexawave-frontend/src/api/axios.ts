import axios from 'axios';

// Environment variable se URL uthayega (ya default localhost lega)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ye interceptor har request me automatically JWT token daal dega
apiClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('nexawave_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);