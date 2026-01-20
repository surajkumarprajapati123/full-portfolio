const asyncHandler = require('express-async-handler');
const Language = require('../models/Language');
const User = require('../models/User');

// @desc    Get all languages for a user
// @route   GET /api/languages
// @access  Private
const getLanguages = asyncHandler(async (req, res) => {
  const languages = await Language.find({ userId: req.user._id }).sort({ level: -1 });
  
  res.json({
    success: true,
    count: languages.length,
    data: languages
  });
});

// @desc    Get single language
// @route   GET /api/languages/:id
// @access  Private
const getLanguage = asyncHandler(async (req, res) => {
  const language = await Language.findOne({
    _id: req.params.id,
    userId: req.user._id
  });
  
  if (!language) {
    res.status(404);
    throw new Error('Language not found');
  }
  
  res.json({
    success: true,
    data: language
  });
});

// @desc    Create language
// @route   POST /api/languages
// @access  Private
const createLanguage = asyncHandler(async (req, res) => {
  const { language, proficiency, level, icon } = req.body;
  
  const lang = await Language.create({
    userId: req.user._id,
    language,
    proficiency,
    level,
    icon
  });
  
  // Update user's profile completion
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { profileCompletion: 5 }
  });
  
  res.status(201).json({
    success: true,
    message: 'Language added successfully',
    data: lang
  });
});

// @desc    Update language
// @route   PUT /api/languages/:id
// @access  Private
const updateLanguage = asyncHandler(async (req, res) => {
  let language = await Language.findOne({
    _id: req.params.id,
    userId: req.user._id
  });
  
  if (!language) {
    res.status(404);
    throw new Error('Language not found');
  }
  
  language = await Language.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.json({
    success: true,
    message: 'Language updated successfully',
    data: language
  });
});

// @desc    Delete language
// @route   DELETE /api/languages/:id
// @access  Private
const deleteLanguage = asyncHandler(async (req, res) => {
  const language = await Language.findOne({
    _id: req.params.id,
    userId: req.user._id
  });
  
  if (!language) {
    res.status(404);
    throw new Error('Language not found');
  }
  
  await language.deleteOne();
  
  // Update user's profile completion
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { profileCompletion: -5 }
  });
  
  res.json({
    success: true,
    message: 'Language deleted successfully'
  });
});

module.exports = {
  getLanguages,
  getLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguage
};