"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Sparkles, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", to: "home" },
  { name: "Experience", to: "experience" },
  { name: "Projects", to: "projects" },
  { name: "About", to: "about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = navLinks.map(link => document.getElementById(link.to));
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(navLinks[index].to);
          }
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (to: string) => {
    const element = document.getElementById(to);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center py-4 md:py-6 pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto px-2 py-2 rounded-full border transition-all duration-500 flex items-center gap-1 md:gap-2 ${
           scrolled 
           ? "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border-neutral-200/50 dark:border-neutral-800/50 shadow-lg shadow-black/5 dark:shadow-black/20" 
           : "bg-white/30 dark:bg-neutral-900/30 backdrop-blur-sm border-transparent"
        }`}
      >
        {/* Logo/Brand */}
        <motion.div 
          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button 
                onClick={() => handleNavClick(link.to)}
                className={`relative px-3 md:px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-300 rounded-full ${
                  activeSection === link.to 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {activeSection === link.to && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <motion.button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-4 h-4 text-foreground" />
          ) : (
            <Menu className="w-4 h-4 text-foreground" />
          )}
        </motion.button>

        {/* Separator - hidden on mobile */}
        <div className="hidden md:block w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1" />

        {/* Theme Toggle */}
        <motion.button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle Theme"
        >
          {mounted && theme === "dark" ? (
             <Sun className="w-4 h-4 text-amber-400" />
          ) : (
             <Moon className="w-4 h-4 text-violet-500" />
          )}
        </motion.button>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-lg md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button 
                    onClick={() => handleNavClick(link.to)}
                    className={`w-full px-4 py-3 text-left text-sm font-medium uppercase tracking-wider transition-colors duration-300 rounded-xl ${
                      activeSection === link.to 
                        ? "text-foreground bg-neutral-100 dark:bg-neutral-800" 
                        : "text-muted-foreground hover:text-foreground hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    }`}
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
