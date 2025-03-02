import { useNavigate } from "react-router-dom";
import "./styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <span>CitizenConnect360</span>
      <div className="nav-right">
        <span>User</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
