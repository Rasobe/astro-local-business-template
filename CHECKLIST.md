# Checklist de lanzamiento

Copia esta lista en el issue o la tarea de cada cliente y ve marcando. Lo marcado con 🤖 ya lo
comprueban los tests (`pnpm test` / `pnpm e2e`); el resto es manual.

---

## 0. Antes de empezar (con el cliente)

- [ ] Presupuesto y alcance cerrados por escrito (páginas, nº de revisiones, mantenimiento).
- [ ] Quién paga y a nombre de quién va el **dominio** (mejor a nombre del cliente).
- [ ] Datos legales: titular, NIF/CIF, dirección fiscal, email de contacto.
- [ ] NAP oficial: nombre, dirección y teléfono **exactamente** como en Google Business Profile.
- [ ] Horarios, servicios y precios actualizados.
- [ ] Fotos en máxima resolución (originales, no capturas de Instagram) y permiso para usarlas.
- [ ] Permiso para publicar reseñas de clientes (nombre de pila o inicial).
- [ ] Logo en vectorial (SVG/PDF) si existe.
- [ ] Acceso a la ficha de Google Business Profile (que te añada como administrador).

## 1. Proyecto

- [ ] Repo creado desde la plantilla, nombre `cliente-web`.
- [ ] `pnpm install` y `pnpm dev` funcionan.
- [ ] `config/business.ts` relleno; sin textos de ejemplo ("Calle Ejemplo", "600 000 000"…).
- [ ] `manifest.webmanifest` con nombre y colores del cliente.
- [ ] Colores en `_tokens.scss` y fuentes en `astro.config.ts`.
- [ ] Texto de `About.astro` escrito con el cliente.
- [ ] `.env` con `SITE_URL` y **nunca** commiteado (lo vigila gitleaks).

## 2. SEO on-page

- [ ] 🤖 Título ≤ 60 caracteres: _servicio principal + ciudad + marca_ ("Fisioterapia en Huesca · Marca").
- [ ] 🤖 Descripción 120–155 caracteres con servicio, ciudad y llamada a la acción.
- [ ] 🤖 Un único `<h1>` por página.
- [ ] Jerarquía de encabezados lógica (h1 → h2 → h3, sin saltos).
- [ ] La ciudad y el servicio aparecen de forma natural en h1/h2 y en el texto (sin abusar).
- [ ] 🤖 Canonical presente y apuntando al dominio final.
- [ ] 🤖 `lang="es"` en `<html>`.
- [ ] 🤖 Todas las imágenes con `alt`; las decorativas con `alt=""`.
- [ ] Nombres de archivo de fotos descriptivos (`03-fachada-del-local.jpg`).
- [ ] URLs cortas, en minúsculas y con guiones.
- [ ] 🤖 Páginas legales y 404 con `noindex`.

## 3. Open Graph (cómo se ve al compartir por WhatsApp/redes)

- [ ] `public/og.jpg` real, 1200×630, < 300 KB, con texto legible en miniatura.
- [ ] 🤖 `og:image:alt` descriptivo y distinto del título.
- [ ] Probado pegando el enlace en WhatsApp y en <https://www.opengraph.xyz>.

## 4. Datos estructurados (JSON-LD)

- [ ] `schemaType` correcto (LocalBusiness por defecto; mejor uno concreto: HairSalon, Restaurant, Dentist, AutoRepair…).
- [ ] 🤖 NAP del JSON-LD = NAP de la web = NAP de Google.
- [ ] Coordenadas `geo` exactas (Google Maps → clic derecho sobre el local → copiar coordenadas).
- [ ] Horario `openingHoursSpecification` igual que en Google.
- [ ] 🤖 Sin `aggregateRating` ni `review` (política de Google sobre reseñas propias).
- [ ] Validado sin errores en <https://search.google.com/test/rich-results> y <https://validator.schema.org>.

## 5. SEO local (lo que más mueve la aguja en un negocio de barrio)

- [ ] **Google Business Profile**: web añadida, categoría principal correcta, categorías
      secundarias, servicios con precio, horario (y festivos), fotos recientes, descripción.
- [ ] Enlace "Pedir reseña" de GBP copiado en `reviewUrl`.
- [ ] Plan de reseñas: tarjeta/QR en el mostrador, mensaje tras la cita. Responder a todas.
- [ ] Misma información en Instagram (bio + enlace), Facebook, Booksy/Treatwell, Apple Maps,
      Bing Places, Páginas Amarillas y directorios locales.
- [ ] Enlace de la web en la bio de Instagram.
- [ ] Publicar en GBP (novedades/ofertas) al menos una vez al mes.

## 6. Rendimiento

- [ ] Lighthouse móvil (modo incógnito, sobre la URL de producción): **≥ 90** en las 4 categorías.
- [ ] LCP < 2,5 s · CLS < 0,1 · INP < 200 ms (PageSpeed Insights, pestaña móvil).
- [ ] Hero con `loading="eager"` y `fetchpriority="high"`; el resto de imágenes lazy (por defecto).
- [ ] Fotos fuente < 3 MB cada una antes de meterlas en `src/assets` (Astro genera WebP).
- [ ] Máx. 2–3 familias de fuente y solo los pesos que se usan; preload solo en las críticas.
- [ ] Nada de scripts de terceros innecesarios (chat widgets, píxeles…).

## 7. Accesibilidad

- [ ] 🤖 axe sin violaciones WCAG 2 AA.
- [ ] Contraste ≥ 4,5:1 en texto normal (comprobar al cambiar la paleta).
- [ ] Navegable solo con teclado (Tab): foco visible y "Saltar al contenido" funciona.
- [ ] Botones y enlaces táctiles ≥ 48 px de alto.
- [ ] Probado a 200 % de zoom y en un móvil pequeño (360 px).

## 8. Seguridad

- [ ] Cabeceras de `vercel.json` activas (comprobar en <https://securityheaders.com>, objetivo A).
- [ ] HTTPS forzado (Vercel lo hace solo) y HSTS solo cuando el dominio definitivo funcione.
- [ ] 🤖 gitleaks en pre-commit; ningún secreto en el repo.
- [ ] Enlaces externos con `rel="noopener"`.
- [ ] Dependencias al día: `pnpm outdated` y `pnpm audit`.
- [ ] Email del cliente no expuesto si no quiere spam (usar solo WhatsApp/teléfono).

## 9. Legal (España)

- [ ] Aviso legal con titular, NIF, domicilio y contacto (LSSI art. 10).
- [ ] Política de privacidad acorde a lo que realmente se recoge (RGPD/LOPDGDD).
- [ ] Política de cookies. **Si se añade Analytics, Pixel, iframe de Maps o YouTube → banner de
      consentimiento previo** y actualizar la página.
- [ ] Enlaces legales en el pie de todas las páginas.
- [ ] Derechos de imagen: fotos de clientes solo con su consentimiento.

## 10. Dominio y despliegue

- [ ] Dominio `.es` o `.com` comprado (a nombre del cliente) y renovación automática activada.
- [ ] Proyecto en Vercel conectado al repo; `SITE_URL` en Production.
- [ ] DNS: `A @ → 76.76.21.21` y `CNAME www → cname.vercel-dns.com` (o lo que indique Vercel).
- [ ] Elegir versión principal (con o sin `www`) y redirigir la otra (301) desde Vercel → Domains.
- [ ] Previews con `noindex` (automático) y producción indexable.
- [ ] Email profesional si lo pide (Zoho, Google Workspace) con SPF/DKIM/DMARC.

## 11. Lanzamiento

- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm e2e` en verde (y CI en verde).
- [ ] Revisión final en móvil real (Android + iPhone si es posible).
- [ ] Probar cada botón: WhatsApp abre chat con mensaje, teléfono llama, "Cómo llegar" abre Maps.
- [ ] 🤖 `/robots.txt` y `/sitemap.xml` accesibles con el dominio real.
- [ ] **Google Search Console**: propiedad de dominio (verificación DNS), enviar sitemap,
      "Inspeccionar URL" → solicitar indexación de la home.
- [ ] **Bing Webmaster Tools**: importar desde Search Console (o `BingSiteAuth.xml` en `public/`).
- [ ] Vercel Web Analytics / Speed Insights activados si se quiere medir (sin cookies).
- [ ] Web añadida en Google Business Profile e Instagram.
- [ ] Entrega al cliente: accesos, cómo pedir cambios, factura.

## 12. Mantenimiento (mensual)

- [ ] Horarios, precios y festivos al día (web **y** Google).
- [ ] Search Console: errores de cobertura, consultas por las que aparece, clics.
- [ ] Rotar 2–3 fotos nuevas de trabajos y alguna reseña nueva.
- [ ] Actualizar dependencias y redeploy.
- [ ] Comprobar que el dominio no caduca.
- [ ] Informe corto al cliente (visitas, clics a WhatsApp/llamar, posición en "servicio + ciudad").

---

### Herramientas

| Para qué               | Herramienta                                                     |
| ---------------------- | --------------------------------------------------------------- |
| Rendimiento            | PageSpeed Insights, Lighthouse (DevTools)                       |
| Datos estructurados    | Rich Results Test, validator.schema.org                         |
| Compartir en redes     | opengraph.xyz, depurador de Facebook                            |
| Cabeceras de seguridad | securityheaders.com                                             |
| Accesibilidad          | axe DevTools, WAVE                                              |
| Indexación             | Google Search Console, Bing Webmaster Tools                     |
| Posición local         | Buscar "servicio + ciudad" en incógnito / Local Falcon (pago)   |
