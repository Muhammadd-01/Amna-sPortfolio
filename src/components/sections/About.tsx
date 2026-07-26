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

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <GlassCard delay={0.2} hoverEffect={false} className="p-8 md:p-12">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {portfolio.personal.bio}
            </p>
            <div className="space-y-4 text-gray-400">
              <p className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-500" />
                <strong>Location:</strong> {portfolio.personal.location}
              </p>
              <p className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-500" />
                <strong>Focus:</strong> Interactive 3D & Creative Frontend
              </p>
            </div>
          </GlassCard>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative h-[400px] rounded-2xl overflow-hidden group"
          >
            {/* Image Placeholder with hover effect */}
            <div className="absolute inset-0 bg-bg-elevated flex items-center justify-center border border-brand-800/50 rounded-2xl">
              <span className="text-gray-500">Profile Image</span>
              {/* Replace with next/image in production */}
              {/* <Image src={portfolio.personal.profileImage} alt={portfolio.personal.name} fill className="object-cover" /> */}
            </div>
            
            {/* Overlay glow */}
            <div className="absolute inset-0 bg-brand-600/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-brand-500 opacity-50" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-brand-500 opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
