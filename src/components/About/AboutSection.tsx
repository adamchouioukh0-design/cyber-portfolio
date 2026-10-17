import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Compass, Flag, Terminal, Cpu, CheckCircle2, Lock } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dossier' | 'arsenal' | 'mindset'>('dossier');

  const toolsList = [
    { name: 'Kali Linux', type: 'Offensive OS' },
    { name: 'Wireshark', type: 'Packet Inspection' },
    { name: 'Nmap', type: 'Network Mapping' },
    { name: 'Burp Suite', type: 'Web App Proxy' },
    { name: 'Python 3', type: 'Automation' },
    { name: 'Bash', type: 'Shell Scripting' },
    { name: 'Metasploit', type: 'Exploitation POC' },
    { name: 'Git / GitHub', type: 'Version Control' },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-cyan-500/15 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-neon-cyan uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <span>01 // PERSONA &amp; CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
              About the Researcher
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 md:mt-0 max-w-md">
            Continuous reconnaissance, offensive testing, and defensive engineering to protect digital ecosystems.
          </p>
        </div>

        {/* Asymmetrical Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Technical Dossier */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tab Navigation Pill Bar */}
            <div className="flex items-center space-x-2 p-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/20 max-w-md">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('dossier');
                }}
                className={`flex-1 py-2 px-3 rounded text-xs font-mono font-medium transition-all ${
                  activeTab === 'dossier'
                    ? 'bg-neon-cyan text-black font-bold shadow-neon-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Profile Dossier
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('arsenal');
                }}
                className={`flex-1 py-2 px-3 rounded text-xs font-mono font-medium transition-all ${
                  activeTab === 'arsenal'
                    ? 'bg-neon-cyan text-black font-bold shadow-neon-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Core Arsenal
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('mindset');
                }}
                className={`flex-1 py-2 px-3 rounded text-xs font-mono font-medium transition-all ${
                  activeTab === 'mindset'
                    ? 'bg-neon-cyan text-black font-bold shadow-neon-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Security Mindset
              </button>
            </div>

            {/* Tab 1: Profile Dossier */}
            {activeTab === 'dossier' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Biography Card */}
                <div className="cyber-card p-6 sm:p-8 rounded-xl relative overflow-hidden">
                  <div className="flex items-center space-x-2 text-xs font-mono text-neon-green mb-3">
                    <Shield className="w-4 h-4" />
                    <span>WHO I AM</span>
                  </div>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                    {personalInfo.bio.whoIAm}
                  </p>
                </div>

                {/* Cybersecurity Interests */}
                <div className="cyber-card p-6 rounded-xl space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-mono text-neon-cyan">
                    <Target className="w-4 h-4" />
                    <span>SPECIALIZED INTERESTS</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {personalInfo.bio.cyberInterests.map((interest, idx) => (
                      <div
                        key={idx}
                        onMouseEnter={() => soundFx.playHover()}
                        className="flex items-center space-x-2.5 p-3 rounded bg-slate-900/60 border border-slate-800 hover:border-neon-cyan/40 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-sans text-slate-300 font-medium">
                          {interest}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Journey & Future Goals */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="cyber-card p-6 rounded-xl space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-mono text-amber-400">
                      <Compass className="w-4 h-4" />
                      <span>LEARNING JOURNEY</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                      {personalInfo.bio.learningJourney}
                    </p>
                  </div>

                  <div className="cyber-card p-6 rounded-xl space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-mono text-neon-green">
                      <Flag className="w-4 h-4" />
                      <span>PROFESSIONAL GOALS</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                      {personalInfo.bio.professionalGoals}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Core Arsenal */}
            {activeTab === 'arsenal' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="cyber-card p-6 sm:p-8 rounded-xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-2 text-xs font-mono text-neon-cyan">
                    <Cpu className="w-4 h-4" />
                    <span>DAILY SECURITY UTILITIES &amp; ENVIRONMENTS</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">CONFIGURABLE</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {toolsList.map((tool) => (
                    <div
                      key={tool.name}
                      onMouseEnter={() => soundFx.playHover()}
                      className="p-3.5 rounded-lg bg-slate-900/70 border border-cyan-500/20 hover:border-neon-cyan hover:bg-slate-900 transition-all group"
                    >
                      <div className="text-sm font-mono font-bold text-white group-hover:text-neon-cyan transition-colors">
                        {tool.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">
                        {tool.type}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-black/40 border border-slate-800 text-xs font-mono text-slate-400 leading-relaxed flex items-start space-x-3">
                  <Terminal className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>
                    Continuous focus on reproducible environments, lab automation with Docker/VirtualBox, and custom Python tooling for rapid testing workflows.
                  </span>
                </div>
              </motion.div>
            )}

            {/* Tab 3: Security Mindset */}
            {activeTab === 'mindset' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="cyber-card p-6 sm:p-8 rounded-xl space-y-6"
              >
                <div className="flex items-center space-x-2 text-xs font-mono text-neon-green">
                  <Lock className="w-4 h-4" />
                  <span>ETHICAL HACKING PRINCIPLES</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                    <span className="text-neon-cyan font-mono text-xs font-bold">01 // AUTHORIZATION</span>
                    <p className="text-xs text-slate-400">
                      Testing strictly within explicitly defined rules of engagement, authorized lab ranges, and disclosed scope boundaries.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                    <span className="text-neon-green font-mono text-xs font-bold">02 // ROOT CAUSE MITIGATION</span>
                    <p className="text-xs text-slate-400">
                      Uncovering not just superficial bugs, but the architectural blind spots and configurations that enable them.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                    <span className="text-purple-400 font-mono text-xs font-bold">03 // TRANSPARENT REPORTING</span>
                    <p className="text-xs text-slate-400">
                      Communicating technical vulnerabilities clearly to both developers and executive stakeholders with actionable remediation.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Tactical Telemetry & Security Metrics */}
          <div className="lg:col-span-4 space-y-6">
            {/* Identity & Status HUD Card */}
            <div className="cyber-card p-6 rounded-xl border-cyan-500/25 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400">TELEMETRY STATUS</span>
                <span className="text-[10px] font-mono text-neon-green px-2 py-0.5 rounded bg-neon-green/10 border border-neon-green/30">
                  DEFCON {personalInfo.defconLevel}
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-500">OPERATOR:</span>
                  <span className="text-slate-200">{personalInfo.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-500">CALLSIGN:</span>
                  <span className="text-neon-cyan">{personalInfo.codename}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-500">LOCATION:</span>
                  <span className="text-slate-300">{personalInfo.location}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-500">PGP FINGERPRINT:</span>
                  <span className="text-slate-400 font-mono text-[11px]">{personalInfo.pgpKeyId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-500">SECURITY POSTURE:</span>
                  <span className="text-neon-green font-bold">ZERO TRUST</span>
                </div>
              </div>

              {/* Security Lifecycle Loop Graphic */}
              <div className="pt-2">
                <div className="text-[11px] font-mono text-slate-400 mb-2">
                  SECURITY LIFECYCLE PARADIGM:
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded bg-black/40 border border-cyan-500/20 text-center text-neon-cyan">
                    1. RECON &amp; DISCOVER
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-green-500/20 text-center text-neon-green">
                    2. AUDIT &amp; TEST
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-purple-500/20 text-center text-purple-400">
                    3. MITIGATE &amp; PATCH
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-amber-500/20 text-center text-amber-400">
                    4. VERIFY &amp; FORTIFY
                  </div>
                </div>
              </div>
            </div>

            {/* Fast Quick Links Notice */}
            <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-400 space-y-2">
              <div className="text-slate-300 font-bold flex items-center space-x-1.5">
                <span>[CUSTOMIZATION NOTE]</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All biography entries, statistics, and tool lists are dynamically populated from <code className="text-neon-cyan bg-slate-950 px-1 py-0.5 rounded">src/data/portfolioData.ts</code> for effortless updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
