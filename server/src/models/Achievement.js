const mongoose = require('mongoose');
const validator = require('validator');

const achievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  awards: [{
    title: {
      type: String,
      required: [true, 'Award title is required']
    },
    issuer: String,
    date: Date,
    description: String,
    icon: String,
    category: String
  }],
  certifications: [{
    name: {
      type: String,
      required: [true, 'Certification name is required']
    },
    issuer: String,
    date: Date,
    credentialId: String,
    url: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid URL']
    },
    icon: String
  }],
  milestones: [{
    title: {
      type: String,
      required: [true, 'Milestone title is required']
    },
    metric: String,
    description: String,
    date: Date,
    icon: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', achievementSchema);