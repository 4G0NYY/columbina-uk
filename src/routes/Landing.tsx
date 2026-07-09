import { Link } from "react-router-dom";
import { Header } from "../components/site/Header";
import { SiteFooter } from "../components/site/SiteFooter";
import { Starfield } from "../components/ambient/Starfield";
import { Feathers } from "../components/ambient/Feathers";
import { ProfileHero } from "../components/lore/ProfileHero";
import { MoonTonight } from "../components/lore/MoonTonight";
import { VitalsCard } from "../components/lore/VitalsCard";
import { LoreTimeline } from "../components/lore/LoreTimeline";
import { AliasesList } from "../components/lore/AliasesList";
import { EtymologyGrid } from "../components/lore/EtymologyGrid";
import { TriviaNotes } from "../components/lore/TriviaNotes";
import { KonamiListener } from "../components/secrets/KonamiListener";
import { HiddenDove } from "../components/secrets/HiddenDove";
import { SecretFeather } from "../components/secrets/SecretFeather";
import { LORE_SECTIONS, LORE_DEEP_SECTIONS } from "../data/lore";

export function Landing() {
  // Browser-only render; seeds the hero moon to tonight's real phase.
  const seedDate = new Date();

  return (
    <div className="relative">
      <Starfield />
      <Feathers />
      <Header />
      <KonamiListener />
      <HiddenDove />
      <SecretFeather />

      <ProfileHero seedDate={seedDate} />

      <MoonTonight date={seedDate} />

      <VitalsCard />

      {/* Act I — canon up to her rest in Silvermoon Hall */}
      <section className="mx-auto max-w-2xl px-6 pb-4 pt-10 text-center">
        <p className="eyebrow mb-3">Her Story</p>
        <h2 className="font-display text-3xl font-light text-moon-50 sm:text-4xl">
          Beneath the Moon
        </h2>
      </section>
      <LoreTimeline sections={LORE_SECTIONS} />

      {/* Spoiler veil before the deep story (Rächer & Dottore arcs) */}
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <div className="mx-auto mb-6 h-px w-2/3 bg-gradient-to-r from-transparent via-moon-600/40 to-transparent" />
        <p className="eyebrow text-halo/70">Beyond here, the whole of the moon's tale</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-moon-500">
          Major Nod-Krai story spoilers follow: the Rächer of Solnari and Il Dottore arcs,
          through to her homecoming.
        </p>
      </div>

      <LoreTimeline sections={LORE_DEEP_SECTIONS} />

      {/* Trivia — names, etymology, and small true things */}
      <div className="mx-auto my-8 h-px w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-moon-600/30 to-transparent" />
      <AliasesList />
      <EtymologyGrid />
      <TriviaNotes />

      {/* Bridge to the calculator */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="eyebrow mb-4">And when the moon turns to war</p>
        <h2 className="mb-6 font-display text-3xl font-light text-moon-50 sm:text-4xl">
          Reckon her Lunar tides
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-moon-400">
          A damage calculator built on the game's real formula, accurate to your own build and
          honest about what is still community-sourced.
        </p>
        <Link
          to="/calculator"
          className="inline-block rounded-full border border-halo/40 px-8 py-3 font-mono text-xs uppercase tracking-widest2 text-halo transition-colors hover:bg-halo/10"
        >
          Open the Calculator
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
