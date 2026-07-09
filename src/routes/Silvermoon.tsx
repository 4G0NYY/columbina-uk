import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "../components/site/Header";
import { Starfield } from "../components/ambient/Starfield";
import { MoonPhase } from "../components/ambient/MoonPhase";
import { DoveGlyph } from "../components/ambient/DoveGlyph";
import { HumVisualizer } from "../components/secrets/HumVisualizer";
import { COLUMBINA_GIFS } from "../data/secretAssets";
import { useSecrets } from "../components/secrets/SecretProvider";
import { playHum } from "../lib/hum";

/**
 * The unlisted sanctuary. Reaching it at all is the secret (SECRET:
 * "silvermoon"); the faint ☾ in the site footer is the only door.
 */
export function Silvermoon() {
  const { discover } = useSecrets();

  useEffect(() => {
    discover("silvermoon");
  }, [discover]);

  return (
    <div className="relative min-h-screen">
      <Starfield count={70} />
      <Header />

      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <MoonPhase phase={0.5} size={200} title="The full moon over Silvermoon Hall" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="mt-10"
        >
          <p className="eyebrow mb-4">You found the door left ajar</p>
          <h1 className="font-display text-5xl font-light text-moon-50">Silvermoon Hall</h1>
          <p className="mx-auto mt-6 max-w-lg text-lg font-light leading-relaxed text-moon-300">
            Here she rests, on Hiisi Island, recovering the strength that was taken from her. No
            worshippers. No Harbingers. Only the moonlight, and a hum with no words.
          </p>

          {/* If the site owner has added real gifs, show one here as the reward. */}
          {COLUMBINA_GIFS.length > 0 ? (
            <img
              src={COLUMBINA_GIFS[0]}
              alt="Columbina"
              className="mx-auto mt-10 max-h-64 rounded-2xl border border-moon-600/20"
            />
          ) : (
            <div className="relative mx-auto mt-10 flex h-56 w-56 items-center justify-center">
              <HumVisualizer size={224} />
              <button
                type="button"
                onClick={playHum}
                title="Listen"
                className="relative z-10 text-moon-300 transition-transform hover:scale-110"
              >
                <DoveGlyph size={64} />
              </button>
            </div>
          )}

          <p className="mt-8 font-display text-sm italic text-lavender">…mm-mm-mmm…</p>

          <Link
            to="/"
            className="mt-12 inline-block font-mono text-xs uppercase tracking-widest2 text-moon-500 transition-colors hover:text-moon-200"
          >
            ← return to the shrine
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
