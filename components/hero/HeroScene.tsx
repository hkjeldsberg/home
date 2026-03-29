"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, ContactShadows } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import GradientBackground from "./GradientBackground";
import PhysicsModels from "./PhysicsModels";
import { useNavigation } from "@/context/NavigationContext";

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

export default function HeroScene() {
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      camera={{ position: [0, 5, 10], fov: 50 }}
      gl={{ antialias: true }}
    >
      {/* Low ambient so objects have a dark side — makes directional shading visible */}
      <ambientLight intensity={0.25} />

      {/* Key light: strong, upper-right — creates highlights on duck/car surfaces */}
      <directionalLight position={[6, 8, 4]} intensity={2.0} color="#fff8f0" />

      {/* Fill light: soft lavender from opposite side — prevents pure black shadows */}
      <directionalLight position={[-5, 3, -3]} intensity={0.5} color="#c8aaff" />

      {/* Rim light: from below-back — separates objects from background */}
      <pointLight position={[0, -1, -5]} intensity={1.2} color="#80ffb0" />

      <CameraRig />
      <GradientBackground />
      <Stars radius={100} depth={60} count={5000} factor={6} saturation={0} fade speed={1} />
      <ContactShadows
        position={[0, -1.9, 0]}
        opacity={0.5}
        scale={14}
        blur={4}
        far={5}
        color="#2d1a4a"
      />
      <Suspense fallback={null}>
        <Physics gravity={[0, -9.81, 0]}>
          <PhysicsModels />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
