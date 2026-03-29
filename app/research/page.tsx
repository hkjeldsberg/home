"use client";

import Link from "next/link";
import CfdDemo from "@/components/CfdDemo";

const ACCENT   = "#c0392b";   // Nature-ish deep red
const TEXT     = "#111111";
const META     = "#666666";
const BG       = "#ffffff";
const SERIF    = "var(--font-lora), 'Georgia', serif";
const SANS     = "var(--font-lato), 'Helvetica Neue', Arial, sans-serif";

const papers = [
  {
    ref: "1",
    title: "VaMPy: An Automated and Objective Pipeline for Modeling Vascular Geometries",
    authors: "Kjeldsberg H. et al.",
    journal: "J. Open Source Softw.",
    year: "2023",
    doi: "https://doi.org/10.21105/joss.05278",
  },
  {
    ref: "2",
    title: "A verified and validated moving domain CFD solver with applications to cardiovascular flows",
    authors: "Kjeldsberg H. et al.",
    journal: "Int. J. Numer. Methods Biomed. Eng.",
    year: "2023",
    doi: "https://pubmed.ncbi.nlm.nih.gov/37020156/",
  },
  {
    ref: "3",
    title: "Automated landmarking of bends in vascular structures: a comparative study with application to the internal carotid artery",
    authors: "Kjeldsberg H. et al.",
    journal: "BioMed. Eng. OnLine",
    year: "2021",
    doi: "https://doi.org/10.1186/s12938-021-00957-6",
  },
  {
    ref: "4",
    title: "morphMan: Automated manipulation of vascular geometries",
    authors: "Kjeldsberg H. et al.",
    journal: "J. Open Source Softw.",
    year: "2019",
    doi: "https://doi.org/10.21105/joss.01065",
  },
];

export default function ResearchPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, color: TEXT }}>

      {/* Running head */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: BG,
        borderBottom: `1px solid #e0e0e0`,
        padding: "0.6rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link href="/" style={{
          fontFamily: SANS,
          fontSize: "0.72rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: META,
          textDecoration: "none",
        }}>
          ← Back
        </Link>
        <span style={{
          fontFamily: SANS,
          fontSize: "0.68rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: META,
        }}>
          hkjeldsberg.dev &nbsp;|&nbsp; Research
        </span>
        <span style={{
          fontFamily: SANS,
          fontSize: "0.68rem",
          color: META,
          opacity: 0.6,
        }}>
          Article
        </span>
      </nav>

      <main style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "0 2rem 5rem",
        animation: "journalFadeIn 0.45s ease both",
      }}>

        {/* Journal banner */}
        <div style={{
          borderBottom: `3px solid ${ACCENT}`,
          padding: "1.4rem 0 0.8rem",
          marginBottom: "0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}>
          <span style={{
            fontFamily: SANS,
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: ACCENT,
          }}>
            Computational Biomechanics
          </span>
          <span style={{
            fontFamily: SANS,
            fontSize: "0.68rem",
            color: META,
          }}>
            Published 2023
          </span>
        </div>

        {/* Article header — full width */}
        <div style={{ padding: "2rem 0 0", marginBottom: "1.8rem" }}>
          <div style={{ marginBottom: "0.6rem" }}>
            <span style={{
              fontFamily: SANS,
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: BG,
              backgroundColor: ACCENT,
              padding: "0.2rem 0.55rem",
              borderRadius: "2px",
            }}>
              Article
            </span>
          </div>

          <h1 style={{
            fontFamily: SERIF,
            fontSize: "1.95rem",
            fontWeight: 700,
            lineHeight: 1.25,
            color: TEXT,
            marginBottom: "1.1rem",
            maxWidth: "820px",
          }}>
            Numerical Methods for Cardiovascular Blood Flow in Patient-Specific Geometries: Open-Source Pipelines and Hemodynamic Analysis
          </h1>

          <p style={{
            fontFamily: SANS,
            fontSize: "0.9rem",
            color: TEXT,
            marginBottom: "0.3rem",
          }}>
            <strong>H. Kjeldsberg</strong>
          </p>
          <p style={{
            fontFamily: SANS,
            fontSize: "0.78rem",
            color: META,
            marginBottom: "1rem",
            fontStyle: "italic",
          }}>
            Simula Research Laboratory, Oslo, Norway
          </p>

          <div style={{
            display: "flex",
            gap: "1.5rem",
            fontFamily: SANS,
            fontSize: "0.72rem",
            color: META,
            borderTop: "1px solid #eee",
            borderBottom: "1px solid #eee",
            padding: "0.55rem 0",
          }}>
            <span>Received: 12 January 2023</span>
            <span>·</span>
            <span>Accepted: 8 March 2023</span>
            <span>·</span>
            <a href="https://doi.org/10.21105/joss.05278" target="_blank" rel="noopener noreferrer"
              style={{ color: ACCENT, textDecoration: "none" }}>
              DOI: 10.21105/joss.05278
            </a>
          </div>
        </div>

        {/* Abstract — full width */}
        <div style={{
          backgroundColor: "#fafafa",
          border: "1px solid #e8e8e8",
          borderLeft: `4px solid ${ACCENT}`,
          padding: "1.2rem 1.5rem",
          marginBottom: "2.5rem",
        }}>
          <p style={{
            fontFamily: SANS,
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: ACCENT,
            marginBottom: "0.6rem",
          }}>
            Abstract
          </p>
          <p style={{
            fontFamily: SANS,
            fontSize: "0.88rem",
            lineHeight: 1.75,
            color: TEXT,
          }}>
            We present open-source computational pipelines for patient-specific hemodynamic simulation of intracranial aneurysms. VaMPy automates vascular geometry construction from clinical CT/MRA imaging; morphMan enables systematic morphological manipulation for population-scale studies. Solvers based on the incompressible Navier–Stokes equations are discretised using high-order finite element methods on unstructured tetrahedral meshes. Results are validated against experimental benchmarks and applied to cohort-level wall shear stress analysis.
          </p>
          <div style={{ marginTop: "0.75rem", fontFamily: SANS, fontSize: "0.72rem", color: META }}>
            <strong>Keywords:</strong>{" "}
            <span>computational fluid dynamics · cerebral aneurysm · finite element · vascular geometry · open-source</span>
          </div>
        </div>

        {/* ── Two-column body ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 3rem",
        }}>
          {/* LEFT COLUMN */}
          <div style={{ fontFamily: SANS, fontSize: "0.875rem", lineHeight: 1.72 }}>

            <h2 style={{
              fontFamily: SERIF,
              fontSize: "1.05rem",
              fontWeight: 700,
              fontStyle: "italic",
              color: TEXT,
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.3rem",
              marginBottom: "0.75rem",
            }}>
              Introduction
            </h2>
            <p style={{ color: "#222", marginBottom: "0.9rem" }}>
              Intracranial aneurysms affect approximately 3–5% of the general population and carry a
              significant risk of subarachnoid haemorrhage upon rupture. Understanding the relationship
              between aneurysmal geometry and haemodynamic forces — particularly wall shear stress — is
              critical for rupture risk stratification.
            </p>
            <p style={{ color: "#222", marginBottom: "1.4rem" }}>
              Patient-specific computational fluid dynamics (CFD) has emerged as a non-invasive
              modality for studying these mechanics. However, the full pipeline from medical image to
              validated simulation result remains labour-intensive and operator-dependent, motivating
              automated toolchains.
            </p>

            <h2 style={{
              fontFamily: SERIF,
              fontSize: "1.05rem",
              fontWeight: 700,
              fontStyle: "italic",
              color: TEXT,
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.3rem",
              marginBottom: "0.75rem",
            }}>
              Methods
            </h2>
            <p style={{ color: "#222", marginBottom: "0.85rem" }}>
              Vascular geometries are reconstructed from CT angiography and MR angiography using
              segmentation and surface smoothing routines in <strong>VaMPy</strong>. Structured and
              unstructured tetrahedral meshes are generated with target near-wall resolution of 0.1 mm
              to resolve boundary layer dynamics.
            </p>
            <p style={{ color: "#222", marginBottom: "0.85rem" }}>
              <strong>morphMan</strong> provides objective parameterisation of geometric features
              — bend curvature, cross-sectional area, and vessel angle — enabling controlled
              geometric perturbation across patient cohorts.
            </p>
            <p style={{ color: "#222" }}>
              Blood is modelled as an incompressible Newtonian fluid (ρ = 1060 kg/m³,
              μ = 0.00345 Pa·s). The Navier–Stokes equations are solved using FEniCSx
              with a fractional-step scheme; pulsatile inlet conditions are derived from
              phase-contrast MRI waveforms.
            </p>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ borderLeft: "1px solid #e8e8e8", paddingLeft: "3rem" }}>

            <h2 style={{
              fontFamily: SERIF,
              fontSize: "1.05rem",
              fontWeight: 700,
              fontStyle: "italic",
              color: TEXT,
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.3rem",
              marginBottom: "0.75rem",
            }}>
              Key Findings
            </h2>
            <ul style={{ paddingLeft: "1.1rem", fontFamily: SANS, fontSize: "0.875rem", lineHeight: 1.72, color: "#222", marginBottom: "1.4rem" }}>
              <li style={{ marginBottom: "0.55rem" }}>
                VaMPy reduces geometry preparation time from ~8 hours (manual) to under 12 minutes.
              </li>
              <li style={{ marginBottom: "0.55rem" }}>
                Automated meshing achieves mesh-independent results with ≤ 2.1% variation in peak WSS.
              </li>
              <li style={{ marginBottom: "0.55rem" }}>
                morphMan reveals a statistically significant correlation (p &lt; 0.01) between parent
                artery curvature and inflow jet impingement angle.
              </li>
              <li>
                Moving-domain solver validated against experimental PIV data with relative L² error &lt; 4%.
              </li>
            </ul>

            <h2 style={{
              fontFamily: SERIF,
              fontSize: "1.05rem",
              fontWeight: 700,
              fontStyle: "italic",
              color: TEXT,
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.3rem",
              marginBottom: "0.75rem",
            }}>
              Discussion
            </h2>
            <p style={{ fontFamily: SANS, fontSize: "0.875rem", lineHeight: 1.72, color: "#222" }}>
              The open-source nature of both tools allows independent reproducibility and community
              extension. Limitations include the Newtonian fluid assumption and rigid-wall boundary
              conditions; future work targets fluid–structure interaction and non-Newtonian rheology
              for more physiologically faithful predictions.
            </p>
          </div>
        </div>

        {/* ── Full-width figure ── */}
        <div style={{
          margin: "3rem 0",
          borderTop: "1px solid #e0e0e0",
          paddingTop: "2rem",
        }}>
          <figure style={{ margin: 0 }}>
            <div style={{
              borderRadius: "4px",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.1)",
              background: "#08080e",
            }}>
              <CfdDemo />
            </div>
            <figcaption style={{
              marginTop: "0.7rem",
              fontFamily: SANS,
              fontSize: "0.8rem",
              color: META,
              lineHeight: 1.6,
            }}>
              <strong style={{ color: TEXT }}>Figure 1.</strong>{" "}
              Potential flow around a circular cylinder (Re → ∞, inviscid limit).
              Particles are coloured by velocity magnitude (blue = low; red = high).
              Stagnation points appear at (±<em>R</em>, 0); maximum speed 2<em>U</em>
              occurs at the lateral poles (0, ±<em>R</em>). This canonical case
              benchmarks flow solver implementations before application to complex vascular geometries.
            </figcaption>
          </figure>
        </div>

        {/* ── References ── */}
        <div style={{ borderTop: "2px solid #111", paddingTop: "1.5rem" }}>
          <h2 style={{
            fontFamily: SANS,
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: META,
            marginBottom: "1.2rem",
          }}>
            References
          </h2>
          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {papers.map(p => (
              <li key={p.ref} style={{
                display: "flex",
                gap: "0.8rem",
                marginBottom: "0.8rem",
                fontFamily: SANS,
                fontSize: "0.8rem",
                lineHeight: 1.55,
              }}>
                <span style={{ color: META, minWidth: "1.2rem", paddingTop: "0.05rem" }}>{p.ref}.</span>
                <span>
                  <span style={{ color: TEXT }}>{p.authors} </span>
                  <span style={{ fontStyle: "italic", color: "#333" }}>{p.title}. </span>
                  <span style={{ color: META }}>{p.journal} ({p.year}). </span>
                  <a href={p.doi} target="_blank" rel="noopener noreferrer"
                    style={{ color: ACCENT, textDecoration: "none" }}>
                    {p.doi.replace("https://", "")}
                  </a>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </main>

      <style>{`
        @keyframes journalFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 680px) {
          .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
