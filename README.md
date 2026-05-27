# Tironech — Web Site

Sitio de marketing para [Tironech](https://tironech.com) construido con Astro 5.
Arquitectura de componentes estáticos, SEO técnico integrado y contenido centralizado en JSON.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro 5 (output estático) |
| Estilos | CSS por componente + tokens globales (`variables.css`) |
| Tipografía | Poppins (display) · Lato (body) · JetBrains Mono (mono) |
| Animaciones | GSAP + ScrollTrigger (desde `public/lib/`) |
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
  components/
    SEO.astro          # Componente de metadatos — title, og:*, twitter:*, canonical
    Nav.astro          # Navegación principal + menú mobile
    Hero.astro         # Sección hero con H1
    TrustStrip.astro   # Banda de métricas
    About.astro        # Propuesta de valor
    EntryServices.astro # Servicios de entrada (tarjetas)
    Enterprise.astro   # Servicios enterprise (tarjetas)
    WhyUs.astro        # Diferenciadores
    Leadership.astro   # Equipo
    Contact.astro      # Formulario de contacto
    Footer.astro       # Pie de página
    Cursor.astro       # Cursor personalizado

  data/
    content.json       # Todo el copy del sitio en un solo lugar

  layouts/
    BaseLayout.astro   # Shell HTML: importa SEO.astro, fuentes, GSAP

  pages/
    index.astro        # Única página: ensambla componentes + pasa props SEO

  styles/
    variables.css      # Tokens de diseño (colores, fuentes, spacing)
    base.css           # Reset global + clases utilitarias
    components/        # CSS individual por componente

public/
  assets/
    img/               # Imágenes de secciones
    logo/              # Logotipo y marca
    og/                # Imágenes Open Graph (1200×630 px)
  lib/                 # GSAP + ScrollTrigger (bundles estáticos)
  scripts/
    main.js            # Animaciones de entrada, burger menu
  robots.txt           # Directivas de crawl + referencia al sitemap
  .htaccess            # Apache: caché, gzip, headers de seguridad
```

---

## Sistema SEO

El SEO está centralizado en `src/components/SEO.astro` y se integra en el layout principal.

### Flujo de metadatos

```
index.astro  →  BaseLayout.astro  →  SEO.astro  →  <head>
```

### Lo que genera SEO.astro por página

```html
<title>...</title>
<meta name="description" />
<link rel="canonical" />

<!-- Open Graph (LinkedIn, Facebook, WhatsApp) -->
<meta property="og:title" />
<meta property="og:description" />
<meta property="og:type" />
<meta property="og:url" />
<meta property="og:image" />
<meta property="og:image:alt" />
<meta property="og:site_name" />
<meta property="og:locale" />

<!-- Twitter Card -->
<meta name="twitter:card" />
<meta name="twitter:title" />
<meta name="twitter:description" />
<meta name="twitter:image" />
```

### Props disponibles por página

```astro
<BaseLayout
  title="Título de la página — Tironech"
  description="Descripción de 150-160 caracteres orientada a conversión."
  ogImage="/assets/og/og-mi-pagina.png"
  canonicalURL="https://tironech.com/mi-pagina"
>
```

Todos los props son opcionales en `BaseLayout` — el sistema aplica fallbacks automáticamente.

### Sitemap y robots

- `sitemap-index.xml` se regenera automáticamente en cada `npm run build` (via `@astrojs/sitemap`)
- `robots.txt` en `public/` — permite todo el sitio, bloquea `/.astro/`, apunta al sitemap

---

## Gestión de contenido

**Todo el copy visible está en `src/data/content.json`** — nunca hardcodeado en componentes.

Los componentes importan solo la clave que necesitan:

```astro
---
import content from '../data/content.json';
const { entryServices } = content;
---
```

Claves disponibles en `content.json`:

| Clave | Usado por |
|---|---|
| `entryServices` | `EntryServices.astro` — tarjetas de servicios de entrada |
| `enterpriseServices` | `Enterprise.astro` — tarjetas enterprise |
| `whyItems` | `WhyUs.astro` — diferenciadores |
| `stats` | `About.astro` — métricas animadas |
| `teamMembers` | `Leadership.astro` — equipo |
| `contactSteps` | `Contact.astro` — pasos post-formulario |
| `markets` | `Hero.astro` — mercados que atiende |
| `footerSolutions` | `Footer.astro` — links de soluciones |
| `footerCompany` | `Footer.astro` — links corporativos |

---

## Tokens de diseño

Definidos en `src/styles/variables.css`. Siempre usar variables, nunca valores directos.

| Token | Valor | Uso |
|---|---|---|
| `--color-copper` | `#995E31` | Acento principal, CTAs |
| `--color-amber` | (definido en variables) | Acento secundario, destacados |
| `--color-stone` | `#A3A391` | Texto secundario |
| `--color-charcoal` | `#1A1A1A` | Fondo base |
| `--font-display` | Poppins | Títulos y headings |
| `--font-body` | Lato | Cuerpo de texto |
| `--font-mono` | JetBrains Mono | Etiquetas técnicas |

**Regla de marca:** No usar azul en ningún lugar.

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

2. Crear `/public/assets/og/og-nueva-pagina.png` (1200×630 px) usando `og-template.html` como base
3. Verificar jerarquía de headings: un solo `<h1>`, luego `<h2>` por sección, `<h3>` para sub-items

---

## Agregar un nuevo componente de sección

1. Crear `src/components/MiSeccion.astro` siguiendo el patrón:

```astro
---
import '../styles/components/mi-seccion.css';
---
<section class="mi-seccion" id="mi-seccion" aria-labelledby="mi-seccion-title">
  <div class="container">
    <p class="section-eyebrow text-center reveal">EYEBROW</p>
    <h2 class="section-title text-center reveal" id="mi-seccion-title">Título</h2>
    <p class="section-sub text-center reveal">Subtítulo.</p>
    <!-- contenido -->
  </div>
</section>
```

2. Crear `src/styles/components/mi-seccion.css`
3. Agregar el copy en `content.json` si aplica
4. Importar y usar en `src/pages/index.astro`

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
- Headers de seguridad (`X-Content-Type-Options`, `Referrer-Policy`)
- Redirect HTTP → HTTPS

---

## Documentación técnica adicional

Ver `CLAUDE.md` para guía operativa completa destinada a Claude Code:
patrones de componentes, checklist de nuevas páginas, convenciones de nombres y restricciones del proyecto.
