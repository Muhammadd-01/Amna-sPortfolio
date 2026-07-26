"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
  animationType?: "up" | "left" | "right" | "scale" | "blur" | "flip";
}

export function GlassCard({ children, className, delay = 0, hoverEffect = true, animationType = "up" }: GlassCardProps) {
  
  const getAnimation = () => {
    switch(animationType) {
      case "left": return { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 } };
      case "right": return { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 } };
      case "scale": return { initial: { opacity: 0, scale: 0.8 }, whileInView: { opacity: 1, scale: 1 } };
      case "blur": return { initial: { opacity: 0, filter: "blur(10px)" }, whileInView: { opacity: 1, filter: "blur(0px)" } };
      case "flip": return { initial: { opacity: 0, rotateX: 45 }, whileInView: { opacity: 1, rotateX: 0 } };
      case "up":
      default: return { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 } };
    }
  };

  const anim = getAnimation();

  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.whileInView}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={cn(
        "glass rounded-2xl p-6 relative overflow-hidden group",
        hoverEffect && "glass-hover",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
