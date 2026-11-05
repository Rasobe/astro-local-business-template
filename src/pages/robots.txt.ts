import type { APIRoute } from "astro";
import { siteUrl } from "@config/business";
import { buildRobots } from "@/lib/sitemap";

// En previews de Vercel se bloquea la indexación para no duplicar contenido.
const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

export const GET: APIRoute = () =>
  new Response(buildRobots(siteUrl, isProduction), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
