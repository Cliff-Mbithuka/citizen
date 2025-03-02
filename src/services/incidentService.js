import api from "./api"; // Import Axios instance

// Fetch all incidents
export const getIncidents = async () => {
  try {
    const response = await api.get("/incidents");
    return response.data;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    throw error.response?.data || "Failed to fetch incidents";
  }
};

// Create a new incident with Authentication


export const createIncident = async (incidentData) => {
  try {
    const response = await api.post("/incidents", incidentData); // No need to manually add token, handled by `api.js`
    return response.data;
  } catch (error) {
    console.error("Error creating incident:", error);
    throw error.response?.data || "Failed to create incident";
  }
};

// Delete an incident
export const deleteIncident = async (incidentId) => {
    try {
      const token = localStorage.getItem("userToken");
      await api.delete(`/incidents/${incidentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      throw error.response?.data || "Failed to delete incident";
    }
  };