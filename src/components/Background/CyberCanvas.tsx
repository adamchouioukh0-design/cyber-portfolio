import React, { useEffect, useRef } from 'react';
import { soundFx } from '../../utils/audio';

interface CyberTheme {
  name: string;
  code: string;
  primary: string;
  secondary: string;
  palette: string[];
  bg: string;
  lineRgba: string;
  gridRgba: string;
}

const CYBER_THEMES: CyberTheme[] = [
  {
    name: 'EXPLOIT MATRIX (KALI LINUX)',
    code: 'SEC-01-GREEN',
    primary: '#00FF9C',
    secondary: '#00D9FF',
    palette: ['#00FF9C', '#00E68A', '#38BDF8', '#10B981', '#6EE7B7'],
    bg: '#030806',
    lineRgba: 'rgba(0, 255, 156, ',
    gridRgba: 'rgba(0, 255, 156, 0.05)',
  },
  {
    name: 'RED TEAM // ADVERSARY BREACH',
    code: 'SEC-02-RED',
    primary: '#FF0055',
    secondary: '#FF5500',
    palette: ['#FF0055', '#F43F5E', '#FB7185', '#FF5500', '#FDA4AF'],
    bg: '#0A0205',
    lineRgba: 'rgba(255, 0, 85, ',
    gridRgba: 'rgba(255, 0, 85, 0.06)',
  },
  {
    name: 'ZERO-DAY // CIPHER ELECTRIC CYAN',
    code: 'SEC-03-CYAN',
    primary: '#00D9FF',
    secondary: '#38BDF8',
    palette: ['#00D9FF', '#38BDF8', '#818CF8', '#00FF9C', '#7DD3FC'],
    bg: '#030710',
    lineRgba: 'rgba(0, 217, 255, ',
    gridRgba: 'rgba(0, 217, 255, 0.05)',
  },
  {
    name: 'SHADOW OPERATOR // PURPLE TEAM',
    code: 'SEC-04-PURPLE',
    primary: '#C084FC',
    secondary: '#A855F7',
    palette: ['#C084FC', '#A855F7', '#E879F9', '#38BDF8', '#DDD6FE'],
    bg: '#08020E',
    lineRgba: 'rgba(168, 85, 247, ',
    gridRgba: 'rgba(168, 85, 247, 0.06)',
  },
  {
    name: 'DEFCON 1 // THREAT AMBER RECON',
    code: 'SEC-05-AMBER',
    primary: '#F59E0B',
    secondary: '#EF4444',
    palette: ['#F59E0B', '#FBBF24', '#FB923C', '#F43F5E', '#FDE68A'],
    bg: '#0A0501',
    lineRgba: 'rgba(245, 158, 11, ',
    gridRgba: 'rgba(245, 158, 11, 0.06)',
  },
];

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  baseRadius: number;
  colorIndex: number;
  pulsePhase: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const CyberCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef<CyberTheme>(CYBER_THEMES[0]);
  const themeIndexRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // More linked circles: increased particle count and linkage distance
    const particleCount = prefersReducedMotion ? 0 : isMobile ? 55 : 120;
    const maxLinkDistance = isMobile ? 120 : 175;
    const repulsionRadius = isMobile ? 150 : 230;

    const particles: Particle[] = [];
    const shockwaves: Shockwave[] = [];

    // Initialize particles with home coordinates
    for (let i = 0; i < particleCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      particles.push({
        x: rx,
        y: ry,
        originX: rx,
        originY: ry,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        baseRadius: Math.random() * 2.2 + 1.8,
        colorIndex: Math.floor(Math.random() * 5),
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // Cycle theme on click anywhere
    const handleClick = (e: MouseEvent) => {
      // Don't trigger if clicked on an interactive button or input
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea'))
      ) {
        return;
      }

      soundFx.playActivate();

      // Cycle to next penetration testing color palette
      themeIndexRef.current = (themeIndexRef.current + 1) % CYBER_THEMES.length;
      const newTheme = CYBER_THEMES[themeIndexRef.current];
      themeRef.current = newTheme;

      // Create expanding shockwave ripple
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: Math.max(width, height) * 1.2,
        alpha: 0.85,
        color: newTheme.primary,
      });

      // Scatter nearby particles outward explosively on click
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          const force = (400 - dist) / 400;
          p.vx += (dx / (dist || 1)) * force * 15;
          p.vy += (dy / (dist || 1)) * force * 15;
        }
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    let gridOffset = 0;

    const render = () => {
      const currentTheme = themeRef.current;

      // Background clear with dynamic penetration tester theme hue
      ctx.fillStyle = currentTheme.bg;
      ctx.fillRect(0, 0, width, height);

      // 1. Perspective Wireframe Cyber Grid
      if (!isMobile) {
        ctx.save();
        const horizon = height * 0.62;
        gridOffset = (gridOffset + 0.35) % 40;

        ctx.strokeStyle = currentTheme.gridRgba;
        ctx.lineWidth = 1;

        const fovLines = 18;
        const centerX = width / 2;
        for (let i = -fovLines; i <= fovLines; i++) {
          const xStart = centerX + i * (width / fovLines);
          ctx.beginPath();
          ctx.moveTo(centerX, horizon);
          ctx.lineTo(xStart, height);
          ctx.stroke();
        }

        for (let y = horizon; y < height; y += (height - horizon) / 9) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. Render shockwave ripples on theme click
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 24;
        sw.alpha *= 0.94;

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = 3;
        ctx.globalAlpha = sw.alpha;
        ctx.stroke();
        ctx.restore();

        if (sw.alpha < 0.01 || sw.radius > sw.maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      // 3. Update & Repel Particles Away from Cursor
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Strong Cursor Repulsion Physics: If cursor approaches, particles separate away!
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repulsionRadius) {
            // Forceful exponential separation
            const force = Math.pow((repulsionRadius - dist) / repulsionRadius, 1.4) * 8.5;
            p.vx += (dx / (dist || 1)) * force;
            p.vy += (dy / (dist || 1)) * force;
          }
        }

        // Return-to-home spring tension
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * 0.003;
        p.vy += homeDy * 0.003;

        // Apply velocity with air resistance / friction
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.92;
        p.vy *= 0.92;

        // Gentle drift of origin
        p.originX += (Math.random() - 0.5) * 0.3;
        p.originY += (Math.random() - 0.5) * 0.3;

        // Wrap around boundaries
        if (p.x < 0) { p.x = width; p.originX = width; }
        if (p.x > width) { p.x = 0; p.originX = 0; }
        if (p.y < 0) { p.y = height; p.originY = height; }
        if (p.y > height) { p.y = 0; p.originY = 0; }

        p.pulsePhase += 0.03;
      }

      // 4. Draw Interconnected Neural Links (More Linked Mesh)
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLinkDistance) {
            const alpha = (1 - dist / maxLinkDistance) * 0.42;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${currentTheme.lineRgba}${alpha})`;
            ctx.stroke();
          }
        }
      }

      // 5. Draw Glowing Cybernetic Circles/Nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = 1 + Math.sin(p.pulsePhase) * 0.2;
        const radius = p.baseRadius * pulse;
        const nodeColor = currentTheme.palette[p.colorIndex % currentTheme.palette.length];

        // Outer Halo Ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 2.4, 0, Math.PI * 2);
        ctx.strokeStyle = nodeColor;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner Solid Circle Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.globalAlpha = 0.85;
        ctx.fill();

        ctx.globalAlpha = 1.0;
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-auto z-0 overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Cyber Scanline overlay */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80 pointer-events-none" />
    </div>
  );
};
