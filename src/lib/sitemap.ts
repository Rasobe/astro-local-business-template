export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Sitemap mínimo. `lastmod` en ISO; se recorta a YYYY-MM-DD. */
export function buildSitemap(siteUrl: string, paths: string[], lastmod: string): string {
  const base = siteUrl.replace(/\/$/, "");
  const day = lastmod.slice(0, 10);
  const urls = paths
    .map((p) => {
      const loc = p === "/" ? `${base}/` : `${base}${p}`;
      return `  <url><loc>${escapeXml(loc)}</loc><lastmod>${day}</lastmod></url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function buildRobots(siteUrl: string, allowIndexing = true): string {
  const base = siteUrl.replace(/\/$/, "");
  if (!allowIndexing) return "User-agent: *\nDisallow: /\n";
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;
}
