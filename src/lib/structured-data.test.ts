import { describe, expect, it } from "vitest";
import { business } from "../../config/business";
import { localBusinessData, serializeJsonLd } from "./structured-data";

describe("localBusinessData", () => {
  const data = localBusinessData(business, "https://a.es");
  it("tipo y NAP", () => {
    expect(data["@type"]).toBe(business.schemaType);
    expect(data.telephone).toBe(business.phone);
  });
  it("no publica aggregateRating (política de Google)", () => {
    expect(data).not.toHaveProperty("aggregateRating");
    expect(data).not.toHaveProperty("review");
  });
  it("un OpeningHoursSpecification por tramo", () => {
    expect(data.openingHoursSpecification).toHaveLength(business.hours.length);
  });
});

describe("serializeJsonLd", () => {
  it("escapa < para no cerrar el script", () => {
    expect(serializeJsonLd({ a: "</script>" })).not.toContain("</script>");
  });
});
