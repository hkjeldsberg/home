"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import GradientBackground from "./GradientBackground";
import PhysicsModels from "./PhysicsModels";
import Effects from "./Effects";
import { useNavigation } from "@/context/NavigationContext";
import { isDragging } from "./sceneStore";
import { useKonami } from "./useKonami";

function CameraRig() {
  const { macbookFocused, heartFocused, iphoneFocused, mugFocused } = useNavigation();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame((state) => {
    if (macbookFocused || heartFocused || iphoneFocused || mugFocused) return;
    if (isDragging()) return; // keep the drag plane stable while an object is held
    const targetX = mouse.current.x * 2.6;
    const targetY = mouse.current.y * 1.5 + 5;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    // Also lerp Z back to default — otherwise it stays at zoomed-in position after MacBook defocus
    state.camera.position.z += (10 - state.camera.position.z) * 0.04;
    state.camera.lookAt(0, 1, 0);
  });

  return null;
}

const GRAVITY: [number, number, number] = [0, -9.81, 0];
const LOW_GRAVITY: [number, number, number] = [0, -1.6, 0]; // roughly the Moon
const LOW_GRAVITY_MS = 10_000;

function Lights() {
  return (
    <>
      {/* Low ambient so objects have a dark side — makes directional shading visible */}
      <ambientLight intensity={0.25} />

      {/* Key light: strong, upper-right; the only shadow caster */}
      <directionalLight
        position={[6, 8, 4]}
        intensity={2.0}
        color="#fff8f0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
      />

      {/* Fill light: soft lavender from opposite side — prevents pure black shadows */}
      <directionalLight position={[-5, 3, -3]} intensity={0.5} color="#c8aaff" />

      {/* Rim light: from below-back — separates objects from background */}
      <pointLight position={[0, -1, -5]} intensity={1.2} color="#80ffb0" />

    </>
  );
}

export default function HeroScene() {
  const [lowGravity, setLowGravity] = useState(false);

  useKonami(() => setLowGravity(true));
  useEffect(() => {
    if (!lowGravity) return;
    const id = setTimeout(() => setLowGravity(false), LOW_GRAVITY_MS);
    return () => clearTimeout(id);
  }, [lowGravity]);

  return (
    <>
      <Canvas
        style={{ position: "fixed", inset: 0, zIndex: 0 }}
        camera={{ position: [0, 5, 10], fov: 50 }}
        gl={{ antialias: true }}
        shadows
      >
        <Lights />
        <CameraRig />
        <GradientBackground />
        <Stars radius={100} depth={60} count={5000} factor={6} saturation={0} fade speed={1} />

        {/* Invisible floor that only shows shadows */}
        <mesh rotation-x={-Math.PI / 2} position={[0, -1.899, 0]} receiveShadow>
          <planeGeometry args={[40, 20]} />
          <shadowMaterial color="#2d1a4a" opacity={0.45} />
        </mesh>

        <Suspense fallback={null}>
          <Physics gravity={lowGravity ? LOW_GRAVITY : GRAVITY}>
            <PhysicsModels />
          </Physics>
        </Suspense>
        <Effects />
      </Canvas>

      <div className={`low-gravity${lowGravity ? " on" : ""}`} aria-live="polite">
        {lowGravity ? "Low gravity" : ""}
      </div>
    </>
  );
}
