# columbina.uk

A moonlit shrine to **Columbina Hyposelenia** — *the Little Dove Born Beneath the Moon* — with a
lore hub, hidden secrets, and an accurate Lunar-reaction damage calculator. Built with Vite + React
+ TypeScript + Tailwind, deployed to GitHub Pages on the apex domain `columbina.uk`.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run test       # damage-engine unit tests
npm run build      # type-check + production build to /dist
npm run preview    # preview the production build
```

## The two pages

- **`/`** — the aesthetics/lore hub: moonlit hero, drifting feathers, star-field, and Columbina's
  story (Kuutar → the Frostmoon Scions → the Fatui → Silvermoon Hall), with **five hidden secrets**.
- **`/calculator`** — a damage calculator. The engine (`src/lib/damage.ts`) is the game's exact,
  unit-tested damage formula, so it is accurate for whatever stats you enter from your own account.
  Numbers still community-sourced in patch 6.3 are flagged `est.` and are fully editable; Lunar
  reaction output is clearly labelled an estimate. Builds are shareable via the URL.

## The five secrets

1. **Konami code** (↑↑↓↓←→←→ B A) — a shower of doves and a hum.
2. **Click the moon 7×** in the hero — it cycles its phases.
3. **The hidden dove** — a faint dove in the bottom-right corner; click it.
4. **`/silvermoon`** — an unlisted route; the only door is the faint `☾` in the footer.
5. **Hold her name** in the hero — it dissolves to reveal *Kuutar*.

Progress is tracked in `localStorage` and shown as `☾ x/5` in the header once you find the first.

### Adding your own Columbina gifs

The site ships without bundling any HoYoverse imagery. To add your own, drop files into
`public/assets/secrets/` and list their paths in `src/data/secretAssets.ts`. They then rain during
the Konami secret and appear in Silvermoon Hall. A synthesized hum (`src/lib/hum.ts`) needs no asset;
drop `humming.mp3` there and swap the function body to use a real recording.

## Deploy (GitHub Pages)

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and deploys to Pages.

One-time setup:

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. `public/CNAME` already contains `columbina.uk`.
3. Configure DNS at your registrar (see below), then enable **Enforce HTTPS** once it resolves.

### DNS records for the apex domain `columbina.uk`

| Type  | Host / Name | Value                    |
| ----- | ----------- | ------------------------ |
| A     | `@`         | `185.199.108.153`        |
| A     | `@`         | `185.199.109.153`        |
| A     | `@`         | `185.199.110.153`        |
| A     | `@`         | `185.199.111.153`        |
| AAAA  | `@`         | `2606:50c0:8000::153`    |
| AAAA  | `@`         | `2606:50c0:8001::153`    |
| AAAA  | `@`         | `2606:50c0:8002::153`    |
| AAAA  | `@`         | `2606:50c0:8003::153`    |
| CNAME | `www`       | `4g0nyy.github.io.`      |

Clean deep links (`/calculator`, `/silvermoon`) work via the SPA fallback in `public/404.html`
paired with the decode snippet in `index.html`.

## Data & attribution

Fan-made; not affiliated with HoYoverse. Genshin Impact, Columbina, and all related names and
imagery are © HoYoverse. Lore is paraphrased from community wikis (linked in the site footer);
atmospheric quotes are original flavor. Calculator defaults are community-sourced for patch 6.3 —
verify against current data before trusting exact figures.
