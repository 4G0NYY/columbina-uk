import { useState } from "react";
import { motion } from "framer-motion";
import { HumVisualizer } from "../secrets/HumVisualizer";
import { playHum, stopHum } from "../../lib/hum";

/**
 * Her lullaby, given a home on the page. It plays the official HoYoverse clip
 * through the same shared analyser the secrets use, so the visualizer breathes
 * with it. The melody has no words — the site never invents any — so this is
 * about the song itself: what it weaves together, and why she hums it.
 */
export function LullabyPanel() {
  const [playing, setPlaying] = useState(false);

  function toggle() {
    if (playing) {
      stopHum();
      setPlaying(false);
    } else {
      playHum();
      setPlaying(true);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <p className="eyebrow mb-3">A Hum With No Words</p>
      <h2 className="mb-3 font-display text-3xl font-light text-moon-50 sm:text-4xl">
        The Lullaby
      </h2>
      <p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-moon-400">
        Listen closely in Silvermoon Hall and you may catch her humming, eyes closed, in no hurry
        at all. The tune has no lyrics; it weaves together Chrysalis Suspirii and Saltatio Favillae —
        the themes from the battle against La Signora — into something gentler.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="panel mx-auto flex max-w-md flex-col items-center gap-6 px-8 py-10"
      >
        <div className="relative flex h-56 w-56 items-center justify-center">
          <HumVisualizer size={224} />
          <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? "Stop the lullaby" : "Play the lullaby"}
            title={playing ? "Let it rest" : "Listen"}
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-halo/40 bg-midnight/50 text-halo backdrop-blur-sm transition-all hover:scale-105 hover:bg-halo/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-halo/50"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5Z" />
              </svg>
            )}
          </button>
        </div>

        <p className="font-display text-sm italic text-lavender">…mm-mm-mmm…</p>
        <p className="font-mono text-[0.62rem] uppercase tracking-widest text-moon-600">
          “Columbina” · official audio © HoYoverse
        </p>
      </motion.div>
    </section>
  );
}
