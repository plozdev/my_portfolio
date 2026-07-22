import { AnimatedSection } from '@/components/ui/AnimatedSection';

const lifecycleSteps = [
  { label: 'Business\nRequirement', icon: 'description' },
  { label: 'Design\nDocument', icon: 'draw' },
  { label: 'Implementation', icon: 'code' },
  { label: 'Testing', icon: 'bug_report' },
  { label: 'Release\nPreparation', icon: 'rocket_launch' },
];

const responsibilities = [
  'Participated in the implementation phase of a production enterprise Java system built for a Japanese client.',
  'Read and interpreted Design Documents (DD) before beginning any implementation work.',
  'Clarified business requirements through discussions with Business Analysts when documentation was unclear.',
  'Reviewed existing modules to understand business logic and overall project architecture before making changes.',
  'Mapped updated Design Documents to the existing codebase to identify what needed to be added or changed.',
  'Started by fixing assigned bugs and UI issues, then gradually took ownership of new feature implementation.',
  'Implemented new features following the established architecture, coding standards, and enterprise conventions.',
  'Worked closely with QA engineers during bug verification, feature validation, regression testing, and release preparation.',
];

const takeaways = [
  { icon: 'schema', text: 'Learned how enterprise features evolve from business requirements through to production software.' },
  { icon: 'manage_search', text: 'Developed the ability to read and understand unfamiliar legacy code before implementing changes.' },
  { icon: 'forum', text: 'Improved communication through discussions with Business Analysts and QA engineers throughout the project.' },
  { icon: 'deployed_code', text: 'Experienced the full implementation phase of a real software project approaching release.' },
  { icon: 'troubleshoot', text: 'Strengthened debugging and analytical thinking while working with production issues in a large codebase.' },
];

const snapshotItems = [
  { label: 'System Type', value: 'Enterprise Legacy System' },
  { label: 'Client', value: 'Japanese Client' },
  { label: 'Phase', value: 'Implementation' },
  { label: 'Status', value: 'Near Release' },
  { label: 'Team Size', value: '20–30 Engineers' },
];

const snapshotTech = ['Java', 'Apache Struts', 'Oracle Database', 'JSP', 'Apache Ant'];

export function Experience() {
  return (
    <AnimatedSection
      id="experience"
      className="py-16 px-5 md:px-8 max-w-[1300px] mx-auto"
    >
      <h2 className="font-sans text-3xl leading-tight text-primary mb-8 font-bold">
        Experience
      </h2>

      <div className="glass-card p-5 md:p-8 rounded-2xl border-l-8 border-l-primary relative">

        {/* Header row: Logo + Title + Date */}
        <div className="flex flex-col md:flex-row justify-between mb-4 gap-5">
          <div className="flex items-center gap-5">
            {/* Company Logo */}
            <div className="w-26 h-16 rounded-xl border border-glass-border bg-surface-elevated/54 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src="/images/companies/fpt-software.png"
                alt="FPT Software"
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const fallback = document.createElement('span');
                    fallback.className = 'font-mono text-primary font-bold text-xs text-center leading-tight px-1';
                    fallback.textContent = 'FPT';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
            <div>
              <p className="font-mono text-[11px] text-text-secondary uppercase tracking-widest mb-1">
                Software Engineer Intern
              </p>
              <h3 className="font-sans text-[28px] font-bold text-primary leading-tight">
                FPT Software
              </h3>
            </div>
          </div>

          <div className="text-left md:text-right shrink-0">
            <p className="font-mono text-text-primary text-sm">May 2026 – Aug 2026</p>
            <p className="text-text-secondary text-sm mt-1">Ho Chi Minh City, Vietnam</p>
          </div>
        </div>

        {/* Project Context Badge */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary font-mono text-[11px] font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[13px]">business_center</span>
            Enterprise Java Legacy System
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 border border-secondary/30 rounded-full text-secondary font-mono text-[11px] font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[13px]">language</span>
            Japanese Client
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-elevated/60 border border-glass-border rounded-full text-text-secondary font-mono text-[11px] font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[13px]">rocket_launch</span>
            Near Release
          </span>
        </div>

        {/* Development Lifecycle */}
        <div className="mb-6 p-4 rounded-xl bg-surface-elevated/30 border border-glass-border">
          <h4 className="font-mono text-primary mb-4 uppercase tracking-widest text-[11px]">
            Development Lifecycle
          </h4>
          <div className="flex flex-col sm:flex-row items-center gap-0 overflow-x-auto scrollbar-hide">
            {lifecycleSteps.map((step, i) => (
              <div key={step.label} className="flex flex-col sm:flex-row items-center flex-1 min-w-0">
                {/* Step node */}
                <div className="flex flex-col items-center text-center group flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-1.5 group-hover:bg-primary/20 group-hover:border-primary/60 transition-all duration-200">
                    <span className="material-symbols-outlined text-primary text-[18px]">{step.icon}</span>
                  </div>
                  <span className="font-mono text-[10px] text-text-secondary leading-tight whitespace-pre-line max-w-[72px]">
                    {step.label}
                  </span>
                </div>

                {/* Arrow connector (not after last step) */}
                {i < lifecycleSteps.length - 1 && (
                  <div className="flex flex-col sm:flex-row items-center my-2 sm:my-0 sm:mx-2 flex-1">
                    {/* vertical line on mobile */}
                    <div className="sm:hidden w-px h-4 bg-gradient-to-b from-primary/50 to-primary/20" />
                    {/* horizontal line on desktop */}
                    <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-primary/40 to-primary/10" />
                    <span className="material-symbols-outlined text-primary/40 text-[14px] sm:rotate-0 rotate-90 sm:mx-0.5">
                      arrow_forward
                    </span>
                    <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-primary/10 to-primary/40" />
                    <div className="sm:hidden w-px h-4 bg-gradient-to-b from-primary/20 to-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2 space-y-5">

            {/* What I Worked On */}
            <div>
              <h4 className="font-mono text-primary mb-3 uppercase tracking-widest text-[11px]">
                What I Worked On
              </h4>
              <ul className="space-y-3 text-text-secondary font-body">
                {responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary/60 text-[16px] mt-0.5 shrink-0">chevron_right</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Engineering Takeaways */}
            <div>
              <h4 className="font-mono text-primary mb-3 uppercase tracking-widest text-[11px]">
                Engineering Takeaways
              </h4>
              <ul className="space-y-2 text-text-secondary font-body">
                {takeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-[15px] mt-0.5 shrink-0">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Side panel */}
          <div className="bg-surface-elevated/50 p-4 rounded-xl border border-glass-border space-y-4">

            {/* Technologies */}
            <div>
              <h4 className="font-mono text-primary mb-3 uppercase tracking-widest text-[11px]">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Java', 'Apache Struts', 'Apache Ant', 'Oracle DB', 'JSP', 'HTML', 'Git'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded text-primary font-mono text-[11px] hover:bg-primary/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Snapshot */}
            <div className="pt-4 border-t border-glass-border">
              <h4 className="font-mono text-primary mb-3 uppercase tracking-widest text-[11px]">
                Project Snapshot
              </h4>
              <div className="rounded-xl border border-glass-border bg-surface-elevated/40 overflow-hidden">
                {/* Snapshot header bar */}
                <div className="px-3 py-2 bg-primary/10 border-b border-glass-border flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[14px]">terminal</span>
                  <span className="font-mono text-primary text-[10px] uppercase tracking-widest">project.snapshot</span>
                </div>

                {/* Snapshot rows */}
                <div className="divide-y divide-glass-border">
                  {snapshotItems.map((item) => (
                    <div key={item.label} className="flex justify-between items-center px-3 py-2 gap-2">
                      <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wide shrink-0">
                        {item.label}
                      </span>
                      <span className="font-mono text-[11px] text-primary text-right leading-tight">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech pills at bottom */}
                <div className="px-3 py-2.5 border-t border-glass-border bg-surface-elevated/20">
                  <div className="flex flex-wrap gap-1.5">
                    {snapshotTech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 font-mono text-[10px] text-primary/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}