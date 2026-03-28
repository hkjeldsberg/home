'use client';

import { Suspense } from 'react';
import * as THREE from 'three';
import { FloatingObject } from './FloatingObject';
import { useGLTF } from '@react-three/drei';

const BASE = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models';

const OBJECTS = [
  {
    id: 'bottle',
    url: `${BASE}/bottle/model.gltf`,
    position: [-40, 4, -20] as [number, number, number],
    scale: 8,
    tooltip: 'View Curriculum Vitae',
    route: '/cv',
  },
  {
    id: 'flask',
    url: `${BASE}/flask/model.gltf`,
    position: [40, 4, -30] as [number, number, number],
    scale: 6,
    tooltip: 'CFD & Research Papers',
    route: '/research',
  },
  {
    id: 'macbook',
    url: `${BASE}/macbook/model.gltf`,
    position: [-30, 3, 30] as [number, number, number],
    scale: 6,
    tooltip: 'Web Development',
    route: '/projects',
  },
  {
    id: 'phone',
    url: `${BASE}/phone-iphone/model.gltf`,
    position: [35, 4, 25] as [number, number, number],
    scale: 5,
    tooltip: 'Mobile App Portfolio',
    route: '/mobile',
  },
] as const;

interface SceneObjectsProps {
  onDive: (worldPosition: THREE.Vector3, route: string) => void;
}

export function SceneObjects({ onDive }: SceneObjectsProps) {
  return (
    <>
      {OBJECTS.map((obj) => (
        <Suspense key={obj.id} fallback={null}>
          <FloatingObject
            url={obj.url}
            position={obj.position}
            scale={obj.scale}
            tooltip={obj.tooltip}
            onDive={(pos) => onDive(pos, obj.route)}
          />
        </Suspense>
      ))}
    </>
  );
}

// Preload models at module load time
OBJECTS.forEach((obj) => useGLTF.preload(obj.url));
