import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSecrets } from "./SecretProvider";
import { playHum } from "../../lib/hum";

/**
 * A single, catchable feather. Unlike the ambient Feathers (which are inert
 * decoration), this one drifts down the page every so often and can be clicked.
 * Catching it earns the "feather" secret and a hum. It re-appears at a new
 * horizontal position on a slow cycle, so a patient visitor will meet it.
 */
export function SecretFeather() {
  const { discover, has } = useSecrets();
  const [left, setLeft] = useState(() => 12 + Math.floor((Date.now() / 1000) % 70));
  const [caught, setCaught] = useState(false);

  // Reposition on each drift cycle so it wanders across the page.
  useEffect(() => {
    if (has("feather")) return;
    const cycle = 26000; // matches the drift duration below
    const id = window.setInterval(() => {
      setLeft(() => 8 + Math.floor(Math.random() * 78));
    }, cycle);
    return () => window.clearInterval(id);
  }, [has]);

  if (has("feather") && !caught) return null;

  function onCatch() {
    discover("feather");
    playHum();
    setCaught(true);
    window.setTimeout(() => setCaught(false), 3200);
  }

  return (
    <>
      {!has("feather") && (
        <button
          type="button"
          onClick={onCatch}
          aria-label="A drifting feather"
          title="A feather, drifting…"
          className="fixed top-0 z-50 -translate-y-6 text-moon-200/60 transition-colors hover:text-moon-50"
          style={{
            left: `${left}%`,
            animation: "drift 26s linear infinite",
            filter: "drop-shadow(0 4px 10px rgba(182,192,224,0.3))",
          }}
        >
          <svg viewBox="0 0 24 48" width="20" height="40" aria-hidden>
            <path
              d="M12 1C6 8 3 18 4 30c.4 5 3 12 8 16 0-6 1-10 3-14-2 1-4 1-6 1 3-2 6-5 7-9-2 1-4 1-6 1 4-3 7-7 8-13-1-4-2-8-6-11Z"
              fill="currentColor"
              opacity="0.9"
            />
            <path
              d="M12 2C11 14 11 30 12 46"
              stroke="#0a0d1a"
              strokeWidth="0.6"
              opacity="0.4"
              fill="none"
            />
          </svg>
        </button>
      )}

      <AnimatePresence>
        {caught && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed bottom-16 right-4 z-30 max-w-[12rem] text-right font-display text-sm italic text-lavender"
          >
            A feather, caught. She leaves them wherever she goes.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
