# Handoff: Humexa marketing site (rebrand of Saventia) + GitHub Pages deploy

## Overview
This package contains the **Humexa** one-page marketing site — a bilingual (French-first / English)
site for a consulting & training firm specializing in **organizational AI**. It is the current
production design, evolved from the prior **Saventia** version.

There are **two tasks** for this handoff:
1. **Update the existing Saventia project/repo** to this Humexa design (branding, logo, hero,
   content, and the asset/performance fixes described below).
2. **Host the result on GitHub Pages** (instructions at the end).

## About the design files
The files in this bundle are **design references built in HTML + in-browser React (Babel)** —
they show the intended look, content, and behavior. They are fully functional in a browser, so
you can deploy them as static files directly (quick path), **or** recreate them in the existing
Saventia codebase using its established framework and patterns (recommended for production —
the in-browser Babel transform is convenient for prototyping but not ideal for a shipped site).

If the existing Saventia project is a Next.js / Vite / plain-static app, port the markup and the
`humexa/*.jsx` components into that environment; the design system below is framework-agnostic.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, motion, and copy. Recreate pixel-faithfully.

---

## What changed in this revision (apply these to Saventia)

### 1. Logo — new "Human at the centre of intelligence" mark
The previous amber "Human ↔ AI bridge" crescent mark is **retired**. The new mark is a **human
figure (bust) beneath a blue neural-network crown** of linked nodes, with an **emerald synapse**
firing from the head into the network. Emerald + blue only — **no gold/amber** in the mark.

- Source of truth: `humexa/logo.jsx` — exports `LogoMark`, `Logo`, `Wordmark`.
  - `LogoMark` is a pure SVG (viewBox `0 0 48 48`), resolution-independent.
  - `Logo` supports lockups: `inline` (default — mark + "Humexa" wordmark), `tile`, `image`, `wordmark`.
  - Wordmark is **"Humexa"** in Fraunces 500, `letter-spacing:-0.02em`.
- Portable standalone copy with hex baked in: `humexa/assets/logo-mark.svg`.
- Favicon (mark on a rounded navy `#0B1B3A` tile): `humexa/assets/favicon.svg`, linked in `<head>`
  as `<link rel="icon" type="image/svg+xml" href="…/favicon.svg">`.
- `humexa/assets/logo-mark.png|.webp` is the **original uploaded raster** (an earlier, different
  yin-yang design) — only used by the optional `image` lockup. Not the primary mark.

Mark geometry (for a faithful re-implementation), all in the `0 0 48 48` viewBox:
- Figure bust: head `circle cx24 cy18.5 r3.7`; shoulders `path "M24 23.5 C 19 23.5, 16 27.4, 16 32.5 L 32 32.5 C 32 27.4, 29 23.5, 24 23.5 Z"`. Fill = linear gradient `#34E0A8 → #2D6BFF` (x1 16 y1 15 → x2 32 y2 34, userSpaceOnUse).
- Crown nodes (cx, cy, r, color): (24,5,2.3,emerald) (33,7,1.6,blue) (40,13,2,blue) (43,22,1.5,blue) (15,7,1.6,blue) (8,13,2,blue) (5,22,1.5,blue) (24,11,1.5,emerald). emerald=`#34E0A8`, blue=`#5B8DEF`.
- Edges (`stroke #5B8DEF`, width 1, opacity .45): node index pairs [0,1][1,2][2,3][0,4][4,5][5,6][0,7][1,7][4,7][7,3][7,6].
- Synapse (`stroke #34E0A8`, width 1.1, opacity .72): line (24,22)→(24,11), drawn **before** the
  figure so the figure occludes the part crossing the face.
- Draw order: edges → synapse → nodes → figure (figure on top).

### 2. Hero image — quality + performance
- The hero is **full-bleed** with a scroll parallax. The source is now a **3840×2160 WebP**
  (`humexa/assets/hero-human-ai.webp`, ~1 MB) so it stays crisp on large/retina screens.
- The parallax now **pans more than it zooms**: in `humexa/onepage.jsx` `CinematicHero`, the
  scroll transform is `translate3d(0, y*0.26px, 0) scale(1.04 + p*0.04)` (was `scale(1.05 + p*0.12)`).
  Keep the upscale small so the raster never blows up past native resolution.
- **All raster image assets are WebP** now (hero, simplified hero, raster logo). The old PNGs
  were ~1.5–1.8 MB each; WebP equivalents are 56–978 KB.
- **Recommended next step for production:** serve the hero via responsive `srcset`
  (e.g. 1280/2560/3840-wide variants, `sizes="100vw"`) so phones download a smaller file.
  Consider AVIF in addition to WebP.

---

## Page structure (single page, anchor-nav)
Bilingual; FR is the default, EN is the translation (FR runs ~20% longer — never hard-set widths
that clip). Sections (all copy lives in `humexa/content.jsx`):

1. **Navbar** — sticky glass bar: `Logo` (inline lockup) · nav links · FR/EN toggle · "Planifier une rencontre" CTA. Collapses to a burger ≤960px.
2. **Hero (`CinematicHero`)** — full-bleed hero image, parallax, dual scrims for legibility, eyebrow + H1 + sub + two CTAs, animated scroll cue. Also has `centered` and split layouts (Tweaks → hero layout).
3. **Services** — glass service cards with Lucide-style line icons in emerald chips.
4. **Methodology** — zero-padded steps `01`–`04` rendered large in translucent emerald.
5. **Industries** — grid of sector cards.
6. **About / Why us** — statement + supporting points; optional brand artwork (`artwork.jsx`).
7. **Perspectives / Insights** — article cards.
8. **Contact** — form (labels + `aria-describedby` hints + inline error states) + success state.
9. **Footer** — solid `--navy-ink` block, `Logo` + brand statement + nav columns.

The recurring CTA everywhere is **« Planifier une rencontre » / "Schedule a Meeting"**.

## Interactions & behavior
- **Scroll reveal**: sections fade-up via IntersectionObserver (~400–700ms ease-out).
- **Hero parallax**: image translates on scroll (slower than page) with a slight scale; content
  drifts and fades. Disabled under `prefers-reduced-motion`.
- **Hover**: cards lift `translateY(-3px)` + border brightens; buttons glow + lift `-1px` (150–250ms `cubic-bezier(.22,1,.36,1)`).
- **Language toggle** sets `<html lang>` and swaps all strings.
- **Brand artwork** (`artwork.jsx`) has slow orbit/pulse/ribbon animations, all gated on reduced-motion.
- Everything respects `@media (prefers-reduced-motion: reduce)`.

---

## Design tokens (Aurora Glass)
Defined in the `<style>` block in `Humexa.html` (`:root`).

**Color**
- Field: `--bg-900 #060B18`, `--bg-800 #0A1228`, `--bg-700 #0E1A38`, foot `#05080F`, `--navy-ink #0B1B3A`
- Glass: `--glass-panel rgba(255,255,255,.06)`, hover `.10`, `--glass-strong rgba(14,26,56,.72)`, border `rgba(255,255,255,.12)`
- Text: primary `rgba(255,255,255,.92)`, secondary `.70`, muted `.55`
- **Accent — emerald (owns every CTA/link/focus/active):** `--emerald-400 #34E0A8`, `--emerald-500 #10B981`, `--emerald-600 #0E9C73`
- **Blue — backgrounds/glows ONLY, never a button/link:** `--blue-glow #2D6BFF`, `--blue-soft #5B8DEF`
- Semantic: success `#34E0A8`, warning `#F5B544`, error `#F2766B`
- (Amber `--amber-300..600` exists only for ambient background glows; the logo no longer uses it.)

**Type** — Display/H1–H2: **Fraunces** 500, `ls -0.02em`. Body/UI: **Manrope**. Mono: JetBrains Mono.
Eyebrow: Manrope 600, .75rem, `ls .14em`, uppercase, emerald. Fluid `clamp()` scale; body ~68ch.

**Spacing** 8pt: 4 8 12 16 24 32 48 64 96 128. Section rhythm 96–128px desktop / 64px mobile. Container max 1200px, gutters 24–32px.

**Radius** sm 12 · md 16 · lg 20 · xl 28 · pill 9999 · button 14.
**Shadow** md `0 10px 30px rgba(0,0,0,.35)`, lg `0 24px 50px rgba(0,0,0,.45)`, emerald glow `0 0 40px rgba(52,224,168,.35)`.

**Aurora background**: fixed full-screen layered radial glows over a vertical navy gradient + faint
SVG film-grain at `opacity .035`. Slow 34s drift, disabled under reduced-motion. See `body::before/::after` in `Humexa.html`.

**Glass surfaces**: `border-radius 20px`, 1px hairline border, `box-shadow 0 10px 30px rgba(0,0,0,.35)`,
`backdrop-filter blur(16px) saturate(120%)`, with a solid `--glass-strong` `@supports not (backdrop-filter)` fallback.

## Assets
- `humexa/assets/hero-human-ai.webp` — 3840×2160 hero (businesswoman ↔ AI network).
- `humexa/assets/hero-simplified.webp` — secondary/about image.
- `humexa/assets/logo-mark.svg` — portable primary logo mark (hex baked in).
- `humexa/assets/favicon.svg` — favicon (mark on navy tile).
- `humexa/assets/logo-mark.png|.webp` — original raster mark (only for the `image` lockup).
- Icons: standardize on **Lucide** line icons (1.75–2px stroke) inside emerald chips. No emoji.
- Fonts: Google Fonts — Fraunces, Manrope, JetBrains Mono (see `<head>` `<link>`).

## Files in this bundle
- `Humexa.html` — entry: tokens, global CSS/animations, font + favicon links, script loaders.
- `humexa/app.jsx` — app shell: navbar, footer, progress bar, Tweaks panel, default state.
- `humexa/onepage.jsx` — all page sections incl. `CinematicHero` (parallax logic here).
- `humexa/content.jsx` — all bilingual copy (FR/EN).
- `humexa/logo.jsx` — **the logo** (`LogoMark`/`Logo`/`Wordmark`).
- `humexa/primitives.jsx` — Button, Icon, Container, GlassCard, badges, etc.
- `humexa/cards.jsx` — service/method/industry/article cards.
- `humexa/layout.jsx` — section/reveal/grid helpers.
- `humexa/artwork.jsx` — on-brand SVG brand artwork (orbital "knowledge field").
- `humexa/tweaks-panel.jsx`, `humexa/image-slot.js` — prototype-only helpers (hero layout / logo
  lockup / image-source toggles). **Safe to drop in production** if you bake in the chosen
  defaults: hero layout `cinematic`, logo lockup `inline`, image source `image`.

---

## Deploying to GitHub Pages

### Option A — ship the static files as-is (fastest)
The site runs entirely client-side, so it works on Pages with no build step.
1. In the repo, make the entry file the site root. Pages serves `index.html` by default, so
   **rename `Humexa.html` → `index.html`** (keep the `humexa/` folder beside it). All asset paths
   are relative, so they resolve under a project-pages subpath too.
2. Commit to the repo (e.g. `main`), then in **Settings → Pages**, set **Source: Deploy from a
   branch**, branch `main`, folder `/ (root)` (or `/docs` if you place the files there).
3. The site publishes at `https://<user>.github.io/<repo>/`.
4. Add a `.nojekyll` file at the root so GitHub doesn't run Jekyll over the folder.

> Note: in-browser Babel adds a small first-load cost and isn't ideal for production. Fine for a
> quick public preview; prefer Option B for the real launch.

### Option B — build into the existing Saventia stack (recommended for production)
1. Recreate the sections/components in the Saventia app's framework (port `humexa/*.jsx`,
   replace the in-browser Babel with the app's bundler).
2. Pre-compile the icons (Lucide) and self-host or `next/font` the Google fonts.
3. Add responsive `srcset` for the hero (1280/2560/3840 WebP, plus AVIF if easy).
4. Build the static export and publish the build output to Pages:
   - **Next.js**: `output: 'export'` → deploy the `out/` dir (set `basePath`/`assetPrefix` to
     `/<repo>` for a project page). A GitHub Actions workflow (`actions/deploy-pages`) is the
     cleanest CI path.
   - **Vite**: set `base: '/<repo>/'`, `npm run build`, deploy `dist/` via `actions/deploy-pages`.
5. Confirm the favicon link and `<html lang>` default (`fr`) survive the port.

### Custom domain (optional)
Add a `CNAME` file with the domain and configure DNS per GitHub's docs; keep "Enforce HTTPS" on.
