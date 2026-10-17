import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Search, 
  Copy, 
  Check, 
  ChevronRight, 
  Info 
} from 'lucide-react';
import { skillsData, skillCategories } from '../../data/portfolioData';
import type { Skill, SkillCategoryType } from '../../types/portfolio';
import { soundFx } from '../../utils/audio';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skillsData[0]);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.tags && skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const handleCopyCommand = (command: string) => {
    soundFx.playClick();
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cyan-500/15 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-neon-green uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span>02 // TECHNICAL MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
              Cybersecurity Skills &amp; Capabilities
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 md:mt-0 max-w-md">
            Methodologies, protocol analysis, scripting, and security tooling applied to modern offensive and defensive domains.
          </p>
        </div>

        {/* Disclaimer / Transparency Note */}
        <div className="mb-8 p-3 rounded-lg bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-neon-cyan flex-shrink-0" />
            <span>Configured as editable technical capabilities without arbitrary percentages or unverified claims.</span>
          </div>
          <span className="hidden sm:inline text-slate-500">{skillsData.length} Documented Skills</span>
        </div>

        {/* Category Selector Tabs & Search Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-slate-900/80 border border-cyan-500/20">
            <button
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory('all');
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                selectedCategory === 'all'
                  ? 'bg-neon-cyan text-black font-bold shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Matrix ({skillsData.length})
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory(cat.id);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-neon-cyan text-black font-bold shadow-neon-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by skill, tool, protocol..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 focus:border-neon-cyan focus:outline-none rounded-lg text-xs font-mono text-slate-200 placeholder:text-slate-600 transition-colors"
            />
          </div>
        </div>

        {/* Main Content Layout: Skills Grid + Interactive Skill Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Skills Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => {
                const isSelected = selectedSkill?.name === skill.name;
                return (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedSkill(skill);
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`cyber-card p-4 rounded-lg cursor-pointer transition-all border ${
                      isSelected
                        ? 'border-neon-cyan bg-cyan-950/20 shadow-neon-cyan'
                        : 'border-slate-800 hover:border-cyan-500/40 bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
                          {skill.category}
                        </div>
                        <h4 className="text-sm font-display font-bold text-white group-hover:text-neon-cyan transition-colors">
                          {skill.name}
                        </h4>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? 'text-neon-cyan translate-x-1' : 'text-slate-600'
                        }`}
                      />
                    </div>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 font-sans">
                      {skill.description}
                    </p>

                    {skill.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredSkills.length === 0 && (
              <div className="col-span-2 py-12 text-center cyber-card rounded-lg border-dashed border-slate-800">
                <p className="text-sm font-mono text-slate-500">
                  No matching capabilities found for "{searchQuery}".
                </p>
              </div>
            )}
          </div>

          {/* Right: Interactive Skill Inspector Panel */}
          <div className="lg:col-span-5 sticky top-24">
            {selectedSkill ? (
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="cyber-card p-6 sm:p-7 rounded-xl border-cyan-500/30 space-y-6"
              >
                {/* Inspector Header */}
                <div className="flex items-center justify-between border-b border-cyan-500/15 pb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-neon-cyan animate-pulse" />
                    <span className="text-xs font-mono text-neon-cyan uppercase tracking-wider">
                      CAPABILITY INSPECTOR
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase">
                    SYS_CAT: {selectedSkill.category}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    {selectedSkill.name}
                  </h3>
                  <p className="text-sm font-sans text-slate-300 leading-relaxed">
                    {selectedSkill.description}
                  </p>
                </div>

                {/* Terminal Command Example Snippet */}
                {selectedSkill.commandExample && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="flex items-center space-x-1.5">
                        <Terminal className="w-3.5 h-3.5 text-neon-green" />
                        <span>REPRESENTATIVE COMMAND / SYNTAX:</span>
                      </span>
                      <button
                        onClick={() => handleCopyCommand(selectedSkill.commandExample!)}
                        className="flex items-center space-x-1 text-[11px] text-neon-cyan hover:underline"
                      >
                        {copiedCommand === selectedSkill.commandExample ? (
                          <>
                            <Check className="w-3 h-3 text-neon-green" />
                            <span className="text-neon-green">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3.5 rounded-lg bg-black/80 border border-cyan-500/25 font-mono text-xs text-neon-green overflow-x-auto select-all">
                      <code>{selectedSkill.commandExample}</code>
                    </div>
                  </div>
                )}

                {/* Capability Focus Tags */}
                {selectedSkill.tags && (
                  <div>
                    <div className="text-xs font-mono text-slate-400 mb-2">
                      ASSOCIATED DOMAINS &amp; CONCEPTS:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded text-xs font-mono bg-cyan-950/30 text-neon-cyan border border-cyan-500/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Practical Security Application */}
                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <div className="font-mono text-slate-300 font-semibold">
                    SECURITY USE-CASE:
                  </div>
                  <p className="font-sans leading-relaxed">
                    Employed during routine auditing, penetration testing labs, and security assessments to identify deviations from secure baselines and harden exposed endpoints.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="cyber-card p-8 rounded-xl text-center font-mono text-xs text-slate-500">
                Select a capability to inspect technical command syntax and details.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
