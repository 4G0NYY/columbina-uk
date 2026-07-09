import { Link } from "react-router-dom";
import { LORE_SOURCES } from "../../data/lore";

export function SiteFooter() {
  return (
    <footer className="border-t border-moon-600/15 px-6 py-14">
      <div className="mx-auto max-w-5xl space-y-8 text-center">
        <div>
          <p className="eyebrow mb-3">Sources</p>
          <ul className="space-y-1 text-sm text-moon-500">
            {LORE_SOURCES.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-moon-200"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto max-w-2xl text-xs leading-relaxed text-moon-600">
          Fan-made shrine, built with reverence and no affiliation to HoYoverse. Genshin
          Impact, Columbina, all related names and imagery, and the “Columbina” lullaby audio
          are © HoYoverse, used here as fan content. Lore is paraphrased from community wikis;
          atmospheric quotes are original flavor.
        </p>

        <div className="flex items-center justify-center gap-4 pt-2">
          {/* Faint hint toward the unlisted /silvermoon route. */}
          <Link
            to="/silvermoon"
            aria-label="A door left ajar"
            title="A door left ajar…"
            className="text-moon-600/40 transition-colors duration-700 hover:text-halo"
          >
            ☾
          </Link>
          <span className="font-mono text-[0.7rem] tracking-widest text-moon-600/60">
            columbina.uk
          </span>
          <a
            href="https://github.com/4g0nyy/columbina-uk"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View this site's source on GitHub"
            title="Source on GitHub"
            className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-widest text-moon-600/70 transition-colors hover:text-moon-200"
          >
            <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
