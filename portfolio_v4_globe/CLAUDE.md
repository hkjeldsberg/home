# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm start        # Serve production build
npm run lint     # Run ESLint
npm test         # Run Playwright smoke tests
```

## Architecture

**Stack:** Next.js 16.2.1 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion 12, cobe, Lucide React

**Structure:**
- `src/app/` — App Router pages (`page.tsx` per route): `/`, `/web`, `/mobile`, `/research`, `/cv`
- `src/app/layout.tsx` — Root layout: Inter + Playfair Display via `next/font`, renders `<Nav>`, wraps pages in `<main className="pt-16">`
- `src/app/template.tsx` — Framer Motion page transition wrapper. Re-mounts on every route change so AnimatePresence works. This is intentional — do not merge into layout.tsx.
- `src/lib/data.ts` — All hardcoded content. Edit here to update projects, papers, and CV entries.
- `src/lib/types.ts` — TypeScript interfaces for all data shapes.

**Key conventions:**
- Pages are Server Components by default; interactive components use `"use client"` at the top
- Globe is dynamically imported via `GlobeWrapper.tsx` (a client component) using `next/dynamic(..., { ssr: false })` — Next.js 16 requires `ssr: false` to be inside a Client Component, not a Server Component
- CSS custom properties: `--bg`, `--surface`, `--border`, `--text`, `--muted`, `--accent (#8b5cf6)`, `--accent-dim`
- Tailwind v4: configured via PostCSS (`@tailwindcss/postcss`). No `@tailwind` directives — use `@import "tailwindcss"`. Extend theme via `@theme {}` in `globals.css`.
- Import alias `@/*` resolves to `src/*`
