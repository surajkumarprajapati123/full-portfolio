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
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    
    social: {
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson_dev",
      dribbble: "https://dribbble.com/alexjohnson",
      codepen: "https://codepen.io/alexjohnson",
      medium: "https://medium.com/@alexjohnson",
      stackoverflow: "https://stackoverflow.com/users/1234567/alex-johnson"
    },
    
    contact: {
      phone: "+1 (555) 123-4567",
      website: "https://alexjohnson.dev",
      calendly: "https://calendly.com/alexjohnson"
    },
    
    availability: "Open for freelance projects & full-time opportunities"
  },
  
  about: {
    description: "I'm a passionate developer with 5+ years of experience creating web applications that solve real-world problems. My expertise spans across frontend and backend technologies with a focus on user-centered design.",
    skills: [
      { name: "React", level: 90, category: "Frontend", icon: "react" },
      { name: "Node.js", level: 85, category: "Backend", icon: "nodejs" },
      { name: "TypeScript", level: 80, category: "Language", icon: "typescript" },
      { name: "UI/UX Design", level: 75, category: "Design", icon: "design" },
      { name: "MongoDB", level: 70, category: "Database", icon: "mongodb" },
      { name: "AWS", level: 65, category: "Cloud", icon: "aws" }
    ]
  },

  // NEW SECTION: Expertise & Specializations
  expertise: {
    specializations: [
      {
        title: "Frontend Architecture",
        description: "Building scalable, maintainable frontend applications with modern frameworks",
        icon: "🏗️",
        technologies: ["React", "Next.js", "TypeScript", "Redux", "Webpack"]
      },
      {
        title: "Backend Development",
        description: "RESTful APIs, microservices, database design and server optimization",
        icon: "⚙️",
        technologies: ["Node.js", "Express", "Python", "PostgreSQL", "Redis"]
      },
      {
        title: "DevOps & Cloud",
        description: "CI/CD pipelines, containerization, cloud infrastructure and deployment",
        icon: "☁️",
        technologies: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Nginx"]
      },
      {
        title: "UI/UX Design",
        description: "User-centered design, prototyping, design systems and accessibility",
        icon: "🎨",
        technologies: ["Figma", "Adobe XD", "Framer", "Design Systems", "WCAG"]
      }
    ],
    
    methodologies: [
      "Agile & Scrum Development",
      "Test-Driven Development (TDD)",
      "Continuous Integration/Deployment",
      "Mobile-First Design",
      "Progressive Web Apps",
      "Microservices Architecture"
    ],
    
    softSkills: [
      "Technical Leadership",
      "Team Mentoring",
      "Project Management",
      "Client Communication",
      "Problem Solving",
      "Public Speaking"
    ]
  },
  
  // NEW SECTION: Achievements & Awards
  achievements: {
    awards: [
      {
        id: 1,
        title: "Best Open Source Project 2023",
        issuer: "GitHub & Open Source Community",
        date: "2023-12-01",
        description: "Awarded for DevHub portfolio builder with 5,000+ stars on GitHub",
        icon: "🏆",
        category: "Open Source"
      },
      {
        id: 2,
        title: "Hackathon Winner - TechCrunch Disrupt",
        issuer: "TechCrunch",
        date: "2023-09-15",
        description: "1st place in fintech category for real-time crypto analytics platform",
        icon: "🥇",
        category: "Hackathon"
      },
      {
        id: 3,
        title: "Developer of the Month",
        issuer: "Stack Overflow",
        date: "2023-06-01",
        description: "Recognized for top contributions in React and Node.js communities",
        icon: "👨‍💻",
        category: "Community"
      },
      {
        id: 4,
        title: "UI/UX Excellence Award",
        issuer: "Awwwards",
        date: "2023-03-20",
        description: "For exceptional user experience design in TaskFlow Pro application",
        icon: "🎯",
        category: "Design"
      }
    ],
    
    certifications: [
      {
        id: 1,
        name: "AWS Certified Solutions Architect - Professional",
        issuer: "Amazon Web Services",
        date: "2023-08-15",
        credentialId: "AWS-789123",
        url: "https://www.credly.com/badges/aws-solutions-architect",
        icon: "☁️"
      },
      {
        id: 2,
        name: "Google Professional Cloud Developer",
        issuer: "Google Cloud",
        date: "2023-05-10",
        credentialId: "GCP-456789",
        url: "https://google.accredible.com/cloud-developer",
        icon: "🔧"
      },
      {
        id: 3,
        name: "React Developer Certification",
        issuer: "Meta",
        date: "2022-11-30",
        credentialId: "META-987654",
        url: "https://coursera.org/verify/react-developer",
        icon: "⚛️"
      },
      {
        id: 4,
        name: "Scrum Master Certified (SMC)",
        issuer: "Scrum Alliance",
        date: "2022-07-15",
        credentialId: "SCRUM-123456",
        url: "https://scrumalliance.org/verify",
        icon: "📋"
      }
    ],
    
    milestones: [
      {
        id: 1,
        title: "10,000+ GitHub Stars",
        metric: "10,000+",
        description: "Combined stars across all open source projects",
        date: "2023-12-01",
        icon: "⭐"
      },
      {
        id: 2,
        title: "100,000+ App Downloads",
        metric: "100,000+",
        description: "Total downloads across mobile applications",
        date: "2023-11-15",
        icon: "📱"
      },
      {
        id: 3,
        title: "50+ Projects Delivered",
        metric: "50+",
        description: "Successful client projects completed",
        date: "2023-10-01",
        icon: "🚀"
      },
      {
        id: 4,
        title: "500+ Code Contributions",
        metric: "500+",
        description: "Contributions to open source projects",
        date: "2023-09-01",
        icon: "💻"
      }
    ]
  },
  
  // NEW SECTION: Extracurricular Activities
  extracurricular: {
    openSource: [
      {
        id: 1,
        project: "React Accessibility Helper",
        role: "Maintainer & Core Contributor",
        description: "Open source library for improving accessibility in React applications",
        githubUrl: "https://github.com/alexjohnson/react-accessibility-helper",
        stars: "2,500+",
        contributors: 15,
        status: "Active",
        technologies: ["React", "TypeScript", "Jest"]
      },
      {
        id: 2,
        project: "Node.js Performance Toolkit",
        role: "Contributor",
        description: "Tools and utilities for Node.js performance monitoring",
        githubUrl: "https://github.com/alexjohnson/node-performance-toolkit",
        stars: "1,200+",
        contributors: 8,
        status: "Active",
        technologies: ["Node.js", "Express", "Docker"]
      }
    ],
    
    community: [
      {
        id: 1,
        organization: "React SF Meetup",
        role: "Organizer & Speaker",
        period: "2021 - Present",
        description: "Organize monthly React meetups with 300+ members",
        activities: ["Monthly Tech Talks", "Workshops", "Networking Events"],
        link: "https://meetup.com/react-sf"
      },
      {
        id: 2,
        organization: "Women Who Code",
        role: "Mentor",
        period: "2022 - Present",
        description: "Mentor aspiring women developers in web technologies",
        activities: ["Technical Workshops", "Career Guidance", "Code Reviews"],
        link: "https://womenwhocode.com/sf"
      },
      {
        id: 3,
        organization: "FreeCodeCamp Local Chapter",
        role: "Volunteer Instructor",
        period: "2020 - Present",
        description: "Teach web development fundamentals to beginners",
        activities: ["Weekly Classes", "Project Guidance", "Interview Prep"],
        link: "https://freecodecamp.org/sf"
      }
    ],
    
    hackathons: [
      {
        id: 1,
        name: "TechCrunch Disrupt Hackathon 2023",
        role: "Team Lead & Developer",
        date: "2023-09-12",
        achievement: "1st Place - FinTech Category",
        project: "AI-Powered Investment Assistant",
        technologies: ["React", "Python", "OpenAI API", "FastAPI"]
      },
      {
        id: 2,
        name: "MLH Local Hack Day 2023",
        role: "Participant & Mentor",
        date: "2023-03-25",
        achievement: "Most Innovative Solution",
        project: "Real-time Carbon Footprint Tracker",
        technologies: ["Next.js", "Node.js", "Google Maps API"]
      },
      {
        id: 3,
        name: "DevPost Global Hackathon",
        role: "Solo Participant",
        date: "2022-11-15",
        achievement: "Top 10 Finalist",
        project: "Accessibility-First Browser Extension",
        technologies: ["JavaScript", "Chrome APIs", "Web Accessibility"]
      }
    ],
    
    speaking: [
      {
        id: 1,
        event: "React Conf 2023",
        title: "Building Accessible React Applications at Scale",
        date: "2023-10-25",
        location: "San Francisco, CA",
        type: "Conference Talk",
        audienceSize: "500+",
        recordingUrl: "https://youtube.com/watch?v=react-accessibility"
      },
      {
        id: 2,
        event: "Node.js Interactive",
        title: "Microservices with Node.js: Patterns and Pitfalls",
        date: "2023-08-15",
        location: "Virtual Conference",
        type: "Workshop",
        audienceSize: "200+",
        recordingUrl: "https://youtube.com/watch?v=node-microservices"
      },
      {
        id: 3,
        event: "Google Developer Group",
        title: "Modern Web Performance Optimization",
        date: "2023-05-20",
        location: "Mountain View, CA",
        type: "Tech Talk",
        audienceSize: "150+",
        slidesUrl: "https://speakerdeck.com/alexjohnson/web-performance"
      }
    ],
    
    publications: [
      {
        id: 1,
        title: "The Complete Guide to React Performance Optimization",
        publisher: "Smashing Magazine",
        date: "2023-07-15",
        url: "https://smashingmagazine.com/react-performance-guide",
        readTime: "15 min",
        category: "Technical Article"
      },
      {
        id: 2,
        title: "Building Scalable Microservices with Node.js",
        publisher: "freeCodeCamp",
        date: "2023-04-10",
        url: "https://freecodecamp.org/nodejs-microservices",
        readTime: "12 min",
        category: "Tutorial"
      },
      {
        id: 3,
        title: "Accessibility in Modern Web Applications",
        publisher: "CSS-Tricks",
        date: "2023-01-20",
        url: "https://css-tricks.com/web-accessibility-guide",
        readTime: "10 min",
        category: "Best Practices"
      }
    ]
  },
  
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment integration and admin dashboard",
      banner: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      screenshot: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express.js"],
      category: "Full Stack",
      liveUrl: "https://shopnex.alexjohnson.dev",
      githubUrl: "https://github.com/alexjohnson/shopnex-ecommerce",
      appStoreUrl: null,
      playStoreUrl: null,
      featured: true,
      status: "Live Production",
      launchDate: "2023-03-15",
      metrics: {
        developmentTime: "3 months",
        teamSize: "4 developers",
        status: "Live",
        users: "10,000+",
        rating: "4.8/5.0"
      },
      details: {
        overview: "This project involved building a complete e-commerce platform from scratch with features like user authentication, product management, shopping cart, and payment processing.",
        challenges: "Implementing secure payment processing and ensuring smooth user experience across different devices.",
        solution: "Used React for the frontend, Node.js for the backend, and integrated Stripe for payments with proper error handling and validation.",
        features: ["User Authentication", "Product Catalog", "Shopping Cart", "Payment Processing", "Order Management", "Admin Dashboard"]
      }
    },
    {
      id: 2,
      title: "TaskFlow Pro",
      description: "A collaborative task management application with real-time updates",
      banner: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      technologies: ["React", "Firebase", "Tailwind CSS", "Framer Motion", "Context API"],
      category: "Frontend",
      liveUrl: "https://taskflow.alexjohnson.dev",
      githubUrl: "https://github.com/alexjohnson/taskflow-pro",
      appStoreUrl: null,
      playStoreUrl: null,
      featured: true,
      status: "Live Production",
      launchDate: "2023-01-20",
      metrics: {
        developmentTime: "2 months",
        teamSize: "Solo project",
        status: "Live",
        teams: "500+",
        tasksManaged: "1M+"
      },
      details: {
        overview: "A modern task management application that allows teams to collaborate effectively with real-time updates and intuitive UI.",
        challenges: "Managing real-time data synchronization and creating an intuitive drag-and-drop interface.",
        solution: "Leveraged Firebase for real-time database and authentication, with Framer Motion for smooth animations.",
        features: ["Real-time Updates", "Drag & Drop", "Team Collaboration", "Progress Tracking", "Notifications"]
      }
    },
    {
      id: 3,
      title: "FitTrack - Health & Fitness Tracker",
      description: "A comprehensive fitness tracking application with data visualization",
      banner: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      screenshot: "https://images.unsplash.com/photo-1571019614245-e5c46bdf6a8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      technologies: ["React Native", "GraphQL", "Python", "PostgreSQL", "D3.js"],
      category: "Mobile",
      liveUrl: "https://fittrack.alexjohnson.dev",
      githubUrl: "https://github.com/alexjohnson/fittrack-app",
      appStoreUrl: "https://apps.apple.com/us/app/fittrack/id123456789",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.alexjohnson.fittrack",
      featured: true,
      status: "Live Production",
      launchDate: "2022-11-10",
      metrics: {
        developmentTime: "4 months",
        teamSize: "3 developers",
        status: "Live",
        downloads: "50,000+",
        rating: "4.7/5.0"
      },
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
      technologies: ["React", "TypeScript", "Next.js", "GraphQL", "Jest", "Cypress", "AWS", "Docker"],
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
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "Firebase", "Heroku", "JWT"],
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
      technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "PHP", "WordPress", "MySQL"],
      achievements: [
        "Developed 30+ websites for various clients",
        "Learned modern development practices and workflows",
        "Contributed to open source projects to improve skills"
      ]
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Product Manager, TechCorp",
      company: "TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      content: "Alex delivered an exceptional e-commerce platform that exceeded our expectations. The performance improvements were remarkable.",
      rating: 5,
      project: "E-Commerce Platform"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      position: "CTO, StartupXYZ",
      company: "StartupXYZ",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      content: "The task management app Alex built transformed our team's productivity. The real-time features work flawlessly.",
      rating: 5,
      project: "TaskFlow Pro"
    }
  ],

  videoDemos: {
    enabled: true,
    youtubeChannel: "https://youtube.com/c/AlexJohnsonDev",
    videos: [
      {
        id: 1,
        title: "E-Commerce Platform Demo",
        youtubeId: "dQw4w9WgXcQ",
        projectId: 1,
        duration: "4:30"
      }
    ]
  },

  // NEW SECTION: Education
  education: [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "Stanford University",
      location: "Stanford, CA",
      period: "2013 - 2017",
      gpa: "3.8/4.0",
      honors: ["Summa Cum Laude", "Dean's List All Semesters"],
      relevantCourses: [
        "Data Structures & Algorithms",
        "Web Development",
        "Database Systems",
        "Human-Computer Interaction",
        "Software Engineering",
        "Machine Learning"
      ],
      activities: [
        "President - Computer Science Club",
        "Teaching Assistant - Web Development Course",
        "Hackathon Organizer"
      ]
    },
    {
      id: 2,
      degree: "Frontend Development Specialization",
      institution: "Meta (via Coursera)",
      location: "Online",
      period: "2020",
      certification: true,
      courses: [
        "Advanced React",
        "Frontend Development Capstone",
        "Principles of UX/UI Design",
        "HTML and CSS in depth"
      ]
    }
  ],

  // NEW SECTION: Languages
  languages: [
    {
      language: "English",
      proficiency: "Native",
      level: 100
    },
    {
      language: "Spanish",
      proficiency: "Professional",
      level: 85
    },
    {
      language: "French",
      proficiency: "Intermediate",
      level: 60
    },
    {
      language: "Japanese",
      proficiency: "Basic",
      level: 30
    }
  ],

  // NEW SECTION: Interests & Hobbies
  interests: [
    {
      category: "Technology",
      items: ["Open Source Projects", "Tech Meetups", "Hardware Tinkering", "VR Development"]
    },
    {
      category: "Creative",
      items: ["Photography", "Digital Art", "UI/UX Design", "3D Modeling"]
    },
    {
      category: "Sports & Fitness",
      items: ["Rock Climbing", "Cycling", "Yoga", "Hiking"]
    },
    {
      category: "Community",
      items: ["Mentoring", "Volunteer Teaching", "Open Source Advocacy", "Tech for Good"]
    }
  ],

  // NEW SECTION: Availability & Preferences
  preferences: {
    workType: ["Full-time Employment", "Freelance Projects", "Consulting"],
    remote: true,
    relocation: "Open to relocation",
    industries: ["Technology", "FinTech", "HealthTech", "E-commerce", "Education"],
    contractTypes: ["Permanent", "Contract", "Project-based"]
  }
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