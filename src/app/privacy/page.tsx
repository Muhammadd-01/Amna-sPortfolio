"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Database, Eye, Server, Lock, Mail, Clock } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function PrivacyPage() {
  const lastUpdated = "August 3, 2026";

  const sections = [
    {
      id: "information-collection",
      icon: <Database className="text-brand-400" size={24} />,
      title: "1. Information We Collect",
      content: `When you visit this portfolio website, we only collect personal information that you voluntarily provide through the contact form. This includes your name, email address, message subject, and message body. No silent background data profiling or invasive tracking cookies are used.`,
    },
    {
      id: "use-of-information",
      icon: <Eye className="text-brand-400" size={24} />,
      title: "2. How We Use Your Information",
      content: `Information submitted via the contact form is used strictly to read and respond to your inquiry, freelance proposal, or career opportunity. Your information will never be sold, rented, leased, or shared with third-party marketers.`,
    },
    {
      id: "third-party-services",
      icon: <Server className="text-brand-400" size={24} />,
      title: "3. Third-Party Services",
      content: `Contact form submissions are securely processed through Formspree (a trusted third-party contact form handler). Formspree processes messages over SSL/TLS encryption. You can review Formspree's privacy policy for details on their data security measures.`,
    },
    {
      id: "data-security",
      icon: <Lock className="text-brand-400" size={24} />,
      title: "4. Data Security",
      content: `I prioritize the protection of your personal information. Industry-standard HTTPS encryption and secure transmission protocols are enforced across this entire application to protect data against unauthorized access, disclosure, or alteration.`,
    },
    {
      id: "cookies",
      icon: <ShieldCheck className="text-brand-400" size={24} />,
      title: "5. Cookies & Analytics",
      content: `This website is built with clean Next.js performance optimizations and does not deploy third-party advertising cookies or cross-site tracking pixels.`,
    },
    {
      id: "contact-us",
      icon: <Mail className="text-brand-400" size={24} />,
      title: "6. Your Data Rights & Contact",
      content: `You have the right to request access to, correction of, or deletion of any personal communications sent to ${portfolio.personal.name}. To submit a request regarding your data, please contact me directly via email.`,
    },
  ];

  return (
    <main className="min-h-screen bg-bg-base text-foreground relative overflow-hidden selection:bg-brand-500 selection:text-white py-16 px-6 md:px-12">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-700/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-500/50 hover:bg-brand-900/40 text-sm font-medium text-gray-300 hover:text-white transition-all shadow-lg backdrop-blur-md group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-b border-white/10 pb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-widest mb-4">
            Legal & Privacy
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm md:text-base flex items-center gap-2 font-light">
            <Clock size={16} className="text-brand-400" />
            Last Updated: <span className="text-gray-200 font-medium">{lastUpdated}</span>
          </p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl hover:border-brand-500/30 transition-colors shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-900/40 border border-brand-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                  {section.icon}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light pl-0 md:pl-16">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>

        {/* Contact Footer Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-brand-900/40 via-brand-800/20 to-brand-900/40 border border-brand-500/30 text-center backdrop-blur-2xl shadow-2xl"
        >
          <h3 className="text-xl font-bold text-white mb-2">Privacy Concerns?</h3>
          <p className="text-gray-300 text-sm mb-6 font-light max-w-lg mx-auto">
            If you have questions about your privacy or data protection on this site, feel free to contact me directly.
          </p>
          <a
            href={`mailto:${portfolio.personal.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:scale-105"
          >
            <Mail size={16} />
            Contact via Email
          </a>
        </motion.div>

        {/* Footer Copyright */}
        <div className="mt-12 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {portfolio.personal.name}. All rights reserved.
        </div>
      </div>
    </main>
  );
}
