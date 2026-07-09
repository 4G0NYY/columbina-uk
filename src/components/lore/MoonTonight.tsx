import { useMemo } from "react";
import { motion } from "framer-motion";
import { MoonPhase } from "../ambient/MoonPhase";
import { moonInfo } from "../../lib/moon";

const fmtDate = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });

function countdown(target: Date, now: Date): string {
  const days = Math.max(0, Math.round((target.getTime() - now.getTime()) / 86400000));
  if (days === 0) return "tonight";
  if (days === 1) return "tomorrow";
  return `in ${days} days`;
}

/**
 * A quiet readout of the real moon overhead right now. The hero moon already
 * seeds to tonight's phase; this names it, and washes the top of the page with
 * a warmth that rises and falls with the actual illumination, so the site is
 * brightest under a full moon and near-dark at the new.
 */
export function MoonTonight({ date }: { date: Date }) {
  const info = useMemo(() => moonInfo(date), [date]);
  const lit = Math.round(info.illumination * 100);

  return (
    <section className="mx-auto max-w-3xl px-6 py-6">
      {/* Phase-reactive wash: alpha tracks the real illuminated fraction. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[65vh]"
        style={{
          background: `radial-gradient(1000px 520px at 50% -18%, rgba(233,207,143,${(
            info.illumination * 0.11 +
            0.015
          ).toFixed(3)}), transparent 62%)`,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="panel flex flex-col items-center gap-6 px-7 py-6 text-center sm:flex-row sm:text-left"
      >
        <MoonPhase phase={info.phase} size={76} title={`${info.name}, ${lit}% lit`} />

        <div className="sm:flex-1">
          <p className="eyebrow mb-1">The moon tonight</p>
          <p className="font-display text-2xl font-light text-moon-50">
            {info.emoji} {info.name}
          </p>
          <p className="mt-1 text-sm text-moon-400">
            {lit}% illuminated · {info.waxing ? "waxing" : "waning"} · day{" "}
            {Math.round(info.ageDays)} of her cycle
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[0.7rem] uppercase tracking-widest text-moon-500 sm:text-right">
          <dt className="text-left sm:text-right">Full moon</dt>
          <dd className="text-halo/80">{countdown(info.nextFull, date)}</dd>
          <dt className="text-left sm:text-right">New moon</dt>
          <dd className="text-moon-300">{countdown(info.nextNew, date)}</dd>
          <dt className="text-left sm:text-right">Next full</dt>
          <dd className="text-moon-300">{fmtDate(info.nextFull)}</dd>
        </dl>
      </motion.div>
    </section>
  );
}
