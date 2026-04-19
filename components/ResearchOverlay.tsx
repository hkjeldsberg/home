"use client";


import { useState, useEffect } from "react";
import { useNavigation } from "@/context/NavigationContext";
const THESES = [
  {
    ref: "1",
    title: "The Clot Thickens: Investigating Thrombus Formation Through Left Atrial Flow Simulations",
    authors: "Kjeldsberg H.A.",
    journal: "PhD Thesis, University of Oslo",
    year: "2025",
    doi: "https://nva.sikt.no/registration/0199762c5785-71781d8f-0dba-4b7d-af59-306cab04f397",
    doiShort: "nva.sikt.no/registration/019c9463d52b",
    summary:
      "Doctoral dissertation developing and validating computational fluid dynamics tools for patient-specific left atrial simulations, investigating the impact of wall motion, boundary conditions, and morphological parameters on hemodynamic predictors of thrombus formation and stroke risk in atrial fibrillation patients.",
  },
  {
    ref: "2",
    title: "Investigating the Interaction Between Morphology of the Anterior Bend and Aneurysm Initiation",
    authors: "Kjeldsberg H.A.",
    journal: "Master's Thesis, University of Oslo",
    year: "2018",
    doiShort: "nva.sikt.no/registration/0199762c5785",
    doi: "https://nva.sikt.no/registration/019c9463d52b-45615f31-c695-4ac6-ab45-b9ac4da62669",
    summary:
      "Master's thesis using computational fluid dynamics and automated vascular geometry manipulation to study how the morphology of the anterior bend of the internal carotid artery siphon correlates with aneurysm initiation sites, laying the groundwork for the morphMan tool.",
  },
]

const PAPERS = [
  {
    ref: "1",
    title: "Beyond CHA₂DS₂-VASc: Hemodynamic and Morphologic Discriminants for Thrombus Formation and Stroke in Atrial Fibrillation Patients",
    authors: "Kjeldsberg H.A. et al.",
    journal: "Ann. Biomed. Eng.",
    year: "2026",
    doi: "https://doi.org/10.1007/s10439-026-04039-3",
    doiShort: "doi.org/10.1007/s10439-026-04039-3",
    summary:
      "Investigates whether CFD-derived hemodynamic and morphometric parameters of the left atrium can supplement the CHA₂DS₂-VASc clinical score for predicting thrombus formation and stroke risk, analysing 40 patient-specific AF models with physiologically realistic atrial wall motion.",
  },
  {
    ref: "2",
    title: "Estimation of Inlet Flow Rate in Simulations of Left Atrial Flows: A Proposed Optimized and Reference-Based Algorithm with Application to Sinus Rhythm and Atrial Fibrillation",
    authors: "Kjeldsberg H.A. et al.",
    journal: "J. Biomech.",
    year: "2025",
    doi: "https://doi.org/10.1016/j.jbiomech.2025.112594",
    doiShort: "doi.org/10.1016/j.jbiomech.2025.112594",
    summary:
      "Proposes two new flow-rate estimation models for left atrial CFD—based on mitral valve orifice area and atrial volume—that reduce total model error to 16–22%, substantially outperforming the three commonly used reference models (37–71% error).",
  },
  {
    ref: "3",
    title: "Impact of Left Atrial Wall Motion Assumptions in Fluid Simulations on Proposed Predictors of Thrombus Formation",
    authors: "Kjeldsberg H.A. et al.",
    journal: "Int. J. Numer. Methods Biomed. Eng.",
    year: "2024",
    doi: "https://doi.org/10.1002/cnm.3825",
    doiShort: "doi.org/10.1002/cnm.3825",
    summary:
      "Presents an open-source left atrial simulation framework and quantifies how three wall-motion assumptions—rigid walls, semi-generic motion, and patient-specific motion—alter hemodynamic predictors of thrombus risk in atrial fibrillation patients.",
  },
  {
    ref: "4",
    title: "VaMPy: An Automated and Objective Pipeline for Modeling Vascular Geometries",
    authors: "Kjeldsberg H.A. et al.",
    journal: "J. Open Source Softw.",
    year: "2023",
    doi: "https://doi.org/10.21105/joss.05278",
    doiShort: "doi.org/10.21105/joss.05278",
    summary:
      "Presents VaMPy, an open-source pipeline that reduces vascular geometry preparation from ~8 hours to under 12 minutes by automating segmentation, surface smoothing, mesh generation, boundary condition assignment, and post-processing of hemodynamic metrics from clinical CT/MRA data.",
  },
  {
    ref: "5",
    title: "A Verified and Validated Moving Domain Computational Fluid Dynamics Solver with Applications to Cardiovascular Flows",
    authors: "Kjeldsberg H.A. et al.",
    journal: "Int. J. Numer. Methods Biomed. Eng.",
    year: "2023",
    doi: "https://doi.org/10.1002/cnm.3703",
    doiShort: "doi.org/10.1002/cnm.3703",
    summary:
      "Develops and rigorously verifies and validates an open-source finite-element CFD solver for moving-domain cardiovascular flows, enabling physiologically realistic simulations of vessels and cardiac chambers with deforming walls.",
  },
  {
    ref: "6",
    title: "Sensitivity Analysis of Left Atrial Wall Modeling Approaches and Inlet/Outlet Boundary Conditions in Fluid Simulations to Predict Thrombus Formation",
    authors: "Albors C. et al.",
    journal: "Lect. Notes Comput. Sci. (STACOM 2022)",
    year: "2022",
    doi: "https://doi.org/10.1007/978-3-031-23443-9_17",
    doiShort: "doi.org/10.1007/978-3-031-23443-9_17",
    summary:
      "Benchmarks different left atrial wall-motion models and inlet/outlet boundary condition strategies in CFD simulations, comparing their influence on thrombogenic risk indicators for both a healthy control and an atrial fibrillation patient.",
  },
  {
    ref: "7",
    title: "A Computational Study of Flow Instabilities in Aneurysms",
    authors: "Berre N. et al.",
    journal: "Simula SpringerBriefs Comput. (Simula Summer School 2021)",
    year: "2022",
    doi: "https://doi.org/10.1007/978-3-031-05164-7_6",
    doiShort: "doi.org/10.1007/978-3-031-05164-7_6",
    summary:
      "Applies Reynolds–Orr instability analysis to quantify the most unstable flow perturbations in four patient-specific intracranial aneurysm geometries, finding physiologically plausible flow instabilities in all cases and linking them to potential mechanisms of aneurysm growth and rupture.",
  },
  {
    ref: "8",
    title: "Chapter 2: Smittestopp for Android and iOS",
    authors: "Florvaag P.M. et al.",
    journal: "Simula SpringerBriefs Comput. (Smittestopp — A Case Study on Digital Contact Tracing)",
    year: "2022",
    doi: "https://doi.org/10.1007/978-3-031-05466-2_2",
    doiShort: "doi.org/10.1007/978-3-031-05466-2_2",
    summary:
      "Describes the design and implementation of the Smittestopp COVID-19 contact-tracing mobile app for Android and iOS, covering Bluetooth-based proximity detection, privacy architecture, and lessons learned during Norway's national deployment.",
  },
  {
    ref: "9",
    title: "Automated Landmarking of Bends in Vascular Structures: A Comparative Study with Application to the Internal Carotid Artery",
    authors: "Kjeldsberg H.A. et al.",
    journal: "Biomed. Eng. Online",
    year: "2021",
    doi: "https://doi.org/10.1186/s12938-021-00957-6",
    doiShort: "doi.org/10.1186/s12938-021-00957-6",
    summary:
      "Compares automated algorithms for detecting and landmarking curvature features (bends) in patient-specific internal carotid arteries, providing an objective and reproducible basis for morphological characterisation in large-scale CFD studies.",
  },
  {
    ref: "10",
    title: "A Framework for Automated and Objective Modification of Tubular Structures: Application to the Internal Carotid Artery",
    authors: "Bergersen A.W. et al.",
    journal: "Int. J. Numer. Methods Biomed. Eng.",
    year: "2020",
    doi: "https://doi.org/10.1002/cnm.3330",
    doiShort: "doi.org/10.1002/cnm.3330",
    summary:
      "Presents a framework for parameterized, automated manipulation of tubular vascular geometries applied to the internal carotid artery, enabling controlled parametric studies of how individual morphological features influence hemodynamics.",
  },
  {
    ref: "11",
    title: "morphMan: Automated Manipulation of Vascular Geometries",
    authors: "Kjeldsberg H.A. et al.",
    journal: "J. Open Source Softw.",
    year: "2019",
    doi: "https://doi.org/10.21105/joss.01065",
    doiShort: "doi.org/10.21105/joss.01065",
    summary:
      "Introduces morphMan, an open-source Python library for automated and reproducible manipulation of vascular surface models, enabling controlled parametric studies of how vessel shape—such as bifurcation angles, tortuosity, and stenosis degree—influences blood flow.",
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

  const VideoPlayer = () => {
    return (
      <figure className="mt-12 border-t border-gray-100 pt-8 max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-lg shadow-md border border-gray-200 bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-auto block"
          >
            <source src="/gifs/atrium.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <figcaption style={{paddingTop: '.5rem', paddingBottom:'.5rem'}} className="mt-4 pt-4 text-justify font-serif text-sm leading-relaxed text-gray-800">
          <span className="font-bold">Figure 1:</span> High-fidelity simulation of patient-specific left atrial hemodynamics. 
          From left to right: the volumetric depiction of the blood residence time and the corresponding velocity field 
          evolving over four cardiac cycles. The computational model is avaiable from this{" "}
          <a 
            href="https://doi.org/10.5281/zenodo.13829891" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-700 decoration-red-300 underline-offset-4 hover:text-red-900 transition-colors"
          >
            open access dataset
          </a>.
        </figcaption>
      </figure>
    );
  };



  const link = (title:string,href:string) => (
    <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ fontSize: ".8rem", color: RED, textDecoration: "none", fontFamily: SANS}}
 >
  {title}
  </a>
  )

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
              Computational Physiology
            </span>
            <span style={{
              fontFamily: SANS, fontSize: "10px", color: "#999", marginLeft: "12px",
              letterSpacing: "0.06em",
            }}>
              RESEARCH PORTFOLIO
            </span>
          </div>
          <span style={{ fontFamily: SANS, fontSize: "10px", color: "#999" }}>
            UiO · Simula Research Laboratory · 2016–2026
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
            Computational Data Engineering for Medical Image-Based Hemodynamics
          </h1>

          <p style={{ fontSize: "0.875rem", color: "#333", marginBottom: "3px" }}>
            <strong>Henrik A. Kjeldsberg<sup>1,2</sup></strong>
          </p>
          <p style={{
            fontSize: "0.75rem", color: "#777", fontStyle: "italic",
            marginBottom: "18px", fontFamily: SANS,
          }}>
            <sup>1</sup>Department of Computational Physiology, Simula Research Laboratory, Oslo, Norway<br />
            <sup>2</sup>Department of Mathematics, University of Oslo, Oslo, Norway
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
            I specialize in the Data Engineering of human physiology. My research focuses on building automated, validated pipelines that translate raw medical imaging (CT/MRA) into structured, high-fidelity datasets for Computational Fluid Dynamics (CFD). By evolving my work from neurovascular stability (Brain Aneurysms) to cardiovascular mechanics (Atrial Fibrillation), I have developed a methodology centered on objective morphometry and statistical discriminants. My objective is to replace manual clinical workflows with physics-informed digital twins to move risk assessment "Beyond CHA₂DS₂-VASc."
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
                Neurovascular Data Foundations
              </h2>
              <p style={{ fontSize: "0.8rem", marginBottom: "10px", color: "#333", lineHeight: 1.72, textAlign: "justify" }}>
              My journey began with the "Data Cleaning" of the human vascular tree. While studying Intracranial Aneurysms, I identified that the lack of standardized anatomical features prevented large-scale statistical analysis.
              </p>
              <p style={{ fontSize: "0.8rem", color: "#333", lineHeight: 1.72, textAlign: "justify" }}>
              To solve this, I engineered {link("morphMan", "https://github.com/KVSlab/morphMan")} and {link("VamPy", "https://github.com/KVSlab/VaMPy")} , two Python-based ETL (Extract, Transform, Load) tools for medical surfaces. This allowed me to automate the landmarking of vascular curves in the internal carotid artery, proving statistically that specific geometric features correlate with aneurysm initiation.
              </p>
            </div>

            {/* Right: Use Case */}
            <div>
              <h2 style={{
                fontFamily: SANS, fontSize: "8.5px", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#333",
                marginBottom: "10px", paddingBottom: "4px", borderBottom: "1px solid #eee",
              }}>
                Cardiovascular Statistics
              </h2>
              <p style={{ fontSize: "0.8rem", marginBottom: "10px", color: "#333", lineHeight: 1.72, textAlign: "justify" }}>
              Transitioning to the Heart during my PhD at Simula Research Laboratory, the data complexity scaled significantly. Simulating the left atrium involves high-dimensional uncertainty, from deforming wall motion to stochastic inlet flows.
              </p>
              <p style={{ fontSize: "0.8rem", color: "#333", lineHeight: 1.72, textAlign: "justify" }}>
              I developed the validated moving-domain CFD solver {link("OasisMove", "https://github.com/KVSlab/OasisMove")} that treats the heart as a dynamic data source. By applying sensitivity analysis to these models, my findings show that hemodynamic discriminants provide a statistically superior prediction of thrombus risk compared to standard clinical scores.
              </p>
            </div>
          </div>

          <VideoPlayer/>

          {/* Theses — two-column grid */}
          <hr style={{ border: "none", borderTop: "1px solid #ddd", marginBottom: "20px" }} />

          <h2 style={{
            fontFamily: SANS, fontSize: "8.5px", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "#333",
            marginBottom: "18px",
          }}>
            List of Theses
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px 36px",
            paddingBottom: "36px",
          }}>
            {THESES.map((p) => (
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

          {/* Publications — two-column grid */}
          <hr style={{ border: "none", borderTop: "1px solid #ddd", marginBottom: "20px" }} />

          <h2 style={{
            fontFamily: SANS, fontSize: "8.5px", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "#333",
            marginBottom: "18px",
          }}>
            List of Publications
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
