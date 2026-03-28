# Ocean Scavenger Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-screen 3D wireframe-ocean portfolio in `portfolio_v7/` where the user clicks floating GLTF objects to trigger a GSAP "diving" camera transition that navigates to a portfolio route.

**Architecture:** A Next.js 14+ App Router page renders a dynamic (SSR-disabled) R3F `<Canvas>` containing an animated shader ocean plane and four buoyant GLTF objects. Shared wave math in `waveUtils.ts` keeps the JS buoyancy logic and the GLSL vertex shader numerically identical. GSAP animates the R3F camera plus a DOM overlay div on click, then calls `router.push()` on completion.

**Tech Stack:** Next.js 16.2.1, React 19, TypeScript 5 (strict), Tailwind CSS v4, `@react-three/fiber` v8, `@react-three/drei` v9, `three` 0.183, `gsap` 3, `lucide-react`, `next-themes`

---

## File Map

| File | Responsibility |
|------|----------------|
| `package.json` | Dependencies including R3F, drei, gsap |
| `src/lib/waveUtils.ts` | Shared wave constants + `getWaveHeight(x, z, t)` |
| `src/components/scene/Ocean.tsx` | Animated ShaderMaterial plane mesh |
| `src/components/scene/FloatingObject.tsx` | Buoyant GLTF wrapper with hover tooltip + dive click |
| `src/components/scene/SceneObjects.tsx` | Defines all 4 interactive scene objects |
| `src/components/OceanCanvas.tsx` | R3F Canvas + `DiveScene` inner component (accesses `useThree`) |
| `src/components/ui/Nav.tsx` | Absolute-positioned nav overlay |
| `src/components/ui/Footer.tsx` | Absolute-positioned footer overlay |
| `src/app/page.tsx` | Root page — composes canvas + overlays, overlay ref |
| `src/app/layout.tsx` | Root layout with ThemeProvider |
| `src/app/globals.css` | Tailwind + CSS variables |
| `src/app/cv/page.tsx` | CV placeholder route |
| `src/app/research/page.tsx` | Research placeholder route |
| `src/app/projects/page.tsx` | Projects placeholder route |
| `src/app/mobile/page.tsx` | Mobile placeholder route |

---

## Task 1: Scaffold `portfolio_v7` project

**Files:**
- Create: `portfolio_v7/package.json`
- Create: `portfolio_v7/tsconfig.json`
- Create: `portfolio_v7/next.config.ts`
- Create: `portfolio_v7/postcss.config.mjs`
- Create: `portfolio_v7/.gitignore`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "portfolio_v7",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@react-three/drei": "^9.122.0",
    "@react-three/fiber": "^8.18.0",
    "gsap": "^3.12.7",
    "lucide-react": "^1.7.0",
    "next": "16.2.1",
    "next-themes": "^0.4.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "three": "^0.183.2"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.2.2",
    "@types/node": "^20.19.37",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@types/three": "^0.183.1",
    "tailwindcss": "^4.2.2",
    "typescript": "^5.9.3"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Write `next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 4: Write `postcss.config.mjs`**

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 5: Write `.gitignore`**

```
.next/
node_modules/
.env
*.tsbuildinfo
```

- [ ] **Step 6: Install dependencies**

Run from `portfolio_v7/`:
```bash
cd /Users/hkjeldsberg/ProjectsSpec/home/portfolio_v7 && pnpm install
```

Expected: `node_modules/` created with `@react-three/fiber`, `@react-three/drei`, `gsap`, `three`, `next` installed.

- [ ] **Step 7: Create directory structure**

```bash
mkdir -p src/app/cv src/app/research src/app/projects src/app/mobile
mkdir -p src/components/scene src/components/ui
mkdir -p src/lib
mkdir -p public
```

- [ ] **Step 8: Commit scaffold**

```bash
git add portfolio_v7/
git commit -m "feat(v7): scaffold Next.js project with R3F, drei, gsap"
```

---

## Task 2: Shared wave utilities

**Files:**
- Create: `src/lib/waveUtils.ts`

- [ ] **Step 1: Write `src/lib/waveUtils.ts`**

This is the single source of truth for wave math. The GLSL shader and the JS buoyancy code must use the same constants.

```typescript
/**
 * Wave parameters shared between the GLSL vertex shader (Ocean.tsx)
 * and the JavaScript buoyancy calculation (FloatingObject.tsx).
 * Changing these values here automatically syncs both.
 */
export const WAVE_FREQ = 0.02;
export const WAVE_AMP = 15.0;

/**
 * Returns the Y elevation of the wave surface at world position (x, z)
 * at a given time. Must match the vertex shader formula exactly.
 *
 * GLSL equivalent:
 *   elevation = sin(position.x * 0.02 + uTime) * cos(position.z * 0.02 + uTime) * 15.0;
 */
export function getWaveHeight(x: number, z: number, time: number): number {
  return (
    Math.sin(x * WAVE_FREQ + time) *
    Math.cos(z * WAVE_FREQ + time) *
    WAVE_AMP
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/waveUtils.ts
git commit -m "feat(v7): add shared wave math utility"
```

---

## Task 3: Ocean wave surface component

**Files:**
- Create: `src/components/scene/Ocean.tsx`

- [ ] **Step 1: Write `src/components/scene/Ocean.tsx`**

Uses `WAVE_FREQ` and `WAVE_AMP` from `waveUtils.ts` as string-interpolated constants in the vertex shader so the values are guaranteed identical to the JS side.

```typescript
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WAVE_FREQ, WAVE_AMP } from '@/lib/waveUtils';

const vertexShader = `
  uniform float uTime;
  varying float vElevation;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation =
      sin(modelPosition.x * ${WAVE_FREQ.toFixed(4)} + uTime) *
      cos(modelPosition.z * ${WAVE_FREQ.toFixed(4)} + uTime) *
      ${WAVE_AMP.toFixed(1)};

    modelPosition.y += elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`;

const fragmentShader = `
  varying float vElevation;

  void main() {
    float alpha = 0.5;
    gl_FragColor = vec4(0.231, 0.510, 0.965, alpha); // #3b82f6
  }
`;

export function Ocean() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state) => {
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[400, 400, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        wireframe
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/scene/Ocean.tsx
git commit -m "feat(v7): add wireframe Ocean shader component"
```

---

## Task 4: FloatingObject component

**Files:**
- Create: `src/components/scene/FloatingObject.tsx`

- [ ] **Step 1: Write `src/components/scene/FloatingObject.tsx`**

The buoyancy Y position uses `getWaveHeight` with the object's current X/Z so it bobs exactly on the wave surface. A `baseY` offset (default 3) raises the object above the surface. Hover scales 1.2x with a Drei `<Html>` tooltip. Click triggers the dive callback.

```typescript
'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { getWaveHeight } from '@/lib/waveUtils';

interface FloatingObjectProps {
  url: string;
  position: [number, number, number];
  scale?: number;
  tooltip: string;
  onDive: (worldPosition: THREE.Vector3) => void;
}

export function FloatingObject({
  url,
  position,
  scale = 1,
  tooltip,
  onDive,
}: FloatingObjectProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const currentScale = useRef(scale);

  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const x = position[0];
    const z = position[2];

    // Buoyancy: match exact wave height at this object's X/Z
    const waveY = getWaveHeight(x, z, time);
    groupRef.current.position.y = waveY + position[1];

    // Gentle rocking rotation
    groupRef.current.rotation.z = Math.sin(time * 0.8 + x) * 0.06;
    groupRef.current.rotation.x = Math.cos(time * 0.6 + z) * 0.04;

    // Smooth scale lerp toward hover target
    const targetScale = hovered ? scale * 1.2 : scale;
    currentScale.current = THREE.MathUtils.lerp(
      currentScale.current,
      targetScale,
      0.12
    );
    groupRef.current.scale.setScalar(currentScale.current);
  });

  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    onDive(groupRef.current.position.clone());
  };

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], position[2]]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={handleClick}
    >
      <primitive object={clonedScene} />

      {hovered && (
        <Html
          center
          distanceFactor={60}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              background: 'rgba(0,0,0,0.75)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontFamily: 'sans-serif',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {tooltip}
          </div>
        </Html>
      )}
    </group>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/scene/FloatingObject.tsx
git commit -m "feat(v7): add FloatingObject with buoyancy, hover tooltip, dive click"
```

---

## Task 5: SceneObjects — define all four interactive items

**Files:**
- Create: `src/components/scene/SceneObjects.tsx`

- [ ] **Step 1: Write `src/components/scene/SceneObjects.tsx`**

Defines positions, routes, tooltips, and model URLs for all four objects. Passes the `onDive` callback through from the parent. Uses `<Suspense>` per object so a single failed model load doesn't break the scene.

```typescript
'use client';

import { Suspense } from 'react';
import * as THREE from 'three';
import { FloatingObject } from './FloatingObject';

const BASE = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models';

const OBJECTS = [
  {
    id: 'bottle',
    url: `${BASE}/bottle/model.gltf`,
    position: [-40, 4, -20] as [number, number, number],
    scale: 8,
    tooltip: 'View Curriculum Vitae',
    route: '/cv',
  },
  {
    id: 'flask',
    url: `${BASE}/flask/model.gltf`,
    position: [40, 4, -30] as [number, number, number],
    scale: 6,
    tooltip: 'CFD & Research Papers',
    route: '/research',
  },
  {
    id: 'macbook',
    url: `${BASE}/macbook/model.gltf`,
    position: [-30, 3, 30] as [number, number, number],
    scale: 6,
    tooltip: 'Web Development',
    route: '/projects',
  },
  {
    id: 'phone',
    url: `${BASE}/phone-iphone/model.gltf`,
    position: [35, 4, 25] as [number, number, number],
    scale: 5,
    tooltip: 'Mobile App Portfolio',
    route: '/mobile',
  },
] as const;

interface SceneObjectsProps {
  onDive: (worldPosition: THREE.Vector3, route: string) => void;
}

export function SceneObjects({ onDive }: SceneObjectsProps) {
  return (
    <>
      {OBJECTS.map((obj) => (
        <Suspense key={obj.id} fallback={null}>
          <FloatingObject
            url={obj.url}
            position={obj.position}
            scale={obj.scale}
            tooltip={obj.tooltip}
            onDive={(pos) => onDive(pos, obj.route)}
          />
        </Suspense>
      ))}
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/scene/SceneObjects.tsx
git commit -m "feat(v7): add SceneObjects with 4 interactive items"
```

---

## Task 6: OceanCanvas with GSAP diving transition

**Files:**
- Create: `src/components/OceanCanvas.tsx`

- [ ] **Step 1: Write `src/components/OceanCanvas.tsx`**

`DiveScene` is a component rendered *inside* `<Canvas>` so it can call `useThree()` to access the live camera. It receives the overlay DOM ref (set before any click happens) and the router. GSAP animates `camera.position` with `expo.in` easing, simultaneously fades the overlay, then calls `router.push()` on complete.

```typescript
'use client';

import { useRef, RefObject } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { Ocean } from './scene/Ocean';
import { SceneObjects } from './scene/SceneObjects';

interface DiveSceneProps {
  overlayRef: RefObject<HTMLDivElement | null>;
}

function DiveScene({ overlayRef }: DiveSceneProps) {
  const { camera } = useThree();
  const router = useRouter();
  const isDiving = useRef(false);

  const handleDive = (worldPosition: THREE.Vector3, route: string) => {
    if (isDiving.current) return;
    isDiving.current = true;

    const tl = gsap.timeline({
      onComplete: () => router.push(route),
    });

    // 1. Pan camera toward the clicked object
    tl.to(camera.position, {
      x: worldPosition.x,
      y: worldPosition.y + 20,
      z: worldPosition.z + 15,
      duration: 0.6,
      ease: 'power2.in',
      onUpdate: () => camera.lookAt(worldPosition),
    });

    // 2. Dive through the object, plunge underwater
    tl.to(camera.position, {
      y: -100,
      duration: 0.9,
      ease: 'expo.in',
    });

    // 3. Simultaneously fade the black overlay
    if (overlayRef.current) {
      tl.to(
        overlayRef.current,
        { opacity: 1, duration: 0.45, ease: 'power1.in' },
        '-=0.45'
      );
    }
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[50, 80, 50]} intensity={1.2} />
      <Ocean />
      <SceneObjects onDive={handleDive} />
    </>
  );
}

interface OceanCanvasProps {
  overlayRef: RefObject<HTMLDivElement | null>;
}

export default function OceanCanvas({ overlayRef }: OceanCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 60, 120], fov: 55, near: 0.1, far: 2000 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <DiveScene overlayRef={overlayRef} />
    </Canvas>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/OceanCanvas.tsx
git commit -m "feat(v7): add OceanCanvas with GSAP diving transition"
```

---

## Task 7: Nav and Footer UI overlays

**Files:**
- Create: `src/components/ui/Nav.tsx`
- Create: `src/components/ui/Footer.tsx`

- [ ] **Step 1: Write `src/components/ui/Nav.tsx`**

```typescript
import { Anchor } from 'lucide-react';

export function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5 pointer-events-none">
      <div className="flex items-center gap-2 text-white/90 font-semibold text-lg tracking-wide">
        <Anchor className="w-5 h-5 text-blue-400" />
        <span>Portfolio</span>
      </div>
      <ul className="flex gap-6 text-sm text-white/60 pointer-events-auto">
        <li>
          <a href="/cv" className="hover:text-white transition-colors">CV</a>
        </li>
        <li>
          <a href="/research" className="hover:text-white transition-colors">Research</a>
        </li>
        <li>
          <a href="/projects" className="hover:text-white transition-colors">Projects</a>
        </li>
        <li>
          <a href="/mobile" className="hover:text-white transition-colors">Mobile</a>
        </li>
      </ul>
    </nav>
  );
}
```

- [ ] **Step 2: Write `src/components/ui/Footer.tsx`**

```typescript
export function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center pb-5 pointer-events-none">
      <p className="text-white/30 text-xs tracking-widest uppercase">
        Click an object to dive in
      </p>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Nav.tsx src/components/ui/Footer.tsx
git commit -m "feat(v7): add Nav and Footer overlay components"
```

---

## Task 8: Global CSS and root layout

**Files:**
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Write `src/app/globals.css`**

```css
@import "tailwindcss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #020b18;
}
```

- [ ] **Step 2: Write `src/app/layout.tsx`**

```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ocean Scavenger — Portfolio',
  description: 'An interactive 3D wireframe ocean portfolio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat(v7): add global CSS and root layout"
```

---

## Task 9: Main page composition

**Files:**
- Create: `src/app/page.tsx`

- [ ] **Step 1: Write `src/app/page.tsx`**

`OceanCanvas` is dynamically imported with `ssr: false` to prevent WebGL errors during server-side rendering. The `overlayRef` is created here and passed both to the overlay `<div>` and into `OceanCanvas` so the GSAP dive can fade it.

```typescript
'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { Nav } from '@/components/ui/Nav';
import { Footer } from '@/components/ui/Footer';

const OceanCanvas = dynamic(() => import('@/components/OceanCanvas'), {
  ssr: false,
});

export default function HomePage() {
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#020b18]">
      {/* Full-screen 3D canvas */}
      <div className="absolute inset-0">
        <OceanCanvas overlayRef={overlayRef} />
      </div>

      {/* Navigation overlay */}
      <Nav />

      {/* Footer hint */}
      <Footer />

      {/* Dive fade overlay — starts transparent, GSAP fades to opaque */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-50 pointer-events-none"
        style={{ opacity: 0 }}
      />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(v7): add main page with canvas, overlays, and dive fade"
```

---

## Task 10: Placeholder route pages

**Files:**
- Create: `src/app/cv/page.tsx`
- Create: `src/app/research/page.tsx`
- Create: `src/app/projects/page.tsx`
- Create: `src/app/mobile/page.tsx`

- [ ] **Step 1: Write `src/app/cv/page.tsx`**

```typescript
import Link from 'next/link';

export default function CVPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#020b18] text-white gap-6">
      <h1 className="text-4xl font-bold tracking-tight">Curriculum Vitae</h1>
      <p className="text-white/50 text-sm">Coming soon.</p>
      <Link href="/" className="text-blue-400 text-sm hover:underline">
        ← Back to ocean
      </Link>
    </main>
  );
}
```

- [ ] **Step 2: Write `src/app/research/page.tsx`**

```typescript
import Link from 'next/link';

export default function ResearchPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#020b18] text-white gap-6">
      <h1 className="text-4xl font-bold tracking-tight">CFD & Research</h1>
      <p className="text-white/50 text-sm">Coming soon.</p>
      <Link href="/" className="text-blue-400 text-sm hover:underline">
        ← Back to ocean
      </Link>
    </main>
  );
}
```

- [ ] **Step 3: Write `src/app/projects/page.tsx`**

```typescript
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#020b18] text-white gap-6">
      <h1 className="text-4xl font-bold tracking-tight">Web Development</h1>
      <p className="text-white/50 text-sm">Coming soon.</p>
      <Link href="/" className="text-blue-400 text-sm hover:underline">
        ← Back to ocean
      </Link>
    </main>
  );
}
```

- [ ] **Step 4: Write `src/app/mobile/page.tsx`**

```typescript
import Link from 'next/link';

export default function MobilePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#020b18] text-white gap-6">
      <h1 className="text-4xl font-bold tracking-tight">Mobile App Portfolio</h1>
      <p className="text-white/50 text-sm">Coming soon.</p>
      <Link href="/" className="text-blue-400 text-sm hover:underline">
        ← Back to ocean
      </Link>
    </main>
  );
}
```

- [ ] **Step 5: Commit all route pages**

```bash
git add src/app/cv/page.tsx src/app/research/page.tsx src/app/projects/page.tsx src/app/mobile/page.tsx
git commit -m "feat(v7): add placeholder route pages"
```

---

## Task 11: Verify dev server

- [ ] **Step 1: Run dev server**

```bash
cd /Users/hkjeldsberg/ProjectsSpec/home/portfolio_v7 && pnpm dev
```

Expected: `✓ Ready in Xms` with no TypeScript errors. Open `http://localhost:3000`.

- [ ] **Step 2: Verify scene**

- Ocean plane visible as animated blue wireframe
- Four GLTF objects loading and bobbing on waves
- Hovering an object shows tooltip and scales it up
- Clicking an object triggers camera zoom, fade overlay, navigation

- [ ] **Step 3: Fix any TypeScript errors**

Run:
```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat(v7): complete Ocean Scavenger portfolio"
```
