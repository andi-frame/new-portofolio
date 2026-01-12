"use client";

import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import About from "@/components/sections/about";
import Footer from "@/components/sections/footer";
import Cursor from "@/components/ui/cursor";
import Background from "@/components/ui/background";

export default function Home() {
  return (
    <main className="bg-background min-h-screen relative text-foreground">
      <Background />
      <Cursor />
      <Navbar />
      
      <Hero />
      <Experience />
      <Projects />
      <About />
      <Footer />
    </main>
  );
}
