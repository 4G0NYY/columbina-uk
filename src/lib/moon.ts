/**
 * A small lunar-phase engine.
 *
 * Aesthetic-grade rather than observatory-grade, but it tracks the real synodic
 * month so the moon drawn on the page matches the one in the sky tonight. All
 * math is anchored to a known new moon (2000-01-06 18:14 UTC).
 */

/** Mean synodic month, in days. */
export const SYNODIC = 29.53058867;

/** Reference new moon, expressed in days since the Unix epoch. */
const KNOWN_NEW = Date.UTC(2000, 0, 6, 18, 14) / 86400000;

/** Age of the moon in days since the last new moon, in [0, SYNODIC). */
export function moonAgeDays(date: Date): number {
  const days = date.getTime() / 86400000 - KNOWN_NEW;
  const age = days % SYNODIC;
  return age < 0 ? age + SYNODIC : age;
}

/**
 * Phase fraction 0 to 1: 0 (and 1) is new, 0.25 first quarter, 0.5 full,
 * 0.75 last quarter. Seeds the drawn moon so it feels alive.
 */
export function phaseForDate(date: Date): number {
  return moonAgeDays(date) / SYNODIC;
}

/** Illuminated fraction of the disc, 0 (new) to 1 (full). */
export function illumination(phase: number): number {
  return (1 - Math.cos(2 * Math.PI * phase)) / 2;
}

export interface MoonName {
  name: string;
  emoji: string;
}

/** The eight traditional phase names, centred on their phase angle. */
export function phaseName(phase: number): MoonName {
  const p = ((phase % 1) + 1) % 1;
  const h = 1 / 16; // half a name-slot, so each name centres on its phase
  if (p < h || p >= 1 - h) return { name: "New Moon", emoji: "🌑" };
  if (p < 0.25 - h) return { name: "Waxing Crescent", emoji: "🌒" };
  if (p < 0.25 + h) return { name: "First Quarter", emoji: "🌓" };
  if (p < 0.5 - h) return { name: "Waxing Gibbous", emoji: "🌔" };
  if (p < 0.5 + h) return { name: "Full Moon", emoji: "🌕" };
  if (p < 0.75 - h) return { name: "Waning Gibbous", emoji: "🌖" };
  if (p < 0.75 + h) return { name: "Last Quarter", emoji: "🌗" };
  return { name: "Waning Crescent", emoji: "🌘" };
}

/** Days until the moon next reaches `targetPhase` (0 new, 0.5 full). */
function daysUntilPhase(date: Date, targetPhase: number): number {
  const current = phaseForDate(date);
  let delta = targetPhase - current;
  if (delta <= 0) delta += 1;
  return delta * SYNODIC;
}

/** The next calendar date the moon reaches `targetPhase`. */
export function nextPhaseDate(date: Date, targetPhase: number): Date {
  return new Date(date.getTime() + daysUntilPhase(date, targetPhase) * 86400000);
}

/**
 * True when `date` falls in the Full Moon name-window (the same ~3.7-day slot
 * `phaseName` labels "Full Moon"). Used to gate the moon-only secret so it can
 * only be found on the nights the real moon is actually full.
 */
export function isFullMoon(date: Date): boolean {
  return phaseName(phaseForDate(date)).name === "Full Moon";
}

export interface MoonInfo {
  phase: number;
  illumination: number;
  ageDays: number;
  name: string;
  emoji: string;
  waxing: boolean;
  nextFull: Date;
  nextNew: Date;
}

/** Everything the UI needs about the moon on a given date. */
export function moonInfo(date: Date): MoonInfo {
  const phase = phaseForDate(date);
  const { name, emoji } = phaseName(phase);
  return {
    phase,
    illumination: illumination(phase),
    ageDays: moonAgeDays(date),
    name,
    emoji,
    waxing: phase < 0.5,
    nextFull: nextPhaseDate(date, 0.5),
    nextNew: nextPhaseDate(date, 0),
  };
}
