"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";

const Github = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export function Projects() {
  return (
    <section id="projects" className="py-32 relative z-10 bg-bg-subtle/50">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4">
            <span className="text-brand-500 text-glow">04.</span> Selected Work
          </h2>
          <div className="w-24 h-1 bg-brand-500/50 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolio.projects.map((project, index) => (
            <GlassCard key={index} delay={index * 0.1} animationType="flip" className="flex flex-col group p-0 overflow-hidden">
              <div className="relative h-64 overflow-hidden bg-bg-highlight">
                <div className="absolute inset-0 bg-brand-900/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
                {/* Placeholder Image Div - Replace with next/image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 group-hover:scale-105 transition-transform duration-700 ease-out">
                  Project Image: {project.title}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col relative z-20 bg-bg-elevated/80 backdrop-blur-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-brand-400 text-sm font-medium tracking-wider uppercase mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-brand-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-brand-400 transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-brand-400 transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-400 mb-6 flex-1 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.technologies.map(tech => (
                    <span key={tech} className="text-xs font-medium text-brand-200 bg-brand-900/50 px-3 py-1 rounded-full border border-brand-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
