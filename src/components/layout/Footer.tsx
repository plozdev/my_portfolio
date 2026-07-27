import { siteConfig } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-glass-border bg-background-deep text-center px-5">
      <p className="font-mono text-text-secondary text-sm">© {year} {siteConfig.name}</p>
      {/* <p className="font-mono text-primary/50 mt-2 text-sm">v2.0.0</p> */}
    </footer>
  );
}
