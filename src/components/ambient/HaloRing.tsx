/**
 * A soft glowing halo ring, the warm gold accent of the palette. Rendered
 * behind the moon in the hero. Purely decorative.
 */
export function HaloRing({ size = 520, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full animate-haloPulse ${className}`}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle, rgba(233,207,143,0.10) 0%, rgba(233,207,143,0.05) 42%, transparent 66%)",
        boxShadow: "0 0 120px 40px rgba(233,207,143,0.06)",
      }}
    />
  );
}
