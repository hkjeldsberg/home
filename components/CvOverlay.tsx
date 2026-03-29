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
    role: "Lead Consultant",
    org: "Kodio",
    period: "2024 — Present",
    location: "Oslo, Norway",
    bullets: [
      "Working as a Senior Data Engineer/Scientist delivering data engineering and ML solutions for clients in finance, energy, and the public sector.",
      "Currently building a slide generation and analytics platform for Norges Bank Investment Management (NBIM), automating financial reporting across equities, fixed income, real estate and renewable infrastructure.",
    ],
  },
  {
    role: "Data Scientist / Engineer",
    org: "Simula Research Laboratory",
    period: "2020 — 2024",
    location: "Oslo, Norway",
    bullets: [
      "Developed OasisMove, a Python/FEniCS-based CFD solver for fluid flow in moving domains, contributing to peer-reviewed publications in numerical simulation.",
      "Built automated data pipelines for cardiovascular blood flow CFD simulations, handling ingestion, transformation, and HPC cluster deployment.",
      "Developed open-source vascular modeling tools for patient-specific geometry generation from clinical imaging data.",
    ],
  },
  {
    role: "Data Engineer and Developer",
    org: "Bekk Consulting",
    period: "2018 — 2020",
    location: "Oslo, Norway",
    bullets: [
      "Built features for Vipps and BankAxept's internal portals, working across Python backends, iOS (Swift), and React/TypeScript frontends.",
      "Developed iOS functionality for FHI's Smittestopp contact-tracing app during the COVID-19 pandemic, integrating Swift frontend with Python backend services.",
    ],
  },
];

const projects = [
  {
    name: "NBIM — Report Generator & Portfolio Analytics",
    role: "Data Scientist/Engineer",
    period: "2024 — 2026",
    desc: "Built a Python/Streamlit slide generation framework that auto-generates investment performance and risk reports (monthly, quarterly, yearly) for Norges Bank's Oil Fund. Developed data pipelines combining Bloomberg feeds, internal APIs, and S3 storage via Airflow, and optimised Snowflake queries for financial reporting.",
  },
  {
    name: "Enfy — Energy Prediction Service",
    role: "Lead Data Scientist/Engineer",
    period: "2024",
    desc: "Led development of an ML pipeline for predicting household energy consumption and solar panel production, using CNN-LSTM, Random Forest, and Prophet models. Deployed a FastAPI service on Azure App Services with CI/CD via GitHub Actions, serving real-time predictions via REST endpoints.",
  },
  {
    name: "Fremtur — Carpooling SaaS",
    role: "Full Stack Developer",
    period: "2024",
    desc: "Designed solution architecture and built a React/TypeScript frontend with a Kotlin/Spring Boot backend for a Norwegian carpooling platform. Data stored in PostgreSQL with Kafka streams; hosted on Azure with full CI/CD pipelines.",
  },
  {
    name: "Simula — OasisMove CFD Simulator",
    role: "Data Scientist/Engineer",
    period: "2022 — 2024",
    desc: "Developed a Python/FEniCS-based CFD solver for Navier-Stokes equations in moving domains, enabling fluid flow simulations for biological and engineering applications. Resulted in open-source tooling and publications in numerical simulation.",
  },
  {
    name: "Simula — Vascular Modeling Pipeline",
    role: "Data Scientist/Engineer",
    period: "2020 — 2022",
    desc: "Built automated data pipelines for cardiovascular blood flow CFD simulations, handling ingestion, cleaning, and transformation of large medical imaging datasets on HPC clusters. Contributed to open-source tools with significant impact in the biomedical simulation field.",
  },
  {
    name: "FHI — Smittestopp",
    role: "Data Engineer and Developer",
    period: "2020",
    desc: "Implemented iOS functionality for Norway's national COVID-19 contact-tracing app using Swift, and developed Python backend integrations. The service was deployed on a Kubernetes cluster on Azure.",
  },
  {
    name: "Vipps & BankAxept — Internal/External User Portals",
    role: "Data Engineer and Full Stack Developer",
    period: "2018 — 2020",
    desc: "Built and maintained internal developer and user portals for Vipps and BankAxept across Python backends and React/TypeScript frontends. Developed ETL pipelines and REST integrations connecting internal systems.",
  },
];

const education = [
  {
    degree: "PhD, Applied Data Science & Computational Science",
    institution: "University of Oslo / Simula Research Laboratory",
    period: "2020 — 2025",
    note: "Focus on numerical methods, cardiac hemodynamics, and machine learning for biomedical applications ",
  },
  {
    degree: "MSc, Applied Mathematics and Mechanics",
    institution: "University of Oslo",
    period: "2016 — 2018",
    note: "Focus on developing frameworks for geometric manipulation of cardiovascular segments and cerebrovascular fluid simulations",
  },
  {
    degree: "BSc, Mathematics, Informatics, and Technology",
    institution: "University of Oslo",
    period: "2013 — 2016",
    note: "Specialization in mechanics, technology and biomedical applications",
  },
];

const skills = [
  { category: "Languages",      items: ["Python", "TypeScript", "Kotlin", "Swift", "SQL"] },
  { category: "Data / ML",      items: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Airflow"] },
  { category: "Cloud",          items: ["Azure", "AWS", "Snowflake", "AzureDevOps", "Docker", "Kubernetes"] },
  { category: "Web & Mobile",   items: ["React", "Next.js", "FastAPI", "Spring Boot", "iOS / Swift"] },
  { category: "Scientific",     items: ["FEniCS", "VTK", "3DSlicer", "CFD", "Numerical Methods"] },
  { category: "Infrastructure", items: ["Git", "CI/CD", "GitHub Actions", "PostgreSQL", "ETL pipelines"] },
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
              href="/Henrik-Aasen-kjeldsberg_cv.pdf"
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
              Henrik Aasen Kjeldsberg
            </h1>
            <p style={{
              fontSize: "11px", letterSpacing: "0.2em",
              textTransform: "uppercase", color: g(0.45), fontFamily: SANS,
            }}>
              Senior Data Engineer/Scientist · Lead Consultant · Oslo, Norway
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

          {/* Projects */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{
              fontSize: "10px", fontWeight: 500, letterSpacing: "0.25em",
              textTransform: "uppercase", color: g(0.45),
              marginBottom: "24px", fontFamily: SANS,
            }}>
              Projects
            </h2>
            {projects.map((p, i) => (
              <div key={i} style={{
                marginBottom: i < projects.length - 1 ? "24px" : 0,
                paddingLeft: "16px",
                borderLeft: `1px solid ${g(0.15)}`,
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  flexWrap: "wrap", gap: "4px", marginBottom: "2px",
                }}>
                  <span style={{ fontSize: "16px", fontWeight: 600, color: g(0.9), fontFamily: SERIF }}>
                    {p.name}
                  </span>
                  <span style={{ fontSize: "12px", color: g(0.4), fontFamily: SANS }}>
                    {p.period}
                  </span>
                </div>
                <p style={{ fontSize: "12px", color: g(0.38), marginBottom: "8px", fontFamily: SANS, letterSpacing: "0.03em" }}>
                  {p.role}
                </p>
                <p style={{ fontSize: "13px", color: g(0.62), lineHeight: 1.7, fontFamily: SANS, margin: 0 }}>
                  {p.desc}
                </p>
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
