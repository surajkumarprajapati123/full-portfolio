const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { 
    name, 
    email, 
    password, 
    passwordConfirm, 
    title, 
    bio, 
    location 
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('User already exists with this email');
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    title: title || 'Software Developer',
    bio: bio || 'Passionate developer',
    location: location || 'Unknown'
  });

  if (user) {
    const token = generateToken(user._id);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        title: user.title,
        bio: user.bio,
        location: user.location,
        role: user.role
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  // Find user and include password
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // Check if user is active
  if (!user.isActive) {
    res.status(401);
    throw new Error('Account is deactivated');
  }

  const token = generateToken(user._id);
  
  res.json({
    success: true,
    message: 'Logged in successfully',
    token,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      title: user.title,
      bio: user.bio,
      location: user.location,
      role: user.role
    }
  });
});

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  res.json({
    success: true,
    data: user
  });
});

// @desc    Get user profile by ID (Public)
// @route   GET /api/users/:id
// @access  Public
const getUserProfileById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  // Check if user is active
  if (!user.isActive) {
    res.status(404);
    throw new Error('User profile not available');
  }
  
  res.json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  // Prevent password update through this route
  if (req.body.password || req.body.passwordConfirm) {
    res.status(400);
    throw new Error('Please use the password update route to change password');
  }
  
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: updatedUser
  });
});

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;
  
  const user = await User.findById(req.user._id).select('+password');
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  // Check current password
  const isPasswordCorrect = await user.comparePassword(currentPassword);
  if (!isPasswordCorrect) {
    res.status(401);
    throw new Error('Current password is incorrect');
  }
  
  // Update password
  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  await user.save();
  
  res.json({
    success: true,
    message: 'Password updated successfully'
  });
});

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  await user.deleteOne();
  
  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

// @desc    Deactivate account
// @route   PUT /api/users/deactivate
// @access  Private
const deactivateAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  user.isActive = false;
  await user.save();
  
  res.json({
    success: true,
    message: 'Account deactivated successfully'
  });
});

// @desc    Get user skills
// @route   GET /api/users/skills
// @access  Public
const getUserSkills = asyncHandler(async (req, res) => {
  const user = await User.findOne().select('about.skills');
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  res.json({
    success: true,
    data: user.about.skills
  });
});

// @desc    Update user skills
// @route   PUT /api/users/skills
// @access  Private
const updateUserSkills = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  user.about.skills = req.body;
  await user.save();
  
  res.json({
    success: true,
    message: 'Skills updated successfully',
    data: user.about.skills
  });
});

// @desc    Get user expertise
// @route   GET /api/users/expertise
// @access  Public
const getUserExpertise = asyncHandler(async (req, res) => {
  const user = await User.findOne().select('expertise');
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  res.json({
    success: true,
    data: user.expertise
  });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUserProfile,
  getUserProfileById,
  updateUserProfile,
  changePassword,
  getAllUsers,
  deleteUser,
  deactivateAccount,
  getUserSkills,
  updateUserSkills,
  getUserExpertise
};