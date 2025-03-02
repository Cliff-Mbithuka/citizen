import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/adminService";
import Sidebar from "../components/Sidebar";
import "./styles/manageUsers.css"; // CSS for styling

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        fetchUsers(); // Refresh user list
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isAdmin={true} />
      <div className="dashboard-content">
        <h2>Manage Users</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
window.getUsers = getUsers;

