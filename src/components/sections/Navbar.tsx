"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Education", href: "#education" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
          className={cn(
            "pointer-events-auto transition-all duration-300 border rounded-full px-5 md:px-8 max-w-7xl w-full md:w-auto flex items-center justify-between md:justify-start gap-6 md:gap-12",
            isScrolled 
              ? "bg-bg-elevated/85 backdrop-blur-3xl border-brand-800/50 shadow-[0_10px_40px_-10px_rgba(109,40,217,0.4)] py-2.5 md:py-3" 
              : "bg-white/[0.03] backdrop-blur-xl border-white/10 py-3 md:py-4"
          )}
        >
          {/* Logo with Image and Name */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-brand-500/40 shadow-[0_0_15px_rgba(124,58,237,0.4)] group-hover:scale-105 transition-transform">
              <img src="/logo.jpg" alt="Amna Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg md:text-xl font-extrabold tracking-wider text-white group-hover:text-brand-300 transition-colors">
              {portfolio.personal.shortName.toUpperCase()}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2 rounded-full border border-brand-500/50 text-sm font-medium text-white hover:bg-brand-500/20 transition-all shadow-[0_0_15px_rgba(124,58,237,0.2)]"
            >
              Let's Talk
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden relative z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.header>
      </div>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center p-6 md:hidden overflow-y-auto"
          >
            {/* Background Blobs */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-brand-600/20 blur-[100px] rounded-full pointer-events-none" />

            <motion.nav 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-6 text-center w-full max-w-sm"
            >
              {/* Mobile Brand Logo */}
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 rounded-2xl border border-brand-500/40 p-1 bg-brand-900/40 shadow-[0_0_25px_rgba(124,58,237,0.5)] mb-3">
                  <img src="/logo.jpg" alt="Amna Logo" className="w-full h-full object-cover rounded-xl" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-wider">{portfolio.personal.name}</h3>
                <p className="text-xs text-brand-400 font-medium uppercase tracking-widest mt-1">MERN Stack Developer</p>
              </div>

              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

              {/* Navigation Links */}
              <div className="flex flex-col gap-4 w-full">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-6 rounded-2xl bg-white/[0.03] hover:bg-brand-500/20 border border-white/5 hover:border-brand-500/40 text-lg font-medium text-gray-200 hover:text-white transition-all shadow-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-700 text-white font-bold tracking-wide shadow-[0_0_25px_rgba(124,58,237,0.5)] border border-brand-400/50"
              >
                Let's Talk
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
