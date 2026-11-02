# Seventh Galactic Summit

Nuxt 3 + Vue 3 + Tailwind CSS v4 project configured for Cloudflare Pages at `https://summit.gwingz.com`.

## Canonical Architecture

- `app.vue`: Main app wrapper with global navigation bar, modals, and ChamberChat.
- `pages/index.vue`: Five full-viewport snap sections:
  1. Hero Splash (starfield, backdrop, summon sequence)
  2. The Council (12 interactive seats with detail modals)
  3. The Golden Path (Charter & Pillars)
  4. Council Motions (Seventh Summit inquest proceedings)
  5. Summit Declaration (stats & final protocol)
- `components/`:
  - `StarField.vue`: Deterministic, hydration-safe celestial starfield
  - `OrbitalRing.vue`: Animated orbital ring system
  - `SpectrumBar.vue`: Signature 6-band spectrum bar
  - `SpectrumDivider.vue`: Stacked shadow spectrum divider
  - `SlaytonMarquee.vue`: Continuous Golden Wingers mantras
  - `SeatModal.vue`: Council seat detail modal
  - `MotionsModal.vue`: Summit motions I-VI inquest viewer
  - `ChamberChat.vue`: Live chamber deliberation chat
- `server/api/summit/`: Nitro edge worker endpoints for chat and motions
- `assets/css/main.css`: Core design system tokens and Tailwind CSS v4 imports
- `data/`: Typed datasets for hosts, pillars, and motions
- `wrangler.toml` & `wrangler.jsonc`: Cloudflare Pages deployment configuration
