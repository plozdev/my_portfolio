import { Suspense, lazy } from 'react';
import { siteConfig } from '@/config/site';

const SystemNetwork = lazy(() => import('@/components/three/SystemNetwork'));

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

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
              'radial-gradient(ellipse 38% 40% at 50% 50%, transparent 0%, transparent 40%, rgba(19,19,19,0.55) 65%, rgba(19,19,19,0.85) 100%)',
          }}
        />

        {/* Subtle blur layer only at the very edges to soften the network boundary */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(0.5px)',
            WebkitBackdropFilter: 'blur(0.5px)',
            maskImage:
              'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, black 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, black 100%)',
          }}
        />
      </div>

      {/* ── Typography — sits above the background ── */}
      <div className="relative z-10 text-center px-5 md:px-6 w-full">
        <h1 className="font-sans text-5xl md:text-[64px] leading-tight text-primary tracking-tighter mb-2 spring-text-glow font-bold mt-24 md:mt-36">
          {siteConfig.name}
        </h1>
        <p className="font-sans text-2xl md:text-3xl leading-snug text-secondary mb-4 font-bold">
          {siteConfig.title}
        </p>

        <div className="flex items-center justify-center gap-2 text-text-secondary font-mono text-sm mt-8">
          <span className="material-symbols-outlined text-[18px]">location_on</span>
          <span>{siteConfig.location || 'Ho Chi Minh City, Vietnam'}</span>
        </div>

        <div className="mt-12">
          <button
            className="animate-bounce inline-block cursor-pointer bg-transparent border-none p-0"
            aria-label="Scroll to next section"
            onClick={() => {
              const target = document.getElementById('about');
              if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            <span className="material-symbols-outlined text-primary text-4xl">keyboard_double_arrow_down</span>
          </button>
        </div>
      </div>

      {/* Ambient corner glows for extra depth */}
      <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-primary/4 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-secondary/4 rounded-full blur-[140px] pointer-events-none z-0" />
    </section>
  );
}
