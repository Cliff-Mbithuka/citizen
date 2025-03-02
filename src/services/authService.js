import api from "./api"; // Import axios instance

// Register User
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error.response?.data || "Registration failed";
  }
};

// Login User
export const login = async (credentials) => {
  try {
    console.log("Sending Login Data:", credentials); // Debugging
    const response = await api.post("/auth/login", credentials);
    localStorage.setItem("userToken", response.data.token);
    localStorage.setItem("userRole", response.data.role); // Store token
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error.response?.data || "Login failed";
  }
};

// Logout User
export const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userRole");
};

// Get Logged-in User Profile
export const getProfile = async () => {
  try {
    const response = await api.get("/user/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch profile";
  }
};

// Update User Profile
export const updateProfile = async (updatedData) => {
  try {
    const response = await api.put("/user/profile", updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update profile";
  }
};
