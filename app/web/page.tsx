"use client";

import Link from "next/link";

const BG = "#1e2022";
const BG_CARD = "#16181a";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#d4d4d4";
const COMMENT = "#6a737d";
const SELECTOR = "#79b8ff";   // blue — CSS selector / heading
const TAG = "#85e89d";        // green — HTML tag
const ATTR = "#ffab70";       // orange — attribute name
const STRING = "#9ecbff";     // light blue — string value
const KEYWORD = "#b392f0";    // purple — metadata / keywords
const MONO = "var(--font-fira), 'Fira Code', 'Cascadia Code', monospace";

const projects: {
  name: string;
  description: string;
  stack: string[];
  link?: string;
  repo?: string;
  status: "live" | "archived";
}[] = [
  {
    name: "hkjeldsberg.dev",
    description: "This portfolio — interactive 3D hero with physics-driven objects, custom GLSL shaders, and morph animations.",
    stack: ["Next.js", "R3F", "Rapier", "TypeScript"],
    repo: "https://github.com/hkjeldsberg",
    status: "live",
  },
  {
    name: "Middah.no",
    description: "Norwegian meal planning and recipe platform with integrated shopping list.",
    stack: ["React", "Node.js", "PostgreSQL"],
    link: "https://middah.no",
    status: "live",
  },
  {
    name: "PompWeb",
    description: "Interactive map showing live fuel prices across Norway with station details and price history.",
    stack: ["Next.js", "TypeScript", "Mapbox"],
    status: "live",
  },
  {
    name: "Hablar",
    description: "Language learning app pairing users for live text exchanges to build conversational fluency.",
    stack: ["React", "Firebase", "TypeScript"],
    status: "archived",
  },
  {
    name: "Apache Tear",
    description: "Experimental web experience exploring interactive visuals and generative art.",
    stack: ["TypeScript", "WebGL", "Canvas API"],
    status: "archived",
  },
  {
    name: "Barnshli",
    description: "Children's activity platform with curated creative tasks, stories, and learning content.",
    stack: ["React", "Node.js", "MongoDB"],
    status: "archived",
  },
  {
    name: "Vinylify",
    description: "Music discovery app that generates personalised vinyl-style artwork using the Spotify API.",
    stack: ["React", "Spotify API", "Canvas API"],
    status: "archived",
  },
];

export default function WebPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, color: TEXT }}>

      {/* Nav — styled like a browser tab bar */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "#14161a",
        borderBottom: `1px solid ${BORDER}`,
        padding: "0.85rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link href="/" style={{
          fontFamily: MONO,
          fontSize: "0.72rem",
          color: COMMENT,
          textDecoration: "none",
          letterSpacing: "0.04em",
        }}>
          ← <span style={{ color: TAG }}>~/</span>hkjeldsberg
        </Link>
        <span style={{ fontFamily: MONO, fontSize: "0.7rem", color: COMMENT }}>
          <span style={{ color: KEYWORD }}>web</span>.projects
        </span>
      </nav>

      {/* Main */}
      <main style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "3rem 2rem 6rem",
        animation: "inspectorFadeIn 0.45s ease 0.1s both",
      }}>

        {/* File header comment */}
        <div style={{ fontFamily: MONO, marginBottom: "2.5rem" }}>
          <p style={{ fontSize: "0.75rem", color: COMMENT, lineHeight: 1.7 }}>
            {`/* ─────────────────────────────────────────── */`}<br />
            {`/*  Web Projects                              */`}<br />
            {`/*  Sorted by status: live → archived         */`}<br />
            {`/* ─────────────────────────────────────────── */`}
          </p>
        </div>

        {/* Project cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
          {projects.map((p, i) => (
            <div key={i} style={{ fontFamily: MONO, fontSize: "0.82rem" }}>
              {/* Opening tag */}
              <div style={{ color: COMMENT, marginBottom: "0.1rem" }}>
                <span style={{ color: TAG }}>&lt;project</span>
                {` `}
                <span style={{ color: ATTR }}>name</span>
                <span style={{ color: TEXT }}>=</span>
                <span style={{ color: STRING }}>&quot;{p.name}&quot;</span>
                {` `}
                <span style={{ color: ATTR }}>status</span>
                <span style={{ color: TEXT }}>=</span>
                <span style={{ color: p.status === "live" ? TAG : COMMENT }}>&quot;{p.status}&quot;</span>
                <span style={{ color: TAG }}>&gt;</span>
              </div>

              {/* Card body */}
              <div style={{
                marginLeft: "1.5rem",
                marginBottom: "0.1rem",
                backgroundColor: BG_CARD,
                border: `1px solid ${BORDER}`,
                borderLeft: `2px solid ${p.status === "live" ? TAG : COMMENT}`,
                borderRadius: "0 4px 4px 0",
                padding: "0.9rem 1.2rem",
              }}>
                <p style={{ color: SELECTOR, fontWeight: 600, marginBottom: "0.45rem", fontSize: "0.9rem" }}>
                  .{p.name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}
                </p>
                <p style={{ color: TEXT, fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "0.75rem", opacity: 0.8 }}>
                  {`// `}{p.description}
                </p>
                {/* Stack as data-* attributes */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.7rem" }}>
                  {p.stack.map(s => (
                    <span key={s} style={{
                      fontSize: "0.68rem",
                      color: ATTR,
                      border: `1px solid rgba(255,171,112,0.2)`,
                      borderRadius: "3px",
                      padding: "0.15rem 0.5rem",
                    }}>
                      {`data-tech="${s}"`}
                    </span>
                  ))}
                </div>
                {/* Links */}
                {(p.link || p.repo) && (
                  <div style={{ display: "flex", gap: "1.2rem" }}>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
                        fontSize: "0.7rem",
                        color: SELECTOR,
                        textDecoration: "none",
                        letterSpacing: "0.05em",
                      }}>
                        href=&quot;live&quot; →
                      </a>
                    )}
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" style={{
                        fontSize: "0.7rem",
                        color: KEYWORD,
                        textDecoration: "none",
                        letterSpacing: "0.05em",
                      }}>
                        src=&quot;repo&quot; →
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Closing tag */}
              <div style={{ color: TAG, marginBottom: "1.2rem" }}>
                {`</project>`}
              </div>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @keyframes inspectorFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
