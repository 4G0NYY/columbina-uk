/**
 * Her constellation of bonds: the people who shaped Columbina's story, drawn
 * as stars around her. Blurbs are paraphrased from the same community sources
 * as the rest of the shrine (see LORE_SOURCES); positions are just aesthetic,
 * laid out to read like a real constellation.
 */

export interface Relation {
  id: string;
  name: string;
  /** One-word/one-phrase tie, shown as a label. */
  tie: string;
  /** A short paraphrased note on what passed between them. */
  note: string;
  /** Normalised star position on a 100 × 96 field. */
  x: number;
  y: number;
}

/** The centre of it all. */
export const CENTER = { id: "columbina", name: "Columbina", x: 50, y: 50 };

export const RELATIONS: Relation[] = [
  {
    id: "traveler",
    name: "The Traveler",
    tie: "called her by name",
    note: "When Teyvat began to reject her and she passed clean through them, it was the Traveler who called her name, and her form knit back together in the sound of it. She later showed them the Frost Moon and the ship hidden within it.",
    x: 50,
    y: 15,
  },
  {
    id: "sandrone",
    name: "Sandrone",
    tie: "her dearest colleague",
    note: "Among the Harbingers she formed few attachments, but Sandrone was one. Her World-Formula computed the single moment Columbina could return home; at the end, Columbina cradled her when she fell, her authority for once unable to call a friend back.",
    x: 25,
    y: 24,
  },
  {
    id: "arlecchino",
    name: "Arlecchino",
    tie: "kept the Marrow",
    note: "Through Sandrone's arrangement with Arlecchino, Columbina reached the Iridescent Moon Marrow and the strength taken from her. She entrusted the Marrow to Arlecchino's keeping, and later gave her gentle words.",
    x: 76,
    y: 24,
  },
  {
    id: "dottore",
    name: "Il Dottore",
    tie: "her undoing, undone",
    note: "Her Fatui subordinates were handed to him when she left. During Moon-Prayer Night he froze time and turned her own power against everyone but the Traveler, so she stepped out of the equation entirely, falling into the moon's reflection to deny him his ascension. In the end, together, they broke him.",
    x: 86,
    y: 50,
  },
  {
    id: "rerir",
    name: "Rerir",
    tie: "the Rächer of Solnari",
    note: "The enemy the Traveler knew as Rerir, master of the Wild Hunt. He overpowered her twice and she took a wound meant for another. A repentant Rerir later cleared her path home, and when a false Wild Hunt stirred she looked into the moon's reflection and found him blameless of it.",
    x: 74,
    y: 80,
  },
  {
    id: "tsaritsa",
    name: "The Tsaritsa",
    tie: "demanded, then released",
    note: "At her behest Columbina surrendered much of her power, and in that demand read the same extraction the Scions had called worship. The Tsaritsa issued the Palestar Edict to reclaim her at any cost, and, at the very last, revoked it and let her go.",
    x: 50,
    y: 88,
  },
  {
    id: "lauma",
    name: "Lauma",
    tie: "apologised, and hid her",
    note: "A Moonchanter of the Frostmoon Scions. She met Columbina with an apology for the sins of ancestors and hid her away in Silvermoon Hall to recover. The Scions, Columbina was glad to find, had changed.",
    x: 22,
    y: 78,
  },
  {
    id: "canon-aria",
    name: "The Moon Sisters",
    tie: "lent their last wish",
    note: "The three Moon Sisters before her: Canon of the Frost Moon, Aria of the Eternal Moon, and Sonnet of the Iridescent Moon. They lent Columbina their authority and their final wish (to rest at home, dissolving into moon marrow) so that she could return; Tholindis, whose soul waited in the moon's reflection, showed her the way back through time.",
    x: 13,
    y: 47,
  },
];

/** Extra ties between the satellites themselves, drawn faintly. */
export const CROSS_LINKS: Array<[string, string]> = [
  ["sandrone", "arlecchino"],
  ["dottore", "rerir"],
];
