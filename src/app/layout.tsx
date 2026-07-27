import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amna Muhammad Nihal | Portfolio",
  description: "Premium 3D Interactive Developer Portfolio",
  keywords: ["Amna Muhammad Nihal", "Portfolio", "Frontend Developer", "3D Web Developer", "UI/UX Designer"],
  authors: [{ name: "Amna Muhammad Nihal" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-bg-base text-foreground selection:bg-brand-500 selection:text-white`}>
        <ScrollToTop />
        {children}
        <div className="noise" />
      </body>
    </html>
  );
}
