export const TITLE_SEPARATOR = " · ";
export const TITLE_MAX = 60;
export const DESCRIPTION_MIN = 120;
export const DESCRIPTION_MAX = 155;

/** "Servicios" + "Marca" → "Servicios · Marca". Con `absolute` se usa el título tal cual. */
export function buildPageTitle(title: string | undefined, brand: string, absolute = false): string {
  if (!title) return brand;
  return absolute ? title : `${title}${TITLE_SEPARATOR}${brand}`;
}

/** URL absoluta y canónica, sin barra final (salvo la home). */
export function canonicalUrl(site: string, pathname: string): string {
  const base = site.replace(/\/$/, "");
  const path = pathname === "/" ? "/" : pathname.replace(/\/$/, "").replace(/\.html$/, "");
  return path === "/" ? `${base}/` : `${base}${path}`;
}

/** Avisos en desarrollo si el título o la descripción se salen de rango. */
export function seoWarnings(title: string, description: string): string[] {
  const warnings: string[] = [];
  if (title.length > TITLE_MAX) warnings.push(`Título de ${title.length} caracteres (máx. ${TITLE_MAX})`);
  if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX) {
    warnings.push(
      `Descripción de ${description.length} caracteres (ideal ${DESCRIPTION_MIN}–${DESCRIPTION_MAX})`,
    );
  }
  return warnings;
}
