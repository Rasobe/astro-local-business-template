/** Enlace universal de WhatsApp (funciona en móvil y escritorio). */
export function buildWhatsAppLink(phone: string, message?: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) throw new Error("Número de WhatsApp vacío");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** "+34 600 000 000" → "tel:+34600000000" */
export function buildTelLink(phone: string): string {
  const clean = phone.replace(/[^\d+]/g, "");
  return `tel:${clean}`;
}
