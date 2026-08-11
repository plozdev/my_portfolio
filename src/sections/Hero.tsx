import { Suspense, lazy } from 'react';
import { IDEPlayground } from '@/components/ui/IDEPlayground';

const SystemNetwork = lazy(() => import('@/components/three/SystemNetwork'));

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-28">

      {/* ── Ambient Background — Tech Grid Mesh & Cosmic Spotlights ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Suspense fallback={null}>
          <SystemNetwork />
        </Suspense>

        {/* Tech Grid Pattern (Starfield / Matrix effect) */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(109,179,63,0.15)_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />

        {/* Radial vignette focused around the CMD playground window on the right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 75% at 75% 50%, rgba(109,179,63,0.16) 0%, rgba(13,17,23,0.75) 50%, rgba(13,17,23,0.99) 100%)',
          }}
        />

        {/* 3D Volumetric Spotlight glows */}
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[600px] h-[600px] bg-[#6DB33F]/25 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="absolute top-1/3 right-[16%] -translate-y-1/2 w-[400px] h-[400px] bg-[#6DB33F]/20 rounded-full blur-[110px] pointer-events-none z-0" />
      </div>

      {/* ── Main Content Container ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        
        {/* Floating Top Satellite Status Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#6DB33F]/30 backdrop-blur-md shadow-[0_0_20px_rgba(109,179,63,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6DB33F] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6DB33F]"></span>
          </span>
          <span className="font-mono text-xs font-medium text-slate-300 tracking-wide uppercase">
            Available for Opportunities · HCMC, Vietnam
          </span>
        </div>

        <div className="grid lg:grid-cols-[55%_42%] gap-10 lg:gap-14 items-center justify-between">

          {/* LEFT: Massive Display Typography & Content */}
          <div className="flex flex-col space-y-7">
            
            {/* Massive Display Title */}
            <div>
              <p className="font-mono text-sm sm:text-base text-[#6DB33F] font-semibold mb-2 tracking-wider">
                // BACKEND DEVELOPER &amp; ENGINEER
              </p>
              <h1 className="font-sans text-6xl sm:text-7xl lg:text-[88px] xl:text-[96px] font-black leading-[0.96] tracking-tighter uppercase drop-shadow-2xl">
                <span className="text-[#6DB33F] block drop-shadow-[0_0_35px_rgba(109,179,63,0.35)]">HOANG</span>
                <span className="text-white block">MAI</span>
              </h1>
              
              {/* Visual Bridge Slogan (5-7 words) */}
              <p className="font-mono text-sm sm:text-base text-slate-300 font-medium tracking-wide mt-4 flex items-center gap-2">
                <span className="text-[#6DB33F] font-bold animate-pulse">&gt;</span> Architecting high-concurrency backend systems.
              </p>
            </div>

            {/* Action Buttons (Resume, Hire Me, Socials) - Expanded Scale & 60-40 Hierarchy */}
            <div className="pt-2 space-y-3.5 w-full sm:w-[370px]">
              {/* Primary White Resume Button (60% Visual Anchor) */}
              <a
                href="/documents/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 bg-white hover:bg-slate-200 text-slate-950 font-bold rounded-xl shadow-[0_4px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_28px_rgba(255,255,255,0.4)] transition-all text-sm flex items-center justify-center gap-2.5 group"
              >
                <svg className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>Resume / CV</span>
              </a>

              {/* Row with Hire Me (Secondary Green CTA 40%) & Social Icons (Min 44x44px Touch Targets) */}
              <div className="flex items-center gap-3 w-full">
                {/* Hire Me Button - High Contrast Secondary Green CTA with Neon Border & Glow */}
                <a
                  href="#contact"
                  className="flex-1 h-12 bg-[#6DB33F]/20 hover:bg-[#6DB33F] text-[#85E042] hover:text-slate-950 font-extrabold text-sm rounded-xl border-2 border-[#6DB33F] transition-all flex items-center justify-center shadow-[0_0_20px_rgba(109,179,63,0.3)] hover:shadow-[0_0_30px_rgba(109,179,63,0.5)]"
                >
                  Hire Me
                </a>

                {/* GitHub Icon Button (48x48px Touch Target) */}
                <a
                  href="https://github.com/plozdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-12 h-12 shrink-0 rounded-xl bg-white/5 hover:bg-[#6DB33F]/20 text-slate-300 hover:text-[#6DB33F] border border-white/15 hover:border-[#6DB33F]/50 flex items-center justify-center transition-all group shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>

                {/* LinkedIn Icon Button (48x48px Touch Target) */}
                <a
                  href="https://www.linkedin.com/in/hoangmai-it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-12 h-12 shrink-0 rounded-xl bg-white/5 hover:bg-[#6DB33F]/20 text-slate-300 hover:text-[#6DB33F] border border-white/15 hover:border-[#6DB33F]/50 flex items-center justify-center transition-all group shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT: 3D Perspective Volumetric Terminal Window */}
          <div className="flex justify-center lg:justify-end w-full relative z-20 group">
            <div 
              className="w-full transition-transform duration-500 ease-out transform lg:[transform:perspective(1200px)_rotateY(-7deg)_rotateX(4deg)] lg:group-hover:[transform:perspective(1200px)_rotateY(0deg)_rotateX(0deg)] shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_60px_rgba(109,179,63,0.25)] rounded-xl"
            >
              <IDEPlayground />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Floating Scroll Down Indicator Widget */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-70 hover:opacity-100 transition-opacity">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Scroll Down</span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-[#6DB33F] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

