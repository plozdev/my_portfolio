import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface Chip { label: string }
interface NodeImage { src: string; caption: string }

interface TimelineNode {
  period: string;
  title: string;
  subtitle: string;
  story: string;
  chips?: Chip[];
  featuredImage?: NodeImage;
  thumbs?: NodeImage[];
}

const nodes: TimelineNode[] = [
  {
    period: 'Sep 2021 – May 2024',
    title: 'Nguyen Tat Thanh High School for the Gifted',
    subtitle: 'IT Specialization',
    story:
      'Started programming seriously here. Our class was IT-specialized, which meant more theory than most high schools — but it gave me the foundations I actually needed when things got harder later.',
    chips: [
      { label: '1st Prize – Provincial Science & Engineering Fair 2023–2024' },
      { label: 'National Participant – Science & Engineering Fair 2023–2024' },
    ],
    featuredImage: {
      src: '/images/achievements/highschool-provincial.jpg',
      caption: '1st Prize Certificate – Provincial Level',
    },
    thumbs: [
      { src: '/images/achievements/highschool-national.jpg', caption: 'National Round' },
    ],
  },
  {
    period: 'Sep 2024 – Aug 2027 (Expected)',
    title: 'FPT University Ho Chi Minh City',
    subtitle: 'Bachelor of Software Engineering',
    story:
  'University became the place where theory turned into practice. Beyond coursework, I challenged myself through competitive programming, hackathons, community leadership, and real-world software development. ICPC strengthened my algorithmic thinking, hackathons taught me rapid product iteration, and leading GDGoC helped me develop communication and organizational skills alongside technical growth.',
    chips: [
      { label: 'FPT University Merit Scholarship' },
      { label: 'ICPC Asia HCMC Regional 2025 • Top 59' },
      { label: 'ICPC Vietnam National 2025 • Top 171' },
      { label: 'ICPC Vietnam Southern Provincial 2025 • Top 18' },
      { label: 'Top 3 • AI Innovation Hackathon 2025' },
      { label: 'Chapter Lead • GDGoC FPTU HCMC' },
    ],
    featuredImage: {
      src: '/images/achievements/ai-innovation-hackathon-2025.jpg',
      caption: 'AI Innovation Hackathon 2025 – Top 3',
    },
    thumbs: [
    {
      src: '/images/achievements/icpc-regional-2025.jpg',
      caption: 'ICPC Asia HCMC Regional 2025',
    },
    {
      src: '/images/community/gdgoc-fptu.jpg',
      caption: 'GDGoC FPTU HCMC',
    },
  ],
  },
  {
    period: 'May 2026 – Aug 2026',
    title: 'FPT Software',
    subtitle: 'Software Engineer Intern',
    story:
      'My first production software experience. I work on a Java legacy system for a Japanese client — large codebase, strict processes, real users. The biggest adjustment was learning that reading and understanding code matters as much as writing it. Enterprise software ages differently than personal projects.',
    chips: [
      { label: 'Enterprise Java System' },
      { label: 'Japanese Client' },
      { label: 'Apache Struts + Oracle DB' },
      { label: '20–30 person team' },
    ],
    featuredImage: {
      src: '/images/experience/fpt-software-office.jpg',
      caption: 'FPT Software',
    },
  },
];

function ImageSlot({ src, caption, className = '' }: NodeImage & { className?: string }) {
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

export function Journey() {
  return (
    <AnimatedSection id="journey" className="py-16 bg-background-deep">
      <div className="max-w-[1300px] mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="mb-8">
          <h2 className="font-sans text-3xl leading-tight text-primary font-bold mb-1.5">
            Academic & Career Journey
          </h2>
          <p className="font-mono text-[11px] text-text-secondary/60 uppercase tracking-widest mb-8">
            2018 → Present
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-primary/20" />

          <div className="space-y-6">
            {nodes.map((node, idx) => (
              <div key={idx} className="relative pl-9 md:pl-12">

                {/* Dot */}
                <div className={`absolute left-0 md:left-1 top-5 w-6 h-6 rounded-full border-4 border-surface z-10 flex items-center justify-center
                  ${idx === nodes.length - 1 ? 'bg-primary pulse-node' : 'bg-primary/70'}`}
                />

                {/* Card */}
                <div className="glass-card rounded-xl border border-glass-border hover:border-primary/25 transition-colors overflow-hidden">
                  {/* Card header */}
                  <div className="px-5 pt-4 pb-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] text-secondary uppercase tracking-wider">{node.period}</span>
                      <h3 className="font-sans text-lg font-bold text-primary mt-0.5 leading-tight">{node.title}</h3>
                      <p className="font-mono text-[11px] text-text-secondary/70 mt-0.5">{node.subtitle}</p>
                    </div>
                  </div>
                  {/* Body: story + visuals */}
                  <div className="px-5 pb-5 grid md:grid-cols-3 gap-5 items-start">

                    {/* Left: text */}
                    <div className="md:col-span-2 space-y-4">
                      <p className="text-text-secondary font-body text-sm leading-relaxed">{node.story}</p>

                      {/* Achievement chips */}
                      {node.chips && node.chips.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {node.chips.map((chip) => (
                            <span
                              key={chip.label}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/8 border border-primary/20 rounded text-primary font-mono text-[10px]"
                            >
                              <span className="material-symbols-outlined text-[11px]">star</span>
                              {chip.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: images */}
                    {node.featuredImage && (
                      <div className="space-y-2">
                        <ImageSlot
                          src={node.featuredImage.src}
                          caption={node.featuredImage.caption}
                          className="w-full h-36"
                        />
                        {node.thumbs && node.thumbs.length > 0 && (
                          <div className={`grid gap-2 ${node.thumbs.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                            {node.thumbs.map((t) => (
                              <ImageSlot key={t.src} src={t.src} caption={t.caption} className="w-full h-20" />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
