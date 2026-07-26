"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";

export function About() {
  return (
    <section id="about" className="py-32 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4">
            <span className="text-brand-500 text-glow">01.</span> About Me
          </h2>
          <div className="w-24 h-1 bg-brand-500/50 rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <GlassCard delay={0.2} hoverEffect={false} animationType="left" className="p-8 md:p-14 relative overflow-hidden">
            {/* Decorative background element inside the card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 blur-[80px] rounded-full pointer-events-none" />
            
            <p className="text-gray-300 text-xl leading-relaxed mb-10 relative z-10 font-light">
              {portfolio.personal.bio}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-400 relative z-10 pt-8 border-t border-white/5 mt-auto">
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-brand-500 font-bold">Location</span>
                <span className="text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                  {portfolio.personal.location}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-brand-500 font-bold">Focus</span>
                <span className="text-white">Interactive 3D UI</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-brand-500 font-bold">Status</span>
                <span className="text-brand-300 border border-brand-500/30 bg-brand-900/20 px-3 py-1 rounded-full text-sm inline-flex items-center w-max">
                  Available for Work
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
