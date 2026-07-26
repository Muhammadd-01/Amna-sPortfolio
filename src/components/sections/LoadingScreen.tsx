"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500; // 2.5 seconds
    const interval = 30; // update every 30ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg-base overflow-hidden"
        >
          {/* Central content */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-brand-400 text-sm font-mono tracking-widest mb-8 text-glow uppercase"
            >
              Initializing Environment
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-light tracking-[0.3em] text-white/90 mb-12 uppercase"
            >
              AMNA
            </motion.h1>

            {/* Glowing Progress Bar Container */}
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-4">
              <motion.div
                className="absolute top-0 left-0 h-full bg-brand-500 shadow-[0_0_20px_rgba(139,92,246,0.8)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>

            {/* Percentage and Data details */}
            <div className="w-full flex justify-between items-center text-xs font-mono text-gray-500">
              <span className="animate-pulse">Loading Assets...</span>
              <span className="text-brand-300">{Math.floor(progress)}%</span>
            </div>
          </div>
          
          <div className="absolute inset-0 noise opacity-5 z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-600/10 blur-[120px] rounded-full z-0 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
