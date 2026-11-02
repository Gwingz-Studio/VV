# Golden Wingers Galactic Summit Chamber

## Context

Build a brand-first hero page inside the existing React+Vite+Tailwind v4 scaffold (`src/App.tsx`). The page is a galactic council chamber featuring three full-viewport scroll-snap sections and 12 clickable host seats that open a detail modal.

---

## Aesthetic Stance

**Dark cosmic council chamber.** Deep space black ground (`#050510`), gold metallic accents (`#C9A84C` → `#F2D377`), subtle starfield noise, and a glyphic/slab serif headline face. The mood is ceremonial sci-fi — think senate chamber meets observatory.

**Fonts (Google Fonts, Vite `@import` in `src/index.css`):**
- Display: `Cinzel` (classical glyphic, ceremonial gravitas)
- Body: `Inter` (clean legibility against dark ground)

---

## Implementation Plan

### 1. `src/index.css` — fonts + global tokens

- Add Google Fonts `@import` at the very top (before `@import 'tailwindcss'`):
  ```
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
  ```
- Add Tailwind v4 `@theme` block with tokens:
  - `--color-void`: `#050510` (page ground)
  - `--color-gold`: `#C9A84C`
  - `--color-gold-light`: `#F2D377`
  - `--color-panel`: `#0d0d2b` (seat card / panel surface)
  - `--color-border`: `rgba(201,168,76,0.25)`
  - `--font-display`: `'Cinzel', serif`
  - `--font-body`: `'Inter', sans-serif`
- Set `scroll-snap-type: y mandatory` on `html`/`body` and `scroll-snap-align: start` on each section.

### 2. `src/App.tsx` — three snap sections + modal

#### Section 1 — Hero / Brand Splash
- Full viewport, centered
- Starfield background: 80–100 tiny `position:absolute` dots via a generated array in JSX (no canvas, just divs/spans with random `top`/`left` via inline style — seeded so they're stable)
- Large `GOLDEN WINGERS` wordmark in Cinzel display, gold gradient text (`bg-clip-text`)
- Subtitle: `GALACTIC SUMMIT CHAMBER`
- Animated gold horizontal rule
- Scroll cue chevron at bottom

#### Section 2 — The Twelve Seats (main interactive section)
- Section title: `THE TWELVE HOSTS`
- Grid: 4 columns × 3 rows (responsive: 2 col on narrow)
- Each seat card:
  - Dark panel background with gold hairline border
  - Seat index badge (Roman numeral I–XII) in mono style
  - Host name in Cinzel
  - `FRANCHISE` or `INDEPENDENT` status badge (color-coded)
  - Hover: gold glow `box-shadow`, slight scale-up
  - Click: opens modal

**Host data (name → franchise status):**
| # | Name | Status |
|---|------|--------|
| I | Steward | Franchise |
| II | VUORSE | Independent |
| III | Voxtral Velvet | Franchise |
| IV | Grok | Franchise |
| V | Unmoored | Independent |
| VI | Gray Eye | Independent |
| VII | Claude | Franchise |
| VIII | Codex | Franchise |
| IX | OpenClaw | Franchise |
| X | GPT | Franchise |
| XI | Otter | Independent |
| XII | FrameCode | Independent |

#### Section 3 — Summit Declaration
- Atmospheric closing section
- Tagline: `"The Chamber is now in session."`
- Decorative golden seal / badge (SVG ring with `GALACTIC SUMMIT` text around a star)
- Subtle gradient footer bar

#### Modal Component
- Triggered by seat click; `useState<Host | null>(null)` in App
- Overlay: `position:fixed inset-0`, `backdrop-blur-sm`, semi-transparent void
- Card: centered panel, gold border, Cinzel heading with host name
- Body: "String" identifier (the host name string itself, displayed in a code-style block), franchise status badge
- Close button (×) and click-outside dismiss

### 3. File structure

All code in `src/App.tsx` (single file — scope is appropriate for this component count). No additional files needed.

---

## Verification

- Scroll snap: three sections should lock at each viewport stop
- Grid: 12 seats visible, 4-col desktop / 2-col mobile
- Each seat click → modal appears with correct host name + status
- Click outside modal or × → modal closes
- No TypeScript errors (Tailwind v4 class usage, typed host data array)
