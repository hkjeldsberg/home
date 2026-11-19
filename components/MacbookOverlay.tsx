"use client";

import { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@/context/NavigationContext";
import { WEB_PROJECTS, MOB_PROJECTS, SPANISH_SUITE, type Project } from "@/lib/projects";

const BG     = "#0b0d10";
const SURF   = "#13171c";
const BORDER = "#1a1f24";
const TEXT   = "#e7ecef";
const MUTED  = "#9aa3ab";
const ACCENT = "#4b8bf4";

function screenshot(p: Project) {
  return { background: p.bg, backgroundImage: `url(/screenshots/${p.id}.webp)`, backgroundSize: "cover", backgroundPosition: "center" };
}

function CardBar({ url, status }: { url: string; status: string }) {
  return (
    <div className="proj-bar">
      <div className="proj-dots">
        <i style={{ background: "#ff5f56" }} />
        <i style={{ background: "#ffbd2e" }} />
        <i style={{ background: "#27c93f" }} />
      </div>
      <div className="proj-url">{url}</div>
      <span className={`proj-pill ${status}`}>
        <span className="proj-pill-dot" />
        {status}
      </span>
    </div>
  );
}

function VhsCard({ p, onOpen, inSuite }: { p: Project; onOpen: (p: Project) => void; inSuite?: boolean }) {
  return (
    <button type="button" className={`proj-card${inSuite ? " in-suite" : ""}`} onClick={() => onOpen(p)}>
      <CardBar url={p.url} status={p.status} />

      {/* VHS screen */}
      <div className="proj-screen">
        <div className="vhs">
          <div className="vhs-layer vhs-base" style={screenshot(p)} />
          <div className="vhs-layer vhs-red"  style={screenshot(p)} />
          <div className="vhs-layer vhs-cyan" style={screenshot(p)} />
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
    </button>
  );
}

function SuiteCard({ members, expanded, onToggle }: { members: Project[]; expanded: boolean; onToggle: () => void }) {
  return (
    <button type="button" className="proj-card suite-card" onClick={onToggle} aria-expanded={expanded}>
      <CardBar url="spanish / *" status="live" />
      <div className="proj-screen suite-mosaic">
        {members.slice(0, 4).map((m) => (
          <div key={m.id} style={screenshot(m)} />
        ))}
        <span className="vhs-rec">● {members.length} TAPES</span>
      </div>
      <div className="proj-body">
        <h3>Spanish learning suite</h3>
        <p>{members.length} small apps built while learning Spanish: games, stories, grammar drills, a phrasebook and a dictionary.</p>
        <div className="proj-tags">
          <span className="proj-tag">{members.length} apps</span>
          <span className="proj-tag">Next.js</span>
          <span className="proj-tag suite-toggle">{expanded ? "Hide apps ▴" : "Show apps ▾"}</span>
        </div>
      </div>
    </button>
  );
}

function ProjectDetail({ p, onClose }: { p: Project; onClose: () => void }) {
  // Capture-phase listener so Esc closes this modal without also closing the overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      onClose();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  const live = p.href.startsWith("http");
  return (
    <div className="proj-detail-backdrop" onClick={onClose}>
      <div className="proj-detail" role="dialog" aria-modal="true" aria-label={p.name} onClick={(e) => e.stopPropagation()}>
        <CardBar url={p.url} status={p.status} />
        <div className="proj-detail-shot" style={screenshot(p)} />
        <div className="proj-detail-body">
          <div className="proj-detail-head">
            <h2>{p.name}</h2>
            <button type="button" className="proj-detail-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <p>{p.desc}</p>
          <div className="proj-tags">
            {p.stack.map((s) => (
              <span key={s} className="proj-tag">{s}</span>
            ))}
          </div>
          <div className="proj-detail-links">
            {live ? (
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="proj-btn primary">Open site ↗</a>
            ) : (
              <span className="proj-btn disabled">No longer online</span>
            )}
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="proj-btn">Source ↗</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectGrid({ projects, onOpen }: { projects: Project[]; onOpen: (p: Project) => void }) {
  const [expanded, setExpanded] = useState(false);
  const suite = projects.filter((p) => SPANISH_SUITE.includes(p.id));
  const items: React.ReactNode[] = [];
  let suitePlaced = false;

  for (const p of projects) {
    if (!SPANISH_SUITE.includes(p.id)) {
      items.push(<VhsCard key={p.id} p={p} onOpen={onOpen} />);
    } else if (!suitePlaced) {
      suitePlaced = true;
      items.push(<SuiteCard key="suite" members={suite} expanded={expanded} onToggle={() => setExpanded((v) => !v)} />);
      if (expanded) suite.forEach((m) => items.push(<VhsCard key={m.id} p={m} onOpen={onOpen} inSuite />));
    }
  }
  return <div className="proj-grid">{items}</div>;
}

export default function MacbookOverlay() {
  const { macbookFocused } = useNavigation();
  return macbookFocused ? <MacbookOverlayContent /> : null;
}

function MacbookOverlayContent() {
  const { setMacbookFocused } = useNavigation();
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<"web" | "mobile">("web");
  const [detail, setDetail] = useState<Project | null>(null);
  const closeDetail = useCallback(() => setDetail(null), []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

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
          position: "relative",
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
          <ProjectGrid key={tab} projects={projects} onOpen={setDetail} />
        </div>

        {detail && <ProjectDetail p={detail} onClose={closeDetail} />}
      </div>
    </div>
  );
}
