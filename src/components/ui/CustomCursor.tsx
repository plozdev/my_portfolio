import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for trailing follower delay physics
  const cursorX = useSpring(0, { stiffness: 450, damping: 35 });
  const cursorY = useSpring(0, { stiffness: 450, damping: 35 });

  const followerX = useSpring(0, { stiffness: 150, damping: 25 });
  const followerY = useSpring(0, { stiffness: 150, damping: 25 });

  useEffect(() => {
    // Only enable custom interactive cursor on non-touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.closest('a, button, input, textarea, select, [role="button"], .group, .cursor-pointer') !== null;

      setIsHovered((prev) => (prev !== isInteractive ? isInteractive : prev));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, followerX, followerY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glowing Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[#6DB33F]/60 bg-[#6DB33F]/10 shadow-[0_0_20px_rgba(109,179,63,0.3)] hidden md:block"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 56 : 36,
          height: isHovered ? 56 : 36,
          borderColor: isHovered ? '#85E042' : 'rgba(109, 179, 63, 0.6)',
          backgroundColor: isHovered ? 'rgba(109, 179, 63, 0.25)' : 'rgba(109, 179, 63, 0.08)',
          boxShadow: isHovered
            ? '0 0 35px rgba(109, 179, 63, 0.5), inset 0 0 15px rgba(109, 179, 63, 0.2)'
            : '0 0 20px rgba(109, 179, 63, 0.25)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      />

      {/* Inner Precision Neon Green Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] w-2.5 h-2.5 rounded-full bg-[#6DB33F] shadow-[0_0_12px_#6DB33F] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? '#85E042' : '#6DB33F',
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      />
    </>
  );
}
