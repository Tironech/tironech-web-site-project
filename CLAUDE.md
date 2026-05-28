# CLAUDE.md — Guía operativa para Claude Code

Este archivo es la fuente de verdad para trabajar en este proyecto con Claude Code.
Léelo completo antes de cualquier tarea de desarrollo.

---

## Arquitectura del proyecto

Sitio de marketing estático generado con **Astro 5**. Dos rutas: `/` (EN) y `/es/` (ES). Varias secciones como componentes independientes.

```
src/
  assets/
    img/                    # Imágenes de sección procesadas por Astro (WebP + hash)
      hero.jpg
      ai-section.jpg
      enterprise-section.jpg

  components/               # Un .astro por sección
    SEO.astro
    Nav.astro
    Hero.astro
    TrustStrip.astro
    About.astro
    EntryServices.astro
    Enterprise.astro
    WhyUs.astro
    Leadership.astro
    Contact.astro
    Footer.astro
    Cursor.astro

  data/
    content.en.json         # Datos estructurados EN (servicios, team, markets, steps…)
    content.es.json         # Datos estructurados ES

  i18n/
    ui.ts                   # Todo el copy UI en EN y ES (nav, hero, títulos, labels…)
    content.ts              # Helper getContent(lang)

  layouts/
    BaseLayout.astro        # Shell HTML: SEO, preload hero, fuentes, GSAP

  pages/
    index.astro             # Ruta EN
    es/index.astro          # Ruta ES

  styles/
    global.css              # Entry point: @import variables.css + base.css
    variables.css           # Tokens de diseño (colores, tipografía, spacing)
    base.css                # Reset + estilos globales + clases utilitarias
    components/             # Un .css por componente

public/
  assets/
    img/                    # Imágenes estáticas (no procesadas por Astro)
      contact-bg.jpg · og-section.jpg · tech-section.jpg
    logo/
      logo.webp             # Logotipo principal — usar en componentes Astro
      mark.png              # Favicon — PNG porque WebP no es universal en favicons
    og/
      og-default.png        # Imagen OG fallback (1200×630 px)
      og-template.html      # Plantilla HTML para crear nuevas OG
  lib/                      # GSAP + ScrollTrigger — NO TOCAR
  scripts/
    main.js                 # Animaciones, burger menu, card hover, scroll cue
  robots.txt
  .htaccess
```

---

## Sistema i18n — cómo funciona

El sitio es bilingüe. Nunca hardcodear copy en componentes.

### Dos tipos de contenido

| Tipo | Archivo | Qué va aquí |
|---|---|---|
| Copy UI | `src/i18n/ui.ts` | Nav, hero, títulos de sección, labels, CTAs, placeholders |
| Datos estructurados | `src/data/content.en.json` / `content.es.json` | Arrays de tarjetas, team members, steps, markets |

### Patrón de importación (obligatorio en todo componente)

```astro
---
import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/ui';
import { getContent } from '../i18n/content';

const lang = (Astro.currentLocale ?? 'en') as Lang;
const t = ui[lang].miSeccion;         // textos de UI
const { miData } = getContent(lang);  // datos estructurados
---
```

---

## Sistema SEO — cómo funciona

### El flujo completo

```
index.astro  →  BaseLayout.astro  →  SEO.astro  →  <head>
   props            defaults              tags
```

1. `index.astro` pasa `title` y `description` como props a `BaseLayout`
2. `BaseLayout` aplica fallbacks si algún prop viene `undefined`
3. `BaseLayout` pasa los 4 props a `<SEO />`
4. `SEO.astro` genera: `<title>`, `<meta description>`, `<link canonical>`, OG tags, Twitter tags, JSON-LD

### Props de BaseLayout

```typescript
interface Props {
  title?:        string;   // → <title> + og:title + twitter:title
  description?:  string;   // → meta description + og + twitter
  canonicalURL?: string;   // auto-computa de Astro.url si no se pasa
  ogImage?:      string;   // ruta relativa /assets/og/... o URL absoluta
}
```

### Fallbacks en SEO.astro

| Prop | Fallback |
|---|---|
| `description` | Descripción corporativa larga de Tironech |
| `ogImage` | `/assets/og/og-default.png` |
| `canonicalURL` | `https://tironech.com` + `Astro.url.pathname` |

### Preload del hero (BaseLayout)

El preload usa `getImage()` para que la URL del preload haga match exacto con la URL procesada por `<Image>` en Hero.astro:

```astro
import { getImage } from 'astro:assets';
import heroSrc from '../assets/img/hero.jpg';
const heroPreload = await getImage({ src: heroSrc, format: 'webp' });
// → <link rel="preload" as="image" href={heroPreload.src} fetchpriority="high" type="image/webp" />
```

### Google Search Console — pendiente

Meta tag ya embebido en `BaseLayout.astro`:
```html
<meta name="google-site-verification" content="google6c8c64c6b98e19f4" />
```
Archivo HTML de verificación: `public/google6c8c64c6b98e19f4.html`

**Pasos pendientes (después del próximo deploy):**
1. Ir a [search.google.com/search-console](https://search.google.com/search-console)
2. Agregar propiedad → URL prefix → `https://tironech.com`
3. Clic en **Verify**
4. Enviar sitemap: `https://tironech.com/sitemap-index.xml`

---

## Cómo agregar una nueva página

### Paso 1 — Crear el archivo de página

```astro
// src/pages/mi-pagina.astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';

const title = 'Nombre de la Página — Tironech';
const description = 'Descripción única de esta página, 150-160 caracteres.';
---
<BaseLayout title={title} description={description} ogImage="/assets/og/og-mi-pagina.png">
  <Nav />
  <main id="main-content">
    <!-- secciones aquí -->
  </main>
  <Footer />
</BaseLayout>
```

### Paso 2 — Imagen OG (obligatorio)

```
1. Duplicar og-template.html en /public/assets/og/
2. Editar el <h1 class="headline"> y el <p class="subline">
3. Abrir en Chrome (zoom al 100%)
4. Capturar exactamente 1200×630 px — Mac: Cmd+Shift+4
5. Guardar como og-[pagina].png en /public/assets/og/
6. Pasar la ruta al layout: ogImage="/assets/og/og-[pagina].png"
```

### Paso 3 — Verificar heading hierarchy

- **Un solo `<h1>`** por página
- `<h2>` para títulos de sección (`section-title`)
- `<h3>` para sub-items dentro de una sección
- Nunca saltar niveles

---

## Cómo crear un nuevo componente de sección

### Estructura estándar

```astro
// src/components/MiSeccion.astro
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
    <p class="section-eyebrow text-center reveal">{t.eyebrow}</p>
    <h2 class="section-title text-center reveal" id="mi-seccion-title" set:html={t.h2} />
    <p class="section-sub text-center reveal">{t.sub}</p>
    <!-- contenido específico -->
  </div>
</section>
```

### Reglas de accesibilidad por componente

- Cada `<section>` debe tener `aria-labelledby` apuntando al `id` del título
- Imágenes decorativas: `aria-hidden="true"` en el contenedor
- Imágenes funcionales: `alt` descriptivo en español obligatorio
- Botones con solo icono: `aria-label` obligatorio
- `role="list"` en `<ul>` cuando el CSS puede quitar los bullets

### Imágenes de fondo en secciones

```astro
---
import { Image } from 'astro:assets';
import miImg from '../assets/img/mi-imagen.jpg';
---
<div class="mi-seccion-bg" aria-hidden="true">
  <Image src={miImg} alt="Descripción en español" format="webp" loading="lazy" />
  <div class="mi-seccion-tint"></div>
</div>
```

El tint es un `div` con `background` sólido o gradiente para contraste de texto. Siempre acompañar la imagen con uno.

---

## Gestión de imágenes

### Regla: dónde poner cada imagen

| Tipo | Ubicación | Por qué |
|---|---|---|
| Imágenes de sección (fondo, hero) | `src/assets/img/` | Astro las convierte a WebP, les aplica hash y genera srcsets |
| Imágenes OG | `public/assets/og/` | Se referencian con ruta fija en meta tags |
| Logo para favicons | `public/assets/logo/mark.png` | WebP no tiene soporte universal en favicons |
| Logo en componentes | `public/assets/logo/logo.webp` | Ya convertido, se sirve directo |

### Prioridad de carga

```astro
<!-- Hero (LCP) -->
<Image src={heroImg} alt="..." format="webp" loading="eager" fetchpriority="high" />

<!-- Resto de secciones -->
<Image src={sectionImg} alt="..." format="webp" loading="lazy" />
```

---

## Tokens de diseño (`variables.css`)

Siempre usar variables CSS, nunca valores hardcodeados.

| Token | Valor | Uso |
|---|---|---|
| `--copper` | `#995E31` | Acento principal, CTAs |
| `--copper-hover` | `#7d4d28` | Hover de CTAs |
| `--copper-light` | `#b8784e` | Iconos, acentos secundarios |
| `--stone` | `#A3A391` | Texto secundario, elementos neutros |
| `--stone-light` | `#c5c5b5` | Texto de soporte, accents en tarjetas destacadas |
| `--ink` | `#ede8e2` | Texto principal |
| `--ink-soft` | `#b8afa3` | Texto de apoyo (subtítulos, descripciones) |
| `--ink-mute` | `#7d6f5e` | Solo decorativo / texto grande — NO en texto < 18px |
| `--bg` | `#1A1A1A` | Fondo base |
| `--bg-2` | `#232323` | Fondo de secciones alternadas |
| `--bg-card` | `#2a2a2a` | Fondo de tarjetas |
| `--font-display` | Poppins | Títulos |
| `--font-body` | Lato | Cuerpo de texto |
| `--font-mono` | JetBrains Mono | Etiquetas técnicas, precios |

**Regla de marca:** No usar azul en ningún lugar del diseño.

---

## Accesibilidad (WCAG AA)

Contraste mínimo: **4.5:1** texto normal, **3:1** texto grande (≥ 18px regular / ≥ 14px bold).

| Combinación | Ratio | Estado |
|---|---|---|
| `--ink` sobre `--bg` | ~13.1:1 | ✅ |
| `--ink-soft` sobre `--bg` | ~7.8:1 | ✅ |
| `--stone` sobre `--bg` | ~6.3:1 | ✅ |
| `#fff` sobre `--copper` | ~4.9:1 | ✅ |
| `--ink-mute` sobre `--bg` | ~3.7:1 | ⚠️ Solo decorativo/grande |

**Correcciones ya aplicadas:**
- `.hero-kicker`, `.hero-markets`, `.scroll-label` en `hero.css`: cambiados de `--ink-mute` → `--stone`

---

## Clases CSS reutilizables (`base.css`)

| Clase | Descripción |
|---|---|
| `.container` | Max-width centrado con padding horizontal |
| `.section-eyebrow` | Etiqueta pequeña sobre el título de sección |
| `.section-title` | H2 de sección con estilos de marca |
| `.section-sub` | Párrafo introductorio bajo el título |
| `.btn.btn-cta` | Botón primario (copper) |
| `.btn.btn-ghost` | Botón outline |
| `.btn.btn-full` | Botón 100% ancho |
| `.reveal` | Elemento que se anima al entrar en viewport (GSAP) |
| `.text-center` | Alineación centrada |

---

## Animaciones (GSAP)

Las animaciones están en `public/scripts/main.js`.

- Agregar clase `.reveal` a cualquier elemento para activar la animación de entrada
- El scroll reveal está configurado globalmente — solo añadir la clase
- **No modificar `public/lib/`** (bundles de GSAP)
- Modificar `main.js` solo si se solicita explícitamente

### Optimizaciones aplicadas en main.js

| Función | Optimización |
|---|---|
| `initMouseGradient` | rAF se pausa con IntersectionObserver cuando el Hero no es visible |
| `highlightNav` | `offsetTop` cacheado en array, recalculado solo en `resize` |
| `initCardHover` | Throttled con rAF + patrón `pendingE` |
| `boot()` | Nav y SmoothScroll críticos; resto diferido con `requestIdleCallback` |
| `initForms` | ELIMINADO — era un handler duplicado que interfería con Contact.astro |

---

## JSON-LD (Schema.org)

El schema `Organization` está embebido en `SEO.astro` y se inyecta en todas las páginas automáticamente.

Campos: `name`, `url`, `logo` (logo.webp, 482×518), `description`, `email`, `areaServed` (6 países), `knowsAbout`, `contactPoint`.

---

## Checklist antes de hacer build/commit

- [ ] Cada página tiene `title` y `description` únicos pasados al layout
- [ ] Existe `/public/assets/og/[pagina].png` (1200×630 px) si se creó una página nueva
- [ ] Todas las `<Image>` tienen `alt` descriptivo en español
- [ ] Solo existe un `<h1>` por página
- [ ] Copy nuevo en `src/i18n/ui.ts` y/o `src/data/content.[lang].json`, no hardcodeado
- [ ] Datos estructurados en AMBOS archivos (`content.en.json` y `content.es.json`)
- [ ] Estilos nuevos en `src/styles/components/[componente].css`
- [ ] Contraste WCAG AA verificado (mínimo 4.5:1 para texto normal)
- [ ] `npm run build` pasa sin errores ni warnings

---

## Convenciones de nombres

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes | PascalCase | `MiSeccion.astro` |
| Estilos de componente | kebab-case, mismo nombre | `mi-seccion.css` |
| Clases CSS | BEM-like con kebab | `.mi-seccion__card` |
| IDs de sección (anchor) | kebab-case | `id="mi-seccion"` |
| Claves en ui.ts | camelCase | `miSeccion.eyebrow` |
| Claves en content JSON | camelCase | `miDataArray` |
| Imágenes OG | kebab-case | `og-mi-pagina.png` |

---

## Deployment

Build estático en `dist/`. Se sube manualmente a Hostinger vía FTP o panel.

```bash
npm run build   # genera dist/
# subir contenido de dist/ al root del servidor
```

El `.htaccess` maneja: caché agresiva, gzip, headers de seguridad, HTTP→HTTPS redirect.
El sitemap se regenera automáticamente en cada build: `dist/sitemap-index.xml`.

---

## Lo que NO hacer

- No crear CSS inline en componentes — usar el archivo `.css` correspondiente
- No hardcodear copy en componentes — va en `src/i18n/ui.ts` o `src/data/content.[lang].json`
- No usar colores hardcodeados — usar tokens de `variables.css`
- No saltar niveles de heading (h1→h3)
- No agregar `<Image>` / `<img>` sin atributo `alt`
- No usar `--ink-mute` en texto pequeño (< 18px) — contraste insuficiente (~3.7:1)
- No modificar archivos en `public/lib/` (GSAP bundles)
- No editar `dist/` directamente
- No azul en el diseño
- No `transition: all` en estilos — usar propiedades explícitas
