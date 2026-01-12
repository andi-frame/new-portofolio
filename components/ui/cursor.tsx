"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Spring configurations
  const dotX = useSpring(mouseX, { stiffness: 2000, damping: 20 });
  const dotY = useSpring(mouseY, { stiffness: 2000, damping: 20 });

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
        className="fixed top-0 left-0 w-3 h-3 bg-neutral-900 dark:bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%"
        }}
        />
    </>
  );
}
