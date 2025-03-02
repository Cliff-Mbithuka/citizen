import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ManageUsers from "./pages/ManageUsers";
import Incidents from "./pages/Incidents";
import Polls from "./pages/Polls";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
  }, []); 
  

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Ensure proper redirection after login */}
      <Route
        path="/dashboard/admin"
        element={
          userRole === "admin" ? (
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          ) : (
            <Navigate to="/dashboard/user" />
          )
        }
      />
      <Route
        path="/dashboard/user"
        element={
          userRole === "user" ? (
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          ) : (
            <Navigate to="/dashboard/admin" />
          )
        }
      />

      {/* Admin-Only Route */}
      {userRole === "admin" && (
        <Route
        path="/dashboard/manage-users"
        element={
          userRole === "admin" ? (
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          ) : (
            <Navigate to="/dashboard/user" />
          )
        }
      />
      
      )}
      <Route
        path="/dashboard/incidents"
        element={
          <ProtectedRoute>
            <Incidents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/polls"
        element={
          <ProtectedRoute>
            <Polls />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
