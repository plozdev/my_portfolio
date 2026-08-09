import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

/* ─────────────────────────────────────────────────────────────────
   Types for Achievement & Experience Data
───────────────────────────────────────────────────────────────── */
interface AchievementImg {
  src: string;
  caption: string;
}

interface AchievementItem {
  id: string;
  icon: string;
  iconColor: 'primary' | 'secondary' | 'gold';
  category: 'Academic' | 'Competitive Programming' | 'Other' | 'Hackathon';
  badge?: string;
  title: string;
  org: string;
  date: string;
  team?: string;
  summary: string;
  description?: string;
  learned?: string;
  images?: AchievementImg[];
  certificate?: string;
}

/* ─────────────────────────────────────────────────────────────────
   FPT Software Experience Data
───────────────────────────────────────────────────────────────── */
const fptResponsibilities = [
  'Read Design Documents (DD) and mapped requirements to existing codebase before implementation.',
  'Reviewed legacy modules and business logic to ensure seamless integration with enterprise architecture.',
  'Fixed assigned UI defects and backend bugs, then gradually took ownership of new feature implementation.',
  'Worked closely with Business Analysts (BAs) and QA engineers throughout feature development, testing, and release preparation.',
];

const fptTakeaways = [
  { icon: 'schema', text: 'Learned how enterprise features evolve from business requirements through to production software.' },
  { icon: 'manage_search', text: 'Developed the ability to read, navigate, and debug unfamiliar legacy codebases.' },
];

const fptSnapshotItems = [
  { label: 'System Type', value: 'Enterprise Legacy System' },
  { label: 'Client', value: 'Japanese Client' },
  { label: 'Phase', value: 'Implementation' },
  { label: 'Status', value: 'Near Release' },
  { label: 'Team Size', value: '20–30 Engineers' },
];

const fptTechnologies = ['Java', 'Apache Struts', 'JSP', 'Oracle DB', 'Git', 'HTML', 'Apache Ant'];

/* ─────────────────────────────────────────────────────────────────
   Achievement Items for FPT University Era
───────────────────────────────────────────────────────────────── */
const fptuAchievements: AchievementItem[] = [
  /* Academic */
  {
    id: 'fpt-scholarship',
    icon: 'school',
    iconColor: 'secondary',
    category: 'Academic',
    badge: 'MERIT',
    title: 'FPT University Merit Scholarship',
    org: 'FPT University',
    date: 'Sept 2024 – Oct 2027',
    summary: 'Awarded a merit-based scholarship at FPT University in recognition of strong academic standing.',
    description: 'The scholarship is awarded to students who demonstrate consistent academic performance at FPT University. Maintaining eligibility requires balancing rigorous coursework with competitive programming and community leadership commitments.',
    learned: 'Maintaining consistency under a heavy workload taught me time management and prioritized focus.',
    images: [{ src: '/images/achievements/fpt-scholarship.jpg', caption: 'FPT University Scholarship' }],
  },

  /* Competitive Programming */
  {
    id: 'icpc-asia-hcmc-2025',
    icon: 'emoji_events',
    iconColor: 'gold',
    category: 'Competitive Programming',
    badge: 'TOP 59',
    title: 'ICPC Asia Ho Chi Minh City Regional Contest 2025',
    org: 'ICPC',
    date: 'December 2025',
    team: 'FPTU HCM – Dolphin',
    summary: 'Placed Top 59 at the Asia Regional level — the highest tier of the ICPC circuit — competing alongside top university teams across Asia-Pacific.',
    description: 'The Asia Regional is the stage directly below the ICPC World Finals. Problems demand mastery of advanced graph algorithms, computational geometry, string processing, and combinatorics. Our team of three coordinated problem assignments in real time under strict 5-hour single-workstation constraints.',
    learned: 'At this level there is no safety net for slow execution. I learned to rapidly triage an unseen problem set, commit to a solution approach within minutes, and stay composed when implementations fail at edge cases.',
    images: [
      { src: '/images/achievements/icpc-asia-hcmc-2025-certificate.png', caption: 'Certificate – ICPC Asia HCMC Regional 2025' },
      { src: '/images/achievements/icpc-asia-hcmc-2025-photo.jpg', caption: 'Contest Photo – ICPC Asia HCMC Regional 2025' },
    ],
  },
  {
    id: 'icpc-national-2025',
    icon: 'emoji_events',
    iconColor: 'primary',
    category: 'Competitive Programming',
    badge: 'TOP 171',
    title: 'ICPC Vietnam National Programming Contest 2025',
    org: 'ICPC Vietnam',
    date: 'November 2025',
    team: 'FPTU HCM – Dolphin',
    summary: 'Placed Top 171 nationally at the ICPC Vietnam National Contest, earning qualification for the Asia Regional round.',
    description: 'The National Contest serves as the primary qualifying stage for Asia Regional selection. Teams across Vietnam compete under standard ICPC rules over 5 hours with a single machine.',
    learned: 'Developed a clear team workflow under workstation constraints: when one member codes, others verify edge cases or solve next problems on paper.',
    images: [
      { src: '/images/achievements/icpc-national-2025-certificate.jpg', caption: 'Certificate – ICPC Vietnam National 2025' },
      { src: '/images/achievements/icpc-national-2025-photo.jpg', caption: 'Contest Photo – ICPC Vietnam National 2025' },
    ],
  },
  {
    id: 'icpc-southern-2025',
    icon: 'military_tech',
    iconColor: 'secondary',
    category: 'Competitive Programming',
    badge: 'TOP 18',
    title: 'ICPC Vietnam Southern Provincial Contest 2025',
    org: 'ICPC Vietnam',
    date: 'October 2025',
    team: 'FPTU HCM – Dolphin',
    summary: 'Placed Top 18 in the Southern Provincial round, securing direct advancement to the National Contest.',
    description: 'The Southern Provincial is the regional qualifier contested by teams from universities across southern Vietnam.',
    learned: 'Provincial-level problems test algorithm breadth: success requires competence across many problem families rather than deep specialization in a few.',
    images: [
      { src: '/images/achievements/icpc-southern-2025-certificate.jpg', caption: 'Certificate – ICPC Southern Provincial 2025' },
      { src: '/images/achievements/icpc-southern-2025-photo.jpg', caption: 'Contest Photo – ICPC Southern Provincial 2025' },
    ],
  },

  /* Other */
  {
    id: 'ai-hackathon-fptu-2025',
    icon: 'workspace_premium',
    iconColor: 'primary',
    category: 'Other',
    badge: 'TOP 3',
    title: 'AI Innovation Hackathon 2025',
    org: 'FPT University',
    date: '2025',
    team: 'Team Leader',
    summary: 'Finished Top 3 as Team Leader at FPT University AI Innovation Hackathon, guiding the team from ideation to final pitch.',
    description: 'Led a team through the full hackathon sprint: framing the AI solution, scoping features for rapid execution, building a working prototype, and pitching to a panel of judges.',
    learned: 'Leading under time pressure requires ruthless scope control. The decisions to cut features matter more than the decisions to add them.',
    images: [
      { src: '/images/achievements/ai-hackathon-fptu-2025-certificate.jpg', caption: 'Certificate – AI Innovation Hackathon 2025' },
      { src: '/images/achievements/ai-hackathon-fptu-2025-badge.jpg', caption: 'Leader Badge – AI Innovation Hackathon 2025' },
    ],
  },
  {
    id: 'gdgoc-chapter-lead',
    icon: 'groups',
    iconColor: 'secondary',
    category: 'Other',
    badge: 'CHAPTER LEAD',
    title: 'GDGoC FPTU HCMC — Chapter Lead',
    org: 'Google Developer Groups on Campus',
    date: '2024 – Present',
    summary: 'Led the Google Developer Group on Campus at FPTU HCMC, organizing technical workshops, events, and student developer initiatives.',
    description: 'Managed community activities, organized hands-on developer workshops, coordinated events with industry speakers, and built an active peer-learning community for software engineering students.',
    learned: 'Developed organization, public speaking, and community leadership capabilities alongside technical growth.',
  },
];

/* ─────────────────────────────────────────────────────────────────
   Image slot helper for modal
───────────────────────────────────────────────────────────────── */
function ImageSlot({ src, caption }: AchievementImg) {
  return (
    <div className="rounded-lg overflow-hidden border border-glass-border bg-surface-elevated/30 h-44 flex items-center justify-center relative group/img">
      <img
        src={src}
        alt={caption}
        className="w-full h-full object-cover opacity-85 group-hover/img:opacity-100 transition-opacity duration-300"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const p = e.currentTarget.parentElement;
          if (p) {
            const ph = document.createElement('div');
            ph.className = 'flex flex-col items-center gap-2 text-center px-3 w-full h-full justify-center';
            ph.innerHTML = `
              <span class="material-symbols-outlined text-2xl text-primary/30">add_photo_alternate</span>
              <span class="font-mono text-[10px] text-text-secondary/50 leading-tight">${caption}</span>
            `;
            p.appendChild(ph);
          }
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Achievement Detail Modal
───────────────────────────────────────────────────────────────── */
function AchievementModal({
  item,
  onClose,
}: {
  item: AchievementItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const iconColourCls =
    item.iconColor === 'gold'
      ? 'bg-amber-500/10 border-amber-400/30 text-amber-300'
      : item.iconColor === 'primary'
      ? 'bg-primary/10 border-primary/20 text-primary'
      : 'bg-secondary/10 border-secondary/20 text-secondary';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background-deep/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full max-w-2xl bg-[#0d1117]/95 border border-glass-border rounded-2xl shadow-2xl overflow-hidden z-10 p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-glass-border pb-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${iconColourCls}`}>
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-text-secondary/40 text-[10px]">·</span>
                  <span className="font-mono text-[10px] text-text-secondary">{item.date}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-sans font-bold text-white text-base sm:text-lg leading-snug">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-secondary mt-1">
                  <span>{item.org}</span>
                  {item.team && (
                    <>
                      <span className="text-text-secondary/40">·</span>
                      <span className="text-text-secondary">{item.team}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-glass-border text-text-secondary hover:text-white hover:bg-white/10 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="space-y-4 pt-1">
            {/* Summary */}
            <p className="text-text-primary font-body text-xs sm:text-sm leading-relaxed bg-surface-elevated/40 p-3.5 rounded-xl border border-glass-border">
              {item.summary}
            </p>

            {/* Description */}
            {item.description && (
              <div>
                <h4 className="font-mono text-[10px] text-primary uppercase tracking-wider mb-1 font-semibold">
                  Overview & Context
                </h4>
                <p className="text-text-secondary font-body text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}

            {/* What I gained */}
            {item.learned && (
              <div>
                <h4 className="font-mono text-[10px] text-secondary uppercase tracking-wider mb-1 font-semibold">
                  What I Gained
                </h4>
                <p className="text-text-secondary font-body text-xs sm:text-sm leading-relaxed">
                  {item.learned}
                </p>
              </div>
            )}

            {/* Image Gallery */}
            {item.images && item.images.length > 0 && (
              <div className="pt-2">
                <h4 className="font-mono text-[10px] text-text-secondary uppercase tracking-wider mb-2 font-semibold">
                  Evidence & Media
                </h4>
                <div className={`grid gap-3 ${item.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                  {item.images.map((img) => (
                    <ImageSlot key={img.src} {...img} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main Unified Experience Section Component
───────────────────────────────────────────────────────────────── */
export function Experience() {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  const academicItem = fptuAchievements.find((a) => a.category === 'Academic');
  const competitiveItems = fptuAchievements.filter((a) => a.category === 'Competitive Programming');
  const otherItems = fptuAchievements.filter((a) => a.category === 'Other');

  return (
    <AnimatedSection id="experience" className="py-14 px-5 md:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="font-sans text-2xl md:text-3xl leading-tight text-primary font-bold mb-1">
          Experience
        </h2>
        <p className="font-mono text-xs md:text-sm text-text-secondary/75 uppercase tracking-wider">
          The path from competitive programming to production software.
        </p>
      </div>

      {/* Unified Vertical Timeline Container */}
      <div className="relative pl-6 md:pl-8">
        {/* Continuous Vertical Connecting Line */}
        <div className="absolute left-2.5 md:left-3 top-3 bottom-3 w-px bg-primary/25" />

        <div className="space-y-7">
          {/* ───────────────────────────────────────────────────────────
             MILESTONE 1: High School (2021 – 2024)
          ─────────────────────────────────────────────────────────── */}
          <div className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-6 md:-left-8 top-4 w-4 h-4 rounded-full border-2 border-surface bg-primary/70 z-10 flex items-center justify-center" />

            {/* Glass Card */}
            <div className="glass-card p-4 sm:p-5 rounded-xl border border-glass-border hover:border-primary/30 transition-colors space-y-3">
              <div>
                <span className="font-mono text-[11px] text-secondary font-medium uppercase tracking-wider">
                  2021 – 2024
                </span>
                <h3 className="font-sans text-base md:text-lg font-bold text-primary mt-0.5 leading-tight">
                  Nguyen Tat Thanh High School for the Gifted
                </h3>
                <p className="font-mono text-xs text-text-secondary/70 mt-0.5">IT Specialization</p>
              </div>

              <p className="text-text-secondary font-body text-xs md:text-sm leading-relaxed">
                Started programming seriously through an IT-specialized curriculum, building the foundation for competitive programming and software engineering.
              </p>

              {/* Highlight Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary/10 border border-primary/20 rounded-md text-primary font-mono text-[10px]">
                  <span className="material-symbols-outlined text-[11px]">military_tech</span>
                  Provincial Science & Engineering Fair — 1st Prize
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary/10 border border-primary/20 rounded-md text-primary font-mono text-[10px]">
                  <span className="material-symbols-outlined text-[11px]">star</span>
                  National Science & Engineering Fair — Participant
                </span>
              </div>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────
             MILESTONE 2: FPT University (2024 – Present)
          ─────────────────────────────────────────────────────────── */}
          <div className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-6 md:-left-8 top-4 w-4 h-4 rounded-full border-2 border-surface bg-primary/80 z-10 flex items-center justify-center" />

            {/* Glass Card */}
            <div className="glass-card p-4 sm:p-5 rounded-xl border border-glass-border hover:border-primary/30 transition-colors space-y-4">
              <div>
                <span className="font-mono text-[11px] text-secondary font-medium uppercase tracking-wider">
                  2024 – Present
                </span>
                <h3 className="font-sans text-base md:text-lg font-bold text-primary mt-0.5 leading-tight">
                  FPT University Ho Chi Minh City
                </h3>
                <p className="font-mono text-xs text-text-secondary/70 mt-0.5">
                  Bachelor of Software Engineering
                </p>
              </div>

              {/* Achievement Proof Block */}
              <div className="rounded-xl border border-glass-border bg-surface-elevated/40 p-3.5 sm:p-4 space-y-3.5">
                {/* Academic */}
                {academicItem && (
                  <div>
                    <h4 className="font-mono text-[10px] text-text-secondary/60 uppercase tracking-widest mb-1.5 font-semibold">
                      Academic
                    </h4>
                    <div
                      onClick={() => setSelectedAchievement(academicItem)}
                      className="flex items-center justify-between p-2 rounded-lg bg-surface-elevated/60 border border-glass-border hover:border-primary/40 transition-colors cursor-pointer group"
                    >
                      <span className="font-sans text-xs sm:text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                        {academicItem.title}
                      </span>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary shrink-0 ml-2">
                        {academicItem.badge}
                      </span>
                    </div>
                  </div>
                )}

                {/* Competitive Programming */}
                <div>
                  <h4 className="font-mono text-[10px] text-text-secondary/60 uppercase tracking-widest mb-1.5 font-semibold">
                    Competitive Programming
                  </h4>
                  <div className="space-y-1.5">
                    {competitiveItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedAchievement(item)}
                        className="flex items-center justify-between p-2 rounded-lg bg-surface-elevated/60 border border-glass-border hover:border-primary/40 transition-colors cursor-pointer group"
                      >
                        <span className="font-sans text-xs sm:text-sm font-medium text-text-primary group-hover:text-primary transition-colors truncate pr-2">
                          {item.title}
                        </span>
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary shrink-0">
                          {item.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other */}
                <div>
                  <h4 className="font-mono text-[10px] text-text-secondary/60 uppercase tracking-widest mb-1.5 font-semibold">
                    Other
                  </h4>
                  <div className="space-y-1.5">
                    {otherItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedAchievement(item)}
                        className="flex items-center justify-between p-2 rounded-lg bg-surface-elevated/60 border border-glass-border hover:border-primary/40 transition-colors cursor-pointer group"
                      >
                        <span className="font-sans text-xs sm:text-sm font-medium text-text-primary group-hover:text-primary transition-colors truncate pr-2">
                          {item.title}
                        </span>
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary shrink-0">
                          {item.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tip prompt */}
                <p className="font-mono text-[10px] text-text-secondary/50 text-right pt-0.5">
                  Click any milestone above for certificates & detailed breakdown →
                </p>
              </div>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────
             MILESTONE 3: FPT Software (May 2026 – Aug 2026)
          ─────────────────────────────────────────────────────────── */}
          <div className="relative">
            {/* Active Pulsing Dot */}
            <div className="absolute -left-6 md:-left-8 top-4 w-4 h-4 rounded-full border-2 border-surface bg-primary pulse-node z-10 flex items-center justify-center" />

            {/* Professional Experience Glass Card */}
            <div className="glass-card p-4 sm:p-5 rounded-xl border border-glass-border hover:border-primary/30 transition-colors border-l-4 border-l-primary space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-10 rounded-lg border border-glass-border bg-surface-elevated/60 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src="/images/companies/fpt-software.png"
                      alt="FPT Software"
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fallback = document.createElement('span');
                          fallback.className =
                            'font-mono text-primary font-bold text-[10px] text-center leading-tight px-1';
                          fallback.textContent = 'FPT';
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-secondary font-medium uppercase tracking-wider block">
                      Software Engineer Intern
                    </span>
                    <h3 className="font-sans text-base md:text-lg font-bold text-primary leading-tight">
                      FPT Software
                    </h3>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <p className="font-mono text-xs md:text-sm text-text-primary font-medium">May 2026 – Aug 2026</p>
                  <p className="text-text-secondary text-xs mt-0.5">Ho Chi Minh City, Vietnam</p>
                </div>
              </div>

              {/* Story */}
              <p className="text-text-secondary font-body text-xs md:text-sm leading-relaxed">
                My first production software experience. I work on a Java legacy system for a Japanese client — large codebase, strict processes, real users. The biggest adjustment was learning that reading and understanding code matters as much as writing it.
              </p>

              {/* Two-Column Compact Layout */}
              <div className="grid md:grid-cols-12 gap-4 pt-3.5 border-t border-glass-border">
                {/* LEFT COLUMN: Responsibilities & Takeaways */}
                <div className="md:col-span-7 space-y-4">
                  {/* What I Worked On */}
                  <div>
                    <h4 className="font-mono text-primary mb-2 uppercase tracking-widest text-[10px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">task_alt</span>
                      What I Worked On
                    </h4>
                    <ul className="space-y-1 text-text-secondary font-body text-xs leading-relaxed">
                      {fptResponsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-primary/70 text-[12px] mt-0.5 shrink-0">chevron_right</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Engineering Takeaways */}
                  <div>
                    <h4 className="font-mono text-primary mb-2 uppercase tracking-widest text-[10px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">lightbulb</span>
                      Engineering Takeaways
                    </h4>
                    <ul className="space-y-1 text-text-secondary font-body text-xs leading-relaxed">
                      {fptTakeaways.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-secondary text-[12px] mt-0.5 shrink-0">{item.icon}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* RIGHT COLUMN: Technologies & Project Snapshot */}
                <div className="md:col-span-5 space-y-4">
                  {/* Technologies */}
                  <div>
                    <h4 className="font-mono text-primary mb-2 uppercase tracking-widest text-[10px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">code</span>
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {fptTechnologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-primary/10 border border-primary/25 rounded text-primary font-mono text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Snapshot */}
                  <div>
                    <h4 className="font-mono text-primary mb-2 uppercase tracking-widest text-[10px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">terminal</span>
                      Project Snapshot
                    </h4>
                    <div className="rounded-lg border border-glass-border bg-surface-elevated/40 overflow-hidden divide-y divide-glass-border">
                      {fptSnapshotItems.map((item) => (
                        <div key={item.label} className="flex justify-between items-center px-2.5 py-1.5 gap-2">
                          <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wide shrink-0">
                            {item.label}
                          </span>
                          <span className="font-mono text-[10px] text-primary text-right font-medium">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal for Selected Achievement */}
      <AchievementModal item={selectedAchievement} onClose={() => setSelectedAchievement(null)} />
    </AnimatedSection>
  );
}