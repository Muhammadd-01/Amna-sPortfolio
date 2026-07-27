export const portfolio = {
  personal: {
    name: "Amna Nehal",
    shortName: "Amna",
    role: "MERN Stack Developer | Full-Stack Developer",
    bio: "Results-driven MERN Stack Developer with hands-on experience building and deploying full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Specializing in modern, responsive, scalable web applications with strong backend architecture, REST APIs, authentication systems, and responsive UI/UX.",
    aboutParagraphs: [
      "I’m Amna Nehal, a MERN Stack and Full-Stack Developer focused on building modern, scalable, and user-friendly web applications. I have hands-on experience working across both frontend and backend development, using technologies such as React.js, TypeScript, Node.js, Express.js, MongoDB, SQL Server, FastAPI, and ASP.NET Core MVC.",
      "My development experience includes RESTful API development, JWT authentication, role-based authorization, database design, CRUD operations, responsive UI development, and Agile collaboration.",
      "I also have an expanding interest in AI-powered applications, working with technologies such as LangChain, FAISS, Retrieval-Augmented Generation (RAG), document embeddings, semantic search, FastAPI, and LLM workflows.",
      "I enjoy turning ideas into complete digital products—from system architecture and database design to frontend interfaces, APIs, authentication, testing, and deployment."
    ],
    location: "Karachi, Pakistan / Remote",
    email: "amnanihal21@gmail.com",
    profileImage: "/placeholder-profile.jpg",
    resumeUrl: "/resume.pdf",
  },

  social: {
    github: "https://github.com/AmnaNihal",
    linkedin: "https://my-portfolio-beta-seven-82.vercel.app",
    instagram: "https://my-portfolio-beta-seven-82.vercel.app",
    twitter: "https://my-portfolio-beta-seven-82.vercel.app",
    portfolio: "https://my-portfolio-beta-seven-82.vercel.app"
  },

  skills: [
    // Frontend
    { name: "React.js", category: "Frontend", level: 95 },
    { name: "TypeScript", category: "Frontend", level: 90 },
    { name: "JavaScript ES6+", category: "Frontend", level: 95 },
    { name: "HTML5 & CSS3", category: "Frontend", level: 95 },
    { name: "Bootstrap & Tailwind", category: "Frontend", level: 90 },
    { name: "jQuery", category: "Frontend", level: 80 },
    { name: "Single Page Apps (SPA)", category: "Frontend", level: 90 },
    { name: "Web Accessibility / WCAG", category: "Frontend", level: 85 },
    { name: "React Hooks & Context API", category: "Frontend", level: 90 },

    // Backend
    { name: "Node.js", category: "Backend", level: 90 },
    { name: "Express.js", category: "Backend", level: 90 },
    { name: "RESTful APIs", category: "Backend", level: 95 },
    { name: "GraphQL", category: "Backend", level: 80 },
    { name: "ASP.NET Core MVC", category: "Backend", level: 80 },
    { name: "FastAPI", category: "Backend", level: 85 },

    // Databases
    { name: "MongoDB & Mongoose", category: "Databases", level: 90 },
    { name: "MySQL", category: "Databases", level: 85 },
    { name: "SQL Server", category: "Databases", level: 85 },
    { name: "Database Schema Design", category: "Databases", level: 90 },

    // Security & Auth
    { name: "JWT Authentication", category: "Security", level: 90 },
    { name: "Role-Based Authorization", category: "Security", level: 90 },
    { name: "Session Management", category: "Security", level: 85 },

    // AI & Emerging Tech
    { name: "LangChain", category: "AI & Emerging", level: 80 },
    { name: "FAISS Vector DB", category: "AI & Emerging", level: 80 },
    { name: "RAG & LLM Workflows", category: "AI & Emerging", level: 85 },
    { name: "Document Embeddings", category: "AI & Emerging", level: 80 },
    { name: "Semantic Search", category: "AI & Emerging", level: 85 },
    { name: "TensorFlow.js", category: "AI & Emerging", level: 75 },
    { name: "MediaPipe Pose", category: "AI & Emerging", level: 75 },
    { name: "Groq AI", category: "AI & Emerging", level: 85 },

    // Tools & Engineering
    { name: "Git & GitHub", category: "Tools", level: 90 },
    { name: "Vite & Postman", category: "Tools", level: 90 },
    { name: "Vercel / Railway / Render", category: "Tools", level: 85 },
    { name: "Agile & MVC Architecture", category: "Tools", level: 90 }
  ],

  experience: [
    {
      company: "Clevertech",
      position: "Junior Web Developer (Remote / Seasonal)",
      period: "June 2025 – August 2025",
      description: "Developed and maintained full-stack applications using React.js, Node.js, and Express.js in a fast-paced remote Agile environment. Built and integrated RESTful APIs, implemented data handling, user authentication, and business logic using JWT for secure session management. Resolved UI/UX bugs, improved cross-browser responsiveness, managed MongoDB and SQL database operations (schema design & CRUD), and collaborated via Git/GitHub PRs and code reviews.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "SQL", "JWT", "Git/GitHub"],
    },
    {
      company: "CodeAlpha",
      position: "Web Developer Intern",
      period: "2023",
      description: "Contributed to responsive web application development and collaborated across frontend and backend tasks. Coordinated API integration between UI components and backend services to ensure consistent data flow. Participated in Agile development workflows, branch management, pull requests, and code reviews using Git and GitHub.",
      technologies: ["HTML5", "CSS3", "JavaScript", "REST APIs", "Git", "Agile"],
    },
  ],

  projects: [
    {
      title: "Home Styler",
      category: "Interior Home Design Application",
      type: "International Hackathon Project",
      badge: "🏆 3rd Place — International Hackathon",
      description: "3rd Place winner out of 12 competing countries in an International Hackathon. Led a team of 4 developers under tight constraints.",
      longDescription: "Home Styler is an interior home design Single Page Application featuring real-time state management, API integration, and responsive cross-browser compatibility. As Team Lead of 4 developers competing against teams from 12 countries, I scoped project features, delegated tasks, managed the timeline, coordinated team delivery under strict hackathon constraints, and designed the project documentation and UI architecture diagrams.",
      images: [],
      technologies: ["React.js", "SPA Architecture", "Real-Time State", "API Integration"],
      githubUrl: "",
      liveUrl: "",
    },
    {
      title: "AI-Driven Personal Fitness & Nutrition Portal v2.0",
      category: "AI + Full-Stack Application",
      type: "Personal Project",
      badge: "🤖 AI Special Project",
      date: "2026",
      description: "AI-driven fitness and nutrition portal featuring real-time pose detection, automated workout plans, and nutrition intelligence.",
      longDescription: "A cutting-edge full-stack AI fitness platform. Integrates Groq AI, TensorFlow.js, and MediaPipe Pose for real-time posture detection during workouts. Backend built on FastAPI with SQLite & SQLAlchemy ORM. Provides automated personalized workout and nutrition recommendations, alongside fitness calculations (BMI, TDEE, Calorie & Macronutrient breakdowns).",
      images: [],
      technologies: ["React.js", "FastAPI", "Groq AI", "TensorFlow.js", "MediaPipe Pose", "SQLite", "SQLAlchemy"],
      githubUrl: "",
      liveUrl: "",
    },
    {
      title: "Fitness Tracker",
      category: "Full-Stack Application",
      type: "Personal Project",
      date: "January 2026 – February 2026",
      description: "A full-stack fitness tracking platform designed to manage users, workouts, and fitness data.",
      longDescription: "Comprehensive fitness management platform combining RESTful APIs and GraphQL query layers for flexible data handling. Features secure JWT authentication, workout logging, and MongoDB persistence. Currently being extended with AI-powered features using LLM-based workflows.",
      images: [],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "GraphQL", "REST APIs", "JWT"],
      githubUrl: "",
      liveUrl: "",
    },
    {
      title: "Karnel Travel",
      category: "Full-Stack Booking Platform",
      type: "Academic Project",
      date: "2024",
      description: "Multi-feature travel booking platform built with ASP.NET Core MVC and SQL Server.",
      longDescription: "Academic booking platform utilizing ASP.NET Core MVC and relational SQL Server database architecture. Features travel booking, user authentication, role-based authorization, booking management, and complete CRUD operations with strict separation of concerns.",
      images: [],
      technologies: ["ASP.NET Core MVC", "SQL Server", "MVC Architecture", "C#"],
      githubUrl: "",
      liveUrl: "",
    },
    {
      title: "Personal Portfolio",
      category: "Frontend Project",
      type: "Personal Project",
      date: "2025",
      description: "Responsive Single Page Application with component architecture, WCAG accessibility, and lazy loading.",
      longDescription: "Personal developer portfolio built with React.js, TypeScript, and React Hooks. Follows WCAG web accessibility guidelines, semantic HTML, cross-browser compatibility, lazy loading, and performance optimizations. Deployed seamlessly on Vercel.",
      images: [],
      technologies: ["React.js", "TypeScript", "React Hooks", "HTML5/CSS3", "Vercel"],
      githubUrl: "https://github.com/AmnaNihal",
      liveUrl: "https://my-portfolio-beta-seven-82.vercel.app",
    },
  ],

  services: [
    {
      title: "Full-Stack Web Development",
      description: "Building modern, scalable, and responsive web applications with MERN stack & SQL/NoSQL databases.",
      icon: "Code",
    },
    {
      title: "API Architecture & Security",
      description: "Designing RESTful & GraphQL APIs with JWT authentication, role-based authorization, and session management.",
      icon: "Database",
    },
    {
      title: "AI & LLM Integration",
      description: "Developing AI workflows, RAG systems, document embeddings, semantic search, and computer vision integration.",
      icon: "Cpu",
    },
  ],

  education: [
    {
      institution: "Aptech Learning",
      degree: "Associate's Degree (Currently Pursuing)",
      field: "Software Engineering",
      year: "2024 – Present",
      description: "Relevant areas of study: Database Development, Object-Oriented Programming, API Development, Software Management, and Software Development.",
    },
  ],

  certifications: [
    {
      name: "Corporate Strategy",
      organization: "University of London",
      date: "Completed",
      link: "#",
    },
    {
      name: "Web Developer Internship Certificate",
      organization: "CodeAlpha",
      date: "Completed",
      link: "#",
    },
    {
      name: "Programming in C#",
      organization: "Aptech Learning",
      date: "Completed",
      link: "#",
    },
  ],

  statistics: [
    { label: "Countries Competed Against", value: "12" },
    { label: "International Hackathon Placement", value: "3rd Place" },
    { label: "Hackathon Team Size", value: "4 Members" },
    { label: "Featured Engineering Projects", value: "5" },
  ]
};
