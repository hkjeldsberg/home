"use client";

import { useEffect, useRef } from "react";

// Potential flow around a circular cylinder.
// Velocity field (complex potential): w = U(z + R²/z)
//   u = U(1 − R²(x²−y²)/r⁴)
//   v = −2UR²xy / r⁴
// Max speed 2U at lateral poles (0, ±R); stagnation at (±R, 0).

const W = 800;
const H = 360;
const CX = W * 0.42;
const CY = H / 2;
const R = 58;
const U_FREE = 95;   // px/s free-stream speed
const N = 520;
const DT = 1 / 60;

function velocity(x: number, y: number): [number, number] {
  const dx = x - CX, dy = y - CY;
  const r2 = dx * dx + dy * dy;
  if (r2 < R * R) return [0, 0];
  const r4 = r2 * r2;
  const R2 = R * R;
  return [
    U_FREE * (1 - R2 * (dx * dx - dy * dy) / r4),
    -U_FREE * 2 * R2 * dx * dy / r4,
  ];
}

function speedColor(t: number): string {
  // t in [0,1]: deep blue → cyan → lime → orange → red
  const c = Math.min(1, Math.max(0, t));
  if (c < 0.3) {
    const s = c / 0.3;
    return `rgb(0,${Math.round(s * 210)},${Math.round(220 + s * 35)})`;
  } else if (c < 0.65) {
    const s = (c - 0.3) / 0.35;
    return `rgb(${Math.round(s * 255)},${Math.round(210 + s * 45)},${Math.round(255 - s * 255)})`;
  } else {
    const s = (c - 0.65) / 0.35;
    return `rgb(255,${Math.round(255 - s * 215)},0)`;
  }
}

export default function CfdDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const px = new Float32Array(N);
    const py = new Float32Array(N);

    // Seed particles across the domain, avoiding the cylinder
    for (let i = 0; i < N; i++) {
      let x: number, y: number;
      do {
        x = Math.random() * W;
        y = 4 + Math.random() * (H - 8);
      } while ((x - CX) ** 2 + (y - CY) ** 2 < R * R);
      px[i] = x;
      py[i] = y;
    }

    let raf: number;

    function step() {
      // Fade trails — slightly heavier fade for crisp look
      ctx.fillStyle = "rgba(8,10,20,0.32)";
      ctx.fillRect(0, 0, W, H);

      // Cylinder body
      const cgrad = ctx.createRadialGradient(CX - R * 0.28, CY - R * 0.28, 2, CX, CY, R);
      cgrad.addColorStop(0, "rgba(75,80,100,1)");
      cgrad.addColorStop(1, "rgba(28,30,42,1)");
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = cgrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(150,155,180,0.22)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Stagnation point markers
      ctx.fillStyle = "rgba(200,200,220,0.5)";
      for (const [sx, sy] of [[CX - R, CY], [CX + R, CY]]) {
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < N; i++) {
        const [u, v] = velocity(px[i], py[i]);
        const speed = Math.hypot(u, v);

        ctx.globalAlpha = 0.72;
        ctx.fillStyle = speedColor(speed / (2 * U_FREE));
        ctx.beginPath();
        ctx.arc(px[i], py[i], 1.5, 0, Math.PI * 2);
        ctx.fill();

        px[i] += u * DT;
        py[i] += v * DT;

        const dx = px[i] - CX, dy = py[i] - CY;
        if (
          dx * dx + dy * dy < R * R * 1.04 ||
          px[i] > W + 6 || px[i] < -6 ||
          py[i] < 0 || py[i] > H
        ) {
          // Reset to left inlet at random y
          px[i] = -4;
          py[i] = 4 + Math.random() * (H - 8);
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      style={{ display: "block", width: "100%", borderRadius: "2px" }}
    />
  );
}
