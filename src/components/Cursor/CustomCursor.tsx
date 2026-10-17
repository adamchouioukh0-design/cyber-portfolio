import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device has touch primary or prefers reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[data-cursor="pointer"]') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };
    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isHovered ? 1.5 : 1})`,
        }}
      >
        <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-neon-green shadow-neon-green' : 'bg-neon-cyan shadow-neon-cyan'}`} />
      </div>

      {/* Trailing Cyber Crosshair Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x - 18}px, ${trailingPos.y - 18}px, 0) scale(${isHovered ? 1.4 : 1})`,
        }}
      >
        <div
          className={`w-9 h-9 rounded-full border border-dashed transition-colors duration-200 ${
            isHovered ? 'border-neon-green/80 bg-neon-green/5 rotate-45' : 'border-neon-cyan/50 bg-transparent rotate-0'
          }`}
        />
        {/* Subtle crosshair notches */}
        <div className="absolute top-1/2 left-0 w-1.5 h-[1px] bg-neon-cyan/60 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-1.5 h-[1px] bg-neon-cyan/60 -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 w-[1px] h-1.5 bg-neon-cyan/60 -translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-[1px] h-1.5 bg-neon-cyan/60 -translate-x-1/2" />
      </div>
    </>
  );
};
