import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, FastForward } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const logs = [
    'AEGIS SEC-OS 2.4.0 INITIALIZING...',
    'VERIFYING CRYPTOGRAPHIC REGISTERS [OK]',
    'PROBING LOOPBACK INTERFACE (127.0.0.1) [OK]',
    'ENFORCING ZERO-TRUST BOUNDARIES [OK]',
    'PORTFOLIO ASSETS LOADED // OPERATOR AUTHENTICATED',
  ];

  useEffect(() => {
    // If reduced motion preferred or already booted in session, auto skip
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sessionBooted = sessionStorage.getItem('cyber_booted');

    if (prefersReducedMotion || sessionBooted === 'true') {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          sessionStorage.setItem('cyber_booted', 'true');
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 25;
      });

      setStep((prev) => Math.min(prev + 1, logs.length - 1));
    }, 280);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    soundFx.playClick();
    sessionStorage.setItem('cyber_booted', 'true');
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070A] p-4 select-none"
    >
      <div className="w-full max-w-lg cyber-card p-6 sm:p-8 rounded-xl border border-cyan-500/30 space-y-6 bg-black/90 shadow-2xl relative">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <div className="flex items-center space-x-2 text-neon-cyan font-mono text-xs font-bold">
            <Shield className="w-4 h-4 animate-pulse" />
            <span>SEC-OPS BOOT SEQUENCE</span>
          </div>

          <button
            onClick={handleSkip}
            onMouseEnter={() => soundFx.playHover()}
            className="flex items-center space-x-1 text-[11px] font-mono text-slate-400 hover:text-neon-cyan px-2 py-0.5 rounded border border-slate-800 hover:border-neon-cyan/40"
          >
            <FastForward className="w-3 h-3" />
            <span>Skip [ESC]</span>
          </button>
        </div>

        {/* Dynamic Log Console */}
        <div className="space-y-2 font-mono text-xs min-h-[110px]">
          {logs.slice(0, step + 1).map((log, i) => (
            <div key={i} className="flex items-center space-x-2">
              <span className="text-neon-green">&gt;</span>
              <span className={i === step ? 'text-white' : 'text-slate-400'}>{log}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-mono text-[10px] text-slate-500">
            <span>SYNCHRONIZING INTERFACES</span>
            <span className="text-neon-cyan font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-neon-green transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
