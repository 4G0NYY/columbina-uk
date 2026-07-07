import { motion } from "framer-motion";
import { TRIVIA_NOTES } from "../../data/profile";

/** Notable trivia — small true things about the little dove. */
export function TriviaNotes() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow mb-3 text-center">Small True Things</p>
      <h2 className="mb-10 text-center font-display text-3xl font-light text-moon-50 sm:text-4xl">
        Trivia
      </h2>
      <ul className="space-y-4">
        {TRIVIA_NOTES.map((note, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: "easeOut" }}
            className="flex gap-4 leading-relaxed text-moon-300"
          >
            <span aria-hidden className="mt-1 select-none text-halo/70">
              ☾
            </span>
            <span className="font-light">{note}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
