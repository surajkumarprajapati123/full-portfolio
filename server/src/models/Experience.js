const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true
  },
  period: {
    type: String,
    required: [true, 'Period is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  technologies: [String],
  achievements: [String],
  current: {
    type: Boolean,
    default: false
  },
  startDate: Date,
  endDate: Date,
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

// Index for sorting by date
experienceSchema.index({ userId: 1, startDate: -1 });

module.exports = mongoose.model('Experience', experienceSchema);