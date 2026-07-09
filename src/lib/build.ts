/**
 * Rotation and build-comparison helpers for the calculator.
 *
 * A rotation is a list of steps, each with its own ability multiplier and hit
 * count, so a full combo can be modelled rather than a single flat hit total.
 * Pinned builds snapshot the shared stats plus the rotation, so they survive in
 * the URL and can be restored into the editor.
 */
import { directDamage } from "./damage";

export interface RotationStep {
  id: string;
  name: string;
  /** Ability multiplier as a percentage of the scaling stat. */
  talentPct: number;
  hits: number;
}

/** The shared, per-build stats a rotation is evaluated against. */
export interface BuildShared {
  maxHP: number;
  dmgPct: number;
  crPct: number;
  cdPct: number;
  charLvl: number;
  enemyLvl: number;
  resPct: number;
  defRedPct: number;
}

/** Average damage of a single step against the shared build. */
export function stepAvg(step: RotationStep, b: BuildShared): number {
  return directDamage({
    talentMultiplier: step.talentPct / 100,
    scalingStat: b.maxHP,
    dmgBonus: b.dmgPct / 100,
    critRate: b.crPct / 100,
    critDmg: b.cdPct / 100,
    charLevel: b.charLvl,
    enemyLevel: b.enemyLvl,
    enemyRes: b.resPct / 100,
    defReduction: b.defRedPct / 100,
  }).avg;
}

/** Total average damage of a whole rotation. */
export function rotationTotal(steps: RotationStep[], b: BuildShared): number {
  return steps.reduce((sum, s) => sum + stepAvg(s, b) * Math.max(0, s.hits), 0);
}

// --- URL serialization -----------------------------------------------------
// Rotation → "name~talentPct~hits|name~talentPct~hits". Names are encoded so
// the delimiters stay safe.

export function encodeRotation(steps: RotationStep[]): string {
  return steps
    .map((s) => `${encodeURIComponent(s.name)}~${s.talentPct}~${s.hits}`)
    .join("|");
}

export function decodeRotation(raw: string | null): RotationStep[] | null {
  if (!raw) return null;
  try {
    const steps = raw
      .split("|")
      .filter(Boolean)
      .map((chunk, i) => {
        const [n, t, h] = chunk.split("~");
        return {
          id: `s${i}-${Math.round((Number(t) || 0) * 10)}`,
          name: decodeURIComponent(n ?? "Step"),
          talentPct: Number(t) || 0,
          hits: Math.max(0, Math.round(Number(h) || 0)),
        };
      });
    return steps.length ? steps : null;
  } catch {
    return null;
  }
}

export interface PinnedBuild {
  label: string;
  shared: BuildShared;
  rotation: RotationStep[];
}

/** Base64-encode the pins so a whole comparison set fits in one URL param. */
export function encodePins(pins: PinnedBuild[]): string {
  try {
    return btoa(encodeURIComponent(JSON.stringify(pins)));
  } catch {
    return "";
  }
}

export function decodePins(raw: string | null): PinnedBuild[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(atob(raw))) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (p): p is PinnedBuild =>
        !!p && typeof p === "object" && "shared" in p && Array.isArray((p as PinnedBuild).rotation)
    );
  } catch {
    return [];
  }
}
