import { defineConfig, fontProviders } from "astro/config";

// Web estática: no necesita servidor ni adaptador. Vercel o Netlify la sirven tal cual.
export default defineConfig({
  site: process.env.SITE_URL ?? "https://www.ejemplo.es",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  // Fuentes por defecto: cámbialas por las del cliente (máx. 2 familias).
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Outfit",
      cssVariable: "--font-display",
      weights: [600, 700],
      styles: ["normal"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-body",
      weights: [400, 600],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],
  vite: {
    define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString()) },
    css: { preprocessorOptions: { scss: { loadPaths: ["src"] } } },
  },
});
