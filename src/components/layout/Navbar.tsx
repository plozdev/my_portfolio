import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

const NAV_ITEMS = [
  { label: '// home', href: '#home', id: 'home' },
  { label: '// experience', href: '#experience', id: 'experience' },
  { label: '// projects', href: '#projects', id: 'projects' },
  { label: '// contact', href: '#contact', id: 'contact' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d1117]/85 backdrop-blur-md border-b border-[#6DB33F]/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        {/* Logo / Terminal Tag */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          aria-label="Hoang Mai Portfolio Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#6DB33F]/15 border border-[#6DB33F]/40 flex items-center justify-center text-[#6DB33F] group-hover:border-[#6DB33F] group-hover:bg-[#6DB33F]/25 transition-all shadow-[0_0_15px_rgba(109,179,63,0.2)]">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-mono text-sm font-bold text-white tracking-wider group-hover:text-[#6DB33F] transition-colors">
            hoang<span className="text-[#6DB33F]">@dev</span>:~
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-4 py-1.5 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative px-4 py-1.5 font-mono text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-[#6DB33F]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#6DB33F] rounded-full shadow-[0_0_15px_rgba(109,179,63,0.5)] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Contact CTA Button (Desktop) */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="font-mono text-xs font-bold text-[#6DB33F] hover:text-slate-950 px-4 py-2 rounded-lg border border-[#6DB33F]/50 hover:bg-[#6DB33F] transition-all shadow-[0_0_15px_rgba(109,179,63,0.15)] hover:shadow-[0_0_25px_rgba(109,179,63,0.4)]"
          >
            &gt; get_in_touch()
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-slate-200 hover:text-[#6DB33F] hover:border-[#6DB33F]/50 transition-all focus:outline-none"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-[#6DB33F]/20 bg-[#0d1117]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`font-mono text-sm py-2.5 px-4 rounded-xl transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#6DB33F]/20 text-[#6DB33F] border border-[#6DB33F]/40 font-bold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#6DB33F] animate-pulse" />}
                  </a>
                );
              })}
              <div className="pt-2 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="w-full py-3 font-mono text-xs font-bold text-center text-slate-950 bg-[#6DB33F] rounded-xl block shadow-[0_0_20px_rgba(109,179,63,0.4)]"
                >
                  &gt; get_in_touch()
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
