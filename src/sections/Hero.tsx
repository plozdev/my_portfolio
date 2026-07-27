import { Suspense, lazy } from 'react';
import { siteConfig } from '@/config/site';
import { IDEPlayground } from '@/components/ui/IDEPlayground';

const SystemNetwork = lazy(() => import('@/components/three/SystemNetwork'));

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">

      {/* ── Ambient network — full viewport background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Suspense fallback={null}>
          <SystemNetwork />
        </Suspense>

        {/* Radial vignette: creates the soft empty region at center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 0%, rgba(19,19,19,0.6) 40%, rgba(19,19,19,0.95) 100%)',
          }}
        />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-[42%_54%] gap-10 lg:gap-14 items-center justify-between">
          
          {/* Left: IDE Playground */}
          <div className="flex justify-center lg:justify-start w-full relative z-20">
            <IDEPlayground />
          </div>

          {/* Right: Text Content (Primary Focal Point) */}
          <div className="flex flex-col space-y-5">
            <div className="space-y-1.5">
              <h1 className="font-sans text-4xl md:text-5xl lg:text-[52px] leading-tight text-primary tracking-tight spring-text-glow font-bold">
                {siteConfig.name}
              </h1>
              <h2 className="font-mono text-sm md:text-base text-secondary uppercase tracking-widest font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {siteConfig.title}
              </h2>
            </div>

            <div className="space-y-3.5 text-text-secondary font-body text-base leading-relaxed max-w-[560px]">
              <p>
                I'm a <span className="text-text-primary font-medium">Software Engineering student</span> and currently a <span className="text-text-primary font-medium">Software Engineer Intern at FPT Software</span>, working on complex enterprise software for a Japanese client.
              </p>
              <p>
                I specialize in <span className="text-text-primary font-medium">backend engineering</span> and distributed systems. Beyond work, I compete in <span className="text-text-primary font-medium">ICPC</span>, lead community engineering initiatives, and am actively building <span className="text-text-primary font-medium">TekcitYm</span>—a scalable high-concurrency reservation platform.
              </p>
            </div>

            <div className="pt-2">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary/80 text-primary hover:bg-primary/10 transition-colors rounded font-mono text-xs tracking-wider uppercase font-bold glass-card hover:shadow-[0_0_15px_rgba(109,179,63,0.25)]"
              >
                <span className="material-symbols-outlined text-[16px]">terminal</span>
                Initialize Resume
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Ambient corner glows for extra depth */}
      <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-secondary/5 rounded-full blur-[140px] pointer-events-none z-0" />
    </section>
  );
}
