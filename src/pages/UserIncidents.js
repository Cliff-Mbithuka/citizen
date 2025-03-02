import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "../styles/userIncidents.css";

const UserIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [newIncident, setNewIncident] = useState({ title: "", description: "", location: "" });

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await api.get("/incidents");
      setIncidents(response.data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  const handleChange = (e) => {
    setNewIncident({ ...newIncident, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/incidents", newIncident);
      fetchIncidents(); // Refresh incidents list
      setNewIncident({ title: "", description: "", location: "" }); // Clear form
    } catch (error) {
      console.error("Error reporting incident:", error);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isAdmin={false} />
      <div className="dashboard-content">
        <h2>Reported Incidents</h2>
        <form onSubmit={handleSubmit} className="incident-form">
          <input type="text" name="title" placeholder="Incident Title" value={newIncident.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Incident Description" value={newIncident.description} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={newIncident.location} onChange={handleChange} required />
          <button type="submit">Report Incident</button>
        </form>
        <table className="incidents-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident.id}>
                <td>{incident.title}</td>
                <td>{incident.description}</td>
                <td>{incident.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserIncidents;
