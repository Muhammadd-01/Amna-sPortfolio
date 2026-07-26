"use client";

import { portfolio } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-brand-900/50 relative z-10 bg-bg-base">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-wider text-white">
            {portfolio.personal.shortName.toUpperCase()}
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-sm text-gray-400">{portfolio.personal.role}</span>
        </div>
        
        <p className="text-sm text-gray-500">
          © {currentYear} {portfolio.personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
