import { motion } from "framer-motion";
import { VITALS } from "../../data/profile";

/** An infobox-style panel of Columbina's key facts. */
export function VitalsCard() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="panel px-7 py-8 sm:px-10 sm:py-9"
      >
        <p className="eyebrow mb-6 text-center">Profile · At a Glance</p>
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {VITALS.map((v) => (
            <div key={v.label} className="border-l border-moon-600/25 pl-4">
              <dt className="font-mono text-[0.62rem] uppercase tracking-widest2 text-moon-500">
                {v.label}
              </dt>
              <dd className="mt-1 font-display text-xl font-light text-moon-50">{v.value}</dd>
              {v.note && <dd className="mt-0.5 text-sm italic text-moon-500">{v.note}</dd>}
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
