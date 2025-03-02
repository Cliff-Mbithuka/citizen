import api from "./api";

// Get all users
export const getUsers = async () => {
  try {
    const response = await api.get("/admin/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      alert("Unauthorized! Please log in again.");
    }
    throw error.response?.data || "Failed to fetch users";
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    await api.delete(`/admin/users/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error.response?.data || error.message);
    throw error.response?.data || "Failed to delete user";
  }
};
