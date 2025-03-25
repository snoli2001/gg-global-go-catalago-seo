import { c as createComponent, a as createAstro, b as addAttribute, r as renderHead, d as renderSlot, e as renderTemplate } from './astro/server_CevFNFDB.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const env = {
  apiUrl: "https://globalgo-api.sis360.com.pe/api/Catalog"};

class MotoService {
  apiUrl = env.apiUrl;
  async getMotos() {
    try {
      const response = await fetch(`${this.apiUrl}/getMotorcycles`);
      if (!response.ok) {
        throw new Error("Failed to fetch motorcycles");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
      throw error;
    }
  }
  async getMotoByCode(code) {
    try {
      const response = await fetch(`${this.apiUrl}/getMotorcycleByCode/${code}`);
      if (!response.ok) {
        if (response.status === 404) {
          return void 0;
        }
        throw new Error("Failed to fetch motorcycle");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching motorcycle:", error);
      throw error;
    }
  }
}
const motoService = new MotoService();

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Explora nuestra colecci\xF3n de motos de alta calidad. Encuentra la moto perfecta para ti con especificaciones detalladas y precios competitivos.",
    image = "/og-default.jpg",
    canonicalURL = Astro2.url,
    type = "website"
  } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Performance optimizations --><link rel="dns-prefetch" href="https://fonts.googleapis.com"><link rel="dns-prefetch" href="https://fonts.gstatic.com"><link rel="preconnect" href="https://fonts.googleapis.com" crossorigin><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Open Graph / Facebook --><meta property="og:type"${addAttribute(type, "content")}><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(canonicalURL, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Performance Meta Tags --><meta http-equiv="x-dns-prefetch-control" content="on"><meta name="theme-color" content="#ffffff"><meta name="color-scheme" content="light">${renderHead()}</head> <body class="bg-gray-50"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/src/layouts/Layout.astro", void 0);

export { $$Layout as $, motoService as m };
