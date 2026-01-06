"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function PetCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tuned for SLOWER, LAZIER movement
  // Lower stiffness = more drag/lag behind cursor
  const springConfig = { damping: 30, stiffness: 70 }; 
  const navX = useSpring(mouseX, springConfig);
  const navY = useSpring(mouseY, springConfig);

  const [isFacingRight, setIsFacingRight] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  
  useEffect(() => {
    let moveTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      setIsMoving(true);
      
      if (e.movementX > 0) setIsFacingRight(true);
      if (e.movementX < 0) setIsFacingRight(false);

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
          setIsMoving(false);
      }, 100);
    };

    const handleTouchStart = (e: TouchEvent) => {
       const touch = e.touches[0];
       mouseX.set(touch.clientX);
       mouseY.set(touch.clientY);
       setIsMoving(true);
       clearTimeout(moveTimeout);
       moveTimeout = setTimeout(() => setIsMoving(false), 200);
    };

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart); 

    mouseX.set(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    mouseY.set(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", checkMobile);
      clearTimeout(moveTimeout);
    };
  }, [mouseX, mouseY]);
  
  return (
    <motion.div
      className="fixed z-[9997] pointer-events-none"
      style={{
        x: navX,
        y: navY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
        <motion.div
         // NO BOUNCE - Just Rotate (Glide)
         animate={
             isMoving 
             ? { rotate: isFacingRight ? 5 : -5 }
             : { rotate: 0 }
         }
         transition={{
            rotate: { duration: 0.2 }
         }}
        >
            {/* Reduced Scale: 60px (User requested smaller) */}
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform={isFacingRight ? "scale(-1, 1) translate(-100, 0)" : ""}>
                 
                 {/* Legs - Static Glide */}
                 <rect x="25" y="70" width="8" height="20" rx="4" className="fill-neutral-900 dark:fill-white" />
                 <rect x="55" y="70" width="8" height="20" rx="4" className="fill-neutral-900 dark:fill-white" />

                 {/* Tail - Wags - Safe bounds */}
                 <motion.path 
                    d="M85 65C95 55 95 35 85 25" 
                    stroke="currentColor" 
                    strokeWidth="6" 
                    className="text-neutral-900 dark:text-neutral-100" 
                    strokeLinecap="round"
                    animate={{ rotate: isMoving ? [0, 10, 0] : [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ originX: "80px", originY: "70px" }}
                 />
                 
                 {/* Body */}
                 <rect x="20" y="35" width="50" height="45" rx="20" className="fill-neutral-900 dark:fill-white" />
                 
                 {/* Head */}
                 <circle cx="25" cy="40" r="22" className="fill-neutral-900 dark:fill-white" />
                 
                 {/* Ears */}
                 <path d="M10 25L15 5L30 20" className="fill-neutral-900 dark:fill-white" />
                 <path d="M40 25L35 5L20 20" className="fill-neutral-900 dark:fill-white" />
                 
                 {/* Eyes */}
                 <circle cx="18" cy="37" r="3" className="fill-white dark:fill-neutral-900" />
                 <circle cx="32" cy="37" r="3" className="fill-white dark:fill-neutral-900" />
                </g>
            </svg>
        </motion.div>
    </motion.div>
  );
}
