# hkjeldsberg.no

Interactive 3D portfolio. Physics-driven objects (MacBook, heart, iPhone, mug) sit on a table; clicking one focuses the camera and opens its overlay.

| Object  | Overlay           | Content                  |
| ------- | ----------------- | ------------------------ |
| MacBook | `MacbookOverlay`  | Projects (VHS card grid) |
| Heart   | `ResearchOverlay` | PhD research             |
| iPhone  | `ContactOverlay`  | Contact + credits        |
| Mug     | `CvOverlay`       | CV                       |

Stack: Next.js 16 (App Router), React 19, React Three Fiber + drei, Rapier physics, Tailwind 4.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm test
npm run build
```

## Adding a project

1. Add an entry to `WEB_PROJECTS` (or `MOB_PROJECTS`) in `components/MacbookOverlay.tsx`.
2. Add a screenshot as `public/screenshots/<id>.webp`, max 1200px wide:
   ```bash
   cwebp -q 82 -m 6 -sharp_yuv -resize 1200 0 input.png -o public/screenshots/<id>.webp
   ```
   Without a screenshot the card falls back to the `bg` gradient.
3. `npm test` checks ids are unique, live links are valid, and screenshots are WebP, referenced and < 250 KB.

See `FEATURES.md` for the idea backlog.
