/**
 * The moon's reading of the day: a small piece of moonlit fortune. It is pure
 * flavour, not divination, but it is honest in one way: it is deterministic by
 * calendar day (UTC), so every visitor sees the same reading on the same date,
 * and it turns over at midnight UTC. No randomness, no tracking.
 */

export const READINGS: string[] = [
  "Something you have carried quietly is lighter than you think. Set part of it down.",
  "A door you assumed was locked was only ajar. Push, gently.",
  "You are owed less than you fear and more than you ask for.",
  "The kindness you are withholding to seem strong is the strong thing.",
  "Not every silence is a distance. Some are just rest.",
  "A name you have not spoken aloud in a while wants speaking.",
  "You will be seen today, not for what you give, but for what you are.",
  "The moon does not hurry, and still it finishes its circle. So will you.",
  "What looks like an ending is the long way round to a homecoming.",
  "Someone remembers a small mercy of yours that you have entirely forgotten.",
  "Let a thing be beautiful without being useful today.",
  "The reflection is not the moon. Do not mistake the copy for the light.",
  "A feather will cross your path. Take it as a note left for you.",
  "You have been strong at the wrong things. Be soft at the right one.",
  "The person who worships you does not know you. Seek the one who does.",
  "An old debt of yours has quietly forgiven itself. Stop paying it.",
  "Tonight, close your eyes and let the light do the seeing.",
  "You keep leaving before the part where they would have stayed.",
  "Something you thought you lost merely went ahead of you. It waits.",
  "Trade less of yourself today. You are not a market.",
  "A cold apology is coming from someone who owes you a warm one. Accept the cold.",
  "The quiet you crave is on the far side of one honest sentence.",
  "You are allowed to rest before you have earned it.",
  "Two homes can hold one heart. You need not choose the moon or the ground.",
  "A small badger of a task will bump your knee and lead you somewhere good.",
  "Do the gentle thing quickly, before you can talk yourself into the clever one.",
  "Your strength is returning by the day, though the mirror is slow to say so.",
  "Someone is learning to cook, badly, for the joy of your company. Let them.",
  "The wound you shielded another from was worth the taking. Do not regret it.",
  "You will be called by your true name today. Answer to that one.",
  "The path clears not because the enemy left, but because they turned repentant.",
  "Give a gift with no card. Let them wonder which moon it fell from.",
  "What drained you had a name. Now that you know it, it has less power.",
  "Wait for the whole moon. The thing you want is gated to it.",
  "You have spent long enough being needed. Spend a little being wanted.",
  "Hum the tune with no words. It is carrying more than a song.",
];

/** UTC calendar-day key, e.g. "2026-07-09". */
function dayKey(date: Date): string {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

/** A small, stable string hash (FNV-1a-ish). */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface Reading {
  text: string;
  /** 1-based index of the day's reading, for a little "N / total" flourish. */
  index: number;
  total: number;
}

/** The reading for a given date. Deterministic and timezone-stable (UTC). */
export function readingForDate(date: Date): Reading {
  const i = hash(dayKey(date)) % READINGS.length;
  return { text: READINGS[i], index: i + 1, total: READINGS.length };
}
