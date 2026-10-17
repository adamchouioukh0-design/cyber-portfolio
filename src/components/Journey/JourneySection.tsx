import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, PlusCircle } from 'lucide-react';
import { timelineData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const JourneySection: React.FC = () => {
  return (
    <section id="journey" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-cyan-500/15 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-neon-cyan uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <span>06 // TRAJECTORY &amp; MILESTONES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
              Learning &amp; Growth Journey
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 md:mt-0 max-w-md">
            Continuous development through structured lab simulations, protocol analysis, and offensive/defensive research.
          </p>
        </div>

        {/* Vertical Animated Circuit Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-cyan-500/20 space-y-12">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={() => soundFx.playHover()}
              className="relative group"
            >
              {/* Glowing Timeline Circuit Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#05070A] border-2 border-neon-cyan group-hover:border-neon-green group-hover:scale-125 transition-all shadow-neon-cyan" />

              {/* Timeline Card */}
              <div className="cyber-card p-6 sm:p-7 rounded-xl border-cyan-500/20 hover:border-cyan-500/50 space-y-4 transition-all">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <span className="text-xs font-mono text-neon-green uppercase tracking-wide">
                      {item.organization}
                    </span>
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-neon-cyan transition-colors mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-neon-cyan border border-cyan-500/30">
                        {item.badge}
                      </span>
                    )}
                    <span className="flex items-center space-x-1 text-xs font-mono text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.period}</span>
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm font-sans text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Extensible Future Node */}
          <div className="relative group pt-4">
            <div className="absolute -left-[29px] sm:-left-[37px] top-7 w-3 h-3 rounded-full bg-slate-800 border border-slate-600" />
            <div className="cyber-card p-4 rounded-xl border border-dashed border-slate-800 text-xs font-mono text-slate-500 flex items-center space-x-3">
              <PlusCircle className="w-4 h-4 text-neon-cyan/60 flex-shrink-0" />
              <span>
                Continuously advancing into advanced red team operations, SOC automation, and cloud security architectures.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
