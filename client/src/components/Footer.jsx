// components/Footer.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope,
  FaHeart,
  FaArrowUp,
  FaMapMarkerAlt,
  FaPhone,
  FaPaperPlane,
  FaCode,
  FaCoffee,
  FaRocket,
  FaRegSmileWink
} from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiFramer } from 'react-icons/si';

const Footer = ({ portfolioData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setEmail('');
      setMessage('');
      
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Web Development',
    'Mobile Apps',
    'UI/UX Design',
    'Backend Solutions',
    'Cloud Services'
  ];

  const techStack = [
    { icon: <SiReact className="text-blue-400" />, name: 'React' },
    { icon: <SiTailwindcss className="text-cyan-400" />, name: 'Tailwind' },
    { icon: <SiFramer className="text-purple-400" />, name: 'Framer Motion' }
  ];

  const socialLinks = [
    { 
      icon: <FaGithub />, 
      href: "#", 
      color: "hover:bg-gray-800",
      tooltip: "GitHub"
    },
    { 
      icon: <FaLinkedin />, 
      href: "#", 
      color: "hover:bg-blue-600",
      tooltip: "LinkedIn"
    },
    { 
      icon: <FaTwitter />, 
      href: "#", 
      color: "hover:bg-blue-400",
      tooltip: "Twitter"
    },
    { 
      icon: <FaEnvelope />, 
      href: `mailto:${portfolioData.user.email}`,
      color: "hover:bg-red-500",
      tooltip: "Email"
    }
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
    hidden: { y: 20, opacity: 0 },
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
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Contact Form Section */}
        <section className="py-16 border-b border-white/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Let's Work Together
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ready to bring your ideas to life? Let's create something amazing together.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Info */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-gray-300">{portfolioData.user.location}</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-300">{portfolioData.user.email}</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <FaRocket className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Availability</h3>
                    <p className="text-green-400 font-medium">Available for new projects</p>
                  </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8"
                >
                  <h4 className="text-lg font-semibold mb-4">Built With</h4>
                  <div className="flex space-x-4">
                    {techStack.map((tech, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tech.icon}
                        <span className="text-sm">{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10"
              >
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl text-center"
                    >
                      <FaRegSmileWink className="text-3xl text-green-400 mx-auto mb-2" />
                      <p className="text-green-400 font-semibold">Message sent successfully!</p>
                      <p className="text-green-300 text-sm">I'll get back to you soon.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.02 }}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows="4"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer Links */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-3 mb-6"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <FaCode className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{portfolioData.user.name}</h3>
                    <p className="text-gray-400">{portfolioData.user.title}</p>
                  </div>
                </motion.div>
                <motion.p
                  variants={itemVariants}
                  className="text-gray-400 mb-6 leading-relaxed"
                >
                  Creating digital experiences that inspire and deliver results. Let's build the future together.
                </motion.p>
                <motion.div
                  variants={itemVariants}
                  className="flex space-x-3"
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm transition-all duration-300 group relative"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {social.tooltip}
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h4
                  variants={itemVariants}
                  className="text-lg font-semibold mb-6 text-white"
                >
                  Quick Links
                </motion.h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                    >
                      <motion.a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                        whileHover={{ x: 5 }}
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Services */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h4
                  variants={itemVariants}
                  className="text-lg font-semibold mb-6 text-white"
                >
                  Services
                </motion.h4>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                    >
                      <span className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        {service}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Fun Stats */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h4
                  variants={itemVariants}
                  className="text-lg font-semibold mb-6 text-white"
                >
                  Fun Facts
                </motion.h4>
                <div className="space-y-4">
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10"
                  >
                    <FaCoffee className="text-yellow-400 text-xl" />
                    <div>
                      <p className="font-semibold">1000+</p>
                      <p className="text-gray-400 text-sm">Cups of Coffee</p>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10"
                  >
                    <FaCode className="text-green-400 text-xl" />
                    <div>
                      <p className="font-semibold">50+</p>
                      <p className="text-gray-400 text-sm">Projects Completed</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0"
              >
                <span>© {new Date().getFullYear()} {portfolioData.user.name}. All rights reserved.</span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-red-400"
                >
                  <FaHeart />
                </motion.span>
                <span>Made with passion</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center space-x-6 text-sm text-gray-400"
              >
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <motion.button
                  onClick={scrollToTop}
                  className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Back to Top</span>
                  <motion.div
                    animate={floatingAnimation}
                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <FaArrowUp className="text-white text-sm" />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;