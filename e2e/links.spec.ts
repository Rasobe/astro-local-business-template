import { expect, test } from "@playwright/test";

test("enlaces de contacto bien formados", async ({ page }) => {
  await page.goto("/");
  const wa = page.locator('a[href^="https://wa.me/"]').first();
  await expect(wa).toHaveAttribute("href", /^https:\/\/wa\.me\/\d{9,15}(\?text=.+)?$/);
  await expect(page.locator('a[href^="tel:+"]').first()).toBeVisible();
});

test("los enlaces externos abren en pestaña nueva con rel=noopener", async ({ page }) => {
  await page.goto("/");
  const external = page.locator('a[target="_blank"]');
  for (const a of await external.all()) {
    await expect(a).toHaveAttribute("rel", /noopener/);
  }
});

test("los enlaces internos no dan 404", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.locator('a[href^="/"]').evaluateAll((els) =>
    [...new Set(els.map((e) => (e as HTMLAnchorElement).getAttribute("href")!.split("#")[0] || "/"))],
  );
  for (const href of hrefs) {
    const res = await request.get(href);
    expect(res.status(), href).toBeLessThan(400);
  }
});

test("una URL inexistente devuelve la página 404", async ({ page }) => {
  const res = await page.goto("/no-existe");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("no existe");
});

test("el botón de WhatsApp flotante se ve en móvil", async ({ page, isMobile }) => {
  test.skip(!isMobile, "solo móvil");
  await page.goto("/");
  await expect(page.getByTestId("wa-cta")).toBeVisible();
});
