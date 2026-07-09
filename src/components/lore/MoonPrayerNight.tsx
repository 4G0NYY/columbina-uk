import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { moonInfo, isFullMoon } from "../../lib/moon";
import { MoonGate } from "../secrets/MoonGate";

const fmtLong = (d: Date) =>
  d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

/** Split the gap to the next full moon into whole days and hours. */
function untilParts(target: Date, now: Date): { days: number; hours: number } {
  const ms = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  return { days, hours };
}

/**
 * The vigil. She hoped only to last until Moon-Prayer Night, the full moon,
 * and this band counts the shrine down to the next real one. On the night it
 * arrives it also opens the moon-gate secret (see MoonGate).
 */
export function MoonPrayerNight({ date }: { date: Date }) {
  // Re-read the clock every minute so the hours tick down while the page is open.
  const [now, setNow] = useState(date);
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(id);
  }, []);

  const info = useMemo(() => moonInfo(now), [now]);
  const full = isFullMoon(now);
  const { days, hours } = untilParts(info.nextFull, now);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="panel px-7 py-10"
      >
        <p className="eyebrow mb-3">The Vigil</p>
        <h2 className="font-display text-3xl font-light text-moon-50 sm:text-4xl">
          {full ? "Moon-Prayer Night is here" : "Moon-Prayer Night"}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-moon-400">
          When her strength ran fast, she hoped only to last until Moon-Prayer Night, the night
          the moon comes whole. The shrine keeps the vigil for her, counting down to the next real
          full moon overhead.
        </p>

        {full ? (
          <p className="mt-8 font-display text-2xl font-light text-halo-soft halo-text">
            The moon is whole tonight.
          </p>
        ) : (
          <div className="mt-8 flex items-end justify-center gap-6 font-display text-moon-50">
            <span className="flex flex-col items-center">
              <span className="text-5xl font-light tabular-nums sm:text-6xl">{days}</span>
              <span className="eyebrow mt-1">{days === 1 ? "day" : "days"}</span>
            </span>
            <span className="pb-6 text-3xl font-light text-moon-600">·</span>
            <span className="flex flex-col items-center">
              <span className="text-5xl font-light tabular-nums sm:text-6xl">{hours}</span>
              <span className="eyebrow mt-1">{hours === 1 ? "hour" : "hours"}</span>
            </span>
          </div>
        )}

        <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-widest text-moon-500">
          Next full moon · {fmtLong(info.nextFull)}
        </p>

        {/* The phase-gated secret rises here on the night the moon is full. */}
        <MoonGate date={now} />
      </motion.div>
    </section>
  );
}
