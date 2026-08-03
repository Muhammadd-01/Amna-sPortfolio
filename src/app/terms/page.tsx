"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, FileText, Lock, Scale, Mail, Clock } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function TermsPage() {
  const lastUpdated = "August 3, 2026";

  const sections = [
    {
      id: "acceptance",
      icon: <ShieldCheck className="text-brand-400" size={24} />,
      title: "1. Acceptance of Terms",
      content: `By accessing or using the portfolio website of ${portfolio.personal.name} ("Developer", "I", "me", or "my"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should refrain from using or accessing this website.`,
    },
    {
      id: "intellectual-property",
      icon: <FileText className="text-brand-400" size={24} />,
      title: "2. Intellectual Property Rights",
      content: `All original content on this website—including but not limited to source code, visual designs, project case studies, custom graphics, text, branding, and architecture diagrams—is the intellectual property of ${portfolio.personal.name} unless explicitly stated otherwise. You may not copy, reproduce, distribute, or create derivative works from this content without explicit written consent.`,
    },
    {
      id: "use-of-services",
      icon: <Scale className="text-brand-400" size={24} />,
      title: "3. Use of Services & Portfolio Content",
      content: `This website is designed to showcase engineering capabilities, project experience, and professional services. You agree to use this website only for lawful purposes. Unlawful activity, unauthorized attempts to access server infrastructure, scraping of private API endpoints, or transmission of malicious code via contact forms is strictly prohibited.`,
    },
    {
      id: "contact-form",
      icon: <Mail className="text-brand-400" size={24} />,
      title: "4. Communication & Submissions",
      content: `Information submitted via the contact form (such as your name, email address, subject, and message) is sent securely for the sole purpose of responding to your inquiry, freelance proposal, or job opportunity. Submitting false, abusive, or spam communications is strictly prohibited.`,
    },
    {
      id: "disclaimer",
      icon: <Lock className="text-brand-400" size={24} />,
      title: "5. Disclaimer & Limitation of Liability",
      content: `The materials and code demonstrations on this portfolio are provided on an "as is" and "as available" basis without warranties of any kind, express or implied. While I strive for 100% uptime and accurate demonstrations, ${portfolio.personal.name} shall not be liable for any direct, indirect, or incidental damages resulting from the use or inability to use this site.`,
    },
    {
      id: "modifications",
      icon: <Clock className="text-brand-400" size={24} />,
      title: "6. Modifications to Terms",
      content: `I reserve the right to revise or update these Terms and Conditions at any time without prior notice. Any updates will be published directly on this page with an updated revision date. Your continued use of the site constitutes acceptance of the modified terms.`,
    },
  ];

  return (
    <main className="min-h-screen bg-bg-base text-foreground relative overflow-hidden selection:bg-brand-500 selection:text-white py-16 px-6 md:px-12">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-700/10 blur-[160px] rounded-full pointer-events-none" />

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
            Legal & Policy
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
            Terms & Conditions
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
          <h3 className="text-xl font-bold text-white mb-2">Have Questions About These Terms?</h3>
          <p className="text-gray-300 text-sm mb-6 font-light max-w-lg mx-auto">
            If you have any questions or require clarification regarding these Terms and Conditions, feel free to reach out directly.
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
