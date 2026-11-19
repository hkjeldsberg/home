# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Tests: `npm test`

## Architecture

Next.js 16 App Router + React Three Fiber/Rapier, single page.

- `app/` – single route (`page.tsx`), metadata + generated OG image (`opengraph-image.tsx`).
- `components/hero/` – R3F canvas: `HeroScene` (lights, camera rig, physics world), `PhysicsModels` (GLB models as Rapier rigid bodies, click-to-focus), `GradientBackground` (GLSL shader), `TextOverlay`.
- `components/*Overlay.tsx` – one overlay per 3D object. Each exports a wrapper that mounts `<XContent>` only while its object is focused, so per-open state resets on unmount.
- `context/NavigationContext.tsx` – which object is focused (`macbookFocused`, `heartFocused`, `iphoneFocused`, `mugFocused`).
- `public/assets/*.glb` – 3D models; `public/screenshots/<project-id>.webp` – project card images.
- Three.js objects are mutated imperatively inside `useFrame`; put such mutations in plain helper functions outside components (React Compiler lint flags mutating hook values).

