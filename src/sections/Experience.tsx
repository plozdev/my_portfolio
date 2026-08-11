import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights?: string[];
  technologies: string[];
  icon: string;
  logoUrl?: string;
  isCurrent?: boolean;
}

function ExperienceLogo({ logoUrl, company, fallbackIcon }: { logoUrl?: string; company: string; fallbackIcon: string }) {
  const [hasError, setHasError] = useState(false);

  if (!logoUrl || hasError) {
    return <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl">{fallbackIcon}</span>;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanUrl = logoUrl.startsWith('/') ? logoUrl.slice(1) : logoUrl;
  const resolvedUrl = `${cleanBase}${cleanUrl}`;

  return (
    <img
      src={resolvedUrl}
      alt={company}
      className="w-full h-full object-contain"
      onError={() => setHasError(true)}
    />
  );
}

const experiences: ExperienceItem[] = [
  {
    company: 'FPT Software',
    role: 'Software Engineer Intern',
    period: 'May 2026 – Aug 2026',
    location: 'Ho Chi Minh City, Vietnam',
    summary:
      'Worked on a production enterprise Java legacy system for a Japanese client. Responsibilities involved understanding Design Documents and existing code, investigating business logic, fixing bugs and UI issues, and gradually moving into feature implementation alongside BA and QA teams.',
    highlights: [
      'Developed a new master-data management feature end-to-end, implementing client/server-side validation, authorization, transactions, and optimistic concurrency control.',
      'Optimized a complex database query used for CSV exports, improve 70% performance by reducing processing time from 10 seconds to 3 seconds.',
      'Enhanced three existing warehouse management functions based on detailed design specifications, including transaction inquiry, barcode-based stock replenishment, and stock-count correction workflows.',
      'Refactored multi-step handheld-terminal workflows, handling barcode validation, quantity conversions, and concurrency-related error handling.',
      'Reviewed design specifications and conducted functional testing for a CSV-based data ingestion and processing-status module.',
    ],
    technologies: ['Java', 'Apache Struts', 'Apache Ant', 'Oracle Database', 'Git'],
    icon: 'work',
    logoUrl: '/images/companies/fpt-software.png',
    isCurrent: true,
  },
  {
    company: 'FPT University Ho Chi Minh City',
    role: 'Bachelor of Software Engineering',
    period: 'Sep 2024 – Aug 2027 (Exp)',
    location: 'Ho Chi Minh City, Vietnam',
    summary:
      'Focused on software engineering fundamentals, algorithm design, and system architecture. Active in ICPC competitive programming, community leadership, and hackathons.',
    highlights: [
      'Awarded 59th Place at the 2025 ICPC Asia Ho Chi Minh City Regional Contest.',
      "Awarded 18th Place at the 2025 ICPC Vietnam Southern Provincial Programming Contest.",
      'Won Third Prize at the FPTU AI Innovation Hackathon Summer 2025 with team Softelligence.',
      'Serving as Chapter Lead for Google Developer Groups on Campus (GDGoC) at FPTU, managing the community and organizing technical events for students.',
    ],
    technologies: ['C', 'C++', 'Java', 'Spring Boot', 'Algorithms', 'Competitive Programming', 'Software Architecture', 'Git'],
    icon: 'domain',
    logoUrl: '/images/school/fpt-university.png',
  },
  {
    company: 'Nguyen Tat Thanh High School for the Gifted',
    role: 'IT Specialization Student',
    period: 'Sep 2021 – May 2024',
    location: 'Quang Ngai, Vietnam',
    summary:
      'Started programming seriously through an IT-specialized curriculum, building strong problem-solving foundations for competitive programming and software engineering.',
    highlights: [
      'Won First Prize in the Provincial Science & Technology Competition and represented the school at the National round.',
      'Trained with the competitive programming team, studying advanced algorithms and data structures using C++ and Java.',
      'Graduated with an IT-specialized curriculum, establishing solid foundations in computer science and logical problem-solving.',
    ],
    technologies: ['C++', 'Java', 'Python', 'Algorithms', 'Data Structures', 'Competitive Programming'],
    icon: 'school',
    logoUrl: '/images/school/high-school.png',
  },
];

export function Experience() {
  return (
    <AnimatedSection id="experience" className="py-14 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="font-sans text-3xl md:text-4xl leading-tight font-bold text-white flex items-center gap-2">
          <span className="text-primary font-mono select-none">&gt;_</span>
          Experience
        </h2>
        <p className="font-mono text-xs md:text-sm text-text-secondary/70 tracking-wide mt-1">
          Academic &amp; career journey
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative pl-6 md:pl-8 border-l border-primary/25 space-y-6 ml-2 md:ml-4">
        {experiences.map((exp) => (
          <div key={exp.company} className="relative group">
            {/* Timeline Dot */}
            <div
              className={`absolute -left-[31px] md:-left-[39px] top-6 w-4 h-4 rounded-full border-2 border-surface bg-primary z-10 ${
                exp.isCurrent ? 'pulse-node ring-4 ring-primary/20' : 'ring-2 ring-primary/20'
              }`}
            />

            {/* Compact Glass Card */}
            <div className="glass-card p-5 sm:p-6 rounded-2xl border border-glass-border bg-[#0d130d]/95 hover:border-primary/40 transition-colors space-y-3.5">
              {/* Header: Company, Role, Date, Location */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#141f14] border border-[#233823] flex items-center justify-center shrink-0 overflow-hidden shadow-inner p-2">
                    <ExperienceLogo logoUrl={exp.logoUrl} company={exp.company} fallbackIcon={exp.icon} />
                  </div>
                  <div>
                    <h3 className="font-sans text-base sm:text-lg font-bold text-white leading-snug">
                      {exp.company}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-primary font-semibold mt-0.5">
                      {exp.role}
                    </p>
                  </div>
                </div>

                {/* Date Badge & Location */}
                <div className="text-left sm:text-right shrink-0">
                  <span className="font-mono text-xs font-semibold text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 inline-block">
                    {exp.period}
                  </span>
                  {exp.location && (
                    <p className="font-mono text-[11px] text-text-secondary/70 mt-1 flex items-center sm:justify-end gap-1">
                      <span className="material-symbols-outlined text-[13px] text-primary/70">location_on</span>
                      {exp.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Highlights or Summary */}
              {exp.highlights && exp.highlights.length > 0 ? (
                <ul className="space-y-2 text-text-secondary font-body text-xs sm:text-sm leading-relaxed mt-1">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-mono select-none mt-0.5 shrink-0 text-xs">→</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-text-secondary font-body text-xs sm:text-sm leading-relaxed">
                  {exp.summary}
                </p>
              )}

              {/* Compact Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-full border border-white/15 bg-white/5 text-text-secondary font-mono text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Log Note */}
      <div className="mt-10 font-mono text-xs sm:text-sm text-primary/80 flex items-center gap-2">
        <span>&gt;</span>
        <span className="text-primary">experience.log</span>
        <span className="text-text-secondary/70">journey continues...</span>
      </div>
    </AnimatedSection>
  );
}