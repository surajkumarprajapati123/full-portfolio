// App.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects'
import ProjectView from './components/ProjectView';
import Experience from './components/Experience';
import Footer from './components/Footer';

// Static data
const portfolioData = {
  user: {
    name: "Alex Johnson",
    title: "Full Stack Developer & UI/UX Designer",
    bio: "I create digital experiences that merge innovation with functionality",
    email: "alex.johnson@example.com",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  about: {
    description: "I'm a passionate developer with 5+ years of experience creating web applications that solve real-world problems. My expertise spans across frontend and backend technologies with a focus on user-centered design.",
    skills: [
      { name: "React", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "UI/UX Design", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "AWS", level: 65 }
    ]
  },
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment integration and admin dashboard",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Full Stack",
      liveUrl: "#",
      githubUrl: "#",
      details: {
        overview: "This project involved building a complete e-commerce platform from scratch with features like user authentication, product management, shopping cart, and payment processing.",
        challenges: "Implementing secure payment processing and ensuring smooth user experience across different devices.",
        solution: "Used React for the frontend, Node.js for the backend, and integrated Stripe for payments with proper error handling and validation.",
        features: ["User Authentication", "Product Catalog", "Shopping Cart", "Payment Processing", "Order Management", "Admin Dashboard"]
      }
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      technologies: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
      category: "Frontend",
      liveUrl: "#",
      githubUrl: "#",
      details: {
        overview: "A modern task management application that allows teams to collaborate effectively with real-time updates and intuitive UI.",
        challenges: "Managing real-time data synchronization and creating an intuitive drag-and-drop interface.",
        solution: "Leveraged Firebase for real-time database and authentication, with Framer Motion for smooth animations.",
        features: ["Real-time Updates", "Drag & Drop", "Team Collaboration", "Progress Tracking", "Notifications"]
      }
    },
    {
      id: 3,
      title: "Health & Fitness Tracker",
      description: "A comprehensive fitness tracking application with data visualization",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      technologies: ["React Native", "GraphQL", "Python", "PostgreSQL"],
      category: "Mobile",
      liveUrl: "#",
      githubUrl: "#",
      details: {
        overview: "Mobile application for tracking fitness activities, nutrition, and health metrics with beautiful data visualizations.",
        challenges: "Processing and visualizing large amounts of health data while maintaining app performance.",
        solution: "Used React Native for cross-platform development and Python backend for data processing with GraphQL API.",
        features: ["Activity Tracking", "Nutrition Logging", "Progress Charts", "Goal Setting", "Social Features"]
      }
    }
  ],
  experience: [
    {
      id: 1,
      role: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      description: "Leading frontend development for multiple client projects, mentoring junior developers, and implementing modern UI/UX practices.",
      achievements: [
        "Improved application performance by 40% through code optimization",
        "Led migration from class components to functional components with hooks",
        "Implemented design system used across 10+ projects"
      ]
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "Digital Solutions LLC",
      period: "2019 - 2021",
      description: "Developed and maintained web applications using React, Node.js, and various databases.",
      achievements: [
        "Built 15+ responsive web applications from concept to deployment",
        "Reduced page load time by 60% through optimization techniques",
        "Collaborated with designers to implement pixel-perfect UIs"
      ]
    },
    {
      id: 3,
      role: "Junior Web Developer",
      company: "Web Crafters Agency",
      period: "2017 - 2019",
      description: "Started my career building websites and web applications for small to medium businesses.",
      achievements: [
        "Developed 30+ websites for various clients",
        "Learned modern development practices and workflows",
        "Contributed to open source projects to improve skills"
      ]
    }
  ]
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setActiveSection('projectview');
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setActiveSection('projects');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Portfolio...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        portfolioData={portfolioData}
      />
      
      <AnimatePresence mode="wait">
        {activeSection === 'home' && (
          <Home 
            key="home"
            portfolioData={portfolioData} 
            setActiveSection={setActiveSection}
          />
        )}
        
        {activeSection === 'about' && (
          <About 
            key="about"
            portfolioData={portfolioData}
          />
        )}
        
        {activeSection === 'projects' && (
          <Projects 
            key="projects"
            portfolioData={portfolioData}
            onProjectSelect={handleProjectSelect}
          />
        )}
        
        {activeSection === 'projectview' && selectedProject && (
          <ProjectView 
            key="projectview"
            project={selectedProject}
            onBack={handleBackToProjects}
          />
        )}
        
        {activeSection === 'experience' && (
          <Experience 
            key="experience"
            portfolioData={portfolioData}
          />
        )}
      </AnimatePresence>
      
      <Footer portfolioData={portfolioData} />
    </div>
  );
}

export default App;