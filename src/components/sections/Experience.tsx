"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Briefcase } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { useRef, useState } from "react";

// Spatial Experience Card with localized tilt
function ExperienceCard({ exp, index }: { exp: any, index: number }) {
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
      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.1 }}
      className={`relative w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:ml-auto pl-8 md:pl-0 md:pr-12 text-left md:text-right" : "pr-8 md:pr-0 md:pl-12 text-left"}`}
      style={{ perspective: 1000 }}
    >
      {/* Node connecting dot on timeline */}
      <div className={`absolute top-6 w-5 h-5 rounded-full z-10 transition-all duration-500 shadow-[0_0_20px_rgba(124,58,237,0.8)]
        ${index % 2 === 0 ? "left-0 -translate-x-1/2 md:left-0 md:translate-x-0 md:right-[-2.5rem]" : "left-0 -translate-x-1/2 md:left-[-2.5rem]" }`}
      >
        <div className="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-30" />
        <div className="relative w-full h-full bg-white border-[3px] border-brand-500 rounded-full" />
      </div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative group p-[1px] rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5"
      >
        {/* Liquid Bloom behind card */}
        <div className="absolute inset-0 bg-brand-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(-20px)" }} />

        {/* Spatial Glass Panel */}
        <div 
          className="relative rounded-[23px] bg-white/[0.02] backdrop-blur-3xl p-8 overflow-hidden"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Inner overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-brand-300 uppercase bg-brand-900/30 rounded-full border border-brand-500/30">
              {exp.period}
            </span>
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-brand-300 transition-colors drop-shadow-md">
              {exp.role}
            </h3>
            <h4 className="text-xl text-gray-300 mb-4 font-light">
              {exp.company}
            </h4>
            <p className="text-gray-400 mb-6 font-light leading-relaxed">
              {exp.description}
            </p>
            <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
              {exp.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium text-white bg-white/5 border border-white/10 rounded-lg shadow-sm backdrop-blur-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress inside the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Convert scroll progress to a height percentage for the glowing line
  const heightProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Spring the height for smoother filling effect
  const smoothHeight = useSpring(heightProgress, { stiffness: 50, damping: 20 });

  return (
    <section id="experience" className="py-32 relative z-10 bg-transparent overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

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
            <Briefcase size={32} className="text-brand-400" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex items-center gap-4 tracking-tight text-white drop-shadow-lg">
            <span className="text-brand-500 font-light">03.</span> Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent rounded-full mb-10" />
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
            {portfolio.experience.map((exp, index) => (
              <div key={index} className="flex flex-col md:flex-row relative">
                {/* Desktop Spacer for alternating layout */}
                {index % 2 === 1 && <div className="hidden md:block w-[calc(50%-2rem)] mr-auto" />}
                
                <ExperienceCard exp={exp} index={index} />

                {/* Desktop Spacer for alternating layout */}
                {index % 2 === 0 && <div className="hidden md:block w-[calc(50%-2rem)] ml-auto" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
