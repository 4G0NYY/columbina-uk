import { useEffect, useMemo } from "react";
import { COLUMBINA_GIFS } from "../../data/secretAssets";
import { DoveGlyph } from "../ambient/DoveGlyph";

interface Drop {
  left: number;
  delay: number;
  duration: number;
  scale: number;
  src?: string;
}

/**
 * A brief shower of Columbina gifs (or, if none are configured, doves) that
 * falls once and then calls `onDone`. Triggered by the Konami secret.
 */
export function GifRain({ onDone, count = 22 }: { onDone: () => void; count?: number }) {
  const drops = useMemo<Drop[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: Math.random() * 3 + 4,
        scale: Math.random() * 0.8 + 0.7,
        src: COLUMBINA_GIFS.length
          ? COLUMBINA_GIFS[Math.floor(Math.random() * COLUMBINA_GIFS.length)]
          : undefined,
      })),
    [count]
  );

  useEffect(() => {
    const t = window.setTimeout(onDone, 9000);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {drops.map((d, i) => (
        <span
          key={i}
          className="absolute text-moon-100"
          style={{
            left: `${d.left}%`,
            top: "-10%",
            transform: `scale(${d.scale})`,
            animation: `drift ${d.duration}s linear ${d.delay}s 1 forwards`,
            filter: "drop-shadow(0 4px 12px rgba(233,207,143,0.3))",
          }}
        >
          {d.src ? (
            <img src={d.src} alt="" className="h-16 w-16 rounded-lg object-cover" />
          ) : (
            <DoveGlyph size={44} className="text-moon-100" />
          )}
        </span>
      ))}
    </div>
  );
}
