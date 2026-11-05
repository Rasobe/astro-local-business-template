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
  /** Tipo de schema.org: HairSalon, BarberShop no existe → usa HairSalon; otros: Restaurant, Dentist, AutoRepair, LocalBusiness… */
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
  name: "La Vieja Escuela Barber's Shop",
  schemaType: "HairSalon",
  tagline: "Barbería clásica en Huesca",
  description:
    "Cortes clásicos, degradados y arreglo de barba con navaja en el centro de Huesca. Sin prisas, como se ha hecho siempre.",
  url: "https://www.ejemplo.es",
  phone: "+34 600 000 000",
  whatsapp: "34600000000",
  whatsappMessage: "Hola, quería pedir cita para…",
  email: "hola@ejemplo.es",
  address: {
    street: "Calle Ejemplo 1",
    postalCode: "22000",
    city: "Huesca",
    region: "Aragón",
    country: "ES",
  },
  geo: { lat: 42.1401, lng: -0.4089 },
  mapsUrl: "https://maps.google.com/?q=Huesca",
  reviewUrl: "",
  hours: [
    { days: ["Tu", "We", "Th", "Fr"], opens: "09:30", closes: "13:30" },
    { days: ["Tu", "We", "Th", "Fr"], opens: "16:30", closes: "20:30" },
    { days: ["Sa"], opens: "09:00", closes: "14:00" },
  ],
  priceRange: "€€",
  services: [
    { name: "Corte clásico", description: "Tijera y máquina, lavado incluido", price: 15, duration: 30 },
    { name: "Degradado", description: "Fade a medida con acabado a navaja", price: 17, duration: 40 },
    { name: "Arreglo de barba", description: "Perfilado con toalla caliente", price: 10, duration: 20 },
    { name: "Corte + barba", price: 24, duration: 50 },
    { name: "Afeitado tradicional", description: "Navaja, toalla caliente y aftershave", price: 15, duration: 30 },
    { name: "Corte infantil", description: "Hasta 12 años", price: 12, duration: 25 },
  ],
  rating: { value: 4.9, count: 77 },
  reviews: [
    { author: "Cliente 1", rating: 5, text: "Copia aquí una reseña real de Google, tal cual, con permiso." },
    { author: "Cliente 2", rating: 5, text: "Mejor 3–6 reseñas cortas que muchas largas." },
    { author: "Cliente 3", rating: 5, text: "Que mencionen el servicio y la ciudad ayuda al SEO local." },
  ],
  social: {
    instagram: "https://www.instagram.com/usuario",
  },
  seo: {
    title: "Barbería en Huesca · La Vieja Escuela",
    description:
      "Barbería clásica en el centro de Huesca: cortes, degradados y arreglo de barba con navaja. Consulta precios y horarios y pide cita por WhatsApp.",
    ogImage: "/og.jpg",
    ogImageAlt: "Interior de la barbería La Vieja Escuela en Huesca",
    locale: "es_ES",
    lang: "es",
  },
  legal: {
    owner: "NOMBRE Y APELLIDOS / RAZÓN SOCIAL",
    taxId: "NIF/CIF",
    email: "hola@ejemplo.es",
    address: "Calle Ejemplo 1, 22000 Huesca",
  },
  themeColor: "#141414",
};

/** URL pública: la variable de entorno manda (previews de Vercel, staging…). */
export const siteUrl = (import.meta.env?.SITE_URL ?? process.env.SITE_URL ?? business.url).replace(
  /\/$/,
  "",
);
