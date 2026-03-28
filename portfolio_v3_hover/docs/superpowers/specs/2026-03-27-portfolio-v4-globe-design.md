# Portfolio v4 Globe — Design Spec

**Date:** 2026-03-27
**Status:** Approved
**Output directory:** `portfolio_v4_globe/` (sibling to existing portfolio directories)

---

## Overview

A dark-mode rebuild of the personal portfolio with a WebGL wireframe globe hero, Framer Motion page transitions, and a 100/100 Lighthouse target. Evolves the editorial aesthetic of v3 (`portfolio_v3_hover`) into a high-performance dark-mode product.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.1 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 (PostCSS), CSS custom properties |
| Animation | Framer Motion (AnimatePresence for routes, motion for elements) |
| Globe | `cobe` — ~5kb WebGL canvas, dynamic import (`ssr: false`) |
| Icons | Lucide React |
| Fonts | `next/font` — Inter (body), Playfair Display (display/headings) |

---

## Architecture

```
src/
  app/
    layout.tsx        — root layout: dark bg, Nav, Inter + Playfair fonts
    template.tsx      — Framer Motion PageTransition wrapper (re-mounts per route)
    page.tsx          — /
    research/page.tsx — /research
    web/page.tsx      — /web
    mobile/page.tsx   — /mobile
    cv/page.tsx       — /cv
    globals.css       — CSS custom properties, @import "tailwindcss"
  components/
    Nav.tsx           — fixed top, backdrop-blur, violet active state, mobile drawer
    Globe.tsx         — "use client", wraps cobe canvas, pointer-follow enabled
    FadeIn.tsx        — opacity/y entrance animation (reused from v3)
    PageTransition.tsx — motion.div: enter y:12→0 opacity:0→1 (0.35s), exit opacity:0 (0.2s)
```

**Critical pattern:** `template.tsx` (not `layout.tsx`) is used for the Framer Motion wrapper. `layout.tsx` persists across navigations so AnimatePresence cannot detect route changes. `template.tsx` creates a fresh instance per navigation, enabling proper exit/enter sequencing.

---

## Theme Tokens

```css
--bg:         #0a0a0a   /* near-black canvas */
--surface:    #111111   /* card / panel backgrounds */
--border:     #1f1f1f   /* subtle dividers */
--text:       #f0f0f0   /* primary text */
--muted:      #666666   /* secondary / metadata */
--accent:     #8b5cf6   /* violet — globe mesh, hovers, active nav */
--accent-dim: #3b1f6e   /* accent at low opacity for glows */
```

---

## Typography Scale

To be refined via UI UX Pro Max plugin. Baseline:

| Role | Font | Size | Weight | Tracking |
|---|---|---|---|---|
| Display | Playfair Display | `clamp(4rem, 10vw, 8rem)` | 700 | -0.02em |
| H2 | Playfair Display | `clamp(2.5rem, 6vw, 3.5rem)` | 700 | tight |
| Body | Inter | 16px / 1.75 lh | 400 | normal |
| Label | Inter | 10px | 600 | 0.2em uppercase |
| Mono/tag | Inter | 9–10px | 500 | 0.15em uppercase |

---

## Globe Component

- Library: `cobe` (WebGL canvas, ~5kb)
- Import: `next/dynamic(() => import('@/components/Globe'), { ssr: false })`
- Render: full-bleed behind hero text, masked with a radial gradient fading to `--bg`
- Mesh colour: `#8b5cf6` (violet accent)
- Behaviour: slow auto-rotation; pointer-move makes globe follow cursor (cobe `onRender` callback)
- On mobile: globe scales down and stacks below the hero text

---

## Pages

### `/` — Home

**Hero (above fold):**
- Desktop: two-column layout. Left: name ("HAK."), tagline label, 2–3 sentence bio, CTA buttons (View Work, Read CV). Right: Globe component filling ~50vw.
- Mobile: text first, globe below at reduced size.

**Below fold:**
- "About Me" — 2–3 sentence blurb.
- "Featured" bento preview — one web project card, one mobile project card, one paper row. Each links to its respective route.

### `/research` — Research

- Minimalist editorial list (no cards, no grid).
- Each entry: numbered index (muted serif) | title (hover → violet) | venue + year (small caps) | tag pills.
- Entries separated by horizontal rules.
- Data: hardcoded array in page file (same content as v3).

### `/web` — Web Projects

- Bento grid: featured project spans 2 cols × 2 rows; remaining projects fill single cells.
- Dark card backgrounds (`--surface`), violet hover accent on title.
- Tag pills: `--border` outline, `--muted` text.
- Data: hardcoded array in page file.
- Reuses the bento grid *pattern* from v3 (not a direct import — component is rewritten in the new repo), adapted to dark theme.

### `/mobile` — Mobile Projects

- Same bento grid structure as `/web`.
- Featured card uses an inverted treatment: `--surface` dark background with violet border.
- Platform label (iOS · Android) shown with a small Smartphone icon.
- Data: hardcoded array in page file.

### `/cv` — CV Timeline

- Vertical timeline: date range on the left, content on the right, thin violet vertical line connecting entries.
- Each entry: role/project title, organisation, date range, 1–2 sentence description.
- Scroll-triggered entrance via Framer Motion `whileInView` (threshold 0.2, once: true).
- Category filter tabs at top: All | Education | Work | Research | Open Source. Tab switching filters the visible entries (client component).
- Data: hardcoded array in page file.

---

## Route Transitions

```
Enter: opacity 0→1, y 12px→0, duration 0.35s, ease "easeOut"
Exit:  opacity 1→0, duration 0.2s, ease "easeIn"
```

Implemented in `PageTransition.tsx`, rendered in `template.tsx`.

---

## Lighthouse 100 Strategy

| Concern | Solution |
|---|---|
| Font layout shift | `next/font` for Inter + Playfair Display |
| Globe blocking SSR | `next/dynamic` with `ssr: false` |
| Image layout shift | `next/image` with explicit `width`/`height` on all images |
| JS bundle size | Only Globe, Nav drawer, CV tabs, PageTransition are client components |
| Unused CSS | Tailwind v4 purges automatically |
| Accessibility | Semantic HTML, `aria-label` on icon-only buttons, skip-to-content link |
| Meta | `<meta name="description">` and `<meta name="viewport">` in root layout |

---

## Content Strategy

All data (projects, papers, CV entries) is hardcoded as typed arrays inside each page file. No backend, no CMS, no external data source. Content is ported from v3 with placeholder values retained — the user fills in real data after implementation.

---

## Route Summary

| Route | Path | Notes |
|---|---|---|
| Home | `/` | |
| Research | `/research` | |
| Web Projects | `/web` | shortened from `/web-projects` |
| Mobile Projects | `/mobile` | shortened from `/mobile-projects` |
| CV | `/cv` | |
