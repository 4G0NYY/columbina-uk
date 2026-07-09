/**
 * Lore content for the shrine. Drawn from published character material for
 * Columbina Hyposelenia. Descriptions are paraphrased summaries; the atmospheric
 * pull-quotes are evocative flavor written for this site, not claimed as verbatim
 * in-game voice lines (the one exception, "May the moonlight connect us," is the
 * Frostmoon Scions' in-story motto). Sources are listed in `LORE_SOURCES` and
 * surfaced in the footer.
 *
 * ACT II contains major Nod-Krai story spoilers (the Rächer and Dottore arcs).
 */

export interface LoreSection {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  /** Optional flavor line shown as a pull-quote beneath the section. */
  quote?: string;
}

/** Act I — canon up to the Traveler finding her in Silvermoon Hall. */
export const LORE_SECTIONS: LoreSection[] = [
  {
    id: "kuutar",
    eyebrow: "I · Beneath the Moon",
    title: "Kuutar",
    body: [
      "Before she was a Harbinger, she was a goddess. Born on Hiisi Island some four to five centuries ago, she was taken in by the Frostmoon Scions and revered as their god. They called her Kuutar, the moon made flesh.",
      "Cast into solitude from the moment of her creation, she learned early that reverence and affection are not the same thing.",
    ],
    quote: "She was worshipped long before she was known, and known by no one at all.",
  },
  {
    id: "scions",
    eyebrow: "II · The Weight of Worship",
    title: "The Frostmoon Scions",
    body: [
      "For roughly a century she remained their god, held aloft by devotion that asked everything of her and offered little in return.",
      "In time she grew disillusioned. A god who is only ever needed is never truly seen. And so, quietly, she chose to leave.",
    ],
  },
  {
    id: "fatui",
    eyebrow: "III · The Damselette",
    title: "Third of the Harbingers",
    body: [
      "Among the Fatui she became Columbina, the Damselette, third of the Eleven. She found them strange and, unexpectedly, appealing: no unreasonable demands, no worship, only the novel idea of 'colleagues.'",
      "There she sensed something unfamiliar and dear, a sense of equality mingled with the familiar logic of trade. She formed her own attachments, notably with Sandrone.",
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
      "She left. Now she keeps to Silvermoon Hall on Hiisi Island, resting, recovering the strength that was taken from her, humming to herself with her eyes closed, in no apparent hurry.",
      "The Moon Goddess of Nod-Krai has gone home to the moonlight.",
    ],
    quote: "Listen closely and you may catch her humming. She is in no hurry at all.",
  },
];

/** Act II — the Rächer and Dottore arcs, through her homecoming. Spoilers. */
export const LORE_DEEP_SECTIONS: LoreSection[] = [
  {
    id: "palestar",
    eyebrow: "VI · The Highest Command",
    title: "The Palestar Edict",
    body: [
      "Believing the Fatui no different from the Scions who once worshipped her, and owing them nothing more, she left and returned to Hiisi Island. The subordinates once under her command were handed to Il Dottore.",
      "There, Lauma met her with an apology for the sins of ancestors, and hid her away in Silvermoon Hall to recover. The Fatui, unwilling to lose her, issued the Palestar Edict, the highest of the Tsaritsa's commands, to reclaim her at any cost. Her fellow Harbingers could not have cared less.",
    ],
    quote: "The order was absolute. Her colleagues merely yawned.",
  },
  {
    id: "racher",
    eyebrow: "VII · A Name From the Dark",
    title: "The Rächer of Solnari",
    body: [
      "A Luonnotar brought the Traveler to her door. She answered what she cared to, and cooled when they asked of the Fatui, then helped them recover a memory of the ship that had carried them to Teyvat.",
      "When the Wild Hunt stirred, she gave their enemy a name learned only from her colleagues: the Rächer of Solnari. The Traveler knew him as Rerir. On Starsand Shoal she spirited them all away before his blow could land, then, unseen, pressed a hand to her chest. There was not much time left.",
    ],
    quote: "She saved them without asking. Sandrone has still not forgiven the interruption.",
  },
  {
    id: "daysbeneath",
    eyebrow: "VIII · Between the Battles",
    title: "Days Beneath the Moon",
    body: [
      "There was quiet, too. She helped a kuuhenki named Maalaus gather pigments, and he painted her as she once was, a goddess of the Frostmoon Scions. A wandering lyre led her and the Traveler to the artisan Aino, and a mural of Rainbowdrop Crystals lit a path home for a lost Scion child.",
      "A Chic Badger bumped her knee mid-nap and led her back to Lauma, whose people now greet one another with a new motto. The Scions, she was glad to find, had changed.",
    ],
    quote: "May the moonlight connect us.",
  },
  {
    id: "marrow",
    eyebrow: "IX · Borrowed Strength",
    title: "The Iridescent Moon Marrow",
    body: [
      "Rerir came again, and even beside the Traveler, Flins, and Lauma she was overpowered; she shoved Jahoda from the path of his shot and took the wound herself. They ran.",
      "Through the Kuuvahki Experimental Design Bureau and Sandrone's arrangement with Arlecchino, she reached the Crimson Moon subspace and the Iridescent Moon Marrow, restoring the strength she had held as a Harbinger. She entrusted the Marrow to Arlecchino. Still it was not enough, until Albedo and Durin's alchemy siphoned Rerir's own power, and Dainsleif cast him from Teyvat.",
    ],
  },
  {
    id: "hyposelenia",
    eyebrow: "X · Called by Name",
    title: "Hyposelenia",
    body: [
      "Victory cost her. Her strength drained fast; she hoped only to last until Moon-Prayer Night. But Teyvat itself began to reject her. She passed clean through the Traveler, could not so much as enter the Hyperborean temple, and turned back toward Silvermoon Hall to meet her end.",
      "Then the Traveler called her name, and her form knit back together in the sound of it. Reunited, she chose a name of her own at last: Columbina Hyposelenia, the little dove born beneath the moon.",
    ],
    quote: "Called by name, she remembered how to exist.",
  },
  {
    id: "reflection",
    eyebrow: "XI · Backward Through Time",
    title: "The Moon's Reflection",
    body: [
      "At the festival, Il Dottore froze time and turned her own power against everyone but the Traveler. Rather than let him drink her dry, Columbina stepped out of the equation, falling into the moon's reflection and denying him his ascension.",
      "Within it she drifted backward through time, the quiet cause of a dozen unexplained things. She left a message in the Traveler's room; a repentant Rerir cleared her path; Tholindis, Sonnet, and at last Canon and Aria lent her their authority and their final wish: to rest at home, dissolving into moon marrow. With Sandrone's World-Formula computing the one possible moment, she returned.",
    ],
    quote: "She was the ghost in every unexplained thing, haunting her way home.",
  },
  {
    id: "return",
    eyebrow: "XII · The Reckoning",
    title: "The Dove Returns",
    body: [
      "Together they broke Dottore, and a great beam of kuuvahki light seemed to end him. In the aftermath she found Sandrone fallen and cradled her, her trilune authority for once unable to call a friend back. She gave Arlecchino gentle words, and grew.",
      "With the Palestar Edict revoked, the Tsaritsa let her go at last. She showed the Traveler the Frost Moon, and the ship the Heavenly Principles had hidden there, and spoke of what might yet wait in Snezhnaya.",
    ],
  },
  {
    id: "homecoming",
    eyebrow: "XIII · Two Homes, One Moonlight",
    title: "Homecoming",
    body: [
      "She chose to live among the Frostmoon Scions again. She revived Luonnotar and gave it free will, let a winged statue be raised in her likeness, learned to cook (badly, then quickly), and slipped small gifts to her friends, including a new wind glider to the Traveler for the company.",
      "When a false Wild Hunt stirred, she checked the Moon's Reflection and found Rerir blameless. And when Fontaine held its film festival, she was cast as the lead of 'A Homecoming,' reunited with Sandrone beneath the lights, and met a dragon who wept. Both moon and Teyvat, now, are home.",
    ],
    quote: "Two homes, one moonlight, and at last time enough to enjoy them.",
  },
];

export interface Source {
  label: string;
  url: string;
}

export const LORE_SOURCES: Source[] = [
  {
    label: "Columbina · Genshin Impact Wiki (Fandom)",
    url: "https://genshin-impact.fandom.com/wiki/Columbina",
  },
  {
    label: "Columbina/Storyline · Genshin Impact Wiki (Fandom)",
    url: "https://genshin-impact.fandom.com/wiki/Columbina/Storyline",
  },
  {
    label: "Columbina Hyposelenia · Genshin Impact Wiki (Fandom)",
    url: "https://genshin-impact.fandom.com/wiki/Columbina_Hyposelenia",
  },
  {
    label: "“Columbina” lullaby · official audio © HoYoverse",
    url: "https://genshin.hoyoverse.com/",
  },
];
