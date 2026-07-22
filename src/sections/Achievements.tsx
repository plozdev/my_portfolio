import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface AchievementImg {
  src: string;
  caption: string;
}

interface AchievementItem {
  id: string;
  icon: string;
  iconColor: 'primary' | 'secondary';
  category: string;
  title: string;
  org: string;
  year: string;
  summary: string;
  description?: string;
  learned?: string;
  certificate?: string;
  images?: AchievementImg[];
}

const achievements: AchievementItem[] = [
  {
    id: 'icpc-national',
    icon: 'emoji_events',
    iconColor: 'primary',
    category: 'Competitive Programming',
    title: 'ICPC 2025–2026 – National Round',
    org: 'ICPC Vietnam',
    year: '2025',
    summary: 'Competed at the national level of ICPC Vietnam, the most prestigious competitive programming contest in the country.',
    description: 'Qualified and competed in the ICPC National Round, solving algorithmic problems under time pressure. This required strong command of data structures, graph algorithms, and mathematical reasoning.',
    learned: 'Competing at national level exposed me to problem-solving patterns I had not encountered before. The time pressure and difficulty gap pushed me to improve significantly.',
    images: [
      { src: '/images/achievements/icpc-national.jpg', caption: 'ICPC National Round' },
    ],
  },
  {
    id: 'icpc-regional',
    icon: 'emoji_events',
    iconColor: 'primary',
    category: 'Competitive Programming',
    title: 'ICPC 2025–2026 – Regional Round (HCMC)',
    org: 'ICPC Vietnam',
    year: '2025',
    summary: 'Competed in the ICPC HCMC Regional Round as part of the qualification path to national and Asia Regional.',
    images: [
      { src: '/images/achievements/icpc-regional.jpg', caption: 'ICPC Regional – HCMC' },
    ],
    learned: 'Working under contest conditions with teammates taught me how to collaborate quickly under pressure and divide problem-solving responsibilities efficiently.',
  },
  {
    id: 'icpc-provincial',
    icon: 'military_tech',
    iconColor: 'secondary',
    category: 'Competitive Programming',
    title: 'ICPC 2025–2026 – Provincial Round',
    org: 'ICPC Vietnam',
    year: '2025',
    summary: 'Completed the provincial qualifying round, placing to advance to higher competition tiers.',
    images: [
      { src: '/images/achievements/icpc-provincial.jpg', caption: 'ICPC Provincial Round' },
    ],
  },
  {
    id: 'hackathon-fptu',
    icon: 'workspace_premium',
    iconColor: 'primary',
    category: 'Hackathon',
    title: '3rd Prize – FPTU Hackathon Summer 2025',
    org: 'FPT University',
    year: '2025',
    summary: 'Won 3rd prize in a campus-level hackathon, building and presenting a working product within 24 hours.',
    description: 'Competed as part of a team, contributing to the backend architecture and core feature implementation. The project focused on solving a practical problem with a live demo presented to judges.',
    learned: 'Hackathon timelines force you to make fast product decisions. I learned how to scope features quickly, cut what is not essential, and ship something real rather than something perfect.',
    images: [
      { src: '/images/achievements/hackathon-fptu-summer2025.jpg', caption: 'FPTU Hackathon Summer 2025' },
    ],
  },
  {
    id: 'scholarship',
    icon: 'school',
    iconColor: 'secondary',
    category: 'Academic',
    title: 'FPT University Scholarship',
    org: 'FPT University',
    year: '2021–Present',
    summary: 'Received a merit-based scholarship at FPT University in recognition of academic performance.',
    images: [
      { src: '/images/achievements/fpt-scholarship.jpg', caption: 'FPT University Scholarship' },
    ],
  },
  {
    id: 'ai-hackathon',
    icon: 'smart_toy',
    iconColor: 'secondary',
    category: 'Hackathon',
    title: 'AI Hackathon – External Competition',
    org: 'External Organization',
    year: '2024',
    summary: 'Participated in an AI-themed hackathon organized by an external tech organization, exploring applied machine learning use cases.',
    learned: 'Working outside my comfort zone with AI-driven tools gave me a better understanding of where AI fits into a larger system architecture.',
  },
];

function AchievementCard({ item }: { item: AchievementItem }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = !!(item.description || item.learned || (item.images && item.images.length > 0) || item.certificate);

  return (
    <div
      className={`glass-card rounded-xl border transition-all duration-300 ${
        expanded ? 'border-primary/30' : 'border-glass-border hover:border-primary/20'
      }`}
    >
      {/* Header row — always visible */}
      <div className="p-5 flex items-start gap-4">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
            item.iconColor === 'primary'
              ? 'bg-primary/10 border border-primary/20'
              : 'bg-secondary/10 border border-secondary/20'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[18px] ${
              item.iconColor === 'primary' ? 'text-primary' : 'text-secondary'
            }`}
          >
            {item.icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="font-mono text-[10px] text-text-secondary/60 uppercase tracking-wider">
              {item.category}
            </span>
            <span className="font-mono text-[10px] text-text-secondary/40">·</span>
            <span className="font-mono text-[10px] text-text-secondary/60">{item.year}</span>
          </div>
          <h4 className="font-sans font-bold text-text-primary text-sm leading-snug">{item.title}</h4>
          <p className="font-mono text-[11px] text-secondary mt-0.5">{item.org}</p>
          <p className="text-text-secondary text-[12px] font-body mt-2 leading-relaxed">{item.summary}</p>
        </div>
        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="shrink-0 mt-1 text-text-secondary/50 hover:text-primary transition-colors"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {expanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        )}
      </div>

      {/* Expanded content */}
      {expanded && hasMore && (
        <div className="px-5 pb-5 border-t border-glass-border pt-4 space-y-4">
          {item.description && (
            <p className="text-text-secondary font-body text-sm leading-relaxed">{item.description}</p>
          )}
          {item.learned && (
            <div>
              <p className="font-mono text-[10px] text-primary uppercase tracking-wider mb-1.5">What I learned</p>
              <p className="text-text-secondary font-body text-sm leading-relaxed italic">{item.learned}</p>
            </div>
          )}
          {item.images && item.images.length > 0 && (
            <div className={`grid gap-3 ${item.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {item.images.map((img) => (
                <div key={img.src} className="rounded-lg overflow-hidden border border-glass-border bg-surface-elevated/20 h-36 flex items-center justify-center">
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const p = e.currentTarget.parentElement;
                      if (p) {
                        const ph = document.createElement('div');
                        ph.className = 'flex flex-col items-center gap-2 text-text-secondary/30 text-center w-full h-full justify-center';
                        ph.innerHTML = `<span class="material-symbols-outlined text-xl text-primary/20">add_photo_alternate</span><span class="text-[10px] font-mono">${img.caption}</span>`;
                        p.appendChild(ph);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          {item.certificate && (
            <a
              href={item.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary font-mono text-[11px] hover:underline"
            >
              <span className="material-symbols-outlined text-[14px]">description</span>
              View Certificate
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function Achievements() {
  const byCategory = achievements.reduce<Record<string, AchievementItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <AnimatedSection id="achievements" className="py-16 px-5 md:px-8 max-w-[1300px] mx-auto">
      <h2 className="font-sans text-3xl leading-tight text-primary mb-2 font-bold">Achievements</h2>
      <p className="text-text-secondary font-body text-sm mb-8 max-w-xl">
        Milestones from competitive programming, university, and hackathons — each one taught me something.
      </p>

      <div className="space-y-7">
        {Object.entries(byCategory).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-mono text-[11px] text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-secondary/40" />
              {category}
            </h3>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {items.map((item) => (
                <AchievementCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
