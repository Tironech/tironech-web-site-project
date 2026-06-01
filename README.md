# Tironech — Web Site

Sitio de marketing para [Tironech](https://tironech.com) construido con Astro 5.
Arquitectura de componentes estáticos, SEO técnico integrado, sistema i18n EN/ES y contenido centralizado en JSON.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro 5 (output estático) |
| Estilos | CSS por componente + tokens globales (`variables.css`) |
| Tipografía | Poppins (display) · Lato (body) · JetBrains Mono (mono) |
| Animaciones | GSAP + ScrollTrigger (desde `public/lib/`) |
| i18n | EN (`/`) + ES (`/es/`) vía `src/i18n/` |
| SEO | `@astrojs/sitemap` + componente `SEO.astro` + `robots.txt` |
| Deployment | Hostinger (Apache) vía `public/.htaccess` |

---

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # output → dist/
npm run preview   # preview del build local
```

---

## Estructura del proyecto

```
src/
  assets/
    img/                    # Imágenes de sección — procesadas por Astro en build (WebP + hash)
      hero.jpg
      ai-section.jpg
      enterprise-section.jpg

  components/
    SEO.astro               # Metadatos: title, og:*, twitter:*, canonical, JSON-LD
    Nav.astro               # Navegación principal + menú mobile
    Hero.astro              # Sección hero con H1
    TrustStrip.astro        # Banda de métricas
    About.astro             # Propuesta de valor
    EntryServices.astro     # Servicios de entrada (tarjetas)
    Enterprise.astro        # Servicios enterprise (tarjetas)
    WhyUs.astro             # Diferenciadores
    Leadership.astro        # Equipo
    Contact.astro           # Formulario de contacto + handler fetch
    Footer.astro            # Pie de página
    Cursor.astro            # Cursor personalizado (solo desktop)

  data/
    content.en.json         # Copy estructurado en inglés (servicios, team, steps…)
    content.es.json         # Copy estructurado en español

  i18n/
    ui.ts                   # Todo el copy UI en EN y ES (nav, hero, secciones…)
    content.ts              # getContent(lang) — devuelve el JSON según idioma

  layouts/
    BaseLayout.astro        # Shell HTML: SEO, preload hero, fuentes no-bloqueantes, GSAP

  pages/
    index.astro             # Ruta EN: ensambla componentes + pasa props SEO
    es/
      index.astro           # Ruta ES: misma estructura, locale 'es'

  styles/
    global.css              # Entry point: @import variables.css + base.css
    variables.css           # Tokens de diseño (colores, fuentes, spacing, sombras)
    base.css                # Reset global, utilidades, botones, animaciones JS
    components/
      nav.css
      hero.css
      about.css
      entry-services.css
      enterprise.css
      why-us.css
      leadership.css
      contact.css
      trust-strip.css
      footer.css

public/
  assets/
    img/                    # Imágenes estáticas (no procesadas por Astro)
      contact-bg.jpg
      og-section.jpg
      tech-section.jpg
    logo/
      logo.webp             # Logotipo principal (482×518 px)
      mark.png              # Favicon (png — WebP no es universalmente soportado en favicons)
    og/
      og-default.png        # Imagen OG por defecto (1200×630 px)
      og-template.html      # Plantilla para crear nuevas imágenes OG
  lib/                      # GSAP + ScrollTrigger (bundles — no modificar)
  scripts/
    main.js                 # Animaciones de entrada, burger menu, card hover, scroll cue
  robots.txt
  .htaccess                 # Apache: caché agresiva, gzip, headers de seguridad, HTTPS redirect
```

---

## Sistema i18n

El sitio tiene dos locales: `en` (ruta `/`) y `es` (ruta `/es/`).

### Dónde vive cada tipo de contenido

| Archivo | Qué contiene |
|---|---|
| `src/i18n/ui.ts` | Textos de UI: nav, hero, titles, labels, CTAs, placeholders |
| `src/data/content.en.json` | Datos estructurados EN: servicios, team, steps, markets |
| `src/data/content.es.json` | Datos estructurados ES: ídem en español |
| `src/i18n/content.ts` | Helper `getContent(lang)` que devuelve el JSON correcto |

### Patrón de importación en componentes

```astro
---
import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/ui';
import { getContent } from '../i18n/content';

const lang = (Astro.currentLocale ?? 'en') as Lang;
const t = ui[lang].miSeccion;
const { miData } = getContent(lang);
---
```

---

## Sistema SEO

El SEO está centralizado en `src/components/SEO.astro` y se integra en el layout principal.

### Flujo de metadatos

```
index.astro  →  BaseLayout.astro  →  SEO.astro  →  <head>
```

### Lo que genera SEO.astro por página

- `<title>` + `<meta description>` + `<link rel="canonical">`
- Open Graph: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:locale`, `og:site_name`
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- JSON-LD `Organization` con logo, email, areaServed (6 países), knowsAbout, contactPoint

### Props disponibles por página

```astro
<BaseLayout
  title="Título de la página — Tironech"
  description="Descripción de 150-160 caracteres orientada a conversión."
  ogImage="/assets/og/og-mi-pagina.png"
  canonicalURL="https://tironech.com/mi-pagina"
>
```

Todos los props son opcionales — el sistema aplica fallbacks automáticamente.

### Sitemap y robots

- `sitemap-index.xml` se regenera en cada `npm run build` (via `@astrojs/sitemap`)
- `robots.txt` permite todo el sitio, bloquea `/.astro/`, apunta al sitemap

### Google Search Console

La verificación ya está embebida en `BaseLayout.astro`:
```html
<meta name="google-site-verification" content="google6c8c64c6b98e19f4" />
```
El archivo HTML de verificación también existe en `public/google6c8c64c6b98e19f4.html`.

**Pendiente — hacer después del próximo deploy:**
1. Ir a [search.google.com/search-console](https://search.google.com/search-console)
2. Agregar propiedad → URL prefix → `https://tironech.com`
3. Clic en **Verify** (detectará el meta tag)
4. Enviar sitemap: `https://tironech.com/sitemap-index.xml`

---

## Tokens de diseño

Definidos en `src/styles/variables.css`. Siempre usar variables, nunca valores hardcodeados.

| Token | Valor | Uso |
|---|---|---|
| `--copper` | `#995E31` | Acento principal, CTAs, bordes activos |
| `--copper-hover` | `#7d4d28` | Estado hover de CTAs |
| `--copper-light` | `#b8784e` | Iconos, acentos secundarios |
| `--stone` | `#A3A391` | Texto secundario, elementos neutros |
| `--stone-light` | `#c5c5b5` | Texto de soporte, italic accents |
| `--ink` | `#ede8e2` | Texto principal |
| `--ink-soft` | `#b8afa3` | Texto de apoyo (subtítulos, descripciones) |
| `--ink-mute` | `#7d6f5e` | Solo para fondos muy oscuros donde el contraste es suficiente |
| `--bg` | `#1A1A1A` | Fondo base |
| `--bg-card` | `#2a2a2a` | Fondo de tarjetas |
| `--font-display` | Poppins | Títulos y headings |
| `--font-body` | Lato | Cuerpo de texto |
| `--font-mono` | JetBrains Mono | Etiquetas técnicas, precios |

**Regla de marca:** No usar azul en ningún lugar del diseño.

**Nota de contraste:** `--ink-mute` da ~3.7:1 sobre fondos oscuros — no usarlo en texto pequeño (< 18px) ni en elementos interactivos.

---

## Imágenes

### Imágenes de sección (procesadas por Astro)

Las imágenes en `src/assets/img/` son procesadas en build: Astro genera WebP, aplica hash al nombre y crea srcsets automáticamente.

```astro
---
import { Image } from 'astro:assets';
import heroImg from '../assets/img/hero.jpg';
---
<Image src={heroImg} alt="Descripción" format="webp" loading="lazy" />
```

Para el hero (LCP): `loading="eager"` + `fetchpriority="high"`.

### Preload del hero

`BaseLayout.astro` usa `getImage()` para obtener la URL procesada y generar el preload correcto:

```astro
import { getImage } from 'astro:assets';
import heroSrc from '../assets/img/hero.jpg';
const heroPreload = await getImage({ src: heroSrc, format: 'webp' });
// → <link rel="preload" as="image" href={heroPreload.src} fetchpriority="high" type="image/webp" />
```

### Imágenes OG (1200×630 px)

```
1. Abrir public/assets/og/og-template.html en Chrome (zoom 100%)
2. Editar headline y subline
3. Capturar 1200×630 px (Mac: Cmd+Shift+4)
4. Guardar como og-[pagina].png en public/assets/og/
5. Pasar al layout: ogImage="/assets/og/og-[pagina].png"
```

---

## Performance (Lighthouse)

Optimizaciones aplicadas para mejorar FCP, LCP y Main Thread Work:

| Área | Optimización |
|---|---|
| Fuentes | Carga no-bloqueante: `rel="preload" as="style"` + `onload` + `<noscript>` fallback |
| Hero LCP | `<Image loading="eager" fetchpriority="high">` + preload WebP con `getImage()` |
| Imágenes | Movidas a `src/assets/img/` para procesamiento Astro (WebP, hash, srcset) |
| JS boot | `initSmoothScroll` y `initNav` críticos; resto diferido con `requestIdleCallback` |
| Mouse gradient | rAF se pausa con `IntersectionObserver` cuando el Hero no es visible |
| Nav highlight | `offsetTop` cacheado en array; se recalcula solo en `resize` |
| Card hover | Throttled con rAF + patrón `pendingE` |
| CSS transitions | `.btn` usa propiedades explícitas en lugar de `transition: all` |

---

## Accesibilidad (WCAG AA)

Contraste mínimo requerido: **4.5:1** para texto normal, **3:1** para texto grande (≥ 18px regular / ≥ 14px bold).

| Combinación | Ratio | Estado |
|---|---|---|
| `--ink` sobre `--bg` | ~13.1:1 | ✅ |
| `--ink-soft` sobre `--bg` | ~7.8:1 | ✅ |
| `#fff` sobre `--copper` | ~4.9:1 | ✅ |
| `--stone` sobre `--bg` | ~6.3:1 | ✅ |
| `.hero-kicker` / `.hero-markets` | ~6.3:1 (usa `--stone`) | ✅ |
| `--ink-mute` sobre `--bg` | ~3.7:1 | ⚠️ Solo decorativo/grande |

**Reglas de accesibilidad por componente:**
- Cada `<section>` debe tener `aria-labelledby` apuntando al `id` del título
- Imágenes decorativas: `aria-hidden="true"` en el contenedor
- Imágenes funcionales: `alt` descriptivo en español obligatorio
- Botones con solo icono: `aria-label` obligatorio
- `role="list"` en `<ul>` cuando el CSS quita los bullets

---

## Agregar una nueva página

1. Crear `src/pages/nueva-pagina.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';

const title = 'Nombre de la Página — Tironech';
const description = 'Descripción única, 150-160 caracteres.';
---
<BaseLayout title={title} description={description} ogImage="/assets/og/og-nueva-pagina.png">
  <Nav />
  <main id="main-content">
    <!-- secciones -->
  </main>
  <Footer />
</BaseLayout>
```

2. Crear `/public/assets/og/og-nueva-pagina.png` (1200×630 px)
3. Verificar jerarquía: un solo `<h1>`, `<h2>` por sección, `<h3>` para sub-items

---

## Agregar un nuevo componente de sección

1. Crear `src/components/MiSeccion.astro`:

```astro
---
import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/ui';
import { getContent } from '../i18n/content';
import '../styles/components/mi-seccion.css';

const lang = (Astro.currentLocale ?? 'en') as Lang;
const t = ui[lang].miSeccion;
const { miData } = getContent(lang);
---
<section class="mi-seccion" id="mi-seccion" aria-labelledby="mi-seccion-title">
  <div class="container">
    <p class="section-eyebrow text-center reveal">EYEBROW</p>
    <h2 class="section-title text-center reveal" id="mi-seccion-title">{t.h2}</h2>
    <p class="section-sub text-center reveal">{t.sub}</p>
  </div>
</section>
```

2. Crear `src/styles/components/mi-seccion.css`
3. Agregar el copy en `src/i18n/ui.ts` (bajo `en.miSeccion` y `es.miSeccion`)
4. Si hay datos estructurados, agregar en `src/data/content.en.json` y `content.es.json`
5. Importar y usar en `src/pages/index.astro`

---

## Deployment

Build estático, sube el contenido de `dist/` al servidor:

```bash
npm run build
# subir dist/ → root del servidor Hostinger vía FTP
```

El `.htaccess` ya configura:
- Caché agresiva para assets estáticos
- Compresión gzip
- Headers de seguridad (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`)
- Redirect HTTP → HTTPS

---

## Documentación técnica adicional

Ver `CLAUDE.md` para guía operativa completa (patrones de componentes, checklist de nuevas páginas, convenciones de nombres, restricciones del proyecto).
