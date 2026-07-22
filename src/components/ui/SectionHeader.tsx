export function SectionHeader({ index, title, subtitle }: { index: string, title: string, subtitle?: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center space-x-4 mb-4">
        <span className="font-mono text-green-primary text-lg">{index}.</span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">{title}</h2>
      </div>
      {subtitle && <p className="text-text-secondary text-lg max-w-2xl">{subtitle}</p>}
    </div>
  );
}
