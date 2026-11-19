# FEATURES

Backlog of ideas for the portfolio. Effort: **S** = < 1h, **M** = half day, **L** = 1+ days.
`[x]` = picked for implementation; ✅ = shipped.

---

## 0. Foundations (do first)

- [ ] **S** Compress GLBs with `npx @gltf-transform/cli optimize` (meshopt + WebP textures). ~12MB → ~1–2MB.
- [x] **S** Convert `public/screenshots/*.png` to WebP (≤1200px, 18MB → 1MB).
- [ ] **S** Lazy-load off-screen project cards.
- [x] **S** Fix 12 lint errors.
- [x] **S** Add `description`, `openGraph`, `opengraph-image`.

---

## 1. 3D — Rendering quality

- [ ] **S** **Environment lighting.** No env map today, so PBR materials (MacBook aluminium, iPhone glass, glossy mug) look flat. Add drei `<Environment>` with custom `<Lightformer>`s tinted to the red/lavender gradient. Real reflections, cheap.
- [ ] **S** **Tone mapping.** Try `AgXToneMapping` + slight exposure bump; keeps saturated purples from clipping.
- [x] **M** **Post-processing** (`@react-three/postprocessing`): ✅ *done 2026-11-19*
  - Bloom on emissive only: hacker screen on MacBook, heart glow, stars.
  - Vignette + light film grain to tie the hero into the VHS card aesthetic.
  - Subtle chromatic aberration that spikes on focus transitions (VHS "tracking" glitch).
- [x] **M** **Depth of field on focus.** When an object is focused, blur everything else instead of only `DimPlane`. Feels like a camera pull-focus. ✅ *done 2026-11-19*
- [x] **S** **Background reacts.** Pass mouse + focused object into the gradient shader: hue shifts per object (MacBook → cyan, heart → pink, mug → orange), gentle parallax swirl. ✅ *done 2026-11-19*

## 2. 3D — Interaction

- [x] **M** **Drag and throw.** Objects are physics bodies but only clickable. Add pointer-drag → kinematic follow → release with velocity. Single most "fun" upgrade. ✅ *done 2026-11-19*
- [ ] **S** **Hover affordance.** drei `<Outlines>` or rim glow + `cursor: pointer` + small floating label ("Projects", "CV", …) so visitors know what's clickable.
- [ ] **S** **Gyroscope parallax on mobile.** `CameraRig` only listens to `mousemove`; phones get a static camera. Use `deviceorientation` (with iOS permission prompt on first tap).
- [ ] **S** **Shake / reset.** Double-click empty space → impulse all objects upward, they re-settle.
- [ ] **M** **Collision sounds** (opt-in, muted by default). Rapier `onContactForce` → soft clinks scaled by impulse. Mute toggle in nav.

## 3. 3D — Life and detail

- [ ] **S** **Mug steam.** Shader-based curling steam above the mug (scrolling noise on a billboard plane). ↩︎ *tried and reverted 2026-11-19*
- [ ] **S** **Heart beat.** Subtle scale pulse + emissive throb on the heart model when idle. ↩︎ *tried and reverted 2026-11-19*
- [ ] **M** **Idle screen content.** MacBook screen cycles real project screenshots (reuse `public/screenshots`) instead of only the hacker effect; iPhone shows a mini lock screen with clock. ↩︎ *tried and reverted 2026-11-19*
- [x] **S** **Dust / floating particles** in the light beam for depth. ✅ *done 2026-11-19*
- [ ] **L** **New object per section** if sections grow, e.g. a stack of papers/book for Research, falls in with the others.

## 4. 3D — Performance

- [ ] **S** `dpr={[1, 2]}` on `<Canvas>` + drei `<PerformanceMonitor>` / `<AdaptiveDpr>` to drop resolution on weak GPUs.
- [ ] **S** Pause rendering when an overlay fully covers the canvas (`frameloop="demand"` or `setFrameloop`). Saves battery; currently renders at 60fps behind overlays.
- [ ] **S** `ContactShadows`: lower `resolution`, or bake once objects sleep (`frames` prop).
- [ ] **S** **Loading screen.** `Suspense fallback={null}` shows nothing while ~12MB loads. drei `useProgress` → minimal percentage / VHS "loading tape" overlay.
- [ ] **S** **Reduced motion.** Respect `prefers-reduced-motion`: disable camera sway, glitch effects, grain.

---

## 5. Site features

- [ ] **S** **Filter projects by tag** (Next.js, Supabase, Spanish learning, …) in the VHS grid. 34 cards is a lot to scan.
- [x] **M** **Project detail view.** Click card → modal with larger screenshot/GIF, problem, stack, links (live + repo). ✅ *done 2026-11-19*
- [x] **S** **Group projects:** "Spanish learning suite" (Memo, Tense, Como, Cuento, Todo, CInput, Palabras, El Laberinto) as one collection card that expands. ✅ *done 2026-11-19*
- [ ] **M** **Keyboard navigation** of the 3D scene: Tab cycles objects, Enter focuses, Esc closes. Also improves accessibility.
- [ ] **M** **Accessible fallback.** Plain HTML nav listing sections for screen readers / no-WebGL devices.
- [ ] **S** **Analytics.** Vercel Web Analytics to see which objects/projects people actually click.
- [ ] **L** **Writing / notes section** (MDX) for research summaries or project write-ups.
- [ ] **M** **Language toggle** (EN / NO).

---

## Suggested order

1. Foundations (perf + lint)
2. Environment lighting + hover affordance + loading screen
3. Drag and throw
4. Post-processing (bloom + vignette + grain) + DOF on focus
5. Project filters / grouping
