import { Link, useNavigate } from "react-router-dom";
import "./styles/sidebar.css"; // ✅ Sidebar Styles

const Sidebar = ({ isAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>CitizenConnect360</h2>
      <ul>
        <li>
          <Link to={isAdmin ? "/dashboard/admin" : "/dashboard/user"}>
            {isAdmin ? "Admin Dashboard" : "User Dashboard"}
          </Link>
        </li>
        {isAdmin && <li><Link to="/dashboard/manage-users">Manage Users</Link></li>}
        <li><Link to="/dashboard/incidents">Incidents</Link></li>
        <li><Link to="/dashboard/polls">Polls</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
