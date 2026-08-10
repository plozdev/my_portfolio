import { AnimatedSection } from '@/components/ui/AnimatedSection';

const currentFocus = [
  { icon: 'work', text: 'Software Engineer Intern @ FPT Software' },
  { icon: 'school', text: 'Software Engineering Student @ FPT University' },
  { icon: 'build', text: 'Building TekcitYm' },
  { icon: 'emoji_events', text: 'ICPC Competitive Programmer' },
  { icon: 'hub', text: 'Exploring Distributed Systems' },
];

export function About() {
  return (
    <AnimatedSection id="about" className="py-14 px-5 md:px-8 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start">

        {/* Left: personal narrative */}
        <div>
          <h2 className="font-sans text-3xl md:text-4xl leading-tight font-bold text-white flex items-center gap-2 mb-4">
            <span className="text-primary font-mono select-none">&gt;_</span>
            About Me
          </h2>
          <div className="space-y-4 text-text-secondary font-body text-base leading-relaxed">
            <p>
              I'm a Software Engineering student at FPT University and a Software Engineer Intern at FPT Software,
              where I work on a production Java legacy system for a Japanese enterprise client.
            </p>
            <p>
              Most of what I know comes from doing — reading actual production code, fixing real bugs,
              and slowly understanding why things were built the way they were.
              Enterprise software has a way of teaching you things no tutorial covers.
            </p>
            <p>
              Outside of my internship, I compete in ICPC, lead the GDGoC chapter at my university,
              and build <span className="text-primary font-medium">TekcitYm</span> — a personal project where I get to make
              my own architectural decisions, including how to handle high-concurrency seat reservations
              using distributed locks and Kafka.
            </p>
            <p>
              I'm drawn to backend systems and the engineering trade-offs that come with them.
              I don't claim to be an expert — I'm early in my career and still learning a lot —
              but I care deeply about understanding things properly, not just making them work.
            </p>
          </div>
        </div>

        {/* Right: compact current focus panel */}
        <div className="glass-card rounded-xl p-5 border border-primary/15 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h3 className="font-mono text-[11px] text-primary uppercase tracking-widest font-bold">
              Currently
            </h3>
          </div>
          <ul className="space-y-3">
            {currentFocus.map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary/70 text-[18px] shrink-0">
                  {item.icon}
                </span>
                <span className="text-text-secondary font-body text-sm">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </AnimatedSection>
  );
}
