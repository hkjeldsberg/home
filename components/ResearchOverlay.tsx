"use client";

import { useState, useEffect } from "react";
import { useNavigation } from "@/context/NavigationContext";

const PAPERS = [
  {
    ref: "1",
    title: "VaMPy: An Automated and Objective Pipeline for Modeling Vascular Geometries",
    authors: "Kjeldsberg H. et al.",
    journal: "J. Open Source Softw.",
    year: "2023",
    doi: "https://doi.org/10.21105/joss.05278",
    doiShort: "doi.org/10.21105/joss.05278",
    summary:
      "Presents VaMPy, an open-source pipeline that reduces vascular geometry preparation from ~8 hours to under 12 minutes by automating segmentation, surface smoothing, and mesh generation from clinical CT/MRA data.",
  },
  {
    ref: "2",
    title: "A verified and validated moving domain CFD solver with applications to cardiovascular flows",
    authors: "Kjeldsberg H. et al.",
    journal: "Int. J. Numer. Methods Biomed. Eng.",
    year: "2023",
    doi: "https://pubmed.ncbi.nlm.nih.gov/37020156/",
    doiShort: "pubmed.ncbi.nlm.nih.gov/37020156",
    summary:
      "Develops and validates a finite element solver for flows in moving domains, achieving relative L² error below 4% against experimental PIV benchmarks and applying it to pulsatile cardiovascular simulations.",
  },
  {
    ref: "3",
    title: "Automated landmarking of bends in vascular structures: a comparative study with application to the internal carotid artery",
    authors: "Kjeldsberg H. et al.",
    journal: "BioMed. Eng. OnLine",
    year: "2021",
    doi: "https://doi.org/10.1186/s12938-021-00957-6",
    doiShort: "doi.org/10.1186/s12938-021-00957-6",
    summary:
      "Introduces objective automated landmarking of vessel bends, removing operator-dependent subjectivity and enabling reproducible geometric analysis across patient cohorts of carotid artery anatomy.",
  },
  {
    ref: "4",
    title: "morphMan: Automated manipulation of vascular geometries",
    authors: "Kjeldsberg H. et al.",
    journal: "J. Open Source Softw.",
    year: "2019",
    doi: "https://doi.org/10.21105/joss.01065",
    doiShort: "doi.org/10.21105/joss.01065",
    summary:
      "Introduces morphMan, a tool for systematic parametric manipulation of vascular geometries, enabling population-scale studies of how vessel curvature, cross-section, and angles affect haemodynamic forces.",
  },
];

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS  = "'Helvetica Neue', Arial, sans-serif";
const RED   = "#c0392b";

export default function ResearchOverlay() {
  const { heartFocused, setHeartFocused } = useNavigation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!heartFocused) { setVisible(false); return; }
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, [heartFocused]);

  if (!heartFocused) return null;

  return (
    <div style={{
      position: "fixed", inset: 0,
      display: "flex", justifyContent: "center", alignItems: "flex-start",
      zIndex: 150,
      pointerEvents: visible ? "auto" : "none",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.4s ease",
      overflowY: "auto",
      padding: "32px 16px 48px",
    }}>
      {/* Close */}
      <button
        onClick={() => setHeartFocused(false)}
        style={{
          position: "fixed", top: 16, right: 24,
          background: "none", border: "none",
          color: "rgba(255,255,255,0.65)", fontSize: "13px",
          cursor: "pointer", letterSpacing: "0.08em",
          fontFamily: SANS, zIndex: 151,
        }}
      >
        ✕ Close
      </button>

      {/* A4 paper */}
      <div style={{
        width: "min(760px, 95vw)",
        background: "#fff",
        boxShadow: "0 8px 48px rgba(0,0,0,0.55)",
        fontFamily: SERIF,
        color: "#111",
        lineHeight: 1.65,
        marginTop: "8px",
      }}>

        {/* Journal header band */}
        <div style={{
          borderBottom: `2.5px solid ${RED}`,
          padding: "10px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div>
            <span style={{
              fontFamily: SANS, fontSize: "13px", fontWeight: 700,
              color: RED, textTransform: "uppercase", letterSpacing: "0.04em",
            }}>
              Computational Biomechanics
            </span>
            <span style={{
              fontFamily: SANS, fontSize: "10px", color: "#999", marginLeft: "12px",
              letterSpacing: "0.06em",
            }}>
              RESEARCH ARTICLE
            </span>
          </div>
          <span style={{ fontFamily: SANS, fontSize: "10px", color: "#999" }}>
            Simula Research Laboratory · 2019–2023
          </span>
        </div>

        <div style={{ padding: "28px 40px 0" }}>

          {/* Title + authors */}
          <h1 style={{
            fontFamily: SERIF,
            fontSize: "1.65rem",
            fontWeight: 700,
            lineHeight: 1.22,
            color: "#111",
            marginBottom: "14px",
          }}>
            Numerical Methods for Cardiovascular Blood Flow in Patient-Specific Geometries
          </h1>

          <p style={{ fontSize: "0.875rem", color: "#333", marginBottom: "3px" }}>
            <strong>H. Kjeldsberg</strong>
          </p>
          <p style={{
            fontSize: "0.75rem", color: "#777", fontStyle: "italic",
            marginBottom: "18px", fontFamily: SANS,
          }}>
            Simula Research Laboratory, Oslo, Norway
          </p>

          <hr style={{ border: "none", borderTop: "0.5px solid #ddd", marginBottom: "14px" }} />

          {/* Abstract — full width */}
          <div style={{ marginBottom: "20px" }}>
            <span style={{
              fontFamily: SANS, fontSize: "8px", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: RED, display: "block", marginBottom: "6px",
            }}>
              Abstract
            </span>
            <p style={{ fontSize: "0.82rem", lineHeight: 1.72, color: "#333", textAlign: "justify" }}>
              Cardiovascular diseases remain the leading cause of mortality globally. This work develops
              open-source computational pipelines for patient-specific haemodynamic simulation of
              intracranial aneurysms. Using automated geometry construction, finite element discretisation
              of the incompressible Navier–Stokes equations, and pulsatile boundary conditions derived
              from phase-contrast MRI, we study wall shear stress distributions predictive of aneurysm
              rupture risk.
            </p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #ddd", marginBottom: "20px" }} />

          {/* Two-column body */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "0 36px",
            marginBottom: "20px",
          }}>
            {/* Left: Introduction */}
            <div>
              <h2 style={{
                fontFamily: SANS, fontSize: "8.5px", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#333",
                marginBottom: "10px", paddingBottom: "4px", borderBottom: "1px solid #eee",
              }}>
                Introduction
              </h2>
              <p style={{ fontSize: "0.8rem", marginBottom: "10px", color: "#333", lineHeight: 1.72, textAlign: "justify" }}>
                Intracranial aneurysms affect 3–5% of the general population. Upon rupture, they cause
                subarachnoid haemorrhage carrying a mortality rate above 40%. The haemodynamic
                environment — in particular wall shear stress and oscillatory shear index — is strongly
                implicated in both aneurysm growth and rupture.
              </p>
              <p style={{ fontSize: "0.8rem", color: "#333", lineHeight: 1.72, textAlign: "justify" }}>
                Patient-specific computational fluid dynamics (CFD) enables non-invasive investigation
                of these forces from routinely acquired medical imaging, without catheterisation or
                ionising dose beyond the original diagnostic scan.
              </p>
            </div>

            {/* Right: Use Case */}
            <div>
              <h2 style={{
                fontFamily: SANS, fontSize: "8.5px", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#333",
                marginBottom: "10px", paddingBottom: "4px", borderBottom: "1px solid #eee",
              }}>
                Use Case: Blood Flow in the Cardiovascular System
              </h2>
              <p style={{ fontSize: "0.8rem", marginBottom: "10px", color: "#333", lineHeight: 1.72, textAlign: "justify" }}>
                The heart drives approximately 5 L/min of blood through an intricate vascular tree. At
                each bifurcation and bend, local geometry governs whether flow remains laminar or
                transitions to complex, potentially pathological patterns. The internal carotid artery —
                the primary conduit to the brain — is a clinically important site where curvature and
                cross-sectional variation directly modulate the inflow jet impingement angle into
                aneurysm sacs.
              </p>
              <p style={{ fontSize: "0.8rem", color: "#333", lineHeight: 1.72, textAlign: "justify" }}>
                Blood is modelled as an incompressible Newtonian fluid
                (ρ = 1060 kg/m³, μ = 0.00345 Pa·s). Pulsatile inlet waveforms are prescribed from
                phase-contrast MRI, and the domain evolves over several cardiac cycles until
                cycle-to-cycle convergence is achieved.
              </p>
            </div>
          </div>

          {/* Publications — two-column grid */}
          <hr style={{ border: "none", borderTop: "1px solid #ddd", marginBottom: "20px" }} />

          <h2 style={{
            fontFamily: SANS, fontSize: "8.5px", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "#333",
            marginBottom: "18px",
          }}>
            Selected Publications
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px 36px",
            paddingBottom: "36px",
          }}>
            {PAPERS.map((p) => (
              <div key={p.ref} style={{
                borderLeft: `2px solid ${RED}`,
                paddingLeft: "12px",
              }}>
                <p style={{
                  fontSize: "0.77rem", fontWeight: 700, color: "#111",
                  lineHeight: 1.4, marginBottom: "4px", fontFamily: SERIF,
                }}>
                  [{p.ref}]&nbsp;{p.title}
                </p>
                <p style={{
                  fontSize: "0.7rem", color: "#666", marginBottom: "6px", fontFamily: SANS,
                }}>
                  {p.authors} — <em>{p.journal}</em> ({p.year})
                </p>
                <p style={{
                  fontSize: "0.72rem", color: "#444", lineHeight: 1.62,
                  marginBottom: "6px", fontFamily: SERIF,
                }}>
                  {p.summary}
                </p>
                <a
                  href={p.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.65rem", color: RED, textDecoration: "none", fontFamily: SANS }}
                >
                  ↗ {p.doiShort}
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
