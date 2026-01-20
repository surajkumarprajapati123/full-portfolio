const express = require('express');
const router = express.Router();
const {
  getAllExperiences,
  getCurrentExperience,
  createExperience,
  updateExperience,
  deleteExperience
} = require('../controllers/experienceController');

// Public routes
router.get('/', getAllExperiences);
router.get('/current', getCurrentExperience);

// Protected routes
router.post('/', createExperience);
router.put('/:id', updateExperience);
router.delete('/:id', deleteExperience);

module.exports = router;