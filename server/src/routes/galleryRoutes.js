const express = require('express');
const router = express.Router();
const {
  getAllGalleryPhotos,
  getFeaturedPhotos,
  getPhotosByCategory,
  addProfilePhoto,
  deletePhoto,
  updatePhoto
} = require('../controllers/galleryController');

// Public routes
router.get('/', getAllGalleryPhotos);
router.get('/featured', getFeaturedPhotos);
router.get('/category/:category', getPhotosByCategory);

// Protected routes
router.post('/profile-photos', addProfilePhoto);
router.delete('/:type/:photoId', deletePhoto);
router.put('/:type/:photoId', updatePhoto);

module.exports = router;