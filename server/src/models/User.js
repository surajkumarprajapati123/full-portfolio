const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords do not match'
    }
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  avatar: {
    type: String,
    default: 'https://thumbs.dreamstime.com/b/lord-radha-krishna-beautiful-wallpaper-hindu-god-radha-krishna-wallpaper-colorful-background-163714569.jpg',
    validate: [validator.isURL, 'Please provide a valid URL']
  },
  contact: {
    phone: String,
    website: String,
    calendly: String
  },
  availability: {
    type: String,
    default: 'Open for opportunities'
  },
  about: {
    description: String
  },
  expertise: {
    specializations: [String],
    methodologies: [String],
    softSkills: [String]
  },
  interests: [{
    category: String,
    items: [String]
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profileCompletion: {
    type: Number,
    min: 0,
    max: 100,
    default: 30
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

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Update profile completion on save
userSchema.pre('save', function(next) {
  let completion = 30; // Base score
  
  // Add points based on filled fields
  if (this.name && this.name.length > 0) completion += 10;
  if (this.title && this.title.length > 0) completion += 10;
  if (this.bio && this.bio.length > 0) completion += 10;
  if (this.location && this.location.length > 0) completion += 10;
  if (this.avatar && this.avatar.length > 0) completion += 5;
  if (this.about && this.about.description && this.about.description.length > 0) completion += 5;
  if (this.expertise && this.expertise.specializations && this.expertise.specializations.length > 0) completion += 10;
  if (this.interests && this.interests.length > 0) completion += 10;
  
  this.profileCompletion = Math.min(completion, 100);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// To JSON method to remove password
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Virtual populate for related data
userSchema.virtual('languages', {
  ref: 'Language',
  foreignField: 'userId',
  localField: '_id'
});

userSchema.virtual('skills', {
  ref: 'Skill',
  foreignField: 'userId',
  localField: '_id'
});

userSchema.virtual('education', {
  ref: 'Education',
  foreignField: 'userId',
  localField: '_id'
});

userSchema.virtual('preferences', {
  ref: 'Preference',
  foreignField: 'userId',
  localField: '_id'
});

userSchema.virtual('social', {
  ref: 'Social',
  foreignField: 'userId',
  localField: '_id'
});

// Enable virtuals in JSON output
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', userSchema);