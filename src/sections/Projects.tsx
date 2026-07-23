import { AnimatedSection } from '@/components/ui/AnimatedSection';

/* ─────────────────────────────────────────────
   Data – all project facts live here so the
   JSX below stays clean and readable.
───────────────────────────────────────────── */

const tekcitym = {
  name: 'TekcitYm',
  architecture: 'Modular Monolith',
  currentPhase: 'Authentication & Foundation',
  sprintProgress: 80,
  overallProgress: 17,
  overview:
    'High-concurrency event ticketing platform designed to eliminate overselling and improve booking performance during flash sales. Built to handle thousands of concurrent seat reservations without race conditions.',
  whyItExists:
    'Traditional ticketing systems fail catastrophically under flash-sale load — overselling seats, creating double-bookings, and leaving users with invalid tickets. Most systems solve this with naive database locks, which collapse at scale. TekcitYm rethinks the booking pipeline from the ground up.',
  problemsSolved: [
    {
      icon: 'lock',
      title: 'Distributed Seat Locking',
      body: 'Redisson distributed locks ensure only one booking process can claim a seat at any moment — even across multiple application instances.',
    },
    {
      icon: 'timer',
      title: 'Abandoned Seat Release',
      body: 'Redis TTL automatically expires seat holds that users never confirm, preventing permanently stuck reservations without manual cleanup jobs.',
    },
    {
      icon: 'queue',
      title: 'Async QR & Email Pipeline',
      body: 'Apache Kafka decouples QR code generation and confirmation emails from the critical booking path, keeping p99 latency low during spikes.',
    },
    {
      icon: 'database',
      title: 'Cache-Aside Pattern',
      body: 'Redis caching sits in front of PostgreSQL for seat availability reads, dramatically reducing database pressure during high-traffic windows.',
    },
  ],
  engineeringChallenges: [
    { label: 'Distributed Locking', color: 'primary' },
    { label: 'Redis TTL', color: 'primary' },
    { label: 'Apache Kafka', color: 'secondary' },
    { label: 'WebSocket / STOMP', color: 'secondary' },
    { label: 'Cache-Aside Pattern', color: 'primary' },
    { label: 'Modular Monolith', color: 'secondary' },
    { label: 'Idempotent Booking', color: 'primary' },
    { label: 'Event-Driven Design', color: 'secondary' },
  ],
  stack: [
    {
      category: 'Backend',
      icon: 'dns',
      items: ['Java 21', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Redis', 'Redisson', 'Apache Kafka', 'WebSocket (STOMP)'],
    },
    {
      category: 'Frontend',
      icon: 'web',
      items: ['React', 'Tailwind CSS', 'Android (Kotlin)'],
    },
    {
      category: 'Database',
      icon: 'storage',
      items: ['PostgreSQL', 'Redis'],
    },
    {
      category: 'Deployment',
      icon: 'cloud',
      items: ['Render', 'Railway', 'Cloudinary', 'AWS S3'],
    },
  ],
  gallery: [
    { src: '/images/projects/tekcitym-dashboard.png', label: 'Dashboard' },
    { src: '/images/projects/tekcitym-booking.png', label: 'Booking Flow' },
    { src: '/images/projects/tekcitym-admin.png', label: 'Admin Panel' },
    { src: '/images/projects/tekcitym-mobile.png', label: 'Mobile App' },
    { src: '/images/projects/tekcitym-arch.png', label: 'Architecture Diagram' },
  ],
  architectureImage: '/images/projects/tekcitym-arch.png',
  github: '',
  liveDemo: '',
  designDoc: '',
};

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function ProgressBar({ value, color = 'primary' }: { value: number; color?: string }) {
  return (
    <div className="w-full h-1.5 bg-surface-elevated/60 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full bg-${color} transition-all duration-700`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function ChallengePill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono text-[11px] font-semibold
        ${color === 'primary'
          ? 'bg-primary/10 border-primary/30 text-primary'
          : 'bg-secondary/10 border-secondary/30 text-secondary'
        }`}
    >
      <span className="material-symbols-outlined text-[12px]">electric_bolt</span>
      {label}
    </span>
  );
}

function GallerySlot({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative group/slot flex-shrink-0 w-48">
      <div className="w-48 h-32 rounded-xl overflow-hidden border border-glass-border bg-surface-elevated/30 flex items-center justify-center">
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover opacity-70 group-hover/slot:opacity-100 transition-opacity duration-300"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              const ph = document.createElement('div');
              ph.className = 'flex flex-col items-center gap-1.5 text-text-secondary/40 text-center w-full h-full justify-center';
              ph.innerHTML = `<span class="material-symbols-outlined text-2xl text-primary/20">add_photo_alternate</span><span class="text-[10px] font-mono text-text-secondary/30">${label}</span>`;
              parent.appendChild(ph);
            }
          }}
        />
      </div>
      <p className="text-[10px] font-mono text-text-secondary/50 mt-1.5 text-center">{label}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */

export function Projects() {
  return (
    <AnimatedSection id="projects" className="py-16 bg-background-deep relative">
      <div className="max-w-[1300px] mx-auto px-5 md:px-8">

        {/* Section header */}
        <div className="mb-8">
          <h2 className="font-sans text-3xl leading-tight font-bold text-primary">
            Projects
          </h2>
          <p className="text-text-secondary mt-1.5 font-body text-sm max-w-xl">
            Engineering work that reflects how I think about system design and trade-offs — not just features.
          </p>
        </div>

        {/* ── FEATURED PROJECT: TekcitYm ── */}
        <div className="glass-card rounded-2xl overflow-hidden border border-glass-border mb-5">

          {/* ① Banner strip */}
          <div className="relative h-2 bg-gradient-to-r from-primary via-secondary to-primary" />

          <div className="p-6 md:p-9 space-y-10">

            {/* ② Project identity + status */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary text-surface font-mono text-[10px] rounded-full uppercase font-bold">
                    Active Build
                  </span>
                  <span className="px-3 py-1 bg-surface-variant/80 text-primary font-mono text-[10px] rounded-full uppercase border border-primary/20">
                    {tekcitym.architecture}
                  </span>
                </div>
                <h3 className="font-sans text-3xl md:text-[40px] font-bold text-primary leading-tight tracking-tight mb-3">
                  {tekcitym.name}
                </h3>
                <p className="text-text-secondary font-body text-sm max-w-xl leading-relaxed">
                  {tekcitym.overview}
                </p>
              </div>

              {/* Progress panel */}
              <div className="glass-card rounded-xl p-6 min-w-[220px] border border-primary/15 shrink-0">
                <p className="font-mono text-[10px] text-text-secondary uppercase tracking-wider mb-5">
                  Build Progress
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-mono text-[11px] text-text-secondary">Current Phase</span>
                      <span className="font-mono text-[11px] text-secondary">{tekcitym.sprintProgress}%</span>
                    </div>
                    <ProgressBar value={tekcitym.sprintProgress} color="secondary" />
                    <p className="font-mono text-[10px] text-text-secondary/60 mt-1">{tekcitym.currentPhase}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-mono text-[11px] text-text-secondary">Overall</span>
                      <span className="font-mono text-[11px] text-primary">{tekcitym.overallProgress}%</span>
                    </div>
                    <ProgressBar value={tekcitym.overallProgress} color="primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* ③ Why this problem exists */}
            <div>
              <h4 className="font-mono text-[11px] text-primary uppercase tracking-widest mb-4">
                Why This Problem Exists
              </h4>
              <blockquote className="border-l-4 border-primary/40 pl-6 text-text-primary font-body text-base leading-relaxed italic">
                {tekcitym.whyItExists}
              </blockquote>
            </div>

            {/* ④ Problems solved */}
            <div>
              <h4 className="font-mono text-[11px] text-primary uppercase tracking-widest mb-6">
                Problems Solved
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {tekcitym.problemsSolved.map((p) => (
                  <div
                    key={p.title}
                    className="bg-surface-elevated/30 border border-glass-border rounded-xl p-5 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary text-[16px]">{p.icon}</span>
                      </div>
                      <h5 className="font-sans font-bold text-text-primary text-sm">{p.title}</h5>
                    </div>
                    <p className="text-text-secondary text-sm font-body leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ⑤ Engineering challenges */}
            <div>
              <h4 className="font-mono text-[11px] text-primary uppercase tracking-widest mb-4">
                Engineering Challenges
              </h4>
              <div className="flex flex-wrap gap-2">
                {tekcitym.engineeringChallenges.map((c) => (
                  <ChallengePill key={c.label} label={c.label} color={c.color} />
                ))}
              </div>
            </div>

            {/* ⑥ Architecture */}
            <div>
              <h4 className="font-mono text-[11px] text-primary uppercase tracking-widest mb-4">
                Architecture
              </h4>
              <div className="grid md:grid-cols-2 gap-6 items-start">
                {/* Diagram slot */}
                <div className="w-full h-56 rounded-xl overflow-hidden border border-glass-border bg-surface-elevated/30 flex items-center justify-center">
                  <img
                    src={tekcitym.architectureImage}
                    alt="TekcitYm architecture diagram"
                    className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const ph = document.createElement('div');
                        ph.className = 'flex flex-col items-center gap-3 text-center px-6';
                        ph.innerHTML = `
                          <span class="material-symbols-outlined text-4xl text-primary/20">schema</span>
                          <span class="font-mono text-[11px] text-text-secondary/40">Architecture diagram</span>
                          <span class="font-mono text-[10px] text-text-secondary/30">/images/projects/tekcitym-arch.png</span>
                        `;
                        parent.appendChild(ph);
                      }
                    }}
                  />
                </div>
                {/* Explanation */}
                <div className="space-y-4">
                  <div>
                    <p className="font-mono text-[10px] text-text-secondary uppercase tracking-wider mb-1">Pattern</p>
                    <p className="font-sans text-base font-bold text-primary">{tekcitym.architecture}</p>
                  </div>
                  <p className="text-text-secondary font-body text-sm leading-relaxed">
                    A modular monolith was chosen deliberately over microservices. At the current scale, the overhead of distributed transactions, service discovery, and inter-service latency would add complexity without proportional benefit. Modules are kept strictly bounded so migration to microservices remains a viable future path.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded text-primary font-mono text-[10px]">Bounded Contexts</span>
                    <span className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded text-primary font-mono text-[10px]">Single Deployable</span>
                    <span className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded text-primary font-mono text-[10px]">Future-Migratable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ⑦ Tech Stack */}
            <div>
              <h4 className="font-mono text-[11px] text-primary uppercase tracking-widest mb-6">
                Technology Stack
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tekcitym.stack.map((cat) => (
                  <div key={cat.category} className="bg-surface-elevated/20 border border-glass-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-secondary text-[16px]">{cat.icon}</span>
                      <span className="font-mono text-[10px] text-secondary uppercase tracking-wider">{cat.category}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {cat.items.map((item) => (
                        <li key={item} className="font-mono text-[11px] text-text-primary">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* ⑧ Gallery */}
            <div>
              <h4 className="font-mono text-[11px] text-primary uppercase tracking-widest mb-5">
                Gallery
              </h4>
              <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
                {tekcitym.gallery.map((img) => (
                  <GallerySlot key={img.label} src={img.src} label={img.label} />
                ))}
              </div>
              <p className="font-mono text-[10px] text-text-secondary/30 mt-3">
                Drop screenshots into /public/images/projects/ to populate gallery.
              </p>
            </div>

            {/* ⑨ Links */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-glass-border">
              {tekcitym.github && (
                <a
                  href={tekcitym.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-surface rounded-lg font-mono text-[12px] font-bold uppercase tracking-wider hover:bg-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  GitHub
                </a>
              )}
              {tekcitym.liveDemo && (
                <a
                  href={tekcitym.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary/40 text-primary rounded-lg font-mono text-[12px] font-bold uppercase tracking-wider hover:bg-primary/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  Live Demo
                </a>
              )}
              {tekcitym.designDoc && (
                <a
                  href={tekcitym.designDoc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-glass-border text-text-secondary rounded-lg font-mono text-[12px] uppercase tracking-wider hover:border-primary/40 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">description</span>
                  Design Doc
                </a>
              )}
              {/* Show placeholder note when no links are set yet */}
              {!tekcitym.github && !tekcitym.liveDemo && !tekcitym.designDoc && (
                <span className="font-mono text-[11px] text-text-secondary/40 italic">
                  Links will be added when the project reaches a stable milestone.
                </span>
              )}
            </div>

          </div>
        </div>

        {/* ── SECONDARY: Private Project ── */}
        {/* <div className="glass-card rounded-xl p-6 border border-dashed border-glass-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 opacity-70 hover:opacity-90 transition-opacity">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-elevated/50 border border-glass-border flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-text-secondary/50 text-[18px]">lock</span>
            </div>
            <div>
              <h4 className="font-sans font-bold text-text-primary text-base">Private Project</h4>
              <p className="text-text-secondary text-sm font-body mt-0.5">
                Currently under development. Details will be published when the project reaches a stable milestone.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 border border-glass-border text-text-secondary/60 font-mono text-[10px] rounded-full uppercase shrink-0">
            In Progress
          </span>
        </div> */}

      </div>
    </AnimatedSection>
  );
}
