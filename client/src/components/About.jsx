// components/About.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FaCode, 
  FaRocket, 
  FaUsers, 
  FaAward, 
  FaDownload,
  FaHeart,
  FaCoffee,
  FaLightbulb,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaStar,
  FaArrowRight,
  FaQuoteLeft,
  FaEye,
  FaTimes,
  FaFilePdf,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { SiReact, SiJavascript, SiTypescript, SiNodedotjs, SiPython, SiMongodb, SiDocker } from 'react-icons/si';

// Three.js Components
import FloatingTechIcons from './FloatingTechIcons';
import AnimatedParticles from './AnimatedParticles';
import InteractiveCube from './InteractiveCube';

const About = ({ portfolioData }) => {
  const [activeTab, setActiveTab] = useState('skills');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const simulateDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          const link = document.createElement('a');
          link.href = '/resume.pdf';
          link.download = `${portfolioData.user.name}_Resume.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const stats = [
    { icon: <FaCode className="text-2xl" />, number: "50+", label: "Projects", color: "from-blue-500 to-cyan-500" },
    { icon: <FaRocket className="text-2xl" />, number: "5+", label: "Years Exp", color: "from-purple-500 to-pink-500" },
    { icon: <FaUsers className="text-2xl" />, number: "30+", label: "Clients", color: "from-green-500 to-emerald-500" },
    { icon: <FaAward className="text-2xl" />, number: "15+", label: "Awards", color: "from-orange-500 to-red-500" }
  ];

  const timeline = [
    {
      year: "2021-Present",
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      description: "Leading development teams and architecting scalable solutions",
      icon: <FaRocket />,
      achievements: ["Led 10+ projects", "Mentored 5 junior developers", "Improved performance by 40%"]
    },
    {
      year: "2019-2021",
      title: "Full Stack Developer",
      company: "Digital Solutions LLC",
      description: "Built enterprise applications for various industries",
      icon: <FaCode />,
      achievements: ["Delivered 15+ projects", "Reduced load time by 60%", "Implemented CI/CD pipelines"]
    },
    {
      year: "2017-2019",
      title: "Junior Web Developer",
      company: "Web Crafters Agency",
      description: "Started career building responsive websites and web applications",
      icon: <FaGraduationCap />,
      achievements: ["Built 30+ websites", "Learned modern frameworks", "Contributed to open source"]
    }
  ];

  const techIcons = [
    { icon: <SiReact className="text-4xl" />, name: "React", color: "text-cyan-400", level: 95 },
    { icon: <SiJavascript className="text-4xl" />, name: "JavaScript", color: "text-yellow-400", level: 90 },
    { icon: <SiTypescript className="text-4xl" />, name: "TypeScript", color: "text-blue-500", level: 85 },
    { icon: <SiNodedotjs className="text-4xl" />, name: "Node.js", color: "text-green-500", level: 88 },
    { icon: <SiPython className="text-4xl" />, name: "Python", color: "text-yellow-500", level: 80 },
    { icon: <SiMongodb className="text-4xl" />, name: "MongoDB", color: "text-green-600", level: 75 },
    // { icon: <SiAmazonaws className="text-4xl" />, name: "AWS", color: "text-orange-500", level: 70 },
    { icon: <SiDocker className="text-4xl" />, name: "Docker", color: "text-blue-400", level: 65 }
  ];

  const tabs = [
    { id: 'skills', label: 'Skills', icon: <FaTools /> },
    { id: 'journey', label: 'Journey', icon: <FaBriefcase /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> }
  ];

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const ResumePreview = () => (
    <AnimatePresence>
      {isResumeOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsResumeOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Resume Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold">{portfolioData.user.name}</h2>
                  <p className="text-blue-100 text-xl">{portfolioData.user.title}</p>
                </div>
                <motion.button
                  onClick={() => setIsResumeOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-blue-200" />
                  <span>{portfolioData.user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-blue-200" />
                  <span>{portfolioData.user.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-blue-200" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaLinkedin className="text-blue-200" />
                  <span>linkedin.com/in/alexjohnson</span>
                </div>
              </div>
            </div>

            {/* Resume Content */}
            <div className="p-8 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Experience */}
                  <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Professional Experience</h3>
                    {timeline.map((exp, index) => (
                      <div key={index} className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-800">{exp.title}</h4>
                          <span className="text-blue-600 font-semibold">{exp.year}</span>
                        </div>
                        <p className="text-gray-600 font-medium mb-2">{exp.company}</p>
                        <p className="text-gray-500 text-sm mb-3">{exp.description}</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-center">
                              <FaStar className="text-yellow-500 text-xs mr-2" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </section>

                  {/* Education */}
                  <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">Education</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-800">Bachelor of Computer Science</h4>
                        <p className="text-gray-600">Tech University</p>
                        <p className="text-gray-500 text-sm">2013 - 2017 | GPA: 3.8/4.0</p>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Skills */}
                  <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">Technical Skills</h3>
                    <div className="space-y-3">
                      {portfolioData.about.skills.map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-blue-600">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Certifications */}
                  <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-orange-500 pb-2">Certifications</h3>
                    <div className="space-y-2 text-sm">
                      <div className="font-medium text-gray-700">AWS Certified Developer</div>
                      <div className="font-medium text-gray-700">React Professional Certification</div>
                      <div className="font-medium text-gray-700">Scrum Master Certified</div>
                    </div>
                  </section>

                  {/* Languages */}
                  <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-red-500 pb-2">Languages</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">English</span>
                        <span className="text-gray-500">Native</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Spanish</span>
                        <span className="text-gray-500">Professional</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Resume Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    onClick={simulateDownload}
                    disabled={isDownloading}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{downloadProgress}%</span>
                      </>
                    ) : (
                      <>
                        <FaDownload />
                        <span>Download PDF</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section ref={ref} className="relative min-h-screen py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
      <ResumePreview />
      
      {/* Three.js Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedParticles count={50} mousePosition={mousePosition} />
        <FloatingTechIcons mousePosition={mousePosition} />
        
        {/* CSS Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
          className="absolute top-40 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, scale, y }}
      >
        {/* Header Section with Interactive Cube */}
        <motion.div
          className="text-center mb-20 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Interactive Cube */}
          <div className="absolute -top-20 -right-20 w-64 h-64 opacity-10">
            <InteractiveCube mousePosition={mousePosition} />
          </div>

          <motion.div
            className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100 mb-6 relative z-10"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-gray-700 font-semibold">About Me</span>
          </motion.div>

          <motion.h1 
            className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Story</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Passionate developer crafting digital experiences that merge innovation with functionality
          </motion.p>

          {/* Resume Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => setIsResumeOpen(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 group"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="group-hover:scale-110 transition-transform"
              >
                <FaEye />
              </motion.div>
              <span>Preview Resume</span>
            </motion.button>
            
            <motion.button
              onClick={simulateDownload}
              disabled={isDownloading}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 group"
            >
              {isDownloading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  </motion.div>
                  <span>Downloading... {downloadProgress}%</span>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="group-hover:scale-110 transition-transform"
                  >
                    <FaDownload />
                  </motion.div>
                  <span>Download Resume</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Grid with Enhanced Animations */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-white shadow-inner flex items-center justify-center mb-4"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  <motion.h3 
                    className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                  </motion.h3>
                  
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>

                {/* Animated border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                  <div className="absolute inset-[2px] rounded-3xl bg-white/80 backdrop-blur-sm"></div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100"
                      initial={{ 
                        x: Math.random() * 100,
                        y: Math.random() * 100 
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10">
          {/* Left Column - Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-2xl border border-gray-100 relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaLightbulb className="text-white text-lg" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">My Journey</h2>
                    <p className="text-gray-600">From passion to profession</p>
                  </div>
                </div>

                <motion.p 
                  className="text-lg text-gray-700 leading-relaxed mb-8"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  {portfolioData.about.description}
                </motion.p>

                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex space-x-4 group relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      {/* Animated timeline connector */}
                      {index < timeline.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-purple-200"></div>
                      )}
                      
                      <motion.div 
                        className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                            {item.year}
                          </span>
                          <span className="text-lg font-bold text-gray-800">{item.title}</span>
                        </div>
                        <p className="text-gray-600 font-medium mb-1">{item.company}</p>
                        <p className="text-gray-500 text-sm">{item.description}</p>
                        
                        {/* Achievements */}
                        <motion.div 
                          className="mt-3 space-y-1"
                          initial={{ opacity: 0, height: 0 }}
                          whileHover={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.achievements.map((achievement, i) => (
                            <motion.div
                              key={i}
                              className="flex items-center text-xs text-gray-500"
                              initial={{ opacity: 0, x: -10 }}
                              whileHover={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <FaStar className="text-yellow-400 text-xs mr-1" />
                              {achievement}
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills & Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Tab Navigation */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-100 mb-8">
              <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex-1 relative overflow-hidden ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Animated background for active tab */}
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.icon}</span>
                    <span className="relative z-10">{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100"
              >
                {activeTab === 'skills' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-8">Technical Skills</h3>
                    <div className="space-y-6">
                      {portfolioData.about.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="group relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onHoverStart={() => setHoveredSkill(skill.name)}
                          onHoverEnd={() => setHoveredSkill(null)}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-gray-700 text-lg">{skill.name}</span>
                            <motion.span 
                              className="text-blue-600 font-bold text-lg"
                              animate={hoveredSkill === skill.name ? { scale: 1.2 } : { scale: 1 }}
                            >
                              {skill.level}%
                            </motion.span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden relative">
                            <motion.div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1.5, delay: 0.5 + index * 0.1, type: "spring" }}
                            >
                              {/* Shimmer effect */}
                              <motion.div
                                className="absolute inset-0 bg-white opacity-30"
                                animate={{
                                  x: hoveredSkill === skill.name ? ['0%', '100%'] : '0%',
                                }}
                                transition={{
                                  duration: 1,
                                  repeat: hoveredSkill === skill.name ? Infinity : 0,
                                  ease: "easeInOut"
                                }}
                              />
                            </motion.div>
                            
                            {/* Progress animation dots */}
                            {hoveredSkill === skill.name && (
                              <motion.div
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tech Icons Grid */}
                    <div className="mt-12">
                      <h4 className="text-lg font-semibold text-gray-800 mb-6">Technologies I Love</h4>
                      <div className="grid grid-cols-4 gap-4">
                        {techIcons.map((tech, index) => (
                          <motion.div
                            key={index}
                            className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl group cursor-pointer relative overflow-hidden"
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                          >
                            {/* Hover background effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                            
                            <motion.div
                              className={`${tech.color} mb-2 relative z-10`}
                              whileHover={{ 
                                rotate: 360,
                                transition: { duration: 0.5 }
                              }}
                            >
                              {tech.icon}
                            </motion.div>
                            <span className="text-xs font-medium text-gray-600 relative z-10">{tech.name}</span>
                            
                            {/* Level indicator */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                                style={{ width: `${tech.level}%` }}
                              ></div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Other tabs remain similar but with enhanced animations */}
                {activeTab === 'journey' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Professional Journey</h3>
                    <div className="space-y-6">
                      {timeline.map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 group hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                          whileHover={{ x: 10 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {/* Animated background on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                          
                          <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-2 relative z-10"></div>
                          <div className="flex-1 relative z-10">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-gray-800 text-lg">{item.title}</h4>
                              <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                                {item.year}
                              </span>
                            </div>
                            <p className="text-gray-600 font-medium mb-1">{item.company}</p>
                            <p className="text-gray-500">{item.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'education' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Education & Certifications</h3>
                    <div className="space-y-6">
                      {[
                        {
                          degree: "Bachelor of Computer Science",
                          school: "Tech University",
                          year: "2013-2017",
                          description: "Specialized in Software Engineering and Web Technologies",
                          icon: "🎓"
                        },
                        {
                          degree: "AWS Certified Developer",
                          school: "Amazon Web Services",
                          year: "2020",
                          description: "Associate level certification in cloud development",
                          icon: "☁️"
                        },
                        {
                          degree: "React Advanced Patterns",
                          school: "Frontend Masters",
                          year: "2021",
                          description: "Advanced React patterns and performance optimization",
                          icon: "⚛️"
                        }
                      ].map((edu, index) => (
                        <motion.div
                          key={index}
                          className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 group hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          whileHover={{ y: -5 }}
                        >
                          {/* Animated background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                          
                          <div className="flex items-start justify-between mb-3 relative z-10">
                            <div className="flex items-center space-x-3">
                              <motion.span 
                                className="text-2xl"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                {edu.icon}
                              </motion.span>
                              <div>
                                <h4 className="font-bold text-gray-800 text-lg">{edu.degree}</h4>
                                <p className="text-gray-600 font-medium">{edu.school}</p>
                              </div>
                            </div>
                            <span className="text-sm text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">
                              {edu.year}
                            </span>
                          </div>
                          <p className="text-gray-500 relative z-10">{edu.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Enhanced Quote Section */}
        <motion.div
          className="mt-20 text-center relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          {/* Floating particles around quote */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
                initial={{ 
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 200 - 100 
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-gray-100 max-w-4xl mx-auto relative z-10">
            <motion.div
              animate={floatingAnimation}
            >
              <FaQuoteLeft className="text-4xl text-blue-500 mx-auto mb-6 opacity-50" />
            </motion.div>
            <motion.blockquote 
              className="text-2xl lg:text-3xl font-light text-gray-700 mb-8 leading-relaxed"
              animate={floatingAnimation}
            >
              "Code is like humor. When you have to explain it, it's bad."
            </motion.blockquote>
            <motion.div
              className="flex items-center justify-center space-x-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <div>
                <p className="font-semibold text-gray-800">Cory House</p>
                <p className="text-gray-500">Software Architect</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
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
            
            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{ 
                    x: Math.random() * 400,
                    y: Math.random() * 200 
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <motion.h3 
                className="text-3xl lg:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                Ready to Create Something Amazing?
              </motion.h3>
              <motion.p 
                className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                Let's collaborate to bring your vision to life with cutting-edge technology and innovative solutions.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 group"
                  onClick={() => window.location.href = `mailto:${portfolioData.user.email}`}
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="group-hover:scale-110"
                  >
                    <FaRocket />
                  </motion.span>
                  <span>Start a Project</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-3 group"
                  onClick={() => setIsResumeOpen(true)}
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    className="group-hover:scale-110"
                  >
                    <FaDownload />
                  </motion.span>
                  <span>Download CV</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;