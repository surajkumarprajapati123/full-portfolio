const express = require('express');
const router = express.Router();
const {
  getAllActivities,
  getActivitiesByType,
  addActivity
} = require('../controllers/extracurricularController');

// Public routes
router.get('/', getAllActivities);
router.get('/type/:type', getActivitiesByType);

// Protected routes
router.post('/:type', addActivity);

module.exports = router;