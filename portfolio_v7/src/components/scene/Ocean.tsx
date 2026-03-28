'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WAVE_FREQ, WAVE_AMP } from '@/lib/waveUtils';

const vertexShader = `
  uniform float uTime;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation =
      sin(modelPosition.x * ${WAVE_FREQ.toFixed(4)} + uTime) *
      cos(modelPosition.z * ${WAVE_FREQ.toFixed(4)} + uTime) *
      ${WAVE_AMP.toFixed(1)};

    modelPosition.y += elevation;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`;

const fragmentShader = `
  void main() {
    gl_FragColor = vec4(0.231, 0.510, 0.965, 0.5); // #3b82f6
  }
`;

export function Ocean() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state) => {
    if (!materialRef.current) return;
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
