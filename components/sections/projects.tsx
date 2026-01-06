"use client";

import { projects } from "@/lib/data";
import Section from "@/components/ui/section";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronDown, ArrowRight } from "lucide-react";

export default function Projects() {
  const [visibleCount, setVisibleCount] = useState(2); // Start with 2
  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  const handleShowMore = () => {
    if (hasMore) {
      setVisibleCount(prev => prev + 2);
    }
  };

  return (
    <section id="projects" className="w-full bg-neutral-50 dark:!bg-black transition-colors duration-500">
       <Section className="!max-w-6xl !px-6 md:!px-12 w-full mx-auto md:py-32"> 
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase mb-4 block">Showcase</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Selected Works</h2>
        </motion.div>

        <div className="space-y-32">
          {visibleProjects.map((project, index) => (
             <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <div className="mt-32 text-center">
            {hasMore ? (
                <button 
                  onClick={handleShowMore}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all shadow-sm hover:shadow-md"
                >
                   See More Projects <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
            ) : (
                <a 
                  href="https://github.com/andi-frame" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                   View All on GitHub <Github className="w-4 h-4" /> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
            )}
        </div>
       </Section>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Kinetic Animations
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -2 : 2, index % 2 === 0 ? 2 : -2]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ scale, rotateX: 0 }}
      className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
    >
       <div className="w-full md:w-3/5">
          <motion.div 
            style={{ rotate }}
            className="aspect-[16/9] relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 group"
          >
             {/* Use Placeholders if images blank */}
             <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 font-mono text-sm uppercase tracking-widest group-hover:scale-105 transition-transform duration-700">
                {project.images?.[0] || "Project Preview"}
             </div>
             
             {/* Overlay */}
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </motion.div>
       </div>

       {/* Content Side */}
       <div className="w-full md:w-2/5 md:py-12">
          <motion.div style={{ y }}>
             <h3 className="text-3xl font-bold mb-4 text-foreground leading-tight">{project.title}</h3>
             <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
               {project.description}
             </p>
             
             <div className="flex flex-wrap gap-2 mb-8">
               {project.techStack.map((tech: string) => (
                 <span key={tech} className="px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-xs font-medium text-neutral-500">
                   {tech}
                 </span>
               ))}
             </div>

             <div className="flex gap-4">
               {project.link && (
                 <a 
                   href={project.link}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground hover:text-neutral-500 transition-colors"
                 >
                   View Project <ExternalLink className="w-4 h-4" />
                 </a>
               )}
             </div>
          </motion.div>
       </div>
    </motion.div>
  );
}
