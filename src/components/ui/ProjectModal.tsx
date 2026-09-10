import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUpRight,
  Lock,
  Zap,
  Database,
  Box,
  RotateCw,
  Palette,
  Smartphone,
  Shield,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { getSkillItem, type ProjectData } from '@/config/projects';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function SolutionIcon({ name }: { name?: string }) {
  switch (name) {
    case 'lock':
      return <Lock className="w-5 h-5 text-[#6DB33F]" />;
    case 'shield':
      return <Shield className="w-5 h-5 text-[#6DB33F]" />;
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

function resolveAssetUrl(path: string): string {
  if (!path) return '';
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${clean}`;
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
  const [selectedScreenshot, setSelectedScreenshot] = useState<number>(0);

  useEffect(() => {
    setSelectedScreenshot(0);
    setActiveTab('frontend');
  }, [project]);

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

  const frontendTabLabel = project.skillTabs?.frontendLabel || 'Frontend';
  const backendTabLabel = project.skillTabs?.backendLabel || 'Backend & Infrastructure';

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 md:p-8"
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
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-[#0d1117] border border-[#6DB33F]/40 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(109,179,63,0.15)] flex flex-col overflow-hidden z-10"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161b22]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <h2 className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
              <span className="font-mono text-[10px] font-bold text-[#6DB33F] bg-[#6DB33F]/15 border border-[#6DB33F]/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {project.status}
              </span>
              {project.isMobile && (
                <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-slate-300 bg-white/5 border border-white/15 px-2.5 py-0.5 rounded-full">
                  <Smartphone className="w-3 h-3 text-[#6DB33F]" />
                  Android / iOS
                </span>
              )}
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
                  {frontendTabLabel} ({project.skills.frontend.length})
                </button>
                <button
                  onClick={() => setActiveTab('backend')}
                  className={`font-mono text-xs font-bold tracking-wider uppercase transition-colors pb-1 border-b-2 ${
                    activeTab === 'backend'
                      ? 'text-[#6DB33F] border-[#6DB33F]'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  {backendTabLabel} ({project.skills.backend.length})
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {(activeTab === 'frontend' ? project.skills.frontend : project.skills.backend).map(
                  (skillName) => (
                    <SkillBadge key={skillName} name={skillName} />
                  )
                )}
              </div>
            </div>

            {/* Project Overview Paragraph */}
            <div>
              <p className="font-mono text-xs sm:text-sm text-[#85E042] mb-2 leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Interactive Walkthrough / Screenshots Showcase (Mobile Apps Only) */}
            {project.isMobile && project.screenshots && project.screenshots.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-[#161b22]/50 p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#6DB33F] tracking-widest uppercase">
                      // FEATURE WALKTHROUGH &amp; DEMO
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    Scene {selectedScreenshot + 1} of {project.screenshots.length}
                  </span>
                </div>

                {/* Mobile Smartphone Device Frame Walkthrough */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                  {/* Centered Phone Mockup */}
                  <div className="md:col-span-5 flex justify-center">
                    <div className="relative w-[210px] sm:w-[230px] aspect-[9/18.5] rounded-[26px] p-1.5 bg-gradient-to-b from-slate-700 via-slate-900 to-black border-2 border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(109,179,63,0.2)]">
                      {/* Dynamic Island */}
                      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-black rounded-full z-20 flex items-center justify-center shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800 ml-auto mr-2" />
                      </div>

                      {/* Screen Display */}
                      <div className="w-full h-full rounded-[20px] overflow-hidden bg-black relative">
                        <img
                          src={resolveAssetUrl(project.screenshots[selectedScreenshot]?.src)}
                          alt={project.screenshots[selectedScreenshot]?.label}
                          className="w-full h-full object-cover object-top transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none rounded-[20px]" />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Scene Selectors */}
                  <div className="md:col-span-7 space-y-2.5">
                    <p className="text-xs font-mono text-slate-400 mb-2">
                      Click below to switch interactive scene recordings:
                    </p>
                    {project.screenshots.map((shot, idx) => {
                      const isSelected = selectedScreenshot === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedScreenshot(idx)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'bg-[#6DB33F]/15 border-[#6DB33F] shadow-[0_0_20px_rgba(109,179,63,0.15)]'
                              : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                          }`}
                        >
                          <span
                            className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                              isSelected
                                ? 'bg-[#6DB33F] text-slate-950'
                                : 'bg-white/10 text-slate-400'
                            }`}
                          >
                            0{idx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`text-xs sm:text-sm font-bold truncate ${
                                isSelected ? 'text-[#85E042]' : 'text-slate-200'
                              }`}
                            >
                              {shot.label}
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              High-fps native render &amp; gesture mechanics
                            </p>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#6DB33F] shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

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

            {/* External Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              {/* APK Download Link */}
              {project.download && (
                <a
                  href={project.download}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 rounded-xl bg-[#6DB33F] hover:bg-[#85E042] text-slate-950 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(109,179,63,0.3)]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download APK (Release)</span>
                </a>
              )}

              {/* Live Web Demo */}
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

              {/* GitHub Repositories */}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 rounded-xl bg-white/5 hover:bg-[#6DB33F]/20 text-slate-200 hover:text-[#6DB33F] border border-white/15 hover:border-[#6DB33F]/50 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.githubBackend && (
                <a
                  href={project.githubBackend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 rounded-xl bg-white/5 hover:bg-[#6DB33F]/20 text-slate-200 hover:text-[#6DB33F] border border-white/15 hover:border-[#6DB33F]/50 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Backend Repo</span>
                </a>
              )}
              {project.githubFrontend && (
                <a
                  href={project.githubFrontend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 rounded-xl bg-white/5 hover:bg-[#6DB33F]/20 text-slate-200 hover:text-[#6DB33F] border border-white/15 hover:border-[#6DB33F]/50 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Frontend Repo</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
