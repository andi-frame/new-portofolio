"use client";

import { profile } from "@/lib/data";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  
  // 1. Clapperboard Close & Fade (0 - 0.25)
  const rotateSlat = useTransform(smoothScroll, [0, 0.2], [-35, 0]); 
  const scaleBoard = useTransform(smoothScroll, [0, 0.25], [1.2, 0.8]); 
  const opacityBoard = useTransform(smoothScroll, [0.2, 0.3], [1, 0]);
  const yBoard = useTransform(smoothScroll, [0.2, 0.3], [0, -100]);
  
  // 2. Text Reveal (0.25 - 0.35)
  const opacityText = useTransform(smoothScroll, [0.25, 0.35], [0, 1]);
  const yText = useTransform(smoothScroll, [0.25, 0.35], [50, 0]);

  // 3. LOCK PHASE: Loading Rope (0.4 - 0.9)
  const loadingProgress = useTransform(smoothScroll, [0.4, 0.9], [0, 100]);
  const loadingWidth = useTransform(loadingProgress, (v) => `${v}%`);
  
  // 4. EXIT PHASE (0.9 - 1.0)
  const opacityContainer = useTransform(smoothScroll, [0.9, 1.0], [1, 0]);
  const yContainer = useTransform(smoothScroll, [0.9, 1.0], [0, -100]);

  // Unlock Indicator
  const showArrow = useTransform(smoothScroll, (v) => v > 0.9 ? 1 : 0);

  return (
    <section 
      ref={targetRef} 
      id="home" 
      className="relative h-[400vh] bg-background"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Container for Intro & Rope*/}
        <motion.div 
            style={{ opacity: opacityContainer, y: yContainer }}
            className="relative w-full h-full flex flex-col items-center justify-center"
        >

            {/* Giant Clapperboard - Starts OPEN */}
            <motion.div 
                style={{ 
                    scale: scaleBoard, 
                    opacity: opacityBoard, 
                    y: yBoard,
                    filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.25))",
                    position: "absolute",
                    zIndex: 20
                }} 
                className="w-[300px] md:w-[500px] aspect-[1.2/1]"
            >
            {/* Body */}
            <div className="absolute bottom-0 w-full h-[75%] bg-[#1c1c1c] rounded-b-xl overflow-hidden border-t-2 border-[#333] flex items-center justify-center ring-1 ring-neutral-900/5 relative group">
                <div className="absolute bottom-4 right-4 flex gap-3 text-[10px] font-mono text-white/30">
                    <span className="border border-white/20 px-1 rounded">ISO 800</span>
                    <span className="border border-white/20 px-1 rounded">4K</span>
                </div>
                
                <div className="text-white/30 font-mono text-center select-none">
                    <div className="text-4xl md:text-6xl font-bold tracking-widest leading-none mb-4">CODE.</div>
                    <div className="text-sm md:text-base tracking-[0.5em] text-white/50">{profile.name.toUpperCase()}</div>
                </div>
            </div>
            
            {/* Slates */}
            <motion.div 
                style={{ rotateZ: rotateSlat, transformOrigin: "bottom left" }}
                initial={{ rotateZ: -35 }}
                className="absolute top-0 w-full h-[20%] bg-[#1c1c1c] rounded-t-sm origin-bottom-left z-30 ring-1 ring-neutral-900/5"
            >
                <div className="flex w-full h-full border-b-4 border-white">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-white' : 'bg-[#1c1c1c]'} skew-x-[-15deg] mx-1`}></div>  
                    ))}
                </div>
                <span className="absolute top-1 right-2 text-[8px] font-bold text-white/50 bg-black/50 px-1 rounded">REC</span>
            </motion.div>
            
            </motion.div>

            {/* Introduction*/}
            <motion.div 
                style={{ opacity: opacityText, y: yText }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 space-y-8 pointer-events-none"
            >
                <div className="overflow-hidden">
                    <h2 className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-neutral-500 dark:text-neutral-400 mb-6">
                        {profile.role}
                    </h2>
                    <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter mb-8 leading-[0.9]">
                        {profile.name}
                    </h1>
                    <p className="text-lg md:text-2xl text-neutral-700 dark:text-neutral-300 font-serif italic max-w-4xl mx-auto leading-relaxed px-4">
                        "{profile.hook}"
                    </p>
                </div>
            </motion.div>
            
            {/* Loading Bar */}
             <motion.div 
                style={{ opacity: opacityText }}
                className="absolute bottom-24 w-64 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden z-20"
            >
                <motion.div 
                className="h-full bg-foreground"
                style={{ width: loadingWidth }}
                />
            </motion.div>
            <motion.div style={{ opacity: opacityText }} className="absolute bottom-20 text-xs font-mono text-neutral-400">
                SCROLL TO START
            </motion.div>

            {/* Unlock Arrow */}
             <motion.div 
                style={{ opacity: showArrow }} 
                className="absolute bottom-12 animate-bounce"
            >
                <ArrowDown className="w-6 h-6 text-foreground" />
            </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
