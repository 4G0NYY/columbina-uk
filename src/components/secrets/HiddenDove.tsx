import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DoveGlyph } from "../ambient/DoveGlyph";
import { useSecrets } from "./SecretProvider";
import { playHum } from "../../lib/hum";

const WHISPERS = [
  "…mm-mm-mmm…",
  "You found me. How patient of you.",
  "The moon keeps my secrets. You may keep this one.",
];

/**
 * A barely-there dove nestled in a far corner. A sharp eye finds it; a click
 * earns a hum and a whisper (SECRET: "dove").
 */
export function HiddenDove() {
  const { discover, has } = useSecrets();
  const [whisper, setWhisper] = useState<string | null>(null);

  function onClick() {
    discover("dove");
    playHum();
    const line = has("dove")
      ? WHISPERS[Math.floor(Math.random() * WHISPERS.length)]
      : WHISPERS[0];
    setWhisper(line);
    window.setTimeout(() => setWhisper(null), 3500);
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-30 flex items-end gap-2">
      <AnimatePresence>
        {whisper && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-2 max-w-[12rem] font-display text-sm italic text-lavender"
          >
            {whisper}
          </motion.span>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={onClick}
        aria-label="A hidden dove"
        className="pointer-events-auto text-moon-600/25 transition-all duration-700 hover:scale-110 hover:text-moon-200"
      >
        <DoveGlyph size={26} />
      </button>
    </div>
  );
}
