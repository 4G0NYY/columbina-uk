import { describe, expect, it } from "vitest";
import {
  critMultiplier,
  defMultiplier,
  directDamage,
  lunarReactionDamage,
  resMultiplier,
} from "./damage";

describe("defMultiplier", () => {
  it("is 0.5 for equal level 90 with no shred", () => {
    expect(defMultiplier(90, 90)).toBeCloseTo(0.5, 6);
  });
  it("rises toward 1 as DEF is fully ignored", () => {
    expect(defMultiplier(90, 90, 0, 1)).toBeCloseTo(1, 6);
  });
  it("clamps combined shred at 100%", () => {
    expect(defMultiplier(90, 90, 0.8, 0.8)).toBeCloseTo(1, 6);
  });
});

describe("resMultiplier", () => {
  it("halves the RES value when negative", () => {
    expect(resMultiplier(-0.2)).toBeCloseTo(1.1, 6);
  });
  it("is 1 - res in the normal range", () => {
    expect(resMultiplier(0.1)).toBeCloseTo(0.9, 6);
  });
  it("uses the diminishing formula at high RES", () => {
    expect(resMultiplier(0.75)).toBeCloseTo(0.25, 6);
  });
});

describe("critMultiplier", () => {
  it("non-crit is 1", () => {
    expect(critMultiplier(0.6, 0.5, "nonCrit")).toBe(1);
  });
  it("guaranteed crit adds full crit dmg", () => {
    expect(critMultiplier(0.6, 1.0, "crit")).toBeCloseTo(2, 6);
  });
  it("average weights by (clamped) crit rate", () => {
    expect(critMultiplier(0.6, 0.5, "avg")).toBeCloseTo(1.3, 6);
    expect(critMultiplier(1.5, 0.5, "avg")).toBeCloseTo(1.5, 6); // clamped to 1
  });
});

describe("directDamage", () => {
  // base = 0.268 * 30000 = 8040
  // afterBonus = 8040 * 1.5 = 12060
  // defMult(90,90) = 0.5 ; resMult(0.1) = 0.9 ; mitigated = 5427
  const r = directDamage({
    talentMultiplier: 0.268,
    scalingStat: 30000,
    dmgBonus: 0.5,
    critRate: 0.6,
    critDmg: 0.5,
    enemyRes: 0.1,
  });

  it("computes base damage from talent × stat", () => {
    expect(r.base).toBeCloseTo(8040, 6);
  });
  it("applies the DMG bonus", () => {
    expect(r.afterBonus).toBeCloseTo(12060, 6);
  });
  it("mitigates by DEF and RES to the non-crit value", () => {
    expect(r.nonCrit).toBeCloseTo(5427, 3);
  });
  it("computes crit and average", () => {
    expect(r.crit).toBeCloseTo(8140.5, 3);
    expect(r.avg).toBeCloseTo(7055.1, 3);
  });
});

describe("lunarReactionDamage", () => {
  it("caps the HP passive at 7%", () => {
    // 40,000 HP → 40 * 0.2% = 8% → capped to 7%
    const r = lunarReactionDamage({ baseReaction: 1446.85, maxHP: 40000, enemyRes: 0.1 });
    expect(r.hpBonus).toBeCloseTo(0.07, 6);
    expect(r.dmg).toBeCloseTo(1446.85 * 1.07 * 0.9, 3);
  });
  it("scales below the cap", () => {
    // 30,000 HP → 30 * 0.2% = 6%
    const r = lunarReactionDamage({ baseReaction: 1446.85, maxHP: 30000, enemyRes: 0.1 });
    expect(r.hpBonus).toBeCloseTo(0.06, 6);
    expect(r.totalBonus).toBeCloseTo(0.06, 6);
  });
});
