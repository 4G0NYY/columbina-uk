/**
 * Profile-card data for Columbina — the "at a glance" vitals, her many names,
 * name etymologies, and notable trivia.
 *
 * Verified against the Genshin Impact Wiki's main Columbina article (infobox,
 * "Aliases and Titles," "Etymology," and "Trivia" sections). Sources are listed
 * in `LORE_SOURCES` and surfaced in the footer.
 */

export interface Vital {
  label: string;
  value: string;
  /** Optional secondary line shown in smaller, dimmer type. */
  note?: string;
}

/** Infobox-style key facts. */
export const VITALS: Vital[] = [
  { label: "Real name", value: "Columbina Hyposelenia", note: "“Born Beneath the Moon,” the name she chose" },
  { label: "Born as", value: "Kuutar", note: "on Hiisi Island, 400–500 years ago" },
  { label: "Title", value: "Moon Goddess of Nod-Krai", note: "the Trilune Goddess" },
  { label: "Rank", value: "Third of the Eleven", note: "Fatui Harbingers (formerly)" },
  { label: "Element", value: "Hydro", note: "Tri-Lunar Convergence" },
  { label: "Weapon", value: "Catalyst" },
  { label: "Rarity", value: "5★" },
  { label: "Species", value: "God", note: "born of kuuvahki, the Moon's own light" },
  { label: "Affiliations", value: "Frostmoon Scions · Fatui · Three Moons" },
  { label: "Region", value: "Nod-Krai", note: "Hiisi Island · Silvermoon Hall" },
  { label: "Voiced by", value: "Emi Lo (EN) · Lynn (JP)", note: "Yang Menglu (CN) · Yu Yeong (KR)" },
  { label: "Status", value: "Home", note: "resting between two moonlights" },
];

/** Short "at a glance" chips shown in the profile hero. */
export const CHIPS: string[] = ["Hydro", "Catalyst", "3rd Harbinger", "Nod-Krai", "5★"];

export interface Alias {
  name: string;
  by: string;
}

/** Every name and title she has carried, and who bestowed it. */
export const ALIASES: Alias[] = [
  { name: "Kuutar", by: "birth name, the Frostmoon Scions' Moon Goddess" },
  { name: "Moon Maiden", by: "by the Frostmoon Scions" },
  { name: "Moon Goddess of Nod-Krai", by: "her standing among the Scions" },
  { name: "Goddess of the Frost Moon", by: "her origin among the Three Moons" },
  { name: "New Moon", by: "successor to Canon, the Scions' old moon" },
  { name: "The Damselette", by: "former Fatui codename, given by the Tsaritsa" },
  { name: "The Third of the Eleven", by: "her former rank among the Harbingers" },
  { name: "Trilune Goddess", by: "after inheriting all Three Moons' authority" },
  { name: "Welkin Moon Goddess", by: "her risen, whole self" },
  { name: "Lord of the Crossroads", by: "an epithet shared with the Lord of the Night" },
];

export interface Etymology {
  term: string;
  gloss: string;
  body: string;
}

/** Name origins, drawn from the wiki's Etymology section. */
export const ETYMOLOGY: Etymology[] = [
  {
    term: "Columbina",
    gloss: "Italian · “little dove”",
    body:
      "From Colombina, a stock character of the commedia dell'arte: a maidservant often called the only functional intellect on the stage, forever scheming to bring the lovers together. It is the Italian theatre tradition that names every one of the Eleven Fatui Harbingers.",
  },
  {
    term: "Hyposelenia",
    gloss: "Greek · “beneath the moon”",
    body:
      "From hypo- (beneath) and selēnē (moon, also Selene, the Greek moon goddess), with a feminine ending. In-game she says it means “Born Beneath the Moon.” It is the first name that was truly hers to give.",
  },
  {
    term: "Kuutar",
    gloss: "Finnish · “Lady Moon”",
    body:
      "The Finnish goddess of the Moon, who owns the moon's gold, spinning golden yarn and weaving it into cloth, and who stands for the New Moon. A fitting root for Nod-Krai, whose culture draws on the Finnish and the Nordic.",
  },
  {
    term: "Lord of the Crossroads",
    gloss: "Greek · Hecate",
    body:
      "An epithet echoing Hecate, the Greek moon goddess of crossroads, magic, and witchcraft. Her elder Moon Sisters share the Latin title “Trivia,” goddesses said to watch over where the roads divide.",
  },
];

/** Notable trivia, curated from the wiki's Trivia section. */
export const TRIVIA_NOTES: string[] = [
  "She keeps her eyes closed. She once refused to look upon a world she believed built on lies and falsehood, and instead senses everything through kuuvahki, moonlight that in some ways sees more than sight.",
  "She is the first playable deity in Genshin Impact who is not one of The Seven.",
  "Her constellations are the only ones with no stars at all; they are the phases of the moon instead.",
  "She hates drinking coffee but loves how it smells, a habit she most likely picked up from Sandrone.",
  "The flowers of Silvermoon Hall answer her moods: they turn red when she is angry or unsafe, and white when her strength runs low.",
  "She leaves a scatter of white feathers wherever she teleports herself or others.",
  "Her winged headpiece is modelled on a seraph's wings; the mask over her eyes echoes the pattern beneath a Seelie Court.",
  "The lullaby she hums, heard in “A Winter Night's Lazzo,” weaves together Chrysalis Suspirii and Saltatio Favillae, the themes from the battle against La Signora.",
];
