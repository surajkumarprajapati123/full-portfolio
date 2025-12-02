// components/Home.js - UPDATED
import React, { useState, useEffect, useRef } from 'react';
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
  FaEnvelope
} from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiReact, SiNodedotjs, SiPython, SiFramer, SiThreedotjs, SiNextdotjs, SiVuedotjs, SiGraphql, SiDocker } from 'react-icons/si';

// Three.js components remain the same
import ThreeScene from './ThreeScene';
import FloatingParticles from './FloatingParticles';
import AnimatedSphere from './AnimatedSphere';
import InteractiveParticles from './InteractiveCube';
import TechOrbit from './TechOrbit';

const Home = ({ portfolioData, setActiveSection }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [threeLoaded, setThreeLoaded] = useState(false);
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
    const interval = setInterval(() => {
      if (portfolioData.testimonials) {
        setCurrentTestimonial((prev) => (prev + 1) % portfolioData.testimonials.length);
      }
    }, 5000);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 50,
        y: (e.clientY / window.innerHeight - 0.5) * 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    setTimeout(() => setThreeLoaded(true), 1000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [portfolioData.testimonials]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Use actual testimonials from portfolioData
  const testimonials = portfolioData.testimonials || [
    {
      text: "Exceptional work! Delivered beyond expectations with incredible attention to detail.",
      author: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      avatar: "👩‍💼"
    }
  ];

  // Enhanced stats using actual data
  const stats = [
    { number: `${portfolioData.projects?.length || 6}+`, label: "Projects Completed", icon: <FaRocket />, color: "from-cyan-500 to-blue-500" },
    { number: "5+", label: "Years Experience", icon: <FaCode />, color: "from-green-500 to-emerald-500" },
    { number: "98%", label: "Client Satisfaction", icon: <FaStar />, color: "from-yellow-500 to-orange-500" },
    { number: `${portfolioData.techStack?.languages?.length || 25}+`, label: "Technologies", icon: <FaPaintBrush />, color: "from-purple-500 to-pink-500" }
  ];

  // Enhanced services with actual data
  const services = [
    {
      icon: <FaCode className="text-4xl" />,
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies",
      gradient: "from-blue-500 to-cyan-500",
      features: portfolioData.techStack?.frontend?.slice(0, 3) || ["React/Next.js", "TypeScript", "Tailwind CSS"],
      threeModel: "cube"
    },
    {
      icon: <FaMobile className="text-4xl" />,
      title: "Mobile Apps",
      description: "Cross-platform mobile applications for iOS and Android",
      gradient: "from-green-500 to-emerald-500",
      features: portfolioData.projects?.filter(p => p.category === "Mobile").map(p => p.technologies[0]) || ["React Native", "Flutter", "Native Performance"],
      threeModel: "sphere"
    },
    {
      icon: <FaServer className="text-4xl" />,
      title: "Backend Solutions",
      description: "Scalable server architecture and API development",
      gradient: "from-purple-500 to-pink-500",
      features: portfolioData.techStack?.backend?.slice(0, 3) || ["Node.js", "Python", "Cloud Functions"],
      threeModel: "torus"
    },
    {
      icon: <FaCloud className="text-4xl" />,
      title: "Cloud Services",
      description: "Deployment and management on cloud platforms",
      gradient: "from-orange-500 to-red-500",
      features: portfolioData.techStack?.cloudDevOps?.slice(0, 3) || ["AWS", "Google Cloud", "Azure"],
      threeModel: "cone"
    }
  ];

  // Enhanced technologies with actual data
  const technologies = portfolioData.techProficiency?.expert?.slice(0, 6).map(tech => {
    const getIcon = (name) => {
      const icons = {
        'React': <SiReact className="text-5xl" />,
        'JavaScript': <SiJavascript className="text-5xl" />,
        'TypeScript': <SiTypescript className="text-5xl" />,
        'Node.js': <SiNodedotjs className="text-5xl" />,
        'Python': <SiPython className="text-5xl" />,
        'Next.js': <SiNextdotjs className="text-5xl" />,
        'Vue.js': <SiVuedotjs className="text-5xl" />,
        'GraphQL': <SiGraphql className="text-5xl" />,
        'Docker': <SiDocker className="text-5xl" />,
        // 'AWS': <SiAmazonaws className="text-5xl" />,
      };
      return icons[name] || <FaCode className="text-5xl" />;
    };

    const getColor = (name) => {
      const colors = {
        'React': "text-cyan-400",
        'JavaScript': "text-yellow-400",
        'TypeScript': "text-blue-500",
        'Node.js': "text-green-500",
        'Python': "text-yellow-500",
        'Next.js': "text-gray-800",
        'Vue.js': "text-green-400",
        'GraphQL': "text-pink-500",
        'Docker': "text-blue-400",
        'AWS': "text-orange-500",
      };
      return colors[name] || "text-purple-500";
    };

    const getLevel = (name) => {
      const proficiency = portfolioData.techProficiency;
      if (proficiency.expert?.includes(name)) return 95;
      if (proficiency.advanced?.includes(name)) return 85;
      if (proficiency.intermediate?.includes(name)) return 75;
      if (proficiency.familiar?.includes(name)) return 65;
      return 80;
    };

    return {
      icon: getIcon(tech),
      name: tech,
      level: getLevel(tech),
      color: getColor(tech),
      threeColor: "#61DAFB"
    };
  }) || [
    { icon: <SiReact className="text-5xl" />, name: "React", level: 95, color: "text-cyan-400", threeColor: "#61DAFB" },
    { icon: <SiJavascript className="text-5xl" />, name: "JavaScript", level: 90, color: "text-yellow-400", threeColor: "#F7DF1E" },
    { icon: <SiTypescript className="text-5xl" />, name: "TypeScript", level: 85, color: "text-blue-500", threeColor: "#3178C6" },
    { icon: <SiNodedotjs className="text-5xl" />, name: "Node.js", level: 88, color: "text-green-500", threeColor: "#339933" },
    { icon: <SiPython className="text-5xl" />, name: "Python", level: 82, color: "text-yellow-500", threeColor: "#3776AB" },
    { icon: <SiThreedotjs className="text-5xl" />, name: "Three.js", level: 80, color: "text-purple-500", threeColor: "#000000" }
  ];

  const floatingVariants = {
    floating: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    floatingSlow: {
      y: [-15, 15, -15],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    floatingFast: {
      y: [-8, 8, -8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

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
    hidden: { y: 50, opacity: 0, scale: 0.8 },
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

  // Social media links from portfolioData
  const socialLinks = [
    { icon: <FaGithub />, href: portfolioData.user.social?.github || "#", color: "hover:bg-gray-800" },
    { icon: <FaLinkedin />, href: portfolioData.user.social?.linkedin || "#", color: "hover:bg-blue-600" },
    { icon: <FaTwitter />, href: portfolioData.user.social?.twitter || "#", color: "hover:bg-blue-400" },
    { icon: <FaDribbble />, href: portfolioData.user.social?.dribbble || "#", color: "hover:bg-pink-600" },
    { icon: <FaCodepen />, href: portfolioData.user.social?.codepen || "#", color: "hover:bg-gray-700" },
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative"
    >
      {/* Three.js Background Scene */}
      <div className="fixed inset-0 z-0">
        <ThreeScene 
          mousePosition={mousePosition}
          scrollProgress={scrollYProgress}
          onLoaded={() => setThreeLoaded(true)}
        />
      </div>

      {/* Floating Interactive Particles */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <InteractiveParticles 
          count={50}
          mousePosition={mousePosition}
        />
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
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-8"
                variants={itemVariants}
              >
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full mr-3"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white/80 font-medium">
                  {portfolioData.user.availability || "Available for new projects"}
                </span>
                <motion.div
                  className="ml-4 flex space-x-1"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-1 h-1 bg-white/60 rounded-full" />
                  <div className="w-1 h-1 bg-white/60 rounded-full" />
                  <div className="w-1 h-1 bg-white/60 rounded-full" />
                </motion.div>
              </motion.div>

              <motion.h1 
                className="text-6xl lg:text-8xl font-black text-white mb-6 leading-tight"
                variants={itemVariants}
              >
                <span className="block">Hi, I'm</span>
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {portfolioData.user.name.split(' ')[0]}
                </span>
              </motion.h1>
              
              <motion.h2 
                className="text-2xl lg:text-3xl text-white/60 mb-8 font-light"
                variants={itemVariants}
              >
                <span className="bg-gradient-to-r from-white/80 to-white/60 bg-clip-text text-transparent">
                  {portfolioData.user.title}
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-white/70 mb-8 max-w-2xl leading-relaxed"
                variants={itemVariants}
              >
                {portfolioData.user.bio} I create immersive digital experiences using cutting-edge WebGL and 3D technologies.
              </motion.p>

              {/* Contact Info */}
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-2 text-white/70">
                  <FaMapMarkerAlt className="text-cyan-400" />
                  <span>{portfolioData.user.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <FaEnvelope className="text-purple-400" />
                  <span>{portfolioData.user.email}</span>
                </div>
                {portfolioData.user.contact?.phone && (
                  <div className="flex items-center space-x-2 text-white/70">
                    <FaPhone className="text-green-400" />
                    <span>{portfolioData.user.contact.phone}</span>
                  </div>
                )}
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-6 mb-8"
                variants={itemVariants}
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    background: "linear-gradient(45deg, #3B82F6, #8B5CF6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center group relative overflow-hidden"
                  onClick={() => setActiveSection('projects')}
                >
                  <span className="relative z-10 flex items-center">
                    Explore Projects 
                    <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                  onClick={() => setActiveSection('experience')}
                >
                  View Experience
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="flex space-x-4 flex-wrap"
                variants={itemVariants}
              >
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
                    whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Right Content - 3D Enhanced Avatar */}
            <motion.div 
              className="lg:w-2/5 relative"
              style={{
                scale: springScale,
                rotate: springRotate,
                x: mousePosition.x * 0.3,
                y: mousePosition.y * 0.3
              }}
            >
              <div className="relative">
                {/* 3D Avatar Container */}
                <motion.div 
                  className="relative w-96 h-96 mx-auto"
                  animate={{ 
                    y: [0, -20, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 6,
                    ease: "easeInOut"
                  }}
                >
                  {/* Three.js Animated Sphere */}
                  <div className="absolute inset-0 z-0">
                    <AnimatedSphere 
                      imageUrl={portfolioData.user.avatar}
                      mousePosition={mousePosition}
                    />
                  </div>

                  {/* Floating Tech Orbits */}
                  <div className="absolute inset-0 z-10">
                    <TechOrbit technologies={technologies.slice(0, 4)} />
                  </div>

                  {/* Enhanced Floating Elements */}
                  <motion.div
                    className="absolute -top-6 -left-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-4 shadow-2xl z-20 backdrop-blur-md border border-white/20"
                    variants={floatingVariants}
                    animate="floating"
                  >
                    <div className="flex items-center space-x-3">
                      <SiReact className="text-2xl text-white" />
                      <span className="text-white font-bold text-sm">React Expert</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 shadow-2xl z-20 backdrop-blur-md border border-white/20"
                    variants={floatingVariants}
                    animate="floatingSlow"
                  >
                    <div className="flex items-center space-x-3">
                      <SiThreedotjs className="text-xl text-white" />
                      <span className="text-white font-bold text-sm">3D Artist</span>
                    </div>
                  </motion.div>

                  {/* Loading State for Three.js */}
                  <AnimatePresence>
                    {!threeLoaded && (
                      <motion.div
                        className="absolute inset-0 bg-slate-900 rounded-3xl flex items-center justify-center z-30"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div
                          className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - REMAINS SAME */}
      <section className="py-20 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 relative overflow-hidden">
                  {/* 3D Hover Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    whileHover={{ scale: 1.1 }}
                  />
                  
                  <div className="relative z-10 text-center">
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <div className={`text-3xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.icon}
                      </div>
                    </motion.div>
                    <motion.h3 
                      className="text-4xl font-black text-white mb-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      {stat.number}
                    </motion.h3>
                    <p className="text-white/60 font-medium">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section - REMAINS SAME */}
      {/* ... (rest of the Services section code remains the same) ... */}

      {/* Enhanced Technologies Section */}
      <section className="py-20 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6">
              Tech{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Stack
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Mastering modern technologies to build immersive, performant, and beautiful applications
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="text-center">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 mb-6 group-hover:bg-white/10 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className={tech.color}>
                      {tech.icon}
                    </div>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">{tech.name}</h3>
                  
                  {/* Animated Skill Level Bar */}
                  <div className="w-full bg-white/10 rounded-full h-3 mb-2 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${tech.level > 80 ? 'from-green-400 to-cyan-400' : 'from-yellow-400 to-orange-400'} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                  </div>
                  
                  <span className="text-white/60 text-sm font-medium">{tech.level}% Proficiency</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack Categories */}
          {portfolioData.techStack && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <h3 className="text-3xl font-bold text-white text-center mb-8">Complete Tech Stack</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(portfolioData.techStack).map(([category, items], index) => (
                  <motion.div
                    key={category}
                    className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="text-lg font-semibold text-white mb-4 capitalize">{category.replace(/([A-Z])/g, ' $1')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {items.slice(0, 6).map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm border border-white/20"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-4 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-12 lg:p-20 border border-cyan-400/30 relative overflow-hidden">
            {/* 3D Particle Background */}
            <div className="absolute inset-0 opacity-10">
              <FloatingParticles count={30} color="#FFFFFF" />
            </div>
            
            <div className="relative z-10">
              <motion.h2 
                className="text-5xl lg:text-7xl font-black text-white mb-6"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                Ready to{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Collaborate
                </span>
                ?
              </motion.h2>
              
              <motion.p 
                className="text-xl lg:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Let's transform your vision into an extraordinary digital experience. Your next project starts here.
              </motion.p>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 20px 40px rgba(6,182,212,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
                onClick={() => window.location.href = `mailto:${portfolioData.user.email}?subject=Project%20Inquiry%20from%20Portfolio&body=Hello%20${portfolioData.user.name.split(' ')[0]}%2C%0A%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.%0A%0ABest%20regards%2C`}
              >
                <span className="relative z-10 flex items-center">
                  Start a Project
                  <FaRocket className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                />
              </motion.button>

              {/* Additional Contact Info */}
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center text-white/60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-cyan-400" />
                  <span>{portfolioData.user.email}</span>
                </div>
                {portfolioData.user.contact?.phone && (
                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-cyan-400" />
                    <span>{portfolioData.user.contact.phone}</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;