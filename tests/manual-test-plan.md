# Tironech — Plan de Tests Manuales

> Base URL: https://tironech.com (producción) · http://localhost:4321 (dev/CI)
> Última revisión: 2026-06-10

---

## Prioridades

| Prioridad | Criterio | Estado en CI |
|---|---|---|
| **P0** | Bloqueante: falla = no se deployea | Automatizado con Maestro |
| **P1** | Core UX: afecta conversión directamente | Solo manual |
| **P2** | Flujos secundarios importantes | Automatizado con Maestro |
| **P3** | Nice-to-have / auditoría | Solo manual |

---

## P0 — Bloqueantes

| ID | Sección | Descripción | Pasos | Resultado esperado |
|---|---|---|---|---|
| TC-P0-01 | General | Home EN carga | 1. Abrir `/` | `<title>` "Tironech — High-value engineering. QA, AI & Dev."; texto hero "Bugs in production." visible; nav dice "Schedule session →" |
| TC-P0-02 | General | Home ES carga | 1. Abrir `/es/` | `<title>` en español; texto hero "Bugs en producción." visible; nav dice "Agendar sesión →" |
| TC-P0-03 | i18n | Switch EN → ES | 1. Abrir `/` 2. Clic en botón "ES" de la nav | URL cambia a `/es/`; hero dice "Bugs en producción."; nav dice "Agendar sesión →" |
| TC-P0-04 | i18n | Switch ES → EN | 1. Abrir `/es/` 2. Clic en botón "EN" de la nav | URL cambia a `/`; hero dice "Bugs in production."; nav dice "Schedule session →" |
| TC-P0-05 | Nav | CTA de nav lleva al formulario | 1. Abrir `/` 2. Clic en "Schedule session →" del nav | Página hace scroll hasta `#contact`; formulario visible; campo "Full name" presente |
| TC-P0-06 | General | Todas las secciones presentes (EN) | 1. Abrir `/` 2. Scroll completo hacia abajo | Secciones visibles en orden: Hero, About, Trust Strip, Entry Solutions, Enterprise, Why Us, Leadership, Contact, Footer |

---

## P1 — Alto (solo manual)

| ID | Sección | Descripción | Pasos | Resultado esperado |
|---|---|---|---|---|
| TC-P1-01 | Nav | Burger menu abre en mobile | 1. Viewport 375px 2. Clic en ≡ | Menú mobile se despliega; 6 links visibles; `aria-expanded="true"` en botón |
| TC-P1-02 | Nav | Burger menu cierra al seleccionar link | 1. Abrir burger menu 2. Clic en "Company" | Menú cierra; página hace scroll a `#about` |
| TC-P1-03 | Nav | Links del nav desktop hacen scroll correcto | 1. Clic en cada link del nav | Scroll suave a la sección correspondiente (about, entry, enterprise, why-us, leadership) |
| TC-P1-04 | Contact | Submit con datos válidos — éxito | 1. Llenar todos los campos requeridos con datos válidos 2. Seleccionar servicio 3. Submit | Feedback "✓ Message sent! We'll reply within 24 business hours." visible; form se resetea; botón se reactiva |
| TC-P1-05 | Contact | Submit fallido muestra error | 1. Deshabilitar red en DevTools 2. Submit con datos válidos | Feedback de error aparece; botón se reactiva; formulario no se resetea |
| TC-P1-06 | Contact | Submit en ES muestra mensajes en español | 1. Abrir `/es/` 2. Submit formulario | Feedback "✓ ¡Mensaje enviado!" en español |

---

## P2 — Medio

| ID | Sección | Descripción | Pasos | Resultado esperado |
|---|---|---|---|---|
| TC-P2-01 | Contact | Campos del formulario presentes (EN) | 1. Abrir `/` 2. Scroll a `#contact` | Campos: Full name, Company, Corporate email, Country, solución (select con 6 opciones), problema (textarea); botón "Schedule free discovery session" |
| TC-P2-02 | Contact | Campos del formulario presentes (ES) | 1. Abrir `/es/` 2. Scroll a `#contact` | Mismos campos en español; botón "Agendar Sesión de Descubrimiento Gratuita" |
| TC-P2-03 | Footer | Links del footer presentes (EN) | 1. Abrir `/` 2. Scroll al footer | Sección Solutions con 5 links; sección Company con 4 links (About us, Why Tironech, Team, Contact); link "Privacy Policy" |
| TC-P2-04 | General | Página 404 carga | 1. Abrir `/ruta-que-no-existe` | Página 404 custom con texto "Page not found." y "Página no encontrada."; link "← Back to home" presente |
| TC-P2-05 | Privacy | Privacy EN carga | 1. Abrir `/privacy` | Página carga sin error; nav y footer presentes |
| TC-P2-06 | Privacy | Privacy ES carga | 1. Abrir `/es/privacy` | Página en español carga; nav y footer presentes |

---

## P3 — Bajo (solo manual / auditoría)

| ID | Sección | Descripción | Pasos | Resultado esperado |
|---|---|---|---|---|
| TC-P3-01 | SEO | Meta tags presentes EN | 1. Abrir `/` 2. Ver source | `<title>`, `<meta name="description">`, `og:image`, `og:title`, `canonical` presentes y no vacíos |
| TC-P3-02 | SEO | Meta tags presentes ES | 1. Abrir `/es/` 2. Ver source | Meta tags en español; `canonical` apunta a `https://tironech.com/es/` |
| TC-P3-03 | Performance | LCP del hero ≤ 2.5s | 1. Chrome DevTools → Lighthouse → Mobile | LCP ≤ 2.5s; imagen hero con `fetchpriority="high"` y `loading="eager"` |
| TC-P3-04 | A11y | Un solo `<h1>` por página | 1. Abrir `/` 2. DevTools → Elements: buscar `h1` | Solo 1 resultado; el h1 es el hero-title |
| TC-P3-05 | A11y | Contraste WCAG AA | 1. axe DevTools o Lighthouse | Sin errores de contraste en texto < 18px |
| TC-P3-06 | Responsive | Layout mobile 375px sin overflow | 1. DevTools → 375×812 2. Scroll completo | Sin scroll horizontal; imágenes contienen; burger visible; textos no se cortan |
| TC-P3-07 | A11y | Alt text en todas las imágenes | 1. Inspeccionar DOM | Todas las `<img>` funcionales tienen `alt` descriptivo; decorativas tienen `aria-hidden="true"` en contenedor |
| TC-P3-08 | SEO | Sitemap accesible | 1. Abrir `/sitemap-index.xml` | XML válido; rutas `/` y `/es/` referenciadas |

---

## Cobertura de automatización

```
P0 (6 tests) → 6 flows Maestro  →  tests/maestro/flows/p0/
P2 (6 tests) → 6 flows Maestro  →  tests/maestro/flows/p2/
P1 (6 tests) → manual (requieren API real o viewport interactivo)
P3 (8 tests) → manual / Lighthouse / axe
```
