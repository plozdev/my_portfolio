import { AnimatedSection } from '@/components/ui/AnimatedSection';

const currentlyUsing = ['Java 21', 'Spring Boot', 'React', 'Redis', 'Apache Kafka', 'PostgreSQL'];

const learning = [
  'Kubernetes',
  'Apache Flink',
  'gRPC',
  'System Design Patterns',
];

const categories = [
  {
    name: 'Languages',
    icon: 'code',
    items: ['Java', 'TypeScript', 'Kotlin', 'Python', 'C++'],
  },
  {
    name: 'Frameworks',
    icon: 'widgets',
    items: ['Spring Boot', 'React', 'Tailwind CSS', 'Android Jetpack Compose'],
  },
  {
    name: 'Data & Messaging',
    icon: 'storage',
    items: ['PostgreSQL', 'Oracle Database', 'Redis', 'Apache Kafka'],
  },
  {
    name: 'Tools & Platforms',
    icon: 'build',
    items: ['Git', 'Docker', 'Render', 'Railway', 'Cloudinary', 'AWS S3'],
  },
];

export function Tech() {
  return (
    <AnimatedSection id="tech" className="py-16 px-5 md:px-8 max-w-[1300px] mx-auto">

      {/* Header */}
      <h2 className="font-sans text-3xl leading-tight text-primary mb-2 font-bold">
        Technology Ecosystem
      </h2>
      <p className="text-text-secondary font-body text-sm mb-10 max-w-xl">
        Technologies I work with — presented as an engineering ecosystem, not a ranked skills list.
      </p>

      {/* Currently Using */}
      <div className="glass-card rounded-2xl p-5 md:p-6 border border-primary/20 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
        <div className="flex items-center gap-2 mb-5">
          <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
          <h3 className="font-mono text-[11px] text-primary uppercase tracking-widest font-bold">
            Currently Using
          </h3>
          <span className="ml-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
        <div className="flex flex-wrap gap-2.5">
          {currentlyUsing.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/15 border border-primary/40 rounded-full text-primary font-mono text-[12px] font-semibold hover:bg-primary/25 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="glass-card rounded-xl p-5 border border-glass-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary text-[16px]">{cat.icon}</span>
              <h4 className="font-mono text-[11px] text-secondary uppercase tracking-widest font-bold">
                {cat.name}
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 bg-surface-elevated/40 border border-glass-border rounded text-text-primary font-mono text-[11px] hover:border-primary/30 hover:text-primary transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Learning */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-glass-border">
        <div className="flex items-center gap-2 shrink-0">
          <span className="material-symbols-outlined text-text-secondary/60 text-[16px]">school</span>
          <span className="font-mono text-[11px] text-text-secondary/60 uppercase tracking-widest">
            Actively Exploring
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {learning.map((item) => (
            <span
              key={item}
              className="px-3 py-1 border border-dashed border-text-secondary/20 rounded text-text-secondary/50 font-mono text-[11px] hover:border-secondary/40 hover:text-secondary transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

    </AnimatedSection>
  );
}
