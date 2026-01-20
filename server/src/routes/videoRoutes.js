const express = require('express');
const router = express.Router();
const {
  getAllVideos,
  getYouTubeChannel,
  getFeaturedVideos,
  getVideosByType,
  addVideo
} = require('../controllers/videoController');

// Public routes
router.get('/', getAllVideos);
router.get('/channel', getYouTubeChannel);
router.get('/featured', getFeaturedVideos);
router.get('/type/:type', getVideosByType);

// Protected routes
router.post('/:type', addVideo);

module.exports = router;