const User = require('../models/User');
const Incident = require('../models/incidentModel');
const Poll = require('../models/pollModel');
const PollOption = require('../models/pollOptionModel');
const PollVote = require('../models/pollVoteModel');

// Example admin action: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Example admin action: Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
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