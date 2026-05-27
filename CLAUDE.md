# CLAUDE.md — Guía operativa para Claude Code

Este archivo es la fuente de verdad para trabajar en este proyecto con Claude Code.
Léelo completo antes de cualquier tarea de desarrollo.

---

## Arquitectura del proyecto

Sitio de marketing estático generado con **Astro 5**. Una sola ruta (`/`), varias secciones como componentes independientes. Todo el copy en `src/data/content.json`.

```
src/
  components/     # Un .astro por sección + SEO.astro
  data/
    content.json  # TODO el copy del sitio vive aquí
  layouts/
    BaseLayout.astro   # Shell HTML, importa SEO.astro
  pages/
    index.astro   # Solo ensambla componentes, pasa props SEO
  styles/
    variables.css # Tokens de diseño (colores, tipografía, spacing)
    base.css      # Reset + estilos globales
    components/   # Un .css por componente

public/
  assets/
    img/          # Imágenes de secciones
    logo/         # Marca
    og/           # Imágenes Open Graph (1200×630 px)
  lib/            # GSAP + ScrollTrigger (no tocar)
  scripts/
    main.js       # Animaciones, burger menu, scroll reveals
  robots.txt      # Generado — no editar manualmente
  .htaccess       # Apache: caché, redirects, compresión
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
4. `SEO.astro` genera: `<title>`, `<meta description>`, `<link canonical>`, 6 tags `og:*` y 4 tags `twitter:*`

### Props de SEO.astro

```typescript
interface Props {
  title: string;         // requerido — va a <title> y og:title y twitter:title
  description: string;   // requerido — va a meta description, og y twitter
  canonicalURL?: string; // opcional — se auto-computa de Astro.url si no se pasa
  ogImage?: string;      // opcional — ruta relativa /assets/og/... o URL absoluta
}
```

### Fallbacks definidos en SEO.astro

| Prop | Fallback |
|---|---|
| `description` | Descripción corporativa larga de Tironech |
| `ogImage` | `/assets/og/og-default.jpg` |
| `canonicalURL` | `https://tironech.com` + `Astro.url.pathname` |

---

## Cómo agregar una nueva página

### Paso 1 — Crear el archivo de página

```astro
// src/pages/mi-pagina.astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
// importar componentes de la página...

const title = 'Nombre de la Página — Tironech';
const description = 'Descripción única de esta página, 150-160 caracteres, orientada a conversión.';
---
<BaseLayout title={title} description={description}>
  <Nav />
  <main id="main-content">
    <!-- secciones aquí -->
  </main>
  <Footer />
</BaseLayout>
```

### Paso 2 — Imagen OG (obligatorio)

Crear `/public/assets/og/nombre-pagina.jpg` (1200×630 px) y pasarla:
```astro
<BaseLayout title={title} description={description} ogImage="/assets/og/nombre-pagina.jpg">
```

### Paso 3 — Verificar heading hierarchy

- **Un solo `<h1>`** por página, dentro del componente Hero o principal
- `<h2>` para títulos de sección (`section-title`)
- `<h3>` para sub-items dentro de una sección
- Nunca saltar niveles (h1 → h3 sin h2)

---

## Cómo crear un nuevo componente de sección

### Estructura estándar de componente

```astro
// src/components/MiSeccion.astro
---
import content from '../data/content.json';
import '../styles/components/mi-seccion.css';
const { miData } = content;
---
<section class="mi-seccion" id="mi-seccion" aria-labelledby="mi-seccion-title">
  <div class="container">
    <p class="section-eyebrow text-center reveal">EYEBROW LABEL</p>
    <h2 class="section-title text-center reveal" id="mi-seccion-title">
      Título principal de la sección
    </h2>
    <p class="section-sub text-center reveal">
      Subtítulo o descripción de apoyo.
    </p>

    <!-- contenido específico -->
  </div>
</section>
```

### Reglas de accesibilidad por componente

- Cada `<section>` debe tener `aria-labelledby` apuntando al `id` del título
- Imágenes decorativas: `alt` descriptivo en español (aunque el padre tenga `aria-hidden`)
- Imágenes funcionales: `alt` descriptivo obligatorio
- Botones con solo icono: `aria-label` obligatorio
- `role="list"` en `<ul>` cuando el CSS puede quitar los bullets

### Imágenes de fondo en secciones

```astro
<div class="mi-seccion-bg" aria-hidden="true">
  <img
    src="/assets/img/mi-imagen.jpg"
    alt="Descripción de la imagen en español"
    loading="lazy"
    decoding="async"
  />
  <div class="mi-seccion-tint"></div>
</div>
```

El tint es un `div` con `background: linear-gradient(...)` para contraste de texto. Siempre acompañar la imagen con uno.

---

## Gestión de contenido (`content.json`)

**Todo el copy visible va en `src/data/content.json`**, nunca hardcodeado en el componente.

### Patrón de importación

```astro
---
import content from '../data/content.json';
const { miClave } = content;
---
```

### Estructura de una tarjeta típica

```json
{
  "id": "slug-unico",
  "tag": "ETIQUETA CHIP",
  "icon": "◈",
  "featured": false,
  "title": "Título de la tarjeta",
  "desc": "Descripción breve orientada a conversión.",
  "features": [
    "Bullet punto 1",
    "Bullet punto 2"
  ],
  "priceVal": "$X.XXX USD/mes",
  "priceModel": "Modelo de precio",
  "ctaLabel": "Texto del botón →",
  "ctaVariant": "btn-cta"
}
```

---

## Tokens de diseño (`variables.css`)

Siempre usar variables CSS, nunca valores hardcodeados en componentes.

| Token | Uso |
|---|---|
| `var(--color-copper)` | Acento principal, CTAs |
| `var(--color-amber)` | Acento secundario, tarjetas destacadas |
| `var(--color-stone)` | Texto secundario, eyebrows |
| `var(--color-charcoal)` | Fondo base |
| `var(--color-surface)` | Fondo de tarjetas |
| `var(--font-display)` | Poppins — títulos |
| `var(--font-body)` | Lato — cuerpo de texto |
| `var(--font-mono)` | JetBrains Mono — etiquetas técnicas |

**Regla de marca:** No usar azul en ningún lugar del diseño.

---

## Clases CSS reutilizables (de `base.css`)

| Clase | Descripción |
|---|---|
| `.container` | Max-width centrado con padding horizontal |
| `.section-eyebrow` | Etiqueta pequeña sobre el título de sección |
| `.section-title` | H2 de sección con estilos de marca |
| `.section-sub` | Párrafo introductorio bajo el título |
| `.btn.btn-cta` | Botón primario (copper) |
| `.btn.btn-amber` | Botón secundario (amber) |
| `.btn.btn-ghost` | Botón outline |
| `.btn.btn-full` | Botón 100% ancho |
| `.reveal` | Elemento que se anima al entrar en viewport (GSAP) |
| `.text-center` | Alineación centrada |

---

## Animaciones (GSAP)

Las animaciones están en `public/scripts/main.js`. No modificar ese archivo a menos que se solicite explícitamente.

- Agregar clase `.reveal` a cualquier elemento para activar la animación de entrada
- El scroll reveal está configurado globalmente — solo añadir la clase

---

## JSON-LD (Schema.org)

El schema `Organization` está embebido en `SEO.astro` y se inyecta automáticamente en todas las páginas. No requiere acción por página.

Campos configurados: `name`, `url`, `logo`, `description`, `email`, `areaServed` (6 países), `knowsAbout`, `contactPoint`.

Para validar: [schema.org/docs/gs.html](https://validator.schema.org/) — pegar la URL del sitio.

---

## Google Search Console — verificación del dominio

El meta tag de verificación ya está **hardcodeado** en `BaseLayout.astro`:

```html
<!-- Google Search Console -->
<meta name="google-site-verification" content="google6c8c64c6b98e19f4" />
```

El archivo HTML de verificación también está en `public/google6c8c64c6b98e19f4.html`.

Pendiente — hacer en Search Console:
1. Ir a [search.google.com/search-console](https://search.google.com/search-console)
2. Agregar propiedad → URL prefix → `https://tironech.com`
3. Hacer deploy del sitio con los archivos actuales
4. Hacer clic en **"Verify"** (detectará el meta tag o el archivo HTML)
5. Una vez verificado, enviar sitemap: `https://tironech.com/sitemap-index.xml`

---

## Imagen OG — estado actual y páginas nuevas

La imagen por defecto ya existe: `/public/assets/og/og-default.png`.
El fallback en `SEO.astro` apunta a esta imagen automáticamente.

Para crear la imagen OG de una página nueva:
```
1. Duplicar og-template.html en /public/assets/og/
2. Editar el <h1 class="headline"> y el <p class="subline">
3. Abrir en Chrome (zoom al 100%)
4. Capturar exactamente 1200×630 px → Mac: Cmd+Shift+4
5. Guardar como og-[pagina].png en /public/assets/og/
6. Pasar la ruta al layout: ogImage="/assets/og/og-[pagina].png"
```

---

## Checklist antes de hacer build/commit

- [ ] Cada página tiene `title` y `description` únicos pasados al layout
- [ ] Existe `/public/assets/og/[pagina].png` (1200×630 px) si se creó una página nueva
- [ ] Todas las `<img>` tienen `alt` descriptivo en español
- [ ] Solo existe un `<h1>` por página
- [ ] Copy nuevo agregado a `content.json`, no hardcodeado
- [ ] Estilos nuevos en `/src/styles/components/[componente].css`
- [ ] `npm run build` pasa sin errores ni warnings

---

## Convenciones de nombres

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes | PascalCase | `MiSeccion.astro` |
| Estilos de componente | kebab-case, mismo nombre | `mi-seccion.css` |
| Clases CSS | BEM-like con kebab | `.mi-seccion__card` |
| IDs de sección (anchor) | kebab-case | `id="mi-seccion"` |
| Claves en content.json | camelCase | `"miDataArray"` |
| Imágenes OG | kebab-case | `og-mi-pagina.jpg` |

---

## Deployment

Build estático en `dist/`. Se sube manualmente a Hostinger vía FTP o panel.
El `.htaccess` ya maneja caché agresiva, gzip y headers de seguridad.

```bash
npm run build   # genera dist/
# subir contenido de dist/ al root del servidor
```

El sitemap se regenera automáticamente en cada build: `dist/sitemap-index.xml`.

---

## Lo que NO hacer

- No crear CSS inline en componentes — usar el archivo `.css` correspondiente
- No hardcodear copy en componentes — va en `content.json`
- No usar colores hardcodeados — usar tokens de `variables.css`
- No saltar niveles de heading (h1→h3)
- No agregar `<img>` sin atributo `alt`
- No modificar archivos en `public/lib/` (GSAP bundles)
- No editar `dist/` directamente
- No azul en el diseño
