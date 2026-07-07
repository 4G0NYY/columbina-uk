import { motion } from "framer-motion";
import { ETYMOLOGY } from "../../data/profile";

/** Name etymologies, as a grid of moonlit cards. */
export function EtymologyGrid() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-8 pt-4">
      <p className="eyebrow mb-3 text-center">The Names Beneath the Name</p>
      <h2 className="mb-12 text-center font-display text-3xl font-light text-moon-50 sm:text-4xl">
        Etymology
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {ETYMOLOGY.map((t, i) => (
          <motion.article
            key={t.term}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: "easeOut" }}
            className="panel px-6 py-6"
          >
            <h3 className="font-display text-2xl font-light text-moon-50">{t.term}</h3>
            <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-widest2 text-halo/80">
              {t.gloss}
            </p>
            <p className="mt-4 font-light leading-relaxed text-moon-300">{t.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
