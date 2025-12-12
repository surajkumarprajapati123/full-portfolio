// components/AnimatedText.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ 
  text, 
  className = "", 
  gradient = "from-cyan-400 to-blue-500",
  delay = 0,
  stagger = 0.12,
  once = true,
  onComplete
}) => {
  const [isInView, setIsInView] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => {
      setIsInView(true);
      if (onComplete) {
        setTimeout(onComplete, words.length * stagger * 1000);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 0.5
      }
    }
  };

  const characterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
      scale: 0.5
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200
      }
    }
  };

  const renderWord = (word, wordIndex) => {
    // Check if this word should have gradient (usually the last name or key word)
    const shouldGradient = wordIndex === words.length - 1 || 
                          word.toLowerCase().includes(portfolioData.user.name.split(' ')[0].toLowerCase()) ||
                          word.toLowerCase() === 'portfolio' ||
                          word.toLowerCase() === 'developer';

    if (shouldGradient) {
      return (
        <span
          key={wordIndex}
          className={`inline-block mr-2 ${gradient ? `bg-gradient-to-r ${gradient}` : ''} bg-clip-text text-transparent`}
        >
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              variants={characterVariants}
              custom={charIndex}
            >
              {char}
            </motion.span>
          ))}
        </span>
      );
    }

    return (
      <motion.span
        key={wordIndex}
        className="inline-block mr-2 text-white"
        variants={wordVariants}
      >
        {word}
      </motion.span>
    );
  };

  return (
    <motion.div
      className={`${className} overflow-hidden`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      viewport={{ once, margin: "-100px" }}
    >
      <div className="inline-block">
        {words.map((word, index) => renderWord(word, index))}
      </div>
    </motion.div>
  );
};

export default AnimatedText;