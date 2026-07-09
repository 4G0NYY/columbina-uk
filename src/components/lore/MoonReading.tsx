import { useMemo } from "react";
import { motion } from "framer-motion";
import { MoonPhase } from "../ambient/MoonPhase";
import { moonInfo } from "../../lib/moon";
import { readingForDate } from "../../lib/reading";

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/**
 * The moon's reading of the day — a single line of moonlit fortune, the same
 * for everyone on a given date and renewed at midnight UTC. Flavour, not
 * divination, and it says so.
 */
export function MoonReading({ date }: { date: Date }) {
  const info = useMemo(() => moonInfo(date), [date]);
  const reading = useMemo(() => readingForDate(date), [date]);

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <motion.figure
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="panel flex flex-col items-center gap-5 px-8 py-10 text-center"
      >
        <MoonPhase phase={info.phase} size={64} title={`${info.name} — the reading's moon`} />
        <p className="eyebrow">The moon's reading · {fmtDate(date)}</p>
        <blockquote className="font-display text-2xl font-light leading-snug text-moon-50 sm:text-[1.7rem]">
          “{reading.text}”
        </blockquote>
        <figcaption className="font-mono text-[0.62rem] uppercase tracking-widest text-moon-600">
          Reading {reading.index} of {reading.total} · drawn by moonlight, for amusement · renews at
          midnight UTC
        </figcaption>
      </motion.figure>
    </section>
  );
}
