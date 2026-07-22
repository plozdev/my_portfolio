import { Suspense, lazy } from 'react';
import { siteConfig } from '@/config/site';

const SystemNetwork = lazy(() => import('@/components/three/SystemNetwork'));

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      <div className="relative z-10 text-center px-5 md:px-6 w-full">
        <div className="mb-8 w-full h-[300px] md:h-[400px] flex items-center justify-center absolute top-0 left-0 -z-10 pointer-events-none opacity-50">
          <Suspense fallback={null}>
            <SystemNetwork />
          </Suspense>
        </div>

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
          <a className="animate-bounce inline-block" href="#about">
            <span className="material-symbols-outlined text-primary text-4xl">keyboard_double_arrow_down</span>
          </a>
        </div>
      </div>
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
}
