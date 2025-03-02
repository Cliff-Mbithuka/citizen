const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');
const { authenticateToken, checkRole } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, checkRole('user'), incidentController.createIncident);
router.get('/', authenticateToken, incidentController.getIncidents);
router.get('/:id', authenticateToken, incidentController.getIncidentById);
router.put('/:id', authenticateToken, checkRole('user'), incidentController.updateIncident);
router.delete('/:id', authenticateToken, checkRole('user'), incidentController.deleteIncident);

module.exports = router;