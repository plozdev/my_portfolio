import { useState, useEffect } from 'react';


const NAV_LINKS = [
  { href: '#home',        label: 'Home' },
  { href: '#about',       label: 'About' },
  { href: '#experience',  label: 'Experience' },
  { href: '#projects',    label: 'Projects' },
  // { href: '#community',   label: 'Community' },
  { href: '#contact',     label: 'Contact' },
];

const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  // Scroll-shadow on navbar + bottom-of-page contact activation
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // Activate 'contact' when within 80px of the bottom of the page
      // (last section can't always enter the IntersectionObserver's narrow band)
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (nearBottom) setActive('contact');
    };
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


  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-surface/95 border-b border-glass-border shadow-[0_1px_20px_rgba(0,0,0,0.4)]'
          : 'bg-surface/80'
        } backdrop-blur-xl`}
    >
      <div className="flex items-center h-13 px-5 md:px-8 max-w-6xl mx-auto gap-6">

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
                  onClick={(e) => handleNavClick(e, href)}
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
      </div>
    </nav>
  );
}
