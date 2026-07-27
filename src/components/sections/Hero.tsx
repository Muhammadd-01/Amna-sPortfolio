"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { portfolio } from "@/data/portfolio";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
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
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-transparent perspective-[2000px]"
    >
      
      {/* Liquid Glass Background Elements */}
      <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-brand-600/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none animate-[spin_40s_linear_infinite]" />
      <div className="absolute bottom-1/4 -right-1/4 w-[50vw] h-[50vw] bg-brand-400/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none animate-[pulse_20s_ease-in-out_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-500/5 blur-[200px] rounded-full mix-blend-screen pointer-events-none animate-[spin_50s_linear_infinite_reverse]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex justify-center lg:justify-start">
        
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="max-w-4xl relative p-8 md:p-12 rounded-[40px] bg-white/[0.01] backdrop-blur-3xl border border-white/5 shadow-2xl"
        >
          {/* Inner Light Reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-[40px] mix-blend-overlay" />

          <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-900/40 border border-brand-500/30 text-brand-300 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(124,58,237,0.2)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500 shadow-[0_0_10px_rgba(124,58,237,1)]"></span>
              </span>
              <span className="text-sm font-bold tracking-[0.2em] uppercase">Available for new opportunities</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="text-brand-300 font-bold tracking-widest mb-4 flex items-center gap-4 uppercase text-sm"
            >
              <span className="w-16 h-[2px] bg-brand-500 shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
              Hello, I'm
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 leading-tight mb-4 tracking-tighter drop-shadow-lg"
            >
              {portfolio.personal.name}
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
              className="text-3xl md:text-5xl text-brand-400 font-light mb-8 drop-shadow-md"
            >
              {portfolio.personal.role}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
              className="text-gray-300 max-w-2xl text-xl md:text-2xl leading-relaxed mb-12 font-light"
            >
              {portfolio.personal.bio}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-6"
            >
              <a href="#projects" className="group relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                <MagneticButton variant="primary" className="relative shadow-2xl">
                  View My Work
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </a>
              
              <a href="#contact">
                <MagneticButton variant="ghost" className="hover:bg-white/5 border border-white/10 hover:border-brand-500/50 transition-colors backdrop-blur-sm">
                  Let's Connect
                </MagneticButton>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-xs tracking-[0.3em] text-gray-500 uppercase font-bold">Scroll</span>
        <div className="w-[2px] h-16 bg-white/10 rounded-full relative overflow-hidden backdrop-blur-md">
          <motion.div
            animate={{ y: [0, 64, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-brand-400 to-transparent rounded-full shadow-[0_0_15px_rgba(124,58,237,1)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
