import { useMemo } from "react";

interface Feather {
  left: number;
  delay: number;
  duration: number;
  scale: number;
  drift: number;
}

/** A single dove feather, drawn as a soft SVG quill. */
function FeatherGlyph({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 48" className={className} style={style} width="18" height="36">
      <path
        d="M12 1C6 8 3 18 4 30c.4 5 3 12 8 16 0-6 1-10 3-14-2 1-4 1-6 1 3-2 6-5 7-9-2 1-4 1-6 1 4-3 7-7 8-13-1-4-2-8-6-11Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path d="M12 2C11 14 11 30 12 46" stroke="#0a0d1a" strokeWidth="0.6" opacity="0.4" fill="none" />
    </svg>
  );
}

/**
 * Feathers drifting gently down the page. Ambient only; the `drift` keyframe
 * (see tailwind.config.ts) is neutralized under prefers-reduced-motion.
 */
export function Feathers({ count = 7 }: { count?: number }) {
  const feathers = useMemo<Feather[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 18,
        duration: Math.random() * 16 + 18,
        scale: Math.random() * 0.7 + 0.6,
        drift: Math.random() * 60 - 30,
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {feathers.map((f, i) => (
        <FeatherGlyph
          key={i}
          className="absolute text-moon-200"
          style={{
            left: `${f.left}%`,
            top: "-6%",
            transform: `scale(${f.scale})`,
            animation: `drift ${f.duration}s linear ${f.delay}s infinite`,
            filter: "drop-shadow(0 4px 10px rgba(182,192,224,0.25))",
            // custom horizontal drift via CSS var isn't needed; keyframe handles it
          }}
        />
      ))}
    </div>
  );
}
