import { useState, useEffect } from 'react';
import { socials } from '@/data/socials';

const NAV_LINKS = [
  { href: '#home',        label: 'Home' },
  { href: '#about',       label: 'About' },
  { href: '#journey',     label: 'Journey' },
  { href: '#experience',  label: 'Experience' },
  { href: '#projects',    label: 'Projects' },
  { href: '#tech',        label: 'Tech' },
  { href: '#achievements',label: 'Achievements' },
  { href: '#community',   label: 'Community' },
  { href: '#contact',     label: 'Contact' },
];

const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  // Scroll-shadow on navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const githubHref = socials.find(s => s.platform === 'GitHub')?.href ?? '#';
  const linkedinHref = socials.find(s => s.platform === 'LinkedIn')?.href ?? '#';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-surface/95 border-b border-glass-border shadow-[0_1px_20px_rgba(0,0,0,0.4)]'
          : 'bg-surface/80'
        } backdrop-blur-xl`}
    >
      <div className="flex items-center h-14 px-5 md:px-8 max-w-[1400px] mx-auto gap-6">

        {/* Nav links — centered, scrollable on small screens */}
        <div className="flex-1 flex items-center justify-center overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 shrink-0">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={href}
                  href={href}
                  className={`relative px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider rounded transition-colors duration-200 whitespace-nowrap
                    ${isActive
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                    }`}
                >
                  {label}
                  {/* Active underline */}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-px bg-primary transition-all duration-300 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                    style={{ transformOrigin: 'center' }}
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          {githubHref && githubHref !== '#' && (
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              {/* GitHub SVG */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          )}
          {linkedinHref && linkedinHref !== '#' && (
            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          <a
            href="/documents/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-primary text-surface font-mono text-[11px] uppercase tracking-wider font-bold rounded hover:bg-secondary transition-colors"
          >
            Resume
          </a>
        </div>

      </div>
    </nav>
  );
}
