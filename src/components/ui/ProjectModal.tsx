import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Lock, Zap, Database, Box, RotateCw, Palette, Smartphone } from 'lucide-react';
import { getSkillItem, type ProjectData } from '@/config/projects';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function SolutionIcon({ name }: { name?: string }) {
  switch (name) {
    case 'lock':
      return <Lock className="w-5 h-5 text-[#6DB33F]" />;
    case 'zap':
      return <Zap className="w-5 h-5 text-[#6DB33F]" />;
    case 'database':
      return <Database className="w-5 h-5 text-[#6DB33F]" />;
    case 'box':
      return <Box className="w-5 h-5 text-[#6DB33F]" />;
    case 'rotate-cw':
      return <RotateCw className="w-5 h-5 text-[#6DB33F]" />;
    case 'palette':
      return <Palette className="w-5 h-5 text-[#6DB33F]" />;
    case 'smartphone':
      return <Smartphone className="w-5 h-5 text-[#6DB33F]" />;
    default:
      return <Zap className="w-5 h-5 text-[#6DB33F]" />;
  }
}

function SkillBadge({ name }: { name: string }) {
  const skill = getSkillItem(name);
  const [retryCount, setRetryCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  const getUrl = () => {
    if (!skill.iconSrc) return '';
    const clean = skill.iconSrc.startsWith('/') ? skill.iconSrc.slice(1) : skill.iconSrc;
    if (retryCount === 0) {
      const base = import.meta.env.BASE_URL || '/';
      const cleanBase = base.endsWith('/') ? base : `${base}/`;
      return `${cleanBase}${clean}`;
    }
    if (retryCount === 1) {
      return `/${clean}`;
    }
    return `./${clean}`;
  };

  const handleImgError = () => {
    if (retryCount < 2) {
      setRetryCount((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const resolvedUrl = getUrl();

  return (
    <div
      className={`group relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#161b22] border border-white/10 hover:border-[#6DB33F]/60 transition-all p-2 shadow-sm ${
        skill.bgClass || ''
      }`}
      title={skill.title}
    >
      {skill.iconSrc && !hasError ? (
        <img
          src={resolvedUrl}
          alt={skill.title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform"
          onError={handleImgError}
        />
      ) : (
        <span className="font-mono text-[10px] font-bold text-white select-none">
          {skill.shortText || skill.title.slice(0, 3)}
        </span>
      )}
    </div>
  );
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend'>('frontend');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d1117] border border-[#6DB33F]/40 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(109,179,63,0.15)] flex flex-col overflow-hidden z-10"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161b22]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
              <span className="font-mono text-[10px] font-bold text-[#6DB33F] bg-[#6DB33F]/15 border border-[#6DB33F]/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {project.status}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 hover:border-[#6DB33F]/60 hover:bg-[#6DB33F]/20 text-slate-300 hover:text-[#6DB33F] flex items-center justify-center transition-all focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body (Custom Dark Scrollbar) */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 custom-scrollbar">
            {/* Tech Stack Group Header & Badges */}
            <div>
              <div className="flex items-center gap-4 mb-3 border-b border-white/10 pb-2">
                <button
                  onClick={() => setActiveTab('frontend')}
                  className={`font-mono text-xs font-bold tracking-wider uppercase transition-colors pb-1 border-b-2 ${
                    activeTab === 'frontend'
                      ? 'text-[#6DB33F] border-[#6DB33F]'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  Frontend ({project.skills.frontend.length})
                </button>
                <button
                  onClick={() => setActiveTab('backend')}
                  className={`font-mono text-xs font-bold tracking-wider uppercase transition-colors pb-1 border-b-2 ${
                    activeTab === 'backend'
                      ? 'text-[#6DB33F] border-[#6DB33F]'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  Backend &amp; Infrastructure ({project.skills.backend.length})
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {(activeTab === 'frontend' ? project.skills.frontend : project.skills.backend).map((skillName) => (
                  <SkillBadge key={skillName} name={skillName} />
                ))}
              </div>
            </div>

            {/* Project Overview Paragraph */}
            <div>
              <p className="font-mono text-base sm:text-lg font-bold text-[#85E042] mb-2 leading-snug">
                {project.overview}
              </p>
            </div>

            {/* Key Engineering Solutions Grid */}
            <div>
              <h3 className="font-mono text-xs font-bold text-[#6DB33F] tracking-widest uppercase mb-4">
                // KEY ENGINEERING SOLUTIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keySolutions.map((solution, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#6DB33F]/40 transition-colors space-y-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#6DB33F]/15 border border-[#6DB33F]/30 flex items-center justify-center">
                        <SolutionIcon name={solution.icon} />
                      </div>
                      <h4 className="font-sans text-sm font-bold text-white">{solution.title}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-9">{solution.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 rounded-xl bg-white/5 hover:bg-[#6DB33F]/20 text-slate-200 hover:text-[#6DB33F] border border-white/15 hover:border-[#6DB33F]/50 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 rounded-xl bg-[#6DB33F] hover:bg-[#85E042] text-slate-950 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(109,179,63,0.3)]"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
