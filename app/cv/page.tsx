"use client";

import Link from "next/link";

const BG = "#fafafa";
const TEXT = "#111111";
const META = "#666666";
const RULE = "#d8d8d8";
const CINZEL = "var(--font-cinzel), 'Trajan Pro', Georgia, serif";
const MONTSERRAT = "var(--font-montserrat), 'Helvetica Neue', Arial, sans-serif";
const MERRIWEATHER = "var(--font-merriweather), Georgia, serif";

const experience = [
  {
    role: "Software Engineer / Researcher",
    org: "Simula Research Laboratory",
    period: "2019 — Present",
    location: "Oslo, Norway",
    bullets: [
      "Developed VaMPy and morphMan — open-source pipelines for automated construction and morphological manipulation of patient-specific vascular geometries from clinical imaging.",
      "Implemented and validated high-performance finite element CFD solvers for cardiovascular blood flow simulation.",
      "Contributed to population-scale hemodynamic studies of intracranial aneurysms.",
    ],
  },
];

const education = [
  {
    degree: "PhD, Computational Science",
    institution: "University of Oslo / Simula Research Laboratory",
    period: "2019 — 2023",
    note: "Thesis: Numerical methods for cardiovascular blood flow in patient-specific geometries",
  },
  {
    degree: "MSc, Applied Mathematics",
    institution: "University of Oslo",
    period: "2017 — 2019",
    note: "Specialisation in computational mathematics and numerical analysis",
  },
];

const skills = [
  { category: "Languages",        items: ["Python", "TypeScript", "C++", "Swift"] },
  { category: "CFD / Scientific", items: ["FEniCSx", "OpenFOAM", "VTK", "ParaView"] },
  { category: "Web & Mobile",     items: ["Next.js", "React", "React Native", "Three.js"] },
  { category: "Infrastructure",   items: ["Docker", "Linux", "Git", "CI/CD"] },
];

export default function CvPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, color: TEXT }}>

      {/* Nav */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: BG,
        borderBottom: `1px solid ${RULE}`,
        padding: "0.9rem 2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link href="/" style={{
          fontFamily: MONTSERRAT,
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: META,
          textDecoration: "none",
        }}>
          ← Back
        </Link>
        <a
          href="/cv.pdf"
          download
          style={{
            fontFamily: MONTSERRAT,
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: META,
            textDecoration: "none",
            border: `1px solid ${RULE}`,
            borderRadius: "2px",
            padding: "0.3rem 0.75rem",
          }}
        >
          Download PDF ↓
        </a>
      </nav>

      {/* Main */}
      <main style={{
        maxWidth: "740px",
        margin: "0 auto",
        padding: "4rem 2.5rem 6rem",
        animation: "cvFadeIn 0.5s ease 0.1s both",
      }}>

        {/* Name */}
        <header style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <h1 style={{
            fontFamily: CINZEL,
            fontSize: "2.4rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: TEXT,
            lineHeight: 1.2,
            marginBottom: "0.6rem",
          }}>
            Henrik Kjeldsberg
          </h1>
          <p style={{
            fontFamily: MONTSERRAT,
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: META,
          }}>
            Software Engineer · Researcher · Oslo, Norway
          </p>
        </header>

        <hr style={{ border: "none", borderTop: `2px solid ${TEXT}`, marginBottom: "3rem" }} />

        {/* Experience */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{
            fontFamily: MONTSERRAT,
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: META,
            marginBottom: "1.5rem",
          }}>
            Experience
          </h2>

          {/* Timeline container */}
          <div style={{ position: "relative", paddingLeft: "1.75rem" }}>
            {/* Vertical timeline line */}
            <div style={{
              position: "absolute",
              left: 0,
              top: "6px",
              bottom: "6px",
              width: "1px",
              backgroundColor: RULE,
            }} />

            {experience.map((e, i) => (
              <div key={i} style={{ position: "relative", marginBottom: i < experience.length - 1 ? "2.5rem" : 0 }}>
                {/* Timeline dot */}
                <div style={{
                  position: "absolute",
                  left: "-1.9rem",
                  top: "6px",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: TEXT,
                  border: `2px solid ${BG}`,
                  outline: `1px solid ${TEXT}`,
                }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.2rem" }}>
                  <span style={{ fontFamily: MERRIWEATHER, fontSize: "1rem", fontWeight: 700, color: TEXT }}>
                    {e.role}
                  </span>
                  <span style={{ fontFamily: MONTSERRAT, fontSize: "0.72rem", color: META, letterSpacing: "0.05em" }}>
                    {e.period}
                  </span>
                </div>
                <p style={{ fontFamily: MONTSERRAT, fontSize: "0.78rem", color: META, marginBottom: "0.75rem", letterSpacing: "0.03em" }}>
                  {e.org} · {e.location}
                </p>
                <ul style={{ paddingLeft: "1.1rem", margin: 0 }}>
                  {e.bullets.map((b, j) => (
                    <li key={j} style={{
                      fontFamily: MERRIWEATHER,
                      fontSize: "0.88rem",
                      color: "#333",
                      lineHeight: 1.75,
                      marginBottom: "0.4rem",
                    }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: "none", borderTop: `1px solid ${RULE}`, marginBottom: "3rem" }} />

        {/* Education */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{
            fontFamily: MONTSERRAT,
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: META,
            marginBottom: "1.5rem",
          }}>
            Education
          </h2>

          <div style={{ position: "relative", paddingLeft: "1.75rem" }}>
            <div style={{
              position: "absolute",
              left: 0,
              top: "6px",
              bottom: "6px",
              width: "1px",
              backgroundColor: RULE,
            }} />

            {education.map((e, i) => (
              <div key={i} style={{ position: "relative", marginBottom: i < education.length - 1 ? "2rem" : 0 }}>
                <div style={{
                  position: "absolute",
                  left: "-1.9rem",
                  top: "6px",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: TEXT,
                  border: `2px solid ${BG}`,
                  outline: `1px solid ${TEXT}`,
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.2rem" }}>
                  <span style={{ fontFamily: MERRIWEATHER, fontSize: "1rem", fontWeight: 700, color: TEXT }}>
                    {e.degree}
                  </span>
                  <span style={{ fontFamily: MONTSERRAT, fontSize: "0.72rem", color: META, letterSpacing: "0.05em" }}>
                    {e.period}
                  </span>
                </div>
                <p style={{ fontFamily: MONTSERRAT, fontSize: "0.78rem", color: META, marginBottom: "0.3rem" }}>
                  {e.institution}
                </p>
                {e.note && (
                  <p style={{ fontFamily: MERRIWEATHER, fontSize: "0.84rem", color: "#555", fontStyle: "italic", lineHeight: 1.6 }}>
                    {e.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: "none", borderTop: `1px solid ${RULE}`, marginBottom: "3rem" }} />

        {/* Skills */}
        <section>
          <h2 style={{
            fontFamily: MONTSERRAT,
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: META,
            marginBottom: "1.5rem",
          }}>
            Skills
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1.5rem" }}>
            {skills.map(s => (
              <div key={s.category}>
                <p style={{
                  fontFamily: MONTSERRAT,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: META,
                  marginBottom: "0.6rem",
                }}>
                  {s.category}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {s.items.map(item => (
                    <span key={item} style={{
                      fontFamily: MERRIWEATHER,
                      fontSize: "0.85rem",
                      color: TEXT,
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <style>{`
        @keyframes cvFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
