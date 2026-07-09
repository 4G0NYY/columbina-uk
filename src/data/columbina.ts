/**
 * Columbina reference data for the calculator.
 *
 * IMPORTANT: Columbina released in v6.3 and her exact talent tables are still
 * community-sourced and, across wikis, inconsistent. Rather than hard-code
 * numbers we can't verify, every value here is a labelled DEFAULT that the
 * calculator exposes as an editable input. The damage *engine* (see
 * lib/damage.ts) is the game's universal, verifiable formula and does not
 * depend on these defaults being perfect.
 *
 * Update these as official data firms up, and bump DATA_VERSION.
 */

export const DATA_VERSION = "6.3 · community-sourced (verify against your patch)";

export interface Confirmable<T> {
  value: T;
  /** false → shown in the UI with an "estimate" flag. */
  confirmed: boolean;
  note?: string;
}

export const COLUMBINA = {
  name: "Columbina",
  title: "Hyposelenia · The Little Dove Born Beneath the Moon",
  element: "Hydro",
  weapon: "Catalyst",
  rarity: 5 as const,

  base: {
    // Base (un-modified) stats at Lv90, per community datamines.
    hp90: { value: 14695, confirmed: false, note: "community datamine" } as Confirmable<number>,
    atk90: { value: 96, confirmed: false } as Confirmable<number>,
    def90: { value: 515, confirmed: false } as Confirmable<number>,
    ascensionCrit: {
      value: 0.192,
      confirmed: false,
      note: "sources disagree (CRIT Rate ~19.2% vs CRIT DMG); verify",
    } as Confirmable<number>,
  },

  /** Documented HP-scaling Lunar passive: +0.2% Base DMG per 1000 Max HP, cap 7%. */
  lunarPassive: {
    per1000HP: 0.002,
    capBonus: 0.07,
    capHP: 35000,
    confirmed: false,
    note: "+0.2% Lunar Base DMG per 1,000 Max HP, up to 7% at 35,000 HP",
  },

  /** Provisional ability multiplier anchor. Users set their exact value in-UI. */
  skill: {
    name: "Elemental Skill",
    hpMultiplierDefault: 0.268,
    talentLevelForDefault: 8,
    confirmed: false,
    note: "Skill ≈ 26.8% Max HP at talent Lv8 (community); adjust to your level",
  },

  /** Transformative-style reaction base at Lv90 (used as an editable default). */
  reactionBaseLv90: {
    value: 1446.85,
    confirmed: true,
    note: "canonical Lv90 transformative reaction level multiplier",
  } as Confirmable<number>,
} as const;

export interface Reaction {
  id: string;
  label: string;
  note: string;
}

export const LUNAR_REACTIONS: Reaction[] = [
  { id: "lunar-charged", label: "Lunar-Charged", note: "Electro + Hydro lineage" },
  { id: "lunar-bloom", label: "Lunar-Bloom", note: "Dendro + Hydro lineage" },
  { id: "lunar-crystallize", label: "Lunar-Crystallize", note: "Geo lineage" },
];
