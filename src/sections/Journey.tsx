import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface Chip { label: string }

interface TimelineNode {
  period: string;
  title: string;
  subtitle: string;
  story: string;
  chips?: Chip[];
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
    ]
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
    ]
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
    ]
  },
];

export function Journey() {
  return (
    <AnimatedSection id="journey" className="py-14 bg-background-deep">
      <div className="max-w-4xl mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="mb-6">
          <h2 className="font-sans text-2xl md:text-3xl leading-tight text-primary font-bold mb-1">
            Academic & Career Journey
          </h2>
          <p className="font-mono text-[10px] text-text-secondary/60 uppercase tracking-widest mb-6">
            2018 → Present
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 md:left-3.5 top-0 bottom-0 w-px bg-primary/20" />

          <div className="space-y-5">
            {nodes.map((node, idx) => (
              <div key={idx} className="relative pl-8 md:pl-10">

                {/* Dot */}
                <div className={`absolute left-0 md:left-0.5 top-4 w-5 h-5 rounded-full border-2 border-surface z-10 flex items-center justify-center
                  ${idx === nodes.length - 1 ? 'bg-primary pulse-node' : 'bg-primary/70'}`}
                />

                {/* Card */}
                <div className="glass-card rounded-xl border border-glass-border hover:border-primary/25 transition-colors overflow-hidden">
                  {/* Card header */}
                  <div className="px-4.5 pt-3.5 pb-2.5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                    <div>
                      <span className="font-mono text-[10px] text-secondary uppercase tracking-wider">{node.period}</span>
                      <h3 className="font-sans text-base md:text-lg font-bold text-primary mt-0.5 leading-tight">{node.title}</h3>
                      <p className="font-mono text-[11px] text-text-secondary/70 mt-0.5">{node.subtitle}</p>
                    </div>
                  </div>
                  {/* Body: story + visuals */}
                  <div className="px-4.5 pb-4">

                    {/* Text */}
                    <div className="space-y-3">
                      <p className="text-text-secondary font-body text-xs md:text-sm leading-relaxed">{node.story}</p>

                      {/* Achievement chips */}
                      {node.chips && node.chips.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {node.chips.map((chip) => (
                            <span
                              key={chip.label}
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/8 border border-primary/20 rounded text-primary font-mono text-[10px]"
                            >
                              <span className="material-symbols-outlined text-[10px]">star</span>
                              {chip.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
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
