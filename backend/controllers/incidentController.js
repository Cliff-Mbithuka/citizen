const { Incident, User } = require("../models"); // ✅ Import directly from the models index
console.log("Incident model:", Incident);
console.log("User model:", User);

exports.createIncident = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "user") {
    return res.status(403).json({ message: "Forbidden: Only users and admins can create incidents" });
  }
  

  const { title, description, location } = req.body;
  console.log('Authenticated user:', req.user);

  try {
    const incidentData = {
      title,
      description,
      location,
      userId: req.user.userId, 
    };
    console.log('Incident data:', incidentData);
    
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
      return res.status(404).json({ message: "Incident not found" });
    }

    // Only allow updating if user is an admin or the creator of the incident
    if (req.user.role !== "admin" && req.user.userId !== incident.userId) {
      return res.status(403).json({ message: "Forbidden: You are not authorized to update this incident" });
    }

    incident.title = title;
    incident.description = description;
    incident.location = location;
    await incident.save();
    
    res.json({ message: "Incident updated successfully", incident });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteIncident = async (req, res) => {
  const { id } = req.params;
  try {
    const incident = await Incident.findByPk(id);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    // Only allow deletion if user is an admin or the creator of the incident
    if (req.user.role !== "admin" && req.user.userId !== incident.userId) {
      return res.status(403).json({ message: "Forbidden: You are not authorized to delete this incident" });
    }

    await incident.destroy();
    res.json({ message: "Incident deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
