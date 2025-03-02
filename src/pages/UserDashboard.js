import Sidebar from "../components/Sidebar";
import "../styles/userDashboard.css";

const UserDashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar isAdmin={false} />
      <div className="dashboard-content">
        <h2>User Dashboard</h2>
        <p>Welcome to your dashboard! Here you can view incidents and polls.</p>
      </div>
    </div>
  );
};

export default UserDashboard;
