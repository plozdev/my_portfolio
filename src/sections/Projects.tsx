import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const SkillIcon = ({ src, title }: { src: string; title?: string }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    const shortText = title ? title.split(' ')[0] : 'Skill';
    return <span className="text-[10px] font-mono font-black tracking-tight text-white select-none">{shortText}</span>;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanUrl = src.startsWith('/') ? src.slice(1) : src;
  const resolvedUrl = `${cleanBase}${cleanUrl}`;

  return (
    <img
      src={resolvedUrl}
      alt={title || "Skill"}
      className="w-full h-full object-contain"
      onError={() => setHasError(true)}
    />
  );
};

interface SkillItem {
  title: string;
  icon: React.ReactNode;
  bgClass?: string;
}

const makeBrand = (title: string, file: string, bgClass?: string): SkillItem => ({
  title,
  icon: <SkillIcon src={`/logos/${file}`} title={title} />,
  bgClass,
});

const makeTextBrand = (title: string, text: string): SkillItem => ({
  title,
  icon: <span className="text-[10px] font-mono font-black tracking-tight text-white select-none">{text}</span>,
});

const SKILL_MAP: Record<string, SkillItem> = {
  // Frontend
  'React': makeBrand('React', 'react.svg'),
  'Tailwind CSS': makeBrand('Tailwind CSS', 'tailwind.svg'),
  'TypeScript': makeBrand('TypeScript', 'typescript.svg'),
  'JavaScript': makeBrand('JavaScript', 'javascript.svg'),
  'Next.js': makeBrand('Next.js', 'nextjs.svg', 'bg-white hover:bg-white/90 border border-white/80'),
  'Vue.js': makeBrand('Vue.js', 'vuejs.svg'),
  'Vite': makeBrand('Vite', 'vite.svg'),
  'Framer Motion': makeBrand('Framer Motion', 'framer-motion.svg'),

  // Backend / Database / DevOps
  'Spring Boot': makeBrand('Spring Boot', 'spring.svg'),
  'Java 21': makeBrand('Java 21', 'java.svg'),
  'Kotlin (Android)': makeBrand('Kotlin', 'kotlin.svg'),
  'Redis': makeBrand('Redis', 'redis.svg'),
  'Redisson': makeBrand('Redis', 'redis.svg'),
  'Apache Kafka': makeTextBrand('Apache Kafka', 'Kafka'),
  'PostgreSQL': makeBrand('PostgreSQL', 'postgresql.svg'),
  'Docker': makeBrand('Docker', 'docker.svg'),
  'Node.js': makeBrand('Node.js', 'nodejs.svg'),
  'tRPC': makeBrand('tRPC', 'trpc.svg'),
  'Cloudflare': makeBrand('Cloudflare', 'cloudflare.svg'),
  'Python': makeBrand('Python', 'python.svg'),
  'Git': makeBrand('Git', 'git.svg', 'bg-white hover:bg-white/90 border border-white/80'),
  'GitHub': makeBrand('GitHub', 'git.svg', 'bg-white hover:bg-white/90 border border-white/80'),
};

const getSkillItem = (name: string): SkillItem => {
  if (SKILL_MAP[name]) return SKILL_MAP[name];
  const shortText = name.split(' ')[0];
  return makeTextBrand(name, shortText);
};

interface ProjectData {
  id: string;
  category: string;
  title: string;
  status: string;
  src: string;
  screenshots: { src: string; label: string }[];
  skills: {
    frontend: string[];
    backend: string[];
  };
  content: React.ReactNode;
  github?: string;
  live?: string;
}

// ── ScrollingPreview Component ──
function ScrollingPreview({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollPx, setScrollPx] = useState(0);

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanUrl = src.startsWith('/') ? src.slice(1) : src;
  const resolvedUrl = `${cleanBase}${cleanUrl}`;

  useEffect(() => {
    if (hasError) return;
    const img = new window.Image();
    const compute = () => {
      const vp = viewportRef.current;
      if (!vp || !img.naturalWidth) return;
      const ratio = img.naturalHeight / img.naturalWidth;
      const displayedHeight = vp.clientWidth * ratio;
      const overflow = displayedHeight - vp.clientHeight;
      setScrollPx(overflow > vp.clientHeight * 0.2 ? overflow : 0);
    };
    img.onload = compute;
    img.onerror = () => setHasError(true);
    img.src = resolvedUrl;
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [resolvedUrl, hasError]);

  const scrolls = scrollPx > 0;
  const duration = scrolls ? scrollPx / 60 : 0;


  return (
    <div className="absolute inset-0 bg-[#070b07] flex items-center justify-center overflow-hidden">
      {hasError ? (
        /* ── 3D Floating Terminal Code Preview Mockup (Replacing flat placeholder) ── */
        <div className="w-full h-full p-3 flex flex-col justify-between bg-[#0d1117] border border-[#6DB33F]/30 rounded-xl relative overflow-hidden group-hover:border-[#6DB33F]/80 transition-colors shadow-[inner_0_0_20px_rgba(109,179,63,0.1)]">
          {/* macOS Chrome Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10 select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className="font-mono text-[10px] text-slate-400 font-semibold tracking-wide">
              dev@{alt.toLowerCase().replace(/[^a-z0-9]/g, '')}:~
            </span>
            <div className="w-8" />
          </div>

          {/* Simulated Code Architecture Stream */}
          <div className="font-mono text-[10px] sm:text-[11px] text-slate-300 leading-relaxed space-y-1 py-2 my-auto select-none">
            <div className="text-[#6DB33F] font-bold flex items-center gap-1.5">
              <span>&gt;</span>
              <span>INITIALIZING SYSTEM ARCHITECTURE</span>
            </div>
            <div className="text-white/80 pl-3 border-l border-[#6DB33F]/30 space-y-0.5">
              <p>• Spring Boot 3.2 + Redis + Kafka</p>
              <p>• High-Concurrency Lock Management</p>
              <p className="text-[#6DB33F] font-semibold">• Status: 200 OK [ACTIVE BUILD]</p>
            </div>
          </div>

          {/* Tech Badges */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10 select-none">
            <span className="text-[9px] font-mono font-bold text-[#6DB33F] bg-[#6DB33F]/15 border border-[#6DB33F]/40 rounded px-2 py-0.5 uppercase tracking-wider">
              {alt}
            </span>
            <span className="text-[9px] font-mono font-bold text-white/80 bg-white/5 border border-white/15 rounded px-2 py-0.5 uppercase tracking-wider">
              ACTIVE BUILD
            </span>
          </div>

          {/* Ambient Glow Spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#6DB33F]/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      ) : (
        <div
          ref={viewportRef}
          className="absolute inset-[14px] rounded-lg border border-glass-border overflow-hidden bg-black/40 shadow-inner"
        >
          <motion.div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${resolvedUrl})`,
              backgroundSize: scrolls ? '100% auto' : 'cover',
              backgroundPosition: scrolls ? '50% 0%' : 'center',
            }}
            animate={
              scrolls
                ? {
                    backgroundPosition: [
                      '50% 0%',
                      '50% 100%',
                      '50% 100%',
                      '50% 0%',
                      '50% 0%',
                    ],
                  }
                : undefined
            }
            transition={
              scrolls
                ? {
                    duration: duration + 4,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    times: [0, 0.4, 0.5, 0.9, 1],
                  }
                : undefined
            }
          />
        </div>
      )}
    </div>
  );
}

// ── SlideShow Component ──
function SlideShow({ images }: { images: { src: string; label: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loadErrors, setLoadErrors] = useState<Record<string, boolean>>({});

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleImageError = (src: string) => {
    setLoadErrors((prev) => ({ ...prev, [src]: true }));
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const isError = loadErrors[currentImage.src];

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanUrl = currentImage.src.startsWith('/') ? currentImage.src.slice(1) : currentImage.src;
  const resolvedUrl = `${cleanBase}${cleanUrl}`;

  return (
    <div className="space-y-2">
      <div className="relative aspect-video w-full rounded-xl border border-glass-border overflow-hidden bg-[#0d130d] group/slideshow">
        {isError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <span className="material-symbols-outlined text-3xl text-primary/20">image_not_supported</span>
            <p className="font-mono text-xs text-text-secondary/40 mt-1">{currentImage.label}</p>
            <span className="font-mono text-[9px] text-text-secondary/30 mt-0.5">Asset missing from workspace</span>
          </div>
        ) : (
          <img
            src={resolvedUrl}
            alt={currentImage.label}
            className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
            onClick={() => setLightboxOpen(true)}
            onError={() => handleImageError(currentImage.src)}
          />
        )}

        {!isError && (
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-3 right-3 opacity-0 group-hover/slideshow:opacity-100 transition-opacity flex items-center gap-1.5 rounded-full border border-white/10 bg-black/75 px-3 py-1.5 text-xs font-mono text-white/95 backdrop-blur-sm cursor-zoom-in"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Expand
          </button>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/10 bg-black/60 flex items-center justify-center text-white/80 hover:bg-black/85 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/10 bg-black/60 flex items-center justify-center text-white/80 hover:bg-black/85 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/60 border border-white/10 font-mono text-[10px] text-white/80">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      <p className="font-mono text-[10px] text-text-secondary/50 text-center uppercase tracking-wider">{currentImage.label}</p>

      <AnimatePresence>
        {lightboxOpen && !isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full border border-white/15 bg-black/50 flex items-center justify-center text-white/90 backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={resolvedUrl}
                alt={currentImage.label}
                className="max-w-full max-h-[85vh] object-contain rounded-lg border border-white/10 shadow-2xl"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/75 border border-white/10 font-mono text-xs text-white/90">
                {currentImage.label} ({currentIndex + 1} / {images.length})
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── FloatingDock Component (static skill dock with tooltip) ──
function FloatingDock({ items }: { items: SkillItem[] }) {
  return (
    <div className="relative h-fit flex items-center pointer-events-auto">
      <div className="flex flex-wrap gap-2.5 items-center justify-start rounded-2xl bg-black/40 border border-[#233823] p-3">
        {items.map((item) => (
          <IconContainer key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

function IconContainer({
  title,
  icon,
  bgClass,
}: SkillItem) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`w-10 h-10 rounded-full flex items-center justify-center relative cursor-default shrink-0 transition-colors ${
        bgClass ? bgClass : 'bg-[#141f14]/30 hover:bg-[#233823]/35 border border-[#233823]/80'
      }`}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-[#0b100b] border border-[#233823] text-primary absolute left-1/2 -translate-x-1/2 -bottom-7 w-fit text-[9px] font-mono shadow-md z-30"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-5 h-5 flex items-center justify-center text-text-secondary hover:text-[#6DB33F] transition-colors select-none">
        {icon}
      </div>
    </div>
  );
}

// ── ProjectCard Component with 3D Tilt & Glassmorphism ──
function ProjectCard({ project, onClick }: { project: ProjectData; onClick: () => void }) {
  return (
    <div className="flex items-center justify-center group/card">
      <button
        onClick={onClick}
        className="group relative w-full max-w-[400px] aspect-[3/2] rounded-2xl overflow-hidden border border-[#6DB33F]/30 bg-[#0d1117]/90 hover:border-[#6DB33F] transition-all duration-500 ease-out outline-none text-left cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(109,179,63,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(109,179,63,0.3)] backdrop-blur-md transform hover:-translate-y-1.5 lg:hover:[transform:perspective(1000px)_rotateY(-4deg)_rotateX(3deg)_translateY(-6px)]"
      >
        <ScrollingPreview src={project.src} alt={project.title} />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/85 to-transparent pointer-events-none z-10 flex flex-col justify-end p-4 pb-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#6DB33F] bg-[#6DB33F]/15 border border-[#6DB33F]/40 rounded-full px-2.5 py-0.5 font-bold shadow-sm">
              {project.category}
            </span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-300 bg-white/5 border border-white/15 rounded-full px-2.5 py-0.5 font-bold">
              {project.status}
            </span>
          </div>
          <h4 className="font-sans text-base md:text-lg font-bold text-white tracking-tight flex items-center justify-between">
            {project.title}
            <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-[#6DB33F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              north_east
            </span>
          </h4>
        </div>
      </button>
    </div>
  );
}

// ── Project Detail Modal Component ──
interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-4xl h-[90vh] md:h-[85vh] flex flex-col bg-[#070b07] border border-glass-border rounded-2xl overflow-hidden shadow-2xl z-10"
        >
          {/* Header */}
          <div className="shrink-0 border-b border-glass-border bg-[#0b100b]/90 backdrop-blur-sm px-6 py-4 md:px-8 md:py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <h4 className="font-sans text-lg md:text-xl font-bold text-white tracking-tight truncate">
                {project.title}
              </h4>
              <span className="shrink-0 text-[10px] font-mono uppercase tracking-widest text-[#6DB33F] border border-[#233823] rounded-full px-2.5 py-0.5 bg-[#141f14]">
                {project.category}
              </span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-text-secondary hover:text-[#6DB33F] transition-colors underline underline-offset-2 flex items-center gap-1"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  Source
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 bg-[#6DB33F] hover:bg-[#5fa335] text-black text-xs font-mono font-bold px-3 py-1.5 rounded-full transition-all"
                >
                  Visit
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-[#233823] bg-[#141f14] hover:bg-[#233823] flex items-center justify-center text-text-secondary hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8 space-y-8 scrollbar-thin">
            {/* Tech Stack Dock */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-start items-start">
              {project.skills.frontend && project.skills.frontend.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6DB33F] font-bold">
                    Frontend
                  </span>
                  <FloatingDock items={project.skills.frontend.map(getSkillItem)} />
                </div>
              )}
              {project.skills.backend && project.skills.backend.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary font-bold">
                    Backend &amp; Infrastructure
                  </span>
                  <FloatingDock items={project.skills.backend.map(getSkillItem)} />
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#233823] to-transparent" />

            {/* Detailed Content */}
            <div className="space-y-6">
              {project.content}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

const projectsData: ProjectData[] = [
  {
    id: 'tekcitym',
    category: 'Ticketing Platform',
    title: 'TekcitYm',
    status: 'Active Build',
    src: '/images/projects/tekcitym-booking.png',
    screenshots: [
      { src: '/images/projects/tekcitym-booking.png', label: 'Booking Flow & Seat Layout' },
      { src: '/images/projects/tekcitym-dashboard.png', label: 'Realtime Metrics Dashboard' },
      { src: '/images/projects/tekcitym-admin.png', label: 'Admin Event Configuration' },
      { src: '/images/projects/tekcitym-mobile.png', label: 'Mobile Scanning & Entry' },
      { src: '/images/projects/tekcitym-arch.png', label: 'Modular Monolith Architecture' },
    ],
    skills: {
      frontend: ['React', 'Tailwind CSS', 'TypeScript', 'Kotlin (Android)'],
      backend: ['Java 21', 'Spring Boot', 'Redis', 'PostgreSQL', 'Docker'],
    },
    get content() {
      return (
        <div className="space-y-6">
          {/* Overview */}
          <div className="space-y-2">
            <p className="font-mono text-lg text-primary font-bold">
              High-concurrency event ticketing platform.
            </p>
            <p className="font-body text-sm leading-relaxed text-text-secondary">
              TekcitYm is a modular monolith backend system designed to solve traditional event ticket double-booking and overselling during massive flash sales. It handles thousands of concurrent seat reservations with strict correctness, preventing race conditions and keeping system latency exceptionally low.
            </p>
          </div>

          {/* Key Engineering Problems Solved */}
          <div className="space-y-4">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#6DB33F] font-bold">
              Key Engineering Solutions
            </h5>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-[#233823] bg-[#141f14]/20 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6DB33F] text-lg">lock</span>
                  <h6 className="font-sans font-bold text-sm text-white">Distributed Seat Locking</h6>
                </div>
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  Utilizes Redisson distributed locks to ensure only a single user transaction can lock and evaluate seat bookings at any given millisecond across instances.
                </p>
              </div>

              <div className="border border-[#233823] bg-[#141f14]/20 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6DB33F] text-lg">timer</span>
                  <h6 className="font-sans font-bold text-sm text-white">Abandoned Seat Release</h6>
                </div>
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  Leverages Redis TTL expiration hooks to release held seats automatically if checkout isn't completed within the time window, keeping ticket inventory free.
                </p>
              </div>

              <div className="border border-[#233823] bg-[#141f14]/20 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6DB33F] text-lg">queue</span>
                  <h6 className="font-sans font-bold text-sm text-white">Async QR &amp; Email Pipeline</h6>
                </div>
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  Decouples slow notification and ticket QR generation tasks from the booking path using Apache Kafka consumer groups, maximizing checkout throughput.
                </p>
              </div>

              <div className="border border-[#233823] bg-[#141f14]/20 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6DB33F] text-lg">database</span>
                  <h6 className="font-sans font-bold text-sm text-white">Cache-Aside Read Pattern</h6>
                </div>
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  Saves database resources under massive read loads by caching seat availability in Redis, keeping checkouts fast and resilient.
                </p>
              </div>
            </div>
          </div>

          {/* Screenshot gallery */}
          <div className="space-y-3">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#6DB33F] font-bold">
              Visual Tour &amp; Architecture
            </h5>
            <SlideShow images={this.screenshots} />
          </div>

          {/* Architecture detail */}
          <div className="space-y-3">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#6DB33F] font-bold">
              System Architecture Choice
            </h5>
            <p className="font-body text-xs text-text-secondary leading-relaxed">
              Designed as a Modular Monolith context. Bounded contexts are defined strictly, separating Event Management, Ticketing, and Notification modules cleanly. This keeps deployability simple and latency minimal, while ensuring the application can be seamlessly split into independent microservices if organizational scale demands it.
            </p>
          </div>
        </div>
      );
    }
  },
  {
    id: 'portfolio',
    category: 'Developer Tool & Brand',
    title: 'Developer Portfolio',
    status: 'Completed',
    src: '/images/projects/portfolio-scroll.png',
    screenshots: [
      { src: '/images/projects/portfolio-scroll.png', label: 'Full Scroll Preview' }
    ],
    skills: {
      frontend: ['React', 'Tailwind CSS', 'TypeScript', 'Vite', 'Framer Motion'],
      backend: ['Git']
    },
    get content() {
      return (
        <div className="space-y-6">
          {/* Overview */}
          <div className="space-y-2">
            <p className="font-mono text-lg text-primary font-bold">
              Dark-themed developer brand &amp; interactive portfolio website.
            </p>
            <p className="font-body text-sm leading-relaxed text-text-secondary">
              A premium, fast, and responsive portfolio designed to showcase software engineering skills, professional experiences, and systems architectures. Built with a modern terminal-inspired theme featuring custom animations, interactive project modals, and dynamic viewport calculations.
            </p>
          </div>

          {/* Key Engineering Problems Solved */}
          <div className="space-y-4">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#6DB33F] font-bold">
              Key Engineering Solutions
            </h5>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-[#233823] bg-[#141f14]/20 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6DB33F] text-lg">motion_photos_on</span>
                  <h6 className="font-sans font-bold text-sm text-white">Dynamic Scrolling Previews</h6>
                </div>
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  Developed an aspect-ratio calculation utility that dynamically determines image height vs. viewport dimensions to trigger framer-motion scrolling of tall website screenshots.
                </p>
              </div>

              <div className="border border-[#233823] bg-[#141f14]/20 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6DB33F] text-lg">bolt</span>
                  <h6 className="font-sans font-bold text-sm text-white">Optimized Asset Delivery</h6>
                </div>
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  Leveraged Vite to bundle assets efficiently, compiling TypeScript and minifying CSS/JS into compact chunks with pre-rendered HTML components.
                </p>
              </div>

              <div className="border border-[#233823] bg-[#141f14]/20 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6DB33F] text-lg">palette</span>
                  <h6 className="font-sans font-bold text-sm text-white">Cohesive Design System</h6>
                </div>
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  Created a terminal-inspired dark theme using glassmorphic cards, custom typography from Google Fonts, and a customized Tailwind CSS color palette.
                </p>
              </div>

              <div className="border border-[#233823] bg-[#141f14]/20 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6DB33F] text-lg">devices</span>
                  <h6 className="font-sans font-bold text-sm text-white">Responsive Layout</h6>
                </div>
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  Crafted custom mobile layouts using Tailwind utility classes, adjusting sizing, paddings, and navigation flows for mobile-first user experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Screenshot gallery */}
          <div className="space-y-3">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#6DB33F] font-bold">
              Visual Tour &amp; Layout
            </h5>
            <SlideShow images={this.screenshots} />
          </div>
        </div>
      );
    }
  }
];

export function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  return (
    <AnimatedSection id="projects" className="py-14 bg-background-deep relative">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        {/* Section header */}
        <div className="mb-10">
          <h2 className="font-sans text-3xl md:text-4xl leading-tight font-bold text-white flex items-center gap-2">
            <span className="text-primary font-mono select-none">&gt;_</span>
            Projects
          </h2>
          <p className="font-mono text-xs md:text-sm text-text-secondary/70 tracking-wide mt-1">
            Engineering work &amp; system architecture
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Expanded Project Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </AnimatedSection>
  );
}
