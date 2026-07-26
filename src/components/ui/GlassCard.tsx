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
        "glass rounded-[2rem] p-8 relative overflow-hidden group",
        hoverEffect && "glass-hover",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
