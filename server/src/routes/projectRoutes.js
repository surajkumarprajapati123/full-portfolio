const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByCategory
} = require('../controllers/projectController');
const { protect } = require('../middlewares/auth');

// Public routes
router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', getProjectById);
router.get('/category/:category', getProjectsByCategory);

// Protected routes
router.post('/', protect,createProject);
router.put('/:id', protect,updateProject);
router.delete('/:id', protect,deleteProject);

module.exports = router;