import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface EventStat { label: string; value: string }
interface EventImg { src: string; caption: string }
interface EventLink { label: string; href: string; icon: string }

interface CommunityEvent {
  id: string;
  role: string;
  date: string;
  type: string;
  title: string;
  overview: string;
  responsibilities: string[];
  impact?: string;
  stats?: EventStat[];
  cover?: EventImg;
  gallery?: EventImg[];
  links?: EventLink[];
}

const events: CommunityEvent[] = [
  {
    id: 'gdgoc-lead',
    role: 'Chapter Lead',
    date: '2021 – Present',
    type: 'Student Tech Club',
    title: 'GDGoC FPTU HCMC',
    overview:
      'Google Developer Groups on Campus (GDGoC) is a student tech community at FPT University. As Chapter Lead, I organize tech workshops, study jams, and events around Google technologies — connecting students who want to learn with people who can teach.',
    responsibilities: [
      'Plan and run technical workshops and study jams on Google developer tools',
      'Coordinate with Google and external speakers for events',
      'Manage the chapter team and delegate responsibilities across members',
      'Build an environment where students feel comfortable asking technical questions',
    ],
    impact: 'Running a tech club taught me things that no software course covers — communication, coordination, and what it actually takes to get people excited about learning.',
    stats: [
      { label: 'Role', value: 'Chapter Lead' },
      { label: 'Chapter', value: 'FPTU HCMC' },
      { label: 'Since', value: '2021' },
    ],
    cover: {
      src: '/images/community/gdgoc-cover.jpg',
      caption: 'GDGoC FPTU HCMC',
    },
    gallery: [
      { src: '/images/achievements/gdgoc-event.jpg', caption: 'Workshop event' },
      { src: '/images/community/gdgoc-team.jpg', caption: 'Chapter team' },
    ],
    links: [
      { label: 'GDGoC Page', href: 'https://gdg.community.dev', icon: 'open_in_new' },
    ],
  },
  {
    id: 'icpc-community',
    role: 'Competitor & Organizer',
    date: '2022 – Present',
    type: 'Competitive Programming',
    title: 'ICPC Vietnam Community',
    overview:
      'Beyond competing, I contribute to the competitive programming community at FPT University by sharing problem-solving approaches and organizing informal practice sessions with teammates.',
    responsibilities: [
      'Participate in ICPC contests at provincial, regional, and national levels',
      'Practice regularly with teammates and discuss algorithm approaches',
      'Share resources and explanations for difficult problem categories',
    ],
    stats: [
      { label: 'Rounds', value: 'Provincial · Regional · National' },
      { label: 'Year', value: '2025–2026' },
    ],
    gallery: [
      { src: '/images/achievements/icpc-national.jpg', caption: 'ICPC National Round' },
      { src: '/images/achievements/icpc-regional.jpg', caption: 'ICPC Regional Round' },
    ],
  },
];

function ImageSlot({ src, caption, className = '' }: EventImg & { className?: string }) {
  return (
    <div className={`rounded-lg overflow-hidden border border-glass-border bg-surface-elevated/20 flex items-center justify-center ${className}`}>
      <img
        src={src}
        alt={caption}
        className="w-full h-full object-cover opacity-70 hover:opacity-95 transition-opacity duration-300"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const p = e.currentTarget.parentElement;
          if (p) {
            const ph = document.createElement('div');
            ph.className = 'flex flex-col items-center gap-1.5 text-text-secondary/30 text-center justify-center w-full h-full px-3';
            ph.innerHTML = `<span class="material-symbols-outlined text-xl text-primary/20">add_photo_alternate</span><span class="text-[10px] font-mono">${caption}</span>`;
            p.appendChild(ph);
          }
        }}
      />
    </div>
  );
}

export function Community() {
  return (
    <AnimatedSection id="community" className="py-14 bg-background-deep">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="mb-10">
          <h2 className="font-sans text-3xl md:text-4xl leading-tight font-bold text-white flex items-center gap-2">
            <span className="text-primary font-mono select-none">&gt;_</span>
            Community
          </h2>
          <p className="font-mono text-xs md:text-sm text-text-secondary/70 tracking-wide mt-1">
            Tech communities &amp; competitive programming leadership
          </p>
        </div>

        <div className="space-y-8">
          {events.map((ev) => (
            <div key={ev.id} className="glass-card rounded-2xl border border-glass-border hover:border-primary/20 transition-colors overflow-hidden">

              {/* Cover banner */}
              {ev.cover && (
                <div className="h-40 w-full overflow-hidden">
                  <ImageSlot src={ev.cover.src} caption={ev.cover.caption} className="w-full h-full" />
                </div>
              )}

              <div className="p-5 md:p-6 grid md:grid-cols-3 gap-6">

                {/* Left: main content */}
                <div className="md:col-span-2 space-y-5">
                  {/* Role + meta */}
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded font-mono text-[10px] text-primary uppercase tracking-wider">
                        {ev.type}
                      </span>
                      <span className="px-2.5 py-1 bg-surface-elevated/40 border border-glass-border rounded font-mono text-[10px] text-text-secondary">
                        {ev.date}
                      </span>
                    </div>
                    <h3 className="font-sans text-[24px] font-bold text-primary">{ev.title}</h3>
                    <p className="font-mono text-[12px] text-secondary mt-0.5">{ev.role}</p>
                  </div>

                  {/* Overview */}
                  <p className="text-text-secondary font-body text-sm leading-relaxed">{ev.overview}</p>

                  {/* Responsibilities */}
                  {ev.responsibilities.length > 0 && (
                    <div>
                      <h4 className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2.5">Responsibilities</h4>
                      <ul className="space-y-1.5">
                        {ev.responsibilities.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-text-secondary text-sm font-body">
                            <span className="material-symbols-outlined text-primary/50 text-[14px] mt-0.5 shrink-0">chevron_right</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Impact */}
                  {ev.impact && (
                    <blockquote className="border-l-2 border-primary/30 pl-4 italic text-text-secondary text-sm font-body">
                      {ev.impact}
                    </blockquote>
                  )}

                  {/* Links */}
                  {ev.links && ev.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {ev.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-primary/30 text-primary rounded font-mono text-[11px] hover:bg-primary/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[13px]">{link.icon}</span>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: stats + gallery */}
                <div className="space-y-5">
                  {/* Stats */}
                  {ev.stats && ev.stats.length > 0 && (
                    <div className="bg-surface-elevated/30 rounded-xl border border-glass-border p-4 space-y-3">
                      {ev.stats.map((s) => (
                        <div key={s.label}>
                          <p className="font-mono text-[10px] text-text-secondary/60 uppercase tracking-wider">{s.label}</p>
                          <p className="font-mono text-[13px] text-primary font-semibold mt-0.5">{s.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Gallery */}
                  {ev.gallery && ev.gallery.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-mono text-[10px] text-text-secondary/50 uppercase tracking-wider">Gallery</p>
                      <div className={`grid gap-2 ${ev.gallery.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        {ev.gallery.map((img) => (
                          <ImageSlot key={img.src} src={img.src} caption={img.caption} className="w-full h-24" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
