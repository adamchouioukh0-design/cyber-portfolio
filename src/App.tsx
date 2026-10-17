import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BootSequence } from './components/Intro/BootSequence';
import { CyberCanvas } from './components/Background/CyberCanvas';
import { CustomCursor } from './components/Cursor/CustomCursor';
import { Navbar } from './components/Navigation/Navbar';
import { HeroSection } from './components/Hero/HeroSection';
import { AboutSection } from './components/About/AboutSection';
import { SkillsSection } from './components/Skills/SkillsSection';
import { CertificationsSection } from './components/Certifications/CertificationsSection';
import { ProjectsSection } from './components/Projects/ProjectsSection';
import { JourneySection } from './components/Journey/JourneySection';
import { InteractiveTerminal } from './components/Terminal/InteractiveTerminal';
import { ContactSection } from './components/Contact/ContactSection';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#05070A] text-slate-100 font-sans selection:bg-neon-cyan/25 selection:text-neon-cyan overflow-x-hidden">
      {/* Cinematic Boot Intro (Can be skipped with ESC/Click) */}
      <AnimatePresence>
        {!isBooted && <BootSequence onComplete={() => setIsBooted(true)} />}
      </AnimatePresence>

      {/* 3D Interactive Particle Network & Grid Background */}
      <CyberCanvas />

      {/* Custom Precision Cybernetic Cursor (Desktop) */}
      <CustomCursor />

      {/* Floating Glassmorphic Navigation Bar */}
      <Navbar />

      {/* Main Section Content Stream */}
      <main className="relative z-10 space-y-8">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
        <JourneySection />
        <InteractiveTerminal />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
