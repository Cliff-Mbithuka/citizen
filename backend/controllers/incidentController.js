const { Incident, User } = require("../models"); // ✅ Import directly from the models index
console.log("Incident model:", Incident);
console.log("User model:", User);

exports.createIncident = async (req, res) => {
  const { title, description, location } = req.body;
  console.log('Authenticated user:', req.user); // Add this line to debug
  try {
    const incidentData = {
      title,
      description,
      location,
      userId: req.user.userId, // Ensure userId is set from the authenticated user
    };
    console.log('Incident data:', incidentData); // Add this line to debug
    const incident = await Incident.create(incidentData);
    res.status(201).json({ message: 'Incident created successfully', incident });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.findAll({ include: { model: User, as: 'reportingUser' } });
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getIncidentById = async (req, res) => {
  const { id } = req.params;
  try {
    const incident = await Incident.findByPk(id, { include: { model: User, as: 'reportingUser' } });
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.json(incident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateIncident = async (req, res) => {
  const { id } = req.params;
  const { title, description, location } = req.body;
  try {
    const incident = await Incident.findByPk(id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    incident.title = title;
    incident.description = description;
    incident.location = location;
    await incident.save();
    res.json({ message: 'Incident updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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