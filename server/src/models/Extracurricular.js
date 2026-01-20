const mongoose = require('mongoose');
const validator = require('validator');

const extracurricularSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  openSource: [{
    project: {
      type: String,
      required: [true, 'Project name is required']
    },
    role: String,
    description: String,
    githubUrl: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid URL']
    },
    stars: String,
    contributors: Number,
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Archived'],
      default: 'Active'
    },
    technologies: [String]
  }],
  community: [{
    organization: {
      type: String,
      required: [true, 'Organization name is required']
    },
    role: String,
    period: String,
    description: String,
    activities: [String],
    link: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid URL']
    }
  }],
  hackathons: [{
    name: {
      type: String,
      required: [true, 'Hackathon name is required']
    },
    role: String,
    date: Date,
    achievement: String,
    project: String,
    technologies: [String]
  }],
  speaking: [{
    event: {
      type: String,
      required: [true, 'Event name is required']
    },
    title: {
      type: String,
      required: [true, 'Talk title is required']
    },
    date: Date,
    location: String,
    type: {
      type: String,
      enum: ['Conference Talk', 'Workshop', 'Tech Talk', 'Keynote']
    },
    audienceSize: String,
    recordingUrl: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid URL']
    },
    slidesUrl: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid URL']
    }
  }],
  publications: [{
    title: {
      type: String,
      required: [true, 'Publication title is required']
    },
    publisher: String,
    date: Date,
    url: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid URL']
    },
    readTime: String,
    category: String
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

module.exports = mongoose.model('Extracurricular', extracurricularSchema);