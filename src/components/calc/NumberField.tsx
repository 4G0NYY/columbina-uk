export interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  hint?: string;
  /** Marks the default as an unverified community estimate. */
  estimate?: boolean;
}

export function NumberField({
  label,
  value,
  onChange,
  suffix,
  step = 1,
  min,
  max,
  hint,
  estimate,
}: NumberFieldProps) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-moon-400">
          {label}
        </span>
        {estimate && (
          <span
            className="rounded-full border border-halo/30 px-1.5 py-px font-mono text-[0.6rem] uppercase tracking-wider text-halo/80"
            title="Community-sourced default. Verify against your own build."
          >
            est.
          </span>
        )}
      </div>
      <div className="flex items-center rounded-lg border border-moon-600/25 bg-void/60 focus-within:border-halo/50">
        <input
          type="number"
          value={Number.isFinite(value) ? value : ""}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className="w-full bg-transparent px-3 py-2 font-mono text-moon-50 tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        {suffix && <span className="px-3 font-mono text-xs text-moon-500">{suffix}</span>}
      </div>
      {hint && <p className="mt-1 text-xs leading-snug text-moon-600">{hint}</p>}
    </label>
  );
}
