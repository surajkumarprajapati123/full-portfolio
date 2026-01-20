const asyncHandler = require('express-async-handler');
const Gallery = require('../models/Gallery');

// @desc    Get all gallery photos
// @route   GET /api/gallery
// @access  Public
const getAllGalleryPhotos = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findOne().populate('userId', 'name avatar');
  
  if (!gallery) {
    res.status(404);
    throw new Error('Gallery not found');
  }
  
  res.json({
    success: true,
    data: gallery
  });
});

// @desc    Get featured photos
// @route   GET /api/gallery/featured
// @access  Public
const getFeaturedPhotos = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findOne();
  
  if (!gallery) {
    res.status(404);
    throw new Error('Gallery not found');
  }
  
  const featuredPhotos = {
    profile: gallery.profilePhotos.filter(photo => photo.featured),
    project: gallery.projectPhotos.filter(photo => photo.featured),
    event: gallery.eventPhotos.filter(photo => photo.featured)
  };
  
  res.json({
    success: true,
    data: featuredPhotos
  });
});

// @desc    Get photos by category
// @route   GET /api/gallery/category/:category
// @access  Public
const getPhotosByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const gallery = await Gallery.findOne();
  
  if (!gallery) {
    res.status(404);
    throw new Error('Gallery not found');
  }
  
  let photos = [];
  
  switch (category) {
    case 'profile':
      photos = gallery.profilePhotos;
      break;
    case 'project':
      photos = gallery.projectPhotos;
      break;
    case 'event':
      photos = gallery.eventPhotos;
      break;
    default:
      photos = [];
  }
  
  res.json({
    success: true,
    data: photos
  });
});

// @desc    Add profile photo
// @route   POST /api/gallery/profile-photos
// @access  Private
const addProfilePhoto = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findOne();
  
  if (!gallery) {
    res.status(404);
    throw new Error('Gallery not found');
  }
  
  const newPhoto = {
    ...req.body,
    date: req.body.date || new Date()
  };
  
  gallery.profilePhotos.push(newPhoto);
  await gallery.save();
  
  res.status(201).json({
    success: true,
    message: 'Profile photo added successfully',
    data: gallery.profilePhotos[gallery.profilePhotos.length - 1]
  });
});

// @desc    Delete photo
// @route   DELETE /api/gallery/:type/:photoId
// @access  Private
const deletePhoto = asyncHandler(async (req, res) => {
  const { type, photoId } = req.params;
  const gallery = await Gallery.findOne();
  
  if (!gallery) {
    res.status(404);
    throw new Error('Gallery not found');
  }
  
  let photos;
  switch (type) {
    case 'profile':
      photos = gallery.profilePhotos;
      break;
    case 'project':
      photos = gallery.projectPhotos;
      break;
    case 'event':
      photos = gallery.eventPhotos;
      break;
    default:
      res.status(400);
      throw new Error('Invalid photo type');
  }
  
  const photoIndex = photos.findIndex(photo => photo._id.toString() === photoId);
  
  if (photoIndex === -1) {
    res.status(404);
    throw new Error('Photo not found');
  }
  
  photos.splice(photoIndex, 1);
  await gallery.save();
  
  res.json({
    success: true,
    message: 'Photo deleted successfully'
  });
});

// @desc    Update photo
// @route   PUT /api/gallery/:type/:photoId
// @access  Private
const updatePhoto = asyncHandler(async (req, res) => {
  const { type, photoId } = req.params;
  const gallery = await Gallery.findOne();
  
  if (!gallery) {
    res.status(404);
    throw new Error('Gallery not found');
  }
  
  let photos;
  switch (type) {
    case 'profile':
      photos = gallery.profilePhotos;
      break;
    case 'project':
      photos = gallery.projectPhotos;
      break;
    case 'event':
      photos = gallery.eventPhotos;
      break;
    default:
      res.status(400);
      throw new Error('Invalid photo type');
  }
  
  const photoIndex = photos.findIndex(photo => photo._id.toString() === photoId);
  
  if (photoIndex === -1) {
    res.status(404);
    throw new Error('Photo not found');
  }
  
  Object.assign(photos[photoIndex], req.body);
  await gallery.save();
  
  res.json({
    success: true,
    message: 'Photo updated successfully',
    data: photos[photoIndex]
  });
});

module.exports = {
  getAllGalleryPhotos,
  getFeaturedPhotos,
  getPhotosByCategory,
  addProfilePhoto,
  deletePhoto,
  updatePhoto
};