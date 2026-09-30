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
  Play,
  Monitor,
  Radio,
  Cpu,
  Network,
  Volume2,
  Layers,
  Code2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { getSkillItem, type ProjectData, type ScreenshotItem } from '@/config/projects';

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

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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

function SkillFallbackIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes('event') || lower.includes('sse')) {
    return <Radio className="w-4 h-4 text-[#6DB33F]" />;
  }
  if (lower.includes('work') || lower.includes('manager')) {
    return <Cpu className="w-4 h-4 text-[#6DB33F]" />;
  }
  if (lower.includes('room') || lower.includes('db') || lower.includes('data')) {
    return <Database className="w-4 h-4 text-[#6DB33F]" />;
  }
  if (lower.includes('retrofit') || lower.includes('api') || lower.includes('http')) {
    return <Network className="w-4 h-4 text-[#6DB33F]" />;
  }
  if (lower.includes('speech') || lower.includes('tts') || lower.includes('audio')) {
    return <Volume2 className="w-4 h-4 text-[#6DB33F]" />;
  }
  if (lower.includes('haptic') || lower.includes('vibrat')) {
    return <Smartphone className="w-4 h-4 text-[#6DB33F]" />;
  }
  if (lower.includes('coil') || lower.includes('image')) {
    return <Layers className="w-4 h-4 text-[#6DB33F]" />;
  }
  if (lower.includes('ai') || lower.includes('gemini') || lower.includes('model')) {
    return <Sparkles className="w-4 h-4 text-[#6DB33F]" />;
  }
  return <Code2 className="w-4 h-4 text-[#6DB33F]" />;
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
    if (retryCount === 1) return `/${clean}`;
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
      className={`group flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#161b22] border border-white/10 hover:border-[#6DB33F]/50 hover:bg-[#1a212d] transition-all shadow-sm ${
        skill.bgClass || ''
      }`}
      title={skill.title}
    >
      <div className="w-4 h-4 flex items-center justify-center shrink-0">
        {skill.iconSrc && !hasError ? (
          <img
            src={resolvedUrl}
            alt={skill.title}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform"
            onError={handleImgError}
          />
        ) : (
          <SkillFallbackIcon name={skill.title} />
        )}
      </div>
      <span className="font-mono text-xs text-slate-200 group-hover:text-white font-medium select-none whitespace-nowrap">
        {skill.title}
      </span>
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
  const [mediaMode, setMediaMode] = useState<'video' | 'walkthrough'>('video');

  useEffect(() => {
    setSelectedScreenshot(0);
    setActiveTab('frontend');
    if (project?.youtube) {
      setMediaMode('video');
    } else {
      setMediaMode('walkthrough');
    }
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
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;
  const hasYoutube = Boolean(project.youtube);
  const currentScreenshot: ScreenshotItem | undefined = hasScreenshots
    ? project.screenshots[selectedScreenshot] || project.screenshots[0]
    : undefined;
  const isCurrentMobile = currentScreenshot?.format === 'mobile' || (project.isMobile && !currentScreenshot?.format);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 md:p-6"
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
          className="relative w-full max-w-4xl max-h-[94vh] bg-[#0d1117] border border-[#6DB33F]/40 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(109,179,63,0.15)] flex flex-col overflow-hidden z-10"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-white/10 bg-[#161b22]/90 backdrop-blur-md">
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <h2 className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
              <span className="font-mono text-[10px] font-bold text-[#6DB33F] bg-[#6DB33F]/15 border border-[#6DB33F]/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {project.status}
              </span>
              {project.platformLabel && (
                <span className="font-mono text-[10px] text-slate-300 bg-white/5 border border-white/15 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  {project.isMobile ? (
                    <Smartphone className="w-3 h-3 text-[#6DB33F]" />
                  ) : (
                    <Monitor className="w-3 h-3 text-[#6DB33F]" />
                  )}
                  {project.platformLabel}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 hover:border-[#6DB33F]/60 hover:bg-[#6DB33F]/20 text-slate-300 hover:text-[#6DB33F] flex items-center justify-center transition-all focus:outline-none shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 md:p-8 overflow-y-auto space-y-7 custom-scrollbar">
            {/* Tech Stack Selector & Unified Badges */}
            <div className="bg-[#12171f]/60 border border-white/10 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-4 mb-3.5 border-b border-white/10 pb-2.5">
                <button
                  onClick={() => setActiveTab('frontend')}
                  className={`font-mono text-xs font-bold tracking-wider uppercase transition-colors pb-1 border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'frontend'
                      ? 'text-[#6DB33F] border-[#6DB33F]'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  <span>{frontendTabLabel}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/10 text-slate-300 font-mono">
                    {project.skills.frontend.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('backend')}
                  className={`font-mono text-xs font-bold tracking-wider uppercase transition-colors pb-1 border-b-2 flex items-center gap-1.5 ${
                    activeTab === 'backend'
                      ? 'text-[#6DB33F] border-[#6DB33F]'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  <span>{backendTabLabel}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/10 text-slate-300 font-mono">
                    {project.skills.backend.length}
                  </span>
                </button>
              </div>

              {/* Consistent, Polished Skill Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {(activeTab === 'frontend' ? project.skills.frontend : project.skills.backend).map(
                  (skillName) => (
                    <SkillBadge key={skillName} name={skillName} />
                  )
                )}
              </div>
            </div>

            {/* Project Overview */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <p className="font-mono text-xs sm:text-sm text-[#85E042] leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* ── UNIFIED MEDIA & DEMO SHOWCASE ── */}
            {(hasYoutube || hasScreenshots) && (
              <div className="rounded-2xl border border-white/10 bg-[#161b22]/70 p-4 sm:p-6 space-y-4">
                {/* Media Showcase Header & Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#6DB33F] tracking-widest uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#6DB33F] animate-pulse" />
                      // SYSTEM DEMO &amp; SHOWCASE
                    </span>
                  </div>

                  {/* Mode switcher if both YouTube and Screenshots exist */}
                  {hasYoutube && hasScreenshots && (
                    <div className="flex items-center p-0.5 rounded-lg bg-black/40 border border-white/10">
                      <button
                        onClick={() => setMediaMode('video')}
                        className={`px-3 py-1 rounded-md font-mono text-xs font-medium transition-all flex items-center gap-1.5 ${
                          mediaMode === 'video'
                            ? 'bg-[#6DB33F] text-slate-950 font-bold shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Video Demo</span>
                      </button>
                      <button
                        onClick={() => setMediaMode('walkthrough')}
                        className={`px-3 py-1 rounded-md font-mono text-xs font-medium transition-all flex items-center gap-1.5 ${
                          mediaMode === 'walkthrough'
                            ? 'bg-[#6DB33F] text-slate-950 font-bold shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Layers className="w-3 h-3" />
                        <span>Interactive Scenes ({project.screenshots.length})</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* MODE 1: Embedded YouTube Video Showcase */}
                {hasYoutube && (mediaMode === 'video' || !hasScreenshots) && (
                  <div className="space-y-3">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/20 bg-black shadow-2xl">
                      {project.youtubeId ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0&modestbranding=1`}
                          title={`${project.title} Video Demo`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : (
                        <a
                          href={project.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#0d1117] hover:bg-[#121820] transition-colors p-6 text-center group"
                        >
                          <div className="w-16 h-16 rounded-full bg-[#FF0000]/20 border border-[#FF0000]/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <YoutubeIcon className="w-8 h-8 text-[#FF0000]" />
                          </div>
                          <span className="font-mono text-sm text-slate-200 group-hover:text-white font-bold">
                            Watch Full Demo on YouTube &rarr;
                          </span>
                        </a>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                      <span className="flex items-center gap-1 text-[#85E042]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        HD 1080p Live Architecture Demonstration
                      </span>
                      <a
                        href={project.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white text-[#6DB33F] flex items-center gap-1 transition-colors"
                      >
                        <span>Open in YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* MODE 2: Interactive Screenshots / Animated Walkthrough */}
                {hasScreenshots && (mediaMode === 'walkthrough' || !hasYoutube) && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-1">
                    {/* Visual Mockup Area (Phone vs Desktop Window) */}
                    <div className="md:col-span-5 flex justify-center">
                      {isCurrentMobile ? (
                        /* Mobile Mockup Frame */
                        <div className="relative w-[210px] sm:w-[220px] aspect-[9/18.5] rounded-[26px] p-1.5 bg-gradient-to-b from-slate-700 via-slate-900 to-black border-2 border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(109,179,63,0.2)]">
                          {/* Dynamic Island */}
                          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-black rounded-full z-20 flex items-center justify-center shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-800 ml-auto mr-2" />
                          </div>
                          {/* Inner Screen */}
                          <div className="w-full h-full rounded-[20px] overflow-hidden bg-black relative">
                            <img
                              src={resolveAssetUrl(currentScreenshot?.src || '')}
                              alt={currentScreenshot?.label}
                              className="w-full h-full object-cover object-top transition-all duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none rounded-[20px]" />
                          </div>
                        </div>
                      ) : (
                        /* Desktop Browser Mockup Frame */
                        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#0d1117] border border-white/20 shadow-2xl flex flex-col">
                          {/* Window Top Bar */}
                          <div className="h-6 bg-[#161b22] border-b border-white/10 px-2.5 flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                            <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                            <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                            <span className="font-mono text-[9px] text-slate-400 ml-2 truncate">
                              https://cyberpass.dev/preview
                            </span>
                          </div>
                          {/* Browser Window Content */}
                          <div className="relative flex-1 overflow-hidden bg-black">
                            <img
                              src={resolveAssetUrl(currentScreenshot?.src || '')}
                              alt={currentScreenshot?.label}
                              className="w-full h-full object-cover object-top transition-all duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Interactive Scene Selector List */}
                    <div className="md:col-span-7 space-y-2">
                      <p className="text-xs font-mono text-slate-400 mb-1">
                        Select interactive scene preview:
                      </p>
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                        {project.screenshots.map((shot, idx) => {
                          const isSelected = selectedScreenshot === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => setSelectedScreenshot(idx)}
                              className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                                isSelected
                                  ? 'bg-[#6DB33F]/15 border-[#6DB33F] shadow-[0_0_20px_rgba(109,179,63,0.15)]'
                                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                              }`}
                            >
                              <span
                                className={`font-mono text-xs px-2 py-0.5 rounded font-bold shrink-0 ${
                                  isSelected
                                    ? 'bg-[#6DB33F] text-slate-950'
                                    : 'bg-white/10 text-slate-400'
                                }`}
                              >
                                0{idx + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4
                                    className={`text-xs sm:text-sm font-bold truncate ${
                                      isSelected ? 'text-[#85E042]' : 'text-slate-200'
                                    }`}
                                  >
                                    {shot.label}
                                  </h4>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded bg-white/10 text-slate-400">
                                    {shot.format === 'mobile' ? 'Mobile Screen' : 'Web Console'}
                                  </span>
                                </div>
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
              </div>
            )}

            {/* Key Engineering Solutions Grid */}
            <div>
              <h3 className="font-mono text-xs font-bold text-[#6DB33F] tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="text-primary">&gt;_</span>
                KEY ENGINEERING SOLUTIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keySolutions.map((solution, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#6DB33F]/40 transition-colors space-y-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#6DB33F]/15 border border-[#6DB33F]/30 flex items-center justify-center shrink-0">
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
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              {/* YouTube Demo Link */}
              {project.youtube && (
                <a
                  href={project.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 rounded-xl bg-[#6DB33F] hover:bg-[#85E042] text-slate-950 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(109,179,63,0.3)] hover:scale-[1.02]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch Demo on YouTube</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              {/* APK Download Link */}
              {project.download && (
                <a
                  href={project.download}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 rounded-xl bg-[#6DB33F] hover:bg-[#85E042] text-slate-950 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(109,179,63,0.3)] hover:scale-[1.02]"
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
                  className="h-11 px-5 rounded-xl bg-[#6DB33F] hover:bg-[#85E042] text-slate-950 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(109,179,63,0.3)] hover:scale-[1.02]"
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
