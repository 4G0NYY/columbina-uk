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
          Impact, Columbina, and all related names and imagery are © HoYoverse. Lore is
          paraphrased from community wikis; atmospheric quotes are original flavor.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
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
        </div>
      </div>
    </footer>
  );
}
