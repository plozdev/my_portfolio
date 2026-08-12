import React, { useState, useRef } from 'react';
import { IDEPlayground } from '@/components/ui/IDEPlayground';

export function InteractiveTerminal3D() {
  const [rotateX, setRotateX] = useState(4);
  const [rotateY, setRotateY] = useState(-7);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateXVal = ((y - centerY) / centerY) * -12;
      const rotateYVal = ((x - centerX) / centerX) * 12;

      setRotateX(rotateXVal);
      setRotateY(rotateYVal);
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(4);
    setRotateY(-7);
  };

  return (
    <div className="w-full flex justify-center lg:justify-end" style={{ perspective: 1200 }}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`,
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="group relative w-full rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(109,179,63,0.25)] border border-white/15 hover:border-[#6DB33F]/80 transition-colors duration-300"
      >
        {/* ── 3D Sci-Fi HUD Corner Brackets ── */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#6DB33F]/0 group-hover:border-[#6DB33F] transition-all duration-300 z-30 pointer-events-none" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#6DB33F]/0 group-hover:border-[#6DB33F] transition-all duration-300 z-30 pointer-events-none" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#6DB33F]/0 group-hover:border-[#6DB33F] transition-all duration-300 z-30 pointer-events-none" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#6DB33F]/0 group-hover:border-[#6DB33F] transition-all duration-300 z-30 pointer-events-none" />

        {/* ── Holographic Glare Spotlight ── */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-20 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(109, 179, 63, 0.22) 0%, rgba(109, 179, 63, 0.05) 50%, transparent 80%)`,
          }}
        />

        {/* ── Outer Volumetric Glow Spotlight ── */}
        <div
          className="absolute inset-0 rounded-2xl bg-[#6DB33F]/15 blur-xl pointer-events-none transition-opacity duration-300 -z-10"
          style={{ opacity: isHovered ? 0.8 : 0.4 }}
        />

        {/* Terminal Window Content */}
        <div style={{ transform: 'translateZ(10px)' }}>
          <IDEPlayground />
        </div>
      </div>
    </div>
  );
}
