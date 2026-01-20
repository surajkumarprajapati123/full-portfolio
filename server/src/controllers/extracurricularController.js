const asyncHandler = require('express-async-handler');
const Extracurricular = require('../models/Extracurricular');

// @desc    Get all extracurricular activities
// @route   GET /api/extracurricular
// @access  Public
const getAllActivities = asyncHandler(async (req, res) => {
  const extracurricular = await Extracurricular.findOne().populate('userId', 'name');
  
  if (!extracurricular) {
    res.status(404);
    throw new Error('Extracurricular activities not found');
  }
  
  res.json({
    success: true,
    data: extracurricular
  });
});

// @desc    Get activities by type
// @route   GET /api/extracurricular/type/:type
// @access  Public
const getActivitiesByType = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const extracurricular = await Extracurricular.findOne().populate('userId', 'name');
  
  if (!extracurricular) {
    res.status(404);
    throw new Error('Extracurricular activities not found');
  }
  
  let data;
  switch (type) {
    case 'open-source':
      data = extracurricular.openSource;
      break;
    case 'community':
      data = extracurricular.community;
      break;
    case 'hackathons':
      data = extracurricular.hackathons;
      break;
    case 'speaking':
      data = extracurricular.speaking;
      break;
    case 'publications':
      data = extracurricular.publications;
      break;
    default:
      res.status(400);
      throw new Error('Invalid activity type');
  }
  
  res.json({
    success: true,
    data: data
  });
});

// @desc    Add activity
// @route   POST /api/extracurricular/:type
// @access  Private
const addActivity = asyncHandler(async (req, res) => {
  const { type } = req.params;
  let extracurricular = await Extracurricular.findOne();
  
  if (!extracurricular) {
    extracurricular = await Extracurricular.create({
      userId: req.user._id || 'default-user-id'
    });
  }
  
  const newActivity = {
    ...req.body,
    date: req.body.date || new Date()
  };
  
  switch (type) {
    case 'open-source':
      extracurricular.openSource.push(newActivity);
      break;
    case 'community':
      extracurricular.community.push(newActivity);
      break;
    case 'hackathons':
      extracurricular.hackathons.push(newActivity);
      break;
    case 'speaking':
      extracurricular.speaking.push(newActivity);
      break;
    case 'publications':
      extracurricular.publications.push(newActivity);
      break;
    default:
      res.status(400);
      throw new Error('Invalid activity type');
  }
  
  await extracurricular.save();
  
  res.status(201).json({
    success: true,
    message: 'Activity added successfully'
  });
});

module.exports = {
  getAllActivities,
  getActivitiesByType,
  addActivity
};