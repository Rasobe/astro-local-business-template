import { expect, test } from "@playwright/test";
import { business } from "../config/business";

const PAGES = ["/", "/aviso-legal", "/privacidad", "/cookies"];

for (const path of PAGES) {
  test.describe(`SEO ${path}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path);
    });

    test("título y descripción en rango", async ({ page }) => {
      const title = await page.title();
      expect(title.length).toBeLessThanOrEqual(60);
      if (path === "/") expect(title).toBe(business.seo.title);
      else expect(title).toContain(business.name);
      const desc = await page.locator('meta[name="description"]').getAttribute("content");
      expect(desc?.length ?? 0).toBeGreaterThanOrEqual(120);
      expect(desc?.length ?? 0).toBeLessThanOrEqual(155);
    });

    test("canonical, lang y un solo h1", async ({ page }) => {
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", business.seo.lang);
      await expect(page.locator("h1")).toHaveCount(1);
    });

    test("Open Graph completo", async ({ page }) => {
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
      expect(ogTitle).toBe(await page.title());
      const img = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(img).toMatch(/^https?:\/\//);
      const alt = await page.locator('meta[property="og:image:alt"]').getAttribute("content");
      expect(alt).toBeTruthy();
      expect(alt).not.toBe(ogTitle);
    });

    test("todas las imágenes tienen alt (aunque sea vacío si son decorativas)", async ({ page }) => {
      const missing = await page.locator("img:not([alt])").count();
      expect(missing).toBe(0);
    });
  });
}

test("JSON-LD válido en la home y sin aggregateRating", async ({ page }) => {
  await page.goto("/");
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(blocks.length).toBeGreaterThan(0);
  const parsed = blocks.map((b) => JSON.parse(b));
  const biz = parsed.find((d) => d["@type"] === business.schemaType);
  expect(biz).toBeTruthy();
  expect(biz.telephone).toBe(business.phone);
  expect(biz).not.toHaveProperty("aggregateRating");
});

test("páginas legales con noindex", async ({ page }) => {
  await page.goto("/aviso-legal");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("robots.txt y sitemap", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap:");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("<lastmod>");
  expect(sitemap).not.toMatch(/localhost|vercel\.app/);
});
