import { round } from "../../lib/damage";

interface Stat {
  label: string;
  value: number;
  emphasis?: boolean;
}

export function ResultCard({
  title,
  subtitle,
  stats,
  tone = "moon",
}: {
  title: string;
  subtitle?: string;
  stats: Stat[];
  tone?: "moon" | "halo";
}) {
  return (
    <div className="panel p-6">
      <div className="mb-5">
        <h3 className="font-display text-2xl font-light text-moon-50">{title}</h3>
        {subtitle && <p className="mt-1 text-xs text-moon-500">{subtitle}</p>}
      </div>
      <dl className="space-y-3">
        {stats.map((s) => (
          <div key={s.label} className="flex items-baseline justify-between gap-4">
            <dt className="font-mono text-xs uppercase tracking-widest text-moon-500">{s.label}</dt>
            <dd
              className={`font-mono tabular-nums ${
                s.emphasis
                  ? tone === "halo"
                    ? "text-2xl halo-text"
                    : "text-2xl text-moon-50"
                  : "text-lg text-moon-200"
              }`}
            >
              {round(s.value).toLocaleString("en-US")}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
