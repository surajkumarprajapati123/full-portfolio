const mongoose = require('mongoose');
const validator = require('validator');

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  banner: {
    type: String,
    validate: [validator.isURL, 'Please provide a valid URL']
  },
  screenshot: {
    type: String,
    validate: [validator.isURL, 'Please provide a valid URL']
  },
  technologies: [String],
  category: {
    type: String,
    enum: ['Full Stack', 'Frontend', 'Backend', 'Mobile', 'Design', 'DevOps'],
    default: 'Full Stack'
  },
  liveUrl: {
    type: String,
    validate: [validator.isURL, 'Please provide a valid URL']
  },
  githubUrl: {
    type: String,
    validate: [validator.isURL, 'Please provide a valid URL']
  },
  appStoreUrl: {
    type: String,
    validate: [validator.isURL, 'Please provide a valid URL']
  },
  playStoreUrl: {
    type: String,
    validate: [validator.isURL, 'Please provide a valid URL']
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Planning', 'Development', 'Testing', 'Live Production', 'Maintenance', 'Completed'],
    default: 'Development'
  },
  launchDate: Date,
  metrics: {
    developmentTime: String,
    teamSize: String,
    status: String,
    users: String,
    rating: String,
    teams: String,
    tasksManaged: String,
    downloads: String
  },
  details: {
    overview: String,
    challenges: String,
    solution: String,
    features: [String]
  },
  testimonials: [{
    name: String,
    position: String,
    company: String,
    avatar: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid URL']
    },
    content: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    project: String
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

// Index for faster queries
projectSchema.index({ userId: 1, featured: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });

module.exports = mongoose.model('Project', projectSchema);