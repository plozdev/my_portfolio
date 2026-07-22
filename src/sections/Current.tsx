import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function Current() {
  return (
    <AnimatedSection id="current" className="py-14">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="glass-card p-7 md:p-10 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse"></div>
          <span className="font-mono text-primary uppercase tracking-[0.3em] text-[12px] mb-4 block">Active Development</span>
          <h2 className="font-sans text-3xl leading-tight text-primary mb-3 font-bold">Current Focus</h2>
          <p className="max-w-2xl mx-auto text-text-secondary font-body text-sm mb-6">
            I am currently deep-diving into <strong className="text-text-primary">distributed consensus algorithms</strong> and perfecting the <strong className="text-text-primary">Event-Sourcing module</strong> for the TekcitYm core engine.
          </p>
          <div className="flex justify-center gap-4">
            <span className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-mono text-sm">Raft Algorithm</span>
            <span className="px-6 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-secondary font-mono text-sm">Event Store</span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
