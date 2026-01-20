const asyncHandler = require('express-async-handler');
const Preference = require('../models/Preference');
const User = require('../models/User');

// @desc    Get user preferences
// @route   GET /api/preferences
// @access  Private
const getPreferences = asyncHandler(async (req, res) => {
  const preferences = await Preference.findOne({ userId: req.user._id });
  
  if (!preferences) {
    return res.status(200).json({
      success: true,
      message: 'No preferences found',
      data: null
    });
  }
  
  res.status(200).json({
    success: true,
    data: preferences
  });
});

// @desc    Create new preferences
// @route   POST /api/preferences
// @access  Private
const createPreferences = asyncHandler(async (req, res) => {
  // Check if preferences already exist
  const existingPreferences = await Preference.findOne({ userId: req.user._id });
  
  if (existingPreferences) {
    return res.status(400).json({
      success: false,
      message: 'Preferences already exist for this user. Use PUT to update.'
    });
  }
  
  // Validate required fields
  const { workType, jobTitles } = req.body;
  
  if (!workType || !Array.isArray(workType) || workType.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Work type is required and must be an array with at least one value'
    });
  }
  
  if (!jobTitles || !Array.isArray(jobTitles) || jobTitles.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Job titles are required and must be an array with at least one value'
    });
  }
  
  // Create preferences
  const preferences = await Preference.create({
    userId: req.user._id,
    workType: req.body.workType,
    remote: req.body.remote !== undefined ? req.body.remote : true,
    relocation: req.body.relocation || 'No',
    relocationLocations: req.body.relocationLocations || [],
    industries: req.body.industries || [],
    contractTypes: req.body.contractTypes || [],
    minSalary: req.body.minSalary,
    maxSalary: req.body.maxSalary,
    currency: req.body.currency || 'USD',
    noticePeriod: req.body.noticePeriod || 30,
    jobTitles: req.body.jobTitles,
    companySize: req.body.companySize || [],
    workCulture: req.body.workCulture || [],
    benefits: req.body.benefits || []
  });
  
  // Update user's profile completion
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { profileCompletion: 10 },
    $set: { updatedAt: Date.now() }
  });
  
  res.status(201).json({
    success: true,
    message: 'Preferences created successfully',
    data: preferences
  });
});

// @desc    Update preferences
// @route   PUT /api/preferences/:id
// @access  Private
const updatePreferences = asyncHandler(async (req, res) => {
  const preferences = await Preference.findById(req.params.id);
  
  if (!preferences) {
    return res.status(404).json({
      success: false,
      message: 'Preferences not found'
    });
  }
  
  // Check ownership
  if (preferences.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update these preferences'
    });
  }
  
  // Validate required fields for update
  if (req.body.workType && (!Array.isArray(req.body.workType) || req.body.workType.length === 0)) {
    return res.status(400).json({
      success: false,
      message: 'Work type must be an array with at least one value'
    });
  }
  
  if (req.body.jobTitles && (!Array.isArray(req.body.jobTitles) || req.body.jobTitles.length === 0)) {
    return res.status(400).json({
      success: false,
      message: 'Job titles must be an array with at least one value'
    });
  }
  
  // Update preferences
  const updatedPreferences = await Preference.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      lastUpdatedBy: req.user._id
    },
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  );
  
  res.status(200).json({
    success: true,
    message: 'Preferences updated successfully',
    data: updatedPreferences
  });
});

// @desc    Partial update preferences
// @route   PATCH /api/preferences/:id
// @access  Private
const patchPreferences = asyncHandler(async (req, res) => {
  const preferences = await Preference.findById(req.params.id);
  
  if (!preferences) {
    return res.status(404).json({
      success: false,
      message: 'Preferences not found'
    });
  }
  
  // Check ownership
  if (preferences.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update these preferences'
    });
  }
  
  // Validate array fields if provided
  if (req.body.workType && (!Array.isArray(req.body.workType) || req.body.workType.length === 0)) {
    return res.status(400).json({
      success: false,
      message: 'Work type must be an array with at least one value'
    });
  }
  
  if (req.body.jobTitles && (!Array.isArray(req.body.jobTitles) || req.body.jobTitles.length === 0)) {
    return res.status(400).json({
      success: false,
      message: 'Job titles must be an array with at least one value'
    });
  }
  
  // Update only provided fields
  Object.keys(req.body).forEach(key => {
    if (preferences[key] !== undefined) {
      preferences[key] = req.body[key];
    }
  });
  
  preferences.lastUpdatedBy = req.user._id;
  await preferences.save();
  
  res.status(200).json({
    success: true,
    message: 'Preferences partially updated successfully',
    data: preferences
  });
});

// @desc    Delete preferences
// @route   DELETE /api/preferences/:id
// @access  Private
const deletePreferences = asyncHandler(async (req, res) => {
  const preferences = await Preference.findById(req.params.id);
  
  if (!preferences) {
    return res.status(404).json({
      success: false,
      message: 'Preferences not found'
    });
  }
  
  // Check ownership
  if (preferences.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete these preferences'
    });
  }
  
  await Preference.findByIdAndDelete(req.params.id);
  
  // Update user's profile completion
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { profileCompletion: -10 },
    $set: { updatedAt: Date.now() }
  });
  
  res.status(200).json({
    success: true,
    message: 'Preferences deleted successfully',
    data: null
  });
});

// @desc    Get or create preferences (idempotent)
// @route   POST /api/preferences/ensure
// @access  Private
const ensurePreferences = asyncHandler(async (req, res) => {
  let preferences = await Preference.findOne({ userId: req.user._id });
  
  if (!preferences) {
    // Create default preferences
    preferences = await Preference.create({
      userId: req.user._id,
      workType: ['Full-time'],
      jobTitles: ['Software Engineer'],
      remote: true,
      relocation: 'No',
      noticePeriod: 30,
      currency: 'USD'
    });
    
    // Update user's profile completion
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { profileCompletion: 10 },
      $set: { updatedAt: Date.now() }
    });
    
    res.status(201).json({
      success: true,
      message: 'Default preferences created successfully',
      data: preferences
    });
  } else {
    res.status(200).json({
      success: true,
      data: preferences
    });
  }
});

// @desc    Get preferences statistics
// @route   GET /api/preferences/stats
// @access  Private
const getPreferencesStats = asyncHandler(async (req, res) => {
  const preferences = await Preference.findOne({ userId: req.user._id });
  
  if (!preferences) {
    return res.status(404).json({
      success: false,
      message: 'Preferences not found'
    });
  }
  
  const stats = {
    completionPercentage: preferences.completionPercentage,
    hasSalaryRange: !!(preferences.minSalary && preferences.maxSalary),
    hasRelocationInfo: preferences.relocation !== 'No',
    workTypesCount: preferences.workType.length,
    jobTitlesCount: preferences.jobTitles.length,
    industriesCount: preferences.industries.length,
    benefitsCount: preferences.benefits.length,
    lastUpdated: preferences.updatedAt
  };
  
  res.status(200).json({
    success: true,
    data: stats
  });
});

// @desc    Get preferences suggestions
// @route   GET /api/preferences/suggestions
// @access  Private
const getSuggestions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('title bio experience');
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  const suggestions = {
    jobTitles: [],
    industries: [],
    salaryRange: { min: 0, max: 0 },
    benefits: [],
    workCulture: []
  };
  
  // Suggest based on user's title and experience
  if (user.title) {
    const title = user.title.toLowerCase();
    
    if (title.includes('senior') || title.includes('lead') || title.includes('principal')) {
      suggestions.salaryRange.min = 120000;
      suggestions.salaryRange.max = 200000;
      suggestions.jobTitles = [
        'Senior Software Engineer',
        'Tech Lead',
        'Principal Engineer',
        'Engineering Manager'
      ];
      suggestions.benefits = ['Stock options', 'Health insurance', '401(k) matching'];
    } else if (title.includes('junior') || title.includes('entry')) {
      suggestions.salaryRange.min = 60000;
      suggestions.salaryRange.max = 90000;
      suggestions.jobTitles = ['Junior Developer', 'Software Engineer I', 'Associate Engineer'];
      suggestions.benefits = ['Learning budget', 'Mentorship program', 'Health insurance'];
    } else {
      suggestions.salaryRange.min = 80000;
      suggestions.salaryRange.max = 130000;
      suggestions.jobTitles = ['Software Engineer', 'Full Stack Developer', 'Backend Engineer'];
      suggestions.benefits = ['Health insurance', 'Remote work allowance', 'Learning budget'];
    }
  }
  
  // Suggest industries based on bio
  if (user.bio) {
    const bio = user.bio.toLowerCase();
    const industryMap = {
      'web|app|software': ['Technology', 'Software Development', 'SaaS'],
      'finance|banking|fintech': ['Finance', 'Fintech', 'Banking'],
      'health|medical': ['Healthcare', 'Health Tech', 'Medical'],
      'e-commerce|retail': ['E-commerce', 'Retail', 'Consumer Goods'],
      'education|learning': ['EdTech', 'Education', 'E-learning'],
      'gaming|entertainment': ['Gaming', 'Entertainment', 'Media']
    };
    
    Object.entries(industryMap).forEach(([keywords, industries]) => {
      if (new RegExp(keywords).test(bio)) {
        suggestions.industries.push(...industries);
      }
    });
  }
  
  // Remove duplicates
  suggestions.industries = [...new Set(suggestions.industries)];
  suggestions.jobTitles = [...new Set(suggestions.jobTitles)];
  
  // Suggest work culture based on preferences
  suggestions.workCulture = [
    'Remote-first',
    'Flexible hours',
    'Learning culture',
    'Work-life balance'
  ];
  
  res.status(200).json({
    success: true,
    data: suggestions
  });
});

// @desc    Get users with similar preferences
// @route   GET /api/preferences/similar-users
// @access  Private
const getSimilarUsers = asyncHandler(async (req, res) => {
  const currentUserPreferences = await Preference.findOne({ userId: req.user._id });
  
  if (!currentUserPreferences) {
    return res.status(404).json({
      success: false,
      message: 'Preferences not found. Please set your preferences first.'
    });
  }
  
  // Build match criteria
  const matchCriteria = {
    userId: { $ne: req.user._id },
    isActive: true
  };
  
  // Add criteria based on current user's preferences
  if (currentUserPreferences.workType && currentUserPreferences.workType.length > 0) {
    matchCriteria.workType = { $in: currentUserPreferences.workType };
  }
  
  if (currentUserPreferences.industries && currentUserPreferences.industries.length > 0) {
    matchCriteria.industries = { $in: currentUserPreferences.industries };
  }
  
  if (currentUserPreferences.jobTitles && currentUserPreferences.jobTitles.length > 0) {
    matchCriteria.jobTitles = { $in: currentUserPreferences.jobTitles };
  }
  
  // Find similar users
  const similarPreferences = await Preference.find(matchCriteria)
    .populate({
      path: 'userId',
      select: 'name title avatar location bio',
      match: { isActive: true }
    })
    .limit(20);
  
  // Filter out null users and format response
  const similarUsers = similarPreferences
    .filter(pref => pref.userId)
    .map(pref => {
      const commonPoints = [];
      
      if (currentUserPreferences.workType.some(type => pref.workType.includes(type))) {
        commonPoints.push('Work Type');
      }
      
      if (currentUserPreferences.industries.some(industry => pref.industries.includes(industry))) {
        commonPoints.push('Industry');
      }
      
      if (currentUserPreferences.jobTitles.some(title => pref.jobTitles.includes(title))) {
        commonPoints.push('Job Title');
      }
      
      if (currentUserPreferences.relocation === pref.relocation) {
        commonPoints.push('Relocation Preference');
      }
      
      return {
        user: pref.userId,
        commonPoints,
        matchPercentage: Math.round((commonPoints.length / 4) * 100),
        preferences: {
          workType: pref.workType,
          industries: pref.industries,
          jobTitles: pref.jobTitles
        }
      };
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
  
  res.status(200).json({
    success: true,
    count: similarUsers.length,
    data: similarUsers
  });
});

// @desc    Get popular job titles in the system
// @route   GET /api/preferences/popular/titles
// @access  Private
const getPopularJobTitles = asyncHandler(async (req, res) => {
  const { limit = 20, industry } = req.query;
  
  const matchStage = { isActive: true };
  if (industry) {
    matchStage.industries = industry;
  }
  
  const popularTitles = await Preference.aggregate([
    { $match: matchStage },
    { $unwind: '$jobTitles' },
    {
      $group: {
        _id: '$jobTitles',
        count: { $sum: 1 },
        avgMinSalary: { $avg: '$minSalary' },
        avgMaxSalary: { $avg: '$maxSalary' }
      }
    },
    {
      $project: {
        title: '$_id',
        count: 1,
        avgMinSalary: { $round: ['$avgMinSalary', 2] },
        avgMaxSalary: { $round: ['$avgMaxSalary', 2] },
        _id: 0
      }
    },
    { $sort: { count: -1 } },
    { $limit: parseInt(limit) }
  ]);
  
  res.status(200).json({
    success: true,
    data: popularTitles
  });
});

// @desc    Get salary benchmarks
// @route   GET /api/preferences/benchmarks/salary
// @access  Private
const getSalaryBenchmarks = asyncHandler(async (req, res) => {
  const { jobTitle, location, experience } = req.query;
  
  const matchStage = {
    isActive: true,
    minSalary: { $exists: true, $ne: null },
    maxSalary: { $exists: true, $ne: null }
  };
  
  if (jobTitle) {
    matchStage.jobTitles = jobTitle;
  }
  
  const salaryData = await Preference.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
    {
      $group: {
        _id: jobTitle || 'All',
        count: { $sum: 1 },
        avgMinSalary: { $avg: '$minSalary' },
        avgMaxSalary: { $avg: '$maxSalary' },
        minSalaryOverall: { $min: '$minSalary' },
        maxSalaryOverall: { $max: '$maxSalary' },
        medianMinSalary: { $median: { input: '$minSalary', method: 'approximate' } },
        medianMaxSalary: { $median: { input: '$maxSalary', method: 'approximate' } }
      }
    },
    {
      $project: {
        jobTitle: '$_id',
        count: 1,
        average: {
          min: { $round: ['$avgMinSalary', 2] },
          max: { $round: ['$avgMaxSalary', 2] }
        },
        range: {
          min: { $round: ['$minSalaryOverall', 2] },
          max: { $round: ['$maxSalaryOverall', 2] }
        },
        median: {
          min: { $round: ['$medianMinSalary', 2] },
          max: { $round: ['$medianMaxSalary', 2] }
        },
        _id: 0
      }
    }
  ]);
  
  res.status(200).json({
    success: true,
    data: salaryData[0] || {}
  });
});

// @desc    Reset preferences to default
// @route   POST /api/preferences/reset
// @access  Private
const resetPreferences = asyncHandler(async (req, res) => {
  const preferences = await Preference.findOne({ userId: req.user._id });
  
  if (!preferences) {
    return res.status(404).json({
      success: false,
      message: 'Preferences not found'
    });
  }
  
  // Reset to default values
  preferences.workType = ['Full-time'];
  preferences.remote = true;
  preferences.relocation = 'No';
  preferences.relocationLocations = [];
  preferences.industries = [];
  preferences.contractTypes = [];
  preferences.minSalary = undefined;
  preferences.maxSalary = undefined;
  preferences.currency = 'USD';
  preferences.noticePeriod = 30;
  preferences.jobTitles = ['Software Engineer'];
  preferences.companySize = [];
  preferences.workCulture = [];
  preferences.benefits = [];
  preferences.lastUpdatedBy = req.user._id;
  
  await preferences.save();
  
  res.status(200).json({
    success: true,
    message: 'Preferences reset to default successfully',
    data: preferences
  });
});

// @desc    Export preferences as JSON
// @route   GET /api/preferences/export
// @access  Private
const exportPreferences = asyncHandler(async (req, res) => {
  const preferences = await Preference.findOne({ userId: req.user._id });
  
  if (!preferences) {
    return res.status(404).json({
      success: false,
      message: 'Preferences not found'
    });
  }
  
  const exportData = {
    metadata: {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      format: 'JSON'
    },
    preferences: preferences.toObject(),
    summary: {
      completionPercentage: preferences.completionPercentage,
      workTypes: preferences.workType,
      jobTitles: preferences.jobTitles,
      industries: preferences.industries,
      salaryRange: preferences.salaryRange
    }
  };
  
  // Set headers for file download
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="preferences-${req.user._id}-${Date.now()}.json"`);
  
  res.status(200).send(JSON.stringify(exportData, null, 2));
});

// @desc    Get preferences by ID
// @route   GET /api/preferences/:id
// @access  Private
const getPreferencesById = asyncHandler(async (req, res) => {
  const preferences = await Preference.findById(req.params.id);
  
  if (!preferences) {
    return res.status(404).json({
      success: false,
      message: 'Preferences not found'
    });
  }
  
  // Check ownership (users can only view their own preferences)
  if (preferences.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view these preferences'
    });
  }
  
  res.status(200).json({
    success: true,
    data: preferences
  });
});

// @desc    Bulk update preferences from array
// @route   POST /api/preferences/bulk
// @access  Private
const bulkUpdatePreferences = asyncHandler(async (req, res) => {
  const { updates } = req.body;
  
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Updates must be a non-empty array'
    });
  }
  
  const preferences = await Preference.findOne({ userId: req.user._id });
  
  if (!preferences) {
    return res.status(404).json({
      success: false,
      message: 'Preferences not found'
    });
  }
  
  // Apply bulk updates
  updates.forEach(update => {
    const { field, value, operation = 'set' } = update;
    
    if (preferences[field] !== undefined) {
      if (operation === 'add' && Array.isArray(preferences[field])) {
        // Add to array
        preferences[field] = [...new Set([...preferences[field], ...value])];
      } else if (operation === 'remove' && Array.isArray(preferences[field])) {
        // Remove from array
        preferences[field] = preferences[field].filter(item => !value.includes(item));
      } else {
        // Set value
        preferences[field] = value;
      }
    }
  });
  
  preferences.lastUpdatedBy = req.user._id;
  await preferences.save();
  
  res.status(200).json({
    success: true,
    message: 'Bulk update successful',
    data: preferences
  });
});

module.exports = {
  getPreferences,
  createPreferences,
  updatePreferences,
  patchPreferences,
  deletePreferences,
  getPreferencesById,
  ensurePreferences,
  getPreferencesStats,
  getSuggestions,
  getSimilarUsers,
  getPopularJobTitles,
  getSalaryBenchmarks,
  resetPreferences,
  exportPreferences,
  bulkUpdatePreferences
};