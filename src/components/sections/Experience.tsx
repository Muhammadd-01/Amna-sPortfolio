"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";

export function Experience() {
  return (
    <section id="experience" className="py-32 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4">
            <span className="text-brand-500 text-glow">03.</span> Experience
          </h2>
          <div className="w-24 h-1 bg-brand-500/50 rounded-full" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto pl-4 md:pl-0">
          {/* Timeline Line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-900/50 -translate-x-1/2" />

          {portfolio.experience.map((exp, index) => (
            <div key={index} className="relative mb-16 last:mb-0 md:w-1/2 md:odd:pr-12 md:even:pl-12 md:even:ml-auto md:odd:text-right">
              
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-6 -left-[19px] md:top-8 md:absolute md:left-auto md:right-[-25px] md:even:-left-[25px] w-4 h-4 rounded-full bg-bg-base border-2 border-brand-500 z-10 shadow-[0_0_10px_rgba(124,58,237,0.8)]"
              />

              <GlassCard delay={0.1} className="relative z-0 p-8 border-l-4 border-l-brand-500/50 hover:border-l-brand-400">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{exp.position}</h3>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-900/30 text-brand-300 text-sm font-medium border border-brand-800/50 shadow-[inset_0_0_10px_rgba(139,92,246,0.1)]">
                    {exp.period}
                  </span>
                </div>
                
                <h4 className="text-lg text-brand-400 font-semibold mb-6 uppercase tracking-widest text-sm">{exp.company}</h4>
                <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map(tech => (
                    <span key={tech} className="text-xs font-medium px-3 py-1.5 bg-bg-highlight/50 text-gray-300 rounded-lg border border-white/5 hover:border-brand-500/30 hover:text-white transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
