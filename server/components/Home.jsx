// components/Home.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight } from 'react-icons/fa';

const Home = ({ portfolioData, setActiveSection }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
              variants={itemVariants}
            >
              Hi, I'm <span className="text-blue-500">{portfolioData.user.name}</span>
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl text-gray-600 mb-6"
              variants={itemVariants}
            >
              {portfolioData.user.title}
            </motion.h2>
            
            <motion.p 
              className="text-gray-500 mb-8 max-w-lg"
              variants={itemVariants}
            >
              {portfolioData.user.bio}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-8"
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-600 transition-colors flex items-center"
                onClick={() => setActiveSection('projects')}
              >
                View My Work <FaArrowRight className="ml-2" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                onClick={() => setActiveSection('about')}
              >
                About Me
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="flex space-x-4"
              variants={itemVariants}
            >
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <FaTwitter />
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-2/5 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="relative">
              <motion.div 
                className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full overflow-hidden shadow-xl"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5,
                  ease: "easeInOut"
                }}
              >
                <img 
                  src={portfolioData.user.avatar} 
                  alt={portfolioData.user.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut"
                }}
              >
                <span className="text-white font-bold">5+</span>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut"
                }}
              >
                <span className="text-white text-sm font-bold">25+</span>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 -right-10 w-12 h-12 bg-red-400 rounded-lg flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2.5,
                  ease: "easeInOut"
                }}
              >
                <span className="text-white text-xs font-bold">100%</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;