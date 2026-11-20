# Life and detail — idea list

Small touches that make the desk scene feel alive. Effort: **S** = < 1h, **M** = half day, **L** = 1+ days.

**Lessons from round 1 (reverted):** constant idle heartbeat + glow, MacBook screenshot slideshow and mug steam
all felt like too much. They were always on, always moving, and drew the eye away from the objects themselves.
Rules of thumb for this list:

- **Earned, not ambient:** most motion should be a *response* (hover, click, drag, collision), not a loop.
- **Rare and short:** if something happens on its own, it's occasional (every 20–60 s) and over in ~1 s.
- **Physical, not decorative:** prefer details that come from the objects being real (weight, light, sound, wear)
over effects layered on top.

Pick with `[x]` as before; ✅ = shipped.

---

## 1. Reactions to interaction

- [x] **S** **Landing squash.** Objects do a tiny squash-and-settle (2–3% scale, 150 ms) when they hit the table after a drop or throw. Uses Rapier collision events. ✅ *done 2026-11-20*
- [ ] **S** **Table wobble.** A hard landing nudges the other objects slightly (small impulse to bodies within ~1 m). Sells weight without extra visuals.
- [ ] **S** **Grab lift.** While dragging, the object tilts gently toward the direction of motion and its contact shadow grows softer/larger with height.
- [ ] **S** **Click "acknowledge".** On click-to-focus, the object gives a single short nudge (MacBook lid twitches, mug turns 15°, phone screen brightens) before the camera flies in.
- [ ] **M** **MacBook lid.** Lid closes when the laptop is thrown or flipped, opens again when it settles upright. Needs the lid as a separate node in the GLB.
- [ ] **S** **Phone wakes on touch.** Screen is dimmed until hovered or picked up, then fades up like a real lock screen. ↩︎ *tried and reverted 2026-11-20*
- [x] **S** **Heart squeeze on click.** One single beat when clicked (not on hover, not idle). ✅ *done 2026-11-20*

## 2. Rare ambient moments

- [ ] **S** **Phone notification.** Every ~45 s the phone buzzes: a tiny jitter on the table plus a banner sliding in on its screen ("New message from hkjeldsberg.no"). Clicking it opens Contact.
- [ ] **S** **Shooting star.** Occasional streak across the starfield behind the desk. Single line mesh, ~0.6 s.
- [ ] **S** **Screen flicker.** Very rarely the MacBook screen does a one-frame CRT flicker or brightness dip.
- [ ] **M** **Time of day.** Lighting and background shift subtly with the visitor's local time: warmer key light in the evening, cooler in the morning, darker at night with the phone/laptop screens as main light. ↩︎ *tried and reverted 2026-11-20*

## 3. Physical detail and materials

- [ ] **S** **Coffee level.** The mug has visible coffee inside (dark disc at ~70% height). It sloshes slightly when the mug is dragged, and is gone if the mug is tipped over.
- [ ] **M** **Spill.** Tipping the mug leaves a small, slowly fading coffee stain decal on the table.
- [ ] **S** **Coffee ring.** A faint ring stain on the table where the mug started. Static decal, zero motion.
- [ ] **S** **Fingerprints/smudges.** Subtle roughness map on the phone screen and MacBook lid so reflections break up realistically.
- [ ] **S** **Table wear.** Slight roughness variation and edge wear on the tabletop texture.
- [x] **M** **Real shadows.** Swap ContactShadows for a soft directional shadow so objects cast proper shadows on each other (phone under laptop edge, mug on table). ✅ *done 2026-11-20*

## 4. Sound (opt-in, muted by default)

- [ ] **M** **Contact sounds.** Wood thud, ceramic clink (mug), glass tap (phone), aluminium clack (MacBook), scaled by impact force. Mute toggle near the social icons.
- [ ] **S** **Focus whoosh.** Soft whoosh on camera fly-in, reversed on close.
- [ ] **S** **Phone buzz.** Pairs with the notification moment above.

## 5. Small new props (each is also a potential section)

- [ ] **M** **Notebook / paper stack** next to the heart, for Research. Pages flutter when thrown.
- [ ] **M** **Desk lamp** with a working switch: click toggles a warm spotlight over the desk. ↩︎ *tried and reverted 2026-11-20*
- [ ] **S** **Pen** that rolls across the table when the table is bumped.
- [ ] **M** **Plant** (small succulent): leaves sway only when something lands near it.

## 6. Easter eggs

- [ ] **S** **Stack them.** If all objects are stacked on top of each other, show a small "tower builder" toast.
- [ ] **S** **Knock everything off.** If every object ends up on the floor, the phone shows "you good?" on its screen.
- [x] **S** **Konami code.** Low gravity mode for 10 seconds. ✅ *done 2026-11-20*
- [ ] **S** **Double-tap the heart.** Shows the BPM of the visitor's scroll/mouse speed, as a joke heart monitor on the phone.

---

## Suggested first picks

Low-risk and in the spirit of the rules above:

1. Landing squash + table wobble (makes drag and throw feel much better)
2. Coffee level + coffee ring (static detail, no constant motion)
3. Phone notification (one rare moment, also links to Contact)
4. Real shadows
