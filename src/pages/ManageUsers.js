import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/manageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    api.get("/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Delete User
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/admin/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <div className="page-container">
      <h2>Manage Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
