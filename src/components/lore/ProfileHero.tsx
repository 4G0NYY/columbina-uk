import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { HaloRing } from "../ambient/HaloRing";
import { MoonPhase, phaseForDate } from "../ambient/MoonPhase";
import { useSecrets } from "../secrets/SecretProvider";
import { CHIPS } from "../../data/profile";

/**
 * The profile masthead: her portrait framed against a moonlit halo, beside her
 * name, title, and at-a-glance chips.
 *
 * Preserves the two hero secrets from the original shrine: clicking the small
 * moon seven times (SECRET: "moon") and holding the pointer on her name to
 * reveal "Kuutar" (SECRET: "kuutar").
 */
export function ProfileHero({ seedDate }: { seedDate: Date }) {
  const { discover, has } = useSecrets();
  const [phase, setPhase] = useState(() => phaseForDate(seedDate));
  const [revealName, setRevealName] = useState(false);
  const moonClicks = useRef(0);
  const holdTimer = useRef<number | null>(null);

  function onMoonClick() {
    setPhase((p) => (p + 1 / 8) % 1);
    moonClicks.current += 1;
    if (moonClicks.current >= 7) discover("moon");
  }

  function startHold() {
    holdTimer.current = window.setTimeout(() => {
      setRevealName(true);
      discover("kuutar");
    }, 850);
  }
  function endHold() {
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
    holdTimer.current = null;
  }

  return (
    <header className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-28">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
        {/* Portrait, haloed by moonlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="relative mx-auto flex items-center justify-center"
        >
          <HaloRing
            className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            size={420}
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-moon-600/25 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
            <img
              src="/assets/columbina.jpeg"
              alt="Columbina, gazing at the moon"
              width={640}
              height={1170}
              loading="eager"
              className="h-auto w-full max-w-[20rem] object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-moon-50/10" />
          </div>

          {/* Small, interactive moon accent: cycles phase; the 7-click secret. */}
          <div className="absolute -right-3 -top-3 sm:-right-5 sm:-top-5">
            <MoonPhase
              phase={phase}
              size={84}
              onClick={onMoonClick}
              title={
                has("moon")
                  ? "The moon answers your patience."
                  : "The Moon. She seems to watch back."
              }
            />
          </div>
        </motion.div>

        {/* Identity */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <p className="eyebrow mb-5">The Little Dove Born Beneath the Moon</p>

          <h1
            className="select-none font-display text-6xl font-light tracking-wide text-moon-50 sm:text-7xl"
            onPointerDown={startHold}
            onPointerUp={endHold}
            onPointerLeave={endHold}
            title="Hold, and the name beneath the name may surface."
          >
            <span className="relative inline-block">
              <span
                className={`transition-opacity duration-700 ${revealName ? "opacity-0" : "opacity-100"}`}
              >
                Columbina
              </span>
              <span
                aria-hidden
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 halo-text ${
                  revealName ? "opacity-100" : "opacity-0"
                }`}
              >
                Kuutar
              </span>
            </span>
          </h1>

          <p className="mt-5 font-display text-xl font-light italic text-lavender sm:text-2xl">
            Hyposelenia · Damselette, Third of the Fatui Harbingers
          </p>

          {/* At-a-glance chips */}
          <ul className="mt-8 flex flex-wrap justify-center gap-2.5 md:justify-start">
            {CHIPS.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-moon-600/25 bg-midnight/40 px-4 py-1.5 font-mono text-[0.68rem] uppercase tracking-widest2 text-moon-300 backdrop-blur-sm"
              >
                {chip}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2, delay: 1.6 }}
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-moon-500"
      >
        <span className="eyebrow">Descend into the moonlight</span>
        <span className="animate-bounce text-lg">↓</span>
      </motion.div>
    </header>
  );
}
