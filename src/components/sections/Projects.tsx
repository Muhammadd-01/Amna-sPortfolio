"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const Github = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

// Spatial Project Card
function SpatialProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
    setPosition({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setOpacity(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.4 }}
      className="h-full relative group"
      style={{ perspective: 1200 }}
    >
      <div className="absolute inset-0 bg-brand-500/10 blur-[50px] rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(-20px)" }} />

      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-[30px] p-[1px] bg-gradient-to-br from-white/10 via-transparent to-white/5 shadow-2xl flex flex-col overflow-visible"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-10 rounded-[30px]"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(124, 58, 237, 0.15), transparent 40%)`,
          }}
        />

        <div 
          className="relative z-20 flex flex-col h-full bg-white/[0.02] backdrop-blur-3xl rounded-[29px] overflow-hidden"
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
        >
          {/* Project Image Area (Top) */}
          <div className="relative h-64 overflow-hidden bg-white/5 border-b border-white/5">
            <div className="absolute inset-0 bg-brand-900/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform duration-700 ease-out bg-gradient-to-br from-bg-highlight to-bg-elevated">
              <span className="opacity-50 tracking-widest text-sm font-medium uppercase">Preview: {project.title}</span>
            </div>
          </div>
          
          {/* Project Details Area (Bottom) */}
          <div className="p-8 flex-1 flex flex-col relative z-20" style={{ transform: "translateZ(40px)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-brand-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 block opacity-80">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white group-hover:text-brand-300 transition-colors drop-shadow-md tracking-tight">
                    {project.title}
                  </h3>
                </div>
                
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-500 hover:border-brand-400 hover:scale-110 transition-all shadow-lg">
                      <Github size={18} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-500 hover:border-brand-400 hover:scale-110 transition-all shadow-lg">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-gray-400 mb-8 flex-1 leading-relaxed font-light group-hover:text-gray-300 transition-colors line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className="px-3 py-1.5 text-xs font-medium text-brand-100 bg-brand-900/30 border border-brand-500/20 rounded-lg shadow-[inset_0_0_10px_rgba(139,92,246,0.1)] backdrop-blur-md">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(portfolio.projects.map(project => project.category)))];
  
  const filteredProjects = activeFilter === "All" 
    ? portfolio.projects 
    : portfolio.projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-32 relative z-10 bg-transparent overflow-hidden">
      
      {/* Background Liquid Blobs */}
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-brand-600/10 blur-[150px] rounded-full pointer-events-none animate-[pulse_15s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none animate-[spin_30s_linear_infinite]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Standardized Spatial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-2xl bg-brand-900/50 border border-brand-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
          >
            <Code2 size={32} className="text-brand-400" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex items-center gap-4 tracking-tight text-white drop-shadow-lg">
            <span className="text-brand-500 font-light">04.</span> Selected Work
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent rounded-full mb-10" />
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 relative z-20">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 backdrop-blur-md ${
                  activeFilter === category 
                    ? "bg-brand-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.6)] border border-brand-400" 
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-brand-900/40 border border-white/10 hover:border-brand-500/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid lg:grid-cols-2 gap-10 md:gap-14">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <SpatialProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
