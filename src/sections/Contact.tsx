import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function Contact() {
  return (
    <AnimatedSection id="contact" className="py-14 px-5 md:px-8 max-w-3xl mx-auto text-center">
      <h2 className="font-sans text-3xl leading-tight text-primary mb-3 font-bold">Initialize Connection</h2>
      <p className="text-text-secondary font-body text-sm mb-8">
        Whether it's discussing backend architecture, system design, or a potential collaboration, my inbox is open.
      </p>
      <div className="flex justify-center">
        <button className="px-8 py-4 bg-primary text-background font-mono uppercase font-bold text-sm tracking-widest hover:bg-secondary transition-colors group flex items-center gap-3">
          Send Transmission
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
        </button>
      </div>
    </AnimatedSection>
  );
}
