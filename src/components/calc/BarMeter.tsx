/** A slim horizontal bar for comparing magnitudes at a glance. */
export function BarMeter({
  value,
  max,
  tone = "moon",
}: {
  value: number;
  max: number;
  tone?: "moon" | "halo";
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-moon-600/15">
      <div
        className={`h-full rounded-full ${
          tone === "halo" ? "bg-halo/70" : "bg-moon-400/70"
        }`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
