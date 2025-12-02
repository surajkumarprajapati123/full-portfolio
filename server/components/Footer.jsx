// components/Footer.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = ({ portfolioData }) => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold">{portfolioData.user.name}</h3>
            <p className="text-gray-400 mt-2">{portfolioData.user.title}</p>
          </motion.div>
          
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.a 
              href="#" 
              className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              href="#" 
              className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a 
              href="#" 
              className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <FaTwitter />
            </motion.a>
            <motion.a 
              href={`mailto:${portfolioData.user.email}`}
              className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <FaEnvelope />
            </motion.a>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>© {new Date().getFullYear()} {portfolioData.user.name}. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;