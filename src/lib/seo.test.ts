import { describe, expect, it } from "vitest";
import { business } from "../../config/business";
import { buildPageTitle, canonicalUrl, DESCRIPTION_MAX, DESCRIPTION_MIN, TITLE_MAX } from "./seo";

describe("buildPageTitle", () => {
  it("devuelve la marca si no hay título", () => {
    expect(buildPageTitle(undefined, "Marca")).toBe("Marca");
  });
  it("añade la marca con separador", () => {
    expect(buildPageTitle("Aviso legal", "Marca")).toBe("Aviso legal · Marca");
  });
  it("respeta títulos absolutos", () => {
    expect(buildPageTitle("Barbería en Huesca", "Marca", true)).toBe("Barbería en Huesca");
  });
});

describe("canonicalUrl", () => {
  it("home con barra", () => {
    expect(canonicalUrl("https://a.es/", "/")).toBe("https://a.es/");
  });
  it("quita barra final y .html", () => {
    expect(canonicalUrl("https://a.es", "/cookies/")).toBe("https://a.es/cookies");
    expect(canonicalUrl("https://a.es", "/cookies.html")).toBe("https://a.es/cookies");
  });
});

describe("config/business.ts cumple el SEO básico", () => {
  it("título ≤ 60", () => {
    expect(business.seo.title.length).toBeLessThanOrEqual(TITLE_MAX);
  });
  it("descripción 120–155", () => {
    expect(business.seo.description.length).toBeGreaterThanOrEqual(DESCRIPTION_MIN);
    expect(business.seo.description.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
  });
  it("alt de la imagen OG distinto del título", () => {
    expect(business.seo.ogImageAlt).not.toBe(business.seo.title);
  });
});
