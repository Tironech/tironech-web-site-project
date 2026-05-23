# Tironech — Web Site

Marketing site for [Tironech](https://tironech.com) built with Astro 5.

## Stack

- **Framework**: Astro 5 (static output)
- **Styles**: Scoped component CSS + global design tokens (`src/styles/variables.css`)
- **Fonts**: Poppins (display) · Lato (body) · JetBrains Mono (mono)
- **Animations**: GSAP + ScrollTrigger (served from `public/lib/`)
- **Deployment**: Hostinger (Apache) via `public/.htaccess`

## Development

```bash
npm install
npm run dev       # localhost:4321
npm run build     # output → dist/
npm run preview   # preview the build locally
```

## Project structure

```
src/
  components/     # Astro components (Nav, Hero, About, …)
  data/           # content.json — all copy in one place
  layouts/        # BaseLayout.astro
  pages/          # index.astro
  styles/         # variables.css, base.css
public/
  assets/         # images, logo
  lib/            # GSAP bundles
  scripts/        # main.js (scroll reveals, burger menu, …)
  .htaccess       # Apache redirects + caching headers
```

## Brand

Design tokens live in `src/styles/variables.css`.
Canonical brand reference: `ui_kits/brand_identity_system.html` (design system repo).

- Primary: Vibrant Copper `#995E31`
- Secondary: Stone Grey `#A3A391`
- Dark surface: Rich Charcoal `#1A1A1A`
- No blue anywhere.
