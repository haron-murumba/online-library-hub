import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',  // Your Django API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default API;