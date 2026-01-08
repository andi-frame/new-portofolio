"use client";

import { experiences, Experience as ExperienceType } from "@/lib/data";
import Section from "@/components/ui/section";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Eye, X } from "lucide-react";
// import Image from "next/image";

export default function Experience() {
  const [showAll, setShowAll] = useState(false);
  const [selectedExp, setSelectedExp] = useState<ExperienceType | null>(null);
  
  const initialCount = 4;
  const visibleExperiences = showAll ? experiences : experiences.slice(0, initialCount);

  return (
    <Section id="experience">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-20 text-center"
      >
        <span className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase mb-4 block">Track Record</span>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Experiences</h2>
      </motion.div>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Central Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-12 w-px bg-gradient-to-b from-neutral-200 via-neutral-300 to-transparent dark:from-neutral-800 dark:via-neutral-700 md:transform md:-translate-x-1/2 ml-4 md:ml-0" />

        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {visibleExperiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                layout
                className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0"
              >
                {/* Dot on Line */}
                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-white dark:bg-neutral-900 border-4 border-neutral-300 dark:border-neutral-600 md:transform md:-translate-x-1/2 z-10 shadow-sm ml-[13px] md:ml-0 translate-y-2 md:translate-y-1" />

                {/* Left Side: Even=Content, Odd=Date */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-right md:pr-12"}`}>
                   {/* Mobile Date Badge */}
                   <span className="inline-block py-1 px-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-mono text-neutral-500 mb-4 md:hidden">
                     {exp.period}
                   </span>
                   
                   {index % 2 === 0 ? (
                     /* Show Content */
                     <div className="hidden md:block">
                        <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                        <p className="text-neutral-600 dark:text-neutral-300 font-medium text-sm mb-4">{exp.company}</p>
                        <ul className="space-y-1 text-muted-foreground text-sm leading-relaxed mb-4">
                            {exp.description.slice(0, 3).map((desc, i) => (
                            <li key={i}>{desc}</li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 justify-end mb-3">
                            {exp.skills.slice(0, 3).map(skill => (
                            <span key={skill} className="text-[10px] uppercase tracking-wider text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-2 py-1 rounded">
                                {skill}
                            </span>
                            ))}
                        </div>
                        {exp.hasDetail && (
                            <button 
                                onClick={() => setSelectedExp(exp)}
                                className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-foreground inline-flex items-center gap-1 transition-colors"
                            >
                                <Eye className="w-3 h-3" /> See Details
                            </button>
                        )}
                     </div>
                   ) : (
                     /* Show Date */
                     <div className="hidden md:block">
                        <p className="font-mono text-sm text-neutral-400 pt-1">{exp.period}</p>
                     </div>
                   )}
                </div>

                {/* Right Side: Even=Date, Odd=Content */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${index % 2 !== 0 ? "md:text-left md:pl-12" : "md:text-left md:pl-12"}`}>
                     {index % 2 !== 0 ? (
                       /* Show Content */
                       <div className="hidden md:block">
                          <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                          <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm mb-4">{exp.company}</p>
                            <ul className="space-y-1 text-muted-foreground text-sm leading-relaxed mb-4">
                                {exp.description.slice(0, 3).map((desc, i) => (
                                <li key={i}>{desc}</li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 justify-start mb-3">
                                {exp.skills.slice(0, 3).map(skill => (
                                <span key={skill} className="text-[10px] uppercase tracking-wider text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-2 py-1 rounded">
                                    {skill}
                                </span>
                                ))}
                            </div>
                            {exp.hasDetail && (
                                <button 
                                    onClick={() => setSelectedExp(exp)}
                                    className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-foreground inline-flex items-center gap-1 transition-colors"
                                >
                                    <Eye className="w-3 h-3" /> See Details
                                </button>
                            )}
                       </div>
                     ) : (
                        /* Show Date */
                        <div className="hidden md:block">
                            <p className="font-mono text-sm text-neutral-400 pt-1">{exp.period}</p>
                        </div>
                     )}

                     {/* Mobile Content */}
                      <div className="md:hidden">
                        <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 font-medium text-xs mb-4">{exp.company}</p>
                        <ul className="space-y-2 text-muted-foreground text-xs leading-relaxed mb-4 list-disc pl-4">
                            {exp.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                            ))}
                        </ul>
                         {exp.hasDetail && (
                            <button 
                                onClick={() => setSelectedExp(exp)}
                                className="mt-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-foreground inline-flex items-center gap-1 transition-colors"
                            >
                                <Eye className="w-3 h-3" /> See Details
                            </button>
                        )}
                     </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
         {/* Show More Button */}
        {experiences.length > initialCount && (
            <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            >
            <button 
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
                {showAll ? (
                <>Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /></>
                ) : (
                <>Show More ({experiences.length - initialCount} remaining) <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" /></>
                )}
            </button>
            </motion.div>
        )}
      </div>

       {/* Detail Modal */}
       <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
             <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setSelectedExp(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
             />
             <motion.div 
                layoutId={`exp-${selectedExp.id}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-background w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl"
             >
                <div className="sticky top-0 right-0 p-4 flex justify-end bg-gradient-to-b from-background to-transparent z-10">
                    <button onClick={() => setSelectedExp(null)} className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="px-8 pb-10">
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2 block">{selectedExp.period}</span>
                    <h3 className="text-3xl font-bold text-foreground mb-1">{selectedExp.role}</h3>
                    <p className="text-xl text-neutral-500 dark:text-neutral-400 mb-8">{selectedExp.company}</p>
                    
                    <div className="space-y-8">
                         <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4">Key Responsibilities</h4>
                            <ul className="space-y-3">
                                {selectedExp.description.map((desc, i) => (
                                    <li key={i} className="text-muted-foreground flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600 mt-2 flex-shrink-0" />
                                        <span>{desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                         {selectedExp.images && selectedExp.images.length > 0 && (
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4">Gallery</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedExp.images.map((img, i) => (
                                        <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                                            <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                                                Mockup Image {i+1}
                                            </div>
                                             {/* <Image src={`/images/${img}`} alt="" fill className="object-cover" /> */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                         )}

                         <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4">Full Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedExp.skills.map(skill => (
                                <span key={skill} className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 px-3 py-1.5 rounded-md">
                                    {skill}
                                </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
             </motion.div>
          </div>
        )}
       </AnimatePresence>
    </Section>
  );
}
