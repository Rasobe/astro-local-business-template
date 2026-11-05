import type { DayKey, OpeningSlot } from "../../config/business";

export const DAY_ORDER: DayKey[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export const DAY_LABEL_ES: Record<DayKey, string> = {
  Mo: "Lunes",
  Tu: "Martes",
  We: "Miércoles",
  Th: "Jueves",
  Fr: "Viernes",
  Sa: "Sábado",
  Su: "Domingo",
};

export interface DayRow {
  day: DayKey;
  label: string;
  /** ["09:30–13:30", "16:30–20:30"] o [] si cierra */
  ranges: string[];
}

/** Tabla de horario de lunes a domingo, con los tramos ordenados. */
export function buildWeekTable(slots: OpeningSlot[]): DayRow[] {
  return DAY_ORDER.map((day) => {
    const ranges = slots
      .filter((s) => s.days.includes(day))
      .sort((a, b) => a.opens.localeCompare(b.opens))
      .map((s) => `${s.opens}–${s.closes}`);
    return { day, label: DAY_LABEL_ES[day], ranges };
  });
}
