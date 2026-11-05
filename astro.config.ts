import { defineConfig, fontProviders } from "astro/config";

// Web estática: no necesita servidor ni adaptador. Vercel o Netlify la sirven tal cual.
export default defineConfig({
  site: process.env.SITE_URL ?? "https://www.ejemplo.es",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Alfa Slab One",
      cssVariable: "--font-display",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Barlow Condensed",
      cssVariable: "--font-ui",
      weights: [500, 600],
      styles: ["normal"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Barlow",
      cssVariable: "--font-body",
      weights: [400, 600],
      styles: ["normal", "italic"],
      subsets: ["latin"],
    },
  ],
  vite: {
    define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString()) },
    css: { preprocessorOptions: { scss: { loadPaths: ["src"] } } },
  },
});
