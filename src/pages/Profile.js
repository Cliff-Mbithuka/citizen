import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/authService";
import InputField from "../components/InputField";
import "../pages/styles/profile.css"; // Import new styles

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");

  useEffect(() => {
    getProfile()
      .then(setUser)
      .catch((error) => console.error(error));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ ...user, password });
      alert("Profile updated successfully!");
      setPassword(""); // Clear password field after update
    } catch (error) {
      alert("Error updating profile.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Profile</h2>
        <form onSubmit={handleUpdate}>
          <InputField label="Full Name" type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} name="name" />
          <InputField label="Email" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} name="email" />
          <InputField label="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
          <button type="submit" className="profile-btn">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
