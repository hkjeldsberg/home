"use client";

import { useCallback, useEffect, useRef } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { setDragging } from "./sceneStore";

// Drag-and-throw for dynamic rigid bodies.
// While dragging, the body is pulled toward the pointer (projected onto a camera-facing plane
// through the grab point) by setting its velocity each frame. On release the last velocity is
// kept, so a flick throws the object. A small move threshold keeps plain clicks working.

const DRAG_THRESHOLD_PX = 5;
const SPRING = 14;
const MAX_SPEED = 14;
const BOUNDS = { x: 6.3, zMin: -3, zMax: 3, yMin: -1.5, yMax: 7 }; // inside the walls in PhysicsModels
const LOST_Y = -8;

type DragState = {
  pending: boolean;
  active: boolean;
  startX: number;
  startY: number;
  ndc: THREE.Vector2;
  plane: THREE.Plane;
  normal: THREE.Vector3;
  offset: THREE.Vector3;
  hit: THREE.Vector3;
  vel: THREE.Vector3;
  raycaster: THREE.Raycaster;
};

type Options = {
  enabled: boolean;
  spawn: [number, number, number];
  onGrab?: () => void;
  onRelease?: () => void;
};

function stepDrag(body: RapierRigidBody, d: DragState, camera: THREE.Camera) {
  d.raycaster.setFromCamera(d.ndc, camera);
  if (!d.raycaster.ray.intersectPlane(d.plane, d.hit)) return;
  d.hit.add(d.offset);
  d.hit.x = THREE.MathUtils.clamp(d.hit.x, -BOUNDS.x, BOUNDS.x);
  d.hit.y = THREE.MathUtils.clamp(d.hit.y, BOUNDS.yMin, BOUNDS.yMax);
  d.hit.z = THREE.MathUtils.clamp(d.hit.z, BOUNDS.zMin, BOUNDS.zMax);
  const p = body.translation();
  d.vel.set(d.hit.x - p.x, d.hit.y - p.y, d.hit.z - p.z).multiplyScalar(SPRING).clampLength(0, MAX_SPEED);
  body.setLinvel(d.vel, true);
  const w = body.angvel();
  body.setAngvel({ x: w.x * 0.85, y: w.y * 0.85, z: w.z * 0.85 }, true);
}

function respawnIfLost(body: RapierRigidBody, spawn: [number, number, number]) {
  if (body.translation().y > LOST_Y) return;
  body.setTranslation({ x: spawn[0], y: spawn[1], z: spawn[2] }, true);
  body.setLinvel({ x: 0, y: 0, z: 0 }, true);
  body.setAngvel({ x: 0, y: 0, z: 0 }, true);
}

export function useDragThrow(body: React.RefObject<RapierRigidBody | null>, options: Options) {
  const { camera, gl } = useThree();
  const opts = useRef(options);
  useEffect(() => {
    opts.current = options;
  });

  const drag = useRef<DragState>({
    pending: false,
    active: false,
    startX: 0,
    startY: 0,
    ndc: new THREE.Vector2(),
    plane: new THREE.Plane(),
    normal: new THREE.Vector3(),
    offset: new THREE.Vector3(),
    hit: new THREE.Vector3(),
    vel: new THREE.Vector3(),
    raycaster: new THREE.Raycaster(),
  });

  const onPointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      const rb = body.current;
      if (!opts.current.enabled || !rb || e.button !== 0) return;
      e.stopPropagation();
      const d = drag.current;
      const rect = gl.domElement.getBoundingClientRect();
      const setNdc = (x: number, y: number) =>
        d.ndc.set(((x - rect.left) / rect.width) * 2 - 1, -((y - rect.top) / rect.height) * 2 + 1);

      d.pending = true;
      d.startX = e.clientX;
      d.startY = e.clientY;
      setNdc(e.clientX, e.clientY);
      camera.getWorldDirection(d.normal);
      d.plane.setFromNormalAndCoplanarPoint(d.normal, e.point);
      const p = rb.translation();
      d.offset.set(p.x - e.point.x, p.y - e.point.y, p.z - e.point.z);

      const onMove = (ev: PointerEvent) => {
        setNdc(ev.clientX, ev.clientY);
        if (d.pending && Math.hypot(ev.clientX - d.startX, ev.clientY - d.startY) > DRAG_THRESHOLD_PX) {
          d.pending = false;
          d.active = true;
          setDragging(true);
          document.body.style.cursor = "grabbing";
          opts.current.onGrab?.();
        }
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        if (d.active) {
          setDragging(false);
          document.body.style.cursor = "";
          opts.current.onRelease?.();
        }
        d.pending = false;
        d.active = false;
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [body, camera, gl],
  );

  useFrame(() => {
    const rb = body.current;
    if (!rb) return;
    if (drag.current.active) stepDrag(rb, drag.current, camera);
    else respawnIfLost(rb, opts.current.spawn);
  });

  const isDragging = useCallback(() => drag.current.active, []);
  return { onPointerDown, isDragging };
}
