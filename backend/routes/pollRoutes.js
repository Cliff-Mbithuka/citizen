const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');
const { authenticateToken, checkRole } = require('../middlewares/authMiddleware');

router.post('/create', authenticateToken, checkRole('admin'), pollController.createPoll);
router.get('/list', authenticateToken, pollController.getPolls);
router.get('/view/:id', authenticateToken, pollController.getPollById);
router.put('/update/:id', authenticateToken, checkRole('admin'), pollController.updatePoll);
router.delete('/delete/:id', authenticateToken, checkRole('admin'), pollController.deletePoll);
router.post('/vote/:id', authenticateToken, pollController.votePoll);

module.exports = router;