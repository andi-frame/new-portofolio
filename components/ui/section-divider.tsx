"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "wave" | "gradient" | "dots" | "line";
  flip?: boolean;
}

export default function SectionDivider({ variant = "gradient", flip = false }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  if (variant === "wave") {
    return (
      <div ref={ref} className={`relative h-24 w-full overflow-hidden ${flip ? 'transform rotate-180' : ''}`}>
        <motion.svg 
          className="absolute bottom-0 w-full h-24"
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
          style={{ opacity }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="var(--accent-secondary)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,75 1440,60 L1440,120 L0,120 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,60 C360,120 720,0 1080,60 C1260,90 1380,75 1440,60 L1440,120 L0,120 Z",
                "M0,80 C360,20 720,100 1080,40 C1260,60 1380,80 1440,70 L1440,120 L0,120 Z",
                "M0,60 C360,120 720,0 1080,60 C1260,90 1380,75 1440,60 L1440,120 L0,120 Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <motion.div 
        ref={ref}
        className="relative h-16 w-full flex items-center justify-center gap-3"
        style={{ opacity, scale }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    );
  }

  if (variant === "line") {
    return (
      <motion.div 
        ref={ref}
        className="relative h-20 w-full flex items-center justify-center"
        style={{ opacity }}
      >
        <motion.div 
          className="w-40 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
          animate={{
            scaleX: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    );
  }

  // Default: gradient divider
  return (
    <motion.div 
      ref={ref}
      className="relative h-32 w-full overflow-hidden"
      style={{ opacity }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8">
        <motion.div 
          className="w-20 h-px bg-gradient-to-r from-transparent to-violet-500/40"
          animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="w-20 h-px bg-gradient-to-l from-transparent to-cyan-500/40"
          animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
