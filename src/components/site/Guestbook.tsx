import { useEffect, useRef } from "react";
import { GISCUS, guestbookConfigured } from "../../data/guestbook";

/**
 * The moonlit guestbook. When configured (see src/data/guestbook.ts) it mounts
 * the giscus widget, which keeps every visitor's note as a GitHub Discussion on
 * the repo. Signing in is via GitHub, so it needs no server and no accounts of
 * our own. Until the giscus IDs are filled in, it shows a gentle placeholder.
 */
export function Guestbook() {
  const holder = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!guestbookConfigured()) return;
    const el = holder.current;
    if (!el) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", GISCUS.repo);
    script.setAttribute("data-repo-id", GISCUS.repoId);
    script.setAttribute("data-category", GISCUS.category);
    script.setAttribute("data-category-id", GISCUS.categoryId);
    script.setAttribute("data-mapping", GISCUS.mapping);
    script.setAttribute("data-term", GISCUS.term);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", GISCUS.theme);
    script.setAttribute("data-lang", GISCUS.lang);
    script.setAttribute("data-loading", "lazy");
    el.appendChild(script);

    return () => {
      el.innerHTML = "";
    };
  }, []);

  if (!guestbookConfigured()) {
    return (
      <div className="panel mx-auto max-w-xl px-8 py-10 text-center">
        <p className="font-display text-2xl font-light text-moon-50">The guestbook is not open yet</p>
        <p className="mt-4 text-sm leading-relaxed text-moon-400">
          Its pages are still being bound. The owner needs only to finish a short one-time setup on
          giscus. The steps live in{" "}
          <code className="font-mono text-[0.8em] text-halo/80">src/data/guestbook.ts</code>, and then
          the moon will start keeping everyone's notes.
        </p>
      </div>
    );
  }

  // giscus injects its iframe into this container.
  return <div ref={holder} className="giscus mx-auto max-w-2xl" />;
}
