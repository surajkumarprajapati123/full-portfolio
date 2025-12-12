// components/Home.js - FIXED VERSION
import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaArrowRight, 
  FaDownload,
  FaStar,
  FaRocket,
  FaCode,
  FaPaintBrush,
  FaMobile,
  FaServer,
  FaCloud,
  FaDribbble,
  FaCodepen,
  FaMedium,
  FaStackOverflow,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaRegGem,
  FaFire,
  FaCrown,
  FaBolt
} from 'react-icons/fa';

// Three.js components - These MUST be used inside Canvas
import GlowingOrbs from './GlowingOrbs';

const Home = ({ portfolioData, setActiveSection }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const rotateProgress = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const springScale = useSpring(scaleProgress, { damping: 20, stiffness: 100 });
  const springRotate = useSpring(rotateProgress, { damping: 20, stiffness: 100 });

  useEffect(() => {
    setIsVisible(true);
    
    // Testimonial carousel
    const interval = setInterval(() => {
      if (portfolioData.testimonials?.length > 0) {
        setCurrentTestimonial((prev) => (prev + 1) % portfolioData.testimonials.length);
      }
    }, 5000);
    
    // Mouse parallax
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 100,
        y: (e.clientY / window.innerHeight - 0.5) * 100
      });
    };

    // Scroll progress
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrolled = (scrollTop / (docHeight - winHeight)) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    setTimeout(() => setThreeLoaded(true), 1500);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [portfolioData.testimonials]);

  // Stats
  const stats = [
    { 
      number: `${portfolioData.projects?.length || 8}+`, 
      label: "Projects Completed", 
      icon: <FaRocket />, 
      color: "from-cyan-500 to-blue-500",
    },
    { 
      number: `${portfolioData.experience?.length || 5}+`, 
      label: "Years Experience", 
      icon: <FaCode />, 
      color: "from-green-500 to-emerald-500",
    },
    { 
      number: "98%", 
      label: "Client Satisfaction", 
      icon: <FaStar />, 
      color: "from-yellow-500 to-orange-500",
    },
    { 
      number: "30+", 
      label: "Technologies", 
      icon: <FaPaintBrush />, 
      color: "from-purple-500 to-pink-500",
    }
  ];

  // Social Links
  const socialLinks = [
    { icon: <FaGithub />, href: portfolioData.user.social?.github || "#", label: "GitHub" },
    { icon: <FaLinkedin />, href: portfolioData.user.social?.linkedin || "#", label: "LinkedIn" },
    { icon: <FaTwitter />, href: portfolioData.user.social?.twitter || "#", label: "Twitter" },
    { icon: <FaDribbble />, href: portfolioData.user.social?.dribbble || "#", label: "Dribbble" },
    { icon: <FaCodepen />, href: portfolioData.user.social?.codepen || "#", label: "CodePen" },
  ];

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
    hidden: { y: 60, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative"
    >
      {/* FIXED: Three.js Background wrapped in Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 30], fov: 75 }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          {/* Your GlowingOrbs component */}
          <GlowingOrbs 
            count={25}
            radius={15}
            colors={['#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#10B981']}
            speed={0.5}
            size={0.15}
            opacity={0.6}
          />
        </Canvas>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center pt-16 relative z-20">
        <div className="container mx-auto px-4 py-12 relative z-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <motion.div 
              className="lg:w-1/2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Status Badge */}
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-8 shadow-2xl"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full mr-3"
                  animate={{ 
                    scale: [1, 1.4, 1],
                    boxShadow: ["0 0 0px #10B981", "0 0 10px #10B981", "0 0 0px #10B981"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white/90 font-semibold text-lg">
                  {portfolioData.user.availability || "Available for new projects"}
                </span>
              </motion.div>

              {/* Title */}
              <motion.div 
                className="mb-6"
                variants={itemVariants}
              >
                <h1 className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-2 leading-tight">
                  Hi, I'm {portfolioData.user.name.split(' ')[0]}
                </h1>
                <motion.h2 
                  className="text-2xl lg:text-3xl text-white/70 font-light"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {portfolioData.user.title}
                </motion.h2>
              </motion.div>
              
              {/* Bio */}
              <motion.div 
                className="mb-8 relative"
                variants={itemVariants}
              >
                <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
                  {portfolioData.user.bio}
                </p>
                
                <motion.div
                  className="h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mt-4"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1 }}
                />
              </motion.div>

              {/* Contact Info */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                variants={itemVariants}
              >
                <motion.div 
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <FaMapMarkerAlt className="text-cyan-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Location</p>
                      <p className="text-white font-medium">{portfolioData.user.location}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <FaEnvelope className="text-purple-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Email</p>
                      <p className="text-white font-medium">{portfolioData.user.email}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                variants={itemVariants}
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    boxShadow: "0 20px 40px rgba(6,182,212,0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl relative overflow-hidden group"
                  onClick={() => setActiveSection('projects')}
                >
                  <span className="relative z-10 flex items-center">
                    Explore Projects 
                    <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    boxShadow: "0 20px 40px rgba(139,92,246,0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                  onClick={() => setActiveSection('experience')}
                >
                  <span className="flex items-center">
                    View Experience
                  </span>
                </motion.button>
              </motion.div>
              
              {/* Social Links */}
              <motion.div 
                className="flex flex-wrap gap-3"
                variants={itemVariants}
              >
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 border border-white/20 group-hover:border-white/40 transition-all duration-300 text-xl">
                      {social.icon}
                    </div>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      <span className="text-white text-sm">{social.label}</span>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Right Content - Avatar/Image */}
            <motion.div 
              className="lg:w-2/5 relative"
              style={{
                scale: springScale,
                rotate: springRotate,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full" />
                
                {/* Avatar placeholder */}
                <div className="relative z-10 w-full aspect-square rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <span className="text-white/40 text-6xl">👨‍💻</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className={`text-4xl mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;