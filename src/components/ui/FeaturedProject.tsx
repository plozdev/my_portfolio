import type { Project } from '@/data/projects';
import { Tag } from './Tag';
import { SafeImage } from './SafeImage';
import { ExternalLink, FileText } from 'lucide-react';
import { Github } from '@/components/ui/Icons';

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <div className="bg-surface border border-border flex flex-col group">
      {/* Massive Architecture Header */}
      <div className="w-full aspect-video md:aspect-[21/9] bg-bg relative border-b border-border overflow-hidden">
        <SafeImage 
          src={project.architectureImage} 
          alt={`${project.name} Architecture`}
          wrapperClassName="absolute inset-0"
          fallbackIconSize={64}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
          <div className="flex flex-wrap items-center space-x-3 mb-4">
            <span className="text-green-primary font-mono text-sm uppercase tracking-wider bg-surface/80 px-3 py-1 rounded-sm backdrop-blur-sm border border-green-primary/30">Case Study</span>
            <span className="px-3 py-1 rounded-sm bg-green-primary/20 backdrop-blur-sm border border-green-primary/40 text-green-bright text-xs font-mono">{project.status}</span>
            {project.progress && (
              <span className="text-text-primary text-xs font-mono bg-surface/80 px-3 py-1 rounded-sm backdrop-blur-sm border border-border">{project.progress}</span>
            )}
          </div>
          <h3 className="text-4xl md:text-6xl font-bold text-text-primary mb-4 drop-shadow-lg">{project.name}</h3>
        </div>
      </div>

      <div className="p-8 md:p-12 flex flex-col xl:flex-row gap-12">
        {/* Main Engineering Content */}
        <div className="xl:w-2/3 space-y-12">
          <section>
            <h4 className="text-lg font-bold text-text-primary mb-6 uppercase tracking-wide border-b border-border pb-3 flex items-center">
              <span className="text-green-primary mr-3">&gt;</span> Overview
            </h4>
            <p className="text-text-secondary leading-relaxed text-lg bg-bg/30 p-6 border-l-2 border-green-primary">{project.overview}</p>
          </section>

          {project.problemStatement && (
            <section>
              <h4 className="text-lg font-bold text-text-primary mb-6 uppercase tracking-wide border-b border-border pb-3 flex items-center">
                <span className="text-green-primary mr-3">&gt;</span> Engineering Challenges & Solutions
              </h4>
              <ul className="space-y-4">
                {project.problemStatement.map((ps, i) => (
                  <li key={i} className="text-text-secondary flex items-start bg-surface-elevated border border-border p-5 rounded-sm hover:border-green-primary/30 transition-colors">
                    <span className="text-green-primary mr-4 mt-1 font-bold">0{i + 1}</span>
                    <span className="text-lg">{ps}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <section>
              <h4 className="text-lg font-bold text-text-primary mb-6 uppercase tracking-wide border-b border-border pb-3 flex items-center">
                <span className="text-green-primary mr-3">&gt;</span> System Interfaces
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.gallery.map((img, i) => (
                  <div key={i} className="aspect-video bg-bg border border-border relative rounded-sm overflow-hidden group-hover:border-green-primary/30 transition-colors">
                    <SafeImage src={img} alt={`Screenshot ${i}`} wrapperClassName="absolute inset-0" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="xl:w-1/3 space-y-12">
          <section>
            <h4 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider text-green-primary">Architecture Pattern</h4>
            <p className="text-text-primary font-mono bg-surface-elevated p-4 border border-border text-lg">{project.architecture}</p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider text-green-primary">Tech Stack</h4>
            <div className="space-y-6 bg-surface-elevated border border-border p-6">
              {project.technologies.map((techGroup) => (
                <div key={techGroup.category}>
                  <span className="text-text-primary text-sm font-bold block mb-3 border-b border-border/50 pb-1">{techGroup.category}</span>
                  <div className="flex flex-wrap gap-2">
                    {techGroup.items.map(item => (
                      <Tag key={item} variant="tech">{item}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider text-green-primary">Resources</h4>
            <div className="flex flex-col space-y-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-text-secondary hover:text-green-primary transition-colors p-4 border border-border bg-surface hover:bg-surface-elevated group/btn">
                  <span className="flex items-center"><Github size={20} className="mr-3" /> Source Code</span>
                  <ExternalLink size={16} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-text-secondary hover:text-green-primary transition-colors p-4 border border-border bg-surface hover:bg-surface-elevated group/btn">
                  <span className="flex items-center"><ExternalLink size={20} className="mr-3" /> Live Demo</span>
                  <ExternalLink size={16} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              )}
              {project.designDocument && (
                <a href={project.designDocument} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-text-secondary hover:text-green-primary transition-colors p-4 border border-border bg-surface hover:bg-surface-elevated group/btn">
                  <span className="flex items-center"><FileText size={20} className="mr-3" /> System Design Document</span>
                  <ExternalLink size={16} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
