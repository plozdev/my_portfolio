export function SystemNetworkFallback() {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-30 pointer-events-none">
      <svg aria-hidden="true" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-green-primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-green-primary)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50%" cy="50%" r="40%" fill="url(#glow)" />
        <g stroke="var(--color-green-primary)" strokeWidth="1" strokeOpacity="0.2">
          <line x1="20%" y1="20%" x2="40%" y2="50%" />
          <line x1="40%" y1="50%" x2="70%" y2="30%" />
          <line x1="70%" y1="30%" x2="80%" y2="60%" />
          <line x1="80%" y1="60%" x2="50%" y2="80%" />
          <line x1="50%" y1="80%" x2="20%" y2="20%" />
          <line x1="20%" y1="20%" x2="70%" y2="30%" />
          <line x1="40%" y1="50%" x2="50%" y2="80%" />
        </g>
        <g fill="var(--color-green-bright)" opacity="0.5">
          <circle cx="20%" cy="20%" r="3" />
          <circle cx="40%" cy="50%" r="4" />
          <circle cx="70%" cy="30%" r="3" />
          <circle cx="80%" cy="60%" r="4" />
          <circle cx="50%" cy="80%" r="5" />
        </g>
      </svg>
    </div>
  );
}
