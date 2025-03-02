import api from "./api"; // Reuse the existing Axios instance

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Fetch all incidents
export const fetchIncidents = async () => {
  try {
    const response = await api.get("/incidents");
    return response.data;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    throw error;
  }
};

// Delete an incident
export const deleteIncident = async (incidentId) => {
  try {
    const response = await api.delete(`/incidents/${incidentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting incident:", error);
    throw error;
  }
};

// Fetch all polls
export const fetchPolls = async () => {
  try {
    const response = await api.get("/polls");
    return response.data;
  } catch (error) {
    console.error("Error fetching polls:", error);
    throw error;
  }
};

// Delete a poll
export const deletePoll = async (pollId) => {
  try {
    const response = await api.delete(`/polls/${pollId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting poll:", error);
    throw error;
  }
};

