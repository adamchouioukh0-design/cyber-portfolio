import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-cyan-500/15 bg-[#03060A] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 z-10 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand / Monogram */}
        <div className="flex items-center space-x-3 text-left">
          <div className="w-8 h-8 rounded border border-neon-cyan/40 bg-slate-900 flex items-center justify-center text-neon-cyan font-bold text-xs">
            [{personalInfo.initials}]
          </div>
          <div>
            <div className="text-white font-bold tracking-wider font-display">
              {personalInfo.name}
            </div>
            <div className="text-[10px] text-slate-500">
              CYBERSECURITY PORTFOLIO // DEFCON {personalInfo.defconLevel}
            </div>
          </div>
        </div>

        {/* Center: System Status & Security Protocol */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span>STATUS: {personalInfo.status}</span>
          </span>
          <span className="text-slate-700">|</span>
          <span>PROTOCOL: ZERO TRUST ARCHITECTURE</span>
          <span className="text-slate-700">|</span>
          <span>SECURITY ENCRYPTED // TLS 1.3</span>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center space-x-4">
          <div className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundFx.playHover()}
            title="Return to top"
            className="p-2 rounded-md bg-slate-900 border border-slate-800 hover:border-neon-cyan text-slate-400 hover:text-neon-cyan transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
