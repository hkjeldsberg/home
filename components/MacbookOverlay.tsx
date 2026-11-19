"use client";

import { useState, useEffect } from "react";
import { useNavigation } from "@/context/NavigationContext";

const BG     = "#0b0d10";
const SURF   = "#13171c";
const BORDER = "#1a1f24";
const TEXT   = "#e7ecef";
const MUTED  = "#9aa3ab";
const ACCENT = "#4b8bf4";

type Project = {
  id: string;
  name: string;
  url: string;
  desc: string;
  stack: string[];
  status: "live" | "archived";
  href: string;
  bg: string;
};

const WEB_PROJECTS: Project[] = [
  {
    id: "hkjeldsberg",
    name: "hkjeldsberg.no",
    url: "hkjeldsberg.no",
    desc: "Interactive 3D portfolio with physics-driven objects and GLSL shaders.",
    stack: ["Next.js", "R3F", "Rapier"],
    status: "live",
    href: "https://www.hkjeldsberg.no",
    bg: "radial-gradient(circle at 70% 30%, #1a3a6e 0%, transparent 55%), radial-gradient(circle at 72% 45%, #6aa6ff 0 9%, transparent 9.5%), linear-gradient(135deg, #0a0e1a, #06080c)",
  },
  {
    id: "middah",
    name: "Middah",
    url: "middah.no",
    desc: "Minimalist Norwegian recipe list with dynamic scaling.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    status: "live",
    href: "https://www.middah.no",
    bg: "repeating-linear-gradient(0deg, #f5f1e8 0 22px, #d8d1c0 22px 22.5px), #f5f1e8",
  },
  {
    id: "pompweb",
    name: "PompWeb",
    url: "pompweb.app",
    desc: "Workout tracker with personalized exercises and routines.",
    stack: ["Next.js", "TypeScript", "Supabase"],
    status: "live",
    href: "https://pomp-web.vercel.app",
    bg: "repeating-linear-gradient(90deg, #1a1c22 0 36px, transparent 36px 78px) center/100% 36px no-repeat, linear-gradient(180deg, #e36588 60%, #0e0f12 60%)",
  },
  {
    id: "diaria",
    name: "Diariå",
    url: "diaria.app",
    desc: "Personal journaling platform with photo and email ingest.",
    stack: ["Vite", "Supabase", "Gmail API"],
    status: "live",
    href: "https://www.diariå.no",
    bg: "linear-gradient(135deg, #b48cff 0 36%, #f7f3ec 36%)",
  },
  {
    id: "fontline",
    name: "FontLine",
    url: "fontline.app",
    desc: "Handwriting → custom font via OCR and vector synthesis.",
    stack: ["Next.js", "Canvas", "OCR"],
    status: "live",
    href: "https://fontline.vercel.app",
    bg: "radial-gradient(ellipse at center, rgba(231,199,90,0.18), transparent 60%), #faf6eb",
  },
  {
    id: "kjeldsberg-db",
    name: "FamilieDashboard",
    url: "kjeldsberg-db.vercel.app",
    desc: "Management and overview dashboard for family business.",
    stack: ["Next.js", "React", "TypeScript", "Vercel"],
    status: "live",
    href: "https://kjeldsberg-db.vercel.app",
    bg: "linear-gradient(180deg, #0d1b2a 0 28%, #1e3a5f 28% 30%, #0d1b2a 30%), linear-gradient(#0d1b2a, #0d1b2a)",
  },
  {
    id: "barnshli",
    name: "Barnshli",
    url: "barnshli.vercel.app",
    desc: "Child development platform with milestone tracker and dictionary.",
    stack: ["Next.js", "TypeScript", "Claude AI"],
    status: "live",
    href: "https://barnshli.vercel.app",
    bg: "radial-gradient(circle at 35% 40%, #ffd6e0 0%, transparent 48%), radial-gradient(circle at 70% 65%, #c8e6ff 0%, transparent 48%), #f9f0ff",
  },
  {
    id: "apache-tear",
    name: "Apache Tear",
    url: "apache-tear.vercel.app",
    desc: "Lightweight Markdown editor focused on instant text entry.",
    stack: ["Next.js", "TypeScript", "Claude AI"],
    status: "live",
    href: "https://apache-tear.vercel.app",
    bg: "linear-gradient(180deg, #111 0 8%, #0d0d0d 8%), linear-gradient(#0d0d0d, #0d0d0d)",
  },
  {
    id: "tenerife",
    name: "Tenerife Trip Tracker",
    url: "tenerife-phi.vercel.app",
    desc: "Private trip planner for a Tenerife 2026 group holiday — itinerary, budget splits, and shared notes.",
    stack: ["Next.js", "TypeScript", "Supabase"],
    status: "live",
    href: "https://tenerife-phi.vercel.app/",
    bg: "radial-gradient(circle at 60% 40%, #f59e0b 0%, transparent 50%), linear-gradient(160deg, #0ea5e9 0 35%, #0c4a6e 35%)",
  },
  {
    id: "spanyard",
    name: "Spanyard",
    url: "spanyard.vercel.app",
    desc: "Daily Spanish learning app with AI-powered vocabulary, sentence drills, and progress tracking.",
    stack: ["Next.js", "TypeScript", "Claude AI"],
    status: "live",
    href: "https://spanyard.vercel.app/today",
    bg: "linear-gradient(135deg, #dc2626 0 33%, #facc15 33% 66%, #dc2626 66%)",
  },
  {
    id: "barnis",
    name: "Barnis",
    url: "barnis.vercel.app",
    desc: "Barnehage finder for Oslo — shows available spots ranked by travel time from your address.",
    stack: ["Next.js", "TypeScript", "Entur API"],
    status: "live",
    href: "https://barnis.vercel.app",
    bg: "radial-gradient(circle at 40% 55%, #86efac 0%, transparent 50%), linear-gradient(160deg, #f0fdf4 0 40%, #dcfce7 40%)",
  },
  {
    id: "chartizard",
    name: "Chartizard",
    url: "chartizard.vercel.app",
    desc: "Interactive catalogue of 286 chart, diagram, and plot types — filterable by purpose, data shape, and field.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "live",
    href: "https://chartizard.vercel.app/",
    bg: "repeating-linear-gradient(90deg, #e5e7eb 0 1px, transparent 1px 48px), repeating-linear-gradient(0deg, #e5e7eb 0 1px, transparent 1px 48px), #fff",
  },
  {
    id: "rodtrad",
    name: "Rød tråd",
    url: "redthread-one.vercel.app",
    desc: "Menstrual cycle tracker with symptom logging, cycle predictions, and personal health insights.",
    stack: ["Next.js", "TypeScript", "Supabase"],
    status: "live",
    href: "https://redthread-one.vercel.app/",
    bg: "radial-gradient(circle at 50% 45%, #fda4af 0%, transparent 55%), linear-gradient(160deg, #1c0a0a, #3b0d0d)",
  },
  {
    id: "coche",
    name: "Coche",
    url: "coche-rouge.vercel.app",
    desc: "Scrapes FINN.no listings and ranks used cars against our own must-have criteria.",
    stack: ["Next.js", "Tailwind CSS", "FINN.no"],
    status: "live",
    href: "https://coche-rouge.vercel.app/",
    bg: "linear-gradient(160deg, #7f1d1d 0 40%, #1f2937 40%)",
  },
  {
    id: "gryn",
    name: "Gryn",
    url: "gryn.vercel.app",
    desc: "Personal-finance app for tracking spending, budgets and savings.",
    stack: ["Vercel"],
    status: "live",
    href: "https://gryn.vercel.app/",
    bg: "linear-gradient(160deg, #c8ebdb 0 40%, #eae7e0 40%)",
  },
  {
    id: "memo",
    name: "Memo",
    url: "memo-seven-sooty.vercel.app",
    desc: "Personal notebook for collecting Spanish phrases and grammar rules.",
    stack: ["Next.js", "Tailwind CSS"],
    status: "live",
    href: "https://memo-seven-sooty.vercel.app/",
    bg: "repeating-linear-gradient(0deg, #fefce8 0 22px, #e7e5d0 22px 22.5px), #fefce8",
  },
  {
    id: "labirinto",
    name: "El Laberinto",
    url: "ellabirinto.vercel.app",
    desc: "Interactive story game where you find your way through a labyrinth in Spanish.",
    stack: ["Next.js", "Supabase"],
    status: "live",
    href: "https://ellabirinto.vercel.app/",
    bg: "repeating-linear-gradient(90deg, #3f3f46 0 2px, transparent 2px 28px), repeating-linear-gradient(0deg, #3f3f46 0 2px, transparent 2px 28px), #18181b",
  },
  {
    id: "tense",
    name: "Tense",
    url: "tense-gilt.vercel.app",
    desc: "Interactive game for drilling the Spanish past tenses.",
    stack: ["Next.js", "Tailwind CSS"],
    status: "live",
    href: "https://tense-gilt.vercel.app/",
    bg: "linear-gradient(135deg, #f97316 0 35%, #fff7ed 35%)",
  },
  {
    id: "estoff",
    name: "estoff",
    url: "estoff.vercel.app",
    desc: "Norwegian knowledge base on food additives and debated nutrition topics.",
    stack: ["Next.js", "Tailwind CSS"],
    status: "live",
    href: "https://estoff.vercel.app/",
    bg: "radial-gradient(circle at 65% 40%, #bbf7d0 0%, transparent 50%), #f8fafc",
  },
  {
    id: "como",
    name: "Como",
    url: "como-omega.vercel.app",
    desc: "Alias-style word game for practising Spanish vocabulary.",
    stack: ["Next.js"],
    status: "live",
    href: "https://como-omega.vercel.app/",
    bg: "linear-gradient(135deg, #facc15 0 50%, #dc2626 50%)",
  },
  {
    id: "cuento",
    name: "Cuento",
    url: "cuento-one.vercel.app",
    desc: "Short stories built from the 1,000 most common Spanish words.",
    stack: ["Next.js", "Tailwind CSS"],
    status: "live",
    href: "https://cuento-one.vercel.app/",
    bg: "radial-gradient(ellipse at center, rgba(180,83,9,0.15), transparent 60%), #fdf6e3",
  },
  {
    id: "todo",
    name: "Todo",
    url: "app-beige-omega-26.vercel.app",
    desc: "All-in-one Spanish learning hub: games, grammar, phrases, a dictionary and a diary.",
    stack: ["Next.js", "Tailwind CSS"],
    status: "live",
    href: "https://app-beige-omega-26.vercel.app/",
    bg: "linear-gradient(135deg, #dc2626 0 25%, #facc15 25% 50%, #f5f5f4 50%)",
  },
  {
    id: "flekk",
    name: "Flekk",
    url: "flekk-sigma.vercel.app",
    desc: "Mole tracker for logging and following up on skin spots over time.",
    stack: ["Next.js", "Tailwind CSS"],
    status: "live",
    href: "https://flekk-sigma.vercel.app/",
    bg: "radial-gradient(circle at 40% 45%, #78350f 0 6%, transparent 6.5%), radial-gradient(circle at 65% 60%, #92400e 0 4%, transparent 4.5%), #fde8d7",
  },
  {
    id: "mepido",
    name: "Me Pido",
    url: "mepido.vercel.app",
    desc: "Wish-list app with private lists and public lists you can share.",
    stack: ["Next.js", "Tailwind CSS"],
    status: "live",
    href: "https://mepido.vercel.app/",
    bg: "radial-gradient(circle at 60% 40%, #f9a8d4 0%, transparent 50%), #fdf2f8",
  },
  {
    id: "dormir",
    name: "Dormir",
    url: "dormir-eta.vercel.app",
    desc: "Personal sleep tracker for logging and reviewing sleep patterns.",
    stack: ["Next.js", "Tailwind CSS"],
    status: "live",
    href: "https://dormir-eta.vercel.app/",
    bg: "radial-gradient(circle at 70% 30%, #c7d2fe 0 8%, transparent 8.5%), linear-gradient(180deg, #0f172a, #1e1b4b)",
  },
  {
    id: "cinput",
    name: "CInput",
    url: "cinput.vercel.app",
    desc: "Comprehensible-input player with curated videos for learning Spanish.",
    stack: ["Next.js", "Tailwind CSS"],
    status: "live",
    href: "https://cinput.vercel.app/",
    bg: "radial-gradient(circle at 50% 50%, #ef4444 0 10%, transparent 10.5%), #111827",
  },
  {
    id: "palabras",
    name: "Palabras",
    url: "palabras-six.vercel.app",
    desc: "Guide to Spanish words whose meaning changes with context.",
    stack: ["Next.js", "Tailwind CSS"],
    status: "live",
    href: "https://palabras-six.vercel.app/",
    bg: "linear-gradient(135deg, #0ea5e9 0 30%, #f0f9ff 30%)",
  },
  {
    id: "hablar",
    name: "Hablar",
    url: "hablar.app",
    desc: "Spanish learning via AI-powered live tutor sessions.",
    stack: ["Next.js", "DeepGram API", "Claude AI"],
    status: "archived",
    href: "#",
    bg: "linear-gradient(135deg, #d4522a 0 30%, #f7c59f 30%)",
  },
  {
    id: "vinylify",
    name: "Vinylify",
    url: "vinylify.app",
    desc: "Vinyl collection with personalized Discogs recommendations.",
    stack: ["Next.js", "Discogs API"],
    status: "archived",
    href: "#",
    bg: "radial-gradient(circle at 50% 50%, #2a2a2a 0 28%, #111 28% 29%, #2a2a2a 29% 44%, #111 44% 45%, #1a1a1a 45%), #111",
  },
  {
    id: "fremtur",
    name: "Fremtur",
    url: "fremtur.no",
    desc: "Norwegian carpooling platform streamlining peer rides.",
    stack: ["React", "Kotlin", "Vipps API"],
    status: "archived",
    href: "https://www.fremtur.no",
    bg: "linear-gradient(135deg, #1a4a2e 0 40%, #2d7a47 40%)",
  },
];

const MOB_PROJECTS: Project[] = [
  {
    id: "zleep",
    name: "Zleep",
    url: "zleep.app",
    desc: "Sleep tracking via motion/audio sensors with personalised recommendations.",
    stack: ["React Native", "Expo"],
    status: "archived",
    href: "#",
    bg: "radial-gradient(circle at 50% 30%, #1a1a4e 0%, transparent 60%), linear-gradient(180deg, #0a0a1a, #15153a)",
  },
  {
    id: "pomp",
    name: "Pomp",
    url: "pomp.app",
    desc: "Workout tracker with personalized routines; mobile version.",
    stack: ["React Native", "Expo"],
    status: "archived",
    href: "#",
    bg: "linear-gradient(180deg, #1a0a00 0 30%, #e36527 30% 32%, #1a0a00 32%)",
  },
  {
    id: "smittestopp",
    name: "Smittestopp",
    url: "fhi.no/smittestopp",
    desc: "Norwegian COVID-19 contact tracing app (FHI). Privacy-preserving BLE proximity.",
    stack: ["Swift", "Android", "Bluetooth LE"],
    status: "archived",
    href: "#",
    bg: "linear-gradient(135deg, #003f5c 0 40%, #2fafb1 40%)",
  },
];

function VhsCard({ p }: { p: Project }) {
  const isExternal = p.href.startsWith("http");
  return (
    <a
      className="proj-card"
      href={p.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={!isExternal ? (e) => e.preventDefault() : undefined}
    >
      {/* Browser chrome bar */}
      <div className="proj-bar">
        <div className="proj-dots">
          <i style={{ background: "#ff5f56" }} />
          <i style={{ background: "#ffbd2e" }} />
          <i style={{ background: "#27c93f" }} />
        </div>
        <div className="proj-url">{p.url}</div>
        <span className={`proj-pill ${p.status}`}>
          <span className="proj-pill-dot" />
          {p.status}
        </span>
      </div>

      {/* VHS screen */}
      <div className="proj-screen">
        <div className="vhs">
          <div className="vhs-layer vhs-base" style={{ background: p.bg, backgroundImage: `url(/screenshots/${p.id}.png)`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="vhs-layer vhs-red"  style={{ background: p.bg, backgroundImage: `url(/screenshots/${p.id}.png)`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="vhs-layer vhs-cyan" style={{ background: p.bg, backgroundImage: `url(/screenshots/${p.id}.png)`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <span className="vhs-rec">● REC SP</span>
        </div>
      </div>

      {/* Card body */}
      <div className="proj-body">
        <h3>{p.name}</h3>
        <p>{p.desc}</p>
        <div className="proj-tags">
          {p.stack.map((s) => (
            <span key={s} className="proj-tag">{s}</span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function MacbookOverlay() {
  const { macbookFocused, setMacbookFocused } = useNavigation();
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<"web" | "mobile">("web");

  useEffect(() => {
    if (!macbookFocused) { setVisible(false); return; }
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
          width: "min(960px, 94vw)",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          background: BG,
          border: `1px solid ${BORDER}`,
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 40px 100px rgba(0,0,0,0.95)",
          fontFamily: "var(--font-space-grotesk), ui-sans-serif, sans-serif",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            background: SURF,
            borderBottom: `1px solid ${BORDER}`,
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
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
          <div
            style={{
              flex: 1, background: BG,
              border: `1px solid ${BORDER}`,
              borderRadius: "6px", padding: "4px 12px",
              fontSize: "12px", color: MUTED, letterSpacing: "0.01em",
              fontFamily: "var(--font-jetbrains-mono, ui-monospace)",
            }}
          >
            🔒 hkjeldsberg.no/projects
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
              padding: "14px 28px",
              background: SURF,
            }}
          >
            <span
              style={{
                fontSize: "12px", fontWeight: 600,
                color: MUTED, letterSpacing: "0.02em",
                fontFamily: "var(--font-jetbrains-mono, ui-monospace)",
              }}
            >
              github/hkjeldsberg
            </span>
          </div>

          {/* Section heading */}
          <div style={{ padding: "24px 28px 0" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: TEXT, margin: 0, letterSpacing: "-0.02em" }}>
              Projects
            </h1>
            <p style={{ fontSize: "13px", color: MUTED, margin: "6px 0 0" }}>
              A selection of web and mobile applications.
            </p>
          </div>

          {/* Tabs */}
          <div
            style={{
              padding: "0 28px",
              display: "flex",
              gap: 0,
              borderBottom: `1px solid ${BORDER}`,
              marginTop: "18px",
            }}
          >
            {(["web", "mobile"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "9px 18px",
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

          {/* Card grid */}
          <div className="proj-grid">
            {projects.map((p) => (
              <VhsCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
