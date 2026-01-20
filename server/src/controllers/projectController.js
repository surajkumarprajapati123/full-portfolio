const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
    .populate('userId', 'name title')
    .sort({ createdAt: -1 });
  
  res.json({
    success: true,
    count: projects.length,
    data: projects
  });
});

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ featured: true })
    .populate('userId', 'name title')
    .sort({ createdAt: -1 });
  
  res.json({
    success: true,
    count: projects.length,
    data: projects
  });
});

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('userId', 'name title avatar');
  
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  
  res.json({
    success: true,
    data: project
  });
});

// @desc    Create project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  // Assuming we have authentication and can get userId from req.user

  console.log("Req.user is ",req.user)
  const project = await Project.create({
    ...req.body,
    userId: req.user._id || 'default-user-id' // Replace with actual auth
  });
  
  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project
  });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findById(req.params.id);
  
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  
  project = await Project.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  
  res.json({
    success: true,
    message: 'Project updated successfully',
    data: project
  });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  
  await project.deleteOne();
  
  res.json({
    success: true,
    message: 'Project deleted successfully'
  });
});

// @desc    Get projects by category
// @route   GET /api/projects/category/:category
// @access  Public
const getProjectsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const projects = await Project.find({ category })
    .populate('userId', 'name title')
    .sort({ createdAt: -1 });
  
  res.json({
    success: true,
    count: projects.length,
    data: projects
  });
});

module.exports = {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByCategory
};