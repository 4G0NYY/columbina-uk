import { motion } from "framer-motion";
import type { LoreSection } from "../../data/lore";
import { PullQuote } from "./PullQuote";

export function LorePanel({ section, index }: { section: LoreSection; index: number }) {
  const alignRight = index % 2 === 1;

  return (
    <section id={section.id} className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`max-w-2xl ${alignRight ? "ml-auto text-right" : "text-left"}`}
      >
        <p className="eyebrow mb-4">{section.eyebrow}</p>
        <h2 className="mb-6 font-display text-4xl font-light text-moon-50 sm:text-5xl">
          {section.title}
        </h2>
        <div className="space-y-4">
          {section.body.map((p, i) => (
            <p key={i} className="text-lg font-light leading-relaxed text-moon-300">
              {p}
            </p>
          ))}
        </div>
      </motion.div>

      {section.quote && <PullQuote>{section.quote}</PullQuote>}
    </section>
  );
}
