const asyncHandler = require("express-async-handler");
const validator = require("validator");
const Social = require("../models/Social");
const User = require("../models/User");

// @desc    Get user social links
// @route   GET /api/social
// @access  Private
const getSocial = asyncHandler(async (req, res) => {
  const social = await Social.findOne({ userId: req.user._id });

  if (!social) {
    return res.status(200).json({
      success: true,
      message: "No social links found",
      data: null,
    });
  }

  res.status(200).json({
    success: true,
    data: social,
  });
});

// @desc    Create social links
// @route   POST /api/social
// @access  Private
const createSocial = asyncHandler(async (req, res) => {
  // Check if social already exists
  const existingSocial = await Social.findOne({ userId: req.user._id });

  if (existingSocial) {
    return res.status(400).json({
      success: false,
      message: "Social profile already exists. Use PUT to update.",
    });
  }

  // Validate URLs
  const validationErrors = {};
  const socialFields = [
    "github",
    "linkedin",
    "twitter",
    "dribbble",
    "codepen",
    "medium",
    "stackoverflow",
    "behance",
    "gitlab",
    "youtube",
    "instagram",
    "facebook",
    "personalWebsite",
    "blog",
  ];

  socialFields.forEach((field) => {
    if (req.body[field] && !validator.isURL(req.body[field])) {
      validationErrors[field] = `Please provide a valid URL for ${field}`;
    }
  });

  // Validate otherLinks
  if (req.body.otherLinks && Array.isArray(req.body.otherLinks)) {
    req.body.otherLinks.forEach((link, index) => {
      if (link.url && !validator.isURL(link.url)) {
        validationErrors[`otherLinks[${index}].url`] =
          "Please provide a valid URL";
      }
    });
  }

  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: validationErrors,
    });
  }

  // Create social profile
  const social = await Social.create({
    userId: req.user._id,
    ...req.body,
    otherLinks: req.body.otherLinks || [],
  });

  // Update user's profile completion
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { profileCompletion: 10 },
    $set: { updatedAt: Date.now() },
  });

  res.status(201).json({
    success: true,
    message: "Social profile created successfully",
    data: social,
  });
});

// @desc    Update social links
// @route   PUT /api/social/:id
// @access  Private
const updateSocial = asyncHandler(async (req, res) => {
  const social = await Social.findById(req.params.id);

  if (!social) {
    return res.status(404).json({
      success: false,
      message: "Social profile not found",
    });
  }

  // Check ownership
  if (social.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to update this social profile",
    });
  }

  // Validate URLs
  const validationErrors = {};
  const socialFields = [
    "github",
    "linkedin",
    "twitter",
    "dribbble",
    "codepen",
    "medium",
    "stackoverflow",
    "behance",
    "gitlab",
    "youtube",
    "instagram",
    "facebook",
    "personalWebsite",
    "blog",
  ];

  socialFields.forEach((field) => {
    if (req.body[field] && !validator.isURL(req.body[field])) {
      validationErrors[field] = `Please provide a valid URL for ${field}`;
    }
  });

  // Validate otherLinks
  if (req.body.otherLinks && Array.isArray(req.body.otherLinks)) {
    req.body.otherLinks.forEach((link, index) => {
      if (link.url && !validator.isURL(link.url)) {
        validationErrors[`otherLinks[${index}].url`] =
          "Please provide a valid URL";
      }
    });
  }

  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: validationErrors,
    });
  }

  // Update social profile
  const updatedSocial = await Social.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      context: "query",
    },
  );

  res.status(200).json({
    success: true,
    message: "Social profile updated successfully",
    data: updatedSocial,
  });
});

// @desc    Partial update social links
// @route   PATCH /api/social/:id
// @access  Private
const patchSocial = asyncHandler(async (req, res) => {
  const social = await Social.findById(req.params.id);

  if (!social) {
    return res.status(404).json({
      success: false,
      message: "Social profile not found",
    });
  }

  // Check ownership
  if (social.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to update this social profile",
    });
  }

  // Validate URLs
  const validationErrors = {};
  Object.keys(req.body).forEach((field) => {
    if (
      field !== "otherLinks" &&
      req.body[field] &&
      !validator.isURL(req.body[field])
    ) {
      validationErrors[field] = `Please provide a valid URL for ${field}`;
    }
  });

  // Validate otherLinks if provided
  if (req.body.otherLinks && Array.isArray(req.body.otherLinks)) {
    req.body.otherLinks.forEach((link, index) => {
      if (link.url && !validator.isURL(link.url)) {
        validationErrors[`otherLinks[${index}].url`] =
          "Please provide a valid URL";
      }
    });
  }

  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: validationErrors,
    });
  }

  // Update only provided fields
  Object.keys(req.body).forEach((key) => {
    social[key] = req.body[key];
  });

  await social.save();

  res.status(200).json({
    success: true,
    message: "Social profile partially updated successfully",
    data: social,
  });
});

// @desc    Delete social profile
// @route   DELETE /api/social/:id
// @access  Private
const deleteSocial = asyncHandler(async (req, res) => {
  const social = await Social.findById(req.params.id);

  if (!social) {
    return res.status(404).json({
      success: false,
      message: "Social profile not found",
    });
  }

  // Check ownership
  if (social.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to delete this social profile",
    });
  }

  await Social.findByIdAndDelete(req.params.id);

  // Update user's profile completion
  await User.findByIdAndUpdate(req.user._id, {
    $inc: { profileCompletion: -10 },
    $set: { updatedAt: Date.now() },
  });

  res.status(200).json({
    success: true,
    message: "Social profile deleted successfully",
    data: null,
  });
});

// @desc    Add custom social link
// @route   POST /api/social/:id/custom
// @access  Private
const addCustomLink = asyncHandler(async (req, res) => {
  const { platform, url } = req.body;

  if (!platform || !url) {
    return res.status(400).json({
      success: false,
      message: "Platform and URL are required",
    });
  }

  if (!validator.isURL(url)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid URL",
    });
  }

  const social = await Social.findById(req.params.id);

  if (!social) {
    return res.status(404).json({
      success: false,
      message: "Social profile not found",
    });
  }

  // Check ownership
  if (social.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to modify this social profile",
    });
  }

  // Check if platform already exists in otherLinks
  const exists = social.otherLinks.some(
    (link) => link.platform.toLowerCase() === platform.toLowerCase(),
  );

  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Platform already exists in custom links",
    });
  }

  // Add custom link
  social.otherLinks.push({ platform, url });
  await social.save();

  res.status(200).json({
    success: true,
    message: "Custom link added successfully",
    data: social,
  });
});

// @desc    Update custom social link
// @route   PUT /api/social/:id/custom/:linkId
// @access  Private
const updateCustomLink = asyncHandler(async (req, res) => {
  const { platform, url } = req.body;

  if (!platform && !url) {
    return res.status(400).json({
      success: false,
      message: "Platform or URL is required for update",
    });
  }

  if (url && !validator.isURL(url)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid URL",
    });
  }

  const social = await Social.findById(req.params.id);

  if (!social) {
    return res.status(404).json({
      success: false,
      message: "Social profile not found",
    });
  }

  // Check ownership
  if (social.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to modify this social profile",
    });
  }

  // Find and update custom link
  const linkIndex = social.otherLinks.findIndex(
    (link) => link._id.toString() === req.params.linkId,
  );

  if (linkIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Custom link not found",
    });
  }

  // Update link
  if (platform) social.otherLinks[linkIndex].platform = platform;
  if (url) social.otherLinks[linkIndex].url = url;

  await social.save();

  res.status(200).json({
    success: true,
    message: "Custom link updated successfully",
    data: social,
  });
});

// @desc    Remove custom social link
// @route   DELETE /api/social/:id/custom/:linkId
// @access  Private
const removeCustomLink = asyncHandler(async (req, res) => {
  const social = await Social.findById(req.params.id);

  if (!social) {
    return res.status(404).json({
      success: false,
      message: "Social profile not found",
    });
  }

  // Check ownership
  if (social.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to modify this social profile",
    });
  }

  // Find and remove custom link
  const linkIndex = social.otherLinks.findIndex(
    (link) => link._id.toString() === req.params.linkId,
  );

  if (linkIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Custom link not found",
    });
  }

  social.otherLinks.splice(linkIndex, 1);
  await social.save();

  res.status(200).json({
    success: true,
    message: "Custom link removed successfully",
    data: social,
  });
});

// @desc    Get social profile by ID
// @route   GET /api/social/:id
// @access  Private
const getSocialById = asyncHandler(async (req, res) => {
  const social = await Social.findById(req.params.id);

  if (!social) {
    return res.status(404).json({
      success: false,
      message: "Social profile not found",
    });
  }

  // Check ownership
  if (social.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to view this social profile",
    });
  }

  res.status(200).json({
    success: true,
    data: social,
  });
});

// @desc    Get or create social profile (idempotent)
// @route   POST /api/social/ensure
// @access  Private
const ensureSocial = asyncHandler(async (req, res) => {
  let social = await Social.findOne({ userId: req.user._id });

  if (!social) {
    // Create empty social profile
    social = await Social.create({
      userId: req.user._id,
    });

    // Update user's profile completion
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { profileCompletion: 10 },
      $set: { updatedAt: Date.now() },
    });

    res.status(201).json({
      success: true,
      message: "Social profile created successfully",
      data: social,
    });
  } else {
    res.status(200).json({
      success: true,
      data: social,
    });
  }
});

// @desc    Get social statistics
// @route   GET /api/social/stats
// @access  Private
const getSocialStats = asyncHandler(async (req, res) => {
  const social = await Social.findOne({ userId: req.user._id });

  if (!social) {
    return res.status(404).json({
      success: false,
      message: "Social profile not found",
    });
  }

  const stats = {
    totalLinks: 0,
    platforms: {},
    customLinksCount: social.otherLinks.length,
    completionPercentage: 0,
    lastUpdated: social.updatedAt,
  };

  // Count main platform links
  const mainPlatforms = [
    "github",
    "linkedin",
    "twitter",
    "dribbble",
    "codepen",
    "medium",
    "stackoverflow",
    "behance",
    "gitlab",
    "youtube",
    "instagram",
    "facebook",
    "personalWebsite",
    "blog",
  ];

  mainPlatforms.forEach((platform) => {
    const hasLink = social[platform] && social[platform].trim() !== "";
    stats.platforms[platform] = hasLink;
    if (hasLink) stats.totalLinks++;
  });

  // Add custom links to total
  stats.totalLinks += social.otherLinks.length;

  // Calculate completion percentage
  const filledMainPlatforms = Object.values(stats.platforms).filter(
    Boolean,
  ).length;
  const totalPossiblePlatforms = mainPlatforms.length;
  stats.completionPercentage = Math.round(
    (filledMainPlatforms / totalPossiblePlatforms) * 100,
  );

  // Add platform counts
  stats.platformCounts = {
    main: filledMainPlatforms,
    custom: social.otherLinks.length,
    total: stats.totalLinks,
  };

  res.status(200).json({
    success: true,
    data: stats,
  });
});

// @desc    Validate social URL
// @route   POST /api/social/validate
// @access  Private
const validateSocialUrl = asyncHandler(async (req, res) => {
  const { url, platform } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "URL is required",
    });
  }

  // Check if URL is valid
  const isValidUrl = validator.isURL(url);

  if (!isValidUrl) {
    return res.status(200).json({
      success: false,
      message: "Invalid URL format",
      data: { isValid: false },
    });
  }

  // Platform-specific validation
  let platformValid = true;
  let platformMessage = "";

  if (platform) {
    const platformLower = platform.toLowerCase();

    // Check if URL contains platform domain
    if (platformLower.includes("github") && !url.includes("github.com")) {
      platformValid = false;
      platformMessage = "URL should contain github.com";
    } else if (
      platformLower.includes("linkedin") &&
      !url.includes("linkedin.com")
    ) {
      platformValid = false;
      platformMessage = "URL should contain linkedin.com";
    } else if (
      platformLower.includes("twitter") &&
      !url.includes("twitter.com") &&
      !url.includes("x.com")
    ) {
      platformValid = false;
      platformMessage = "URL should contain twitter.com or x.com";
    }
  }

  const isValid = isValidUrl && platformValid;

  res.status(200).json({
    success: true,
    data: {
      isValid,
      message: platformValid ? "URL is valid" : platformMessage,
      url,
      platform,
    },
  });
});

// @desc    Export social links
// @route   GET /api/social/export
// @access  Private
const exportSocial = asyncHandler(async (req, res) => {
  const social = await Social.findOne({ userId: req.user._id });

  if (!social) {
    return res.status(404).json({
      success: false,
      message: "Social profile not found",
    });
  }

  const exportData = {
    metadata: {
      exportedAt: new Date().toISOString(),
      format: "JSON",
      version: "1.0",
    },
    socialLinks: {
      github: social.github,
      linkedin: social.linkedin,
      twitter: social.twitter,
      dribbble: social.dribbble,
      codepen: social.codepen,
      medium: social.medium,
      stackoverflow: social.stackoverflow,
      behance: social.behance,
      gitlab: social.gitlab,
      youtube: social.youtube,
      instagram: social.instagram,
      facebook: social.facebook,
      personalWebsite: social.personalWebsite,
      blog: social.blog,
    },
    otherLinks: social.otherLinks,
    summary: {
      totalPlatforms: 0,
      hasPersonalWebsite: !!social.personalWebsite,
      hasBlog: !!social.blog,
      customLinksCount: social.otherLinks.length,
    },
  };

  // Count filled platforms
  Object.values(exportData.socialLinks).forEach((value) => {
    if (value && value.trim() !== "") {
      exportData.summary.totalPlatforms++;
    }
  });

  // Set headers for file download
  res.setHeader("Content-Type", "application/json");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="social-links-${req.user._id}-${Date.now()}.json"`,
  );

  res.status(200).send(JSON.stringify(exportData, null, 2));
});

// @desc    Reset social profile
// @route   POST /api/social/reset
// @access  Private
const resetSocial = asyncHandler(async (req, res) => {
  const social = await Social.findOne({ userId: req.user._id });

  if (!social) {
    return res.status(404).json({
      success: false,
      message: "Social profile not found",
    });
  }

  // Reset all fields to empty
  const resetFields = [
    "github",
    "linkedin",
    "twitter",
    "dribbble",
    "codepen",
    "medium",
    "stackoverflow",
    "behance",
    "gitlab",
    "youtube",
    "instagram",
    "facebook",
    "personalWebsite",
    "blog",
  ];

  resetFields.forEach((field) => {
    social[field] = "";
  });

  social.otherLinks = [];
  await social.save();

  res.status(200).json({
    success: true,
    message: "Social profile reset successfully",
    data: social,
  });
});

// @desc    Get popular social platforms in the system
// @route   GET /api/social/popular/platforms
// @access  Private
const getPopularPlatforms = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const platforms = [
    "github",
    "linkedin",
    "twitter",
    "personalWebsite",
    "medium",
    "stackoverflow",
    "youtube",
    "instagram",
    "dribbble",
    "behance",
  ];

  const platformStats = await Promise.all(
    platforms.map(async (platform) => {
      const count = await Social.countDocuments({
        [platform]: { $exists: true, $ne: "" },
      });

      return {
        platform,
        count,
        percentage: 0, // Will be calculated below
      };
    }),
  );

  // Calculate total and percentages
  const totalProfiles = await Social.countDocuments();
  platformStats.forEach((stat) => {
    stat.percentage =
      totalProfiles > 0 ? Math.round((stat.count / totalProfiles) * 100) : 0;
  });

  // Sort by count and limit
  const sortedPlatforms = platformStats
    .sort((a, b) => b.count - a.count)
    .slice(0, parseInt(limit));

  res.status(200).json({
    success: true,
    data: {
      platforms: sortedPlatforms,
      totalProfiles,
      summary: {
        mostPopular: sortedPlatforms[0]?.platform || "None",
        leastPopular:
          sortedPlatforms[sortedPlatforms.length - 1]?.platform || "None",
      },
    },
  });
});

// @desc    Bulk update social links
// @route   POST /api/social/bulk
// @access  Private
const bulkUpdateSocial = asyncHandler(async (req, res) => {
  const { updates } = req.body;

  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Updates must be a non-empty array",
    });
  }

  const social = await Social.findOne({ userId: req.user._id });

  if (!social) {
    return res.status(404).json({
      success: false,
      message: "Social profile not found",
    });
  }

  // Validate URLs first
  const validationErrors = {};
  updates.forEach((update, index) => {
    if (update.url && !validator.isURL(update.url)) {
      validationErrors[`updates[${index}].url`] = "Please provide a valid URL";
    }
  });

  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: validationErrors,
    });
  }

  // Apply bulk updates
  updates.forEach((update) => {
    const { platform, url, operation = "set" } = update;

    if (social[platform] !== undefined) {
      // Main platform
      social[platform] = url;
    } else if (operation === "addCustom") {
      // Add to custom links
      social.otherLinks.push({ platform, url });
    } else if (operation === "removeCustom") {
      // Remove from custom links
      social.otherLinks = social.otherLinks.filter(
        (link) => link.platform !== platform && link.url !== url,
      );
    }
  });

  await social.save();

  res.status(200).json({
    success: true,
    message: "Bulk update successful",
    data: social,
  });
});

module.exports = {
  getSocial,
  createSocial,
  updateSocial,
  patchSocial,
  deleteSocial,
  getSocialById,
  ensureSocial,
  getSocialStats,
  validateSocialUrl,
  exportSocial,
  resetSocial,
  getPopularPlatforms,
  addCustomLink,
  updateCustomLink,
  removeCustomLink,
  bulkUpdateSocial,
};
