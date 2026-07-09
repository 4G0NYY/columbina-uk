/**
 * Genshin Impact damage engine.
 *
 * The direct-hit path implements the well-established, verifiable damage
 * formula (base → DMG bonus → DEF → RES → crit). These parts do not depend on
 * any character-specific leaked numbers; they are the game's universal
 * mechanics, so the calculator is accurate for whatever stats the user feeds
 * it from their own account.
 *
 * The Lunar-reaction path is explicitly an ESTIMATE: it applies Columbina's
 * documented HP-scaling passive on top of a transformative-style reaction base,
 * with every coefficient user-editable. See data/columbina.ts for provenance.
 */

export type CritMode = "avg" | "crit" | "nonCrit";

/** Enemy DEF mitigation. All reductions are fractions in [0, 1]. */
export function defMultiplier(
  charLevel: number,
  enemyLevel: number,
  defReduction = 0,
  defIgnore = 0
): number {
  const effectiveDefFactor = Math.max(0, 1 - defReduction - defIgnore);
  const enemyDef = (enemyLevel + 100) * effectiveDefFactor;
  return (charLevel + 100) / (charLevel + 100 + enemyDef);
}

/**
 * Elemental RES multiplier. `res` is a fraction (0.1 = 10% RES; negative =
 * shredded below zero). Piecewise per the standard Genshin model.
 */
export function resMultiplier(res: number): number {
  if (res < 0) return 1 - res / 2;
  if (res < 0.75) return 1 - res;
  return 1 / (4 * res + 1);
}

/** Crit multiplier for the chosen mode. critRate is clamped to [0, 1] for averages. */
export function critMultiplier(critRate: number, critDmg: number, mode: CritMode): number {
  if (mode === "crit") return 1 + critDmg;
  if (mode === "nonCrit") return 1;
  const cr = Math.min(Math.max(critRate, 0), 1);
  return 1 + cr * critDmg;
}

export interface DirectDamageInput {
  /** Talent scaling as a fraction of the scaling stat (0.268 = 26.8%). */
  talentMultiplier: number;
  /** The scaling stat value (e.g. Max HP). */
  scalingStat: number;
  /** Flat additive base damage (default 0). */
  flatBonus?: number;
  /** Sum of all DMG% bonuses as a fraction (Hydro% + Lunar% + generic%). */
  dmgBonus?: number;
  critRate?: number;
  critDmg?: number;
  charLevel?: number;
  enemyLevel?: number;
  /** Enemy elemental RES as a fraction. */
  enemyRes?: number;
  defReduction?: number;
  defIgnore?: number;
}

export interface DirectDamageResult {
  base: number;
  afterBonus: number;
  defMult: number;
  resMult: number;
  nonCrit: number;
  crit: number;
  avg: number;
}

export function directDamage(input: DirectDamageInput): DirectDamageResult {
  const {
    talentMultiplier,
    scalingStat,
    flatBonus = 0,
    dmgBonus = 0,
    critRate = 0,
    critDmg = 0.5,
    charLevel = 90,
    enemyLevel = 90,
    enemyRes = 0.1,
    defReduction = 0,
    defIgnore = 0,
  } = input;

  const base = talentMultiplier * scalingStat + flatBonus;
  const afterBonus = base * (1 + dmgBonus);
  const defMult = defMultiplier(charLevel, enemyLevel, defReduction, defIgnore);
  const resMult = resMultiplier(enemyRes);
  const mitigated = afterBonus * defMult * resMult;

  return {
    base,
    afterBonus,
    defMult,
    resMult,
    nonCrit: mitigated,
    crit: mitigated * (1 + critDmg),
    avg: mitigated * critMultiplier(critRate, critDmg, "avg"),
  };
}

export interface LunarReactionInput {
  /** Transformative-style reaction base DMG (level-scaled). Editable. */
  baseReaction: number;
  /** Reaction DMG bonus fraction from EM / buffs (excluding the HP passive). */
  reactionBonus?: number;
  /** Columbina's Max HP, drives her documented Lunar passive. */
  maxHP?: number;
  /** Passive: +per1000HP per 1000 Max HP, capped at capBonus. */
  per1000HP?: number;
  capBonus?: number;
  enemyRes?: number;
}

export interface LunarReactionResult {
  hpBonus: number;
  totalBonus: number;
  resMult: number;
  dmg: number;
}

/**
 * ESTIMATE. Applies Columbina's HP-scaling Lunar passive on top of a
 * reaction base. Coefficients default from community data (patch 6.3) and are
 * fully user-overridable in the UI.
 */
export function lunarReactionDamage(input: LunarReactionInput): LunarReactionResult {
  const {
    baseReaction,
    reactionBonus = 0,
    maxHP = 0,
    per1000HP = 0.002,
    capBonus = 0.07,
    enemyRes = 0.1,
  } = input;

  const hpBonus = Math.min(Math.floor(maxHP / 1000) * per1000HP, capBonus);
  const totalBonus = reactionBonus + hpBonus;
  const resMult = resMultiplier(enemyRes);

  return {
    hpBonus,
    totalBonus,
    resMult,
    dmg: baseReaction * (1 + totalBonus) * resMult,
  };
}

/** Convenience: round to a readable integer. */
export function round(n: number): number {
  return Math.round(n);
}
