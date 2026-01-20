const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Gallery = require('../models/Gallery');
const Video = require('../models/Video');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Achievement = require('../models/Achievement');
const Extracurricular = require('../models/Extracurricular');

// Load environment variables
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const portfolioData = {
  // Your data from the question goes here
  // (Copy the entire portfolioData object from your question)
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    
    await Gallery.deleteMany({});
    await Video.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Achievement.deleteMany({});
    await Extracurricular.deleteMany({});

    console.log('🗑️  Database cleared');

    // Create user
    const user = new User(portfolioData.user);
    await user.save();
    console.log('✅ User created');

    // Create gallery
    const gallery = new Gallery({
      userId: user._id,
      ...portfolioData.gallery
    });
    await gallery.save();
    console.log('✅ Gallery created');

    // Create video
    const video = new Video({
      userId: user._id,
      ...portfolioData.videos
    });
    await video.save();
    console.log('✅ Videos created');

    // Create projects
    for (const projectData of portfolioData.projects) {
      const project = new Project({
        userId: user._id,
        ...projectData
      });
      await project.save();
    }
    console.log(`✅ ${portfolioData.projects.length} projects created`);

    // Create experiences
    for (const expData of portfolioData.experience) {
      const experience = new Experience({
        userId: user._id,
        ...expData
      });
      await experience.save();
    }
    console.log(`✅ ${portfolioData.experience.length} experiences created`);

    // Create achievements
    const achievement = new Achievement({
      userId: user._id,
      ...portfolioData.achievements
    });
    await achievement.save();
    console.log('✅ Achievements created');

    // Create extracurricular
    const extracurricular = new Extracurricular({
      userId: user._id,
      ...portfolioData.extracurricular
    });
    await extracurricular.save();
    console.log('✅ Extracurricular activities created');

    console.log('🎉 Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();