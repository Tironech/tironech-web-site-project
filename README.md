# Tironech Design System

> **Tironech | Strategic Digital Engineering & Growth**
> "Accessible Expertise" — senior-level technical partner that is grounded, practical, fair-priced.

---

## What is Tironech?

Tironech is a multi-disciplinary **digital engineering and growth agency**. They combine practical, high-quality technology solutions with digital marketing, Amazon SEO, and content strategies — serving local and international markets (Colombia, Spain, English-speaking countries).

In their own words from the codebase, they're a "boutique de ingeniería de alto valor" (high-value engineering boutique). The current website is bilingual-leaning Spanish, B2B, targeting:

- SaaS B2B and Fintech with bugs in production
- US-based startups without senior technical teams
- Industry / manufacturing / logistics needing Computer Vision + Edge AI

### Core services (from `lib/manifest.js`)
| Tier | Service | Price |
|---|---|---|
| Entry | **QA Consulting & Automation** | from $1.800 USD/mo |
| Entry · *featured* | **AI Quality Shield** | $4.500 + $3.500/mo retainer |
| Entry | **Web & Mobile App Development** | from $3.000 USD |
| Enterprise | **Fractional CTO + Dev Team** | $5–12k USD/mo |
| Enterprise | **Edge AI Vision Sprint** | $8–25k USD + license |

### Positioning rules — *non-negotiable*
- ❌ Do **NOT** look like an overpriced fancy boutique. Avoid intimidatingly-expensive vibes.
- ✅ Project **accessibility, reliability, hard work, clear ROI**.
- ❌ **No blue.** Any shade. Anywhere. The brand is built on warm copper + stone grey on warm-charcoal.
- ✅ Container radii **8px–12px**. Standard, professional, optimized. Never dramatic art-studio curves.

---

## Sources used to build this system

- **GitHub** — [Tironech/tironech-web-site-project](https://github.com/Tironech/tironech-web-site-project) — full marketing site (HTML/CSS/JS, no framework). Provided color tokens, type stack, copy, and visuals. This was the source of truth for all design decisions in this system; explore it for additional context.
- The brand brief pasted into this project's chat (positioning, prohibited colors, geometric sans-serif preference, container radii rule, team structure).

Other repos in the org are QA test suites or coursework — not used.

---

## Index — files in this folder

```
README.md                   ← you are here (positioning, content, visual, iconography)
SKILL.md                    ← skill manifest (for Claude Code / Agent Skills)
colors_and_type.css         ← all CSS vars (colors, type, spacing, radii, shadow, motion)
assets/                     ← images, logo SVGs, illustrations from the live site
  img/                      ← hero + section background photos (CC Flickr)
  logo/                     ← SVG marks/wordmarks generated for the system
  credits.json              ← image attributions
fonts/                      ← (loaded from Google Fonts — see colors_and_type.css)
preview/                    ← Design System tab cards (one per token/component)
ui_kits/
  website/                  ← React/JSX recreation of the live marketing site
    index.html              ← interactive click-through prototype
    *.jsx                   ← Nav, Hero, ServiceCard, EnterpriseCard, etc.
    README.md
```

---

## CONTENT FUNDAMENTALS — How Tironech writes

Voice: **"Accessible Expertise."** Warm + transparent + direct. Speaks to a CFO or founder, not a developer-audience hype reel.

### Tone & vocabulary
- **Direct and confronting in the headline, then warm in the body.** The hero leads with the customer's *pain* ("Bugs en producción. Sin equipo senior. Tecnología que no escala.") then lands on "*Nosotros resolvemos los tres.*" — italicised relief beat in the secondary copper-light tone.
- **Concrete numbers over adjectives.** "6x menos bugs", "40% reducción de NPT técnico", "3 semanas de onboarding promedio", "Diagnóstico inicial en la primera llamada". When in doubt, count something.
- **Plain prices on every card.** No "Contact us for pricing." This is core to the anti-fancy-boutique positioning: from $1.800 USD/mo, $5.000–$12.000 USD/mes, etc.
- **Spanish primary, English technical terms left intact.** "Fractional CTO", "Edge AI", "Computer Vision", "Visual AI testing", "Playwright / Cypress / Selenium", "CI/CD". This signals seniority without translating things the engineering audience wouldn't translate either.

### Casing
- **Sentence case** for headlines, subtitles, body copy. Period.
- **UPPER CASE with mono font + wide tracking** for eyebrows, section tags, and card category labels: `BOUTIQUE DE INGENIERÍA · B2B · USA & LATAM`, `RECOMENDADO`, `PUERTA DE ENTRADA`, `HIGH-TICKET`, `ENTERPRISE`. These are the *only* uppercase moments — they punctuate, they don't shout.
- **Title Case** is *not* used anywhere — feels too corporate-American for the Latam-grounded voice.

### Pronouns & address
- **Usted** (formal you) in Spanish — not tú. Choice signals respect + B2B seriousness without being stiff.
- **Nosotros** (we, the team) is used liberally — "Nosotros resolvemos los tres", "Auditamos su proceso", "Le entregamos un diagnóstico". The whole brand is built on the "high-performance family collective" idea, so *we* is the natural subject.
- In English contexts, prefer **"you"** + **"we"**. Avoid "the user", "the client" — too detached.

### Sentence shapes
- **Fragments are fine for impact.** Headlines often run as three pain-points separated by line breaks, each ending in a period. The italic resolution closes the thought.
- **Em-dashes for asides.** "Sin discurso de ventas." "Sin caja negra, sin dependencias ocultas." "Sin compromiso." The *sin* (without) construction is a signature — it sets boundaries the customer is afraid to ask about.
- **Questions for empathy.** Service cards lead with the customer's own anxieties as questions ("¿Sus bugs llegan a producción antes de que pueda detectarlos?") before answering.

### Examples — verbatim from the live site
- > "No somos una agencia de software genérica." *(About headline — opens by negation.)*
- > "QA avanzado con IA, arquitectura sin deuda técnica y equipos de desarrollo llave en mano. Para startups y empresas que no pueden darse el lujo de fallar en producción." *(Hero sub — three-noun cadence, ends on stakes.)*
- > "Respondemos en menos de 24 horas hábiles. Sin ventas agresivas — solo una conversación técnica honesta." *(Form disclaimer — promise + boundary in one.)*
- > "Código limpio, documentado y mantenible — auditable en cualquier momento." *(Why-us bullet — three adjectives + an em-dash + a customer-anxiety-reassurance.)*
- > "Juntos construimos algo diferente." *(Footer motto — only sentimental beat in the whole site.)*

### Emoji & decorative characters
- **No emoji.** Anywhere. Feels off-brand for a senior engineering buyer.
- **Geometric Unicode symbols as icons** — `◈ ⊕ ◎ ⬡ ⬘ → ↑ ↓ ✓ $`. These act as iconography (see ICONOGRAPHY section) and reinforce the "structural lines + connectivity" logo concept.

---

## VISUAL FOUNDATIONS

### Color
Two-hue palette on warm charcoal. Copper and stone do all the work; neutrals are tinted to never read cool.

- **Vibrant Copper `#995E31`** — primary. Buttons, focus rings, primary CTAs, stat numbers, the entire footer. Hover deepens to `#7d4d28`; light accent uses `#b8784e`.
- **Stone Grey `#A3A391`** — secondary. "Recommended" / featured-card chrome, secondary buttons, italicised relief text, decorative pulse dots. Use it whenever you want to soften a copper moment without going neutral.
- **Charcoal-warm `#0d0b09`** — primary background. Has a measurable copper tint; it is *not* `#0a0a0a` or pure black.
- **Off-white `#f4f0ea`** — light surfaces (rare; print decks, light-mode comparisons). Always slightly warm.
- **Ink scale `#ede8e2 → #b8afa3 → #7d6f5e`** — body, soft, mute. All warm; the muted variant doubles as the eyebrow color.
- **Lines `rgba(237,232,226,0.07–0.13)`** — borders + dividers are warm-white at low alpha, never grey.

> **Forbidden:** any shade of blue, teal, purple, indigo, navy. Even cool greys. If neutral grey is required, it must be warm-tinted.

### Type
- **Display: Manrope** — geometric humanist sans, 800–900 weight for headlines, italic for the relief beat. (Substitutes for the brief's "Inter / Lato / Arial-inspired" — keeps geometric, more distinctive.)
- **Body: Inter** — 400/500/600 for paragraphs, labels, nav.
- **Mono: JetBrains Mono** — 400/500 for eyebrows, tags, prices, KBD-style accents.
- Headlines use **tight tracking `-0.03em` to `-0.04em`** and **line-height `1.02–1.08`** — confident, dense.
- Body uses **line-height `1.65–1.75`** — relaxed, readable, never airless.
- Eyebrows use **uppercase + wide `0.20em` tracking + mono**. They look like spec sheets, on purpose.

### Spacing & layout
- **Container max-width `1180px`.** Generous gutters via `clamp(1.25rem, 4vw, 2.5rem)`.
- **Section padding** `clamp(5rem, 10vw, 9rem)` block — the site breathes.
- Grids use **flex/grid + `gap`**, never bare margins. Common: 1-col mobile → 2-col @720px → 3–4 col @1024px.

### Backgrounds
- **Hero:** full-bleed photograph at the bottom of the stack, **dark warm gradient tint over it (`rgba(13,11,9, 0.65→1.0)`)**, plus a **mouse-reactive copper radial gradient** that follows the cursor with `filter: blur(60px)`, plus a faint **SVG fractal-noise texture** at 4.5% opacity and `mix-blend-mode: overlay`. Photos are warm/dim — never bright or cool.
- **Section bgs:** alternate `--bg → --bg-2 → --bg-section` (all within `#0d0b09–#131009`) to create rhythm without jumps.
- **Enterprise section:** background photo desaturated (`filter: grayscale(1)`) at 7% opacity, tinted with the warm charcoal — establishes "weight" without visual noise.
- **No gradients on cards.** Solid `--bg-card`. The one exception: featured cards get a *very* subtle stone-tint radial at the corner.

### Animation & motion
- **Easings**: `--ease-out: cubic-bezier(0.16,1,0.3,1)` (default, decisive), `--ease-soft: cubic-bezier(0.25,0.46,0.45,0.94)` (UI), `--ease-bounce: cubic-bezier(0.34,1.56,0.64,1)` (sparingly).
- **Reveals**: 700ms fade + `translateY(26px) → 0`. Staggered by `90ms × index` on grid children.
- **Hovers**: 250ms. Buttons rise `translateY(-2px)` and gain a colored shadow. Cards rise `translateY(-3px)` + glow + border deepens. A 2px top accent bar scales in from the left (`transform: scaleX(0→1)`) on hover.
- **Pulse dots**: status indicators (live, "we're online") pulse via `box-shadow: 0 0 0 0 → 8px`. 2s loop, infinite.
- **Mouse-reactive hero gradient**: 350ms ease background-shift to follow cursor.
- **Custom cursor**: dot + ring with `transition: transform 0.05–0.1s linear`. Hidden cursor on `body`. Only on `(hover: hover) and (pointer: fine)`.
- **Reduced-motion**: dots/lines stop animating; scroll smoothing turns off; reveal still works (no transform).

### Hover & press states
- **Primary button (copper)**: bg `#995E31 → #7d4d28`, translateY -2px, shadow `0 8px 28px rgba(153,94,49,0.45)`.
- **Secondary (stone)**: bg `#A3A391 → #888876`, same lift + stone shadow.
- **Ghost button**: transparent → border becomes `copper-light`, text becomes `ink` (brighter).
- **Card hover**: border alpha rises, top accent-bar slides in, lift 3px, copper-tinted shadow.
- **Nav link hover**: text brightens to `--ink`, background fades in to `--line` alpha-white.
- **Press**: not explicitly defined in the codebase. For new components, use `transform: translateY(0) scale(0.98)` + remove shadow on `:active`.

### Borders & dividers
- **Card border:** `1px solid var(--line)` at rest; on hover deepens to `rgba(153,94,49,0.4)`.
- **Section dividers:** 1px line at the warm low-alpha colour — never a hard rule.
- **Top accent bars on featured sections:** 3px gradient `var(--copper) → var(--stone) → transparent` left-to-right.
- **Per-card "loading" accent:** 2px solid copper bar at top, animated `scaleX(0→1)` on hover.

### Radii
- Inputs, buttons → **8px** (`--r-md`).
- Default cards → **14–16px** (`--r-xl`/`--r-2xl`). *Note:* slightly above the brief's 12px ceiling because the live codebase uses 14–16px for cards; we documented both and recommend 12px for production-fresh components, 14–16px when matching the live site.
- Pills / tags / badges → **20–30px** or `pill`.
- Per the brief: **never** dramatic 24–32px boutique curves. Keep it optimized-software-looking.

### Shadows
- **Buttons hover:** colored, copper-tinted: `0 8px 28px rgba(153,94,49,0.45)` (or stone variant).
- **Cards hover:** `0 12px 40px rgba(153,94,49,0.15–0.25)` — soft, atmospheric.
- **Focus ring:** `0 0 0 3px rgba(153,94,49,0.15)` + 1.5px border-color shift to copper.
- **Inner shadows:** not used. Surfaces are flat with optional borders.
- All shadows carry copper or stone tint — *never* plain black.

### Transparency & blur
- **Nav on scroll** → `rgba(13,11,9,0.94)` + `backdrop-filter: blur(16px)`. Sticky-top, only after scroll trigger.
- **Hero gradient** → `filter: blur(60px)` so the radial reads as ambient lighting, not a shape.
- **Pulse rings** → `box-shadow` rgba fading. Never opacity on the whole element.
- **Modal overlays / drawers** (if added) → match nav: `rgba(13,11,9,0.94)` + `blur(16px)`.

### Imagery treatment
- **Photography:** warm-leaning, slightly dim, often industrial/architectural. Never bright stock. Never cool/blue-grading.
- **In context:** photos always sit *behind* a dark tint at 0.65–1.0 opacity. Often `filter: grayscale(1)` at 5–10% opacity for atmospheric only.
- The 6 hero/section images in `assets/img/` are CC-licensed Flickr — see `assets/credits.json`.

### Fixed elements
- **Sticky top nav.** Brand mark + 5 links + CTA on the right. Burger only ≤720px.
- **Custom cursor** (dot + ring) fixed-positioned, follows pointer.
- **Skip-link** at `top: -100px` until focus.
- No floating action buttons, no chat bubbles, no toasts in the live site.

### Layout signature
- **Stat row**: 4 numbers on a 1px-line-divided grid, copper alternating with stone, large display numerals, small mono caption underneath.
- **Service cards**: tag (mono UPPERCASE) → icon → title → "Para: <strong>target</strong>" → italic pain quote with left-border → desc → mono feature list with `→` bullets → price block → CTA.
- **Enterprise card**: same DNA, larger padding, value-prop quote in copper-light italic with `border-left: 3px solid copper`, price gets its own bordered card-within-card.

---

## ICONOGRAPHY

Tironech does **not ship an icon font or SVG icon set** in the live codebase. Iconography in production is built from **geometric Unicode characters** rendered in display or mono type:

| Used in live site | Character | Purpose |
|---|---|---|
| QA Consulting card | `◈` | "puerta de entrada" entry service |
| AI Quality Shield (featured) | `⊕` | shield / additive AI layer |
| Web & Apps card | `◎` | platform / target |
| Fractional CTO | `⬡` | architecture / hexagon |
| Edge AI Vision | `⬘` | scan / window |
| Why-us "reduction" bullet | `↓` | down (less bugs) |
| Why-us "speed" bullet | `↑` | up (faster releases) |
| Why-us "value" bullet | `$` | cost |
| Why-us "checked" bullet | `✓` | proof |
| Feature-list bullet | `→` | next-step / outcome |

These are colored `var(--copper-light)` (primary) or `var(--stone-light)` (secondary), sized **0.62rem–2rem** depending on context, and sometimes wrapped in a **circular badge** (`38×38px`, 1px border, tinted background) for the why-us section.

### 🔒 CANONICAL BRAND BLUEPRINT

**The single source of truth is `brand_identity_system.html`** — a complete, interactive brand artifact covering logo variants, responsive formats, typography, palette, and the statement banner. Open it before producing any new artifact to see the locked geometry and rules in context.

The blueprint defines:

- **Symbol mark** — an architectural composition: two outer **trapezoidal wings** (narrower at top, wider at base) flanking a central **inverted-trapezoid cap + vertical pillar** that together form a structural "T". On dark backgrounds the wings are off-white and the T is copper; on light backgrounds the wings are copper and the T is stone.
- **Logotype** — `TIRONECH` in **uppercase**, **Poppins Bold/ExtraBold 700–800**, tight tracking 2–3px. Substitute: Inter ExtraBold 800.
- **Body type** — Lato 400/700 for paragraphs, leads, captions.
- **Palette** (NON-NEGOTIABLE — no blue, ever):
  - `#995E31` — **Vibrant Copper** (primary, active, data nodes, CTAs)
  - `#A3A391` — **Stone Grey** (secondary, structural, scaffolding)
  - `#1A1A1A` — **Rich Charcoal** (dark surfaces, body text)
  - `#F8F8F8` — **Off-White** (light surfaces, mark wings on dark)

### Logo assets in `assets/logo/`

| File | Purpose |
|---|---|
| `mark.svg` | Symbol mark — dark-mode variant (stone wings + copper T). |
| `mark-light.svg` | Symbol mark — light-mode variant (copper wings + stone T). |
| `mark-mono.svg` | Single-tone silhouette for engraving / embossing / debossing. |
| `wordmark-dark.svg` | Full lockup (mark + TIRONECH) for dark backgrounds. |
| `wordmark-light.svg` | Full lockup for light backgrounds. |
| `monogram-tn.svg` | Compact horizontal lockup for tight nav bars. |

When using the logo in any new asset, **load the SVG from `assets/logo/`** rather than redrawing it inline — that keeps every surface in sync with the canonical geometry.

### Brand illustrations / generic imagery
- 6 CC-licensed photographic backgrounds in `assets/img/` — hero, AI section, contact, enterprise, OG, tech. Use these as full-bleed dark-tinted section backdrops *only*. Do not crop them for cards or thumbnails.

### Substitutions flagged
- **No font files were shipped** with the codebase — fonts are loaded from Google Fonts CDN. The `fonts/` folder is empty; `colors_and_type.css` imports Manrope/Inter/JetBrains Mono from Google. If offline/self-hosted fonts are required, **please supply the original `.woff2` files**.
- **No canonical logo** was found in the repo (only the "TN" text monogram). The SVGs in `assets/logo/` are interpretations of the brand brief — **please replace with the official logo when available**.

---

## How to use this system

1. **Production code** — `@import` `colors_and_type.css` once at the root. All tokens are CSS variables; use them directly (`background: var(--copper)`, `font-family: var(--font-display)`).
2. **Throwaway prototypes / mocks** — copy `colors_and_type.css` + the `assets/` you need into a new project, then use the components in `ui_kits/website/` as your starting block. The mockups are intentionally cosmetic (no real auth, no real API) so they're easy to remix.
3. **Decks & slides** — pair Manrope 900 headlines with mono UPPERCASE eyebrows, on a `#0d0b09` background. Stat numbers in copper-light. Photos always dark-tinted.
4. **Read** `SKILL.md` if you've loaded this system as an Agent Skill in Claude Code.
