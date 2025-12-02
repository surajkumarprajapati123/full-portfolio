// components/Projects.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FaExternalLinkAlt, 
  FaGithub, 
  FaFilter, 
  FaRocket, 
  FaCode, 
  FaMobile, 
  FaServer,
  FaEye,
  FaStar,
  FaHeart,
  FaLayerGroup,
  FaPlay,
  FaPause
} from 'react-icons/fa';

const Projects = ({ portfolioData, onProjectSelect }) => {
  const [filter, setFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  const categories = ['All', ...new Set(portfolioData.projects.map(project => project.category))];
  
  const filteredProjects = filter === 'All' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(project => project.category === filter);

  // Auto-rotate featured projects
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setCurrentFeatured((prev) => (prev + 1) % portfolioData.projects.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [autoRotate, portfolioData.projects.length]);

  const featuredProjects = portfolioData.projects.slice(0, 3);

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
    hidden: { y: 50, opacity: 0, scale: 0.8 },
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

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Full Stack': return <FaServer className="text-lg" />;
      case 'Frontend': return <FaCode className="text-lg" />;
      case 'Mobile': return <FaMobile className="text-lg" />;
      default: return <FaLayerGroup className="text-lg" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Full Stack': return 'from-purple-500 to-pink-500';
      case 'Frontend': return 'from-blue-500 to-cyan-500';
      case 'Mobile': return 'from-green-500 to-emerald-500';
      default: return 'from-orange-500 to-red-500';
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 overflow-hidden">
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
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
            <FaRocket className="text-white mr-3" />
            <span className="text-white font-semibold">My Portfolio</span>
          </motion.div>

          <motion.h1 
            className="text-5xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Creative <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Explore my journey through code - from innovative web applications to cutting-edge mobile solutions
          </motion.p>
        </motion.div>

        {/* Featured Projects Carousel */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
              >
                {autoRotate ? <FaPause /> : <FaPlay />}
              </button>
              <div className="flex space-x-2">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeatured(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentFeatured ? 'bg-blue-400 w-8' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-96 rounded-3xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeatured}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="relative h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl overflow-hidden border border-white/10">
                  <img 
                    src={featuredProjects[currentFeatured].image} 
                    alt={featuredProjects[currentFeatured].title}
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <motion.span 
                          className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {getCategoryIcon(featuredProjects[currentFeatured].category)}
                          <span className="ml-2">{featuredProjects[currentFeatured].category}</span>
                        </motion.span>
                        <motion.h3 
                          className="text-3xl lg:text-4xl font-bold text-white mb-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {featuredProjects[currentFeatured].title}
                        </motion.h3>
                        <motion.p 
                          className="text-gray-300 text-lg max-w-2xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {featuredProjects[currentFeatured].description}
                        </motion.p>
                      </div>
                      
                      <motion.button
                        onClick={() => onProjectSelect(featuredProjects[currentFeatured])}
                        className="bg-white text-gray-900 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaEye />
                        <span>View Project</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <FaFilter className="text-white text-xl" />
              <h2 className="text-2xl font-bold text-white">Filter Projects</h2>
            </div>
            <span className="text-gray-300">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold backdrop-blur-sm border transition-all duration-300 ${
                  filter === category
                    ? `bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-2xl border-transparent`
                    : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20 hover:text-white'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                variants={itemVariants}
                className="group relative"
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ y: -10 }}
              >
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 h-full">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                    
                    {/* Hover Overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-purple-600/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    >
                      <div className="flex space-x-4">
                        <motion.button
                          onClick={() => onProjectSelect(project)}
                          className="bg-white text-gray-900 px-4 py-2 rounded-xl font-semibold flex items-center space-x-2"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaEye />
                          <span>Details</span>
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${
                        project.category === 'Full Stack' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                        project.category === 'Frontend' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                        'bg-green-500/20 text-green-300 border-green-500/30'
                      }`}>
                        {getCategoryIcon(project.category)}
                        <span className="ml-1">{project.category}</span>
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <motion.div
                        className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={hoveredProject === project.id ? { x: 0 } : { x: 10 }}
                      >
                        <motion.a
                          href={project.liveUrl}
                          className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaExternalLinkAlt className="text-sm" />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaGithub className="text-sm" />
                        </motion.a>
                      </motion.div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + techIndex * 0.1 }}
                          className="px-3 py-1 bg-white/10 rounded-lg text-xs text-gray-300 backdrop-blur-sm border border-white/10"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <motion.div
                          className="flex items-center space-x-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <FaStar className="text-yellow-400" />
                          <span>4.9</span>
                        </motion.div>
                        <motion.div
                          className="flex items-center space-x-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <FaHeart className="text-red-400" />
                          <span>24</span>
                        </motion.div>
                      </div>
                      
                      <motion.button
                        onClick={() => onProjectSelect(project)}
                        className="text-blue-400 font-semibold text-sm flex items-center space-x-2 group/btn"
                        whileHover={{ x: 5 }}
                      >
                        <span>Explore More</span>
                        <motion.span
                          animate={floatingAnimation}
                        >
                          →
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Animated Border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${getCategoryColor(project.category)} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                    <div className="absolute inset-[2px] rounded-3xl bg-gray-900"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 backdrop-blur-sm border border-white/10">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's collaborate to create something extraordinary. Your vision, my expertise - together we can build amazing digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center space-x-3"
                onClick={() => window.location.href = `mailto:${portfolioData.user.email}`}
              >
                <FaRocket />
                <span>Start a Project</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-3"
                onClick={() => setFilter('All')}
              >
                <FaCode />
                <span>View All Projects</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;