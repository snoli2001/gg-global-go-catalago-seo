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
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date(),
      entryLimit: 10000,
      filter: (page) => {
        // Excluir páginas que no queremos en el sitemap
        const excludedPaths = ["/404", "/error"];
        return !excludedPaths.some(path => page.includes(path));
      },
      customPages: [
        "https://catalogo.globalgo.com.pe/",
        "https://catalogo.globalgo.com.pe/motos",
      ],
      serialize: (item) => {
        // Personalizar la prioridad según la ruta
        let priority = 0.7;
        
        if (item.url === "https://catalogo.globalgo.com.pe/") {
          priority = 1.0;
        } else if (item.url.includes("/motos/")) {
          priority = 0.8;
        }

        return {
          url: item.url,
          priority,
          lastmod: new Date().toISOString()
        };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});