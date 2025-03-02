import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { register } from "../services/authService";
import "./styles/register.css"; // Import CSS file

const Register = () => {
  const navigate = useNavigate(); // Initialize navigation

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default to user
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  console.log("Registering User:", userData); 
    try {
      await register(userData);
      alert("Registration successful! Redirecting to login...");
      navigate("/"); // Redirect to login after success
    } catch (error) {
      alert("Registration failed: " + error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

          {/* Role Selection */}
          <div className="role-select">
            <label>Register as:</label>
            <select name="role" onChange={handleChange} className="styled-select">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
