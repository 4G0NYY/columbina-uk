import { BarMeter } from "./BarMeter";
import { round } from "../../lib/damage";
import {
  rotationTotal,
  stepAvg,
  type BuildShared,
  type PinnedBuild,
  type RotationStep,
} from "../../lib/build";

interface Row {
  label: string;
  total: number;
  perHit: number;
  live: boolean;
  pinIndex?: number;
}

/**
 * Pins builds side by side and compares their rotation totals with a bar for
 * each. The build being edited is always the first row, so tweaks read live
 * against everything pinned. Pins live in the URL, so a comparison is shareable.
 */
export function CompareTray({
  live,
  pins,
  onPin,
  onRemove,
  onLoad,
  canPin = true,
}: {
  live: { shared: BuildShared; rotation: RotationStep[] };
  pins: PinnedBuild[];
  onPin: () => void;
  onRemove: (index: number) => void;
  onLoad: (pin: PinnedBuild) => void;
  canPin?: boolean;
}) {
  const rows: Row[] = [
    {
      label: "Editing now",
      total: rotationTotal(live.rotation, live.shared),
      perHit: live.rotation[0] ? stepAvg(live.rotation[0], live.shared) : 0,
      live: true,
    },
    ...pins.map((p, i) => ({
      label: p.label,
      total: rotationTotal(p.rotation, p.shared),
      perHit: p.rotation[0] ? stepAvg(p.rotation[0], p.shared) : 0,
      live: false,
      pinIndex: i,
    })),
  ];
  const max = Math.max(1, ...rows.map((r) => r.total));

  return (
    <fieldset className="panel space-y-4 p-6">
      <div className="flex items-center justify-between">
        <legend className="eyebrow px-0">Compare builds</legend>
        <button
          type="button"
          onClick={onPin}
          disabled={!canPin}
          className="rounded-lg border border-halo/40 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-widest text-halo transition-colors hover:bg-halo/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          + pin this build
        </button>
      </div>

      <div className="space-y-4">
        {rows.map((r) => (
          <div key={`${r.label}-${r.pinIndex ?? "live"}`}>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <span
                className={`truncate font-mono text-xs uppercase tracking-widest ${
                  r.live ? "halo-text" : "text-moon-300"
                }`}
              >
                {r.label}
              </span>
              <span className="flex items-center gap-3">
                <span className="whitespace-nowrap font-mono text-sm tabular-nums text-moon-100">
                  {round(r.total).toLocaleString("en-US")}
                </span>
                {!r.live && r.pinIndex !== undefined && (
                  <>
                    <button
                      type="button"
                      onClick={() => onLoad(pins[r.pinIndex!])}
                      className="font-mono text-[0.65rem] uppercase tracking-wider text-moon-500 transition-colors hover:text-halo"
                    >
                      load
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(r.pinIndex!)}
                      aria-label={`Remove ${r.label}`}
                      className="font-mono text-xs text-moon-500 transition-colors hover:text-halo"
                    >
                      ✕
                    </button>
                  </>
                )}
              </span>
            </div>
            <BarMeter value={r.total} max={max} tone={r.live ? "halo" : "moon"} />
          </div>
        ))}
      </div>

      {pins.length === 0 && (
        <p className="text-xs leading-snug text-moon-600">
          Pin the current build to stack a second and third beside it. Each pin keeps its own
          rotation, so you can weigh whole combos against one another.
        </p>
      )}
    </fieldset>
  );
}
