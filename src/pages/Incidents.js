import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/incident.css";

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    api.get("/incidents")
      .then((res) => setIncidents(res.data))
      .catch((err) => console.error("Error fetching incidents:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newIncident = { title, description, location };
      const res = await api.post("/incidents", newIncident);
      setIncidents([...incidents, res.data.incident]);
      setTitle(""); setDescription(""); setLocation("");
    } catch (err) {
      console.error("Error reporting incident:", err);
    }
  };

  const deleteIncident = async (id) => {
    if (userRole === "admin" && window.confirm("Delete this incident?")) {
      try {
        await api.delete(`/incidents/${id}`);
        setIncidents(incidents.filter(incident => incident.id !== id));
      } catch (err) {
        console.error("Error deleting incident:", err);
      }
    }
  };

  return (
    <div className="page-container">
      <h2>Incidents</h2>

      {userRole === "user" && (
        <form onSubmit={handleSubmit} className="incident-form">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          <button type="submit">Report Incident</button>
        </form>
      )}

      <table className="incident-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            {userRole === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {incidents.map(incident => (
            <tr key={incident.id}>
              <td>{incident.title}</td>
              <td>{incident.description}</td>
              <td>{incident.location}</td>
              {userRole === "admin" && (
                <td>
                  <button className="delete-btn" onClick={() => deleteIncident(incident.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Incidents;
