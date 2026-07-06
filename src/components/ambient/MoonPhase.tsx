/**
 * Renders the Moon at an arbitrary phase.
 *
 * `phase` runs 0 → 1: 0 (and 1) is the new moon, 0.5 is the full moon,
 * (0, 0.5) waxes, (0.5, 1) wanes. The lit disc is a moonlight gradient; the
 * shadow is an SVG path built from the dark limb (a semicircle) joined to the
 * terminator (a half-ellipse whose x-radius tracks cos of the phase angle).
 * Aesthetic, not astronomical — but it reads as a believable moon.
 */
function shadowPath(cx: number, cy: number, r: number, phase: number): string {
  const p = ((phase % 1) + 1) % 1;
  const theta = p * 2 * Math.PI;
  const rx = Math.cos(theta) * r; // signed terminator x-radius
  const waxing = p < 0.5;

  const top = `${cx} ${cy - r}`;
  const bottom = `${cx} ${cy + r}`;

  // Dark limb: semicircle on the unlit side.
  const outerSweep = waxing ? 0 : 1;
  // Terminator half-ellipse; sweep flips with the sign of rx.
  const innerSweep = waxing ? (rx > 0 ? 0 : 1) : rx > 0 ? 1 : 0;

  return [
    `M ${top}`,
    `A ${r} ${r} 0 0 ${outerSweep} ${bottom}`,
    `A ${Math.abs(rx).toFixed(3)} ${r} 0 0 ${innerSweep} ${top}`,
    "Z",
  ].join(" ");
}

export interface MoonPhaseProps {
  phase: number;
  size?: number;
  className?: string;
  onClick?: () => void;
  title?: string;
}

export function MoonPhase({ phase, size = 220, className = "", onClick, title }: MoonPhaseProps) {
  const r = 48;
  const c = 50;
  const interactive = Boolean(onClick);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role={interactive ? "button" : "img"}
      aria-label={title ?? "The Moon"}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      style={{ cursor: interactive ? "pointer" : undefined }}
    >
      <defs>
        <radialGradient id="moonlit" cx="42%" cy="38%" r="68%">
          <stop offset="0%" stopColor="#fbfcff" />
          <stop offset="55%" stopColor="#e6eaf6" />
          <stop offset="100%" stopColor="#b6c0e0" />
        </radialGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(242,244,251,0.35)" />
          <stop offset="70%" stopColor="rgba(147,160,201,0.10)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="moonSoft">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>

      {/* Outer glow */}
      <circle cx={c} cy={c} r={r + 6} fill="url(#moonGlow)" />
      {/* Lit disc */}
      <circle cx={c} cy={c} r={r} fill="url(#moonlit)" />
      {/* Subtle maria texture */}
      <g opacity="0.12" fill="#6f7ead">
        <circle cx="38" cy="42" r="7" />
        <circle cx="58" cy="34" r="4.5" />
        <circle cx="60" cy="60" r="9" />
        <circle cx="44" cy="66" r="4" />
      </g>
      {/* Shadow */}
      <path d={shadowPath(c, c, r, phase)} fill="#05060c" opacity="0.92" filter="url(#moonSoft)" />
    </svg>
  );
}

/** Deterministic phase for a given date (seeds the hero moon so it feels alive). */
export function phaseForDate(date: Date): number {
  // Synodic month ≈ 29.53 days; anchor at a known new moon (2000-01-06).
  const knownNew = Date.UTC(2000, 0, 6, 18, 14) / 86400000;
  const days = date.getTime() / 86400000 - knownNew;
  const phase = (days % 29.53058867) / 29.53058867;
  return (phase + 1) % 1;
}
