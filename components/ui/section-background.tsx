"use client";

import { motion } from "framer-motion";

interface SectionBackgroundProps {
  variant: "experience" | "projects" | "about" | "footer";
}

export default function SectionBackground({ variant }: SectionBackgroundProps) {
  if (variant === "experience") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-violet-500/15 to-purple-500/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-500/12 to-blue-500/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -25, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-violet-500/30' : 'bg-cyan-500/30'}`}
            style={{
              left: `${15 + (i * 10)}%`,
              top: `${10 + (i % 4) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0, 20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Subtle grid */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                              linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
          animate={{ backgroundPosition: ['0px 0px', '80px 80px'] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Gradient transition at top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
    );
  }

  if (variant === "projects") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large rotating orb */}
        <motion.div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/8 via-transparent to-cyan-500/8 rounded-full blur-3xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Accent orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-violet-500/15 to-transparent rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-to-bl from-cyan-500/15 to-transparent rounded-full blur-2xl"
          animate={{ 
            scale: [1, 0.9, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Floating code symbols */}
        {['<', '/', '>', '{', '}', '(', ')'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-violet-500/10 dark:text-violet-400/10 font-mono text-4xl font-bold"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0]
            }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            {symbol}
          </motion.div>
        ))}
        
        {/* Gradient transitions */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>
    );
  }

  if (variant === "about") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Central glow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-cyan-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Corner orbs */}
        <motion.div 
          className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-bl from-violet-500/12 to-transparent rounded-full blur-3xl"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-cyan-500/12 to-transparent rounded-full blur-3xl"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating skill icons */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-violet-500/25' : i % 3 === 1 ? 'bg-cyan-500/25' : 'bg-pink-500/25'}`}
            style={{
              left: `${5 + (i * 9)}%`,
              top: `${20 + (i % 5) * 15}%`,
            }}
            animate={{
              y: [0, -25, 0, 25, 0],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 4 + (i % 3) * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Pulsing rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-violet-500/10 rounded-full"
              style={{
                width: 300 + i * 200,
                height: 300 + i * 200,
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Gradient transitions */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Bottom glow */}
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-t from-violet-500/10 via-purple-500/5 to-transparent blur-3xl"
          animate={{ 
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              left: `${5 + (i * 6)}%`,
              top: `${10 + (i % 6) * 15}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Gradient transition at top */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
      </div>
    );
  }

  return null;
}
