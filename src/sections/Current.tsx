import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function Current() {
  return (
    <AnimatedSection id="current" className="py-12">
      <div className="max-w-4xl mx-auto px-5 md:px-6">
        <div className="glass-card p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse"></div>
          <span className="font-mono text-primary uppercase tracking-[0.2em] text-[10px] mb-3 block">Active Development</span>
          <h2 className="font-sans text-2xl md:text-3xl leading-tight text-primary mb-2.5 font-bold">Current Focus</h2>
          <p className="max-w-xl mx-auto text-text-secondary font-body text-xs md:text-sm mb-5 leading-relaxed">
            I am currently deep-diving into <strong className="text-text-primary">distributed consensus algorithms</strong> and perfecting the <strong className="text-text-primary">Event-Sourcing module</strong> for the TekcitYm core engine.
          </p>
          <div className="flex justify-center gap-3">
            <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary font-mono text-xs">Raft Algorithm</span>
            <span className="px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full text-secondary font-mono text-xs">Event Store</span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
