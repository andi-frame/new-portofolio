"use client";

import { experiences, Experience as ExperienceType } from "@/lib/data";
import Section from "@/components/ui/section";
import SectionBackground from "@/components/ui/section-background";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp, Eye, X, Briefcase } from "lucide-react";

export default function Experience() {
  const [showAll, setShowAll] = useState(false);
  const [selectedExp, setSelectedExp] = useState<ExperienceType | null>(null);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  
  // Scroll progress for the timeline animation
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  
  // Timeline height grows with scroll
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const initialCount = 4;
  const visibleExperiences = showAll ? experiences : experiences.slice(0, initialCount);

  const handleShowMore = () => {
    // Save current scroll position to prevent jump
    scrollPositionRef.current = window.scrollY;
    setShowAll(true);
    
    // Restore scroll position after render to prevent jumping
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPositionRef.current);
    });
  };

  // Smooth scroll function that follows button
  const smoothScrollToButton = useCallback(() => {
    if (!buttonContainerRef.current) return;
    
    const startTime = performance.now();
    const duration = 600; // 600ms scroll duration
    const startY = window.scrollY;
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      if (buttonContainerRef.current) {
        const rect = buttonContainerRef.current.getBoundingClientRect();
        const targetY = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
        const currentY = startY + (targetY - startY) * easeOut;
        
        window.scrollTo(0, Math.max(0, currentY));
      }
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsCollapsing(false);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const handleShowLess = () => {
    setIsCollapsing(true);
    setShowAll(false);
    
    // Start smooth scroll animation after a brief delay for state to update
    setTimeout(() => {
      smoothScrollToButton();
    }, 50);
  };

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <Section id="experience" fullWidth className="relative overflow-hidden">
      {/* Animated Background */}
      <SectionBackground variant="experience" />
      
      {/* Inner container for content */}
      <div className="px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-20 text-center relative z-10"
        >
        <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">
          Track Record
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Professional <span className="text-gradient">Experience</span>
        </h2>
      </motion.div>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Timeline container - separate from button */}
        <div ref={timelineRef} className="relative">
          {/* Static Timeline Background */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800 md:transform md:-translate-x-1/2 ml-4 md:ml-0" />
          
          {/* Animated Timeline Line */}
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-violet-500 via-cyan-500 to-violet-500 dark:from-violet-400 dark:via-cyan-400 dark:to-violet-400 md:transform md:-translate-x-1/2 ml-4 md:ml-0 origin-top"
            style={{ height: timelineHeight }}
          />

          <div className="space-y-8 pb-4">
            <AnimatePresence mode="popLayout">
              {visibleExperiences.map((exp, index) => (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, y: 50, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ 
                    opacity: 0, 
                    y: -30, 
                    scale: 0.95,
                    transition: { 
                      duration: 0.4, 
                      delay: (visibleExperiences.length - index - 1) * 0.08 
                    }
                  }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index >= initialCount ? 0.1 * (index - initialCount + 1) : 0,
                  }}
                  layout
                  onClick={() => exp.hasDetail && setSelectedExp(exp)}
                  className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 group ${exp.hasDetail ? "cursor-pointer" : "cursor-default"}`}
                >
                  {/* Dot on Line */}
                  <div className="absolute left-0 md:left-1/2 top-8 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-10 ml-[9px] md:ml-0">
                    <motion.div 
                      className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/30 group-hover:scale-125 transition-transform duration-300"
                      whileHover={{ scale: 1.3 }}
                    />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"}`}>
                    <motion.div 
                      className="relative p-6 rounded-2xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm hover:shadow-xl hover:border-violet-300/50 dark:hover:border-violet-700/50 transition-all duration-500 group-hover:-translate-y-1"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Period Badge */}
                      <span className="inline-block px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-mono mb-3">
                        {exp.period}
                      </span>
                      
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-gradient transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <p className="text-muted-foreground font-medium text-sm mb-4 flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5" />
                        {exp.company}
                      </p>
                      
                      {/* List with justified text */}
                      <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed mb-4">
                        {exp.description.slice(0, 2).map((desc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                            <span className="text-justify">{desc}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {exp.skills.slice(0, 4).map(skill => (
                          <span key={skill} className="text-[10px] uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-2 py-1 rounded-md font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      {exp.hasDetail && (
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-violet-500 inline-flex items-center gap-1.5 transition-colors">
                          <Eye className="w-3.5 h-3.5" /> View Details
                        </span>
                      )}

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Timeline end - fade out at bottom of cards */}
          <div className="absolute left-0 md:left-1/2 bottom-0 md:transform md:-translate-x-1/2 ml-[11px] md:ml-0 h-8 w-1 bg-gradient-to-b from-neutral-200 dark:from-neutral-800 to-transparent rounded-full" />
        </div>
        
        {/* Show More/Less Button - OUTSIDE and BELOW timeline */}
        {experiences.length > initialCount && (
          <motion.div 
            ref={buttonContainerRef}
            className="mt-16 flex justify-center"
            layout
            transition={{ 
              type: "spring", 
              stiffness: 150, 
              damping: 20,
              duration: 0.6
            }}
          >
            <motion.button 
              onClick={showAll ? handleShowLess : handleShowMore}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full text-sm font-medium hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
              transition={{ 
                type: "spring", 
                stiffness: 150, 
                damping: 20,
                duration: 0.6
              }}
            >
              <AnimatePresence mode="wait">
                {showAll ? (
                  <motion.span
                    key="less"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="inline-flex items-center gap-2"
                  >
                    Show Less <ChevronUp className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="more"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="inline-flex items-center gap-2"
                  >
                    Show More ({experiences.length - initialCount} remaining) <ChevronDown className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </div>
      
      {/* Close inner container */}
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
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              layoutId={`exp-${selectedExp.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-background w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl"
            >
              {/* Header with gradient */}
              <div className="sticky top-0 p-6 flex justify-between items-center bg-gradient-to-b from-background via-background to-transparent z-10">
                <span className="px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-mono">
                  {selectedExp.period}
                </span>
                <motion.button 
                  onClick={() => setSelectedExp(null)} 
                  className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="px-8 pb-10">
                <h3 className="text-3xl font-bold text-foreground mb-1">{selectedExp.role}</h3>
                <p className="text-xl text-muted-foreground mb-8 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  {selectedExp.company}
                </p>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gradient mb-4">Key Responsibilities</h4>
                    {/* Modal list with justified text */}
                    <ul className="space-y-3">
                      {selectedExp.description.map((desc, i) => (
                        <li key={i} className="text-muted-foreground flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 mt-2 flex-shrink-0" />
                          <span className="text-justify">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedExp.images && selectedExp.images.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-gradient mb-4">Gallery</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedExp.images.map((img, i) => (
                          <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                            <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                              Mockup Image {i+1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gradient mb-4">Full Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExp.skills.map(skill => (
                        <span key={skill} className="text-xs uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-3 py-1.5 rounded-lg font-medium">
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
