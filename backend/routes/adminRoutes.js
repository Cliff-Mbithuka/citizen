const express = require('express');
const { authenticateToken, checkRole } = require('../middlewares/authMiddleware');
const {
  getAllUsers,
  deleteUser,
  getAllIncidents,
  deleteIncident,
  getAllPolls,
  deletePoll
} = require('../controllers/adminController');

const router = express.Router();

router.get('/users', authenticateToken, checkRole('admin'), getAllUsers);
router.delete('/users/:id', authenticateToken, checkRole('admin'), deleteUser);

router.get('/incidents', authenticateToken, checkRole('admin'), getAllIncidents);
router.delete('/incidents/:id', authenticateToken, checkRole('admin'), deleteIncident);

router.get('/polls', authenticateToken, checkRole('admin'), getAllPolls);
router.delete('/polls/:id', authenticateToken, checkRole('admin'), deletePoll);

module.exports = router;