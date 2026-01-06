"use client";

import Section from "@/components/ui/section";
import { profile, skills } from "@/lib/data";
import { motion } from "framer-motion";

export default function About() {
  return (
    <Section id="about" className="min-h-screen justify-center">
      <div className="max-w-3xl w-full text-center space-y-24">
        
        {/* Bio Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase mb-6 block">Profile</span>
          <p className="text-2xl md:text-3xl text-foreground font-serif leading-relaxed">
            {profile.about}
          </p>
        </motion.div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/80 mb-6 text-center md:text-left">Education</h3>
              {profile.education?.map((edu, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <p className="font-bold text-lg text-foreground leading-tight">{edu.institution}</p>
                  <p className="text-muted-foreground italic text-sm mb-1">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-2">{edu.year}</p>
                  {edu.description && <p className="text-xs text-muted-foreground/80 leading-relaxed max-w-sm">{edu.description}</p>}
                </div>
              ))}
            </div>
             <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/80 mb-6 text-center md:text-left">Licenses & Certifications</h3>
              <ul className="space-y-4">
                {profile.licenses?.slice(0, 3).map((lic, i) => (
                  <li key={i} className="group">
                     <p className="text-sm font-medium text-foreground group-hover:text-neutral-600 transition-colors">{lic.name}</p>
                     <p className="text-xs text-muted-foreground">{lic.issuer} • {lic.date}</p>
                  </li>
                ))}
                {(profile.licenses?.length || 0) > 3 && (
                   <li>
                      <button className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-foreground transition-colors">
                        + {(profile.licenses?.length || 0) - 3} More Credentials
                      </button>
                   </li>
                )}
              </ul>
            </div>
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-10">Technical Arsenal</h3>
          <div className="space-y-12">
            {skills.map((skillGroup, index) => (
              <motion.div 
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <h4 className="text-xs text-neutral-400 uppercase mb-4 tracking-widest hover:text-black transition-colors">{skillGroup.category}</h4>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-xl">
                  {skillGroup.items.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-5 py-2 bg-white text-neutral-600 rounded-full text-sm border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}
