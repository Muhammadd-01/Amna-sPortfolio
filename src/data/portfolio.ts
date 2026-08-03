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
      images: [
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1200&q=80"
      ],
      technologies: ["React.js", "SPA Architecture", "Real-Time State", "API Integration"],
      githubUrl: "https://github.com/AmnaNihal",
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
      images: [
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
      ],
      technologies: ["React.js", "FastAPI", "Groq AI", "TensorFlow.js", "MediaPipe Pose", "SQLite", "SQLAlchemy"],
      githubUrl: "https://github.com/AmnaNihal",
      liveUrl: "",
    },
    {
      title: "Fitness Tracker",
      category: "Full-Stack Application",
      type: "Personal Project",
      date: "January 2026 – February 2026",
      description: "A full-stack fitness tracking platform designed to manage users, workouts, and fitness data.",
      longDescription: "Comprehensive fitness management platform combining RESTful APIs and GraphQL query layers for flexible data handling. Features secure JWT authentication, workout logging, and MongoDB persistence. Currently being extended with AI-powered features using LLM-based workflows.",
      images: [
        "https://images.unsplash.com/photo-1510519138161-5844623e641c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1576678927484-cc909d51961a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80"
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "GraphQL", "REST APIs", "JWT"],
      githubUrl: "https://github.com/AmnaNihal",
      liveUrl: "",
    },
    {
      title: "Karnel Travel",
      category: "Full-Stack Booking Platform",
      type: "Academic Project",
      date: "2024",
      description: "Multi-feature travel booking platform built with ASP.NET Core MVC and SQL Server.",
      longDescription: "Academic booking platform utilizing ASP.NET Core MVC and relational SQL Server database architecture. Features travel booking, user authentication, role-based authorization, booking management, and complete CRUD operations with strict separation of concerns.",
      images: [
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
      ],
      technologies: ["ASP.NET Core MVC", "SQL Server", "MVC Architecture", "C#"],
      githubUrl: "https://github.com/AmnaNihal",
      liveUrl: "",
    },
    {
      title: "Personal Portfolio",
      category: "Frontend Project",
      type: "Personal Project",
      date: "2025",
      description: "Responsive Single Page Application with component architecture, WCAG accessibility, and lazy loading.",
      longDescription: "Personal developer portfolio built with React.js, TypeScript, and React Hooks. Follows WCAG web accessibility guidelines, semantic HTML, cross-browser compatibility, lazy loading, and performance optimizations. Deployed seamlessly on Vercel.",
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
      ],
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
      description: "Focus areas: Database Development, Object-Oriented Programming, API Architecture, Software Management, and Modern Web Development.",
    },
    {
      institution: "Hawaa Jee Girls College",
      degree: "Higher Secondary Education (Intermediate)",
      field: "Science / Pre-Engineering",
      year: "2021 – 2022",
      description: "Completed intermediate education with emphasis on mathematics, computer fundamentals, and scientific principles.",
    },
    {
      institution: "The Educators",
      degree: "Secondary School Certificate (Matriculation)",
      field: "Science",
      year: "2019 – 2020",
      description: "Secondary education with a focused curriculum in science, mathematics, and foundational computing.",
    },
    {
      institution: "Hala International School Jeddah",
      degree: "Primary & Junior Secondary Education",
      field: "General Studies & Science",
      year: "2008 – 2017",
      description: "International school education in Jeddah, Saudi Arabia, establishing strong academic foundations and global communication skills.",
    },
  ],

  certifications: [
    {
      name: "Techwiz 5 - Special Jury Mention",
      organization: "Techwiz 5 / Aptech Learning",
      date: "November 2024",
      description: "Special Jury Mention in Website Design & Development category representing Team MSG-Apex from Aptech Metro Star Gate in Techwiz 5 Global IT Competition.",
      image: "/certificates/techwiz-5.jpg",
      link: "/certificates/techwiz-5.jpg",
    },
    {
      name: "Web Development Internship Certificate",
      organization: "CodeAlpha",
      date: "July 2025 – October 2025",
      description: "Virtual Internship Program in Web Development. Student ID: CA/JU3/7666. Issued on 10th October 2025.",
      image: "/certificates/codealpha-completion.png",
      link: "/certificates/codealpha-completion.png",
    },
    {
      name: "Letter of Recommendation (Web Development)",
      organization: "CodeAlpha",
      date: "October 2025",
      description: "Official Letter of Recommendation recognizing analytical skills, fast technical adaptation, high productivity, and strong team collaboration.",
      image: "/certificates/codealpha-lor.png",
      link: "/certificates/codealpha-lor.png",
    },
    {
      name: "EY Techathon 6.0 Certificate of Participation",
      organization: "Ernst & Young (EY) & Unstop",
      date: "2024",
      description: "Participated in Round 1: Executive Summary Submission of EY Techathon 6.0 organized by EY.",
      image: "/certificates/ey-techathon.png",
      link: "/certificates/ey-techathon.png",
    },
    {
      name: "Corporate Strategy",
      organization: "University of London",
      date: "Completed",
      description: "Corporate governance, strategic positioning, and business growth framework analysis.",
      link: "#",
    },
    {
      name: "Programming in C#",
      organization: "Aptech Learning",
      date: "Completed",
      description: "Object-oriented programming, C# syntax, data structures, and application logic.",
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
