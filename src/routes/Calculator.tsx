import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "../components/site/Header";
import { NumberField } from "../components/calc/NumberField";
import { ResultCard } from "../components/calc/ResultCard";
import { DamageBreakdown } from "../components/calc/DamageBreakdown";
import { directDamage, lunarReactionDamage } from "../lib/damage";
import { COLUMBINA, DATA_VERSION, LUNAR_REACTIONS } from "../data/columbina";
import { Starfield } from "../components/ambient/Starfield";

/** Field keys shared with the URL for shareable builds. */
const DEFAULTS = {
  maxHP: 30000,
  talentPct: COLUMBINA.skill.hpMultiplierDefault * 100, // 26.8
  dmgPct: 0,
  crPct: 50,
  cdPct: 100,
  charLvl: 90,
  enemyLvl: 90,
  resPct: 10,
  defRedPct: 0,
  hits: 8,
  baseReaction: COLUMBINA.reactionBaseLv90.value,
  reactBonusPct: 0,
} as const;

type Key = keyof typeof DEFAULTS;
const KEYS = Object.keys(DEFAULTS) as Key[];

export function Calculator() {
  const [sp, setSp] = useSearchParams();
  const [copied, setCopied] = useState(false);

  const state = useMemo(() => {
    const out = { ...DEFAULTS } as Record<Key, number>;
    for (const k of KEYS) {
      const raw = sp.get(k);
      if (raw !== null && raw !== "" && Number.isFinite(Number(raw))) out[k] = Number(raw);
    }
    return out;
  }, [sp]);

  function set(key: Key, value: number) {
    const next = new URLSearchParams(sp);
    next.set(key, String(value));
    setSp(next, { replace: true });
    setCopied(false);
  }

  const direct = directDamage({
    talentMultiplier: state.talentPct / 100,
    scalingStat: state.maxHP,
    dmgBonus: state.dmgPct / 100,
    critRate: state.crPct / 100,
    critDmg: state.cdPct / 100,
    charLevel: state.charLvl,
    enemyLevel: state.enemyLvl,
    enemyRes: state.resPct / 100,
    defReduction: state.defRedPct / 100,
  });

  const reaction = lunarReactionDamage({
    baseReaction: state.baseReaction,
    reactionBonus: state.reactBonusPct / 100,
    maxHP: state.maxHP,
    enemyRes: state.resPct / 100,
  });

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative min-h-screen">
      <Starfield count={50} />
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-28">
        <div className="mb-10">
          <p className="eyebrow mb-3">Beneath the Moon, the Numbers</p>
          <h1 className="font-display text-5xl font-light text-moon-50">Lunar Damage Calculator</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-moon-400">
            The engine is the game's exact damage formula — accurate for whatever stats you enter
            from your own account. Values marked{" "}
            <span className="font-mono text-halo/80">est.</span> are community defaults you should
            confirm. Direct-hit numbers are exact; Lunar-reaction numbers are a clearly-labelled
            estimate.
          </p>
          <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-widest text-moon-600">
            Data · {DATA_VERSION}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Inputs */}
          <div className="space-y-8">
            <fieldset className="panel space-y-4 p-6">
              <legend className="eyebrow px-2">Columbina & Build</legend>
              <NumberField
                label="Max HP"
                value={state.maxHP}
                onChange={(v) => set("maxHP", v)}
                step={100}
                hint="Her whole kit scales on Max HP."
              />
              <div className="grid grid-cols-2 gap-4">
                <NumberField
                  label="Ability Multiplier"
                  value={state.talentPct}
                  onChange={(v) => set("talentPct", v)}
                  suffix="% HP"
                  step={0.1}
                  estimate={!COLUMBINA.skill.confirmed}
                  hint={COLUMBINA.skill.note}
                />
                <NumberField
                  label="Total DMG Bonus"
                  value={state.dmgPct}
                  onChange={(v) => set("dmgPct", v)}
                  suffix="%"
                  step={1}
                  hint="Sum of Hydro% + Lunar% + generic DMG%."
                />
                <NumberField
                  label="Crit Rate"
                  value={state.crPct}
                  onChange={(v) => set("crPct", v)}
                  suffix="%"
                />
                <NumberField
                  label="Crit DMG"
                  value={state.cdPct}
                  onChange={(v) => set("cdPct", v)}
                  suffix="%"
                />
              </div>
            </fieldset>

            <fieldset className="panel space-y-4 p-6">
              <legend className="eyebrow px-2">Target</legend>
              <div className="grid grid-cols-2 gap-4">
                <NumberField
                  label="Character Lv"
                  value={state.charLvl}
                  onChange={(v) => set("charLvl", v)}
                />
                <NumberField
                  label="Enemy Lv"
                  value={state.enemyLvl}
                  onChange={(v) => set("enemyLvl", v)}
                />
                <NumberField
                  label="Enemy RES"
                  value={state.resPct}
                  onChange={(v) => set("resPct", v)}
                  suffix="%"
                />
                <NumberField
                  label="DEF Reduction"
                  value={state.defRedPct}
                  onChange={(v) => set("defRedPct", v)}
                  suffix="%"
                />
              </div>
            </fieldset>

            <fieldset className="panel space-y-4 p-6">
              <legend className="eyebrow px-2">Lunar Reaction · estimate</legend>
              <div className="grid grid-cols-2 gap-4">
                <NumberField
                  label="Reaction Base"
                  value={state.baseReaction}
                  onChange={(v) => set("baseReaction", v)}
                  step={0.01}
                  estimate
                  hint={COLUMBINA.reactionBaseLv90.note}
                />
                <NumberField
                  label="Reaction Bonus"
                  value={state.reactBonusPct}
                  onChange={(v) => set("reactBonusPct", v)}
                  suffix="%"
                  hint="From EM / reaction DMG buffs."
                />
              </div>
              <p className="text-xs leading-snug text-moon-600">
                Lunar reactions: {LUNAR_REACTIONS.map((r) => r.label).join(" · ")}. Columbina's
                passive auto-adds{" "}
                <span className="font-mono text-halo/80">
                  {(reaction.hpBonus * 100).toFixed(1)}%
                </span>{" "}
                from your {state.maxHP.toLocaleString("en-US")} HP.
              </p>
            </fieldset>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <NumberField
                label="Hits / Rotation"
                value={state.hits}
                onChange={(v) => set("hits", v)}
              />
              <button
                type="button"
                onClick={copyLink}
                className="ml-4 mt-5 self-end whitespace-nowrap rounded-lg border border-halo/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-halo transition-colors hover:bg-halo/10"
              >
                {copied ? "✓ copied" : "share build"}
              </button>
            </div>

            <ResultCard
              title="Direct Hit"
              subtitle="Exact — the game's damage formula."
              tone="moon"
              stats={[
                { label: "Non-crit", value: direct.nonCrit },
                { label: "Crit", value: direct.crit },
                { label: "Average", value: direct.avg, emphasis: true },
              ]}
            />
            <DamageBreakdown
              result={direct}
              inputs={{
                talentMultiplier: state.talentPct / 100,
                scalingStat: state.maxHP,
                dmgBonus: state.dmgPct / 100,
                critDmg: state.cdPct / 100,
              }}
            />

            <ResultCard
              title="Rotation Total"
              subtitle={`${state.hits} average hits`}
              tone="halo"
              stats={[
                { label: "Per hit (avg)", value: direct.avg },
                { label: "Rotation", value: direct.avg * state.hits, emphasis: true },
              ]}
            />

            <ResultCard
              title="Lunar Reaction"
              subtitle="Estimate — coefficients are community-sourced."
              tone="halo"
              stats={[
                { label: "HP passive", value: reaction.hpBonus * 100 },
                { label: "Per reaction", value: reaction.dmg, emphasis: true },
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
