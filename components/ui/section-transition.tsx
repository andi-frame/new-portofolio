"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionTransitionProps {
  variant?: "fade" | "glow" | "particles";
  height?: "sm" | "md" | "lg";
}

export default function SectionTransition({ variant = "fade", height = "md" }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  const heightClass = {
    sm: "h-24",
    md: "h-40",
    lg: "h-56"
  }[height];

  if (variant === "glow") {
    return (
      <div ref={ref} className={`relative ${heightClass} w-full overflow-hidden`}>
        {/* Top fade from previous section */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-background to-transparent" />
        
        {/* Center glow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-32"
          style={{ opacity }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/15 to-transparent blur-2xl"
            animate={{ 
              scaleX: [0.8, 1, 0.8],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-3xl"
            animate={{ 
              scaleX: [1, 0.8, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>
        
        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>
    );
  }

  if (variant === "particles") {
    return (
      <div ref={ref} className={`relative ${heightClass} w-full overflow-hidden`}>
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        
        {/* Floating particles */}
        <motion.div className="absolute inset-0" style={{ opacity }}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                i % 3 === 0 ? 'bg-violet-500/40' : i % 3 === 1 ? 'bg-cyan-500/40' : 'bg-pink-500/30'
              }`}
              style={{
                left: `${5 + (i * 4.5)}%`,
                top: `${30 + (i % 4) * 10}%`,
              }}
              animate={{
                y: [0, -15, 0, 15, 0],
                x: [0, i % 2 === 0 ? 10 : -10, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 3 + (i % 2),
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* Center line accent */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-px"
          style={{ opacity }}
        >
          <motion.div 
            className="w-full h-full bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
            animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    );
  }

  // Default: fade transition
  return (
    <div ref={ref} className={`relative ${heightClass} w-full`}>
      {/* Smooth gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      {/* Subtle center accent */}
      <motion.div 
        className="absolute top-1/2 left-0 right-0 h-px"
        style={{ opacity }}
      >
        <motion.div 
          className="w-full h-full bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
