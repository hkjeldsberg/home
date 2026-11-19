"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useFocusedObject } from "@/context/NavigationContext";
import type { ObjectKey } from "./sceneStore";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Base: red → lavender gradient with a slow wave (unchanged look at rest).
// Reacts to the pointer (soft glow + ripple around it, in screen space) and tints toward
// the focused object's colour.
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;       // smoothed pointer, screen UV [0,1]
  uniform vec2 uResolution;
  uniform vec3 uTint;
  uniform float uTintAmt;
  varying vec2 vUv;

  // The post chain ends with ACES Filmic tone mapping (three.js variant) + sRGB encoding.
  // The gradient is designed as final display colours, so run them backwards through both:
  // sRGB decode → inverse ACES output matrix → inverse RRT/ODT fit → inverse input matrix.
  const mat3 ACES_IN = mat3(
    vec3(0.59719, 0.07600, 0.02840),
    vec3(0.35458, 0.90834, 0.13383),
    vec3(0.04823, 0.01566, 0.83777));
  const mat3 ACES_OUT = mat3(
    vec3( 1.60475, -0.10208, -0.00327),
    vec3(-0.53108,  1.10813, -0.07276),
    vec3(-0.07367, -0.00605,  1.07602));

  vec3 inverseFit(vec3 y) {
    // Solves y = (v(v + a) - b) / (v(c v + d) + e) for v (per channel)
    y = clamp(y, 0.0, 0.99);
    vec3 A = 1.0 - y * 0.983729;
    vec3 B = 0.0245786 - y * 0.4329510;
    vec3 C = -(0.000090537 + y * 0.238081);
    return (-B + sqrt(B * B - 4.0 * A * C)) / (2.0 * A);
  }

  vec3 displayToSceneLinear(vec3 display) {
    vec3 lin = pow(display, vec3(2.2));
    vec3 v = inverseFit(inverse(ACES_OUT) * lin);
    return max(inverse(ACES_IN) * v, 0.0) * 0.6;
  }

  void main() {
    vec3 colorA = vec3(0.58, 0.22, 0.22);
    vec3 colorB = vec3(0.35, 0.30, 0.50);

    vec2 sp = gl_FragCoord.xy / uResolution;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    float d = length((sp - uMouse) * aspect);

    float wave   = sin(vUv.x * 3.14159 + uTime * 0.25) * 0.08;
    float ripple = sin(d * 14.0 - uTime * 0.8) * 0.025 * smoothstep(0.7, 0.0, d);
    float lean   = (uMouse.x - 0.5) * 0.12;
    float mixFactor = clamp(vUv.x + wave + ripple + lean, 0.0, 1.0);

    vec3 color = mix(colorA, colorB, mixFactor);
    color += vec3(0.07, 0.04, 0.09) * smoothstep(0.55, 0.0, d);
    color = mix(color, uTint * 0.55 + color * 0.45, uTintAmt * 0.6);
    gl_FragColor = vec4(displayToSceneLinear(color), 1.0);
  }
`;

const TINTS: Record<ObjectKey, THREE.Color> = {
  macbook: new THREE.Color("#22b8d6"),
  heart: new THREE.Color("#ff4f8b"),
  iphone: new THREE.Color("#4fd18b"),
  mug: new THREE.Color("#ff9a3c"),
};

const MOUSE_TARGET = new THREE.Vector2();

function updateUniforms(
  u: Record<string, THREE.IUniform>,
  t: number,
  pointer: THREE.Vector2,
  width: number,
  height: number,
  dpr: number,
  focused: ObjectKey | null,
) {
  u.uTime.value = t;
  u.uResolution.value.set(width * dpr, height * dpr);
  // pointer is NDC [-1,1]; ease toward it so the glow trails the cursor
  (u.uMouse.value as THREE.Vector2).lerp(MOUSE_TARGET.set(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5), 0.05);
  if (focused) (u.uTint.value as THREE.Color).lerp(TINTS[focused], 0.08);
  u.uTintAmt.value += ((focused ? 1 : 0) - u.uTintAmt.value) * 0.05;
}

export default function GradientBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const focused = useFocusedObject();

  // Uniforms are created once; React re-renders (focus changes) must not replace them.
  const [uniforms] = useState(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uTint: { value: new THREE.Color("#000000") },
    uTintAmt: { value: 0 },
  }));

  useFrame(({ clock, pointer, size, viewport }) => {
    if (!materialRef.current) return;
    updateUniforms(materialRef.current.uniforms, clock.getElapsedTime(), pointer, size.width, size.height, viewport.dpr, focused);
  });

  return (
    <mesh renderOrder={-1} position={[0, 0, -10]}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}
