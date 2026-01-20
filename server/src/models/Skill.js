const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true
  },
  level: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Technical', 'Soft', 'Design', 'Management', 'Other']
  },
  icon: {
    type: String,
    default: ''
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
    default: 0
  },
  description: {
    type: String,
    maxlength: 200
  },
  tags: [String],
  isFeatured: {
    type: Boolean,
    default: false
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

// Index for faster queries
skillSchema.index({ userId: 1, category: 1 });

module.exports = mongoose.model('Skill', skillSchema);