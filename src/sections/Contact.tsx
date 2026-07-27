import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { siteConfig } from '@/config/site';
import { socials } from '@/data/socials';

/* ── Data ────────────────────────────────────────────────────────── */
const email     = siteConfig.email ?? socials.find(s => s.platform === 'Email')?.href?.replace('mailto:', '') ?? '';
const github    = socials.find(s => s.platform === 'GitHub')?.href  ?? '';
const linkedin  = socials.find(s => s.platform === 'LinkedIn')?.href ?? '';
const resumeUrl = '/documents/resume.pdf';



/* ── Sub-components ──────────────────────────────────────────────── */

/** A single communication channel row */
function Channel({
  icon,
  label,
  value,
  href,
  isExternal = true,
}: {
  icon: string;
  label: string;
  value: string;
  href: string;
  isExternal?: boolean;
}) {
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-4 px-5 py-4 rounded-xl border border-glass-border
        bg-surface-elevated/20 hover:border-primary/40 hover:bg-surface-elevated/40
        transition-all duration-300"
    >
      {/* Icon box */}
      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0
        group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
        <span className="material-symbols-outlined text-primary text-[17px]">{icon}</span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[10px] text-text-secondary uppercase tracking-wider mb-0.5">{label}</p>
        <p className="font-sans text-sm text-text-primary truncate group-hover:text-primary transition-colors duration-200">
          {value}
        </p>
      </div>

      {/* Arrow */}
      <span className="material-symbols-outlined text-text-secondary/40 text-[16px]
        group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200">
        arrow_forward
      </span>
    </a>
  );
}

/* ── Section ─────────────────────────────────────────────────────── */
export function Contact() {
  return (
    <AnimatedSection
      id="contact"
      className="py-20 bg-background-deep relative"
    >
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-2xl mx-auto px-5 md:px-8">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            {/* Live availability indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
              Available to connect
            </span>
          </div>

          <h2 className="font-sans text-3xl leading-tight text-text-primary font-bold mb-3">
            Let's build something{' '}
            <span className="text-primary">together.</span>
          </h2>
          <p className="text-text-secondary font-body text-sm leading-relaxed max-w-md">
            I'm open to backend roles, system design discussions, and collaborative
            projects. Whether you have a question or just want to say hello — feel free to reach out.
          </p>
        </div>

        {/* ── Channels ───────────────────────────────────────── */}
        <div className="space-y-3 mb-8">
          {email && (
            <Channel
              icon="mail"
              label="Email"
              value={email}
              href={`mailto:${email}`}
              isExternal={false}
            />
          )}
          {linkedin && (
            <Channel
              icon="work"
              label="LinkedIn"
              value="linkedin.com/in/hoangmai-it"
              href={linkedin}
            />
          )}
          {github && (
            <Channel
              icon="code"
              label="GitHub"
              value="github.com/plozdev"
              href={github}
            />
          )}
          <Channel
            icon="description"
            label="Resume"
            value="View full résumé (PDF)"
            href={resumeUrl}
          />
        </div>

        {/* ── Primary CTA ────────────────────────────────────── */}
        {/* <a
          id="contact-send-email"
          href={mailtoHref}
          className="group inline-flex items-center gap-3 px-7 py-3.5
            bg-primary text-surface font-mono text-[12px] uppercase tracking-widest font-bold
            rounded-lg hover:bg-secondary transition-colors duration-200"
        >
          <span className="material-symbols-outlined text-[16px]">send</span>
          Send Email
          <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 material-symbols-outlined text-[14px]">
            open_in_new
          </span>
        </a> */}

        {/* ── Footer note ────────────────────────────────────── */}
        {/* <p className="font-mono text-[10px] text-text-secondary/40 mt-5">
          Opens your default mail client · Subject pre-filled as "Portfolio Contact"
        </p> */}

      </div>
    </AnimatedSection>
  );
}
