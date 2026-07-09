/**
 * Guestbook configuration.
 *
 * The moonlit guestbook is powered by giscus (https://giscus.app), which stores
 * every note as a GitHub Discussion on this repo — no server of our own, which
 * is the only way to keep a real guestbook on a static GitHub Pages site.
 *
 * TO TURN IT ON (a one-time, ~2-minute setup):
 *   1. Make the repo public (it is) and enable Discussions:
 *        repo → Settings → General → Features → tick "Discussions".
 *   2. Install the giscus GitHub App on this repo:  https://github.com/apps/giscus
 *   3. Open https://giscus.app, enter the repo `4G0NYY/columbina-uk`, and pick a
 *      Discussion category (create one called e.g. "Guestbook", Announcement-type).
 *   4. giscus will show you a `data-repo-id` and `data-category-id`. Paste them
 *      below, replacing the two REPLACE_ME_… placeholders, and set the category
 *      name to match. That's it — the guestbook goes live on next deploy.
 *
 * Until the two IDs are filled in, the /guestbook page shows a friendly
 * "not yet open" note instead of a broken widget.
 */

export const GISCUS = {
  repo: "4G0NYY/columbina-uk" as `${string}/${string}`,
  repoId: "R_kgDOTPpPaA",
  category: "Guestbook",
  categoryId: "DIC_kwDOTPpPaM4DA0sX",
  /** Map each page to its own discussion thread; the guestbook uses one fixed term. */
  mapping: "specific",
  term: "Moonlit Guestbook",
  /** A dark giscus theme that sits well against the shrine. */
  theme: "noborder_dark",
  lang: "en",
} as const;

/** True once the real giscus IDs have been pasted in. */
export function guestbookConfigured(): boolean {
  return !GISCUS.repoId.startsWith("REPLACE_ME") && !GISCUS.categoryId.startsWith("REPLACE_ME");
}
