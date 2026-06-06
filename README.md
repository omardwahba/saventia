# Saventia

Marketing site for **Saventia** (from the French *savoir* — "knowledge"): an
"Aurora Glass" single-page site for an AI-for-organizations consultancy.
Bilingual (FR default / EN), with a cursor-tracking aurora glow, frosted-glass
nav and cards, emerald CTAs, and pure-SVG brand artwork.

Built as a self-contained static bundle from a [Claude Design](https://claude.ai/design)
handoff — no build step required.

## Stack

- React 18 + Babel Standalone (in-browser JSX compilation)
- `lucide` icons, Google Fonts (Fraunces / Manrope / JetBrains Mono)
- A custom `<image-slot>` web component for drop-in photo zones

## Run locally

In-browser Babel needs a real HTTP server (not `file://`):

```bash
python3 -m http.server 8899
# then open http://localhost:8899/
```

## Structure

- `index.html` — tokens, fonts, global CSS, cursor glow, script imports
- `saventia/` — React components (`content`, `logo`, `primitives`, `layout`,
  `artwork`, `cards`, `onepage`, `tweaks-panel`, `app`) + `image-slot.js`

Hosted on GitHub Pages (`.nojekyll` keeps the folder served verbatim).
