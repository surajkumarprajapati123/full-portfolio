// components/Experience.js
import React from 'react';
import { motion } from 'framer-motion';

const Experience = ({ portfolioData }) => {
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Experience
        </motion.h2>
        
        <motion.div 
          className="w-24 h-1 bg-blue-500 mx-auto mb-12"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {portfolioData.experience.map((exp, index) => (
            <motion.div 
              key={exp.id}
              className="flex flex-col md:flex-row mb-12"
              variants={itemVariants}
            >
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                  <p className="text-blue-500 font-medium mt-1">{exp.company}</p>
                  <p className="text-gray-500 text-sm mt-2">{exp.period}</p>
                </div>
              </div>
              
              <div className="md:w-2/3 md:pl-8 relative">
                {/* Timeline connector */}
                {index < portfolioData.experience.length - 1 && (
                  <div className="hidden md:block absolute left-0 top-8 bottom-0 w-0.5 bg-blue-200"></div>
                )}
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <p className="text-gray-600 mb-4">
                    {exp.description}
                  </p>
                  
                  <h4 className="font-bold text-gray-800 mb-2">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-start text-gray-600"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center shadow-xl max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-4">Interested in working together?</h3>
          <p className="mb-6">
            I'm always open to discussing new opportunities and challenges.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold shadow-md"
            onClick={() => window.location.href = `mailto:${portfolioData.user.email}`}
          >
            Let's Connect
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;