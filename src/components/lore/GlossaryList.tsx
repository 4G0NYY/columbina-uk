import { motion } from "framer-motion";
import { GLOSSARY } from "../../data/glossary";

/**
 * A small lexicon of the Finnish, Nordic and classical words woven through her
 * story, kin to the Etymology grid, but for the language of the world around
 * her rather than her names. Terms the game coined are marked, so the honest
 * ones and the invented ones never blur together.
 */
export function GlossaryList() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-8 pt-16">
      <p className="eyebrow mb-3 text-center">The Tongues Beneath Nod-Krai</p>
      <h2 className="mb-3 text-center font-display text-3xl font-light text-moon-50 sm:text-4xl">
        A Moonlit Lexicon
      </h2>
      <p className="mx-auto mb-12 max-w-xl text-center text-sm text-moon-400">
        Nod-Krai is built on Finnish and Nordic roots. Here are the words that keep recurring:
        real ones named by language, and the ones the game coined from them marked{" "}
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-halo/70">coined</span>.
      </p>

      <dl className="grid gap-4 sm:grid-cols-2">
        {GLOSSARY.map((g, i) => (
          <motion.div
            key={g.term}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: "easeOut" }}
            className="panel px-6 py-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <dt className="font-display text-2xl font-light text-moon-50">{g.term}</dt>
              <span className="font-mono text-[0.62rem] uppercase tracking-widest text-moon-500">
                /{g.pron}/
              </span>
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest2 text-halo/80">
              <span>{g.lang}</span>
              <span className="text-moon-600">·</span>
              <span className="normal-case tracking-normal text-moon-300">{g.gloss}</span>
              {g.coined && (
                <span className="rounded-full border border-moon-600/30 px-2 py-0.5 text-[0.55rem] tracking-widest text-moon-400">
                  coined
                </span>
              )}
            </p>
            <dd className="mt-3 font-light leading-relaxed text-moon-300">{g.body}</dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}
