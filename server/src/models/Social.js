const mongoose = require('mongoose');
const validator = require('validator');

const socialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  github: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid GitHub URL'
    }
  },
  linkedin: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid LinkedIn URL'
    }
  },
  twitter: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid Twitter URL'
    }
  },
  dribbble: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid Dribbble URL'
    }
  },
  codepen: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid CodePen URL'
    }
  },
  medium: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid Medium URL'
    }
  },
  stackoverflow: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid StackOverflow URL'
    }
  },
  behance: String,
  gitlab: String,
  youtube: String,
  instagram: String,
  facebook: String,
  personalWebsite: String,
  blog: String,
  otherLinks: [{
    platform: String,
    url: String
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

module.exports = mongoose.model('Social', socialSchema);