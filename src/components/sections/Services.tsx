"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, Box, Layout, Smartphone, Sparkles } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { useState, useRef } from "react";

const Figma = ({ size = 32, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>
);

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code size={32} className="text-brand-300" />,
  Figma: <Figma size={32} className="text-brand-300" />,
  Box: <Box size={32} className="text-brand-300" />,
  Layout: <Layout size={32} className="text-brand-300" />,
  Smartphone: <Smartphone size={32} className="text-brand-300" />,
  Sparkles: <Sparkles size={32} className="text-brand-300" />,
};

// Spatial Spotlight Card for Services
function SpatialServiceCard({ service, index }: { service: any, index: number }) {
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
    
    // For 3D Tilt
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);

    // For Spotlight
    setPosition({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.15, type: "spring", bounce: 0.4 }}
      className="h-full relative group"
      style={{ perspective: 1000 }}
    >
      {/* Liquid Bloom behind card */}
      <div className="absolute inset-0 bg-brand-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(-20px)" }} />

      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-[30px] p-[1px] bg-gradient-to-br from-white/10 via-transparent to-white/5 shadow-2xl"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-10 rounded-[30px]"
          style={{
            opacity,
            background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(124, 58, 237, 0.15), transparent 40%)`,
          }}
        />
        
        {/* Spatial Glass Panel */}
        <div 
          className="relative z-20 p-8 h-full flex flex-col items-start bg-white/[0.02] backdrop-blur-3xl rounded-[29px] overflow-hidden"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Inner Light Reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none mix-blend-overlay" />

          <div style={{ transform: "translateZ(40px)" }} className="relative z-10 w-full h-full flex flex-col">
            <div className="w-16 h-16 rounded-2xl bg-brand-900/40 border border-brand-500/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-500 group-hover:border-brand-400 transition-all duration-500 shadow-[0_0_15px_rgba(109,40,217,0.1)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]">
              {iconMap[service.icon] || <Sparkles size={32} className="text-brand-300 group-hover:text-white transition-colors" />}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-300 transition-colors tracking-tight drop-shadow-md">
              {service.title}
            </h3>
            
            <p className="text-gray-400 leading-relaxed font-light group-hover:text-gray-200 transition-colors flex-grow">
              {service.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-32 relative z-10 overflow-hidden bg-transparent">
      
      {/* Background Ambient Fluid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-brand-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-400/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none animate-[spin_20s_linear_infinite]" />

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
            <Sparkles size={32} className="text-brand-400" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex items-center gap-4 tracking-tight text-white drop-shadow-lg">
            <span className="text-brand-500 font-light">03.</span> What I Do
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl text-lg font-light">
            I deliver high-quality digital solutions tailored to modern web standards, focusing on performance, aesthetics, and user experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {portfolio.services.map((service, index) => (
            <SpatialServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
