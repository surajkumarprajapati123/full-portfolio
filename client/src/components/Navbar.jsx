// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaPaperPlane, 
  FaUser, 
  FaEnvelope, 
  FaComment,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Navbar = ({ activeSection, setActiveSection, portfolioData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👨‍💻' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'experience', label: 'Experience', icon: '📈' },
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    setIsContactOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
        setIsContactOpen(false);
      }, 2000);
    }, 2000);
  };

  const socialLinks = [
    { icon: <FaGithub />, href: "#", color: "hover:bg-gray-800" },
    { icon: <FaLinkedin />, href: "#", color: "hover:bg-blue-600" },
    { icon: <FaTwitter />, href: "#", color: "hover:bg-blue-400" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100' 
            : 'bg-white/80 backdrop-blur-md shadow-sm'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <motion.div 
              className="relative"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">AJ</span>
              </div>
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"
                animate={{ rotate: [0, 180] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <div>
              <span className="font-bold text-xl text-gray-800 block leading-tight">
                {portfolioData.user.name.split(' ')[0]}
              </span>
              <span className="text-xs text-gray-500 font-medium">Developer</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group ${
                  activeSection === item.id 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                
                {activeSection === item.id && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 border-2 border-blue-200 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100"
                  initial={false}
                  whileHover={{ scale: 2 }}
                />
              </motion.button>
            ))}
            
            {/* Contact Button */}
            <motion.button
              onClick={handleContactClick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group"
            >
              <FaPaperPlane className="text-sm group-hover:rotate-12 transition-transform duration-300" />
              <span>Contact</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left py-4 px-4 rounded-xl transition-all duration-300 flex items-center space-x-3 ${
                        activeSection === item.id 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold border border-blue-100' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                  
                  <motion.button
                    onClick={handleContactClick}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-4 rounded-xl font-semibold shadow-lg mt-2 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPaperPlane />
                    <span>Contact Me</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Contact Info Sidebar */}
                <motion.div 
                  className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 lg:p-12"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-6">Let's Talk!</h2>
                      <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                        Ready to bring your ideas to life? Let's create something amazing together. 
                        I'm always open to discussing new projects and opportunities.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <FaEnvelope className="text-white text-lg" />
                          </div>
                          <div>
                            <p className="text-blue-200 text-sm">Email</p>
                            <p className="font-semibold">{portfolioData.user.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <FaMapMarkerAlt className="text-white text-lg" />
                          </div>
                          <div>
                            <p className="text-blue-200 text-sm">Location</p>
                            <p className="font-semibold">{portfolioData.user.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-blue-200 mb-4">Follow me on</p>
                      <div className="flex space-x-3">
                        {socialLinks.map((social, index) => (
                          <motion.a
                            key={index}
                            href={social.href}
                            className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300 backdrop-blur-sm"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {social.icon}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div 
                  className="p-8 lg:p-12"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800">Send a Message</h3>
                    <motion.button
                      onClick={() => setIsContactOpen(false)}
                      className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTimes />
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl text-center"
                      >
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FaPaperPlane className="text-green-600 text-lg" />
                        </div>
                        <p className="text-green-800 font-semibold">Message sent successfully!</p>
                        <p className="text-green-600 text-sm">I'll get back to you within 24 hours.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Your Name
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Email Address
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="john@example.com"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Your Message
                      </label>
                      <div className="relative">
                        <FaComment className="absolute left-4 top-4 text-gray-400 text-sm" />
                        <motion.textarea
                          whileFocus={{ scale: 1.02 }}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows="5"
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="Tell me about your project..."
                        />
                      </div>
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="text-sm" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;