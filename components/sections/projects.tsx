"use client";

import { projects, Project } from "@/lib/data";
import Section from "@/components/ui/section";
import SectionBackground from "@/components/ui/section-background";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { ExternalLink, Github, ChevronDown, ArrowRight, Eye, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Image from "next/image";

// Helper to generate image path for a project
function getImagePath(project: Project, imageNumber: number): string {
  return `/projects/${project.slug}/${imageNumber}.webp`;
}

// Helper to generate all image paths for a project
function getAllImages(project: Project): string[] {
  return Array.from({ length: project.imageCount }, (_, i) => 
    getImagePath(project, i + 1)
  );
}

export default function Projects() {
  const [visibleCount, setVisibleCount] = useState(2);
  
  // Sort projects by order field
  const sortedProjects = useMemo(() => 
    [...projects].sort((a, b) => a.order - b.order), 
    []
  );
  
  const visibleProjects = sortedProjects.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProjects.length;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Scroll progress for animated rope
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const handleShowMore = () => {
    if (!hasMore) return;
    setVisibleCount(prev => prev + 2);
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="w-full bg-background transition-colors duration-500 relative overflow-hidden"
    >
      {/* Animated curving rope - behind content */}
      <svg 
        className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-64 pointer-events-none -z-10 opacity-40"
        viewBox="0 0 200 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--accent-secondary)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        <motion.path
          id="ropePath"
          d="M100 0 
             C 30 50, 170 100, 100 150
             C 30 200, 170 250, 100 300
             C 30 350, 170 400, 100 450
             C 30 500, 170 550, 100 600
             C 30 650, 170 700, 100 750
             C 30 800, 170 850, 100 900
             C 50 950, 150 1000, 100 1000"
          fill="none"
          stroke="url(#ropeGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
          initial={{ pathLength: 0 }}
        />
      </svg>
      
      {/* Animated Background */}
      <SectionBackground variant="projects" />
      
      <Section className="!max-w-6xl !px-6 md:!px-12 w-full mx-auto md:py-32 relative z-10"> 
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] md:text-xs font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase mb-3 md:mb-4">
            Showcase
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Selected <span className="text-gradient">Works</span>
          </h2>
        </motion.div>

        <div className="space-y-24">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index >= visibleCount - 2 ? 0.15 * (index - visibleCount + 3) : 0 }}
                layout
              >
                <ProjectCard project={project} index={index} onOpen={() => setSelectedProject(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <motion.div 
          className="mt-24 text-center"
          layout
        >
          <AnimatePresence mode="wait">
            {hasMore ? (
              <motion.button 
                key="more"
                onClick={handleShowMore}
                className="group inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:border-violet-300 dark:hover:border-violet-700 transition-all shadow-sm hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See More Projects <ChevronDown className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-y-1 transition-transform" />
              </motion.button>
            ) : (
              <motion.a 
                key="github"
                href="https://github.com/andi-frame" 
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View All on GitHub 
                <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            )}
          </AnimatePresence>
        </motion.div>
       </Section>

       {/* Project Detail Modal */}
       <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
       </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project, index: number, onOpen: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const images = useMemo(() => getAllImages(project), [project]);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -1 : 1, index % 2 === 0 ? 1 : -1]);

  // Start from configured thumbnail
  const thumbnailIndex = project.thumbnailImage - 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Use thumbnail for initial view, or current carousel position
  const displayIndex = currentImage === 0 ? thumbnailIndex : currentImage;

  return (
    <motion.div 
      ref={cardRef}
      layoutId={`project-${project.id}`}
      onClick={onOpen}
      className={`group/card flex flex-col md:flex-row gap-12 items-center cursor-pointer p-6 md:p-8 rounded-3xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/50 hover:bg-white/80 dark:hover:bg-neutral-800/80 hover:border-violet-300/50 dark:hover:border-violet-700/50 shadow-sm hover:shadow-xl transition-all duration-500 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="w-full md:w-3/5">
        <motion.div 
          style={{ rotate }}
          className="aspect-[16/10] relative rounded-2xl overflow-hidden shadow-xl group-hover/card:shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 transition-all duration-500"
        >
          {/* Image Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={displayIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[displayIndex]}
                alt={`${project.title} screenshot ${displayIndex + 1}`}
                fill
                className="object-cover group-hover/card:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-black/70 z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-black/70 z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              
              {/* Image Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.slice(0, Math.min(5, images.length)).map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      displayIndex === i 
                        ? 'bg-white w-4' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
                {images.length > 5 && (
                  <span className="text-[10px] text-white/70 ml-1">+{images.length - 5}</span>
                )}
              </div>
            </>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
            <div className="flex items-center gap-2 px-6 py-3 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest shadow-xl">
              <Eye className="w-4 h-4" /> View Details
            </div>
          </div>
          
          {/* Gradient border on hover */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover/card:border-violet-500/30 transition-colors duration-500" />
        </motion.div>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-2/5 md:py-8">
        <motion.div style={{ y }}>
          <motion.h3 layoutId={`title-${project.id}`} className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-foreground leading-tight group-hover/card:text-gradient transition-all duration-300">
            {project.title}
          </motion.h3>
          <p className="text-muted-foreground leading-relaxed mb-4 md:mb-6 line-clamp-3 text-sm md:text-base">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.slice(0, 4).map((tech: string) => (
              <span key={tech} className="px-3 py-1.5 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-lg text-xs font-medium">
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-3 py-1.5 text-xs font-medium text-muted-foreground">+{project.techStack.length - 4}</span>
            )}
          </div>

          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover/card:text-violet-500 transition-colors">
            View Details <ArrowRight className="w-3 md:w-4 h-3 md:h-4 group-hover/card:translate-x-1 transition-transform" />
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project, onClose: () => void }) {
  const [currentImage, setCurrentImage] = useState(project.headerImage - 1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);
  const images = useMemo(() => getAllImages(project), [project]);

  const openLightbox = (index: number) => {
    setLightboxImage(index);
    setLightboxOpen(true);
  };

  // Get header Y position
  const headerY = project.headerImageY || "center";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />
      <motion.div 
        layoutId={`project-${project.id}`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-background w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col"
      >
        {/* Header Image Area */}
        <div className="relative h-48 md:h-80 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={images[project.headerImage - 1]}
            alt={`${project.title} header`}
            fill
            className="object-cover"
            style={{ objectPosition: `center ${headerY}` }}
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
          
          <motion.button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <motion.h3 layoutId={`title-${project.id}`} className="text-2xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
              {project.title}
            </motion.h3>
            
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6 md:mb-8">
              {project.techStack.map(tech => (
                <span key={tech} className="px-2 md:px-3 py-1 md:py-1.5 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-lg text-[10px] md:text-xs font-medium uppercase tracking-wider">
                  {tech}
                </span>
              ))}
            </div>

            <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-base md:text-lg mb-8 md:mb-10">
              <p>{project.description}</p>
              <p className="mt-4">
                This project demonstrates advanced capabilities in {project.techStack.slice(0,3).join(", ")}. 
                It was built to solve specific problems and deliver a high-quality user experience.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {project.link && (
                <motion.a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Visit Project <ExternalLink className="w-3 md:w-4 h-3 md:h-4" />
                </motion.a>
              )}
              <motion.a 
                href="https://github.com/andi-frame"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:border-violet-300 dark:hover:border-violet-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-3 md:w-4 h-3 md:h-4" /> View Source
              </motion.a>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gradient mb-8 text-center">Project Gallery</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <motion.button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="relative aspect-video rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Lightbox for full image view */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxImage((prev) => (prev - 1 + images.length) % images.length); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxImage((prev) => (prev + 1) % images.length); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
            {/* Full Image - uses object-contain to show complete image */}
            <motion.div
              key={lightboxImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-[90vw] h-[85vh] md:w-[85vw] md:h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxImage]}
                alt={`${project.title} full view ${lightboxImage + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>
            
            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              {lightboxImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
