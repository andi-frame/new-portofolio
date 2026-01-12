"use client";

import { profile } from "@/lib/data";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Terminal } from "lucide-react";

export default function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  
  // Card flip animation - starts at 180deg (back showing), flips to 0deg (front showing)
  const cardRotateY = useTransform(smoothScroll, [0, 0.25], [180, 0]);
  
  // Original skew/tilt animation (applied after flip)
  const scaleTerminal = useTransform(smoothScroll, [0, 0.15], [0.8, 1]); 
  const rotateYSkew = useTransform(smoothScroll, [0, 0.25], [-15, 0]); 
  const rotateX = useTransform(smoothScroll, [0, 0.25], [25, 0]); 
  const opacityTerminal = useTransform(smoothScroll, [0.35, 0.45], [1, 0]);
  const yTerminal = useTransform(smoothScroll, [0.35, 0.45], [0, -80]);
  
  // Orbiting elements
  const orbitRotate = useTransform(smoothScroll, [0, 0.4], [0, 360]);
  const orbitScale = useTransform(smoothScroll, [0, 0.2], [0.5, 1]);
  
  // Text Reveal
  const opacityText = useTransform(smoothScroll, [0.35, 0.45], [0, 1]);
  const yText = useTransform(smoothScroll, [0.35, 0.45], [50, 0]);

  // Loading bar
  const loadingProgress = useTransform(smoothScroll, [0.5, 0.9], [0, 100]);
  const loadingWidth = useTransform(loadingProgress, (v) => `${v}%`);
  
  // Exit
  const opacityContainer = useTransform(smoothScroll, [0.9, 1.0], [1, 0]);
  const yContainer = useTransform(smoothScroll, [0.9, 1.0], [0, -100]);
  const showArrow = useTransform(smoothScroll, (v) => v > 0.9 ? 1 : 0);

  // Code lines for the terminal - colors reference CSS variables
  const codeLines = [
    { text: 'const developer = {', color: 'var(--terminal-purple)' },
    { text: `  name: "${profile.name}",`, color: 'var(--terminal-green-text)' },
    { text: '  passion: "Building great things",', color: 'var(--terminal-green-text)' },
    { text: '  coffee: Infinity,', color: 'var(--terminal-orange)' },
    { text: '};', color: 'var(--terminal-purple)' },
    { text: 'export default developer;', color: 'var(--terminal-blue)' },
  ];

  return (
    <section 
      ref={targetRef} 
      id="home" 
      className="relative h-[400vh] bg-background"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <motion.div 
            style={{ opacity: opacityContainer, y: yContainer }}
            className="relative w-full h-full pt-28 flex flex-col items-center justify-center"
        >

            {/* Floating Code Terminal with Card Flip */}
            <motion.div 
                style={{ 
                    scale: scaleTerminal, 
                    opacity: opacityTerminal, 
                    y: yTerminal,
                    rotateY: rotateYSkew,
                    rotateX: rotateX,
                    position: "absolute",
                    zIndex: 20
                }} 
                className="w-[300px] md:w-[520px]"
            >
                {/* Perspective container for flip */}
                <div style={{ perspective: "1200px", transformStyle: "preserve-3d" }}>
                    
                    {/* Orbiting Elements */}
                    <motion.div 
                        style={{ rotate: orbitRotate, scale: orbitScale }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <div className="absolute -top-10 -left-10 text-4xl font-mono text-violet-500/30 animate-pulse">{"{"}</div>
                        <div className="absolute -top-10 -right-10 text-4xl font-mono text-cyan-500/30 animate-pulse" style={{ animationDelay: '0.5s' }}>{"}"}</div>
                        <div className="absolute -bottom-10 -left-10 text-4xl font-mono text-violet-500/30 animate-pulse" style={{ animationDelay: '1s' }}>{"<"}</div>
                        <div className="absolute -bottom-10 -right-10 text-4xl font-mono text-cyan-500/30 animate-pulse" style={{ animationDelay: '1.5s' }}>{"/>"}</div>
                        <div className="absolute top-1/2 -left-16 w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 animate-bounce" />
                        <div className="absolute top-1/2 -right-16 w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-bounce" style={{ animationDelay: '0.3s' }} />
                        <div className="absolute -top-14 left-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 animate-bounce" style={{ animationDelay: '0.6s' }} />
                        <div className="absolute -bottom-14 left-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 animate-bounce" style={{ animationDelay: '0.9s' }} />
                    </motion.div>

                    {/* Card Container with Flip */}
                    <motion.div 
                        style={{ rotateY: cardRotateY, transformStyle: "preserve-3d" }}
                        className="relative"
                    >
                        {/* FRONT - Terminal (visible when rotateY = 0) */}
                        <div 
                            className="relative rounded-2xl shadow-2xl overflow-hidden"
                            style={{ 
                                backfaceVisibility: "hidden",
                                backgroundColor: 'var(--terminal-bg)',
                                borderColor: 'var(--terminal-border)',
                                borderWidth: '1px'
                            }}
                        >
                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-violet-500/20 rounded-2xl blur-xl -z-10 animate-pulse" />
                            
                            {/* Terminal header */}
                            <div 
                                className="flex items-center gap-2 px-4 py-3 border-b"
                                style={{ 
                                    backgroundColor: 'var(--terminal-header)',
                                    borderColor: 'var(--terminal-border)'
                                }}
                            >
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--terminal-red)' }} />
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--terminal-yellow)' }} />
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--terminal-green)' }} />
                                </div>
                                <div className="flex-1 text-center">
                                    <span className="text-xs font-mono text-[#6c7086]">developer.ts</span>
                                </div>
                                <Terminal className="w-4 h-4 text-[#6c7086]" />
                            </div>
                            
                            {/* Terminal content */}
                            <div className="p-5 font-mono text-sm md:text-base">
                                <div className="flex gap-4">
                                    <div className="flex flex-col text-[#6c7086] text-right select-none">
                                        {codeLines.map((_, i) => (
                                            <span key={i} className="leading-7">{i + 1}</span>
                                        ))}
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        {codeLines.map((line, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.15, duration: 0.3 }}
                                                className="leading-7 flex items-center text-xs md:text-lg"
                                                style={{ color: line.color || '#cdd6f4' }}
                                            >
                                                {line.text}
                                                {i === codeLines.length - 1 && (
                                                    <motion.span 
                                                        animate={{ opacity: [1, 0] }}
                                                        transition={{ duration: 0.6, repeat: Infinity }}
                                                        className="inline-block w-2 h-5 bg-violet-400 ml-1"
                                                    />
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Terminal footer */}
                            <div className="px-4 py-2 bg-[#181825] border-t border-[#313244] flex items-center justify-between">
                                <div className="flex items-center gap-3 text-xs text-[#6c7086]">
                                    <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-[#a6e3a1]" />
                                        TypeScript
                                    </span>
                                    <span>UTF-8</span>
                                </div>
                                <div className="text-xs text-[#6c7086]">Ln 8, Col 25</div>
                            </div>
                        </div>
                        
                        {/* BACK - Dark with "Go with Han" */}
                        <div 
                            className="absolute inset-0 bg-[#0a0a0f] rounded-2xl shadow-2xl border border-[#1a1a2e] flex items-center justify-center"
                            style={{ 
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)"
                            }}
                        >
                            {/* Subtle pattern */}
                            <div 
                                className="absolute inset-0 opacity-5"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                                    backgroundSize: '20px 20px'
                                }}
                            />
                            
                            {/* Content */}
                            <div className="text-center relative z-10">
                                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
                                    Go with <span className="text-gradient">Han</span>
                                </h2>
                                <p className="text-white/30 text-[10px] md:text-xs mt-4 font-mono uppercase tracking-widest">↓ Scroll to reveal ↓</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Animated Background for Introduction Section */}
            <motion.div 
                style={{ opacity: opacityText }}
                className="absolute inset-0 overflow-hidden pointer-events-none"
            >
                {/* Animated gradient orbs */}
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-3xl"
                    animate={{ 
                        x: [0, 50, 0, -50, 0],
                        y: [0, -30, 0, 30, 0],
                        scale: [1, 1.2, 1, 0.9, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-full blur-3xl"
                    animate={{ 
                        x: [0, -40, 0, 40, 0],
                        y: [0, 40, 0, -40, 0],
                        scale: [1, 0.9, 1, 1.1, 1]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-500/10 rounded-full blur-3xl"
                    animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Floating particles */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-violet-500/40' : 'bg-cyan-500/40'}`}
                        style={{
                            left: `${10 + (i * 7)}%`,
                            top: `${20 + (i % 4) * 20}%`,
                        }}
                        animate={{
                            y: [0, -30, 0, 30, 0],
                            x: [0, i % 2 === 0 ? 20 : -20, 0],
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 4 + (i % 3),
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut"
                        }}
                    />
                ))}
                
                {/* Animated grid lines */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <motion.div 
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, currentColor 1px, transparent 1px),
                                linear-gradient(to bottom, currentColor 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px'
                        }}
                        animate={{ 
                            backgroundPosition: ['0px 0px', '60px 60px']
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                
                {/* Radial pulse rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-violet-500/20 rounded-full"
                            style={{
                                width: 200 + i * 150,
                                height: 200 + i * 150,
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.1, 0.3]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 0.8,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Introduction */}
            <motion.div 
                style={{ opacity: opacityText, y: yText }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 space-y-8 pointer-events-none"
            >
                <div className="overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] md:text-xs font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase mb-4 md:mb-6"
                    >
                        {profile.role}
                    </motion.div>
                    <h1 className="text-4xl md:text-8xl font-black tracking-tighter mb-6 md:mb-8 leading-[0.9]">
                        <span className="text-gradient">{profile.name}</span>
                    </h1>
                    <p className="text-base md:text-2xl text-muted-foreground font-serif italic max-w-4xl mx-auto leading-relaxed px-4">
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
                    className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                    style={{ width: loadingWidth }}
                />
            </motion.div>
            <motion.div style={{ opacity: opacityText }} className="absolute bottom-20 text-xs font-mono text-muted-foreground">
                SCROLL TO START
            </motion.div>

            {/* Unlock Arrow */}
            <motion.div 
                style={{ opacity: showArrow }} 
                className="absolute bottom-12 animate-bounce"
            >
                <ArrowDown className="w-6 h-6 text-violet-500" />
            </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
