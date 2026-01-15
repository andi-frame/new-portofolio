"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor } from "lucide-react";

export default function DesktopHint() {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Show hint only on mobile and if not dismissed
      if (mobile && !dismissed) {
        setIsVisible(true);
      }
    };
    
    // Check if user has dismissed before (session storage)
    const wasDismissed = sessionStorage.getItem('desktopHintDismissed');
    if (wasDismissed) {
      setDismissed(true);
    }
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [dismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
    sessionStorage.setItem('desktopHintDismissed', 'true');
  };

  // Only render on mobile
  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[9998] px-4 pt-4"
        >
          <div className="max-w-lg mx-auto bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl p-3 shadow-lg flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Monitor className="w-4 h-4 text-white" />
            </div>
            <p className="flex-1 text-white text-xs font-medium">
              For the best experience, view on desktop!
            </p>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
