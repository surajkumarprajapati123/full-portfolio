const asyncHandler = require('express-async-handler');
const Skill = require('../models/Skill');
const User = require('../models/User');

// @desc    Get all skills for a user
// @route   GET /api/skills
// @access  Private
const getSkills = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const query = { userId: req.user._id };
  
  if (category) {
    query.category = category;
  }
  
  const skills = await Skill.find(query).sort({ order: 1, level: -1 });
  
  res.json({
    success: true,
    count: skills.length,
    data: skills
  });
});

// @desc    Get skill by ID
// @route   GET /api/skills/:id
// @access  Private
const getSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findOne({
    _id: req.params.id,
    userId: req.user._id
  });
  
  if (!skill) {
    res.status(404);
    throw new Error('Skill not found');
  }
  
  res.json({
    success: true,
    data: skill
  });
});

// @desc    Create skill
// @route   POST /api/skills
// @access  Private
const createSkill = asyncHandler(async (req, res) => {
console.log("UserId is ",req.user)

  const skill = await Skill.create({
    userId: req.user._id,
    ...req.body
  });
  
  // Update user's profile completion
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { profileCompletion: 5 }
  });
  
  res.status(201).json({
    success: true,
    message: 'Skill added successfully',
    data: skill
  });
});

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = asyncHandler(async (req, res) => {
  let skill = await Skill.findOne({
    _id: req.params.id,
    userId: req.user._id
  });
  
  if (!skill) {
    res.status(404);
    throw new Error('Skill not found');
  }
  
  skill = await Skill.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.json({
    success: true,
    message: 'Skill updated successfully',
    data: skill
  });
});

// @desc    Update skills order
// @route   PUT /api/skills/update-order
// @access  Private
const updateSkillsOrder = asyncHandler(async (req, res) => {
  const { skills } = req.body;
  
  if (!Array.isArray(skills)) {
    res.status(400);
    throw new Error('Skills array is required');
  }
  
  const bulkOps = skills.map(skill => ({
    updateOne: {
      filter: { _id: skill._id, userId: req.user._id },
      update: { order: skill.order }
    }
  }));
  
  await Skill.bulkWrite(bulkOps);
  
  res.json({
    success: true,
    message: 'Skills order updated successfully'
  });
});

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findOne({
    _id: req.params.id,
    userId: req.user._id
  });
  
  if (!skill) {
    res.status(404);
    throw new Error('Skill not found');
  }
  
  await skill.deleteOne();
  
  // Update user's profile completion
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { profileCompletion: -5 }
  });
  
  res.json({
    success: true,
    message: 'Skill deleted successfully'
  });
});

module.exports = {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  updateSkillsOrder,
  deleteSkill
};