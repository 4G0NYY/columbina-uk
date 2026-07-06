import { useState } from "react";
import type { DirectDamageResult } from "../../lib/damage";

/** Transparent, expandable trace of every multiplier — the trust layer. */
export function DamageBreakdown({
  result,
  inputs,
}: {
  result: DirectDamageResult;
  inputs: { talentMultiplier: number; scalingStat: number; dmgBonus: number; critDmg: number };
}) {
  const [open, setOpen] = useState(false);

  const rows: [string, string][] = [
    ["Talent × Stat", `${(inputs.talentMultiplier * 100).toFixed(1)}% × ${inputs.scalingStat.toLocaleString("en-US")} HP`],
    ["Base DMG", result.base.toFixed(1)],
    ["× (1 + DMG bonus)", `× ${(1 + inputs.dmgBonus).toFixed(3)}`],
    ["= After bonus", result.afterBonus.toFixed(1)],
    ["× DEF multiplier", `× ${result.defMult.toFixed(4)}`],
    ["× RES multiplier", `× ${result.resMult.toFixed(4)}`],
    ["= Non-crit", result.nonCrit.toFixed(1)],
    ["× Crit (1 + CD)", `× ${(1 + inputs.critDmg).toFixed(3)}`],
    ["= Crit", result.crit.toFixed(1)],
  ];

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="font-mono text-xs uppercase tracking-widest text-moon-500 transition-colors hover:text-halo"
      >
        {open ? "▾ hide" : "▸ show"} damage breakdown
      </button>
      {open && (
        <div className="mt-3 overflow-x-auto rounded-lg border border-moon-600/20 bg-void/50 p-4">
          <table className="w-full font-mono text-xs">
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k} className="border-b border-moon-600/10 last:border-0">
                  <td className="py-1.5 pr-4 text-moon-400">{k}</td>
                  <td className="py-1.5 text-right tabular-nums text-moon-100">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
