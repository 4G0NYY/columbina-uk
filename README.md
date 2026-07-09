# columbina.uk

A moonlit shrine to **Columbina Hyposelenia**, *the Little Dove Born Beneath the Moon*, with a
lore hub, a gallery, hidden secrets, and an accurate Lunar-reaction damage calculator. Built with
Vite + React + TypeScript + Tailwind, deployed to GitHub Pages on the apex domain `columbina.uk`.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run test       # damage-engine unit tests
npm run build      # type-check + production build to /dist
npm run preview    # preview the production build
```

## The pages

- **`/`** the aesthetics and lore hub: a moonlit hero, drifting feathers, a star-field, a live
  "moon tonight" readout that tracks the real lunar phase, and Columbina's story (Kuutar, the
  Frostmoon Scions, the Fatui, Silvermoon Hall), with **six hidden secrets**.
- **`/calculator`** a damage calculator. The engine (`src/lib/damage.ts`) is the game's exact,
  unit-tested damage formula, so it is accurate for whatever stats you enter from your own account.
  Numbers still community-sourced in patch 6.3 are flagged `est.` and are fully editable; Lunar
  reaction output is clearly labelled an estimate. It now includes a **rotation builder** (per-step
  ability multipliers and hit counts) and **side-by-side build comparison**. Builds, rotations, and
  comparisons are all shareable via the URL.
- **`/gallery`** a data-driven wall for Columbina art. It ships empty; see below to fill it.
- **`/moonlit`** a reward page, linked from the `☾` counter, that unlocks a downloadable
  collector's moon card once every secret has been found.

## The six secrets

1. **Konami code** (↑↑↓↓←→←→ B A): a shower of doves and a hum.
2. **Click the moon 7×** in the hero: it cycles its phases.
3. **The hidden dove**: a faint dove in the bottom-right corner; click it.
4. **`/silvermoon`**: an unlisted route; the only door is the faint `☾` in the footer.
5. **Hold her name** in the hero: it dissolves to reveal *Kuutar*.
6. **Catch the feather**: a single feather drifts down the landing page; click it before it falls.

Progress is tracked in `localStorage` and shown as `☾ x/6` in the header once you find the first.
The counter links to `/moonlit`, where finding them all is rewarded.

### The lunar phase engine

`src/lib/moon.ts` tracks the real synodic month (anchored to a known new moon), so the drawn moon,
the "moon tonight" readout, and the collector's moon card all match the sky on the day you visit.
It is aesthetic-grade rather than observatory-grade, but it is honest about the phase.

### Adding your own imagery

The site ships without bundling any HoYoverse or fan imagery.

- **Secret gifs:** drop gif/webp/png files into `public/assets/secrets/` and list their paths in
  `src/data/secretAssets.ts`; they rain from the sky on the Konami code.
- **Gallery:** drop images into `public/assets/gallery/` and describe them, with artist credit and
  a source link, in `src/data/gallery.ts`.

**Audio:** the secrets play `public/assets/secrets/bina_lullaby.mp3`, Columbina's official
HoYoverse lullaby, via `src/lib/hum.ts`, falling back to a synthesized hum if the file can't load.
Both paths feed a shared analyser, so the Silvermoon page can visualize the sound. The lullaby is
© HoYoverse and credited in the site footer.

## Production notes

The site is an installable PWA (`public/manifest.webmanifest`) with an offline service worker
(`public/sw.js`, registered only in production), a sitemap, `robots.txt`, JSON-LD structured data,
and Open Graph / Twitter card tags. All framer-motion animation honours `prefers-reduced-motion`.

The Open Graph image is `public/og.svg`. Some social scrapers don't render SVG previews; for the
widest compatibility, export it to a raster `og.png` (1200×630) and point the `og:image` /
`twitter:image` tags in `index.html` at it.

## Data & attribution

Fan-made; not affiliated with HoYoverse. Genshin Impact, Columbina, and all related names and
imagery are © HoYoverse. Lore is paraphrased from community wikis (linked in the site footer);
atmospheric quotes are original flavor. Calculator defaults are community-sourced for patch 6.3;
verify against current data before trusting exact figures.
