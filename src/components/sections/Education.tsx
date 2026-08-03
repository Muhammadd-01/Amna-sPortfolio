"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { GraduationCap, BookOpen, FileText, Award, Eye, X, ExternalLink, Maximize2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRef, useState, useEffect } from "react";

// Spatial Education Card with localized tilt
function SpatialEducationCard({ edu, index }: { edu: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.1 }}
      className={`relative w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:mr-auto pr-8 md:pr-0 md:pl-12 text-left" : "ml-8 md:ml-auto pl-8 md:pl-0 md:pr-12 text-left md:text-right"}`}
      style={{ perspective: 1000 }}
    >
      {/* Node connecting dot on timeline */}
      <div className={`absolute top-6 w-5 h-5 rounded-full z-10 transition-all duration-500 shadow-[0_0_20px_rgba(124,58,237,0.8)]
        ${index % 2 === 0 ? "left-0 -translate-x-1/2 md:right-0 md:translate-x-[2.5rem] md:left-auto" : "left-0 -translate-x-1/2 md:left-[-2.5rem]" }`}
      >
        <div className="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-30" />
        <div className="relative w-full h-full bg-white border-[3px] border-brand-500 rounded-full" />
      </div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative group p-[1px] rounded-[30px] bg-gradient-to-br from-white/10 via-transparent to-white/5"
      >
        {/* Liquid Bloom behind card */}
        <div className="absolute inset-0 bg-brand-500/20 blur-[60px] rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(-20px)" }} />

        {/* Spatial Glass Panel */}
        <div 
          className="relative rounded-[29px] bg-white/[0.02] backdrop-blur-3xl p-8 overflow-hidden"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Inner overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none mix-blend-overlay" />
          
          <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
            
            <div className={`flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
              <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-brand-300 transition-colors drop-shadow-md">
                {edu.degree}
              </h3>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 text-brand-300 text-sm font-bold tracking-wider border border-white/10 shadow-[inset_0_0_10px_rgba(139,92,246,0.1)] backdrop-blur-md">
                {edu.year}
              </span>
            </div>
            
            <h4 className={`text-lg text-brand-400 font-semibold mb-2 flex items-center gap-3 ${index % 2 === 0 ? "" : "md:justify-end"}`}>
              {index % 2 === 1 && <span className="w-6 h-[2px] bg-brand-500/50 hidden md:block" />}
              {edu.institution}
              {index % 2 === 0 && <span className="w-6 h-[2px] bg-brand-500/50 hidden md:block" />}
            </h4>
            
            <p className="text-brand-300/60 mb-6 font-medium tracking-wide uppercase text-sm">{edu.field}</p>
            
            <p className="text-gray-400 leading-relaxed font-light group-hover:text-gray-200 transition-colors">
              {edu.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Spatial Certification Card with Image Preview & 3D Tilt
function SpatialCertificationCard({ cert, index, onSelect }: { cert: any; index: number; onSelect?: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
    setPosition({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setOpacity(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
      className="relative group cursor-pointer w-full flex flex-col h-full"
      style={{ perspective: 1000 }}
      onClick={onSelect}
    >
      <div className="absolute inset-0 bg-brand-500/15 blur-[40px] rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(-20px)" }} />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-[24px] p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent shadow-xl flex-1 flex flex-col"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-10 rounded-[24px]"
          style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(124, 58, 237, 0.2), transparent 40%)`,
          }}
        />

        <div
          className="relative rounded-[23px] bg-white/[0.02] backdrop-blur-2xl overflow-hidden flex flex-col h-full"
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
        >
          {/* Certificate Image Thumbnail (if available) */}
          {cert.image ? (
            <div className="relative w-full aspect-[16/10] bg-bg-elevated overflow-hidden border-b border-white/10 group/img cursor-pointer">
              <img
                src={cert.image}
                alt={cert.name}
                className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-bg-base/30 to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-300 bg-brand-900/60 backdrop-blur-xs">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(124,58,237,0.8)] tracking-wide">
                  <Eye size={14} /> View Certificate
                </span>
              </div>
            </div>
          ) : (
            <div className="p-6 pb-0">
              <div className="w-12 h-12 rounded-2xl bg-brand-900/50 border border-brand-500/30 flex items-center justify-center mb-4 text-brand-300 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                <Award size={24} />
              </div>
            </div>
          )}

          {/* Certificate Content Info */}
          <div className="p-6 flex-1 flex flex-col relative z-10" style={{ transform: "translateZ(30px)" }}>
            <h4 className="text-white font-bold text-xl mb-1 group-hover:text-brand-300 transition-colors drop-shadow-sm">
              {cert.name}
            </h4>
            <p className="text-brand-400 text-sm font-semibold mb-2">{cert.organization}</p>
            {cert.date && <p className="text-brand-300/70 text-xs font-medium mb-3">{cert.date}</p>}
            {cert.description && (
              <p className="text-gray-400 text-xs leading-relaxed font-light mt-auto pt-3 border-t border-white/5 group-hover:text-gray-300 transition-colors">
                {cert.description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Spatial Statistics Card with 3D Tilt
function SpatialStatCard({ stat, index }: { stat: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
    setPosition({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setOpacity(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
      className="relative group cursor-pointer w-full"
      style={{ perspective: 1000 }}
    >
      <div className="absolute inset-0 bg-brand-500/15 blur-[40px] rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(-20px)" }} />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-[24px] p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent shadow-xl"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-10 rounded-[24px]"
          style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(124, 58, 237, 0.2), transparent 40%)`,
          }}
        />

        <div
          className="relative rounded-[23px] bg-white/[0.02] backdrop-blur-2xl p-6 overflow-hidden text-center flex flex-col items-center justify-center h-full"
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none mix-blend-overlay" />

          <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
            <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500 mb-2 drop-shadow-sm">
              {stat.value}
            </div>
            <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  // Track scroll progress inside the container for the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const heightProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothHeight = useSpring(heightProgress, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedCert]);

  return (
    <section id="education" className="py-32 relative z-10 bg-transparent overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-brand-700/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-brand-400/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none animate-[spin_20s_linear_infinite]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Standardized Spatial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-2xl bg-brand-900/50 border border-brand-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
          >
            <BookOpen size={32} className="text-brand-400" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex items-center gap-4 tracking-tight text-white drop-shadow-lg">
            <span className="text-brand-500 font-light">05.</span> Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl text-lg font-light mb-8">
            My academic journey and continuous pursuit of knowledge in the ever-evolving tech landscape.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          
          {/* Timeline Background Track */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 rounded-full" />
          
          {/* Scroll-linked Fluid Timeline Line */}
          <motion.div 
            style={{ height: smoothHeight }}
            className="absolute left-0 md:left-1/2 top-0 w-[4px] bg-gradient-to-b from-brand-300 via-brand-500 to-brand-700 -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(139,92,246,1)] z-0 origin-top"
          />

          <div className="space-y-16">
            {portfolio.education.map((edu, index) => (
              <div key={index} className="flex flex-col md:flex-row relative">
                {/* Desktop Spacer for alternating layout */}
                {index % 2 === 1 && <div className="hidden md:block w-[calc(50%-2rem)] mr-auto" />}
                
                <SpatialEducationCard edu={edu} index={index} />

                {/* Desktop Spacer for alternating layout */}
                {index % 2 === 0 && <div className="hidden md:block w-[calc(50%-2rem)] ml-auto" />}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Subsection with 3D Spatial Tilt & Image Modal */}
        <div className="mt-24 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-white mb-10 flex items-center justify-center gap-3">
            <Award className="text-brand-400" size={24} />
            Certifications & Accomplishments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {portfolio.certifications.map((cert, index) => (
              <SpatialCertificationCard 
                key={index} 
                cert={cert} 
                index={index} 
                onSelect={() => cert.image && setSelectedCert(cert)}
              />
            ))}
          </div>
        </div>

        {/* Portfolio Statistics */}
        <div className="mt-20 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {portfolio.statistics.map((stat, index) => (
            <SpatialStatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-wrap justify-center gap-6 relative z-20"
        >
          <a href={portfolio.personal.resumeUrl} target="_blank" rel="noreferrer">
            <MagneticButton variant="primary" className="shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] px-8 py-4">
              View CV
              <FileText size={18} className="ml-2" />
            </MagneticButton>
          </a>
          <a href={portfolio.personal.resumeUrl} download target="_blank" rel="noreferrer">
            <MagneticButton variant="outline" className="px-8 py-4 bg-white/[0.02] backdrop-blur-md">
              Download CV
              <FileText size={18} className="ml-2" />
            </MagneticButton>
          </a>
        </motion.div>

      </div>

      {/* High Resolution Lightbox Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-[40px]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 max-w-5xl w-full max-h-[90vh] bg-bg-elevated/95 border border-white/10 rounded-[32px] overflow-hidden flex flex-col shadow-[0_0_80px_rgba(124,58,237,0.5)]"
            >
              {/* Modal Header */}
              <div className="p-6 md:px-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-sm">
                    {selectedCert.name}
                  </h3>
                  <p className="text-brand-300 text-sm font-semibold">
                    {selectedCert.organization} {selectedCert.date && `• ${selectedCert.date}`}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <a
                    href={selectedCert.image}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                    title="Open Full Quality File"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Certificate Image View */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center bg-black/40">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className="max-w-full max-h-[65vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
                />
              </div>

              {/* Modal Footer */}
              {selectedCert.description && (
                <div className="p-6 md:px-8 border-t border-white/10 bg-white/[0.02] text-gray-300 text-sm font-light">
                  {selectedCert.description}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
