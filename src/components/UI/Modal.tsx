import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  badge?: string;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  badge = 'VAULT_RECORD',
  maxWidth = 'max-w-3xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        soundFx.playClick();
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${maxWidth} cyber-card rounded-lg border border-cyan-500/30 bg-[#070D18]/95 shadow-2xl z-10 overflow-hidden my-8`}
          >
            {/* Top Tactical HUD Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 px-6 py-4 bg-slate-900/60">
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
                  {badge}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-wide">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-xs font-mono text-slate-400">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-slate-700"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with subtle custom scrollbar */}
            <div className="p-6 max-h-[80vh] overflow-y-auto text-slate-300 space-y-4">
              {children}
            </div>

            {/* Bottom HUD Telemetry Strip */}
            <div className="flex items-center justify-between px-6 py-2.5 bg-black/40 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
              <span>SEC-RECORD // AUTHENTICATED</span>
              <span>ESC TO EXIT</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
