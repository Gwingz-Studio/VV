# Cloudflare Hosting Guide: Seventh Galactic Summit

This guide details how to host the Seventh Galactic Summit Nuxt application on Cloudflare at **`https://summit.gwingz.com`**.

---

## Architecture

- **Framework**: [Nuxt 3](https://nuxt.com) + Vue 3 + Tailwind CSS v4
- **Engine**: Nitro with `cloudflare-pages` preset
- **Edge Runtime**: Cloudflare Pages / Workers with `nodejs_compat`
- **Output Directory**: `dist` (Static assets + Edge worker functions)
- **Target URL**: `https://summit.gwingz.com`

---

## Prerequisites

1. Node.js `^20.0.0` or newer.
2. Cloudflare account with the `gwingz.com` domain registered or active on Cloudflare DNS.
3. Dependencies installed:
   ```bash
   npm install
   ```

---

## Method 1: Direct CLI Deployment via Wrangler (Fastest)

### Step 1: Authenticate with Cloudflare
If not already logged in:
```bash
npx wrangler login
```

### Step 2: Build the Nuxt Application
Build with Nitro configured for Cloudflare Pages:
```bash
npm run build
```
This generates `dist` containing both the pre-rendered pages, static assets, and the Cloudflare Pages `_worker.js` router.

### Step 3: Deploy to Cloudflare Pages
Run the deployment script:
```bash
npm run deploy
```
*(Or manually: `npx wrangler pages deploy dist --project-name=seventh-summit`)*

If this is your first time deploying this project name, Wrangler will create the Pages project automatically.

### Step 4: Configure the Custom Domain `summit.gwingz.com`
You can attach the custom domain via CLI or Dashboard:

#### Via Wrangler CLI:
```bash
npx wrangler pages deployment create dist --project-name=seventh-summit
```

#### Via Cloudflare Dashboard:
1. Navigate to **Workers & Pages** > **seventh-summit**.
2. Click the **Custom domains** tab.
3. Click **Set up a custom domain**.
4. Enter `summit.gwingz.com`.
5. Cloudflare will automatically detect the `gwingz.com` zone and configure the required CNAME record:
   - **Type**: `CNAME`
   - **Name**: `summit`
   - **Target**: `seventh-summit.pages.dev`
   - **Proxy status**: Proxied (Orange cloud)
6. Cloudflare automatically issues and renews the Universal SSL certificate for `summit.gwingz.com`.

---

## Method 2: Git-Integrated Deployment via Cloudflare Dashboard

If you prefer continuous deployment on every Git push:

1. Open the [Cloudflare Dashboard](https://dash.cloudflare.com) and go to **Compute (Workers) > Workers & Pages**.
2. Click **Create** > **Pages** tab > **Connect to Git**.
3. Select the repository: `VUORSE-VORTEX`.
4. Configure Build Settings:
   - **Project name**: `seventh-summit`
   - **Production branch**: `main` (or your active branch)
   - **Framework preset**: `Nuxt.js`
   - **Root directory**: `worldforge/2026-09-05-seventh-summit`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Under **Environment variables**, set:
   - `NODE_VERSION`: `20.18.0` (or matching runtime)
6. Under **Settings > Functions > Compatibility flags**, ensure `nodejs_compat` is enabled.
7. Click **Save and Deploy**.
8. Go to **Custom domains** and add `summit.gwingz.com`.

---

## Local Testing with Wrangler Pages

To test the compiled Cloudflare Pages worker and assets locally before pushing:

```bash
npm run build
npx wrangler pages dev .output/public
```

The summit deliberation floor and chat API will be available locally with full Edge Worker semantics.

---

## Summary of Configured Files

- `nuxt.config.ts`: Configures `nitro.preset: 'cloudflare-pages'` and SEO tags for `summit.gwingz.com`.
- `wrangler.toml`: Specifies `pages_build_output_dir = ".output/public"`, `compatibility_flags = ["nodejs_compat"]`, and environment variables.
- `wrangler.jsonc`: JSON schema compliant Cloudflare configuration.
- `server/api/summit/*`: Serverless edge API routes for live summit chat and proceedings.
