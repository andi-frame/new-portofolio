"use client";

import { socialLinks, profile } from "@/lib/data";
import { motion } from "framer-motion";
import { Linkedin, Mail, Instagram, Github, Heart, ArrowUpRight } from "lucide-react";
import SectionBackground from "@/components/ui/section-background";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { href: socialLinks.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: socialLinks.email, icon: Mail, label: "Email" },
    { href: socialLinks.instagram, icon: Instagram, label: "Instagram" },
    { href: "https://github.com/andi-frame", icon: Github, label: "GitHub" },
  ];

  return (
    <footer className="relative bg-background text-foreground transition-colors duration-300 overflow-hidden">
      {/* Animated Background */}
      <SectionBackground variant="footer" />
      
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      
      <div className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="flex flex-col items-center text-center gap-8">
            {/* Name and Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                <span className="text-gradient">{profile.name.toUpperCase()}</span>
              </h2>
              <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
                {profile.role}
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {socialIcons.map(({ href, icon: Icon, label }) => (
                <motion.a 
                  key={label}
                  href={href} 
                  target={href.startsWith("mailto") ? undefined : "_blank"} 
                  rel="noopener noreferrer" 
                  className="group relative p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300 hover:shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-violet-500 transition-colors" />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              href={socialLinks.email}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Work Together
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            {/* Divider */}
            <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
          </div>
        </div>
      </div>
    </footer>
  );
}
