const mongoose = require('mongoose');
const validator = require('validator');

const photoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'Photo URL is required'],
    validate: [validator.isURL, 'Please provide a valid URL']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['profile', 'work', 'casual', 'team', 'speaking', 'event'],
    default: 'profile'
  },
  featured: {
    type: Boolean,
    default: false
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  event: String
});

const gallerySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  profilePhotos: [photoSchema],
  projectPhotos: [photoSchema],
  eventPhotos: [photoSchema],
  galleryStats: {
    totalPhotos: {
      type: Number,
      default: 0
    },
    totalVideos: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    featuredCount: {
      type: Number,
      default: 0
    }
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

// Update stats before saving
gallerySchema.pre('save', function(next) {
  this.galleryStats.totalPhotos = 
    this.profilePhotos.length + 
    this.projectPhotos.length + 
    this.eventPhotos.length;
  
  this.galleryStats.featuredCount = 
    this.profilePhotos.filter(p => p.featured).length +
    this.projectPhotos.filter(p => p.featured).length +
    this.eventPhotos.filter(p => p.featured).length;
  
  this.galleryStats.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('Gallery', gallerySchema);