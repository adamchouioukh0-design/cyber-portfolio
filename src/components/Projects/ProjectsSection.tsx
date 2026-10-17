import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  ExternalLink, 
  AlertTriangle, 
  ShieldCheck, 
  BookOpen, 
  Cpu, 
  ChevronRight
} from 'lucide-react';
import { GithubIcon } from '../UI/Icons';
import { projectsData } from '../../data/portfolioData';
import type { Project } from '../../types/portfolio';
import { Modal } from '../UI/Modal';
import { soundFx } from '../../utils/audio';

type CategoryFilter = 'all' | 'networking' | 'offensive' | 'defensive' | 'development';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === 'all') return true;
    return project.category === activeCategory;
  });

  const categories = [
    { id: 'all', label: 'All Operations' },
    { id: 'offensive', label: 'Offensive Security' },
    { id: 'networking', label: 'Networking & Labs' },
    { id: 'defensive', label: 'Defensive Security' },
    { id: 'development', label: 'Security Tooling' },
  ];

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cyan-500/15 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-neon-cyan uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <span>04 // LAB OPERATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
              Featured Security Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 md:mt-0 max-w-md">
            Architectural implementations, traffic forensics, packet analysis, and custom automated reconnaissance scripts.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/20 max-w-2xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick();
                setActiveCategory(cat.id as CategoryFilter);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all ${
                activeCategory === cat.id
                  ? 'bg-neon-cyan text-black font-bold shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedProject(project);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="cyber-card rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/60 cursor-pointer flex flex-col justify-between group transition-all"
              >
                {/* Project Image Banner */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950 p-2">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg filter brightness-90 group-hover:brightness-100 group-hover:scale-103 transition-transform duration-500"
                  />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold bg-black/80 text-neon-cyan border border-neon-cyan/40 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-green-950/90 text-neon-green border border-neon-green/40 shadow-neon-green">
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Text Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-neon-cyan transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-2 line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-slate-800/80">
                    {/* Technology tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between text-xs font-mono text-neon-cyan">
                      <span className="flex items-center space-x-1 group-hover:underline">
                        <span>Inspect Architecture</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-slate-500 text-[11px]">DETAILS &gt;</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Comprehensive Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
        subtitle={`OPERATION: ${selectedProject?.slug} // CLASSIFICATION: ${selectedProject?.category.toUpperCase()}`}
        badge="PROJECT_DOSSIER"
        maxWidth="max-w-4xl"
      >
        {selectedProject && (
          <div className="space-y-6">
            {/* Visual Schematic Preview */}
            <div className="relative rounded-lg overflow-hidden border border-cyan-500/30 bg-black aspect-video max-h-[380px] w-full">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Problem & Challenge */}
            <div className="cyber-card p-4 rounded-lg space-y-1.5 bg-slate-900/60 border border-red-500/20">
              <div className="flex items-center space-x-2 text-xs font-mono text-rose-400 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>PROBLEM &amp; SECURITY VULNERABILITY ADDRESSED</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {selectedProject.problemAddressed}
              </p>
            </div>

            {/* Technical Implementation */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-neon-cyan font-bold">
                <Cpu className="w-4 h-4" />
                <span>TECHNICAL IMPLEMENTATION &amp; ARCHITECTURE</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {selectedProject.technicalImplementation}
              </p>

              {selectedProject.architectureSummary && (
                <div className="p-3 rounded bg-black/60 border border-cyan-500/20 font-mono text-xs text-neon-green">
                  FLOW: {selectedProject.architectureSummary}
                </div>
              )}
            </div>

            {/* Attack Vectors & Defensive Mitigations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedProject.attackVectors && (
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-amber-400 font-bold flex items-center space-x-1.5">
                    <span>AUDITED ATTACK VECTORS:</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300 font-sans">
                    {selectedProject.attackVectors.map((v, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="text-amber-400 font-mono">-</span>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.mitigations && (
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-neon-green font-bold flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>DEFENSIVE HARDENING &amp; MITIGATION:</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300 font-sans">
                    {selectedProject.mitigations.map((m, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="text-neon-green font-mono">✓</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Key Lessons Learned */}
            {selectedProject.keyLessonsLearned && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 font-bold">
                  <BookOpen className="w-4 h-4 text-neon-cyan" />
                  <span>KEY LESSONS LEARNED &amp; ENGINEERING TAKEAWAYS</span>
                </div>
                <div className="space-y-2">
                  {selectedProject.keyLessonsLearned.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 flex items-start space-x-3 text-xs text-slate-300 font-sans"
                    >
                      <span className="font-mono text-neon-cyan font-bold">{idx + 1}.</span>
                      <span>{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies Stack */}
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2">
                TECHNOLOGY STACK:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-cyan-950/40 text-neon-cyan border border-cyan-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links and Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-5 py-2.5 rounded font-mono text-xs font-bold text-black bg-neon-cyan hover:bg-neon-green transition-all shadow-neon-cyan flex items-center space-x-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Inspect Repository (GitHub)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {selectedProject.liveDemoUrl && (
                <a
                  href={selectedProject.liveDemoUrl}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedProject(null);
                  }}
                  className="px-4 py-2.5 rounded font-mono text-xs text-neon-green border border-neon-green/40 hover:bg-neon-green/10 transition-colors flex items-center space-x-2"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Simulate in Cyber Terminal</span>
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
