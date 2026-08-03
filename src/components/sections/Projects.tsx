"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Code2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const Github = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

// Auto-looping Image Carousel
function ImageCarousel({ images, layoutIdPrefix, title }: { images: string[], layoutIdPrefix: string, title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [images, isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!images || images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!images || images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <motion.div layoutId={`${layoutIdPrefix}-container-${title}`} className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gradient-to-br from-bg-highlight to-bg-elevated">
        <span className="opacity-50 tracking-widest text-sm font-medium uppercase text-center px-4">Preview: {title}</span>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layoutId={`${layoutIdPrefix}-container-${title}`} 
      className="relative w-full h-full overflow-hidden bg-bg-elevated group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={images[currentIndex]}
            alt={`${title} preview ${currentIndex + 1}`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Hover overlay gradient */}
      <div className="absolute inset-0 bg-brand-900/10 group-hover/carousel:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />

      {/* Manual Navigation Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/50 hover:bg-brand-600 border border-white/20 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/50 hover:bg-brand-600 border border-white/20 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Progress Indicators / Dot Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-30 pointer-events-auto">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-6 h-1.5 rounded-full bg-brand-400 shadow-[0_0_10px_rgba(124,58,237,0.9)]'
                  : 'w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter Badge */}
      <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-bold text-gray-300 tracking-widest uppercase">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
}

// Spatial Project Card (Grid Item - Slim Vertical Layout)
function SpatialProjectCard({ project, index, onClick }: { project: any, index: number, onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

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

  // Fallback to first image in array or a placeholder if none exist
  const imageUrl = project.images && project.images.length > 0 ? project.images[0] : project.image;

  return (
    <motion.div
      layout
      layoutId={`project-wrapper-${project.title}`}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.4 }}
      className="relative group cursor-pointer w-full max-w-[420px] mx-auto h-full"
      style={{ perspective: 1500 }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-brand-500/10 blur-[40px] rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(-20px)" }} />

      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-[24px] p-[1px] bg-gradient-to-br from-white/10 via-transparent to-white/5 shadow-xl overflow-visible flex flex-col"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-10 rounded-[24px]"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(124, 58, 237, 0.15), transparent 40%)`,
          }}
        />

        <div 
          className="relative z-20 flex flex-col h-full w-full bg-white/[0.02] backdrop-blur-2xl rounded-[23px] overflow-hidden"
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
        >
          {/* Project Image Area (Top side) */}
          <div className="relative w-full aspect-[4/3] border-b border-white/5 overflow-hidden shrink-0 bg-bg-elevated">
            <ImageCarousel images={project.images} layoutIdPrefix="project-image" title={project.title} />
          </div>
          
          {/* Project Details Area (Bottom side) */}
          <div className="p-6 md:p-8 flex-1 flex flex-col relative z-20 bg-gradient-to-b from-transparent to-white/[0.01]" style={{ transform: "translateZ(30px)" }}>
            <div className="relative z-10 flex flex-col h-full">
              
              <div className="flex justify-between items-start mb-3">
                <motion.span layoutId={`project-category-${project.title}`} className="text-brand-400 text-[10px] font-bold tracking-[0.2em] uppercase opacity-80">
                  {project.category}
                </motion.span>
              </div>
              
              <motion.h3 layoutId={`project-title-${project.title}`} className="text-2xl font-bold text-white group-hover:text-brand-300 transition-colors drop-shadow-sm tracking-tight mb-3">
                {project.title}
              </motion.h3>
              
              <motion.p layoutId={`project-desc-${project.title}`} className="text-gray-400 mb-6 flex-1 text-sm leading-relaxed font-light group-hover:text-gray-300 transition-colors line-clamp-3">
                {project.description}
              </motion.p>
              
              <motion.div layoutId={`project-tech-${project.title}`} className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.slice(0, 3).map((tech: string) => (
                  <span key={tech} className="px-2.5 py-1 text-[10px] font-medium text-brand-200 bg-brand-900/30 border border-brand-500/20 rounded-md shadow-[inset_0_0_8px_rgba(139,92,246,0.1)] backdrop-blur-sm">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2.5 py-1 text-[10px] font-medium text-brand-200 bg-brand-900/30 border border-brand-500/20 rounded-md shadow-[inset_0_0_8px_rgba(139,92,246,0.1)] backdrop-blur-sm">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const categories = ["All", ...Array.from(new Set(portfolio.projects.map(project => project.category)))];
  
  const filteredProjects = activeFilter === "All" 
    ? portfolio.projects 
    : portfolio.projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="py-32 relative z-10 bg-transparent overflow-hidden">
      
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-brand-600/10 blur-[150px] rounded-full pointer-events-none animate-[pulse_15s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-brand-400/5 blur-[120px] rounded-full pointer-events-none animate-[spin_30s_linear_infinite]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
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

        {/* Grid Layout for Vertical Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <SpatialProjectCard 
                key={project.title} 
                project={project} 
                index={index} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-12 py-12 perspective-[2000px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-[40px]"
            />
            
            <motion.div
              layoutId={`project-wrapper-${selectedProject.title}`}
              className="relative w-full max-w-6xl h-full max-h-[85vh] rounded-[40px] p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-white/10 shadow-[0_0_100px_rgba(124,58,237,0.4)] flex flex-col"
              style={{ transformStyle: "preserve-3d" }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 border border-white/10 text-white backdrop-blur-xl transition-colors shadow-xl hover:scale-110"
              >
                <X size={24} />
              </button>

              <div className="relative z-20 flex flex-col md:flex-row h-full bg-bg-base/90 backdrop-blur-3xl rounded-[39px] overflow-hidden">
                
                {/* Modal Carousel Side */}
                <div className="md:w-[45%] relative border-r border-white/5 overflow-hidden">
                  <ImageCarousel images={selectedProject.images} layoutIdPrefix="project-image" title={selectedProject.title} />
                </div>

                {/* Modal Details Side */}
                <div className="md:w-[55%] p-8 md:p-14 flex flex-col overflow-y-auto">
                  <motion.span layoutId={`project-category-${selectedProject.title}`} className="text-brand-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 block opacity-80">
                    {selectedProject.category}
                  </motion.span>
                  
                  <motion.h3 layoutId={`project-title-${selectedProject.title}`} className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-md">
                    {selectedProject.title}
                  </motion.h3>

                  <motion.div layoutId={`project-tech-${selectedProject.title}`} className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.technologies.map((tech: string) => (
                      <span key={tech} className="px-4 py-2 text-sm font-medium text-brand-100 bg-brand-900/30 border border-brand-500/20 rounded-lg shadow-[inset_0_0_10px_rgba(139,92,246,0.1)] backdrop-blur-md">
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                  
                  <motion.p layoutId={`project-desc-${selectedProject.title}`} className="text-gray-300 text-lg leading-relaxed font-light mb-10">
                    {selectedProject.longDescription || selectedProject.description}
                  </motion.p>

                  <div className="mt-auto flex gap-4 pt-8 border-t border-white/10">
                    {selectedProject.githubUrl && (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors font-medium hover:scale-[1.02] active:scale-[0.98]">
                        <Github size={20} />
                        View Source
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-brand-500 text-white hover:bg-brand-400 transition-colors font-medium shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-[1.02] active:scale-[0.98]">
                        <ExternalLink size={20} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
                
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
