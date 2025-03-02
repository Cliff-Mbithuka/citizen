import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import InputField from "../components/InputField";
import "../pages/styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Track login errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const userData = await login(formData); // Call login function

      if (!userData || !userData.role) {
        throw new Error("Invalid response from server.");
      }

      // ✅ Store user role and user ID in localStorage
      localStorage.setItem("userRole", userData.role);
      localStorage.setItem("userId", userData.userId);
      console.log("Navigating to:", userData.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
      // ✅ Redirect based on role
      navigate(userData.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
    } catch (error) {
      setError(error.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error */}
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
