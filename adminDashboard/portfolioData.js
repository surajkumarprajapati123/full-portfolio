export const portfolioData = {
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
  
  // PHOTO GALLERY SECTION
  gallery: {
    profilePhotos: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        title: "Professional Headshot",
        description: "Professional profile picture",
        date: "2023-10-15",
        category: "profile",
        featured: true
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1540569876033-6e5d046a1d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        title: "Working at Office",
        description: "Working on project at Tech Innovations Inc.",
        date: "2023-09-20",
        category: "work",
        featured: true
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        title: "Casual Coding Session",
        description: "Casual coding session at home",
        date: "2023-08-10",
        category: "casual",
        featured: true
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        title: "Team Collaboration",
        description: "Team meeting and collaboration session",
        date: "2023-07-15",
        category: "team",
        featured: true
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        title: "Conference Speaking",
        description: "Speaking at React Conf 2023",
        date: "2023-10-25",
        category: "speaking",
        featured: true
      },
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        title: "Code Review Session",
        description: "Pair programming and code review",
        date: "2023-06-05",
        category: "work",
        featured: false
      },
      {
        id: 7,
        url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        title: "Hackathon Event",
        description: "TechCrunch Disrupt Hackathon 2023",
        date: "2023-09-12",
        category: "event",
        featured: true
      },
      {
        id: 8,
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        title: "Team Building",
        description: "Team building activity with colleagues",
        date: "2023-05-20",
        category: "team",
        featured: false
      }
    ],
    
    projectPhotos: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        title: "E-Commerce Platform UI",
        description: "Dashboard interface of e-commerce project",
        projectId: 1,
        date: "2023-03-15",
        featured: true
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        title: "TaskFlow Pro Interface",
        description: "Main dashboard of task management app",
        projectId: 2,
        date: "2023-01-20",
        featured: true
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        title: "FitTrack Mobile App",
        description: "Fitness tracking app screens",
        projectId: 3,
        date: "2022-11-10",
        featured: true
      }
    ],
    
    eventPhotos: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        title: "React SF Meetup",
        description: "Speaking at monthly React meetup",
        event: "React SF Meetup",
        date: "2023-11-15",
        category: "community",
        featured: true
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        title: "Women Who Code Workshop",
        description: "Mentoring aspiring developers",
        event: "Women Who Code",
        date: "2023-10-08",
        category: "mentoring",
        featured: true
      }
    ]
  },
  
  // VIDEO SECTION
  videos: {
    projectDemos: [
      {
        id: 1,
        title: "E-Commerce Platform Full Demo",
        description: "Complete walkthrough of the e-commerce platform features",
        youtubeId: "dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        projectId: 1,
        duration: "8:45",
        views: "15,234",
        uploadDate: "2023-04-10",
        featured: true
      },
      {
        id: 2,
        title: "TaskFlow Pro Real-time Features",
        description: "Demonstration of real-time collaboration features",
        youtubeId: "E8gmARGvPlI",
        thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        projectId: 2,
        duration: "6:20",
        views: "9,876",
        uploadDate: "2023-02-15",
        featured: true
      },
      {
        id: 3,
        title: "FitTrack Mobile App Demo",
        description: "Mobile app features and user interface walkthrough",
        youtubeId: "9bZkp7q19f0",
        thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        projectId: 3,
        duration: "7:30",
        views: "12,345",
        uploadDate: "2022-12-05",
        featured: true
      }
    ],
    
    techTalks: [
      {
        id: 1,
        title: "Building Accessible React Applications",
        description: "Conference talk at React Conf 2023",
        youtubeId: "NpEaa2P7qZI",
        thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        event: "React Conf 2023",
        duration: "45:30",
        views: "23,456",
        uploadDate: "2023-10-30",
        featured: true
      },
      {
        id: 2,
        title: "Microservices with Node.js",
        description: "Workshop on microservice architecture",
        youtubeId: "Wf0Fm0hffyA",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        event: "Node.js Interactive",
        duration: "60:15",
        views: "18,765",
        uploadDate: "2023-08-20",
        featured: true
      }
    ],
    
    tutorials: [
      {
        id: 1,
        title: "React Hooks Complete Guide",
        description: "Comprehensive tutorial on React Hooks",
        youtubeId: "TNhaISOUy6Q",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "25:40",
        views: "45,678",
        uploadDate: "2023-07-10",
        difficulty: "Intermediate",
        featured: true
      },
      {
        id: 2,
        title: "TypeScript for React Developers",
        description: "Getting started with TypeScript in React projects",
        youtubeId: "zQnBQ4tB3ZA",
        thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "32:15",
        views: "38,912",
        uploadDate: "2023-05-15",
        difficulty: "Beginner",
        featured: true
      }
    ],
    
    youtubeChannel: {
      url: "https://youtube.com/c/AlexJohnsonDev",
      subscribers: "25,000+",
      totalViews: "1.2M+",
      joinDate: "2020-03-15",
      description: "Web development tutorials, project demos, and tech talks"
    }
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

  preferences: {
    workType: ["Full-time Employment", "Freelance Projects", "Consulting"],
    remote: true,
    relocation: "Open to relocation",
    industries: ["Technology", "FinTech", "HealthTech", "E-commerce", "Education"],
    contractTypes: ["Permanent", "Contract", "Project-based"]
  },

  // Gallery statistics
  galleryStats: {
    totalPhotos: 15,
    totalVideos: 8,
    lastUpdated: "2023-12-01",
    featuredCount: 12
  }
};

