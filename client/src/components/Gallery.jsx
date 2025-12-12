// components/Gallery.js - COMPLETE WORKING VERSION
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaChevronLeft, 
  FaChevronRight, 
  FaDownload,
  FaHeart,
  FaExpand,
  FaPlayCircle,
  FaCamera,
  FaVideo,
  FaShareAlt,
  FaBookmark,
  FaTag,
  FaCalendar,
  FaArrowLeft,
  FaArrowRight,
  FaExternalLinkAlt,
  FaStar
} from 'react-icons/fa';

const Gallery = ({ portfolioData }) => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedImages, setLikedImages] = useState(new Set());
  const [bookmarkedImages, setBookmarkedImages] = useState(new Set());
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  // Combine all photos from different categories
  const allPhotos = [
    ...(portfolioData.gallery?.profilePhotos || []).map(p => ({ 
      ...p, 
      type: 'profile', 
      tags: ['Portrait', 'Professional'] 
    })),
    ...(portfolioData.gallery?.projectPhotos || []).map(p => ({ 
      ...p, 
      type: 'project', 
      tags: ['UI/UX', 'Design', 'Development'] 
    })),
    ...(portfolioData.gallery?.eventPhotos || []).map(p => ({ 
      ...p, 
      type: 'event', 
      tags: ['Conference', 'Speaking', 'Networking'] 
    }))
  ];

  // Categories for filtering
  const categories = [
    { 
      id: 'all', 
      label: 'All Photos', 
      count: allPhotos.length, 
      icon: '📸',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      count: portfolioData.gallery?.profilePhotos?.length || 0, 
      icon: '👤',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'project', 
      label: 'Projects', 
      count: portfolioData.gallery?.projectPhotos?.length || 0, 
      icon: '💻',
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'event', 
      label: 'Events', 
      count: portfolioData.gallery?.eventPhotos?.length || 0, 
      icon: '🎤',
      gradient: 'from-orange-500 to-red-500'
    },
  ];

  // Filter photos based on selected category
  const filteredPhotos = selectedCategory === 'all' 
    ? allPhotos 
    : allPhotos.filter(photo => photo.type === selectedCategory);

  // Handle image click - OPEN LIGHTBOX
  const handleImageClick = (photo, index) => {
    console.log('Opening lightbox for:', photo.title);
    setSelectedImage(photo);
    setCurrentIndex(index);
    setLightboxOpen(true);
    setZoomLevel(1);
    setIsZoomed(false);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  // Close lightbox
  const handleCloseLightbox = () => {
    console.log('Closing lightbox');
    setLightboxOpen(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Navigate to next image
  const handleNextImage = () => {
    if (filteredPhotos.length === 0) return;
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredPhotos[nextIndex]);
    setZoomLevel(1);
    setIsZoomed(false);
  };

  // Navigate to previous image
  const handlePrevImage = () => {
    if (filteredPhotos.length === 0) return;
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredPhotos[prevIndex]);
    setZoomLevel(1);
    setIsZoomed(false);
  };

  // Toggle like on image
  const toggleLike = (id, e) => {
    if (e) e.stopPropagation();
    const newLiked = new Set(likedImages);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedImages(newLiked);
  };

  // Toggle bookmark on image
  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    const newBookmarked = new Set(bookmarkedImages);
    if (newBookmarked.has(id)) {
      newBookmarked.delete(id);
    } else {
      newBookmarked.add(id);
    }
    setBookmarkedImages(newBookmarked);
  };

  // Zoom in
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
    setIsZoomed(true);
  };

  // Zoom out
  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
    if (zoomLevel <= 1.5) setIsZoomed(false);
  };

  // Reset zoom
  const resetZoom = () => {
    setZoomLevel(1);
    setIsZoomed(false);
  };

  // Download image
  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share image
  const handleShare = async (photo) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: photo.title,
          text: `Check out this photo: ${photo.title}`,
          url: photo.url,
        });
      } catch (error) {
        console.log('Sharing cancelled', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(photo.url);
      alert('Image URL copied to clipboard!');
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      
      switch(e.key) {
        case 'Escape':
          handleCloseLightbox();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
        case 'ArrowLeft':
          handlePrevImage();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
        case '0':
          resetZoom();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentIndex, filteredPhotos]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
        duration: 0.5
      }
    }
  };

  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  // Add custom styles for zoom cursor
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .zoomable-image {
        cursor: ${isZoomed ? 'zoom-out' : 'zoom-in'};
        transition: transform 0.3s ease-out;
      }
      .lightbox-backdrop {
        backdrop-filter: blur(10px);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [isZoomed]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Visual Gallery
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Explore my journey through photos and videos
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">{allPhotos.length}</div>
              <div className="text-white/60">Total Photos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">
                {portfolioData.videos?.projectDemos?.length || 0}
              </div>
              <div className="text-white/60">Videos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400">{likedImages.size}</div>
              <div className="text-white/60">Likes</div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.label}</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                selectedCategory === category.id 
                  ? 'bg-white/30' 
                  : 'bg-black/30'
              }`}>
                {category.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Photo Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={`${photo.id}-${index}`}
              variants={itemVariants}
              className="relative group cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => handleImageClick(photo, index)}
            >
              {/* Image Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-1 shadow-xl">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-lg mb-1">{photo.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{photo.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-xs">
                        {photo.type}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(photo.id, e);
                          }}
                          className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        >
                          <FaHeart className={`text-sm ${likedImages.has(photo.id) ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(photo.id, e);
                          }}
                          className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        >
                          <FaBookmark className={`text-sm ${bookmarkedImages.has(photo.id) ? 'text-yellow-500 fill-yellow-500' : 'text-white'}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.div>
          ))}
        </motion.div>

        {/* Videos Section */}
        {portfolioData.videos?.projectDemos && portfolioData.videos.projectDemos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Video Demos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.videos.projectDemos.map((video) => (
                <div 
                  key={video.id}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-1"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank')}
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <FaPlayCircle className="text-white text-2xl ml-1" />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-white text-xs">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-white text-lg mb-2">{video.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 text-xs">{video.views} views</span>
                      <span className="text-white/60 text-xs flex items-center gap-1">
                        Watch <FaExternalLinkAlt className="text-xs" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-2xl font-bold text-white mb-2">No photos found</h3>
            <p className="text-white/60">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL - THIS WILL SHOW WHEN IMAGE IS CLICKED */}
      <AnimatePresence>
        {lightboxOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 lightbox-backdrop"
            onClick={handleCloseLightbox}
          >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/90" />
            
            {/* Lightbox Content */}
            <motion.div
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="relative h-[60vh] flex items-center justify-center bg-black p-4">
                <motion.img
                  key={selectedImage.id}
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="zoomable-image max-w-full max-h-full object-contain rounded-lg"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center'
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: zoomLevel, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Image Info */}
              <div className="p-6 bg-gradient-to-b from-slate-800 to-slate-900">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left Column - Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold text-white">{selectedImage.title}</h2>
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 rounded-full text-sm">
                        {selectedImage.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{selectedImage.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendar className="text-gray-400" />
                        <span className="text-gray-300 text-sm">{selectedImage.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaTag className="text-gray-400" />
                        <div className="flex flex-wrap gap-2">
                          {selectedImage.tags?.map((tag, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Actions */}
                  <div className="flex items-center gap-3">
                    {/* Like Button */}
                    <motion.button
                      onClick={(e) => toggleLike(selectedImage.id, e)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaHeart className={`text-xl ${likedImages.has(selectedImage.id) ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                      <span className="text-white">
                        {likedImages.has(selectedImage.id) ? 'Liked' : 'Like'}
                      </span>
                    </motion.button>
                    
                    {/* Download Button */}
                    <motion.button
                      onClick={() => handleDownload(selectedImage.url, selectedImage.title)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaDownload className="text-white text-xl" />
                      <span className="text-white">Download</span>
                    </motion.button>
                    
                    {/* Share Button */}
                    <motion.button
                      onClick={() => handleShare(selectedImage)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaShareAlt className="text-white text-xl" />
                      <span className="text-white">Share</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>
              
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
              
              {/* Close Button */}
              <button
                onClick={handleCloseLightbox}
                className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
                aria-label="Close lightbox"
              >
                <FaTimes />
              </button>
              
              {/* Image Counter */}
              <div className="absolute top-4 left-4 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                {currentIndex + 1} / {filteredPhotos.length}
              </div>
              
              {/* Zoom Controls */}
              <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                <button
                  onClick={zoomOut}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Zoom out"
                >
                  <span className="text-lg">−</span>
                </button>
                
                <button
                  onClick={resetZoom}
                  className="px-3 py-1 text-white text-sm hover:bg-white/20 rounded transition-colors"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                
                <button
                  onClick={zoomIn}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Zoom in"
                >
                  <span className="text-lg">+</span>
                </button>
                
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors ml-2"
                  aria-label="Toggle zoom"
                >
                  <FaExpand className="text-sm" />
                </button>
              </div>
              
              {/* Instructions */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs text-center">
                Use ← → arrows to navigate • ESC to close • +/- to zoom
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Test Button (for debugging) */}
      <button
        onClick={() => {
          if (filteredPhotos.length > 0) {
            handleImageClick(filteredPhotos[0], 0);
          }
        }}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        style={{ display: 'none' }} // Hidden by default
      >
        Test Lightbox
      </button>
    </div>
  );
};

export default Gallery;