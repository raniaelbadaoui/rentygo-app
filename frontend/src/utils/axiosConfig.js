// src/utils/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // ENLEVEZ /api ICI
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('🌐 Requête complète:', config.baseURL + config.url);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ Réponse de:', response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Erreur API:', error.config?.baseURL + error.config?.url);
    return Promise.reject(error);
  }
);

export default axiosInstance;