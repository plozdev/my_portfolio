import { AnimatedSection } from '@/components/ui/AnimatedSection';

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
            <div className="w-14 h-14 rounded-xl border border-glass-border bg-surface-elevated/50 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src="/images/companies/fpt-software-logo.png"
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
            <p className="font-mono text-text-primary text-sm">2026 – Present</p>
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
        </div>

        {/* Highlights */}
        <div className="mb-6 p-4 rounded-xl bg-surface-elevated/30 border border-glass-border">
          <h4 className="font-mono text-primary mb-3 uppercase tracking-widest text-[11px]">
            Highlights
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              'Enterprise Java Project',
              'Legacy System',
              'Japanese Client',
              '20–30 Team Members',
              'Oracle Database',
              'Apache Struts',
            ].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/5 border border-primary/20 rounded text-text-primary font-mono text-[11px]"
              >
                <span className="text-primary">✓</span> {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2 space-y-5">

            <div>
              <h4 className="font-mono text-primary mb-3 uppercase tracking-widest text-[11px]">
                What I Worked On
              </h4>
              <ul className="space-y-3 text-text-secondary font-body">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary/60 text-[16px] mt-0.5 shrink-0">chevron_right</span>
                  Work on a production Java legacy system for a Japanese client, maintaining and extending an existing enterprise application.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary/60 text-[16px] mt-0.5 shrink-0">chevron_right</span>
                  Read and understand existing business logic before implementing changes or fixing defects.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary/60 text-[16px] mt-0.5 shrink-0">chevron_right</span>
                  Investigate and resolve assigned UI issues within a large legacy codebase built with Apache Struts, JSP, and Oracle Database.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary/60 text-[16px] mt-0.5 shrink-0">chevron_right</span>
                  Implement assigned features while following the existing architecture, coding standards, and enterprise development workflow.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary/60 text-[16px] mt-0.5 shrink-0">chevron_right</span>
                  Collaborate closely with testers during bug verification, regression testing, and feature validation.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-primary mb-3 uppercase tracking-widest text-[11px]">
                Engineering Takeaways
              </h4>
              <ul className="space-y-2 text-text-secondary font-body">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-[15px] mt-0.5 shrink-0">insights</span>
                  Learned how enterprise software maintenance differs fundamentally from greenfield development.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-[15px] mt-0.5 shrink-0">insights</span>
                  Developed the habit of understanding existing business logic before making any code changes.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-[15px] mt-0.5 shrink-0">insights</span>
                  Gained practical experience collaborating with senior engineers and testers within a structured enterprise workflow.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-[15px] mt-0.5 shrink-0">insights</span>
                  Improved debugging and problem-solving skills by working with real production issues in a legacy system.
                </li>
              </ul>
            </div>
          </div>

          {/* Side panel */}
          <div className="bg-surface-elevated/50 p-4 rounded-xl border border-glass-border space-y-4">

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

            <div className="pt-4 border-t border-glass-border">
              <p className="font-mono text-text-secondary text-[11px] mb-1 uppercase tracking-wider">Team Size</p>
              <p className="font-sans text-[28px] font-bold text-primary">20–30</p>
              <p className="text-text-secondary text-[12px] mt-1 font-body">
                Dev, QA, BA, Dev Interns & QA Interns across the project.
              </p>
            </div>

            {/* Company image slot */}
            <div className="pt-4 border-t border-glass-border">
              <p className="font-mono text-text-secondary text-[11px] mb-3 uppercase tracking-wider">Workplace</p>
              <div className="w-full h-28 rounded-lg border border-glass-border bg-surface-elevated/30 flex items-center justify-center overflow-hidden">
                <img
                  src="/images/experience/fpt-software-office.jpg"
                  alt="FPT Software workplace"
                  className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const ph = document.createElement('div');
                      ph.className = 'flex flex-col items-center gap-2 text-text-secondary/40 text-center';
                      ph.innerHTML = '<span class="material-symbols-outlined text-2xl text-primary/30">add_photo_alternate</span><span class="text-[10px] font-mono">Add workplace photo</span>';
                      parent.appendChild(ph);
                    }
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}