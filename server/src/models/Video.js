const mongoose = require('mongoose');
const validator = require('validator');

const videoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectDemos: [{
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: String,
    youtubeId: {
      type: String,
      required: [true, 'YouTube ID is required']
    },
    thumbnail: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid URL']
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    duration: String,
    views: String,
    uploadDate: Date,
    featured: {
      type: Boolean,
      default: false
    }
  }],
  techTalks: [{
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: String,
    youtubeId: {
      type: String,
      required: [true, 'YouTube ID is required']
    },
    thumbnail: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid URL']
    },
    event: String,
    duration: String,
    views: String,
    uploadDate: Date,
    featured: {
      type: Boolean,
      default: false
    }
  }],
  tutorials: [{
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: String,
    youtubeId: {
      type: String,
      required: [true, 'YouTube ID is required']
    },
    thumbnail: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid URL']
    },
    duration: String,
    views: String,
    uploadDate: Date,
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate'
    },
    featured: {
      type: Boolean,
      default: false
    }
  }],
  youtubeChannel: {
    url: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid URL']
    },
    subscribers: String,
    totalViews: String,
    joinDate: Date,
    description: String
  },
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

module.exports = mongoose.model('Video', videoSchema);