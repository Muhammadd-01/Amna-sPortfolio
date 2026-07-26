export const portfolio = {
  personal: {
    name: "Amna Muhammad Nehal",
    shortName: "Amna",
    role: "YOUR PROFESSIONAL TITLE",
    bio: "YOUR PROFESSIONAL BIO GOES HERE. Describe your expertise, your passion, and what you build.",
    location: "LOCATION",
    email: "your.email@example.com",
    profileImage: "/placeholder-profile.jpg", // Add your image to public folder and update this
  },

  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    instagram: "https://instagram.com/yourusername",
    twitter: "https://twitter.com/yourusername",
  },

  skills: [
    { name: "React", category: "Frontend", level: 90 },
    { name: "Next.js", category: "Frontend", level: 85 },
    { name: "TypeScript", category: "Frontend", level: 85 },
    { name: "Three.js", category: "Frontend", level: 75 },
    { name: "Tailwind CSS", category: "Frontend", level: 95 },
    { name: "Node.js", category: "Backend", level: 70 },
    { name: "Figma", category: "Design", level: 80 },
  ],

  experience: [
    {
      company: "Company Name",
      position: "Position",
      period: "202X – Present",
      description: "Describe your responsibilities and achievements here.",
      technologies: ["React", "TypeScript", "Tailwind"],
    },
  ],

  projects: [
    {
      title: "Project One",
      description: "A description of your featured project. Explain the problem it solves and your role.",
      image: "/placeholder-project-1.jpg",
      technologies: ["Next.js", "Three.js", "Tailwind"],
      githubUrl: "https://github.com/yourusername/project1",
      liveUrl: "https://project1.com",
      category: "Featured",
    },
    {
      title: "Project Two",
      description: "Another great project you built.",
      image: "/placeholder-project-2.jpg",
      technologies: ["React", "Node.js"],
      githubUrl: "https://github.com/yourusername/project2",
      liveUrl: "https://project2.com",
      category: "Web Development",
    },
  ],

  services: [
    {
      title: "Web Development",
      description: "Building responsive, modern, and high-performance websites.",
      icon: "Code",
    },
    {
      title: "UI/UX Design",
      description: "Designing intuitive and aesthetically pleasing user interfaces.",
      icon: "Figma",
    },
    {
      title: "Creative Development",
      description: "Crafting interactive 3D experiences and complex animations.",
      icon: "Box",
    },
  ],

  education: [
    {
      institution: "University Name",
      degree: "Degree Name",
      field: "Field of Study",
      year: "202X",
      description: "Any honors, clubs, or notable coursework.",
    },
  ],

  certifications: [
    {
      name: "Certification Name",
      organization: "Organization",
      date: "202X",
      link: "#",
    },
  ],
};
