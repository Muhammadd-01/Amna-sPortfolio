"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";

export function Skills() {
  const categories = Array.from(new Set(portfolio.skills.map(s => s.category)));

  return (
    <section id="skills" className="py-32 relative z-10 bg-bg-subtle/50">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4">
            <span className="text-brand-500 text-glow">02.</span> Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-brand-500/50 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, catIndex) => (
            <GlassCard key={category} delay={catIndex * 0.1} animationType="scale">
              <h3 className="text-xl font-medium text-white mb-6 flex items-center gap-3">
                <span className="text-brand-400">#</span>
                {category}
              </h3>
              
              <div className="space-y-6">
                {portfolio.skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <div key={skill.name} className="relative">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-brand-300 text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-bg-highlight rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full relative"
                        >
                          {/* Glow effect on the bar */}
                          <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
