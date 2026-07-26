"use client";

import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

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

export function Contact() {
  const socialLinks = [
    { icon: <GithubIcon />, url: portfolio.social.github, name: "GitHub" },
    { icon: <LinkedinIcon />, url: portfolio.social.linkedin, name: "LinkedIn" },
    { icon: <InstagramIcon />, url: portfolio.social.instagram, name: "Instagram" },
    { icon: <TwitterIcon />, url: portfolio.social.twitter, name: "Twitter" },
    { icon: <Mail size={20} />, url: `mailto:${portfolio.personal.email}`, name: "Email" },
  ].filter(link => link.url);

  return (
    <section id="contact" className="py-32 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let's Build Something <span className="text-brand-500 text-glow">Great.</span>
          </h2>
          <p className="text-xl text-gray-400">
            Have a project, opportunity, or idea? Let's talk.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 max-w-5xl mx-auto">
          
          {/* Contact Info */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Connect</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                I'm currently available for freelance work and full-time opportunities. 
                If you're looking for a developer to bring your ideas to life, I'd love to hear from you.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium tracking-wider text-brand-400 uppercase mb-4">Socials</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full border border-brand-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-500 hover:bg-brand-900/50 transition-all duration-300"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <GlassCard className="md:col-span-3 p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-bg-highlight border border-brand-800/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-bg-highlight border border-brand-800/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-400">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-bg-highlight border border-brand-800/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-400">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-bg-highlight border border-brand-800/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <MagneticButton variant="primary" className="w-full justify-center">
                Send Message
                <Send size={18} />
              </MagneticButton>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                Note: Form submission is frontend-only by default. Connect to a service like Formspree or custom API to enable.
              </p>
            </form>
          </GlassCard>

        </div>
      </div>
    </section>
  );
}
