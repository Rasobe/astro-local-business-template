import { describe, expect, it } from "vitest";
import { buildRobots, buildSitemap } from "./sitemap";

describe("buildSitemap", () => {
  const xml = buildSitemap("https://a.es/", ["/", "/servicios"], "2026-11-05T10:00:00.000Z");
  it("URLs absolutas y lastmod corto", () => {
    expect(xml).toContain("<loc>https://a.es/</loc>");
    expect(xml).toContain("<loc>https://a.es/servicios</loc>");
    expect(xml).toContain("<lastmod>2026-11-05</lastmod>");
  });
});

describe("buildRobots", () => {
  it("apunta al sitemap", () => {
    expect(buildRobots("https://a.es")).toContain("Sitemap: https://a.es/sitemap.xml");
  });
  it("bloquea todo en previews", () => {
    expect(buildRobots("https://a.es", false)).toContain("Disallow: /");
  });
});
