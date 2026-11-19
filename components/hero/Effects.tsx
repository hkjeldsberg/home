"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  DepthOfField,
  Noise,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import {
  BlendFunction,
  ToneMappingMode,
  type ChromaticAberrationEffect,
  type DepthOfFieldEffect,
} from "postprocessing";
import * as THREE from "three";
import { useFocusedObject } from "@/context/NavigationContext";
import { getObjectPosition, type ObjectKey } from "./sceneStore";

// Post-processing stack:
// - Depth of field that pulls focus onto the clicked object (bokeh fades in/out)
// - Bloom on HDR emissives only (hacker screen, heart glow, stars) via a high threshold
// - Chromatic aberration that spikes briefly on focus changes, like a VHS tracking glitch
// - ACES tone mapping (the composer renders linear HDR, so the renderer's own tone mapping no longer applies)
// - Vignette + soft film grain to match the VHS project cards

const CA_BASE = 0.0004;
const CA_SPIKE = 0.006;
const BOKEH_FOCUSED = 5;

type FxState = { prevFocus: ObjectKey | null; spike: number };

function updateEffects(
  dof: DepthOfFieldEffect,
  ca: ChromaticAberrationEffect,
  fx: FxState,
  focused: ObjectKey | null,
) {
  if (focused !== fx.prevFocus) {
    fx.prevFocus = focused;
    fx.spike = 1;
  }
  fx.spike *= 0.92;
  const o = CA_BASE + fx.spike * CA_SPIKE;
  ca.offset.set(o, o * 0.6);

  if (focused) dof.target = (dof.target ?? new THREE.Vector3()).copy(getObjectPosition(focused));
  const want = focused ? BOKEH_FOCUSED : 0;
  dof.bokehScale += (want - dof.bokehScale) * 0.06;
}

export default function Effects() {
  const focused = useFocusedObject();

  const dofRef = useRef<DepthOfFieldEffect>(null);
  const caRef = useRef<ChromaticAberrationEffect>(null);
  const fx = useRef<FxState>({ prevFocus: null, spike: 0 });

  // EffectComposer sets gl.autoClear = false renderer-wide. drei's ContactShadows renders into its
  // own target via gl.render and relies on auto-clear, so without this its shadow map accumulates
  // into a visible plane. Priority -1 runs before ContactShadows (0) and the composer (1).
  useFrame(({ gl }) => {
    gl.autoClear = true;
  }, -1);

  useFrame(() => {
    if (dofRef.current && caRef.current) updateEffects(dofRef.current, caRef.current, fx.current, focused);
  });

  return (
    <EffectComposer>
      <DepthOfField ref={dofRef} worldFocusRange={0.8} bokehScale={0} />
      <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.2} intensity={0.8} />
      <ChromaticAberration ref={caRef} offset={new THREE.Vector2(CA_BASE, CA_BASE * 0.6)} radialModulation modulationOffset={0.2} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Vignette offset={0.3} darkness={0.55} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.35} />
    </EffectComposer>
  );
}
