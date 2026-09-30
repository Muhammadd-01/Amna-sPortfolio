"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial sync from URL hash if provided
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash && ["home", "about", "skills", "experience", "projects", "services", "education", "contact"].includes(hash)) {
        setActiveSection(hash);
      }
    }

    const sectionIds = ["home", "about", "skills", "experience", "projects", "services", "education", "contact"];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Prevent fighting between click animation and scroll detection
      if (isClickScrollingRef.current) return;

      // Bottom of page detection for Contact section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection("contact");
        return;
      }

      // Check current section relative to scroll position
      const scrollPosition = window.scrollY + 250;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setActiveSection(targetId);

    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        isClickScrollingRef.current = true;
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/#${targetId}`);

        clickTimeoutRef.current = setTimeout(() => {
          isClickScrollingRef.current = false;
        }, 900);
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "/#home", id: "home" },
    { name: "About", href: "/#about", id: "about" },
    { name: "Skills", href: "/#skills", id: "skills" },
    { name: "Experience", href: "/#experience", id: "experience" },
    { name: "Projects", href: "/#projects", id: "projects" },
    { name: "Services", href: "/#services", id: "services" },
    { name: "Education", href: "/#education", id: "education" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
          className={cn(
            "pointer-events-auto transition-all duration-300 border rounded-full px-5 md:px-8 max-w-7xl w-full md:w-auto flex items-center justify-between md:justify-start gap-4 md:gap-8 lg:gap-10",
            isScrolled 
              ? "bg-bg-elevated/85 backdrop-blur-3xl border-brand-800/50 shadow-[0_10px_40px_-10px_rgba(109,40,217,0.4)] py-2.5 md:py-3" 
              : "bg-white/[0.03] backdrop-blur-xl border-white/10 py-3 md:py-4"
          )}
        >
          {/* Text Brand Name */}
          <Link 
            href="/#home" 
            onClick={(e) => handleNavClick(e, "home")}
            className="text-lg md:text-xl font-extrabold tracking-wider text-white hover:text-brand-300 transition-colors"
          >
            {portfolio.personal.shortName.toUpperCase()}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 relative px-3.5 py-1.5 rounded-full flex items-center justify-center",
                    isActive
                      ? "text-white font-semibold drop-shadow-[0_0_12px_rgba(192,132,252,0.7)]"
                      : "text-gray-300 hover:text-white hover:bg-white/[0.04]"
                  )}
                >
                  {/* Animated sliding active pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-brand-500/25 border border-brand-400/50 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.45)] -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}

                  {/* Animated luminous bottom accent bar */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-brand-400 via-brand-300 to-brand-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.9)]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}

                  <span>{link.name}</span>
                </Link>
              );
            })}

            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className={cn(
                "ml-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                activeSection === "contact"
                  ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-[0_0_25px_rgba(124,58,237,0.7)] border border-brand-300 scale-105"
                  : "border border-brand-500/50 text-white hover:bg-brand-500/20 shadow-[0_0_15px_rgba(124,58,237,0.2)]"
              )}
            >
              Let&apos;s Talk
            </Link>
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
              {/* Mobile Brand Title */}
              <div className="flex flex-col items-center mb-4">
                <h3 className="text-2xl font-bold text-white tracking-wider">{portfolio.personal.name}</h3>
                <p className="text-xs text-brand-400 font-medium uppercase tracking-widest mt-1">MERN Stack Developer</p>
              </div>

              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

              {/* Navigation Links */}
              <div className="flex flex-col gap-3 w-full">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        handleNavClick(e, link.id);
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "py-3 px-6 rounded-2xl text-lg font-medium transition-all flex items-center justify-between shadow-sm",
                        isActive
                          ? "bg-gradient-to-r from-brand-600/35 to-brand-500/25 border border-brand-400/60 text-white font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                          : "bg-white/[0.03] hover:bg-brand-500/10 border border-white/5 text-gray-200 hover:text-white"
                      )}
                    >
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse shadow-[0_0_10px_#a855f7]" />
                      )}
                    </Link>
                  );
                })}
              </div>

              <Link
                href="/#contact"
                onClick={(e) => {
                  handleNavClick(e, "contact");
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "mt-4 w-full py-3.5 rounded-2xl text-white font-bold tracking-wide transition-all border",
                  activeSection === "contact"
                    ? "bg-gradient-to-r from-brand-500 to-brand-700 shadow-[0_0_30px_rgba(124,58,237,0.8)] border-brand-300 ring-2 ring-brand-400/40"
                    : "bg-gradient-to-r from-brand-600 to-brand-800 shadow-[0_0_20px_rgba(124,58,237,0.4)] border-brand-400/50"
                )}
              >
                Let&apos;s Talk
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

