"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { useEffect } from "react";
import { Project } from "@/lib/data";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm"
          />
          
          <motion.div
            layoutId={`project-${project.id}`}
            className="relative w-full max-w-4xl bg-card text-card-foreground rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* Content Container */}
             <div className="flex-1 overflow-y-auto">
               <div className="h-64 md:h-96 relative bg-muted">
                  {/* Image Placeholder */}
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      [Project Images Carousel Placeholder]
                      <br/>
                      {`/projects/${project.slug}/${project.thumbnailImage}.webp`}
                   </div>
               </div>
               
               <div className="p-8 bg-card text-foreground">
                  <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium border border-border">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" /> View Project
                    </a>
                  )}
               </div>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
