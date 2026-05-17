import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export const Loader = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProgress(p => Math.min(100, p + 4)), 60);
    const done = setTimeout(onDone, 1800);
    return () => { clearInterval(t); clearTimeout(done); };
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gradient-soft animate-fade-in">
      <div className="animate-float"><Logo /></div>
      <p className="text-sm text-muted-foreground mt-4 font-medium">Menyiapkan hasil laut segar...</p>
      <div className="mt-6 w-56 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full gradient-aqua transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};
