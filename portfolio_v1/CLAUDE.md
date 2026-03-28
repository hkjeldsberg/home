# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

All commands run from the `portfolio/` directory.

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm start        # Serve production build
npm run lint     # Run ESLint
```

No test runner is configured.

## Architecture

**Stack:** Next.js 16.2.1 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React

**Structure:**
- `src/app/` — App Router pages (`page.tsx` per route): `/`, `/web-projects`, `/mobile-projects`, `/research`, `/cv`
- `src/app/layout.tsx` — Root layout; imports Inter font via `next/font`, renders `<Nav>` (fixed top), wraps pages in `<main className="pt-16">`
- `src/components/` — Shared client components: `Nav.tsx` (responsive nav with mobile drawer), `FadeIn.tsx` (opacity/y animation), `StaggerContainer.tsx` + `StaggerItem.tsx` (staggered list animations)

**Key conventions:**
- Pages are Server Components by default; interactive components use `"use client"` at the top
- All project/research data is hardcoded as arrays inside page files — no backend or external data source
- CSS custom properties: `--font-inter` (Inter via next/font), `--accent` (#e63946)
- Import alias `@/*` resolves to `src/*`
- Tailwind v4 is configured via PostCSS (`@tailwindcss/postcss`) — no `@tailwind` directives; use `@import "tailwindcss"` syntax