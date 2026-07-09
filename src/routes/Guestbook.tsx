import { motion } from "framer-motion";
import { Header } from "../components/site/Header";
import { SiteFooter } from "../components/site/SiteFooter";
import { Starfield } from "../components/ambient/Starfield";
import { Guestbook as GuestbookWidget } from "../components/site/Guestbook";

/**
 * The guestbook page: leave a feather. Notes are kept as GitHub Discussions via
 * giscus (see src/components/site/Guestbook.tsx).
 */
export function Guestbook() {
  return (
    <div className="relative min-h-screen">
      <Starfield count={70} />
      <Header />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <p className="eyebrow mb-3">Leave a Feather</p>
          <h1 className="mb-4 font-display text-4xl font-light text-moon-50 sm:text-5xl">
            The Moonlit Guestbook
          </h1>
          <p className="mx-auto max-w-xl text-moon-400">
            She leaves a scatter of white feathers wherever she goes. Leave one of your own — a
            word, a line, a hello. Sign in with GitHub, and the moon will keep your note among the
            others.
          </p>
        </motion.div>

        <GuestbookWidget />
      </main>

      <SiteFooter />
    </div>
  );
}
