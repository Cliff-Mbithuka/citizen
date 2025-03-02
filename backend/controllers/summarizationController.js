// const { summarizeText } = require('../utils/openaiService');
// const Incident = require('../models/incidentModel');

// exports.summarizeViews = async (req, res) => {
//   try {
//     const incidents = await Incident.findAll();
//     const views = incidents.map(incident => incident.description).join('\n\n');
//     const summary = await summarizeText(views);
//     res.json({ summary });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };