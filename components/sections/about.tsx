"use client";

import Section from "@/components/ui/section";
import SectionBackground from "@/components/ui/section-background";
import { profile, skills } from "@/lib/data";
import { motion } from "framer-motion";
import { Code, Database, Server, Terminal, Figma, Box, ShieldCheck, Layout, Layers } from "lucide-react";
import { useState, useEffect } from "react";

// Helper to map skills to icons
function getSkillIcon(skill: string) {
    const s = skill.toLowerCase();
    if (s.includes("react") || s.includes("next") || s.includes("ts") || s.includes("js") || s.includes("vite")) return Code;
    if (s.includes("sql") || s.includes("base") || s.includes("redis")) return Database;
    if (s.includes("node") || s.includes("hono") || s.includes("express") || s.includes("fiber")) return Server;
    if (s.includes("css") || s.includes("tailwind") || s.includes("motion")) return Layout;
    if (s.includes("python") || s.includes("go") || s.includes("c++")) return Terminal;
    if (s.includes("figma") || s.includes("design")) return Figma;
    if (s.includes("docker") || s.includes("cloud")) return Box;
    if (s.includes("safe") || s.includes("auth")) return ShieldCheck;
    return Layers;
}

export default function About() {
  return (
    <Section id="about" fullWidth className="min-h-screen justify-center relative overflow-hidden">
      {/* Animated Background */}
      <SectionBackground variant="about" />
      
      {/* Inner container */}
      <div className="px-6 md:px-12">
        <div className="max-w-4xl w-full mx-auto space-y-24 relative z-10">
        
        {/* Bio Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           viewport={{ once: true }}
           className="text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
            About Me
          </span>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
            I am a <span className="text-gradient">Full-Stack Developer</span> <br />
            who builds <Typewriter words={["Scalable Systems", "Seamless UI/UX", "Robust Backends", "High-Performance Apps"]} />
          </h2>

          <div className="flex flex-wrap justify-center gap-3 text-sm font-medium">
             {["Efficiency Obsessed", "Problem Solver", "Enthusiastic Learner"].map((trait, i) => (
               <motion.span 
                  key={trait}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="px-5 py-2.5 bg-white dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-800 text-muted-foreground shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300"
               >
                 {trait}
               </motion.span>
             ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full flex flex-col justify-center items-center"
        >
          <div className="w-full max-w-lg">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gradient mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
              Education
            </h3>
            <div className="space-y-6">
            {profile.education?.map((edu, i) => (
                <motion.div 
                  key={i} 
                  className="group relative p-5 rounded-2xl bg-white/50 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-lg text-foreground">{edu.institution}</p>
                    <span className="text-xs font-mono text-violet-500 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-2 py-1 rounded">{edu.year}</span>
                  </div>
                  <p className="text-muted-foreground italic text-sm mb-2">{edu.degree}</p>
                  {edu.description && <p className="text-xs text-muted-foreground/80 leading-relaxed">{edu.description}</p>}
                </motion.div>
            ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Section - Technical Arsenal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Skills & Tools
            </span>
            <h3 className="text-2xl md:text-3xl font-bold">
              <span className="text-gradient">Technical Arsenal</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div 
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-5 rounded-2xl bg-white/50 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300 hover:shadow-lg"
              >
                {/* Category header with gradient accent */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500" />
                  <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">
                    {skillGroup.category}
                  </h4>
                </div>
                
                {/* Skills list */}
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => {
                     const Icon = getSkillIcon(skill);
                     return (
                        <motion.span 
                          key={skill} 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-foreground rounded-lg text-xs font-medium border border-transparent hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {Icon && <Icon className="w-3.5 h-3.5 text-violet-500" />}
                          {skill}
                        </motion.span>
                     );
                  })}
                </div>
            </motion.div>
          ))}
          </div>
        </motion.div>

        </div>
      </div>
    </Section>
  );
}

function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, Math.random() * 350));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="inline-block min-w-[150px] md:min-w-[200px] text-left">
      <span className="text-gradient">{words[index].substring(0, subIndex)}</span>
      <span className={`inline-block w-0.5 h-8 md:h-12 bg-violet-500 ml-1 ${blink ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
    </span>
  );
}
