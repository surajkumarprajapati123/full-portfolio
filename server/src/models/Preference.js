const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  workType: {
    type: [String],
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
    default: ['Full-time']
  },
  remote: {
    type: Boolean,
    default: true
  },
  relocation: {
    type: String,
    enum: ['Yes', 'No', 'Maybe'],
    default: 'No'
  },
  relocationLocations: [String],
  industries: [String],
  contractTypes: [String],
  minSalary: Number,
  maxSalary: Number,
  currency: {
    type: String,
    default: 'USD'
  },
  noticePeriod: {
    type: Number,
    default: 30
  },
  jobTitles: [String],
  companySize: {
    type: [String],
    enum: ['Startup', 'Small', 'Medium', 'Large', 'Enterprise']
  },
  workCulture: [String],
  benefits: [String],
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

module.exports = mongoose.model('Preference', preferenceSchema);