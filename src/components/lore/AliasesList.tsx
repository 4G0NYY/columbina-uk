import { motion } from "framer-motion";
import { ALIASES } from "../../data/profile";

/**
 * Every name and title Columbina has carried; she never identified with any of
 * them until she chose her own.
 */
export function AliasesList() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow mb-3 text-center">She Answered to All of Them, and to None</p>
      <h2 className="mb-10 text-center font-display text-3xl font-light text-moon-50 sm:text-4xl">
        Names &amp; Titles
      </h2>
      <motion.dl
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="divide-y divide-moon-600/15"
      >
        {ALIASES.map((a) => (
          <div
            key={a.name}
            className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <dt className="font-display text-xl font-light text-moon-50">{a.name}</dt>
            <dd className="text-sm italic text-moon-500 sm:text-right">{a.by}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
