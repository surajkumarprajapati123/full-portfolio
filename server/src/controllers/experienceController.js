const asyncHandler = require('express-async-handler');
const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
const getAllExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find()
    .populate('userId', 'name title')
    .sort({ startDate: -1 });
  
  res.json({
    success: true,
    count: experiences.length,
    data: experiences
  });
});

// @desc    Get current experience
// @route   GET /api/experience/current
// @access  Public
const getCurrentExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findOne({ current: true })
    .populate('userId', 'name title');
  
  res.json({
    success: true,
    data: experience
  });
});

// @desc    Create experience
// @route   POST /api/experience
// @access  Private
const createExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.create({
    ...req.body,
    userId: req.user._id || 'default-user-id'
  });
  
  res.status(201).json({
    success: true,
    message: 'Experience created successfully',
    data: experience
  });
});

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private
const updateExperience = asyncHandler(async (req, res) => {
  let experience = await Experience.findById(req.params.id);
  
  if (!experience) {
    res.status(404);
    throw new Error('Experience not found');
  }
  
  experience = await Experience.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  
  res.json({
    success: true,
    message: 'Experience updated successfully',
    data: experience
  });
});

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private
const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  
  if (!experience) {
    res.status(404);
    throw new Error('Experience not found');
  }
  
  await experience.deleteOne();
  
  res.json({
    success: true,
    message: 'Experience deleted successfully'
  });
});

module.exports = {
  getAllExperiences,
  getCurrentExperience,
  createExperience,
  updateExperience,
  deleteExperience
};