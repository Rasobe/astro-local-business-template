import type { APIRoute } from "astro";
import { siteUrl } from "@config/business";
import { buildSitemap } from "@/lib/sitemap";

// Solo páginas indexables. Las legales y la 404 llevan noindex y no se incluyen.
// Si añades páginas (p. ej. /servicios/degradado), añádelas aquí.
const PATHS = ["/"];

export const GET: APIRoute = () =>
  new Response(buildSitemap(siteUrl, PATHS, __BUILD_DATE__), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
