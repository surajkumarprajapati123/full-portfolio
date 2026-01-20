const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  degree: {
    type: String,
    required: [true, 'Degree name is required'],
    trim: true
  },
  institution: {
    type: String,
    required: [true, 'Institution name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: Date,
  currentlyStudying: {
    type: Boolean,
    default: false
  },
  gpa: String,
  honors: [String],
  relevantCourses: [String],
  activities: [String],
  certification: {
    type: Boolean,
    default: false
  },
  certificateUrl: String,
  description: {
    type: String,
    maxlength: 500
  },
  skillsGained: [String],
  isVisible: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
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

module.exports = mongoose.model('Education', educationSchema);