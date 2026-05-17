export const Logo = ({ light = false }: { light?: boolean }) => (
  <div className="flex items-center gap-2.5">
    <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2DD4BF"/>
          <stop offset="100%" stopColor="#1B4ED8"/>
        </linearGradient>
        <linearGradient id="lg2" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8"/>
          <stop offset="100%" stopColor="#1E40AF"/>
        </linearGradient>
      </defs>
      {/* pin circle */}
      <circle cx="50" cy="38" r="28" stroke="url(#lg1)" strokeWidth="7" fill="none"/>
      {/* pin tail */}
      <path d="M50 64 L50 78" stroke="url(#lg1)" strokeWidth="7" strokeLinecap="round"/>
      {/* fish body */}
      <ellipse cx="50" cy="38" rx="14" ry="9" fill="url(#lg1)"/>
      {/* fish tail */}
      <path d="M36 38 L28 31 L28 45 Z" fill="url(#lg1)"/>
      {/* fish eye */}
      <circle cx="56" cy="36" r="2.5" fill="white"/>
      {/* wave */}
      <path d="M18 82 Q35 74 50 82 Q65 90 82 82" stroke="url(#lg2)" strokeWidth="6" strokeLinecap="round" fill="none"/>
    </svg>
    <span className={`font-display font-bold text-xl tracking-tight ${light ? "text-white" : "text-navy"}`}>
      Sea<span className="text-turquoise">Found</span>
    </span>
  </div>
);
