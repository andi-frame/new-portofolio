"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Spring configurations for smoothness
  // Dot: Fast response
  const dotX = useSpring(mouseX, { stiffness: 2000, damping: 20 });
  const dotY = useSpring(mouseY, { stiffness: 2000, damping: 20 });
  
  // Ring: Slower, "floaty" response - No Jitter
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
        {/* Main Cursor Dot */}
        <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-neutral-900 dark:bg-white rounded-full pointer-events-none z-[9999]"
        style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%"
        }}
        />
        
        {/* Trailing Ring - Smooth Physics */}
        <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-[1.5px] border-black dark:border-white rounded-full pointer-events-none z-[9998]"
        style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%"
        }}
        />
    </>
  );
}
