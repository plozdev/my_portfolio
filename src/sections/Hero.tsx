import { Suspense, lazy } from 'react';
import { IDEPlayground } from '@/components/ui/IDEPlayground';

const SystemNetwork = lazy(() => import('@/components/three/SystemNetwork'));

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 lg:py-24">

      {/* ── Ambient network — viewport background with right CMD spotlight ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Suspense fallback={null}>
          <SystemNetwork />
        </Suspense>

        {/* Radial vignette focused around the CMD playground window on the right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 70% at 75% 50%, rgba(109,179,63,0.14) 0%, rgba(13,17,23,0.7) 45%, rgba(13,17,23,0.98) 100%)',
          }}
        />

        {/* Spotlight glows specifically behind CMD window on the right */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[550px] h-[550px] bg-[#6DB33F]/20 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute top-1/3 right-[18%] -translate-y-1/2 w-[350px] h-[350px] bg-[#6DB33F]/15 rounded-full blur-[100px] pointer-events-none z-0" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[55%_42%] gap-8 lg:gap-12 items-center justify-between">

          {/* LEFT: Text Content */}
          <div className="flex flex-col space-y-6">
            
            {/* Header Title */}
            <div>
              <p className="font-mono text-sm sm:text-base text-text-secondary font-medium mb-1.5">
                Hi, I am
              </p>
              <h1 className="font-sans text-5xl sm:text-6xl lg:text-[76px] font-black leading-[1.03] tracking-tight uppercase">
                <span className="text-[#6DB33F] block">ANH</span>
                <span className="text-white block">HOANG MAI</span>
              </h1>
              <h2 className="font-mono text-base sm:text-lg lg:text-xl text-[#6DB33F] uppercase tracking-widest font-bold flex items-center gap-2 mt-3">
                <span>&gt;</span> BACKEND DEVELOPER
              </h2>
            </div>

            {/* Subtitle / Pitch */}
            <p className="text-text-secondary font-body text-base sm:text-lg leading-relaxed max-w-[600px]">
              Building scalable, reliable, and high-performance backend systems that handle{' '}
              <span className="text-[#6DB33F] font-semibold">real-world scale.</span>
            </p>

            {/* Action Buttons (Resume, Hire Me, Socials) */}
            <div className="pt-2 space-y-2.5 w-[270px]">
              {/* Primary White Resume Button */}
              <a
                href="/documents/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 bg-white hover:bg-slate-200 text-slate-950 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2 group"
              >
                <svg className="w-4 h-4 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>Resume</span>
              </a>

              {/* Row with Hire Me & Social Icons (Total width = 270px) */}
              <div className="flex items-center gap-2.5 w-full">
                {/* Hire Me Button (Expands to fill remaining space) */}
                <a
                  href="#contact"
                  className="flex-1 h-10 bg-white/5 hover:bg-white/10 text-white font-medium text-sm rounded-lg border border-white/20 hover:border-white/40 transition-all flex items-center justify-center"
                >
                  Hire Me
                </a>

                {/* GitHub Icon Button */}
                <a
                  href="https://github.com/plozdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 shrink-0 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 flex items-center justify-center transition-all group"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>

                {/* LinkedIn Icon Button */}
                <a
                  href="https://www.linkedin.com/in/hoangmai-it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 shrink-0 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 flex items-center justify-center transition-all group"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT: IDE / CMD Playground */}
          <div className="flex justify-center lg:justify-end w-full relative z-20">
            <IDEPlayground />
          </div>

        </div>
      </div>
    </section>
  );
}

