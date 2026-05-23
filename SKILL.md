---
name: tironech-design
description: Use this skill to generate well-branded interfaces and assets for Tironech — a digital engineering and growth agency. Tironech's identity is locked to the canonical artifact (brand_identity_system.html) — architectural copper+stone logo, Poppins display + Lato body type, professional 8–12px container radii, no blue. Use for production code, throwaway prototypes, slides, mocks, marketing pages, or any artifact that should look on-brand for Tironech.
user-invocable: true
---

# Tironech Design System

🔒 **The canonical reference is `brand_identity_system.html`.** Open it first — it shows the logo variants, responsive formats, typography scale, palette, and statement banner in one place. Read **`README.md`** for the full positioning, content voice, visual foundations, and iconography rules.

Key non-negotiables:
- **Vibrant Copper `#995E31`** (primary) + **Stone Grey `#A3A391`** (secondary).
- **Rich Charcoal `#1A1A1A`** dark surfaces · **Off-White `#F8F8F8`** light surfaces.
- **No blue.** Status colors stay in the warm/neutral spectrum.
- **Container radii 8–12px.** Professional. Not dramatic art-studio curves.
- **Voice: "Accessible Expertise."** Warm, direct, transparent. Concrete prices, no hype. Spanish primary with English technical terms intact.
- **Type: Poppins (700–900) display + Lato (400/700) body** — substitutes: Inter ExtraBold, Montserrat Bold.
- **Logo:** the architectural mark from the canonical artifact — stone wings + copper T (dark) or copper wings + stone T (light). Always load from `assets/logo/*.svg`; never redraw inline.

## Files in this skill

| File | What it gives you |
|---|---|
| `brand_identity_system.html` | **Canonical artifact** — open first for full brand reference. |
| `assets/logo/mark.svg`, `mark-light.svg`, `mark-mono.svg`, `wordmark-*.svg`, `monogram-tn.svg` | Vector logo assets ready to drop into any artifact. |
| `colors_and_type.css` | All CSS variables — palette, fonts, scale, radii, shadows, motion, spacing. `@import` it and use the tokens. |
| `assets/img/` | 6 CC-licensed photographic backdrops. Use full-bleed with a dark warm tint, never bright/cool. See `assets/credits.json`. |
| `mobile_landing.html` | Reference single-page mobile site built in the canonical palette. Lift patterns from here. |
| `preview/` | One small HTML card per design token / component — open any to see live usage in context. |
| `ui_kits/website/` | High-fidelity React/JSX recreation of the live Tironech marketing site. Components are well-factored (`Nav`, `Hero`, `ServiceCards`, `Enterprise`, `WhyUs`, `Leadership`, `Contact`, `Footer`, `ServiceModal`). Drop them into a prototype. |

## How to use this skill

**For visual artifacts (slides, mocks, throwaway prototypes):** copy `colors_and_type.css` and the `assets/` you need into the output project. Always load the logo from `assets/logo/*.svg`. Lift component patterns from `brand_identity_system.html`, `mobile_landing.html`, and `ui_kits/website/`. Render to static HTML for the user to view.

**For production code:** import `colors_and_type.css` once at the root and consume the CSS variables (`var(--copper)`, `var(--font-display)`, etc). Reference logo SVGs by file path rather than re-creating them.

**If the user invokes this skill without other guidance:** ask them what they want to build (page? slide? prototype? component?), confirm the language (Spanish primary, English technical terms OK), and act as an expert designer who outputs HTML artifacts or production code as needed. Ask before adding new content, copy, or sections beyond what was requested.
