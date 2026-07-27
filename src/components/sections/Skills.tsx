"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { useState, useRef, useEffect } from "react";

// Animated counter for the percentage
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!inView || !ref.current) return;
    
    let start = 0;
    const end = value;
    const duration = 1200; // ms
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeProgress * end);
      
      if (ref.current) {
        ref.current.textContent = `${current}%`;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        if (ref.current) ref.current.textContent = `${end}%`;
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, inView]);

  return <span ref={ref}>0%</span>;
}

// Spotlight Card Component for Skills
function SkillCard({ category, skills, index }: { category: string, skills: any[], index: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 50 }}
      className="h-full"
    >
      <div 
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className="relative h-full rounded-3xl border border-white/5 bg-bg-elevated overflow-hidden group cursor-default shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-10 rounded-3xl"
          style={{
            opacity,
            background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(124, 58, 237, 0.12), transparent 40%)`,
          }}
        />
        
        <div className="relative z-20 p-8 h-full flex flex-col backdrop-blur-sm bg-white/[0.02]">
          {/* Top Decorative Blur */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-600/10 blur-[40px] rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:bg-brand-500/20" />

          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4 tracking-tight relative z-10">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-900/50 border border-brand-500/30 text-brand-400 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
              {index + 1}
            </span>
            {category}
          </h3>
          
          <div className="space-y-5">
            {skills.map((skill, sIndex) => (
              <div key={skill.name} className="relative group/skill p-2 -mx-2 rounded-xl hover:bg-white/[0.03] transition-colors duration-300">
                <div className="flex justify-between mb-3 items-center">
                  <span className="text-gray-300 font-medium group-hover/skill:text-white transition-colors flex items-center gap-2 text-sm tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500/50 group-hover/skill:bg-brand-400 transition-colors" />
                    {skill.name}
                  </span>
                  <span className="text-brand-400 font-bold text-sm bg-brand-900/40 px-2 py-0.5 rounded-md border border-brand-800/50 group-hover/skill:border-brand-500/50 transition-colors">
                    <Counter value={skill.level} />
                  </span>
                </div>
                
                {/* Progress Bar Track */}
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-visible relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] border border-white/5">
                  {/* Animated Fill */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 + (sIndex * 0.1), ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-300 rounded-full relative"
                  >
                    {/* Glowing Tip */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + (sIndex * 0.1), duration: 0.5 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff,0_0_20px_#8B5CF6] group-hover/skill:scale-125 transition-transform"
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const categories = Array.from(new Set(portfolio.skills.map(s => s.category)));

  return (
    <section id="skills" className="py-32 relative z-10 bg-transparent overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 border border-brand-500/10 rounded-full mix-blend-screen pointer-events-none animate-[spin_60s_linear_infinite]" />
      <div className="absolute top-40 right-20 w-64 h-64 border border-brand-400/10 rounded-full mix-blend-screen pointer-events-none animate-[spin_40s_linear_infinite_reverse]" />
      <div className="absolute -left-32 top-1/3 w-[600px] h-[600px] bg-brand-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
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
            <span className="text-2xl">⚡</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl text-lg font-light">
            A comprehensive overview of my technical arsenal, constantly expanding and evolving with the latest industry standards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {categories.map((category, index) => (
            <SkillCard 
              key={category} 
              category={category} 
              skills={portfolio.skills.filter(s => s.category === category)} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
