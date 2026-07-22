export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  href, 
  onClick 
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'ghost', 
  className?: string, 
  href?: string,
  onClick?: () => void
}) {
  const base = "inline-flex items-center justify-center px-6 py-3 font-mono text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-primary/50";
  const variants = {
    primary: "bg-green-primary text-bg hover:bg-green-bright hover:shadow-green-primary/20",
    ghost: "bg-transparent text-green-primary border border-green-primary hover:bg-green-primary/10"
  };
  
  const classes = `${base} ${variants[variant]} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={classes} target={href.startsWith('#') ? undefined : "_blank"} rel={href.startsWith('#') ? undefined : "noopener noreferrer"}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
