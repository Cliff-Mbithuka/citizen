import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  if (!token) {
    console.log("🔴 No token found! Redirecting to login.");
    return <Navigate to="/login" />;
  }

  console.log("🟢 Access granted to role:", role);
  return children;
};

export default ProtectedRoute;
