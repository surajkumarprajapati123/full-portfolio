const express = require('express');
const router = express.Router();
const {
  getAllAchievements,
  getAchievementsByType,
  addAchievement
} = require('../controllers/achievementController');

// Public routes
router.get('/', getAllAchievements);
router.get('/type/:type', getAchievementsByType);

// Protected routes
router.post('/:type', addAchievement);

module.exports = router;