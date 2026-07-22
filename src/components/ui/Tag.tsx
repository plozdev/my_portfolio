export function Tag({ children, variant = 'tech' }: { children: React.ReactNode, variant?: 'tech' | 'status' | 'label' }) {
  const base = "inline-flex items-center px-3 py-1 rounded-full text-xs font-mono transition-colors";
  const variants = {
    tech: "bg-surface-elevated text-text-secondary border border-border hover:text-green-primary hover:border-green-primary/50",
    status: "bg-green-primary/10 text-green-bright border border-green-primary/30",
    label: "bg-surface-elevated text-text-primary border border-border"
  };
  
  return (
    <span className={`${base} ${variants[variant]}`}>
      {children}
    </span>
  );
}
