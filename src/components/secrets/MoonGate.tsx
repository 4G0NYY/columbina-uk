import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoonPhase } from "../ambient/MoonPhase";
import { useSecrets } from "./SecretProvider";
import { isFullMoon, phaseForDate } from "../../lib/moon";
import { playHum } from "../../lib/hum";

/**
 * A secret that keeps the moon's own hours (SECRET: "moongate").
 *
 * On the nights the *real* moon is full, a faint second moon rises here to be
 * clicked. On every other night there is nothing to find but the waiting — the
 * only secret on the shrine that a patient visitor cannot rush, and must come
 * back for under a whole moon.
 */
export function MoonGate({ date }: { date: Date }) {
  const { discover, has } = useSecrets();
  const [opened, setOpened] = useState(false);
  const full = isFullMoon(date);
  const found = has("moongate");

  // Nothing to reveal unless the sky is actually full tonight.
  if (!full) {
    return (
      <p className="mt-6 font-display text-sm italic text-moon-500">
        {found
          ? "You kept her hours once, under a full moon. The gate remembers you."
          : "Something waits here, but only when the moon is truly full. Come back beneath a whole moon."}
      </p>
    );
  }

  function onOpen() {
    discover("moongate");
    playHum();
    setOpened(true);
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={onOpen}
        aria-label="A full moon, risen and waiting"
        title="The moon is whole tonight. Reach for it."
        className="group relative rounded-full outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-halo/50"
      >
        <span className="pointer-events-none absolute inset-0 -z-10 animate-haloPulse rounded-full bg-halo/20 blur-2xl" />
        <MoonPhase phase={phaseForDate(date)} size={96} title="The full moon, waiting" />
      </button>

      <AnimatePresence>
        {opened && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xs text-center font-display text-sm italic text-lavender"
          >
            The gate opens only under a whole moon. You were here for it.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
