# Plantilla web para negocio local (Astro)

Landing estática para barberías, restaurantes, talleres, clínicas… Basada en el stack de
[crow6esports-web](https://github.com/Rasobe/crow6esports-web): Astro + TypeScript + SCSS, con
lint, tests, hooks de git y CI ya configurados.

- **Rápida**: HTML estático, imágenes optimizadas (WebP/srcset), fuentes autoalojadas con preload.
- **SEO local de serie**: title/description, canonical, Open Graph, JSON-LD `LocalBusiness` con
  horario y geo, sitemap, robots.
- **Legal**: aviso legal, privacidad y cookies (sin cookies → sin banner).
- **Un solo archivo para cada cliente**: `config/business.ts`.

## Arrancar

```bash
nvm use            # Node 22 (.nvmrc)
corepack enable    # activa pnpm
pnpm install
cp .env.example .env
pnpm dev           # http://localhost:4321
```

## Nuevo cliente en 5 pasos

1. **Usa esta plantilla** en GitHub ("Use this template") o clónala y borra `.git`.
2. Rellena `config/business.ts` (NAP idéntico al de Google Business Profile).
3. Cambia colores en `src/styles/_tokens.scss` y fuentes en `astro.config.ts`.
4. Fotos: `src/assets/hero.jpg` y `src/assets/gallery/01-descripcion.jpg…` (el nombre se usa como
   `alt`). Sustituye `public/og.jpg` (1200×630), favicon e iconos. Actualiza `manifest.webmanifest`.
5. Escribe el texto de `src/components/About.astro` y sigue **[CHECKLIST.md](./CHECKLIST.md)**.

## Scripts

| Comando          | Qué hace                                   |
| ---------------- | ------------------------------------------ |
| `pnpm dev`       | Servidor de desarrollo                     |
| `pnpm build`     | Genera `dist/`                             |
| `pnpm preview`   | Sirve `dist/` en local                     |
| `pnpm lint`      | ESLint                                     |
| `pnpm typecheck` | `astro check`                              |
| `pnpm test`      | Tests unitarios (Vitest)                   |
| `pnpm e2e`       | SEO, accesibilidad y enlaces (Playwright)  |
| `pnpm format`    | Prettier                                   |

Hooks (Husky): **pre-commit** gitleaks + lint-staged + typecheck · **pre-push** lint, typecheck,
test y build · **commit-msg** Conventional Commits.

> gitleaks se instala aparte: `brew install gitleaks` / `winget install gitleaks` / `scoop install gitleaks`.

## Estructura

```
config/business.ts        ← datos del cliente (única fuente de verdad)
src/
  assets/                 ← hero.jpg y gallery/ (Astro las optimiza)
  components/             ← Hero, Services, Gallery, Reviews, Visit, Seo, JsonLd…
  layouts/                ← BaseLayout (head, SEO, fuentes) y LegalLayout
  lib/                    ← lógica pura con tests: seo, structured-data, hours, whatsapp, sitemap
  pages/                  ← index, 404, legales, robots.txt, sitemap.xml
  styles/                 ← _tokens.scss (tema), _breakpoints.scss, global.scss
public/                   ← og.jpg, favicon, iconos, manifest
e2e/                      ← tests de SEO, a11y y enlaces
vercel.json               ← región cdg1 (París) + cabeceras de seguridad y caché
```

## Despliegue (Vercel)

1. Importa el repo en Vercel (detecta Astro solo).
2. Variable de entorno `SITE_URL=https://www.dominio.es` en **Production**.
3. Añade el dominio y apunta los DNS. En previews se añade `noindex` automáticamente.

## Decisiones

- **Sin `aggregateRating` en JSON-LD**: Google no muestra estrellas de reseñas propias del negocio.
  Las reseñas se muestran como texto.
- **Sin iframe de Google Maps**: pone cookies de terceros (obligaría a banner) y pesa. Se usa un
  enlace "Cómo llegar".
- **Sin adaptador SSR**: todo estático. Si algún día hace falta un formulario, usa un endpoint
  serverless o un servicio externo.
