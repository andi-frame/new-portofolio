import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const revealText: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } // cubic-bezier
  }
};

export const clapperOpen: Variants = {
  initial: { rotateX: 0 },
  animate: { rotateX: -25, transition: { duration: 0.5 } } // Open state
};

export const clapperClose: Variants = {
  initial: { rotateX: -25 },
  animate: { rotateX: 0, transition: { duration: 0.3, type: "spring", stiffness: 300 } } // Snap close
};
