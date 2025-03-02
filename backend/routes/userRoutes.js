const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.delete('/profile', authenticateToken, deleteUserProfile);

module.exports = router;