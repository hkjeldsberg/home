"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const GREEN   = "#33ff66";
const DIM     = "#1c6630";
const YELLOW  = "#ffd700";
const ORANGE  = "#ff8c00";
const CYAN    = "#00ffff";
const RED     = "#ff4444";
const BG      = "#090e09";
const VT      = "var(--font-vt323), 'Courier New', monospace";
const MONO    = "'Courier New', 'Lucida Console', monospace";

const webProjects = [
  {
    name: "hkjeldsberg.dev",
    status: "ACTIVE",
    stack: ["Next.js", "R3F", "Rapier", "TypeScript"],
    desc: "Interactive 3D portfolio with physics-driven objects and GLSL shaders.",
    tags: ["#webgl", "#3d", "#physics"],
    url: "https://github.com/hkjeldsberg",
  },
  {
    name: "Middah.no",
    status: "ACTIVE",
    stack: ["React", "Node.js", "PostgreSQL"],
    desc: "Norwegian meal planning platform with recipe scheduling and shopping lists.",
    tags: ["#fullstack", "#ux"],
    url: "https://middah.no",
  },
  {
    name: "PompWeb",
    status: "ACTIVE",
    stack: ["Next.js", "TypeScript", "Mapbox"],
    desc: "Live fuel price map aggregating real-time prices across Norway.",
    tags: ["#maps", "#realtime"],
  },
  {
    name: "Hablar",
    status: "ARCHIVED",
    stack: ["React", "Firebase", "TypeScript"],
    desc: "Language learning via live peer-to-peer text exchange sessions.",
    tags: ["#nlp", "#p2p"],
  },
  {
    name: "Vinylify",
    status: "ARCHIVED",
    stack: ["React", "Spotify API", "Canvas API"],
    desc: "Generates personalised vinyl artwork from Spotify listening data.",
    tags: ["#spotify", "#generative"],
  },
  {
    name: "Barnshli",
    status: "ARCHIVED",
    stack: ["React", "Node.js", "MongoDB"],
    desc: "Creative content platform for children: stories, tasks, learning.",
    tags: ["#edtech"],
  },
  {
    name: "Apache Tear",
    status: "ARCHIVED",
    stack: ["TypeScript", "WebGL", "Canvas API"],
    desc: "Experimental generative art and interactive visual experience.",
    tags: ["#generative", "#art"],
  },
];

const mobileProjects = [
  {
    name: "Pomp",
    status: "ACTIVE",
    stack: ["React Native", "TypeScript", "Expo"],
    desc: "Fuel price comparison app for Norwegian drivers. Location-aware with live data.",
    tags: ["#mobile", "#gps"],
  },
  {
    name: "Smittestopp",
    status: "ARCHIVED",
    stack: ["React Native", "TypeScript", "Bluetooth LE"],
    desc: "Official Norwegian COVID-19 contact tracing app (FHI). Privacy-preserving BLE proximity detection.",
    tags: ["#public-health", "#ble", "#govtech"],
  },
  {
    name: "Zleep",
    status: "ARCHIVED",
    stack: ["React Native", "TypeScript"],
    desc: "Sleep tracking and analysis via motion/audio sensors with personalised recommendations.",
    tags: ["#health", "#ml-inference"],
  },
];

function statusColor(s: string) {
  if (s === "ACTIVE") return GREEN;
  if (s === "ARCHIVED") return DIM;
  return YELLOW;
}

function ProjectBlock({ p, idx }: { p: typeof webProjects[0]; idx: number }) {
  return (
    <div style={{ marginBottom: "1.4rem", fontFamily: MONO, fontSize: "0.82rem" }}>
      <div style={{
        borderTop: `1px solid ${DIM}`,
        borderBottom: `1px solid ${DIM}`,
        padding: "0.7rem 0.9rem",
        backgroundColor: "rgba(0,255,100,0.03)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", flexWrap: "wrap", gap: "0.25rem" }}>
          <span style={{ color: YELLOW, fontWeight: "bold" }}>
            [{String(idx + 1).padStart(2, "0")}] <span style={{ color: GREEN }}>{p.name}</span>
          </span>
          <span style={{ color: statusColor(p.status), letterSpacing: "0.08em" }}>
            ■ {p.status}
          </span>
        </div>
        <p style={{ color: "rgba(51,255,102,0.7)", lineHeight: 1.55, marginBottom: "0.45rem" }}>
          {`# `}{p.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.4rem" }}>
          <span style={{ color: CYAN }}>stack = [</span>
          {p.stack.map((s, i) => (
            <span key={s} style={{ color: ORANGE }}>
              &quot;{s}&quot;{i < p.stack.length - 1 ? "," : ""}
            </span>
          ))}
          <span style={{ color: CYAN }}>]</span>
        </div>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          {p.tags.map(t => (
            <span key={t} style={{ color: DIM, fontSize: "0.75rem" }}>{t}</span>
          ))}
          {p.url && (
            <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
              color: CYAN, textDecoration: "none", marginLeft: "auto", fontSize: "0.75rem",
            }}>
              → link
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DevelopPage() {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: BG,
      color: GREEN,
      backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,0.12) 0px,rgba(0,0,0,0.12) 1px,transparent 1px,transparent 3px)",
    }}>

      {/* Terminal title bar */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "#040704",
        borderBottom: `1px solid ${DIM}`,
        padding: "0.55rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link href="/" style={{
          fontFamily: MONO,
          fontSize: "0.7rem",
          color: DIM,
          textDecoration: "none",
          letterSpacing: "0.05em",
        }}>
          ← /home
        </Link>
        <span style={{
          fontFamily: VT,
          fontSize: "1.05rem",
          color: GREEN,
          letterSpacing: "0.1em",
          textShadow: `0 0 8px ${GREEN}`,
        }}>
          KJELDSBERG-DEV TERMINAL
        </span>
        <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: DIM }}>v2.0.1</span>
      </div>

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {/* Boot header */}
        <div style={{
          fontFamily: VT,
          fontSize: "1.5rem",
          letterSpacing: "0.05em",
          lineHeight: 1.5,
          marginBottom: "1.5rem",
          textShadow: `0 0 12px ${GREEN}`,
          color: GREEN,
        }}>
          <div style={{ color: DIM }}>{"╔══════════════════════════════════════════════════╗"}</div>
          <div>{"║  "}<span style={{ color: YELLOW }}>KJELDSBERG</span>{"-OS  v2.0.1  [2026-03-29]          ║"}</div>
          <div>{"║  Python 3.12 | TypeScript 5.4 | Node.js 22.0    ║"}</div>
          <div>{"║  CUDA 12.4   | TensorFlow 2.16 | scikit-learn   ║"}</div>
          <div style={{ color: DIM }}>{"╚══════════════════════════════════════════════════╝"}</div>
        </div>

        {/* Python import sequence */}
        <div style={{ fontFamily: MONO, fontSize: "0.78rem", lineHeight: 1.7, marginBottom: "2rem", color: "rgba(51,255,102,0.75)" }}>
          <p style={{ color: CYAN }}>{">>> import kjeldsberg.projects as kp"}</p>
          <p style={{ color: CYAN }}>{">>> from ml.pipeline import NeuralNet, deploy"}</p>
          <p style={{ color: CYAN }}>{">>> import numpy as np  # always"}</p>
          <p style={{ color: DIM }}>{"..."}</p>
          <p><span style={{ color: ORANGE }}>Loading</span> modules: <span style={{ color: GREEN }}>████████████████████</span> 100%</p>
          <p style={{ color: DIM }}>{`# 23 packages imported | 0 deprecated warnings (impressive)`}</p>
        </div>

        {/* ─── WEB SECTION ─── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontFamily: MONO, marginBottom: "1rem" }}>
            <p style={{ color: DIM, fontSize: "0.75rem" }}>{"# ─── WEB DEVELOPMENT ───────────────────────────────────"}</p>
            <p style={{ fontSize: "0.8rem" }}>
              <span style={{ color: YELLOW }}>root</span>
              <span style={{ color: DIM }}>@kjeldsberg</span>
              <span style={{ color: GREEN }}>:~/develop$</span>
              {" "}
              <span style={{ color: "rgba(51,255,102,0.85)" }}>python3 -c <span style={{ color: ORANGE }}>&quot;kp.web.list()&quot;</span></span>
            </p>
          </div>
          <div style={{ fontFamily: VT, fontSize: "1.1rem", color: CYAN, marginBottom: "0.6rem", letterSpacing: "0.06em" }}>
            {">>> TYPE: List[WebProject]  |  total: "}{webProjects.length}{"  |  active: "}{webProjects.filter(p => p.status === "ACTIVE").length}
          </div>
          {webProjects.map((p, i) => <ProjectBlock key={p.name} p={p} idx={i} />)}
        </section>

        {/* ─── MOBILE SECTION ─── */}
        <section>
          <div style={{ fontFamily: MONO, marginBottom: "1rem" }}>
            <p style={{ color: DIM, fontSize: "0.75rem" }}>{"# ─── MOBILE DEVELOPMENT ────────────────────────────────"}</p>
            <p style={{ fontSize: "0.8rem" }}>
              <span style={{ color: YELLOW }}>root</span>
              <span style={{ color: DIM }}>@kjeldsberg</span>
              <span style={{ color: GREEN }}>:~/develop$</span>
              {" "}
              <span style={{ color: "rgba(51,255,102,0.85)" }}>python3 -c <span style={{ color: ORANGE }}>&quot;kp.mobile.list()&quot;</span></span>
            </p>
          </div>
          <div style={{ fontFamily: VT, fontSize: "1.1rem", color: CYAN, marginBottom: "0.6rem", letterSpacing: "0.06em" }}>
            {">>> TYPE: List[MobileApp]  |  total: "}{mobileProjects.length}{"  |  active: "}{mobileProjects.filter(p => p.status === "ACTIVE").length}
          </div>
          {mobileProjects.map((p, i) => <ProjectBlock key={p.name} p={p} idx={i} />)}
        </section>

        {/* Blinking cursor */}
        <div style={{ fontFamily: MONO, fontSize: "0.8rem", marginTop: "2rem" }}>
          <span style={{ color: YELLOW }}>root</span>
          <span style={{ color: DIM }}>@kjeldsberg</span>
          <span style={{ color: GREEN }}>:~/develop$</span>
          <span style={{
            display: "inline-block",
            width: "9px",
            height: "15px",
            backgroundColor: blink ? GREEN : "transparent",
            verticalAlign: "text-bottom",
            marginLeft: "4px",
            transition: "background-color 0.05s",
          }} />
        </div>
      </main>

      <style>{`
        @keyframes termFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        main { animation: termFadeIn 0.35s ease both; }
      `}</style>
    </div>
  );
}
