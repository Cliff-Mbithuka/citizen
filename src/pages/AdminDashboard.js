import Sidebar from "../components/Sidebar";
import "../styles/adminDashboard.css";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    console.log("Admin Dashboard Loaded. Role:", role);
    if (role !== "admin") {
      setError("Access Denied: You are not an admin.");
    }
  }, []);

  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div className="dashboard-layout">
      <Sidebar isAdmin={true} />
      <div className="dashboard-content">
        <h2>Admin Dashboard</h2>
        <p>Manage users, view incidents, and oversee polls.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
