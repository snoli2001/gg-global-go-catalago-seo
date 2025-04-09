// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: vercel({}),
  site: "https://catalogo.globalgo.com.pe",
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        // Solo incluir páginas en producción y solo de la URL principal
        if (import.meta.env.PROD) {
          return page.includes("https://catalogo.globalgo.com.pe/");
        }
        return false;
      },
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      serialize: (item) => {
        // Personalizar la serialización de cada URL
        return {
          ...item,
          // Asegurarse de que solo se incluyan URLs de la ruta principal
          url: item.url.replace(/^https?:\/\/[^/]+/, "https://catalogo.globalgo.com.pe"),
        };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});