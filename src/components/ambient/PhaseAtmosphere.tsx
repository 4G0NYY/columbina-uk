import { useMemo } from "react";
import { moonInfo } from "../../lib/moon";

/**
 * A site-wide wash that breathes with the real sky. Its brightness tracks the
 * moon's actual illuminated fraction tonight, so the whole shrine sits in deep,
 * near-starlit dark at the new moon and lifts into a soft silver-gold glow as
 * the moon fills. Purely a fixed gradient (no animation) so it costs nothing
 * and is inert under prefers-reduced-motion.
 *
 * Mounted once, globally, beneath every route.
 */
export function PhaseAtmosphere({ date = new Date() }: { date?: Date }) {
  const { illumination: lit, waxing } = useMemo(() => moonInfo(date), [date]);

  // Cool moonlight overhead; a warmer halo tint only really shows near the full.
  const overhead = (lit * 0.09 + 0.02).toFixed(3);
  const halo = (lit * lit * 0.05).toFixed(3);
  // Waxing light leans to the right of the sky, waning to the left, a subtle nod.
  const side = waxing ? 78 : 22;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20"
      style={{
        background: [
          `radial-gradient(1100px 620px at 50% -12%, rgba(199, 210, 244, ${overhead}), transparent 60%)`,
          `radial-gradient(900px 700px at ${side}% -8%, rgba(233, 207, 143, ${halo}), transparent 55%)`,
          // A steady vignette keeps the edges of the night dark at every phase.
          `radial-gradient(1400px 900px at 50% 40%, transparent 55%, rgba(3, 4, 9, 0.55) 100%)`,
        ].join(","),
      }}
    />
  );
}
