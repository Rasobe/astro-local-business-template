/**
 * ÚNICA FUENTE DE VERDAD DEL NEGOCIO
 * ----------------------------------
 * Todo lo que cambia entre clientes está aquí: textos, NAP (nombre, dirección, teléfono),
 * horarios, servicios, reseñas, redes y SEO. Los componentes, el JSON-LD, el sitemap y las
 * páginas legales leen de este archivo. Para un cliente nuevo, empieza rellenando esto.
 *
 * IMPORTANTE (SEO local): el nombre, la dirección y el teléfono deben ser EXACTAMENTE
 * iguales que en la ficha de Google Business Profile, Instagram, Booksy, etc.
 */

export type DayKey = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export interface OpeningSlot {
  days: DayKey[];
  /** Formato 24 h "HH:MM" */
  opens: string;
  closes: string;
}

export interface Service {
  name: string;
  description?: string;
  /** Precio en euros. Si es "desde", marca `from: true`. */
  price: number;
  from?: boolean;
  /** Duración aproximada en minutos */
  duration?: number;
}

export interface Review {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Opcional: "hace 2 meses", "marzo 2026"… tal como aparezca en Google */
  date?: string;
}

export interface Business {
  name: string;
  /** Tipo de schema.org: LocalBusiness o uno más concreto (HairSalon, Restaurant, Dentist, AutoRepair, Store…) */
  schemaType: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  /** Solo dígitos con prefijo de país, sin "+": 34600000000 */
  whatsapp?: string;
  whatsappMessage?: string;
  email?: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    region: string;
    country: string;
  };
  geo: { lat: number; lng: number };
  /** Enlace de "Cómo llegar" (Google Maps → Compartir → Copiar enlace) */
  mapsUrl: string;
  /** Enlace para dejar reseña (Google Business Profile → Pedir reseñas) */
  reviewUrl?: string;
  hours: OpeningSlot[];
  priceRange?: string;
  services: Service[];
  reviews: Review[];
  /** Nota media y número de reseñas para MOSTRAR en la web (no se mete en JSON-LD). */
  rating?: { value: number; count: number };
  social: { instagram?: string; facebook?: string; tiktok?: string; booking?: string };
  seo: {
    /** ≤ 60 caracteres. Fórmula: Servicio principal + ciudad + marca */
    title: string;
    /** 120–155 caracteres. Qué, dónde y llamada a la acción. */
    description: string;
    ogImage: string;
    ogImageAlt: string;
    locale: string;
    lang: string;
  };
  legal: {
    /** Titular de la web (persona física o sociedad) */
    owner: string;
    taxId: string;
    email: string;
    address: string;
  };
  themeColor: string;
}

export const business: Business = {
  name: "Nombre del Negocio",
  schemaType: "LocalBusiness",
  tagline: "Servicio principal en Ciudad",
  description:
    "Frase corta que explique qué hacéis, para quién y qué os diferencia. Una o dos líneas como mucho.",
  url: "https://www.ejemplo.es",
  phone: "+34 600 000 000",
  whatsapp: "34600000000",
  whatsappMessage: "Hola, quería información sobre…",
  email: "hola@ejemplo.es",
  address: {
    street: "Calle Ejemplo 1",
    postalCode: "00000",
    city: "Ciudad",
    region: "Provincia",
    country: "ES",
  },
  geo: { lat: 40.4168, lng: -3.7038 },
  mapsUrl: "https://maps.google.com/?q=Madrid",
  reviewUrl: "",
  hours: [
    { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "09:00", closes: "14:00" },
    { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "16:00", closes: "20:00" },
    { days: ["Sa"], opens: "10:00", closes: "14:00" },
  ],
  priceRange: "€€",
  services: [
    { name: "Servicio 1", description: "Descripción breve del servicio", price: 20, duration: 30 },
    { name: "Servicio 2", description: "Descripción breve del servicio", price: 35, duration: 45 },
    { name: "Servicio 3", description: "Descripción breve del servicio", price: 15, duration: 20 },
    { name: "Servicio 4", price: 50, from: true },
  ],
  rating: { value: 4.8, count: 50 },
  reviews: [
    { author: "Cliente 1", rating: 5, text: "Copia aquí una reseña real de Google, tal cual, con permiso." },
    { author: "Cliente 2", rating: 5, text: "Mejor 3–6 reseñas cortas que muchas largas." },
    { author: "Cliente 3", rating: 5, text: "Que mencionen el servicio y la ciudad ayuda al SEO local." },
  ],
  social: {
    instagram: "https://www.instagram.com/usuario",
  },
  seo: {
    title: "Servicio principal en Ciudad · Nombre del Negocio",
    description:
      "Servicio principal en Ciudad: lo que ofrecéis y lo que os diferencia. Consulta precios, horarios y cómo llegar, y pide cita por WhatsApp.",
    ogImage: "/og.jpg",
    ogImageAlt: "Fachada o interior del local de Nombre del Negocio",
    locale: "es_ES",
    lang: "es",
  },
  legal: {
    owner: "NOMBRE Y APELLIDOS / RAZÓN SOCIAL",
    taxId: "NIF/CIF",
    email: "hola@ejemplo.es",
    address: "Calle Ejemplo 1, 00000 Ciudad",
  },
  themeColor: "#ffffff",
};

/** URL pública: la variable de entorno manda (previews de Vercel, staging…). */
export const siteUrl = (import.meta.env?.SITE_URL ?? process.env.SITE_URL ?? business.url).replace(
  /\/$/,
  "",
);
