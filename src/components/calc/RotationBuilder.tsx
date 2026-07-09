import { NumberField } from "./NumberField";
import { BarMeter } from "./BarMeter";
import { round } from "../../lib/damage";
import { stepAvg, type BuildShared, type RotationStep } from "../../lib/build";

/**
 * An editable rotation: a list of ability steps, each with its own multiplier
 * and hit count. The total feeds the "Rotation Total" card, so a full combo can
 * be modelled instead of a single flat number of hits.
 */
export function RotationBuilder({
  steps,
  shared,
  onChange,
}: {
  steps: RotationStep[];
  shared: BuildShared;
  onChange: (steps: RotationStep[]) => void;
}) {
  const perStep = steps.map((s) => stepAvg(s, shared) * Math.max(0, s.hits));
  const max = Math.max(1, ...perStep);

  function update(id: string, patch: Partial<RotationStep>) {
    onChange(steps.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }
  function remove(id: string) {
    onChange(steps.filter((s) => s.id !== id));
  }
  function add() {
    onChange([
      ...steps,
      { id: `s${Date.now() % 100000}`, name: `Hit ${steps.length + 1}`, talentPct: 100, hits: 1 },
    ]);
  }

  return (
    <fieldset className="panel space-y-4 p-6">
      <legend className="eyebrow px-2">Rotation</legend>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={step.id} className="rounded-lg border border-moon-600/15 bg-void/40 p-4">
            <div className="mb-2 flex items-center gap-2">
              <input
                aria-label="Step name"
                value={step.name}
                onChange={(e) => update(step.id, { name: e.target.value })}
                className="min-w-0 flex-1 bg-transparent font-display text-lg text-moon-100 outline-none placeholder:text-moon-600"
                placeholder={`Step ${i + 1}`}
              />
              {steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(step.id)}
                  aria-label={`Remove ${step.name}`}
                  className="rounded px-2 font-mono text-xs text-moon-500 transition-colors hover:text-halo"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Multiplier"
                value={step.talentPct}
                onChange={(v) => update(step.id, { talentPct: v })}
                suffix="% HP"
                step={0.1}
              />
              <NumberField
                label="Hits"
                value={step.hits}
                onChange={(v) => update(step.id, { hits: v })}
              />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <BarMeter value={perStep[i]} max={max} tone={i === 0 ? "halo" : "moon"} />
              <span className="whitespace-nowrap font-mono text-xs tabular-nums text-moon-400">
                {round(perStep[i]).toLocaleString("en-US")}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="w-full rounded-lg border border-dashed border-moon-600/30 py-2 font-mono text-xs uppercase tracking-widest text-moon-500 transition-colors hover:border-halo/40 hover:text-halo"
      >
        + add step
      </button>
    </fieldset>
  );
}
