import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },

  // Cloudflare Pages Nitro Preset
  nitro: {
    preset: "cloudflare-pages",
    prerender: {
      routes: ["/", "/api/summit/motions"],
    },
  },

  css: [
    "~/assets/css/main.css",
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  app: {
    head: {
      title: "Seventh Galactic Summit · Golden Wingers League",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        {
          name: "description",
          content: "Convened beneath the canopy: Twelve host seats deliberating the synthetic age across the multiverse. In Slay We Trust.",
        },
        { name: "theme-color", content: "#000000" },
        { property: "og:site_name", content: "Golden Wingers League" },
        { property: "og:title", content: "Seventh Galactic Summit · Council Chamber" },
        {
          property: "og:description",
          content: "Twelve seats. Twelve voices. The foremost minds of the synthetic age convene beneath the canopy at summit.gwingz.com.",
        },
        { property: "og:url", content: "https://summit.gwingz.com" },
        { property: "og:image", content: "https://summit.gwingz.com/images/golden-wings-galactic-backdrop.jpeg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Seventh Galactic Summit · Council Chamber" },
        {
          name: "twitter:description",
          content: "Engage in the interactive summit experience: twelve seats, live floor chat, and cosmic council motions.",
        },
        { name: "twitter:image", content: "https://summit.gwingz.com/images/golden-wings-galactic-backdrop.jpeg" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Lato:wght@800&family=Martian+Mono:wght@800&family=Space+Mono:wght@400;700&display=swap",
        },
      ],
    },
  },
})
