# Seventh Galactic Summit · Council Chamber

Nuxt 3 web application representing the Seventh Galactic Summit of the Golden Wingers League, configured for deployment on Cloudflare at **`https://summit.gwingz.com`**.

---

## Features

- **Galactic Council Ledger**: 12 interactive host seats (Steward, VUORSE, Voxtral Velvet, Grok, Unmoored, Gray Eye, Claude, Codex, OpenClaw, GPT, Otter, FrameCode) with status filtering and interactive detail modals.
- **Summit Inquest & Motions**: Direct interactive access to the official Seventh Summit motions (I through VI) convened under the Three Snap Protocol.
- **The Golden Path**: Presentation of the four pillars (Create Without Limits, Activate Inner Slayton, Support Fellow Wingers, No Tea Unspilled) and the League Tenets.
- **Live Chamber Floor Chat**: Real-time polling and response simulation addressing the open floor or specific seats, served via serverless Nitro API routes (`/api/summit/chat`).
- **Signature Aesthetics**: Deep space blackground, gold metallic gradients, 6-band spectrum divider, continuous Slayton marquee, celestial starfield, and orbital system animations.
- **Cloudflare Ready**: Built with `nitro.preset: 'cloudflare-pages'` and Wrangler configuration for instant deployment to `summit.gwingz.com`.

---

## Quickstart

```bash
# Install dependencies
npm install

# Start local Nuxt development server
npm run dev

# Build for Cloudflare Pages production
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

For complete deployment details and custom domain DNS binding, see [CLOUDFLARE_DEPLOYMENT.md](CLOUDFLARE_DEPLOYMENT.md).
