import * as THREE from "three";
import type { FocusedObject } from "@/context/NavigationContext";

// Transient, per-frame scene state shared between R3F components.
// Plain module state (not React state): written and read inside useFrame, never drives renders.

export type ObjectKey = FocusedObject;

const positions: Record<ObjectKey, THREE.Vector3> = {
  macbook: new THREE.Vector3(),
  heart: new THREE.Vector3(),
  iphone: new THREE.Vector3(),
  mug: new THREE.Vector3(),
};

let dragging = false;

export function setObjectPosition(key: ObjectKey, p: { x: number; y: number; z: number }) {
  positions[key].set(p.x, p.y, p.z);
}

export function getObjectPosition(key: ObjectKey): THREE.Vector3 {
  return positions[key];
}

export function setDragging(v: boolean) {
  dragging = v;
}

export function isDragging() {
  return dragging;
}
