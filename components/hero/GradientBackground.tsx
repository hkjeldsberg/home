"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec3 colorA = vec3(0.58, 0.22, 0.22);
    vec3 colorB = vec3(0.35, 0.30, 0.50);

    float wave      = sin(vUv.x * 3.14159 + uTime * 0.25) * 0.08;
    float mixFactor = clamp(vUv.x + wave, 0.0, 1.0);

    vec3 color = mix(colorA, colorB, mixFactor);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function GradientBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh renderOrder={-1} position={[0, 0, -10]}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        depthWrite={false}
      />
    </mesh>
  );
}
