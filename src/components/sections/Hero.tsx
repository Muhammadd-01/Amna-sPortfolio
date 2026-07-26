"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { portfolio } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            className="text-brand-300 font-medium tracking-wide mb-4 flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-brand-500" />
            Hello, I'm
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              y: [0, -10, 0],
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 2.4 },
              y: { 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2.4 
              }
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]"
          >
            {portfolio.personal.name}
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.6 }}
            className="text-2xl md:text-3xl text-gray-400 font-light mb-8"
          >
            {portfolio.personal.role}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.8 }}
            className="text-gray-400 max-w-xl text-lg leading-relaxed mb-12"
          >
            {portfolio.personal.bio}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 3.0 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a href="#projects">
              <MagneticButton variant="primary">
                View My Work
                <ArrowRight size={18} />
              </MagneticButton>
            </a>
            
            <a href="#contact">
              <MagneticButton variant="ghost">
                Let's Connect
              </MagneticButton>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-gray-500 uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gray-800 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-brand-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
