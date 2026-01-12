"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Background() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500 });
  
  const { scrollYProgress } = useScroll();
  
  // Parallax effects for orbs
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    setMounted(true);
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Cursor-following spotlight */}
      <div 
        className="fixed pointer-events-none z-0"
        style={{
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.08), rgba(6, 182, 212, 0.04) 50%, transparent 70%)`,
          transition: 'background 0.2s ease-out',
        }}
      />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large parallax gradient orbs */}
        <motion.div 
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-violet-500/15 to-purple-500/5 rounded-full blur-3xl"
          style={{ y: orbY1 }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/4 -right-60 w-[700px] h-[700px] bg-gradient-to-bl from-cyan-500/10 to-blue-500/5 rounded-full blur-3xl"
          style={{ y: orbY2 }}
          animate={{ 
            scale: [1, 0.9, 1],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/8 to-rose-500/3 rounded-full blur-3xl"
          style={{ y: orbY3 }}
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating accent orbs */}
        <motion.div 
          className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-2xl"
          animate={{ 
            y: [0, -40, 0],
            x: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/5 w-24 h-24 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-full blur-2xl"
          animate={{ 
            y: [0, 30, 0],
            x: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Animated noise grain overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Dot Grid Pattern with subtle animation */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Gradient line accents */}
        <motion.div 
          className="absolute top-1/3 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scaleX: [0.8, 1, 0.8]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-2/3 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-cyan-500/20 to-transparent"
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scaleX: [0.9, 1, 0.9]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Top and bottom fade */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>
    </>
  );
}
