import { useMemo } from "react";

interface Star {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

/**
 * A faint field of slowly twinkling stars. Positions are generated once and
 * memoized so they stay put across re-renders. Purely decorative — hidden from
 * assistive tech and disabled under prefers-reduced-motion (via the CSS media
 * query in index.css, which neutralizes the animation).
 */
export function Starfield({ count = 90 }: { count?: number }) {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 1.8 + 0.4,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 3,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-moon-100 animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 6px rgba(242,244,251,0.6)",
          }}
        />
      ))}
    </div>
  );
}
