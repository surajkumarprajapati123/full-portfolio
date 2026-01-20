const asyncHandler = require('express-async-handler');
const Education = require('../models/Education');
const User = require('../models/User');

// @desc    Get all education for a user
// @route   GET /api/education
// @access  Private
const getEducation = asyncHandler(async (req, res) => {
  const education = await Education.find({ 
    userId: req.user._id,
    isVisible: true 
  }).sort({ endDate: -1, startDate: -1 });
  
  res.json({
    success: true,
    count: education.length,
    data: education
  });
});

// @desc    Get single education
// @route   GET /api/education/:id
// @access  Private
const getEducationById = asyncHandler(async (req, res) => {
  const education = await Education.findOne({
    _id: req.params.id,
    userId: req.user._id
  });
  
  if (!education) {
    res.status(404);
    throw new Error('Education record not found');
  }
  
  res.json({
    success: true,
    data: education
  });
});

// @desc    Create education
// @route   POST /api/education
// @access  Private
const createEducation = asyncHandler(async (req, res) => {
  const education = await Education.create({
    userId: req.user._id,
    ...req.body
  });
  
  // Update user's profile completion
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { profileCompletion: 10 }
  });
  
  res.status(201).json({
    success: true,
    message: 'Education added successfully',
    data: education
  });
});

// @desc    Update education
// @route   PUT /api/education/:id
// @access  Private
const updateEducation = asyncHandler(async (req, res) => {
  let education = await Education.findOne({
    _id: req.params.id,
    userId: req.user._id
  });
  
  if (!education) {
    res.status(404);
    throw new Error('Education record not found');
  }
  
  education = await Education.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.json({
    success: true,
    message: 'Education updated successfully',
    data: education
  });
});

// @desc    Delete education
// @route   DELETE /api/education/:id
// @access  Private
const deleteEducation = asyncHandler(async (req, res) => {
  const education = await Education.findOne({
    _id: req.params.id,
    userId: req.user._id
  });
  
  if (!education) {
    res.status(404);
    throw new Error('Education record not found');
  }
  
  await education.deleteOne();
  
  // Update user's profile completion
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { profileCompletion: -10 }
  });
  
  res.json({
    success: true,
    message: 'Education deleted successfully'
  });
});

module.exports = {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation
};