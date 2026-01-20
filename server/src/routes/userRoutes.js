const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUserProfile,
  getUserProfileById,
  updateUserProfile,
  changePassword,
  getAllUsers,
  deleteUser,
  deactivateAccount,
  getUserSkills,
  updateUserSkills,
  getUserExpertise
} = require('../controllers/userController');
const { protect, admin } = require('../middlewares/auth');


// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/skills', getUserSkills);
router.get('/expertise', getUserExpertise);
router.get('/:id', getUserProfileById);

// Protected routes
router.get('/profile', protect, getCurrentUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/change-password', protect, changePassword);
router.put('/skills', protect, updateUserSkills);
router.put('/deactivate', protect, deactivateAccount);

// Admin routes
router.get('/', protect, admin, getAllUsers);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;