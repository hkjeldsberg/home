"use client";

import Link from "next/link";

const BG = "#f5f5f7";
const BG_CARD = "#ffffff";
const TEXT_PRIMARY = "#1d1d1f";
const TEXT_SECONDARY = "#6e6e73";
const ACCENT = "#007aff";
const SYSTEM_FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  Active:           { label: "Active",           color: "#1d8348", bg: "rgba(29,131,72,0.10)"  },
  Discontinued:     { label: "Discontinued",     color: "#888",    bg: "rgba(0,0,0,0.06)"      },
  "In Development": { label: "In Development",   color: ACCENT,    bg: "rgba(0,122,255,0.10)"  },
};

const apps: {
  name: string;
  tagline: string;
  description: string;
  platform: string;
  stack: string[];
  status: string;
  link?: string;
}[] = [
  {
    name: "Pomp",
    tagline: "Fuel price comparison",
    description: "Aggregates live fuel prices from stations across Norway, helping drivers find the cheapest pump nearby. Location-aware with map and list views.",
    platform: "iOS · Android",
    stack: ["React Native", "TypeScript", "Expo"],
    status: "Active",
  },
  {
    name: "Smittestopp",
    tagline: "COVID-19 contact tracing",
    description: "Official Norwegian contact tracing app developed for FHI during the pandemic. Used Bluetooth proximity detection to log potential exposure events without storing personal data.",
    platform: "iOS · Android",
    stack: ["React Native", "TypeScript", "Bluetooth LE"],
    status: "Discontinued",
  },
  {
    name: "Zleep",
    tagline: "Sleep tracking & analysis",
    description: "Monitors sleep patterns via device motion and audio sensors. Provides nightly analysis and personalised recommendations to improve sleep quality.",
    platform: "iOS · Android",
    stack: ["React Native", "TypeScript"],
    status: "Discontinued",
  },
];

export default function MobilePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, fontFamily: SYSTEM_FONT }}>

      {/* iOS-style navigation bar */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(245,245,247,0.85)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "0.5px solid rgba(0,0,0,0.12)",
        padding: "0.9rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link href="/" style={{
          fontSize: "0.92rem",
          color: ACCENT,
          textDecoration: "none",
          fontWeight: 400,
          display: "flex",
          alignItems: "center",
          gap: "0.2rem",
        }}>
          ‹ Kjeldsberg
        </Link>
        <span style={{
          fontSize: "1rem",
          fontWeight: 600,
          color: TEXT_PRIMARY,
          letterSpacing: "-0.01em",
        }}>
          Mobile
        </span>
        <span style={{ width: "80px" }} /> {/* spacer */}
      </nav>

      {/* Main */}
      <main style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem 1.25rem 5rem",
        animation: "iosFadeIn 0.4s ease 0.05s both",
      }}>

        {/* Page title */}
        <h1 style={{
          fontSize: "2rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: TEXT_PRIMARY,
          marginBottom: "0.35rem",
        }}>
          Mobile Apps
        </h1>
        <p style={{
          fontSize: "0.92rem",
          color: TEXT_SECONDARY,
          marginBottom: "2rem",
          lineHeight: 1.5,
        }}>
          Apps developed for iOS and Android.
        </p>

        {/* App cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {apps.map((app, i) => {
            const s = statusConfig[app.status] ?? statusConfig["Discontinued"];
            return (
              <div key={i} style={{
                backgroundColor: BG_CARD,
                borderRadius: "16px",
                padding: "1.25rem 1.4rem",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06)",
              }}>
                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                  <div>
                    <h3 style={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: TEXT_PRIMARY,
                      letterSpacing: "-0.01em",
                      marginBottom: "0.1rem",
                    }}>
                      {app.name}
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: TEXT_SECONDARY }}>{app.tagline}</p>
                  </div>
                  <span style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: s.color,
                    backgroundColor: s.bg,
                    borderRadius: "20px",
                    padding: "0.2rem 0.6rem",
                    whiteSpace: "nowrap",
                  }}>
                    {s.label}
                  </span>
                </div>

                {/* Divider */}
                <div style={{ height: "0.5px", backgroundColor: "rgba(0,0,0,0.08)", margin: "0.85rem 0" }} />

                {/* Description */}
                <p style={{
                  fontSize: "0.88rem",
                  color: TEXT_SECONDARY,
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                }}>
                  {app.description}
                </p>

                {/* Platform + stack */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                  <span style={{
                    fontSize: "0.72rem",
                    color: TEXT_SECONDARY,
                    fontWeight: 500,
                  }}>
                    {app.platform}
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {app.stack.map(s => (
                      <span key={s} style={{
                        fontSize: "0.68rem",
                        color: ACCENT,
                        backgroundColor: "rgba(0,122,255,0.08)",
                        borderRadius: "6px",
                        padding: "0.18rem 0.5rem",
                        fontWeight: 500,
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link */}
                {app.link && (
                  <a href={app.link} target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    marginTop: "0.85rem",
                    fontSize: "0.85rem",
                    color: ACCENT,
                    textDecoration: "none",
                    fontWeight: 500,
                  }}>
                    View App →
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <style>{`
        @keyframes iosFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
