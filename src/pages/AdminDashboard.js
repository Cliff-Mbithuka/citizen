import Sidebar from "../components/Sidebar";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
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
