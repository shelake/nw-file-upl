// src/axios.js
import axios from 'axios';

// Create an Axios instance with custom configuration
const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Your API base URL
  timeout: 5000, // Increased timeout to 5 seconds
  headers: {'Content-Type': 'application/json'} // Optional headers
});

// Add a request interceptor to log request details
instance.interceptors.request.use(
  config => {
    console.log('Making request to:', config.url);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to log response details
instance.interceptors.response.use(
  response => {
    console.log('Response received:', response);
    return response;
  },
  error => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default instance;
