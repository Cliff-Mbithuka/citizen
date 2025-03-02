const { User } = require("../models"); // ✅ Correct import // ✅ Ensure correct model file
const Incident = require('../models/incident');
const Poll = require('../models/pollModel');


// Example admin action: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"], // ✅ Select necessary fields
    });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err); // ✅ Debugging log
    res.status(500).json({ error: err.message });
  }
};


// Example admin action: Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" }); // ✅ Return response
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
};


// Example admin action: Get all incidents
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.findAll();
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Example admin action: Delete an incident by ID
exports.deleteIncident = async (req, res) => {
  const { id } = req.params;
  try {
    const incident = await Incident.findByPk(id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    await incident.destroy();
    res.json({ message: 'Incident deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Example admin action: Get all polls
exports.getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.findAll();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Example admin action: Delete a poll by ID
exports.deletePoll = async (req, res) => {
  const { id } = req.params;
  try {
    const poll = await Poll.findByPk(id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    await poll.destroy();
    res.json({ message: 'Poll deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};