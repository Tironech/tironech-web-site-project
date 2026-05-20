# Sabana Tech — Website

Sitio web corporativo de **Sabana Tech**, firma boutique de ingeniería de alto valor para empresas B2B en USA y Latinoamérica.

---

## Stack

- HTML5 + CSS3 + JavaScript (vanilla, sin framework ni build tool)
- [GSAP](https://gsap.com/) + ScrollTrigger — animaciones y efectos al scroll
- [Lenis](https://lenis.studiofreight.com/) — smooth scrolling
- Google Fonts: Manrope, Inter, JetBrains Mono
- Apache (`.htaccess` con cache, compresión GZIP y headers de seguridad)

---

## Estructura

```text
sabana-tech-co/
├── index.html          # Página principal (~654 líneas)
├── styles.css          # Todos los estilos (~1002 líneas)
├── main.js             # Lógica JS: animaciones, cursor, formulario (~422 líneas)
├── .htaccess           # Configuración Apache (cache, MIME, GZIP)
├── lib/
│   ├── gsap.min.js
│   ├── ScrollTrigger.min.js
│   ├── lenis.min.js
│   └── manifest.js     # Datos de marca, servicios y equipo
└── assets/
    ├── img/            # Imágenes de secciones (hero, AI, enterprise, etc.)
    ├── photos/         # Fotos adicionales
    └── credits.json    # Atribuciones de imágenes (Flickr CC)
```

---

## Cómo correr localmente

No hay build process. Basta con servir los archivos estáticos:

```bash
# Opción 1 — Python (viene preinstalado en macOS/Linux)
python -m http.server 8080

# Opción 2 — Node (requiere npx)
npx serve .

# Opción 3 — VS Code
# Instala la extensión "Live Server" y haz clic en "Go Live"
```

Abre `http://localhost:8080` en el navegador.

---

## Contenido editable

Todo el contenido de marca (nombre, tagline, servicios, equipo, precios) vive en:

**[lib/manifest.js](lib/manifest.js)**

Edita ese archivo para actualizar datos sin tocar el HTML.

---

## Secciones del sitio

| Sección | Descripción |
| --- | --- |
| Hero | Gradiente animado con mouse-reactive y scroll cue |
| About | Misión + stats animados (bugs, NPT, onboarding, delivery) |
| Servicios Entry | 3 cards: QA Consulting, AI Quality Shield, Web & Mobile Dev |
| Enterprise | Fractional CTO + Dev Team, Edge AI Vision Sprint |
| Por qué Sabana Tech | 6 propuestas de valor |
| Equipo | 4 co-fundadores / leads (fotos en construcción) |
| Contacto | Formulario de discovery call con validación |

---

## Deploy

El sitio es 100% estático. Se puede alojar en:

- **Shared hosting Apache** — sube los archivos por FTP; el `.htaccess` ya está configurado
- **Netlify / Vercel** — arrastra la carpeta o conecta el repo
- **GitHub Pages** — habilita Pages apuntando a la rama `main`

Para habilitar la redirección HTTPS en Apache, descomenta las líneas en `.htaccess`.

---

## Créditos de imágenes

Ver [assets/credits.json](assets/credits.json) para las atribuciones de Flickr (Creative Commons).
