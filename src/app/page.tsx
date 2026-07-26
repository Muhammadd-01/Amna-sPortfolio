"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Lazy load the global 3D background
const GlobalScene = dynamic(() => import("@/components/3d/HeroScene").then(mod => mod.HeroScene), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative z-0 selection:bg-brand-500 selection:text-white">
      <GlobalScene />
      <LoadingScreen />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
