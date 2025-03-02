import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:2498/api";
console.log("API URL:", API_URL); // Debugging

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
