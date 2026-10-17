import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Terminal, Radio } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(soundFx.getIsAudioEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scrollspy calculation
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAudio = () => {
    const newState = soundFx.toggleMute();
    setIsAudioActive(newState);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#05070A]/85 backdrop-blur-md border-b border-cyan-500/15 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Animated Monogram / Custom Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          onMouseEnter={() => soundFx.playHover()}
          className="group flex items-center space-x-3 text-white cursor-pointer select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded border border-neon-cyan/40 bg-slate-900/80 group-hover:border-neon-cyan transition-colors">
            <span className="font-mono font-bold text-xs text-neon-cyan group-hover:text-neon-green transition-colors">
              [{personalInfo.initials}]
            </span>
            {/* Glowing corner notches */}
            <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t-2 border-l-2 border-neon-cyan" />
            <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b-2 border-r-2 border-neon-green" />
          </div>

          <div className="hidden sm:block text-left">
            <div className="text-xs font-mono font-semibold tracking-wider text-slate-300 group-hover:text-neon-cyan transition-colors">
              {personalInfo.name}
            </div>
            <div className="text-[10px] font-mono text-slate-500 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              <span>DEFCON {personalInfo.defconLevel} // SEC-OPS</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-950/70 p-1.5 rounded-full border border-cyan-500/15 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wide rounded-full transition-colors cursor-pointer select-none ${
                  isActive ? 'text-black font-semibold' : 'text-slate-300 hover:text-neon-cyan'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-neon-cyan rounded-full shadow-neon-cyan z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls & Sound Toggle */}
        <div className="flex items-center space-x-3">
          {/* Audio FX Toggle Button */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => soundFx.playHover()}
            title={isAudioActive ? 'Sound FX On (Click to Mute)' : 'Sound FX Off (Click to Enable)'}
            aria-label="Toggle Sound Effects"
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-mono border transition-all ${
              isAudioActive
                ? 'border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10 shadow-neon-cyan'
                : 'border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700 bg-slate-900/50'
            }`}
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline text-[11px]">SFX: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">SFX: OFF</span>
              </>
            )}
          </button>

          {/* Quick Terminal Button */}
          <button
            onClick={() => handleNavClick('#terminal')}
            onMouseEnter={() => soundFx.playHover()}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono text-neon-green border border-neon-green/30 bg-neon-green/5 hover:bg-neon-green/15 transition-all shadow-neon-green"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>SHELL</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            onMouseEnter={() => soundFx.playHover()}
            className="lg:hidden p-2 rounded-md border border-slate-800 text-slate-300 hover:text-neon-cyan hover:border-neon-cyan/40 bg-slate-900/60"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-cyan-500/20 bg-[#05070A]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2"
          >
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center px-4 py-2.5 rounded text-xs font-mono border text-left transition-all ${
                      isActive
                        ? 'border-neon-cyan bg-neon-cyan/15 text-neon-cyan font-bold'
                        : 'border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white bg-slate-900/40'
                    }`}
                  >
                    <span className="mr-2 text-neon-cyan/60">&gt;</span>
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Radio className="w-3.5 h-3.5 text-neon-green animate-pulse" />
                <span>STATUS: SECURE</span>
              </span>
              <button
                onClick={toggleAudio}
                className="text-neon-cyan underline text-[11px]"
              >
                {isAudioActive ? 'Mute Sounds' : 'Unmute Sounds'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
