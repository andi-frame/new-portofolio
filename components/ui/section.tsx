"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export default function Section({ children, className = "", id, delay = 0 }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "-10% 0px -10% 0px", once: false }} // Replay animation when scrolling back
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2, delayChildren: delay } }
      }}
      className={`py-20 md:py-32 px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center text-center transition-colors duration-300 ${className}`}
    >
      {children}
    </motion.section>
  );
}
