/**
 * Lore content for the shrine. Drawn from published character material for
 * Columbina Hyposelenia. Descriptions are paraphrased summaries; the atmospheric
 * pull-quotes are evocative flavor written for this site, not claimed as verbatim
 * in-game voice lines. Sources are listed in `LORE_SOURCES` and surfaced in the footer.
 */

export interface LoreSection {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  /** Optional flavor line shown as a pull-quote beneath the section. */
  quote?: string;
}

export const LORE_SECTIONS: LoreSection[] = [
  {
    id: "kuutar",
    eyebrow: "I · Beneath the Moon",
    title: "Kuutar",
    body: [
      "Before she was a Harbinger, she was a goddess. Born on Hiisi Island some four to five centuries ago, she was taken in by the Frostmoon Scions and revered as their god — Kuutar, the moon made flesh.",
      "Cast into solitude from the moment of her creation, she learned early that reverence and affection are not the same thing.",
    ],
    quote: "She was worshipped long before she was known — and known by no one at all.",
  },
  {
    id: "scions",
    eyebrow: "II · The Weight of Worship",
    title: "The Frostmoon Scions",
    body: [
      "For roughly a century she remained their god, held aloft by devotion that asked everything of her and offered little in return.",
      "In time she grew disillusioned. A god who is only ever needed is never truly seen — and so, quietly, she chose to leave.",
    ],
  },
  {
    id: "fatui",
    eyebrow: "III · The Damselette",
    title: "Third of the Harbingers",
    body: [
      "Among the Fatui she became Columbina, the Damselette — third of the Eleven. She found them strange and, unexpectedly, appealing: no unreasonable demands, no worship, only the novel idea of 'colleagues.'",
      "There she sensed something unfamiliar and dear — a sense of equality, mingled with the familiar logic of trade. She formed her own attachments, notably with Sandrone.",
    ],
    quote: "For the first time, no one knelt. She found she preferred it.",
  },
  {
    id: "price",
    eyebrow: "IV · The Tsaritsa's Price",
    title: "What They Truly Wanted",
    body: [
      "At the Tsaritsa's behest she was made to surrender much of her power. In that demand she read the truth beneath the equality she had come to cherish: they, too, wanted only what she could give.",
      "Some devotions are just quieter forms of extraction.",
    ],
  },
  {
    id: "silvermoon",
    eyebrow: "V · Rest",
    title: "Silvermoon Hall",
    body: [
      "She left. Now she keeps to Silvermoon Hall on Hiisi Island, resting, recovering the strength that was taken from her — humming to herself, eyes closed, in no apparent hurry.",
      "The Moon Goddess of Nod-Krai has gone home to the moonlight.",
    ],
    quote: "Listen closely and you may catch her humming. She is in no hurry at all.",
  },
];

export interface Source {
  label: string;
  url: string;
}

export const LORE_SOURCES: Source[] = [
  {
    label: "Columbina — Genshin Impact Wiki (Fandom)",
    url: "https://genshin-impact.fandom.com/wiki/Columbina",
  },
  {
    label: "Columbina/Storyline — Genshin Impact Wiki (Fandom)",
    url: "https://genshin-impact.fandom.com/wiki/Columbina/Storyline",
  },
  {
    label: "Columbina Hyposelenia — Genshin Impact Wiki (Fandom)",
    url: "https://genshin-impact.fandom.com/wiki/Columbina_Hyposelenia",
  },
];
