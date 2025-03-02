import { useEffect, useState } from "react";
import { getIncidents, createIncident, deleteIncident } from "../services/incidentService";
import Sidebar from "../components/Sidebar";
import "./styles/incidents.css";

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [newIncident, setNewIncident] = useState({ title: "", description: "", location: "" });
  const userRole = localStorage.getItem("userRole"); // Get user role
  const userId = localStorage.getItem("userId"); // Get user ID

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const data = await getIncidents();
      setIncidents(data);
    } catch (error) {
      console.error("Error loading incidents:", error);
    }
  };

  const handleChange = (e) => {
    setNewIncident({ ...newIncident, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createIncident(newIncident);
      fetchIncidents(); // Refresh incidents list
      setNewIncident({ title: "", description: "", location: "" });
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (incidentId) => {
    if (!window.confirm("Are you sure you want to delete this incident?")) return;
    try {
      await deleteIncident(incidentId);
      fetchIncidents(); // Refresh the list after deletion
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isAdmin={userRole === "admin"} />
      <div className="dashboard-content">
        <h2>Reported Incidents</h2>
        <ul className="incident-list">
          {incidents.map((incident) => (
            <li key={incident.id} className="incident-item">
              <h3>{incident.title}</h3>
              <p>{incident.description}</p>
              <span>{incident.location}</span>
              
              {/* Show delete button only if user is the owner or an admin */}
              {(userRole === "admin" || incident.userId === userId) && (
                <button onClick={() => handleDelete(incident.id)} className="delete-btn">
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>

        <h3>Report New Incident</h3>
        <form onSubmit={handleSubmit} className="incident-form">
          <input type="text" name="title" placeholder="Title" onChange={handleChange} value={newIncident.title} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} value={newIncident.description} required />
          <input type="text" name="location" placeholder="Location" onChange={handleChange} value={newIncident.location} required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Incidents;
