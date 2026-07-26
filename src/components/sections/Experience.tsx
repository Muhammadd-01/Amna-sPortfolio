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

              <GlassCard delay={0.1} className="relative z-0">
                <span className="inline-block py-1 px-3 rounded-full bg-brand-900/50 text-brand-300 text-sm font-medium mb-4">
                  {exp.period}
                </span>
                <h3 className="text-2xl font-bold text-white mb-1">{exp.position}</h3>
                <h4 className="text-lg text-brand-400 font-medium mb-4">{exp.company}</h4>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2 md:justify-end md:even:justify-start">
                  {exp.technologies.map(tech => (
                    <span key={tech} className="text-xs font-medium px-3 py-1 bg-white/5 text-gray-300 rounded-md border border-white/10">
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
