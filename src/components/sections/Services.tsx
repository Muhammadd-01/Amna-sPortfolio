"use client";

import { motion } from "framer-motion";
import { Code, Box, Layout, Smartphone, Sparkles } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";

const Figma = ({ size = 32, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>
);

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code size={32} className="text-brand-400" />,
  Figma: <Figma size={32} className="text-brand-400" />,
  Box: <Box size={32} className="text-brand-400" />,
  Layout: <Layout size={32} className="text-brand-400" />,
  Smartphone: <Smartphone size={32} className="text-brand-400" />,
  Sparkles: <Sparkles size={32} className="text-brand-400" />,
};

export function Services() {
  return (
    <section id="services" className="py-32 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What I Do
          </h2>
          <div className="w-24 h-1 bg-brand-500/50 rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.services.map((service, index) => (
            <GlassCard key={index} delay={index * 0.1} className="h-full flex flex-col p-8">
              <div className="w-20 h-20 mx-auto bg-brand-900/50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(109,40,217,0.2)]">
                {iconMap[service.icon] || <Sparkles size={32} className="text-brand-400" />}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
