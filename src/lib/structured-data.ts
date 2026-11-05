import type { Business, DayKey } from "../../config/business";

const SCHEMA_DAY: Record<DayKey, string> = {
  Mo: "https://schema.org/Monday",
  Tu: "https://schema.org/Tuesday",
  We: "https://schema.org/Wednesday",
  Th: "https://schema.org/Thursday",
  Fr: "https://schema.org/Friday",
  Sa: "https://schema.org/Saturday",
  Su: "https://schema.org/Sunday",
};

/**
 * JSON-LD de negocio local.
 * NO incluye aggregateRating ni review: Google no muestra estrellas de reseñas que el propio
 * negocio publica sobre sí mismo ("self-serving") y puede considerarlo spam.
 */
export function localBusinessData(b: Business, siteUrl: string): Record<string, unknown> {
  const sameAs = Object.values(b.social).filter((v): v is string => Boolean(v));
  return {
    "@context": "https://schema.org",
    "@type": b.schemaType,
    "@id": `${siteUrl}/#business`,
    name: b.name,
    description: b.description,
    url: `${siteUrl}/`,
    image: new URL(b.seo.ogImage, `${siteUrl}/`).toString(),
    telephone: b.phone,
    ...(b.email ? { email: b.email } : {}),
    ...(b.priceRange ? { priceRange: b.priceRange } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address.street,
      postalCode: b.address.postalCode,
      addressLocality: b.address.city,
      addressRegion: b.address.region,
      addressCountry: b.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng },
    hasMap: b.mapsUrl,
    openingHoursSpecification: b.hours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days.map((d) => SCHEMA_DAY[d]),
      opens: slot.opens,
      closes: slot.closes,
    })),
    ...(sameAs.length ? { sameAs } : {}),
    makesOffer: b.services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name },
      price: s.price.toFixed(2),
      priceCurrency: "EUR",
    })),
  };
}

export function websiteData(b: Business, siteUrl: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: b.name,
    inLanguage: b.seo.lang,
    publisher: { "@id": `${siteUrl}/#business` },
  };
}

/** Serializa para <script type="application/ld+json"> evitando cerrar la etiqueta. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
