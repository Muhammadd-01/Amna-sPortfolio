"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
  animationType?: "up" | "left" | "right" | "scale" | "blur" | "flip" | "3d-back";
}

export function GlassCard({ children, className, delay = 0, hoverEffect = true, animationType = "3d-back" }: GlassCardProps) {
  
  const variants = {
    up: { y: 50, opacity: 0, z: -100, rotateX: 10 },
    left: { x: -50, opacity: 0, z: -100, rotateY: -10 },
    right: { x: 50, opacity: 0, z: -100, rotateY: 10 },
    scale: { scale: 0.8, opacity: 0, z: -200 },
    flip: { rotateX: -30, opacity: 0, z: -300 },
    blur: { filter: "blur(10px)", opacity: 0, z: -150, scale: 0.9 },
    "3d-back": { 
      z: -500, 
      opacity: 0, 
      scale: 0.5,
      rotateX: 15,
      y: 100
    }
  };

  const initialVariant = variants[animationType as keyof typeof variants] || variants["3d-back"];

  return (
    <motion.div
      initial={initialVariant}
      whileInView={{ 
        x: 0, 
        y: 0, 
        z: 0, 
        scale: 1, 
        rotateX: 0, 
        rotateY: 0, 
        opacity: 1, 
        filter: "blur(0px)" 
      }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={cn(
        "relative rounded-3xl overflow-hidden group",
        "bg-gradient-to-br from-brand-900/10 via-bg-elevated/40 to-bg-base/60",
        "backdrop-blur-xl border border-white/5",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]",
        "before:absolute before:inset-0 before:rounded-3xl before:border before:border-t-white/10 before:border-l-white/10 before:border-b-transparent before:border-r-transparent before:pointer-events-none",
        "after:absolute after:inset-0 after:bg-gradient-to-br after:from-brand-500/10 after:to-transparent after:rounded-3xl after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-500 after:pointer-events-none",
        hoverEffect && "hover:-translate-y-2 hover:border-brand-500/30 hover:shadow-[0_20px_40px_rgba(124,58,237,0.2),inset_0_0_20px_rgba(124,58,237,0.1)] transition-all duration-500",
        className
      )}
    >
      {/* Liquid glass light reflection */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Content wrapper to stay above background elements */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
