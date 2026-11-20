# FEATURES batch 1 (2026-11-19)

Items checked in FEATURES.md. Phased so each phase is verifiable on its own.

## A. Project grid (MacbookOverlay)
- [x] Group Spanish suite (memo, tense, como, cuento, todo, cinput, palabras, labirinto) into one collection card that expands in place
- [x] Project detail modal on card click: large screenshot, desc, stack, status, live link (+ optional `repo`). Esc closes modal before overlay

## B. 3D life and detail
- [x] Heart: idle heartbeat (subtle) + emissive throb; stronger on hover
- [x] Mug steam: noise-shader billboard above the mug, fades when mug is tipped
- [x] Dust particles (drei Sparkles) in the key light
- [x] MacBook idle screen: slideshow of project screenshots; hacker effect still on hover/focus
- [x] iPhone lock screen: live clock

## C. Interaction
- [x] Drag and throw: shared hook, velocity-driven spring toward pointer on camera-facing plane; release keeps velocity. Clicks still focus. iPhone unlocks from kinematic on grab

## D. Look
- [x] Background reacts: mouse swirl + hue shift toward focused object colour
- [x] Post-processing: Bloom (emissive), Vignette, Noise grain, ChromaticAberration spike on focus change, ToneMapping (keep ACES look)
- [x] Depth of field on focus (target = focused object)

## Verify
- [x] lint, tsc, tests, build
- [x] visual check in browser for each phase

## Review

All 10 items implemented; lint, tsc, 80 tests and build pass; each phase checked in Chrome.

Notes / gotchas found on the way:
- MacBook screen UVs are V-flipped vs. the canvas: screenshots *and* the pre-existing hacker text were upside down. Both now drawn mirrored.
- `EffectComposer` sets `gl.autoClear = false` renderer-wide, which made drei `ContactShadows` accumulate into a visible plane. Fixed with a priority -1 `useFrame` that re-enables autoClear (Effects.tsx).
- Composer renders linear HDR + ACES at the end, so raw-colour ShaderMaterials (background, steam) changed look. Background now inverse-ACES-maps its display colours so it looks as before.
- Thrown objects could leave the view: added invisible walls + respawn if they fall below y=-8.
- Project data moved to `lib/projects.ts` (shared by overlay grid and 3D slideshow).
- Project detail has an optional `repo` field; no repo links are filled in yet.

# LIFE_AND_DETAIL batch (2026-11-19)

- [x] Landing squash: shared hook, impact speed from previous frame, squash wrapper group per object
- [x] Heart squeeze on click (single beat), hover beat unchanged
- [x] Phone screen dim until hovered / grabbed / focused
- [x] Konami code → low gravity 10 s + small indicator
- [x] Real shadows: key light shadow map, objects cast/receive, shadow-catcher floor; drop ContactShadows
- [x] Time of day: pure `sampleTimeOfDay(hour)` in lib (unit tested), drives lights + background; `?hour=` override for preview
- [x] Desk lamp: procedural, dynamic body, click toggles warm spotlight; on by default at night
- [x] Verify: lint, tsc, tests, build, browser

## Review (LIFE_AND_DETAIL)

All 7 shipped; lint, tsc, 92 tests, build pass; checked in Chrome at ?hour=13 and ?hour=22.
- Lamp "missing" bug: it rendered fine but dark metal with no env map read as black on the dark background, and what showed under the table was its shadow. Now 1.6x scale, cream matte.
- ContactShadows removed (replaced by key-light shadow map + shadowMaterial floor), so the composer autoClear workaround is gone too.
