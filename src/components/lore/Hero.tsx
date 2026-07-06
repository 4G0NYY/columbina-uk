import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { HaloRing } from "../ambient/HaloRing";
import { MoonPhase, phaseForDate } from "../ambient/MoonPhase";
import { useSecrets } from "../secrets/SecretProvider";

/**
 * The opening scene: halo, moon, and the wordmark.
 * Houses two secrets — clicking the moon seven times (SECRET: "moon") and
 * holding the pointer on her name to reveal "Kuutar" (SECRET: "kuutar").
 */
export function Hero({ seedDate }: { seedDate: Date }) {
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
    <header className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="relative flex items-center justify-center">
        <HaloRing className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size={560} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <MoonPhase
            phase={phase}
            size={240}
            onClick={onMoonClick}
            title={
              has("moon")
                ? "The moon answers your patience."
                : "The Moon — she seems to watch back."
            }
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
        className="mt-10"
      >
        <p className="eyebrow mb-5">The Little Dove Born Beneath the Moon</p>

        <h1
          className="select-none font-display text-6xl font-light tracking-wide text-moon-50 sm:text-8xl"
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

        <p className="mt-6 font-display text-xl font-light italic text-lavender sm:text-2xl">
          Hyposelenia · Damselette, Third of the Fatui Harbingers
        </p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2, delay: 1.6 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-moon-500"
      >
        <span className="eyebrow">Descend into the moonlight</span>
        <span className="animate-bounce text-lg">↓</span>
      </motion.div>
    </header>
  );
}
