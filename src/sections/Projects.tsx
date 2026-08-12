import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { PROJECTS_LIST, type ProjectData } from '@/config/projects';
import { ProjectModal } from '@/components/ui/ProjectModal';

function ProjectCard({ project, onOpenModal }: { project: ProjectData; onOpenModal: (p: ProjectData) => void }) {
  const [retryCount, setRetryCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  const getUrl = () => {
    if (!project.src) return '';
    const clean = project.src.startsWith('/') ? project.src.slice(1) : project.src;
    if (retryCount === 0) {
      const base = import.meta.env.BASE_URL || '/';
      const cleanBase = base.endsWith('/') ? base : `${base}/`;
      return `${cleanBase}${clean}`;
    }
    if (retryCount === 1) return `/${clean}`;
    return `./${clean}`;
  };

  const handleImgError = () => {
    if (retryCount < 2) setRetryCount((prev) => prev + 1);
    else setHasError(true);
  };

  const resolvedUrl = getUrl();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={() => onOpenModal(project)}
      className="group relative rounded-2xl border border-white/10 bg-[#0d1117]/90 backdrop-blur-md overflow-hidden cursor-pointer hover:border-[#6DB33F]/70 hover:shadow-[0_15px_45px_rgba(0,0,0,0.85),0_0_30px_rgba(109,179,63,0.2)] transition-all duration-300 flex flex-col"
    >
      {/* ── Image Preview Area with Automatic Continuous Parallax Motion ── */}
      <div className="relative h-52 sm:h-60 w-full bg-[#070b07] overflow-hidden border-b border-white/10">
        {!hasError ? (
          <div className="relative w-full h-full overflow-hidden">
            {/* Automatic Continuous Parallax Scroll Image Container (No hover required, 100% Crisp) */}
            <motion.div
              className="w-full h-full bg-cover"
              style={{ backgroundImage: `url(${resolvedUrl})` }}
              animate={{
                backgroundPosition: ['50% 0%', '50% 100%', '50% 100%', '50% 0%', '50% 0%'],
              }}
              transition={{
                duration: 12,
                ease: 'easeInOut',
                repeat: Infinity,
                times: [0, 0.45, 0.55, 0.95, 1],
              }}
            />

            {/* Hidden img tag for onError detection */}
            <img
              src={resolvedUrl}
              alt=""
              className="hidden"
              onError={handleImgError}
            />

            {/* Cyber Scanline Glow Line across Image */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#6DB33F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none shadow-[0_0_15px_#6DB33F]" />
          </div>
        ) : (
          /* High-Tech Terminal Visual Fallback */
          <div className="w-full h-full p-4 flex flex-col justify-between bg-[#0d1117] relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="font-mono text-[11px] text-slate-400 font-semibold">
                dev@{project.id}:~
              </span>
            </div>

            <div className="font-mono text-xs text-slate-300 space-y-1 my-auto">
              <p className="text-[#6DB33F] font-bold">&gt; INITIALIZING SYSTEM ARCHITECTURE</p>
              <ul className="pl-3 space-y-0.5 text-slate-400 text-[11px]">
                {project.skills.backend.slice(0, 3).map((tech) => (
                  <li key={tech}>• {tech}</li>
                ))}
                <li className="text-[#6DB33F] font-semibold">• Status: 200 OK [{project.status}]</li>
              </ul>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#6DB33F]/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        )}

        {/* Crisp Hover Overlay with Maximize Icon (No Blur filter to keep image 100% clear) */}
        <div className="absolute inset-0 bg-[#0d1117]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
          <div className="w-12 h-12 rounded-full bg-[#6DB33F] text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(109,179,63,0.8)] transform scale-75 group-hover:scale-100 transition-transform font-bold">
            <Maximize2 className="w-5 h-5" />
          </div>
        </div>

        {/* Status Badge Tag */}
        <div className="absolute top-3 left-3 z-20">
          <span className="font-mono text-[10px] font-bold text-[#6DB33F] bg-[#0d1117]/90 border border-[#6DB33F]/50 px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md backdrop-blur-md">
            {project.status}
          </span>
        </div>
      </div>

      {/* Card Content Footer */}
      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-sans text-xl font-bold text-white group-hover:text-[#6DB33F] transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#6DB33F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <p className="font-body text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
          {[...project.skills.backend.slice(0, 3), ...project.skills.frontend.slice(0, 2)].map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded border border-white/10 bg-white/5 font-mono text-[10px] text-slate-300 group-hover:border-[#6DB33F]/40 group-hover:text-[#6DB33F] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <AnimatedSection id="projects" className="py-16 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="mb-10">
        <h2 className="font-sans text-3xl md:text-4xl leading-tight font-bold text-white flex items-center gap-2">
          <span className="text-primary font-mono select-none">&gt;_</span>
          Projects
        </h2>
        <p className="font-mono text-xs md:text-sm text-slate-400 tracking-wide mt-1">
          Engineering work &amp; system architecture
        </p>
      </div>

      {/* Projects Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {PROJECTS_LIST.map((project) => (
          <ProjectCard key={project.id} project={project} onOpenModal={setSelectedProject} />
        ))}
      </div>

      {/* Details Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </AnimatedSection>
  );
}
