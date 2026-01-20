const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  language: {
    type: String,
    required: [true, 'Language name is required'],
    trim: true
  },
  proficiency: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Native'],
    default: 'Intermediate'
  },
  level: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  icon: {
    type: String,
    default: ''
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

module.exports = mongoose.model('Language', languageSchema);