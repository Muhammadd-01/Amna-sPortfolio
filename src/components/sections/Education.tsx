"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";

export function Education() {
  if (portfolio.education.length === 0 && portfolio.certifications.length === 0) return null;

  return (
    <section id="education" className="py-32 relative z-10 bg-bg-subtle/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Education */}
          {portfolio.education.length > 0 && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-10 flex items-center gap-4"
              >
                <GraduationCap className="text-brand-500" size={32} />
                <h2 className="text-3xl font-bold text-white">Education</h2>
              </motion.div>

              <div className="space-y-6">
                {portfolio.education.map((edu, index) => (
                  <GlassCard key={index} delay={index * 0.1} animationType="up">
                    <span className="text-brand-400 text-sm font-medium mb-2 block">{edu.year}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                    <h4 className="text-lg text-gray-300 mb-3">{edu.institution}</h4>
                    <p className="text-gray-400 text-sm">
                      {edu.description}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {portfolio.certifications.length > 0 && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-10 flex items-center gap-4"
              >
                <Award className="text-brand-500" size={32} />
                <h2 className="text-3xl font-bold text-white">Certifications</h2>
              </motion.div>

              <div className="space-y-6">
                {portfolio.certifications.map((cert, index) => (
                  <GlassCard key={index} delay={index * 0.1}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-brand-400 text-sm font-medium mb-2 block">{cert.date}</span>
                        <h3 className="text-xl font-bold text-white mb-1">{cert.name}</h3>
                        <h4 className="text-gray-300">{cert.organization}</h4>
                      </div>
                      {cert.link && cert.link !== "#" && (
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-4 py-2 rounded-full text-xs font-medium border border-brand-500/50 text-brand-200 hover:bg-brand-500/10 transition-colors"
                        >
                          Verify
                        </a>
                      )}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
