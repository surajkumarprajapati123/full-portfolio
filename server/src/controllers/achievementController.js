const asyncHandler = require('express-async-handler');
const Achievement = require('../models/Achievement');

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
const getAllAchievements = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findOne().populate('userId', 'name');
  
  if (!achievement) {
    res.status(404);
    throw new Error('Achievements not found');
  }
  
  res.json({
    success: true,
    data: achievement
  });
});

// @desc    Get achievements by type
// @route   GET /api/achievements/type/:type
// @access  Public
const getAchievementsByType = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const achievement = await Achievement.findOne().populate('userId', 'name');
  
  if (!achievement) {
    res.status(404);
    throw new Error('Achievements not found');
  }
  
  let data;
  switch (type) {
    case 'awards':
      data = achievement.awards;
      break;
    case 'certifications':
      data = achievement.certifications;
      break;
    case 'milestones':
      data = achievement.milestones;
      break;
    default:
      res.status(400);
      throw new Error('Invalid achievement type');
  }
  
  res.json({
    success: true,
    data: data
  });
});

// @desc    Add achievement
// @route   POST /api/achievements/:type
// @access  Private
const addAchievement = asyncHandler(async (req, res) => {
  const { type } = req.params;
  let achievement = await Achievement.findOne();
  
  if (!achievement) {
    // Create new achievement document if none exists
    achievement = await Achievement.create({
      userId: req.user._id || 'default-user-id'
    });
  }
  
  const newAchievement = {
    ...req.body,
    date: req.body.date || new Date()
  };
  
  switch (type) {
    case 'awards':
      achievement.awards.push(newAchievement);
      break;
    case 'certifications':
      achievement.certifications.push(newAchievement);
      break;
    case 'milestones':
      achievement.milestones.push(newAchievement);
      break;
    default:
      res.status(400);
      throw new Error('Invalid achievement type');
  }
  
  await achievement.save();
  
  res.status(201).json({
    success: true,
    message: 'Achievement added successfully'
  });
});

module.exports = {
  getAllAchievements,
  getAchievementsByType,
  addAchievement
};