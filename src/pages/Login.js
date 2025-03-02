import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import InputField from "../components/InputField";
import "../pages/styles/login.css"; // Import new styles

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(formData); // Call login function

      // Store user role in localStorage
      localStorage.setItem("userRole", userData.role);

      // Redirect based on role
      if (userData.role === "admin") {
        navigate("/dashboard/admin"); // Redirect to Admin Dashboard
      } else {
        navigate("/dashboard/user"); // Redirect to User Dashboard
      }
    } catch (error) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <InputField label="Email" type="email" value={formData.email} onChange={handleChange} name="email" />
          <InputField label="Password" type="password" value={formData.password} onChange={handleChange} name="password" />
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
