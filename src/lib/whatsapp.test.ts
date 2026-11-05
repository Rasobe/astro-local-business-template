import { describe, expect, it } from "vitest";
import { buildTelLink, buildWhatsAppLink } from "./whatsapp";

describe("buildWhatsAppLink", () => {
  it("limpia el número", () => {
    expect(buildWhatsAppLink("+34 600 00 00 00")).toBe("https://wa.me/34600000000");
  });
  it("codifica el mensaje", () => {
    expect(buildWhatsAppLink("34600000000", "Hola, ¿cita?")).toBe(
      "https://wa.me/34600000000?text=Hola%2C%20%C2%BFcita%3F",
    );
  });
  it("falla con número vacío", () => {
    expect(() => buildWhatsAppLink("")).toThrow();
  });
});

describe("buildTelLink", () => {
  it("mantiene el +", () => {
    expect(buildTelLink("+34 600 000 000")).toBe("tel:+34600000000");
  });
});
