"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export default function Section({ children, className = "", id, fullWidth = false, noPadding = false }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Subtle parallax and reveal effects
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [30, 0, 0, -15]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity, y }}
      className={`w-full transition-colors duration-300 ${
        noPadding ? '' : 'py-16 md:py-24'
      } ${
        fullWidth 
          ? 'px-0' 
          : 'px-6 md:px-12'
      } ${className}`}
    >
      {!fullWidth && (
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          {children}
        </div>
      )}
      {fullWidth && children}
    </motion.section>
  );
}
