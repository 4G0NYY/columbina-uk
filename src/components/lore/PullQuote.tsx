import { motion } from "framer-motion";

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="mx-auto max-w-2xl px-6 py-16 text-center"
    >
      <blockquote className="font-display text-2xl font-light italic leading-relaxed text-moon-100 sm:text-3xl">
        <span className="halo-text">“</span>
        {children}
        <span className="halo-text">”</span>
      </blockquote>
    </motion.figure>
  );
}
