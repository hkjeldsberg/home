'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { getWaveHeight } from '@/lib/waveUtils';

interface FloatingObjectProps {
  url: string;
  position: [number, number, number];
  scale?: number;
  tooltip: string;
  onDive: (worldPosition: THREE.Vector3) => void;
}

export function FloatingObject({
  url,
  position,
  scale = 1,
  tooltip,
  onDive,
}: FloatingObjectProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const currentScale = useRef(scale);

  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const x = position[0];
    const z = position[2];

    // Buoyancy: match exact wave height at this object's X/Z
    const waveY = getWaveHeight(x, z, time);
    groupRef.current.position.y = waveY + position[1];

    // Gentle rocking rotation
    groupRef.current.rotation.z = Math.sin(time * 0.8 + x) * 0.06;
    groupRef.current.rotation.x = Math.cos(time * 0.6 + z) * 0.04;

    // Smooth scale lerp toward hover target
    const targetScale = hovered ? scale * 1.2 : scale;
    currentScale.current = THREE.MathUtils.lerp(
      currentScale.current,
      targetScale,
      0.12
    );
    groupRef.current.scale.setScalar(currentScale.current);
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onDive(groupRef.current.position.clone());
  };

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], position[2]]}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={handleClick}
    >
      <primitive object={clonedScene} />

      {hovered && (
        <Html
          center
          distanceFactor={60}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              background: 'rgba(0,0,0,0.75)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontFamily: 'sans-serif',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {tooltip}
          </div>
        </Html>
      )}
    </group>
  );
}
