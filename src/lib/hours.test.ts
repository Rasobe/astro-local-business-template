import { describe, expect, it } from "vitest";
import { buildWeekTable } from "./hours";

describe("buildWeekTable", () => {
  const table = buildWeekTable([
    { days: ["Tu"], opens: "16:30", closes: "20:30" },
    { days: ["Tu"], opens: "09:30", closes: "13:30" },
  ]);
  it("siempre 7 días empezando en lunes", () => {
    expect(table).toHaveLength(7);
    expect(table[0]?.label).toBe("Lunes");
  });
  it("ordena tramos y deja vacío el día cerrado", () => {
    expect(table[1]?.ranges).toEqual(["09:30–13:30", "16:30–20:30"]);
    expect(table[0]?.ranges).toEqual([]);
  });
});
