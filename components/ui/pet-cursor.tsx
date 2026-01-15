"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform, animate } from "framer-motion";

export default function PetCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Track pupil direction
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  
  // Smooth leg animation using motion values
  const legProgress = useMotionValue(0);
  const legAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  
  // Double-tap detection for mobile
  const lastTapRef = useRef<number>(0);

  // Tuned for SLOWER, LAZIER movement
  const springConfig = { damping: 30, stiffness: 70 }; 
  const navX = useSpring(mouseX, springConfig);
  const navY = useSpring(mouseY, springConfig);

  const [isFacingRight, setIsFacingRight] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  
  // Store current cat position for pupil tracking
  const catPosRef = useRef({ x: 0, y: 0 });
  
  // Smooth leg transforms using sine wave for natural motion
  const frontLegY = useTransform(legProgress, [0, 0.25, 0.5, 0.75, 1], [68, 65, 68, 72, 68]);
  const frontPawY = useTransform(legProgress, [0, 0.25, 0.5, 0.75, 1], [76, 71, 76, 80, 76]);
  const frontLegX = useTransform(legProgress, [0, 0.25, 0.5, 0.75, 1], [0, -3, 0, 3, 0]);
  
  const backLegY = useTransform(legProgress, [0, 0.25, 0.5, 0.75, 1], [69, 73, 69, 65, 69]);
  const backPawY = useTransform(legProgress, [0, 0.25, 0.5, 0.75, 1], [78, 82, 78, 73, 78]);
  const backLegX = useTransform(legProgress, [0, 0.25, 0.5, 0.75, 1], [0, 3, 0, -3, 0]);
  
  useEffect(() => {
    let moveTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      // Only track mouse on desktop
      if (window.innerWidth < 768) return;
      
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      setIsMoving(true);
      
      if (e.movementX > 0) setIsFacingRight(true);
      if (e.movementX < 0) setIsFacingRight(false);
      
      // Calculate pupil offset based on mouse position relative to cat
      const catX = catPosRef.current.x;
      const catY = catPosRef.current.y;
      const dx = e.clientX - catX;
      const dy = e.clientY - catY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        const maxOffset = 2.5;
        const normalizedX = (dx / distance) * Math.min(distance / 50, 1) * maxOffset;
        const normalizedY = (dy / distance) * Math.min(distance / 50, 1) * maxOffset;
        setPupilOffset({ x: normalizedX, y: normalizedY });
      }

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };

    // Mobile: Only move on double-tap
    const handleTouchStart = (e: TouchEvent) => {
      const now = Date.now();
      const DOUBLE_TAP_DELAY = 300; // ms
      
      if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
        // Double tap detected - move the cat
        const touch = e.touches[0];
        const catX = catPosRef.current.x;
        
        // Determine facing direction
        if (touch.clientX > catX) setIsFacingRight(true);
        else if (touch.clientX < catX) setIsFacingRight(false);
        
        mouseX.set(touch.clientX);
        mouseY.set(touch.clientY);
        setIsMoving(true);
        
        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => setIsMoving(false), 500);
      }
      
      lastTapRef.current = now;
    };

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true }); 

    // Initialize cat position
    mouseX.set(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    mouseY.set(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", checkMobile);
      clearTimeout(moveTimeout);
    };
  }, [mouseX, mouseY]);

  // Theme detection
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // Cat colors based on theme
  const colors = isDark ? {
    body: '#4b5563',       // gray-600
    bodyLight: '#6b7280',  // gray-500
    legs: '#374151',       // gray-700
    paws: '#4b5563',       // gray-600
    farLegs: '#1f2937',    // gray-800
    farPaws: '#374151',    // gray-700
    cheeks: '#4b5563',     // gray-600
    highlight: '#6b7280',  // gray-500
    ears: '#374151',       // gray-700
    whiskers: '#6b7280',   // gray-500
  } : {
    body: '#d1d5db',       // gray-300
    bodyLight: '#e5e7eb',  // gray-200
    legs: '#9ca3af',       // gray-400
    paws: '#d1d5db',       // gray-300
    farLegs: '#7f858c',    // custom dark gray
    farPaws: '#a8adb3',    // custom light gray
    cheeks: '#e5e7eb',     // gray-200
    highlight: '#e5e7eb',  // gray-200
    ears: '#9ca3af',       // gray-400
    whiskers: '#9ca3af',   // gray-400
  };

  // Update cat position ref
  useEffect(() => {
    const unsubX = navX.on("change", (x) => { catPosRef.current.x = x; });
    const unsubY = navY.on("change", (y) => { catPosRef.current.y = y; });
    return () => { unsubX(); unsubY(); };
  }, [navX, navY]);

  // Smooth walking animation using animate()
  useEffect(() => {
    if (isMoving) {
      legAnimationRef.current = animate(legProgress, [0, 1], {
        duration: 0.5,
        repeat: Infinity,
        ease: "linear"
      });
    } else {
      if (legAnimationRef.current) {
        legAnimationRef.current.stop();
      }
      // Smoothly return to idle
      animate(legProgress, 0, { duration: 0.2 });
    }
    
    return () => {
      if (legAnimationRef.current) {
        legAnimationRef.current.stop();
      }
    };
  }, [isMoving, legProgress]);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 2500);
    
    return () => clearInterval(blinkInterval);
  }, []);
  
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
         animate={
             isMoving 
             ? { rotate: isFacingRight ? 3 : -3, y: [0, -2, 0] }
             : { rotate: 0, y: 0 }
         }
         transition={{
            rotate: { duration: 0.2 },
            y: { duration: 0.2, repeat: isMoving ? Infinity : 0 }
         }}
        >
            {/* Cat with realistic gray color */}
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Shadow filter */}
                  <filter id="headShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <g transform={isFacingRight ? "scale(-1, 1) translate(-100, 0)" : ""}>
                 
                 {/* FAR SIDE LEGS (behind body - drawn first, darker) */}
                 {/* Far back leg */}
                 <motion.ellipse cx={useTransform(frontLegX, v => 58 + v)} cy={frontLegY} rx="5" ry="12" fill={colors.farLegs} />
                 <motion.ellipse cx={useTransform(frontLegX, v => 58 + v)} cy={frontPawY} rx="4" ry="3" fill={colors.farPaws} />
                 
                 {/* Far front leg */}
                 <motion.ellipse cx={useTransform(backLegX, v => 32 + v)} cy={backLegY} rx="4" ry="11" fill={colors.farLegs} />
                 <motion.ellipse cx={useTransform(backLegX, v => 32 + v)} cy={backPawY} rx="4" ry="3" fill={colors.farPaws} />

                 {/* Tail - curved and fluffy, attached at body */}
                 <motion.path 
                    d="M65 52 Q78 42 76 28 Q74 18 68 14" 
                    stroke={colors.legs}
                    strokeWidth="6" 
                    strokeLinecap="round"
                    fill="none"
                    animate={{ 
                      rotate: isMoving ? [0, 12, 0, -6, 0] : [0, 6, 0, -2, 0]
                    }}
                    transition={{ duration: isMoving ? 0.5 : 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: "65px", originY: "52px", transformOrigin: "65px 52px" }}
                 />
                 
                 {/* Body - smaller */}
                 <ellipse cx="48" cy="52" rx="22" ry="15" fill={colors.body} />
                 
                 {/* NEAR SIDE LEGS (in front of body - drawn after, full color) */}
                 {/* Near back leg */}
                 <motion.ellipse cx={useTransform(backLegX, v => 62 + v)} cy={backLegY} rx="6" ry="12" fill={colors.legs} />
                 <motion.ellipse cx={useTransform(backLegX, v => 62 + v)} cy={backPawY} rx="5" ry="4" fill={colors.paws} />
                 
                 {/* Near front leg */}
                 <motion.ellipse cx={useTransform(frontLegX, v => 28 + v)} cy={frontLegY} rx="5" ry="11" fill={colors.legs} />
                 <motion.ellipse cx={useTransform(frontLegX, v => 28 + v)} cy={frontPawY} rx="5" ry="4" fill={colors.paws} />
                 
                 {/* Head - oval shape, slightly bigger */}
                 <ellipse cx="24" cy="38" rx="22" ry="20" fill={colors.body} filter="url(#headShadow)" />
                 {/* Cheeks - fluffy */}
                 <ellipse cx="8" cy="46" rx="6" ry="5" fill={colors.cheeks} opacity="0.6" />
                 <ellipse cx="40" cy="46" rx="6" ry="5" fill={colors.cheeks} opacity="0.6" />
                 {/* Head highlight */}
                 <circle cx="17" cy="28" r="7" fill={colors.highlight} opacity="0.4" />
                 
                 {/* Ears - pointy, proper cat ears */}
                 <path d="M8 26 L2 10 L18 22 Z" fill={colors.ears} />
                 <path d="M40 26 L46 10 L30 22 Z" fill={colors.ears} />
                 {/* Inner ears (pink) */}
                 <path d="M9 24 L5 13 L15 21 Z" fill="#fda4af" />
                 <path d="M39 24 L43 13 L33 21 Z" fill="#fda4af" />
                 
                 {/* Eyes - with pupils that follow cursor */}
                 {isBlinking ? (
                   <>
                     <path d="M12 38 Q17 42 22 38" stroke="#4b5563" strokeWidth="2" fill="none" />
                     <path d="M26 38 Q31 42 36 38" stroke="#4b5563" strokeWidth="2" fill="none" />
                   </>
                 ) : (
                   <>
                     {/* Left eye */}
                     <ellipse cx="16" cy="38" rx="5" ry="6" fill="#4b5563" />
                     <ellipse cx="16" cy="38" rx="4" ry="5" fill="white" />
                     <ellipse 
                       cx={17 + (isFacingRight ? -pupilOffset.x : pupilOffset.x)} 
                       cy={40 + pupilOffset.y} 
                       rx="3" ry="4" fill="#1f2937" 
                     />
                     <circle cx={14 + (isFacingRight ? -pupilOffset.x * 0.5 : pupilOffset.x * 0.5)} cy={36 + pupilOffset.y * 0.5} r="1.2" fill="white" />
                     {/* Right eye */}
                     <ellipse cx="32" cy="38" rx="5" ry="6" fill="#4b5563" />
                     <ellipse cx="32" cy="38" rx="4" ry="5" fill="white" />
                     <ellipse 
                       cx={33 + (isFacingRight ? -pupilOffset.x : pupilOffset.x)} 
                       cy={40 + pupilOffset.y} 
                       rx="3" ry="4" fill="#1f2937" 
                     />
                     <circle cx={30 + (isFacingRight ? -pupilOffset.x * 0.5 : pupilOffset.x * 0.5)} cy={36 + pupilOffset.y * 0.5} r="1.2" fill="white" />
                   </>
                 )}
                 
                 {/* Nose (pink, cute) */}
                 <ellipse cx="24" cy="46" rx="3" ry="2" fill="#f472b6" />
                 
                 {/* Mouth - small w shape */}
                 <path d="M24 48 L24 50" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
                 <path d="M20 52 Q24 55 28 52" stroke="#6b7280" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                 
                 {/* Whiskers - left */}
                 <line x1="-6" y1="42" x2="6" y2="44" stroke={colors.whiskers} strokeWidth="1" strokeLinecap="round" />
                 <line x1="-6" y1="48" x2="6" y2="48" stroke={colors.whiskers} strokeWidth="1" strokeLinecap="round" />
                 <line x1="-6" y1="54" x2="6" y2="52" stroke={colors.whiskers} strokeWidth="1" strokeLinecap="round" />
                 
                 {/* Whiskers - right */}
                 <line x1="54" y1="42" x2="42" y2="44" stroke={colors.whiskers} strokeWidth="1" strokeLinecap="round" />
                 <line x1="54" y1="48" x2="42" y2="48" stroke={colors.whiskers} strokeWidth="1" strokeLinecap="round" />
                 <line x1="54" y1="54" x2="42" y2="52" stroke={colors.whiskers} strokeWidth="1" strokeLinecap="round" />
                </g>
            </svg>
        </motion.div>
    </motion.div>
  );
}
