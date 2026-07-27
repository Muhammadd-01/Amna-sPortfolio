import type { Metadata } from "next";
import "./globals.css";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "Amna Nehal | MERN Stack & Full-Stack Developer",
  description: "Results-driven MERN Stack Developer specializing in modern, scalable web applications, REST APIs, and AI workflows.",
  keywords: ["Amna Nehal", "Portfolio", "MERN Stack Developer", "Full-Stack Developer", "React.js", "Node.js", "FastAPI"],
  authors: [{ name: "Amna Nehal" }],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-bg-base text-foreground selection:bg-brand-500 selection:text-white">
        <ScrollToTop />
        {children}
        <div className="noise" />
      </body>
    </html>
  );
}
