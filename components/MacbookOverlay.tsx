"use client";

import { useState, useEffect } from "react";
import { useNavigation } from "@/context/NavigationContext";

const ACCENT = "#58a6ff";
const BG     = "#0d1117";
const SURF   = "#161b22";
const BORDER = "#30363d";
const TEXT   = "#e6edf3";
const MUTED  = "#8b949e";

const WEB_PROJECTS = [
  {
    name: "hkjeldsberg.no",
    desc: "Interactive 3D portfolio with physics-driven objects and GLSL shaders.",
    stack: ["Next.js", "R3F", "Rapier", "TypeScript"],
    status: "live",
    href: "https://www.hkjeldsberg.no",
  },
  {
    name: "Middah",
    desc: "Minimalist Norwegian recipe list platform with dynamic recipe scaling.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    status: "live",
    href: "https://www.middah.no",
  },
  {
    name: "PompWeb",
    desc: "Workout tracker with personalized exercises and routines.",
    stack: ["Next.js", "TypeScript", "SupaBase"],
    status: "live",
    href: "https://pomp-web.vercel.app",
  },
  {
    name: "Diariå",
    desc: "Personal journaling platform.",
    stack: ["Vite", "TypeScript", "Tailwind CSS", "Supabase", "Gmail API", "Google Photo Picker API"],
    status: "live",
    href: "https://www.diariå.no",
  },
  {
    name: "FontLine",
    desc: "A personal typography app that uses OCR and vector synthesis to transform your physical handwriting into a custom digital font for instant transcription.",
    stack: ["Vite", "TypeScript", "Tailwind CSS", "Supabase"],
    status: "live",
    href: "https://fontline.vercel.app",
  },
  {
    name: "Kjeldsberg FamilieDashboard",
    desc: "Management and overview dashboard for family business.",
    stack: ["Next.js", "React", "TypeScript", "Vercel"],
    status: "live",
    href: "https://kjeldsberg-db.vercel.app",
  },
  {
    name: "Barnshli",
    desc: "Child development platform for development (cognitive, social, physical) with milestone tracker and temporal word/sentence dictionary.",
    stack: ["Next.js", "TypeScript", "SupaBase", "Claude AI"],
    status: "live",
    href: "https://barnshli.vercel.app",
  },
  {
    name: "Apache Tear",
    desc: "A liteweight Markdown editor that eliminates sidebars and plugins to focus entirely on instantaneous text entry and structure though a flat directory of local files.",
    stack: ["Next.js", "TypeScript", "SupaBase", "Claude AI"],
    status: "live",
    href: "https://apache-tear.vercel.app",
  },
  {
    name: "Hablar",
    desc: "Spanish language learning application via live AI-powered tutor for peer-to-peer text and speach exchange sessions.",
    stack: ["Next.js", "TypeScript", "SupaBase", "DeepGram API", "Claude AI"],
    status: "archived",
    href: "#",
  },
  {
    name: "Vinylify",
    desc: "Vinyl collection website with personalized recommendations feature from Discogs data.",
    stack: ["Next.js", "TypeScript", "SupaBase", "Discogs API"],
    status: "archived",
    href: "#",
  },
  {
    name: "Fremtur",
    desc: "A Norwegian-based solution designed to streamline and facilitate carpooling.",
    stack: ["React", "Kotlin", "PostgreSQL", "Kubernetes", "Entur API", "Vipps API"],
    status: "archived",
    href: "https://www.fremtur.no",
  },
];

const MOB_PROJECTS = [
  {
    name: "Zleep",
    desc: "Sleep tracking and analysis via motion/audio sensors with personalised recommendations.",
    stack: ["React Native", "Expo"],
    status: "archived",
    href: "#",
  },
  {
    name: "Pomp",
    desc: "Workout tracker with personalized exercises and routines; mobile phone version.",
    stack: ["React Native", "Expo"],
    status: "archived",
    href: "#",
  },
  {
    name: "Smittestopp",
    desc: "Official Norwegian COVID-19 contact tracing app (FHI). Privacy-preserving BLE proximity.",
    stack: ["Swift", "Android", "Tornado", "Bluetooth LE"],
    status: "archived",
    href: "#",
  },
];

export default function MacbookOverlay() {
  const { macbookFocused, setMacbookFocused } = useNavigation();
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<"web" | "mobile">("web");

  const link = (title:string,href:string) => (
    <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ fontSize: ".8rem",  textDecoration: "none"}}
 >
  {title}
  </a>
  )


  // Delayed reveal — let camera pan in first
  useEffect(() => {
    if (!macbookFocused) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, [macbookFocused]);

  if (!macbookFocused) return null;

  const projects = tab === "web" ? WEB_PROJECTS : MOB_PROJECTS;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 150,
        pointerEvents: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      {/* Screen frame */}
      <div
        style={{
          width: "min(900px, 92vw)",
          maxHeight: "82vh",
          display: "flex",
          flexDirection: "column",
          background: BG,
          border: `1px solid ${BORDER}`,
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 40px 100px rgba(0,0,0,0.95)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Mono', 'Segoe UI', sans-serif",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            background: "#161b22",
            borderBottom: `1px solid ${BORDER}`,
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          {/* Traffic lights */}
          {(["#ff5f57", "#febc2e", "#28c840"] as const).map((c, i) => (
            <div
              key={i}
              onClick={i === 0 ? () => setMacbookFocused(false) : undefined}
              style={{
                width: "12px", height: "12px", borderRadius: "50%",
                background: c, cursor: i === 0 ? "pointer" : "default",
                flexShrink: 0,
              }}
            />
          ))}
          {/* URL bar */}
          <div
            style={{
              flex: 1,
              background: "#0d1117",
              border: `1px solid ${BORDER}`,
              borderRadius: "6px",
              padding: "4px 12px",
              fontSize: "12px",
              color: MUTED,
              letterSpacing: "0.01em",
            }}
          >
            🔒 hkjeldsberg.no/developer-portfolio
          </div>
          <span
            style={{ fontSize: "11px", color: "#3a3a3a", cursor: "pointer", flexShrink: 0 }}
            onClick={() => setMacbookFocused(false)}
          >
            ESC
          </span>
        </div>

        {/* Page content */}
        <div style={{ overflowY: "auto", flex: 1 }}>

          {/* Site header */}
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              padding: "16px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: SURF,
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: 700, color: TEXT, letterSpacing: "-0.01em" }}>
            {link("github/hkjeldsberg", "https://github.com/hkjeldsberg/")}
            </span>
          </div>

          {/* Section heading */}
          <div style={{ padding: "28px 28px 0" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: TEXT, margin: 0, letterSpacing: "-0.02em" }}>
              Projects
            </h1>
            <p style={{ fontSize: "13px", color: MUTED, margin: "6px 0 0" }}>
              A selection of web and mobile applications.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ padding: "16px 28px 0", display: "flex", gap: "0", borderBottom: `1px solid ${BORDER}`, marginTop: "20px" }}>
            {(["web", "mobile"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "8px 18px",
                  fontSize: "13px",
                  fontWeight: 500,
                  background: "none",
                  border: "none",
                  borderBottom: tab === t ? `2px solid ${ACCENT}` : "2px solid transparent",
                  color: tab === t ? TEXT : MUTED,
                  cursor: "pointer",
                  marginBottom: "-1px",
                }}
              >
                {t === "web" ? "Web" : "Mobile"}
              </button>
            ))}
          </div>

          {/* Project list */}
          <div style={{ padding: "0 28px 28px" }}>
            {projects.map((p, i) => (
              <a
                key={p.name}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "16px 0",
                  borderBottom: i < projects.length - 1 ? `1px solid ${BORDER}` : "none",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: ACCENT }}>
                    {p.name}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      padding: "1px 7px",
                      borderRadius: "10px",
                      border: `1px solid ${p.status === "live" ? "#238636" : BORDER}`,
                      color: p.status === "live" ? "#3fb950" : MUTED,
                      background: p.status === "live" ? "rgba(35,134,54,0.12)" : "transparent",
                    }}
                  >
                    {p.status}
                  </span>
                </div>
                <p style={{ fontSize: "12px", color: MUTED, margin: "0 0 8px", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {p.stack.map(s => (
                    <span
                      key={s}
                      style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        background: "rgba(88,166,255,0.1)",
                        border: `1px solid rgba(88,166,255,0.2)`,
                        borderRadius: "4px",
                        color: ACCENT,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
