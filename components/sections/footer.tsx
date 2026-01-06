"use client";

import { socialLinks } from "@/lib/data";
import { Linkedin, Mail, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-24 px-6 border-t border-border transition-colors duration-300">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10">
        <div>
          <h2 className="text-2xl font-black tracking-tighter mb-2">ANDI FARHAN HIDAYAT</h2>
          <p className="text-neutral-400 text-xs uppercase tracking-widest">Software Developer & Creative</p>
        </div>

        <div className="flex gap-8">
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full border border-neutral-100 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href={socialLinks.email} className="p-3 bg-white rounded-full border border-neutral-100 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300">
            <Mail className="w-5 h-5" />
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full border border-neutral-100 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
        
        <div className="text-neutral-400 text-[10px] uppercase tracking-widest mt-12">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
