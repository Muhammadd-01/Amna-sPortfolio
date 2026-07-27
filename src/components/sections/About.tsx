"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { User } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import React, { useRef } from "react";

export function About() {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for 3D spatial effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid movement
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation angles (subtle rotation for realism)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate relative position (-0.5 to 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="about" className="py-32 relative z-10 overflow-hidden bg-transparent perspective-[2000px]">
      
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
            <User size={32} className="text-brand-400" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex items-center gap-4 tracking-tight text-white drop-shadow-xl">
            <span className="text-brand-500 font-light">01.</span> About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent rounded-full mb-10" />
        </motion.div>

        <div className="max-w-6xl mx-auto flex justify-center items-center">
          
          <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            className="relative w-full rounded-[40px] p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent shadow-2xl"
          >
            {/* Liquid Blobs behind the glass layer */}
            <div className="absolute inset-0 overflow-hidden rounded-[40px] pointer-events-none" style={{ transform: "translateZ(-50px)" }}>
              <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-500/30 blur-[80px] rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-300/20 blur-[100px] rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>

            {/* Main Spatial Glass Card */}
            <div 
              className="relative w-full h-full rounded-[39px] bg-white/[0.01] backdrop-blur-3xl overflow-hidden p-8 md:p-16 flex flex-col md:flex-row gap-12"
              style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
            >
              
              {/* Inner light reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none mix-blend-overlay" />

              <div className="md:w-3/5 relative" style={{ transform: "translateZ(40px)" }}>
                <motion.div 
                  className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-300 text-sm font-medium tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                >
                  Brief Intro
                </motion.div>
                
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
                  Crafting digital <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">masterpieces.</span>
                </h3>
                
                <div className="space-y-4 mb-6">
                  {portfolio.personal.aboutParagraphs.map((paragraph, index) => (
                    <p key={index} className="text-gray-300/90 text-base md:text-lg leading-relaxed font-light">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Spatial Info Nodes */}
              <div className="md:w-2/5 flex flex-col justify-center gap-8 relative" style={{ transform: "translateZ(60px)" }}>
                
                <motion.div 
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.2)] group hover:bg-white/[0.08] transition-colors"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-brand-400 font-bold flex items-center gap-2 mb-2 opacity-80">
                    Location
                  </span>
                  <span className="text-white text-xl flex items-center gap-3 font-medium">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500 shadow-[0_0_15px_rgba(124,58,237,1)]"></span>
                    </span>
                    {portfolio.personal.location}
                  </span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.2)] group hover:bg-white/[0.08] transition-colors"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-brand-400 font-bold flex items-center gap-2 mb-2 opacity-80">
                    Focus
                  </span>
                  <span className="text-white text-xl font-medium">Spatial UI & 3D Web</span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.2)] group hover:bg-white/[0.08] transition-colors"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-brand-400 font-bold flex items-center gap-2 mb-2 opacity-80">
                    Status
                  </span>
                  <span className="text-brand-300 font-medium text-xl drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                    Available for Work
                  </span>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
