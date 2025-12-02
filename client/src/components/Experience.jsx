// components/Experience.js - UPDATED
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FaBriefcase, 
  FaRocket, 
  FaAward, 
  FaCode, 
  FaUsers, 
  FaChartLine,
  FaGraduationCap,
  FaLightbulb,
  FaStar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDownload,
  FaArrowRight,
  FaQuoteLeft,
  FaTrophy,
  FaCertificate,
  FaCheckCircle
} from 'react-icons/fa';

const Experience = ({ portfolioData }) => {
  const [activeCompany, setActiveCompany] = useState(0);
  const [activeAchievementTab, setActiveAchievementTab] = useState('awards');
  const [hoveredAchievement, setHoveredAchievement] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  // Enhanced stats using portfolio data
  const stats = [
    { 
      icon: <FaBriefcase className="text-2xl" />, 
      number: `${portfolioData.experience?.length || 3}+`, 
      label: "Roles", 
      color: "from-blue-500 to-cyan-500" 
    },
    { 
      icon: <FaRocket className="text-2xl" />, 
      number: `${portfolioData.projects?.length || 6}+`, 
      label: "Projects", 
      color: "from-purple-500 to-pink-500" 
    },
    { 
      icon: <FaUsers className="text-2xl" />, 
      number: `${portfolioData.achievements?.milestones?.[1]?.metric || '30+'}`.replace('+', ''), 
      label: "Client Success", 
      color: "from-green-500 to-emerald-500" 
    },
    { 
      icon: <FaAward className="text-2xl" />, 
      number: `${portfolioData.achievements?.awards?.length || 4}+`, 
      label: "Awards", 
      color: "from-orange-500 to-red-500" 
    }
  ];

  // Skills from portfolio data
  const skills = portfolioData.about?.skills?.map(skill => ({
    name: skill.name,
    level: skill.level,
    color: skill.level > 80 ? "from-green-500 to-emerald-500" : 
           skill.level > 70 ? "from-blue-500 to-cyan-500" : 
           "from-purple-500 to-pink-500"
  })) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Achievement tabs data
  const achievementTabs = [
    { id: 'awards', label: 'Awards', icon: <FaTrophy />, data: portfolioData.achievements?.awards },
    { id: 'certifications', label: 'Certifications', icon: <FaCertificate />, data: portfolioData.achievements?.certifications },
    { id: 'milestones', label: 'Milestones', icon: <FaChartLine />, data: portfolioData.achievements?.milestones }
  ];

  return (
    <section ref={ref} className="relative min-h-screen py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, scale }}
      >
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full shadow-lg border border-white/20 mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <FaChartLine className="text-white mr-3" />
            <span className="text-white font-semibold">Professional Journey</span>
          </motion.div>

          <motion.h1 
            className="text-5xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Work <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Experience</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            A journey of growth, innovation, and continuous learning in the world of technology
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-white/10 shadow-inner flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-3xl lg:text-4xl font-bold text-white mb-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                  </motion.h3>
                  
                  <p className="text-gray-300 font-medium">{stat.label}</p>
                </div>

                {/* Animated border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                  <div className="absolute inset-[2px] rounded-3xl bg-slate-900"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Company Selector */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FaBriefcase className="mr-3 text-cyan-400" />
                Career Journey
              </h3>
              
              <div className="space-y-3">
                {portfolioData.experience?.map((exp, index) => (
                  <motion.button
                    key={exp.id}
                    onClick={() => setActiveCompany(index)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm border ${
                      activeCompany === index
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 shadow-lg'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-lg">{exp.company}</h4>
                        <p className="text-gray-300 text-sm">{exp.role}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <FaCalendarAlt className="text-cyan-400 text-xs" />
                          <span className="text-gray-400 text-xs">{exp.period}</span>
                        </div>
                      </div>
                      {activeCompany === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-cyan-400 rounded-full"
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Skills Progress */}
            <motion.div
              className="mt-8 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FaCode className="mr-3 text-purple-400" />
                Core Skills
              </h3>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium text-sm">{skill.name}</span>
                      <span className="text-cyan-400 font-bold text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: 1 + index * 0.1, type: "spring" }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white opacity-30"
                          animate={{
                            x: ['0%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Experience Details */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCompany}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 h-full"
              >
                {portfolioData.experience?.[activeCompany] && (
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <motion.h2 
                            className="text-3xl lg:text-4xl font-bold text-white mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {portfolioData.experience[activeCompany].role}
                          </motion.h2>
                          <motion.p 
                            className="text-2xl text-cyan-400 font-semibold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            {portfolioData.experience[activeCompany].company}
                          </motion.p>
                        </div>
                        <motion.div
                          className="text-right"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className="flex items-center space-x-2 text-gray-300 mb-1">
                            <FaCalendarAlt className="text-cyan-400" />
                            <span>{portfolioData.experience[activeCompany].period}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-300">
                            <FaMapMarkerAlt className="text-purple-400" />
                            <span>Remote / Hybrid</span>
                          </div>
                        </motion.div>
                      </div>

                      <motion.p 
                        className="text-lg text-gray-300 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {portfolioData.experience[activeCompany].description}
                      </motion.p>
                    </div>

                    {/* Achievements */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <FaAward className="mr-3 text-yellow-400" />
                        Key Achievements
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {portfolioData.experience[activeCompany].achievements?.map((achievement, index) => (
                          <motion.div
                            key={index}
                            className="group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            onHoverStart={() => setHoveredAchievement(index)}
                            onHoverEnd={() => setHoveredAchievement(null)}
                          >
                            <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                              hoveredAchievement === index
                                ? 'bg-cyan-500/10 border-cyan-400/50 shadow-lg'
                                : 'bg-white/5 border-white/10'
                            }`}>
                              <div className="flex items-start space-x-3">
                                <motion.div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    hoveredAchievement === index
                                      ? 'bg-cyan-400 text-white'
                                      : 'bg-white/10 text-cyan-400'
                                  } transition-colors duration-300`}
                                  animate={hoveredAchievement === index ? { scale: 1.1 } : { scale: 1 }}
                                >
                                  <FaStar className="text-xs" />
                                </motion.div>
                                <p className="text-gray-300 leading-relaxed">{achievement}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies Used */}
                    {portfolioData.experience[activeCompany].technologies && (
                      <motion.div
                        className="mt-8 pt-6 border-t border-white/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <h4 className="text-lg font-semibold text-white mb-4">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {portfolioData.experience[activeCompany].technologies.map((tech, index) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.9 + index * 0.1 }}
                              className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Achievements Section */}
        {portfolioData.achievements && (
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Achievements & Recognition</h3>
              
              {/* Achievement Tabs */}
              <div className="flex space-x-4 mb-8 justify-center">
                {achievementTabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveAchievementTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeAchievementTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Achievement Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAchievementTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {achievementTabs
                    .find(tab => tab.id === activeAchievementTab)
                    ?.data?.map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                            {activeAchievementTab === 'awards' ? (
                              <FaTrophy className="text-yellow-400 text-xl" />
                            ) : activeAchievementTab === 'certifications' ? (
                              <FaCertificate className="text-green-400 text-xl" />
                            ) : (
                              <FaChartLine className="text-cyan-400 text-xl" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-2">
                              {item.title || item.name || item.metric}
                            </h4>
                            <p className="text-gray-300 text-sm mb-2">
                              {item.issuer || item.description}
                            </p>
                            <div className="flex items-center space-x-2 text-gray-400 text-xs">
                              {item.date && (
                                <>
                                  <FaCalendarAlt />
                                  <span>{item.date}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Quote Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl p-12 backdrop-blur-sm border border-white/10 text-center">
            <FaQuoteLeft className="text-4xl text-cyan-400 mx-auto mb-6 opacity-50" />
            <motion.blockquote 
              className="text-2xl lg:text-3xl font-light text-white mb-8 leading-relaxed"
              animate={floatingAnimation}
            >
              "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
            </motion.blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full"></div>
              <div>
                <p className="font-semibold text-white">Steve Jobs</p>
                <p className="text-cyan-300">Co-founder of Apple Inc.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <div className="bg-gradient-to-r from-cyan-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full"
              animate={{
                scale: [1.5, 1, 1.5],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Build the Future Together?</h3>
              <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
                Let's combine your vision with my expertise to create something extraordinary that drives real results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                  onClick={() => window.location.href = `mailto:${portfolioData.user.email}`}
                >
                  <FaRocket />
                  <span>Start a Conversation</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <FaDownload />
                  <span>Download Resume</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;