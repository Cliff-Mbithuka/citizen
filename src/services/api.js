import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2498/api", // Adjust based on your backend
});

// Automatically add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
