export const WaveBackground = () => (
  <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] pointer-events-none">
    <svg className="relative block w-[200%] h-24 md:h-32 animate-wave" viewBox="0 0 2400 120" preserveAspectRatio="none">
      <path d="M0,60 C300,120 600,0 1200,60 C1800,120 2100,0 2400,60 L2400,120 L0,120 Z"
        fill="hsl(var(--turquoise))" opacity="0.25"/>
      <path d="M0,80 C400,140 800,20 1200,80 C1600,140 2000,20 2400,80 L2400,120 L0,120 Z"
        fill="hsl(var(--turquoise))" opacity="0.45"/>
      <path d="M0,100 C500,40 1000,140 1500,100 C1900,70 2200,120 2400,100 L2400,120 L0,120 Z"
        fill="hsl(215 65% 18%)" opacity="0.9"/>
    </svg>
  </div>
);
