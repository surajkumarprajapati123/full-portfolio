// components/ProjectView.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const ProjectView = ({ project, onBack }) => {
  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center text-blue-500 font-medium mb-8 hover:text-blue-600 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Projects
        </motion.button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl mb-6">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-auto"
              />
            </div>
            
            <div className="flex space-x-4">
              <motion.a
                href={project.liveUrl}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-blue-600 transition-colors"
              >
                <FaExternalLinkAlt className="mr-2" />
                Live Demo
              </motion.a>
              
              <motion.a
                href={project.githubUrl}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-gray-900 transition-colors"
              >
                <FaGithub className="mr-2" />
                Source Code
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-6">
              <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                {project.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-4">
                {project.title}
              </h1>
              <p className="text-gray-600 text-lg">
                {project.description}
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span 
                    key={tech}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Project Overview</h3>
                <p className="text-gray-600">
                  {project.details.overview}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Challenges</h3>
                <p className="text-gray-600">
                  {project.details.challenges}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Solution</h3>
                <p className="text-gray-600">
                  {project.details.solution}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.details.features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectView;