"use client";

import { useCallback, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier";
import type * as THREE from "three";

// Tiny squash-and-settle when a body lands. Impact speed is taken from the previous frame
// (at collision time the solver has already slowed the body down). Applied to a wrapper
// group around the model, so it never fights other scale animations (e.g. the heart's beat).

const MIN_IMPACT = 1.2; // m/s; below this, no squash (resting contacts, gentle nudges)
const MAX_AMOUNT = 0.05; // 5% at the hardest impacts
const DURATION = 0.25; // s

type SquashState = { prevSpeed: number; t: number; amount: number };

function applySquash(group: THREE.Group, s: SquashState, dt: number) {
  if (s.t >= DURATION) return;
  s.t = Math.min(DURATION, s.t + dt);
  const p = s.t / DURATION;
  const env = Math.sin(Math.PI * p) * (1 - p); // quick in, damped out
  const a = s.amount * env;
  group.scale.set(1 + a * 0.5, 1 - a, 1 + a * 0.5);
}

export function useLandingSquash(body: React.RefObject<RapierRigidBody | null>) {
  const group = useRef<THREE.Group>(null);
  const state = useRef<SquashState>({ prevSpeed: 0, t: DURATION, amount: 0 });

  const onCollisionEnter = useCallback(() => {
    const s = state.current;
    if (s.prevSpeed < MIN_IMPACT) return;
    s.amount = Math.min(s.prevSpeed / 10, 1) * MAX_AMOUNT;
    s.t = 0;
  }, []);

  useFrame((_, dt) => {
    const rb = body.current;
    if (rb) {
      const v = rb.linvel();
      state.current.prevSpeed = Math.hypot(v.x, v.y, v.z);
    }
    if (group.current) applySquash(group.current, state.current, dt);
  });

  return { group, onCollisionEnter };
}
