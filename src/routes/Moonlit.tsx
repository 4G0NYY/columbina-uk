import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "../components/site/Header";
import { Starfield } from "../components/ambient/Starfield";
import { MoonPhase } from "../components/ambient/MoonPhase";
import { MoonCard } from "../components/secrets/MoonCard";
import { useSecrets } from "../components/secrets/SecretProvider";

/**
 * The completion sanctuary. Reachable at any time, but it only opens its reward,
 * a downloadable collector's moon card, once every secret has been found. Until
 * then it shows how many remain, without giving them away.
 */
export function Moonlit() {
  const { discovered, total } = useSecrets();
  const complete = discovered.length === total;
  const seedDate = new Date();

  return (
    <div className="relative min-h-screen">
      <Starfield count={80} />
      <Header />

      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-28 text-center">
        {complete ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full"
          >
            <p className="eyebrow mb-4">Every secret uncovered</p>
            <h1 className="mb-4 font-display text-5xl font-light text-moon-50">
              The dove is pleased
            </h1>
            <p className="mx-auto mb-12 max-w-lg text-moon-300">
              You found all {total}. Here is a card struck for the occasion, the moon on it drawn at
              tonight's true phase. It is yours to keep.
            </p>
            <MoonCard found={discovered.length} total={total} date={seedDate} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <MoonPhase phase={0.12} size={180} title="A waxing crescent, still growing" />
            <p className="eyebrow mb-4 mt-10">Not yet</p>
            <h1 className="mb-4 font-display text-4xl font-light text-moon-50">
              The moon is not yet full
            </h1>
            <p className="mx-auto max-w-md text-moon-400">
              You have found{" "}
              <span className="halo-text font-mono">
                {discovered.length} of {total}
              </span>
              . Keep looking. This door opens fully only under a whole moon.
            </p>
          </motion.div>
        )}

        <Link
          to="/"
          className="mt-14 inline-block font-mono text-xs uppercase tracking-widest2 text-moon-500 transition-colors hover:text-moon-200"
        >
          ← return to the shrine
        </Link>
      </main>
    </div>
  );
}
