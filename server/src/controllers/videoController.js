const asyncHandler = require('express-async-handler');
const Video = require('../models/Video');

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
const getAllVideos = asyncHandler(async (req, res) => {
  const video = await Video.findOne().populate('userId', 'name');
  
  if (!video) {
    res.status(404);
    throw new Error('Videos not found');
  }
  
  res.json({
    success: true,
    data: video
  });
});

// @desc    Get YouTube channel info
// @route   GET /api/videos/channel
// @access  Public
const getYouTubeChannel = asyncHandler(async (req, res) => {
  const video = await Video.findOne().select('youtubeChannel');
  
  if (!video) {
    res.status(404);
    throw new Error('Videos not found');
  }
  
  res.json({
    success: true,
    data: video.youtubeChannel
  });
});

// @desc    Get featured videos
// @route   GET /api/videos/featured
// @access  Public
const getFeaturedVideos = asyncHandler(async (req, res) => {
  const video = await Video.findOne();
  
  if (!video) {
    res.status(404);
    throw new Error('Videos not found');
  }
  
  const featuredVideos = {
    projectDemos: video.projectDemos.filter(v => v.featured),
    techTalks: video.techTalks.filter(v => v.featured),
    tutorials: video.tutorials.filter(v => v.featured)
  };
  
  res.json({
    success: true,
    data: featuredVideos
  });
});

// @desc    Get videos by type
// @route   GET /api/videos/type/:type
// @access  Public
const getVideosByType = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const video = await Video.findOne();
  
  if (!video) {
    res.status(404);
    throw new Error('Videos not found');
  }
  
  let videos;
  switch (type) {
    case 'project-demos':
      videos = video.projectDemos;
      break;
    case 'tech-talks':
      videos = video.techTalks;
      break;
    case 'tutorials':
      videos = video.tutorials;
      break;
    default:
      res.status(400);
      throw new Error('Invalid video type');
  }
  
  res.json({
    success: true,
    data: videos
  });
});

// @desc    Add video
// @route   POST /api/videos/:type
// @access  Private
const addVideo = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const video = await Video.findOne();
  
  if (!video) {
    res.status(404);
    throw new Error('Videos not found');
  }
  
  const newVideo = {
    ...req.body,
    uploadDate: req.body.uploadDate || new Date()
  };
  
  switch (type) {
    case 'project-demos':
      video.projectDemos.push(newVideo);
      break;
    case 'tech-talks':
      video.techTalks.push(newVideo);
      break;
    case 'tutorials':
      video.tutorials.push(newVideo);
      break;
    default:
      res.status(400);
      throw new Error('Invalid video type');
  }
  
  await video.save();
  
  res.status(201).json({
    success: true,
    message: 'Video added successfully'
  });
});

module.exports = {
  getAllVideos,
  getYouTubeChannel,
  getFeaturedVideos,
  getVideosByType,
  addVideo
};