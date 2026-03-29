"use client";

import { useEffect, useState } from "react";
import { useNavigation } from "@/context/NavigationContext";

const GOLD    = "#ffc845";
const BG_CARD = "#1a1a1a";
const SERIF   = "'Cormorant Garamond', Georgia, serif";
const SANS    = "'DM Sans', 'Helvetica Neue', sans-serif";

// All gold, varying opacity for hierarchy
const g = (a: number) => `rgba(255,200,69,${a})`;

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

export default function CvOverlay() {
  const { mugFocused, setMugFocused } = useNavigation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mugFocused) { setVisible(false); return; }
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, [mugFocused]);

  if (!mugFocused) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
      `}</style>
      <div style={{
        position: "fixed", inset: 0,
        display: "flex", justifyContent: "center",
        zIndex: 150,
        overflowY: "auto",
        pointerEvents: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
        padding: "24px 16px 48px",
      }}>
        <div style={{
          width: "min(780px, 94vw)",
          backgroundColor: BG_CARD,
          padding: "48px 40px 80px",
          fontFamily: SANS,
          boxShadow: "0 8px 56px rgba(0,0,0,0.75)",
          alignSelf: "flex-start",
        }}>

          {/* Top bar */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: "48px",
          }}>
            <button onClick={() => setMugFocused(false)} style={{
              background: "none", border: "none",
              color: g(0.4), fontSize: "12px", letterSpacing: "0.1em",
              textTransform: "uppercase", cursor: "pointer", fontFamily: SANS,
            }}>
              ← Close
            </button>
            <a
              href="/cv.pdf"
              download
              style={{
                fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
                color: GOLD, textDecoration: "none",
                border: `1px solid ${g(0.4)}`, borderRadius: "2px",
                padding: "7px 16px", fontFamily: SANS,
              }}
            >
              Download PDF ↓
            </a>
          </div>

          {/* Name + subtitle */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1 style={{
              fontFamily: SERIF,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: GOLD,
              marginBottom: "12px",
            }}>
              Henrik Kjeldsberg
            </h1>
            <p style={{
              fontSize: "11px", letterSpacing: "0.2em",
              textTransform: "uppercase", color: g(0.45), fontFamily: SANS,
            }}>
              Software Engineer · Researcher · Oslo, Norway
            </p>
          </div>

          <hr style={{ border: "none", borderTop: `1px solid ${g(0.18)}`, marginBottom: "40px" }} />

          {/* Experience */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{
              fontSize: "10px", fontWeight: 500, letterSpacing: "0.25em",
              textTransform: "uppercase", color: g(0.45),
              marginBottom: "24px", fontFamily: SANS,
            }}>
              Experience
            </h2>
            {experience.map((e, i) => (
              <div key={i} style={{
                marginBottom: i < experience.length - 1 ? "28px" : 0,
                paddingLeft: "16px",
                borderLeft: `1px solid ${g(0.15)}`,
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  flexWrap: "wrap", gap: "4px", marginBottom: "4px",
                }}>
                  <span style={{ fontSize: "17px", fontWeight: 600, color: g(0.9), fontFamily: SERIF }}>
                    {e.role}
                  </span>
                  <span style={{ fontSize: "12px", color: g(0.4), fontFamily: SANS }}>
                    {e.period}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: g(0.4), marginBottom: "12px", fontFamily: SANS }}>
                  {e.org} · {e.location}
                </p>
                <ul style={{ paddingLeft: "16px", margin: 0 }}>
                  {e.bullets.map((b, j) => (
                    <li key={j} style={{
                      fontSize: "14px", color: g(0.62), lineHeight: 1.75,
                      marginBottom: "6px", fontFamily: SANS,
                    }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr style={{ border: "none", borderTop: `1px solid ${g(0.12)}`, marginBottom: "40px" }} />

          {/* Education */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{
              fontSize: "10px", fontWeight: 500, letterSpacing: "0.25em",
              textTransform: "uppercase", color: g(0.45),
              marginBottom: "24px", fontFamily: SANS,
            }}>
              Education
            </h2>
            {education.map((e, i) => (
              <div key={i} style={{
                marginBottom: i < education.length - 1 ? "24px" : 0,
                paddingLeft: "16px",
                borderLeft: `1px solid ${g(0.15)}`,
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  flexWrap: "wrap", gap: "4px", marginBottom: "4px",
                }}>
                  <span style={{ fontSize: "17px", fontWeight: 600, color: g(0.9), fontFamily: SERIF }}>
                    {e.degree}
                  </span>
                  <span style={{ fontSize: "12px", color: g(0.4), fontFamily: SANS }}>
                    {e.period}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: g(0.4), marginBottom: "6px", fontFamily: SANS }}>
                  {e.institution}
                </p>
                {e.note && (
                  <p style={{
                    fontSize: "13px", color: g(0.58), fontStyle: "italic",
                    lineHeight: 1.6, fontFamily: SERIF,
                  }}>
                    {e.note}
                  </p>
                )}
              </div>
            ))}
          </section>

          <hr style={{ border: "none", borderTop: `1px solid ${g(0.12)}`, marginBottom: "40px" }} />

          {/* Skills */}
          <section>
            <h2 style={{
              fontSize: "10px", fontWeight: 500, letterSpacing: "0.25em",
              textTransform: "uppercase", color: g(0.45),
              marginBottom: "24px", fontFamily: SANS,
            }}>
              Skills
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "24px",
            }}>
              {skills.map(s => (
                <div key={s.category}>
                  <p style={{
                    fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: g(0.38),
                    marginBottom: "10px", fontFamily: SANS,
                  }}>
                    {s.category}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {s.items.map(item => (
                      <span key={item} style={{
                        fontSize: "13px", color: g(0.68), fontFamily: SANS,
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
