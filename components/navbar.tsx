"use client";

import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const navLinks = [
  { name: "Home", to: "home" },
  { name: "Experience", to: "experience" },
  { name: "Projects", to: "projects" },
  { name: "About", to: "about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
     setMounted(true);
     const handleScroll = () => setScrolled(window.scrollY > 50);
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] flex justify-center py-6 transition-all duration-300 pointer-events-none`}>
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`pointer-events-auto px-8 py-3 rounded-full border transition-all duration-300 flex items-center gap-8 ${
           scrolled 
           ? "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-neutral-200 dark:border-neutral-800 shadow-sm" 
           : "bg-transparent border-transparent"
        }`}
      >
        <ul className="flex space-x-8 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button 
                onClick={() => {
                   const element = document.getElementById(link.to);
                   element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-black dark:hover:text-white transition-colors uppercase tracking-wider text-xs"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Separator */}
        <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700"></div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Toggle Theme"
        >
          {mounted && theme === "dark" ? (
             <Sun className="w-4 h-4 text-neutral-100" />
          ) : (
             <Moon className="w-4 h-4 text-neutral-800" />
          )}
        </button>
      </motion.div>
    </nav>
  );
}
