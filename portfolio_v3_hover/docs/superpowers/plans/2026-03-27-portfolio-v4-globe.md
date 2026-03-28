# Portfolio v4 Globe — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `portfolio_v4_globe` — a dark-mode Next.js 16 portfolio with a cobe wireframe globe hero, Framer Motion page transitions, and 100/100 Lighthouse score across 5 routes (`/`, `/research`, `/web`, `/mobile`, `/cv`).

**Architecture:** Fresh Next.js 16 App Router project. Route transitions use `src/app/template.tsx` (not `layout.tsx`) so Framer Motion AnimatePresence sees a new component instance on every navigation. The globe is `next/dynamic`-imported with `ssr: false` so it never blocks server rendering. All content is hardcoded typed arrays in `src/lib/data.ts`.

**Tech Stack:** Next.js 16.2.1, React 19, TypeScript, Tailwind CSS v4 (PostCSS), Framer Motion 12, `cobe`, Lucide React, Playwright (smoke tests)

---

## File Map

| File | Purpose |
|---|---|
| `src/app/globals.css` | `@import "tailwindcss"`, `@theme` font vars, CSS custom properties for dark tokens |
| `src/app/layout.tsx` | Root layout: Inter + Playfair Display via `next/font`, `<Nav>`, meta, dark `<html>` |
| `src/app/template.tsx` | Renders `<PageTransition>` — re-mounts on every route change |
| `src/app/page.tsx` | Home: two-column hero (text + globe), About, Featured bento |
| `src/app/research/page.tsx` | Numbered editorial list of papers |
| `src/app/web/page.tsx` | Bento grid of web projects |
| `src/app/mobile/page.tsx` | Bento grid of mobile projects |
| `src/app/cv/page.tsx` | Server shell that renders `<CVTimeline>` |
| `src/components/Nav.tsx` | Fixed dark nav, `usePathname` active state, mobile slide drawer |
| `src/components/Globe.tsx` | `"use client"`, cobe canvas, auto-rotate + drag-to-rotate |
| `src/components/FadeIn.tsx` | `motion.div` opacity + y entrance |
| `src/components/PageTransition.tsx` | `motion.div` enter/exit variants |
| `src/components/CVTimeline.tsx` | `"use client"`, category filter tabs + scroll-triggered timeline |
| `src/lib/types.ts` | `WebProject`, `MobileProject`, `Paper`, `CVEntry` interfaces |
| `src/lib/data.ts` | All content arrays |
| `playwright.config.ts` | Playwright config — auto-starts dev server |
| `tests/smoke.spec.ts` | Smoke tests for all 5 routes |

---

## Task 1: Scaffold the project

**Files:**
- Create: `portfolio_v4_globe/` (project root, sibling to `portfolio_v3_hover`)

- [ ] **Step 1: Create the directory and copy v3's config files**

```bash
cd /Users/hak/Projects/Home
mkdir portfolio_v4_globe
cp portfolio_v3_hover/tsconfig.json portfolio_v4_globe/
cp portfolio_v3_hover/next.config.ts portfolio_v4_globe/
cp portfolio_v3_hover/postcss.config.mjs portfolio_v4_globe/
```

- [ ] **Step 2: Create `package.json`**

Create `portfolio_v4_globe/package.json`:

```json
{
  "name": "portfolio-v4-globe",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "playwright test"
  },
  "dependencies": {
    "cobe": "^0.6.3",
    "framer-motion": "^12.38.0",
    "lucide-react": "^1.7.0",
    "next": "16.2.1",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@playwright/test": "^1.50.0",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.1",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

- [ ] **Step 3: Create `.gitignore`**

Create `portfolio_v4_globe/.gitignore`:

```
node_modules/
.next/
out/
.env*
/test-results/
/playwright-report/
/playwright/.cache/
```

- [ ] **Step 4: Create `AGENTS.md`**

Create `portfolio_v4_globe/AGENTS.md`:

```markdown
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
```

- [ ] **Step 5: Install dependencies**

```bash
cd /Users/hak/Projects/Home/portfolio_v4_globe
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 6: Install Playwright browsers**

```bash
npx playwright install chromium
```

Expected: Chromium browser downloaded.

- [ ] **Step 7: Create `playwright.config.ts`**

Create `portfolio_v4_globe/playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 60000,
  },
})
```

- [ ] **Step 8: Create the src directory structure**

```bash
mkdir -p portfolio_v4_globe/src/app/research
mkdir -p portfolio_v4_globe/src/app/web
mkdir -p portfolio_v4_globe/src/app/mobile
mkdir -p portfolio_v4_globe/src/app/cv
mkdir -p portfolio_v4_globe/src/components
mkdir -p portfolio_v4_globe/src/lib
mkdir -p portfolio_v4_globe/public
mkdir -p portfolio_v4_globe/tests
```

- [ ] **Step 9: Create a stub home page so Next.js can start**

Create `portfolio_v4_globe/src/app/page.tsx`:

```tsx
export default function HomePage() {
  return <main><h1>Portfolio v4</h1></main>
}
```

- [ ] **Step 10: Create a stub layout**

Create `portfolio_v4_globe/src/app/layout.tsx`:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 11: Create stub globals.css**

Create `portfolio_v4_globe/src/app/globals.css`:

```css
@import "tailwindcss";
```

- [ ] **Step 12: Verify the dev server starts**

```bash
cd /Users/hak/Projects/Home/portfolio_v4_globe
npm run dev
```

Expected: `▲ Next.js 16.x.x` ready at `http://localhost:3000`. Stop with Ctrl+C.

- [ ] **Step 13: Commit**

```bash
cd /Users/hak/Projects/Home/portfolio_v4_globe
git init
git add package.json tsconfig.json next.config.ts postcss.config.mjs playwright.config.ts .gitignore AGENTS.md src/
git commit -m "chore: scaffold portfolio-v4-globe"
```

---

## Task 2: CSS tokens and Tailwind v4 theme

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write the full globals.css**

Replace `portfolio_v4_globe/src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-playfair), ui-serif, Georgia, serif;
}

:root {
  --bg: #0a0a0a;
  --surface: #111111;
  --border: #1f1f1f;
  --text: #f0f0f0;
  --muted: #666666;
  --accent: #8b5cf6;
  --accent-dim: #3b1f6e;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  background-color: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: var(--bg);
  color: var(--text);
}

/* Bento card hover lift */
.bento-card {
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.bento-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add dark mode CSS tokens and Tailwind v4 theme"
```

---

## Task 3: TypeScript types and data

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/data.ts`

- [ ] **Step 1: Create `src/lib/types.ts`**

```typescript
export interface WebProject {
  name: string
  description: string
  tags: string[]
  github: string
  live: string
  featured: boolean
}

export interface MobileProject {
  name: string
  description: string
  platform: string
  tags: string[]
  featured: boolean
}

export interface Paper {
  index: string
  title: string
  venue: string
  year: string
  tags: string[]
  link: string
}

export interface CVEntry {
  title: string
  organisation: string
  dateRange: string
  description: string
  category: 'Education' | 'Work' | 'Research' | 'Open Source'
}
```

- [ ] **Step 2: Create `src/lib/data.ts`**

```typescript
import type { WebProject, MobileProject, Paper, CVEntry } from './types'

export const webProjects: WebProject[] = [
  {
    name: 'Hablar',
    description: 'Real-time language-exchange platform connecting native speakers for conversational practice.',
    tags: ['Next.js', 'WebSockets', 'PostgreSQL'],
    github: '#',
    live: '#',
    featured: true,
  },
  {
    name: 'Middah',
    description: 'Character-development and habit-tracking web app rooted in ethical frameworks.',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: '#',
    live: '#',
    featured: false,
  },
  {
    name: 'Apache Tear',
    description: 'Minimalist journaling platform with end-to-end encryption and offline support.',
    tags: ['SvelteKit', 'IndexedDB'],
    github: '#',
    live: '#',
    featured: false,
  },
  {
    name: 'Barnshli',
    description: 'Collaborative storytelling tool for writers and game designers.',
    tags: ['Vue.js', 'GraphQL'],
    github: '#',
    live: '#',
    featured: false,
  },
]

export const mobileProjects: MobileProject[] = [
  {
    name: 'Smittestopp',
    description: 'Bluetooth-based contact tracing app developed for public health crisis response.',
    platform: 'iOS · Android',
    tags: ['React Native', 'Bluetooth LE', 'Privacy'],
    featured: true,
  },
  {
    name: 'Pomp',
    description: 'Smart pump-session tracker with insightful analytics and gentle reminders.',
    platform: 'iOS · Android',
    tags: ['Flutter', 'BLE', 'Firebase'],
    featured: false,
  },
  {
    name: 'Zleep',
    description: 'Sleep-quality monitor using device sensors and guided evening routines.',
    platform: 'iOS · Android',
    tags: ['Swift / Kotlin', 'HealthKit', 'ML'],
    featured: false,
  },
]

export const papers: Paper[] = [
  {
    index: '01',
    title: 'Human-Computer Interaction Study — Placeholder Title',
    venue: 'Conference / Journal Name',
    year: '2024',
    tags: ['HCI', 'User Study', 'Qualitative'],
    link: '#',
  },
  {
    index: '02',
    title: 'Mobile Health Application Evaluation — Placeholder Title',
    venue: 'Conference / Journal Name',
    year: '2023',
    tags: ['mHealth', 'Evaluation', 'Mixed Methods'],
    link: '#',
  },
  {
    index: '03',
    title: 'Data Privacy in Consumer Applications — Placeholder Title',
    venue: 'Workshop / Symposium',
    year: '2023',
    tags: ['Privacy', 'Security', 'Ethics'],
    link: '#',
  },
]

export const cvEntries: CVEntry[] = [
  {
    title: 'Senior Software Engineer',
    organisation: 'Company Name',
    dateRange: '2023 – Present',
    description: 'Building high-performance web and mobile applications at scale. Leading frontend architecture decisions and mentoring junior engineers.',
    category: 'Work',
  },
  {
    title: 'MSc Human-Computer Interaction',
    organisation: 'University Name',
    dateRange: '2021 – 2023',
    description: 'Research focus on privacy-preserving mobile health systems. Thesis on user trust in Bluetooth contact tracing applications.',
    category: 'Education',
  },
  {
    title: 'Contact Tracing Mobile App — Smittestopp',
    organisation: 'Public Health Institute',
    dateRange: '2020 – 2021',
    description: 'Led mobile development for a national-scale contact tracing app used by 1.5M+ users during the pandemic.',
    category: 'Work',
  },
  {
    title: 'Research Assistant',
    organisation: 'HCI Lab, University Name',
    dateRange: '2020 – 2021',
    description: 'Conducted user studies on privacy perceptions in mobile health apps. Co-authored two peer-reviewed papers.',
    category: 'Research',
  },
  {
    title: 'BSc Computer Science',
    organisation: 'University Name',
    dateRange: '2018 – 2021',
    description: 'First class honours. Specialised in distributed systems and human-computer interaction.',
    category: 'Education',
  },
  {
    title: 'Open Source Contributor',
    organisation: 'Various Projects',
    dateRange: '2019 – Present',
    description: 'Contributor to privacy-focused open source tools and developer utilities. Maintainer of Barnshli storytelling library.',
    category: 'Open Source',
  },
]
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/
git commit -m "feat: add TypeScript types and content data"
```

---

## Task 4: Root layout with fonts and meta

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write the full root layout**

Replace `portfolio_v4_globe/src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HAK — Software Engineer & Researcher',
  description:
    'Personal portfolio of HAK — software engineer, researcher, and builder of high-performance web and mobile applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[var(--bg)] text-[var(--text)] font-sans">
        <Nav />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Add skip-to-content link for accessibility (Lighthouse requirement)**

In `src/app/layout.tsx`, add this as the first child of `<body>`:

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--accent)] focus:text-white focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest"
>
  Skip to content
</a>
```

Also update `<main>` to have `id="main-content"`:

```tsx
<main id="main-content" className="pt-16">{children}</main>
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: root layout with Inter + Playfair Display fonts, meta, and skip-to-content"
```

---

## Task 5: PageTransition component and template.tsx

**Files:**
- Create: `src/components/PageTransition.tsx`
- Create: `src/app/template.tsx`

- [ ] **Step 1: Create `src/components/PageTransition.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create `src/app/template.tsx`**

```tsx
import PageTransition from '@/components/PageTransition'

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/PageTransition.tsx src/app/template.tsx
git commit -m "feat: page transition via template.tsx + Framer Motion"
```

---

## Task 6: Nav component

**Files:**
- Create: `src/components/Nav.tsx`

- [ ] **Step 1: Create `src/components/Nav.tsx`**

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/web', label: 'Web' },
  { href: '/mobile', label: 'Mobile' },
  { href: '/cv', label: 'CV' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)]"
      style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-200"
        >
          HAK.
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-[11px] font-semibold uppercase tracking-widest transition-colors duration-200 ${
                pathname === href
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[var(--text)] hover:text-[var(--accent)] transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[var(--bg)] border-t border-[var(--border)] px-6 py-5 flex flex-col gap-5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-sm font-semibold uppercase tracking-widest ${
                pathname === href ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: Nav with dark theme, active state, and mobile drawer"
```

---

## Task 7: FadeIn component

**Files:**
- Create: `src/components/FadeIn.tsx`

- [ ] **Step 1: Create `src/components/FadeIn.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'

export default function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FadeIn.tsx
git commit -m "feat: FadeIn entrance animation component"
```

---

## Task 8: Globe component

**Files:**
- Create: `src/components/Globe.tsx`

- [ ] **Step 1: Create `src/components/Globe.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerMovement = useRef(0)
  const rRef = useRef(0)

  useEffect(() => {
    let phi = 0
    let width = 0

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }
    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuseCoefficient: 0.4,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.54, 0.36, 0.96],
      markerColor: [0.54, 0.36, 0.96],
      glowColor: [0.23, 0.12, 0.43],
      markers: [],
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.003
        state.phi = phi + rRef.current
        state.width = width * 2
        state.height = width * 2
      },
    })

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="relative w-full aspect-square max-w-[560px]">
      {/* Radial gradient mask so globe fades into background */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(circle at center, transparent 55%, var(--bg) 85%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: 'grab' }}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerMovement.current
          ;(e.target as HTMLElement).style.cursor = 'grabbing'
        }}
        onPointerUp={(e) => {
          pointerInteracting.current = null
          ;(e.target as HTMLElement).style.cursor = 'grab'
        }}
        onPointerOut={(e) => {
          pointerInteracting.current = null
          ;(e.target as HTMLElement).style.cursor = 'grab'
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current
            pointerMovement.current = delta
            rRef.current = delta / 200
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta =
              e.touches[0].clientX - pointerInteracting.current
            pointerMovement.current = delta
            rRef.current = delta / 100
          }
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Globe.tsx
git commit -m "feat: cobe wireframe globe with auto-rotate and drag interaction"
```

---

## Task 9: Home page

**Files:**
- Modify: `src/app/page.tsx`
- Create: `tests/smoke.spec.ts` (partial — home route)

- [ ] **Step 1: Write the failing Playwright test for /**

Create `portfolio_v4_globe/tests/smoke.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test('home page loads with title and globe section', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('HAK.')
  await expect(page.locator('canvas')).toBeVisible()
  await expect(page.locator('text=About Me')).toBeVisible()
  await expect(page.locator('text=Featured')).toBeVisible()
})

test('research page loads with paper list', async ({ page }) => {
  await page.goto('/research')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('article')).toHaveCount(3)
})

test('web projects page loads with project cards', async ({ page }) => {
  await page.goto('/web')
  await expect(page.locator('h1')).toContainText('Web')
  await expect(page.locator('[data-testid="project-card"]').first()).toBeVisible()
})

test('mobile projects page loads with project cards', async ({ page }) => {
  await page.goto('/mobile')
  await expect(page.locator('h1')).toContainText('Mobile')
  await expect(page.locator('[data-testid="project-card"]').first()).toBeVisible()
})

test('cv page loads with timeline entries', async ({ page }) => {
  await page.goto('/cv')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('[data-testid="cv-entry"]').first()).toBeVisible()
})

test('nav links navigate correctly', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Research')
  await expect(page).toHaveURL('/research')
  await page.click('text=Web')
  await expect(page).toHaveURL('/web')
  await page.click('text=Mobile')
  await expect(page).toHaveURL('/mobile')
  await page.click('text=CV')
  await expect(page).toHaveURL('/cv')
})
```

- [ ] **Step 2: Run the home test to confirm it fails**

```bash
cd /Users/hak/Projects/Home/portfolio_v4_globe
npx playwright test --grep "home page" --reporter=list
```

Expected: FAIL — `h1` content doesn't match `HAK.` yet (stub page has `Portfolio v4`).

- [ ] **Step 3: Implement `src/app/page.tsx`**

```tsx
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import { webProjects, mobileProjects, papers } from '@/lib/data'

const Globe = dynamic(() => import('@/components/Globe'), { ssr: false })

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
      {children}
    </p>
  )
}

export default function HomePage() {
  const featuredWeb = webProjects.find((p) => p.featured)!
  const featuredMobile = mobileProjects.find((p) => p.featured)!
  const featuredPaper = papers[0]

  return (
    <>
      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-36 border-b border-[var(--border)]">
        <div className="flex flex-col md:flex-row md:items-center gap-16">
          {/* Left: text */}
          <div className="flex-1">
            <FadeIn>
              <SectionLabel>Software Engineer · Researcher · Builder</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="font-serif text-[clamp(4rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.02em] mb-8 text-[var(--text)]">
                HAK.
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="text-base md:text-lg text-[var(--muted)] max-w-md leading-[1.75] mb-10">
                I build high-performance web and mobile applications, conduct
                research at the intersection of technology and human behaviour,
                and ship products people actually use.
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/web"
                  className="inline-flex items-center gap-2 bg-[var(--accent)] text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-[#7c3aed] transition-colors duration-200"
                >
                  View Work <ArrowRight size={14} />
                </Link>
                <Link
                  href="/cv"
                  className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--text)] px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
                >
                  Read CV
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right: globe */}
          <div className="flex-1 flex justify-center items-center">
            <Suspense fallback={<div className="w-[560px] h-[560px]" />}>
              <Globe />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-b border-[var(--border)]">
        <FadeIn>
          <SectionLabel>About Me</SectionLabel>
          <p className="text-[var(--text)] text-lg max-w-2xl leading-relaxed">
            Based in [City]. I work across the full stack — from mobile sensors
            to web infrastructure — with a focus on privacy, performance, and
            human-centred design. Open to collaboration.
          </p>
        </FadeIn>
      </section>

      {/* ── FEATURED ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <FadeIn>
          <SectionLabel>Featured</SectionLabel>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FadeIn delay={0.05}>
            <Link
              href="/web"
              className="bento-card block bg-[var(--surface)] border border-[var(--border)] p-6 group h-full"
            >
              <p className="text-[9px] text-[var(--muted)] uppercase tracking-widest mb-3">
                Web Project
              </p>
              <h3 className="font-serif text-xl font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                {featuredWeb.name}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                {featuredWeb.description}
              </p>
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/mobile"
              className="bento-card block bg-[var(--surface)] border border-[var(--border)] p-6 group h-full"
            >
              <p className="text-[9px] text-[var(--muted)] uppercase tracking-widest mb-3">
                Mobile App
              </p>
              <h3 className="font-serif text-xl font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                {featuredMobile.name}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                {featuredMobile.description}
              </p>
            </Link>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Link
              href="/research"
              className="bento-card block bg-[var(--surface)] border border-[var(--border)] p-6 group h-full"
            >
              <p className="text-[9px] text-[var(--muted)] uppercase tracking-widest mb-3">
                Research
              </p>
              <h3 className="font-serif text-xl font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                {featuredPaper.title}
              </h3>
              <p className="text-[var(--muted)] text-sm">
                {featuredPaper.venue} · {featuredPaper.year}
              </p>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Run the home test**

```bash
npx playwright test --grep "home page" --reporter=list
```

Expected: PASS — `HAK.` visible, canvas present, About Me and Featured sections found.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx tests/smoke.spec.ts
git commit -m "feat: home page with globe hero, about, and featured preview"
```

---

## Task 10: Research page

**Files:**
- Create: `src/app/research/page.tsx`

- [ ] **Step 1: Run the research test to confirm it fails**

```bash
npx playwright test --grep "research page" --reporter=list
```

Expected: FAIL — no `article` elements (page is 404).

- [ ] **Step 2: Implement `src/app/research/page.tsx`**

```tsx
import { ExternalLink } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import { papers } from '@/lib/data'

export default function ResearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      <FadeIn>
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
          Academic Work
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-none tracking-tight text-[var(--text)] mb-16">
          Published Research
        </h1>
      </FadeIn>

      <div className="flex flex-col">
        {papers.map((paper, i) => (
          <FadeIn key={paper.index} delay={i * 0.08}>
            <article className="border-t border-[var(--border)] py-8 grid grid-cols-[2rem_1fr_auto] gap-x-6 md:gap-x-10 items-start group">
              {/* Index */}
              <span className="font-serif text-xs text-[var(--muted)] font-medium pt-1 select-none">
                {paper.index}
              </span>

              {/* Body */}
              <div>
                <h2 className="font-serif text-lg md:text-xl font-semibold leading-snug mb-1.5 text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                  {paper.link !== '#' ? (
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {paper.title}
                    </a>
                  ) : (
                    paper.title
                  )}
                </h2>
                <p className="text-[11px] text-[var(--muted)] uppercase tracking-widest mb-3 font-medium">
                  {paper.venue}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] border border-[var(--border)] text-[var(--muted)] px-2.5 py-0.5 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Year + icon */}
              <div className="flex flex-col items-end gap-3 pt-0.5">
                <span className="font-serif text-sm text-[var(--muted)] tabular-nums">
                  {paper.year}
                </span>
                {paper.link !== '#' && (
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open paper: ${paper.title}`}
                    className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </article>
          </FadeIn>
        ))}
        <div className="border-t border-[var(--border)]" />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Run the research test**

```bash
npx playwright test --grep "research page" --reporter=list
```

Expected: PASS — page loads, 3 `article` elements visible.

- [ ] **Step 4: Commit**

```bash
git add src/app/research/page.tsx
git commit -m "feat: research page with editorial numbered paper list"
```

---

## Task 11: Web projects page

**Files:**
- Create: `src/app/web/page.tsx`

- [ ] **Step 1: Run the web projects test to confirm it fails**

```bash
npx playwright test --grep "web projects" --reporter=list
```

Expected: FAIL — 404.

- [ ] **Step 2: Implement `src/app/web/page.tsx`**

```tsx
import Link from 'next/link'
import { ExternalLink, GitBranch } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import { webProjects } from '@/lib/data'

export default function WebProjectsPage() {
  const featured = webProjects.find((p) => p.featured)!
  const rest = webProjects.filter((p) => !p.featured)

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <FadeIn>
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
          Selected Work
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-none tracking-tight text-[var(--text)] mb-12">
          Web Projects
        </h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-4">
          {/* Featured — spans 2 cols × 2 rows */}
          <div
            data-testid="project-card"
            className="bento-card md:col-span-2 md:row-span-2 bg-[var(--surface)] border border-[var(--border)] p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent)]">
                Featured
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3 mb-4 leading-tight text-[var(--text)]">
                {featured.name}
              </h2>
              <p className="text-[var(--muted)] text-sm leading-relaxed max-w-sm">
                {featured.description}
              </p>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex flex-wrap gap-1.5">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-[var(--accent)] text-white px-2.5 py-1 uppercase tracking-wider font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 ml-4">
                {featured.github !== '#' && (
                  <a
                    href={featured.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    <GitBranch size={16} />
                  </a>
                )}
                {featured.live !== '#' && (
                  <a
                    href={featured.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live site"
                    className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Remaining cards */}
          {rest.map((project) => (
            <div
              key={project.name}
              data-testid="project-card"
              className="bento-card bg-[var(--surface)] border border-[var(--border)] p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="font-serif text-xl font-bold mb-2 text-[var(--text)]">
                  {project.name}
                </h2>
                <p className="text-[var(--muted)] text-xs leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] border border-[var(--border)] text-[var(--muted)] px-2 py-0.5 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  )
}
```

- [ ] **Step 3: Run the web projects test**

```bash
npx playwright test --grep "web projects" --reporter=list
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/web/page.tsx
git commit -m "feat: web projects page with dark bento grid"
```

---

## Task 12: Mobile projects page

**Files:**
- Create: `src/app/mobile/page.tsx`

- [ ] **Step 1: Run the mobile projects test to confirm it fails**

```bash
npx playwright test --grep "mobile projects" --reporter=list
```

Expected: FAIL — 404.

- [ ] **Step 2: Implement `src/app/mobile/page.tsx`**

```tsx
import { Smartphone } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import { mobileProjects } from '@/lib/data'

export default function MobileProjectsPage() {
  const featured = mobileProjects.find((p) => p.featured)!
  const rest = mobileProjects.filter((p) => !p.featured)

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <FadeIn>
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
          Native &amp; Cross-Platform
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-none tracking-tight text-[var(--text)] mb-12">
          Mobile Projects
        </h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(160px,auto)] gap-4">
          {/* Featured tall card */}
          <div
            data-testid="project-card"
            className="bento-card md:row-span-2 bg-[var(--surface)] border border-[var(--accent)] p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Smartphone size={14} className="text-[var(--accent)]" />
                <span className="text-[10px] text-[var(--accent)] uppercase tracking-widest">
                  {featured.platform}
                </span>
              </div>
              <h2 className="font-serif text-3xl font-bold mb-3 leading-tight text-[var(--text)]">
                {featured.name}
              </h2>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                {featured.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-6">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] border border-[var(--border)] text-[var(--muted)] px-2.5 py-1 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Remaining cards */}
          {rest.map((project) => (
            <div
              key={project.name}
              data-testid="project-card"
              className="bento-card bg-[var(--surface)] border border-[var(--border)] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Smartphone size={12} className="text-[var(--muted)]" />
                  <span className="text-[9px] text-[var(--muted)] uppercase tracking-widest">
                    {project.platform}
                  </span>
                </div>
                <h2 className="font-serif text-xl font-bold mb-2 text-[var(--text)]">
                  {project.name}
                </h2>
                <p className="text-[var(--muted)] text-xs leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] border border-[var(--border)] text-[var(--muted)] px-2 py-0.5 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  )
}
```

- [ ] **Step 3: Run the mobile projects test**

```bash
npx playwright test --grep "mobile projects" --reporter=list
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/mobile/page.tsx
git commit -m "feat: mobile projects page with accent-bordered featured card"
```

---

## Task 13: CV page with filter tabs and timeline

**Files:**
- Create: `src/components/CVTimeline.tsx`
- Create: `src/app/cv/page.tsx`

- [ ] **Step 1: Run the CV test to confirm it fails**

```bash
npx playwright test --grep "cv page" --reporter=list
```

Expected: FAIL — 404.

- [ ] **Step 2: Create `src/components/CVTimeline.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { CVEntry } from '@/lib/types'

type Category = 'All' | CVEntry['category']

const CATEGORIES: Category[] = [
  'All',
  'Work',
  'Education',
  'Research',
  'Open Source',
]

export default function CVTimeline({ entries }: { entries: CVEntry[] }) {
  const [active, setActive] = useState<Category>('All')

  const filtered =
    active === 'All' ? entries : entries.filter((e) => e.category === active)

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-14">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-[10px] font-semibold uppercase tracking-widest px-4 py-2 border transition-colors duration-200 ${
              active === cat
                ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-dim)]'
                : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical violet line */}
        <div className="absolute left-[7.5rem] top-0 bottom-0 w-px bg-[var(--border)] hidden md:block" />

        <div className="flex flex-col gap-0">
          {filtered.map((entry, i) => (
            <motion.div
              key={`${entry.title}-${entry.organisation}`}
              data-testid="cv-entry"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
              className="relative grid md:grid-cols-[7.5rem_1fr] gap-4 md:gap-10 py-8 border-b border-[var(--border)]"
            >
              {/* Date range */}
              <div className="md:text-right pt-0.5">
                <span className="text-[11px] text-[var(--muted)] font-medium tabular-nums leading-relaxed">
                  {entry.dateRange}
                </span>
              </div>

              {/* Content — offset right of the line on desktop */}
              <div className="md:pl-8 relative">
                {/* Dot on the line */}
                <div className="absolute -left-[2.15rem] top-1.5 w-2 h-2 rounded-full bg-[var(--accent)] hidden md:block" />

                <span className="text-[9px] font-semibold uppercase tracking-widest text-[var(--accent)] mb-1 block">
                  {entry.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-[var(--text)] mb-0.5">
                  {entry.title}
                </h3>
                <p className="text-[11px] text-[var(--muted)] uppercase tracking-widest mb-3 font-medium">
                  {entry.organisation}
                </p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {entry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 3: Create `src/app/cv/page.tsx`**

```tsx
import FadeIn from '@/components/FadeIn'
import CVTimeline from '@/components/CVTimeline'
import { cvEntries } from '@/lib/data'

export default function CVPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      <FadeIn>
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
          Background
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-none tracking-tight text-[var(--text)] mb-16">
          Curriculum Vitae
        </h1>
      </FadeIn>

      <CVTimeline entries={cvEntries} />
    </div>
  )
}
```

- [ ] **Step 4: Run the CV test**

```bash
npx playwright test --grep "cv page" --reporter=list
```

Expected: PASS — page loads, `[data-testid="cv-entry"]` elements visible.

- [ ] **Step 5: Commit**

```bash
git add src/components/CVTimeline.tsx src/app/cv/page.tsx
git commit -m "feat: CV page with filterable timeline and scroll-triggered entries"
```

---

## Task 14: Run full test suite and production build

**Files:** none (verification only)

- [ ] **Step 1: Run all Playwright smoke tests**

```bash
cd /Users/hak/Projects/Home/portfolio_v4_globe
npx playwright test --reporter=list
```

Expected: All 6 tests pass (home, research, web, mobile, cv, nav links).

- [ ] **Step 2: Run the production build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. Zero TypeScript errors. Zero ESLint errors.

- [ ] **Step 3: Confirm no client-side JavaScript for non-interactive pages**

After `npm run build`, check the output for Server/Client split:

```bash
cat .next/build-manifest.json | grep -E "(research|/web|/mobile)" | head -20
```

Expected: Research, Web, and Mobile pages listed — they're Server Components with no unnecessary client JS.

- [ ] **Step 4: Create `CLAUDE.md` for the new project**

Create `portfolio_v4_globe/CLAUDE.md`:

```markdown
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
- Globe is imported via `next/dynamic(..., { ssr: false })` — never make it a static import
- CSS custom properties: `--bg`, `--surface`, `--border`, `--text`, `--muted`, `--accent (#8b5cf6)`, `--accent-dim`
- Tailwind v4: configured via PostCSS (`@tailwindcss/postcss`). No `@tailwind` directives — use `@import "tailwindcss"`. Extend theme via `@theme {}` in `globals.css`.
- Import alias `@/*` resolves to `src/*`
```

- [ ] **Step 5: Final commit**

```bash
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md with architecture and conventions"
```

---

## Task 15: UI UX Pro Max typography refinement

**Note:** This task requires the `ui-ux-pro-max` skill. Invoke it before starting this task.

**Files:**
- Modify: `src/app/globals.css` (typography scale and spacing constants)
- Modify: `src/app/layout.tsx` (if font weights need adjustment)

- [ ] **Step 1: Invoke the ui-ux-pro-max skill**

Run in your session: invoke `ui-ux-pro-max` to load design guidance.

- [ ] **Step 2: Apply refined typography scale to `globals.css`**

After the skill runs, replace the `@theme` block in `globals.css` with its recommendations for type scale, spacing, and font pairing. The baseline to refine from:

```css
@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-playfair), ui-serif, Georgia, serif;

  /* Spacing scale (8pt grid) */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */
}
```

- [ ] **Step 3: Run the full test suite to confirm no regressions**

```bash
npx playwright test --reporter=list
```

Expected: All 6 tests still pass.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "style: apply UI UX Pro Max typography and spacing refinements"
```
