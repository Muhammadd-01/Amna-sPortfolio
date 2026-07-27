"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Send, Mail, MessageSquare } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRef, useState, ReactNode } from "react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

// Generic Spatial Wrapper for Contact elements
function SpatialWrapper({ children, className = "", delay = 0 }: { children: ReactNode, className?: string, delay?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]); // Subtle tilt for large elements
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
    setPosition({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setOpacity(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.3 }}
      className={`relative group ${className}`}
      style={{ perspective: 2000 }}
    >
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-[40px] p-[1px] bg-gradient-to-br from-white/10 via-transparent to-white/5 shadow-2xl flex flex-col"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-10 rounded-[40px]"
          style={{
            opacity,
            background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(124, 58, 237, 0.1), transparent 40%)`,
          }}
        />

        <div 
          className="relative z-20 flex-1 flex flex-col bg-white/[0.02] backdrop-blur-3xl rounded-[39px] overflow-hidden p-8 md:p-12"
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        >
          {/* Inner Light Reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none mix-blend-overlay" />
          
          <div className="relative z-10 w-full h-full flex flex-col" style={{ transform: "translateZ(40px)" }}>
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Contact() {
  const socialLinks = [
    { icon: <GithubIcon />, url: portfolio.social.github, name: "GitHub" },
    { icon: <LinkedinIcon />, url: portfolio.social.linkedin, name: "LinkedIn" },
    { icon: <InstagramIcon />, url: portfolio.social.instagram, name: "Instagram" },
    { icon: <TwitterIcon />, url: portfolio.social.twitter, name: "Twitter" },
    { icon: <Mail size={20} />, url: `mailto:${portfolio.personal.email}`, name: "Email" },
  ].filter(link => link.url);

  return (
    <section id="contact" className="py-32 relative z-10 bg-transparent overflow-hidden">
      
      {/* Abstract Ambient Liquid Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 blur-[180px] rounded-full mix-blend-screen pointer-events-none animate-[spin_60s_linear_infinite_reverse]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-700/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none animate-[pulse_15s_ease-in-out_infinite]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Standardized Spatial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-2xl bg-brand-900/50 border border-brand-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
          >
            <MessageSquare size={32} className="text-brand-400" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex items-center gap-4 tracking-tight text-white drop-shadow-lg">
            <span className="text-brand-500 font-light">07.</span> Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl text-lg font-light">
            Have a project, opportunity, or idea? I'm always open to discussing new things.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 max-w-6xl mx-auto">
          
          {/* Contact Info Spatial Container */}
          <SpatialWrapper delay={0.1} className="md:col-span-2">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-md tracking-tight">Reach Out</h3>
              <p className="text-gray-400 mb-10 leading-relaxed font-light">
                I'm currently available for freelance work and full-time opportunities. 
                If you're looking for a developer to bring your ideas to life, I'd love to hear from you.
              </p>
            </div>
            
            <div className="mt-auto">
              <h4 className="text-xs font-bold tracking-[0.2em] text-brand-400 uppercase mb-6 opacity-80">Socials</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-gray-400 bg-white/5 hover:text-white hover:border-brand-500 hover:bg-brand-900/50 hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-md"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </SpatialWrapper>

          {/* Contact Form Spatial Container */}
          <SpatialWrapper delay={0.2} className="md:col-span-3">
            <form className="space-y-6 flex flex-col h-full" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-xs font-bold tracking-widest text-brand-300 uppercase opacity-80 ml-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-all backdrop-blur-md"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-xs font-bold tracking-widest text-brand-300 uppercase opacity-80 ml-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-all backdrop-blur-md"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label htmlFor="subject" className="text-xs font-bold tracking-widest text-brand-300 uppercase opacity-80 ml-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-all backdrop-blur-md"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-3 flex-1 flex flex-col">
                <label htmlFor="message" className="text-xs font-bold tracking-widest text-brand-300 uppercase opacity-80 ml-2">Message</label>
                <textarea 
                  id="message" 
                  className="w-full flex-1 min-h-[150px] bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-all resize-none backdrop-blur-md"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="pt-4">
                <MagneticButton variant="primary" className="w-full justify-center py-4 rounded-2xl text-lg font-bold shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]">
                  Send Message
                  <Send size={20} className="ml-2" />
                </MagneticButton>
              </div>
            </form>
          </SpatialWrapper>

        </div>
      </div>
    </section>
  );
}
