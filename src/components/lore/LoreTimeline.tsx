import { motion } from "framer-motion";
import type { LoreSection } from "../../data/lore";

/**
 * A compact vertical timeline of Columbina's story. Each section is a node on a
 * moonlit rail — tighter than the original full-viewport panels, so her whole
 * lore reads as one continuous descent.
 */
export function LoreTimeline({ sections }: { sections: LoreSection[] }) {
  return (
    <ol className="relative mx-auto max-w-2xl px-6">
      {/* The rail */}
      <span
        aria-hidden
        className="absolute bottom-2 left-[calc(1.5rem+5px)] top-2 w-px bg-gradient-to-b from-transparent via-moon-600/30 to-transparent"
      />
      {sections.map((section) => (
        <li key={section.id} id={section.id} className="relative py-8 pl-10">
          {/* Node */}
          <span
            aria-hidden
            className="absolute left-[3px] top-[2.35rem] h-2.5 w-2.5 rounded-full bg-halo/80 shadow-[0_0_12px_2px_rgba(233,207,143,0.35)]"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="eyebrow mb-2">{section.eyebrow}</p>
            <h3 className="mb-3 font-display text-2xl font-light text-moon-50 sm:text-3xl">
              {section.title}
            </h3>
            <div className="space-y-3">
              {section.body.map((p, i) => (
                <p key={i} className="font-light leading-relaxed text-moon-300">
                  {p}
                </p>
              ))}
            </div>
            {section.quote && (
              <p className="mt-4 border-l-2 border-halo/30 pl-4 font-display text-lg font-light italic text-moon-100">
                {section.quote}
              </p>
            )}
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
