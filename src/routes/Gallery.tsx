import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "../components/site/Header";
import { SiteFooter } from "../components/site/SiteFooter";
import { Starfield } from "../components/ambient/Starfield";
import { DoveGlyph } from "../components/ambient/DoveGlyph";
import { GALLERY } from "../data/gallery";

/**
 * A moonlit gallery of Columbina art. Data-driven from src/data/gallery.ts so
 * imagery stays out of the repository; every piece carries its artist credit and
 * a link to the source. Falls back to a clear, tasteful empty state.
 */
export function Gallery() {
  return (
    <div className="relative min-h-screen">
      <Starfield count={60} />
      <Header />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-28">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-3">Seen by Moonlight</p>
          <h1 className="font-display text-5xl font-light text-moon-50">Gallery</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-moon-400">
            A quiet wall for the little dove. Every piece is credited to its artist and linked to
            its source.
          </p>
        </div>

        {GALLERY.length > 0 ? (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {GALLERY.map((item, i) => (
              <motion.figure
                key={item.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: "easeOut" }}
                className="panel overflow-hidden break-inside-avoid"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full object-cover"
                />
                <figcaption className="px-4 py-3">
                  <p className="font-display text-lg font-light text-moon-50">{item.title}</p>
                  <p className="mt-0.5 text-xs text-moon-500">
                    {item.source ? (
                      <a
                        href={item.source}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="transition-colors hover:text-halo"
                      >
                        {item.artist}
                      </a>
                    ) : (
                      item.artist
                    )}
                    {item.credit && <span className="text-moon-600"> · {item.credit}</span>}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        ) : (
          <div className="panel mx-auto max-w-lg px-8 py-12 text-center">
            <div className="mx-auto mb-5 w-fit text-moon-400/50">
              <DoveGlyph size={56} />
            </div>
            <p className="font-display text-2xl font-light text-moon-100">The wall is bare</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-moon-500">
              This shrine ships without bundling any HoYoverse or fan imagery. To hang art here, drop
              files into{" "}
              <span className="font-mono text-moon-300">public/assets/gallery/</span> and list them,
              with artist credit, in{" "}
              <span className="font-mono text-moon-300">src/data/gallery.ts</span>.
            </p>
          </div>
        )}

        <p className="mt-14 text-center">
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-widest2 text-moon-500 transition-colors hover:text-moon-200"
          >
            ← back to the moonlight
          </Link>
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
