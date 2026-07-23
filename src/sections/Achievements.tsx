import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

/* ─────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────── */
interface AchievementImg {
  src: string;
  caption: string;
}

interface AchievementItem {
  id: string;
  icon: string;
  iconColor: 'primary' | 'secondary' | 'gold';
  category: string;
  /** Short rank/result badge shown on the card header */
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
   Data
   Image paths follow the convention:
     /images/achievements/<id>-<type>.jpg
   Drop the actual files into /public/images/achievements/ and they
   will appear automatically.  Cards gracefully show a placeholder
   when the file is missing.
───────────────────────────────────────────────────────────────── */
const achievements: AchievementItem[] = [

  /* ── Competitive Programming ───────────────────────────────── */
  {
    id: 'icpc-asia-hcmc-2025',
    icon: 'emoji_events',
    iconColor: 'gold',
    category: 'Competitive Programming',
    badge: 'Top 59',
    title: 'ICPC Asia Ho Chi Minh City Regional Contest 2025',
    org: 'ICPC',
    date: 'December 2025',
    team: 'FPTU HCM – Dolphin',
    summary:
      'Placed Top 59 at the Asia Regional level — the highest tier of the ICPC circuit — competing alongside teams from universities across the Asia-Pacific region.',
    description:
      'The Asia Regional is the stage directly below the ICPC World Finals. Problems at this level demand mastery of advanced graph algorithms, computational geometry, string processing, and combinatorics. Our team of three coordinated problem assignments in real time, each taking ownership of problems matched to individual strengths while supporting each other on the hardest cases.',
    learned:
      'At this level there is no safety net for slow thinking. I learned to rapidly triage an unseen problem set, commit to a solution approach within minutes, and stay composed when an implementation fails at the last sample. The discipline of writing correct code fast — not just thinking correctly — became the main bottleneck to address.',
    images: [
      { src: '/images/achievements/icpc-asia-hcmc-2025-certificate.jpg', caption: 'Certificate – ICPC Asia HCMC Regional 2025' },
      { src: '/images/achievements/icpc-asia-hcmc-2025-photo.jpg',       caption: 'Contest Photo – ICPC Asia HCMC Regional 2025' },
    ],
  },

  {
    id: 'icpc-national-2025',
    icon: 'emoji_events',
    iconColor: 'primary',
    category: 'Competitive Programming',
    badge: 'Top 171',
    title: 'ICPC Vietnam National Programming Contest 2025',
    org: 'ICPC Vietnam',
    date: 'November 2025',
    team: 'FPTU HCM – Dolphin',
    summary:
      'Placed Top 171 nationally at the ICPC Vietnam National Contest, qualifying the team for the Asia Regional round.',
    description:
      'The National Contest serves as the qualifying stage for Asia Regional selection. Teams across Vietnam compete under the same ICPC rules — five hours, one machine, and a problem set spanning difficulty from warm-up to near-impossible. Our result at this stage secured our invitation to the HCMC Asia Regional in December.',
    learned:
      'I developed a clearer model for team communication under a shared workstation constraint: when one person is coding, the others must be reading ahead or verifying edge cases on paper. Switching context efficiently between problems — without losing track of partial solutions — became a deliberate practice rather than an improvised one.',
    images: [
      { src: '/images/achievements/icpc-national-2025-certificate.jpg', caption: 'Certificate – ICPC Vietnam National 2025' },
      { src: '/images/achievements/icpc-national-2025-photo.jpg',       caption: 'Contest Photo – ICPC Vietnam National 2025' },
    ],
  },

  {
    id: 'icpc-southern-2025',
    icon: 'military_tech',
    iconColor: 'secondary',
    category: 'Competitive Programming',
    badge: 'Top 18',
    title: 'ICPC Vietnam Southern Provincial Contest 2025',
    org: 'ICPC Vietnam',
    date: 'October 2025',
    team: 'FPTU HCM – Dolphin',
    summary:
      'Placed Top 18 in the Southern Provincial round — the regional qualifier — earning a direct spot in the National Contest.',
    description:
      'The Southern Provincial is the entry point of the ICPC Vietnam circuit, contested by teams from universities across the southern provinces. A Top 18 result here placed us comfortably in the national qualification bracket and validated the team\'s readiness to compete at progressively harder stages.',
    learned:
      'Provincial-level problems test breadth: you must be competent across many algorithm families rather than deep in a few. I used this contest to audit gaps in our team\'s coverage — identifying which problem types we consistently deferred or misread — and brought that analysis into our preparation for the National round.',
    images: [
      { src: '/images/achievements/icpc-southern-2025-certificate.jpg', caption: 'Certificate – ICPC Southern Provincial 2025' },
      { src: '/images/achievements/icpc-southern-2025-photo.jpg',       caption: 'Contest Photo – ICPC Southern Provincial 2025' },
    ],
  },

  /* ── Hackathon ──────────────────────────────────────────────── */
  {
    id: 'ai-hackathon-fptu-2025',
    icon: 'workspace_premium',
    iconColor: 'primary',
    category: 'Hackathon',
    badge: 'Top 3',
    title: 'AI Innovation Hackathon 2025',
    org: 'FPT University',
    date: '2025',
    summary:
      'Finished Top 3 as Team Leader at FPT University\'s AI Innovation Hackathon, leading the team from ideation through final presentation.',
    description:
      'I led a small team through the full hackathon cycle: framing the problem, deciding what to build given the time constraint, splitting implementation work, and presenting to a panel of judges. The project centred on an AI-assisted feature with a working demo delivered at the end of the event. My role covered both coordinating the team and contributing directly to the technical implementation.',
    learned:
      'Leading under time pressure is different from leading with a roadmap. The decisions that matter most are the ones to cut, not the ones to add. I learned to hold the team\'s scope firmly, redirect effort when an approach was taking too long, and prepare a presentation that communicated the core idea clearly to a non-technical jury — all within the same compressed timeline.',
    images: [
      { src: '/images/achievements/ai-hackathon-fptu-2025-certificate.jpg', caption: 'Certificate – AI Innovation Hackathon 2025' },
      { src: '/images/achievements/ai-hackathon-fptu-2025-badge.jpg',       caption: 'Leader Badge – AI Innovation Hackathon 2025' },
    ],
  },

  /* ── Academic ───────────────────────────────────────────────── */
  {
    id: 'fpt-scholarship',
    icon: 'school',
    iconColor: 'secondary',
    category: 'Academic',
    title: 'FPT University Scholarship',
    org: 'FPT University',
    date: '2021 – Present',
    summary:
      'Awarded a merit-based scholarship at FPT University in recognition of academic performance.',
    description:
      'The scholarship is awarded to students who demonstrate consistent academic standing at FPT University. Maintaining eligibility across semesters requires balancing coursework with the extracurricular activity that drives the rest of this section.',
    images: [
      { src: '/images/achievements/fpt-scholarship.jpg', caption: 'FPT University Scholarship' },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────
   Badge colour helper
───────────────────────────────────────────────────────────────── */
const BADGE_STYLES: Record<string, string> = {
  'Top 3':   'bg-amber-500/15 border-amber-400/40 text-amber-300',
  'Top 18':  'bg-primary/10  border-primary/30   text-primary',
  'Top 59':  'bg-primary/10  border-primary/30   text-primary',
  'Top 171': 'bg-surface-variant/60 border-glass-border text-text-secondary',
};
function badgeStyle(badge: string): string {
  return BADGE_STYLES[badge] ?? 'bg-surface-variant/60 border-glass-border text-text-secondary';
}

/* ─────────────────────────────────────────────────────────────────
   Image slot — shows a labelled placeholder when src 404s
───────────────────────────────────────────────────────────────── */
function ImageSlot({ src, caption }: AchievementImg) {
  return (
    <div className="rounded-lg overflow-hidden border border-glass-border bg-surface-elevated/20 h-40 flex items-center justify-center relative group/img">
      <img
        src={src}
        alt={caption}
        className="w-full h-full object-cover opacity-75 group-hover/img:opacity-100 transition-opacity duration-300"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const p = e.currentTarget.parentElement;
          if (p) {
            const ph = document.createElement('div');
            ph.className =
              'flex flex-col items-center gap-2 text-center px-3 w-full h-full justify-center';
            ph.innerHTML = `
              <span class="material-symbols-outlined text-2xl text-primary/20">add_photo_alternate</span>
              <span class="font-mono text-[10px] text-text-secondary/30 leading-tight">${caption}</span>
            `;
            p.appendChild(ph);
          }
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Card
───────────────────────────────────────────────────────────────── */
function AchievementCard({ item }: { item: AchievementItem }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = !!(
    item.description ||
    item.learned ||
    (item.images && item.images.length > 0) ||
    item.certificate
  );

  const iconColourCls =
    item.iconColor === 'gold'
      ? 'bg-amber-500/10 border-amber-400/30 text-amber-300'
      : item.iconColor === 'primary'
      ? 'bg-primary/10 border-primary/20 text-primary'
      : 'bg-secondary/10 border-secondary/20 text-secondary';

  return (
    <div
      className={`glass-card rounded-xl border transition-all duration-300 ${
        expanded ? 'border-primary/30' : 'border-glass-border hover:border-primary/20'
      }`}
    >
      {/* ── Header — always visible ── */}
      <div className="p-5 flex items-start gap-4">
        {/* Icon */}
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${iconColourCls}`}>
          <span className={`material-symbols-outlined text-[18px]`}>{item.icon}</span>
        </div>

        {/* Text block */}
        <div className="flex-1 min-w-0">
          {/* Meta row */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-mono text-[10px] text-text-secondary/60 uppercase tracking-wider">
              {item.category}
            </span>
            <span className="font-mono text-[10px] text-text-secondary/40">·</span>
            <span className="font-mono text-[10px] text-text-secondary/60">{item.date}</span>
            {item.badge && (
              <>
                <span className="font-mono text-[10px] text-text-secondary/40">·</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full border font-mono text-[10px] font-bold ${badgeStyle(item.badge)}`}>
                  {item.badge}
                </span>
              </>
            )}
          </div>

          <h4 className="font-sans font-bold text-text-primary text-sm leading-snug">{item.title}</h4>

          {/* Org + team */}
          <div className="flex items-center gap-2 flex-wrap mt-0.5">
            <span className="font-mono text-[11px] text-secondary">{item.org}</span>
            {item.team && (
              <>
                <span className="font-mono text-[10px] text-text-secondary/40">·</span>
                <span className="font-mono text-[11px] text-text-secondary/60">{item.team}</span>
              </>
            )}
          </div>

          <p className="text-text-secondary text-[12px] font-body mt-2 leading-relaxed">{item.summary}</p>
        </div>

        {/* Expand toggle */}
        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="shrink-0 mt-1 text-text-secondary/40 hover:text-primary transition-colors"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="material-symbols-outlined text-[18px] inline-block"
            >
              expand_more
            </motion.span>
          </button>
        )}
      </div>

      {/* ── Expanded content — animated ── */}
      <AnimatePresence initial={false}>
        {expanded && hasMore && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-5 border-t border-glass-border pt-4 space-y-4">
              {item.description && (
                <p className="text-text-secondary font-body text-sm leading-relaxed">{item.description}</p>
              )}

              {item.learned && (
                <div>
                  <p className="font-mono text-[10px] text-primary uppercase tracking-wider mb-1.5">
                    What I gained
                  </p>
                  <p className="text-text-secondary font-body text-sm leading-relaxed">{item.learned}</p>
                </div>
              )}

              {item.images && item.images.length > 0 && (
                <div className={`grid gap-3 ${item.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {item.images.map((img) => (
                    <ImageSlot key={img.src} {...img} />
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────────── */
const CATEGORY_ORDER = ['Competitive Programming', 'Hackathon', 'Academic'];

export function Achievements() {
  const byCategory = achievements.reduce<Record<string, AchievementItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const orderedCategories = CATEGORY_ORDER.filter(c => byCategory[c]);

  return (
    <AnimatedSection id="achievements" className="py-16 px-5 md:px-8 max-w-[1300px] mx-auto">
      <h2 className="font-sans text-3xl leading-tight text-primary mb-2 font-bold">Achievements</h2>
      <p className="text-text-secondary font-body text-sm mb-10 max-w-xl">
        Competitive programming results, hackathon placements, and academic recognitions — each
        entry reflects a concrete outcome and what I took away from the experience.
      </p>

      <div className="space-y-8">
        {orderedCategories.map((category) => (
          <div key={category}>
            <h3 className="font-mono text-[11px] text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-secondary/40" />
              {category}
            </h3>
            {/* Two fully independent flex columns — expanding one card never affects the other column */}
            <div className="hidden sm:flex gap-2.5 items-start">
              {/* Left column: items at even indices */}
              <div className="flex-1 flex flex-col gap-2.5">
                {byCategory[category]
                  .filter((_, i) => i % 2 === 0)
                  .map((item) => (
                    <AchievementCard key={item.id} item={item} />
                  ))}
              </div>
              {/* Right column: items at odd indices */}
              <div className="flex-1 flex flex-col gap-2.5">
                {byCategory[category]
                  .filter((_, i) => i % 2 === 1)
                  .map((item) => (
                    <AchievementCard key={item.id} item={item} />
                  ))}
              </div>
            </div>
            {/* Mobile: single column */}
            <div className="sm:hidden flex flex-col gap-2.5">
              {byCategory[category].map((item) => (
                <AchievementCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
