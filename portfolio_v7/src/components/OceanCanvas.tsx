'use client';

import { useRef, RefObject } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { Ocean } from './scene/Ocean';
import { SceneObjects } from './scene/SceneObjects';

interface DiveSceneProps {
  overlayRef: RefObject<HTMLDivElement | null>;
}

function DiveScene({ overlayRef }: DiveSceneProps) {
  const { camera } = useThree();
  const router = useRouter();
  const isDiving = useRef(false);

  const handleDive = (worldPosition: THREE.Vector3, route: string) => {
    if (isDiving.current) return;
    isDiving.current = true;

    const tl = gsap.timeline({
      onComplete: () => router.push(route),
      onInterrupt: () => { isDiving.current = false; },
    });

    // 1. Pan camera toward the clicked object
    tl.to(camera.position, {
      x: worldPosition.x,
      y: worldPosition.y + 20,
      z: worldPosition.z + 15,
      duration: 0.6,
      ease: 'power2.in',
      onUpdate: () => camera.lookAt(worldPosition),
    });

    // 2. Dive through the object, plunge underwater
    tl.to(camera.position, {
      y: -100,
      duration: 0.9,
      ease: 'expo.in',
      onUpdate: () => camera.lookAt(worldPosition),
    });

    // 3. Simultaneously fade the black overlay
    if (overlayRef.current) {
      tl.to(
        overlayRef.current,
        { opacity: 1, duration: 0.45, ease: 'power1.in' },
        '-=0.45'
      );
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('[OceanCanvas] overlayRef is null — fade will be skipped');
    }
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[50, 80, 50]} intensity={1.2} />
      <Ocean />
      <SceneObjects onDive={handleDive} />
    </>
  );
}

interface OceanCanvasProps {
  overlayRef: RefObject<HTMLDivElement | null>;
}

export default function OceanCanvas({ overlayRef }: OceanCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 60, 120], fov: 55, near: 0.1, far: 2000 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <DiveScene overlayRef={overlayRef} />
    </Canvas>
  );
}
