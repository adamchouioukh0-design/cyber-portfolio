import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, ShieldCheck, Terminal, Activity, Wifi } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const HeroSection: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glitchTitle, setGlitchTitle] = useState(personalInfo.title);
  const [ping, setPing] = useState(14);

  // Parallax tilt on mouse movement for holographic portrait
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Subtle simulated ping oscillation
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(12 + Math.random() * 6));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const triggerGlitch = () => {
    soundFx.playHover();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let iterations = 0;
    const original = personalInfo.title;

    const interval = setInterval(() => {
      setGlitchTitle(
        original
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations) return original[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iterations >= original.length) {
        clearInterval(interval);
        setGlitchTitle(original);
      }
      iterations += 2;
    }, 30);
  };

  const handleScrollTo = (id: string) => {
    soundFx.playClick();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headlines & Call to Actions */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* System Status HUD Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center space-x-3 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-mono backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
            </span>
            <span className="text-neon-green font-semibold tracking-wider">SYSTEM ONLINE</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 hidden sm:inline flex items-center">
              <Wifi className="w-3 h-3 inline mr-1 text-neon-cyan" /> {ping}ms LATENCY
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-neon-cyan font-mono">{personalInfo.codename}</span>
          </motion.div>

          {/* Name & Codename */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-1"
          >
            <div className="text-xs uppercase font-mono tracking-widest text-slate-400">
              OPERATOR PROFILE // <span className="text-neon-cyan">{personalInfo.location}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white flex items-center gap-2">
              <span>{personalInfo.name}</span>
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan">
                LEVEL 01
              </span>
            </h2>
          </motion.div>

          {/* Primary Cinematic Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-3"
          >
            <h1
              onMouseEnter={triggerGlitch}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-400 select-none cursor-pointer leading-[1.1]"
              title="Click or hover to trigger security decrypt animation"
            >
              {glitchTitle}
            </h1>
            <p className="text-base sm:text-lg font-mono text-neon-green font-medium tracking-wide">
              {personalInfo.subtitle}
            </p>
          </motion.div>

          {/* Short Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl font-sans"
          >
            {personalInfo.shortIntro}
          </motion.p>

          {/* Interactive Metric Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
          >
            {personalInfo.stats.map((stat) => (
              <div
                key={stat.id}
                onMouseEnter={() => soundFx.playHover()}
                className="p-3 rounded-lg bg-slate-900/60 border border-cyan-500/15 hover:border-cyan-500/40 transition-all hover:bg-slate-900/90"
              >
                <div className="text-lg sm:text-xl font-bold font-mono text-neon-cyan">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono text-slate-400 truncate">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            {/* Primary Explore CTA */}
            <button
              onClick={() => handleScrollTo('#projects')}
              onMouseEnter={() => soundFx.playHover()}
              className="relative group px-6 py-3.5 rounded font-mono text-xs uppercase tracking-wider font-bold text-black bg-neon-cyan hover:bg-neon-green transition-all duration-300 shadow-neon-cyan hover:shadow-neon-green flex items-center space-x-2"
            >
              <span>Explore My Work</span>
              <Terminal className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary Download CV CTA */}
            <a
              href={personalInfo.cvUrl}
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="px-6 py-3.5 rounded font-mono text-xs uppercase tracking-wider font-bold text-slate-200 border border-cyan-500/40 hover:border-neon-cyan bg-slate-900/60 hover:bg-slate-800/80 transition-all flex items-center space-x-2 shadow-sm hover:shadow-neon-cyan"
            >
              <Download className="w-4 h-4 text-neon-cyan" />
              <span>Download CV</span>
            </a>

            {/* Terminal quick-launch indicator */}
            <button
              onClick={() => handleScrollTo('#terminal')}
              onMouseEnter={() => soundFx.playHover()}
              className="px-3.5 py-3.5 rounded font-mono text-xs text-slate-400 hover:text-neon-green transition-colors border border-transparent hover:border-slate-800 flex items-center space-x-1.5"
            >
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Run Terminal</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Holographic Layered Portrait Interface */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 group select-none"
          >
            {/* Outer Animated HUD Rotation Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 animate-[spin_40s_linear_infinite]" />
            <div className="absolute -inset-3 rounded-full border border-dotted border-neon-green/20 animate-[spin_60s_linear_infinite_reverse]" />

            {/* Decorative Corner Brackets */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-neon-cyan" />
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-neon-cyan" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-neon-green" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-neon-green" />

            {/* Central Holographic Frame */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-cyan-500/40 bg-gradient-to-b from-slate-900/90 to-black/90 p-2 shadow-cyber-card">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#070C14]">
                {/* Profile Picture Asset */}
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Fallback to SVG if image fails
                    (e.target as HTMLElement).setAttribute('src', '/images/profile.svg');
                  }}
                />

                {/* Subtle Scanlines & Holographic Sheen */}
                <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent opacity-80" />

                {/* HUD Telemetry Overlay on Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-cyan-500/20 text-slate-300">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-neon-green" />
                    <span>SEC_ID: 0x9F4</span>
                  </span>
                  <span className="text-neon-cyan">ENCRYPTED</span>
                </div>

                {/* Top Telemetry Chip */}
                <div className="absolute top-3 left-3 text-[9px] font-mono text-neon-cyan bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  PORTRAIT_VIEW // [EDITABLE]
                </div>
              </div>
            </div>

            {/* Floating Cyber Badge 1 */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 px-3 py-1.5 rounded bg-[#0B1528]/95 border border-neon-cyan/40 text-[11px] font-mono text-neon-cyan shadow-neon-cyan backdrop-blur-md"
            >
              ETHICAL HACKER
            </motion.div>

            {/* Floating Cyber Badge 2 */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded bg-[#0B1528]/95 border border-neon-green/40 text-[11px] font-mono text-neon-green shadow-neon-green backdrop-blur-md"
            >
              DEFCON 5 SECURE
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer select-none"
        onClick={() => handleScrollTo('#about')}
        onMouseEnter={() => soundFx.playHover()}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-neon-cyan transition-colors mb-1">
          Scroll to Inspect
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-neon-cyan" />
        </motion.div>
      </motion.div>
    </section>
  );
};
