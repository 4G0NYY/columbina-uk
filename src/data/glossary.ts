/**
 * The tongues beneath Nod-Krai. Its culture is built on Finnish and Nordic
 * roots, and Columbina's story is thick with the vocabulary. These are honest
 * glosses: real words are marked with their language; terms the game appears to
 * have coined from those roots are flagged `coined`, so nothing here overclaims.
 * Pronunciations are rough English approximations, not IPA.
 */

export interface GlossEntry {
  term: string;
  lang: string;
  pron: string;
  gloss: string;
  body: string;
  /** True when the game seems to have invented the word from real roots. */
  coined?: boolean;
}

export const GLOSSARY: GlossEntry[] = [
  {
    term: "Kuu",
    lang: "Finnish",
    pron: "koo",
    gloss: "the moon",
    body: "The plain Finnish word for the moon, and the root under almost every moon-word in Nod-Krai. Once you can hear it, you can hear it everywhere in her story.",
  },
  {
    term: "Kuutar",
    lang: "Finnish",
    pron: "KOO-tar",
    gloss: "Lady Moon",
    body: "The Finnish goddess of the moon, who owns the moon's gold, spinning it into yarn and weaving it into cloth, and who stands for the New Moon. It was Columbina's first name, given by the Frostmoon Scions.",
  },
  {
    term: "Kuuvahki",
    lang: "from Finnish roots",
    pron: "KOO-vah-ki",
    gloss: "moon power",
    body: "The primordial energy and power of the Three Moons. She turns her own body into it and pours it over Nod-Krai, and perceives the world through it while her eyes stay closed. Built from kuu (moon) and väki, a Finnic word for power or supernatural force; the compound spelling is the game's own.",
    coined: true,
  },
  {
    term: "Kuuhenki",
    lang: "from Finnish roots",
    pron: "KOO-hen-ki",
    gloss: "moon spirit",
    body: "A spirit of the moon; Maalaus, who painted her as the goddess she once was, is one. From kuu (moon) and henki, Finnish for breath or spirit.",
    coined: true,
  },
  {
    term: "Luonnotar",
    lang: "Finnish",
    pron: "LWON-no-tar",
    gloss: "daughter of nature",
    body: "In the Kalevala, a spirit of creation, the mother of the sea and sky. In Nod-Krai it names a rare kind of moon spirit, a luonnotar being a type of kuuhenki; one was made from a fragment of Columbina's own soul to guide the Traveler to her.",
  },
  {
    term: "Hiisi",
    lang: "Finnish",
    pron: "HEE-see",
    gloss: "a sacred, uncanny place",
    body: "In old Finnish belief, a holy grove or site; in the Kalevala the word darkens into a place, and a spirit, of dread. Hiisi Island is where she was born, and where Silvermoon Hall now keeps her.",
  },
  {
    term: "Rächer",
    lang: "German",
    pron: "REH-khuhr",
    gloss: "avenger",
    body: "The German word for one who avenges. The Rächer of Solnari is how she named the enemy the Traveler knew as Rerir, the master of the Wild Hunt; it is his own Khaenri'ah epithet, which she recognised rather than coined. The Harbingers' world keeps its German just as their titles keep their Italian.",
  },
  {
    term: "Hyposelenia",
    lang: "Greek",
    pron: "hy-po-se-LEE-nee-a",
    gloss: "beneath the moon",
    body: "From hypo- (beneath) and selēnē (moon, and Selene the moon goddess). The name she finally chose for herself: born beneath the moon. The first that was truly hers to give.",
  },
];
