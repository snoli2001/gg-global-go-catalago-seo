import 'kleur/colors';
import { f as decodeKey } from './chunks/astro/server_CevFNFDB.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CSmwE0mn.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/","cacheDir":"file:///C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/node_modules/.astro/","outDir":"file:///C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/dist/","srcDir":"file:///C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/src/","publicDir":"file:///C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/public/","buildClientDir":"file:///C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/dist/client/","buildServerDir":"file:///C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BvjgiDq-.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/src/pages/motos/[code].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/motos/[code]@_@astro":"pages/motos/_code_.astro.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Dn9mNTzc.mjs","\u0000@astrojs-manifest":"manifest_BeYQSsHO.mjs","C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/src/components/moto/specs/SpecsSection":"_astro/SpecsSection.Cou0CwPu.js","C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/src/components/GalleryCarousel":"_astro/GalleryCarousel.quJEZiTS.js","C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/src/components/MotoListReact":"_astro/MotoListReact.EXY9SkTA.js","@astrojs/react/client.js":"_astro/client.BO3Rm8ny.js","C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/src/components/moto/ColorSelector.astro?astro&type=script&index=0&lang.ts":"_astro/ColorSelector.astro_astro_type_script_index_0_lang.tAE8er5z.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/src/components/moto/ColorSelector.astro?astro&type=script&index=0&lang.ts","const t=document.querySelectorAll(\".color-select-btn\");t.forEach(o=>{o.addEventListener(\"click\",()=>{const e=parseInt(o.getAttribute(\"data-color-id\")||\"0\");window.onColorSelect&&window.onColorSelect(e)})});"]],"assets":["/_astro/flaticon_mi_colección_de.BPsdV-xL.woff2","/_astro/flaticon_mi_colección_de.CnonHSDa.woff","/_astro/flaticon_mi_colección_de.DqjfNZ6x.eot","/_astro/flaticon_mi_colección_de.iNI6_D4V.ttf","/_astro/flaticon_mi_colección_de.BAJpuh1Q.svg","/_astro/index.BvjgiDq-.css","/favicon.svg","/imgs/banner-discover.webp","/imgs/banner-publicidad.jpg","/imgs/chispa.png","/imgs/moto-detail-background-desktop-lg.jpg","/imgs/moto-detail-background-desktop.jpg","/imgs/moto.png","/imgs/moto_bg.jpg","/_astro/client.BO3Rm8ny.js","/_astro/GalleryCarousel.quJEZiTS.js","/_astro/index.Dy6lLLXr.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/MotoListReact.EXY9SkTA.js","/_astro/SpecsSection.Cou0CwPu.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"A5di7iGrBlwXUMrLIA6eVYrRfOG1F7D9/xnteKhvWhc="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
