"use client";

import { useEffect, useState } from "react";
import { useNavigation } from "@/context/NavigationContext";

const BLUE  = "#007aff";
const SYS   = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif";
const EMAIL = "henrik.kjeldsberg@live.no";

const contacts = [
  { label: "linkedin", value: "linkedin.com/in/hkjeldsberg", href: "https://linkedin.com/in/hkjeldsberg", icon: "in",  iconBg: "#0a66c2" },
  { label: "github",   value: "github.com/hkjeldsberg",      href: "https://github.com/hkjeldsberg",     icon: "gh",  iconBg: "#1a1a1a" },
  { label: "email",    value: EMAIL,                          href: `mailto:${EMAIL}`,                    icon: "@",   iconBg: "#2563eb" },
  { label: "website",  value: "hkjeldsberg.no",              href: "/",                                  icon: "www", iconBg: "#6c3ce1" },
];

const dependencies = [
  { name: "Three.js",             version: "0.183", href: "https://threejs.org" },
  { name: "@react-three/fiber",   version: "9.5",   href: "https://github.com/pmndrs/react-three-fiber" },
  { name: "@react-three/rapier",  version: "2.2",   href: "https://github.com/pmndrs/react-three-rapier" },
  { name: "@react-spring/web",    version: "10.0",  href: "https://react-spring.dev" },
  { name: "Tailwind CSS",         version: "4",     href: "https://tailwindcss.com" },
  { name: "TypeScript",           version: "5",     href: "https://www.typescriptlang.org" },
];

const credits = [
  { label: "Employer",        name: "Kodio",                           href: "https://kodio.no" },
  { label: "Client — NBIM",   name: "nbim.no",                        href: "https://nbim.no" },
  { label: "Research",        name: "Simula Research Laboratory",      href: "https://simula.no" },
  { label: "University",      name: "Mathematical Institute, UiO",     href: "https://www.mn.uio.no/math/" },
];

export default function ContactOverlay() {
  const { iphoneFocused, setIphoneFocused } = useNavigation();
  const [visible, setVisible]   = useState(false);
  const [timeStr, setTimeStr]   = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView]         = useState<"contact" | "credits">("contact");

  useEffect(() => {
    if (!iphoneFocused) { setVisible(false); setView("contact"); return; }
    setTimeStr(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, [iphoneFocused]);

  if (!iphoneFocused) return null;

  // Theme tokens
  const bg      = darkMode ? "#1c1c1e" : "#f2f2f7";
  const card    = darkMode ? "#2c2c2e" : "#fff";
  const text    = darkMode ? "#fff"    : "#000";
  const sub     = darkMode ? "rgba(235,235,245,0.55)" : "rgba(60,60,67,0.5)";
  const divider = darkMode ? "rgba(255,255,255,0.1)"  : "rgba(60,60,67,0.18)";
  const statusBarBg = darkMode ? "#000" : "#fff";

  return (
    <div style={{
      position: "fixed", inset: 0,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 150,
      pointerEvents: visible ? "auto" : "none",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.4s ease",
      padding: "16px",
      fontFamily: SYS,
    }}>
      {/* Back to scene */}
      <button onClick={() => setIphoneFocused(false)} style={{
        background: "none", border: "none",
        color: "rgba(255,255,255,0.4)", fontSize: "12px",
        letterSpacing: "0.08em", textTransform: "uppercase",
        cursor: "pointer", marginBottom: "16px",
      }}>
        ← Back
      </button>

      {/* iPhone frame */}
      <div style={{
        width: "min(360px, 90vw)",
        backgroundColor: "#000",
        borderRadius: "50px",
        padding: "12px",
        boxShadow: "0 0 0 1.5px #3a3a3c, 0 0 0 3px #1c1c1e, 0 30px 80px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.08)",
        position: "relative",
      }}>
        {/* Hardware buttons */}
        <div style={{ position: "absolute", right: "-3px", top: "110px", width: "3px", height: "70px", backgroundColor: "#2a2a2c", borderRadius: "0 2px 2px 0" }} />
        {[60, 110, 155].map((top, i) => (
          <div key={i} style={{ position: "absolute", left: "-3px", top: `${top}px`, width: "3px", height: i === 0 ? "36px" : "56px", backgroundColor: "#2a2a2c", borderRadius: "2px 0 0 2px" }} />
        ))}

        {/* Screen */}
        <div style={{ backgroundColor: bg, borderRadius: "38px", overflow: "hidden", minHeight: "680px", transition: "background-color 0.3s" }}>

          {/* Dynamic Island */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px", paddingBottom: "4px", backgroundColor: "#000" }}>
            <div style={{ width: "120px", height: "34px", backgroundColor: "#000", borderRadius: "20px" }} />
          </div>

          {/* Status bar */}
          <div style={{ backgroundColor: statusBarBg, padding: "4px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background-color 0.3s" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em", color: text }}>{timeStr}</span>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              {[3,5,7,9].map((h, i) => <div key={i} style={{ width: "3px", height: `${h}px`, backgroundColor: text, borderRadius: "1px", opacity: i < 3 ? 1 : 0.3 }} />)}
              <span style={{ fontSize: "11px", marginLeft: "1px", color: text }}>◈</span>
              <div style={{ width: "24px", height: "12px", border: `1.5px solid ${text}`, borderRadius: "3px", padding: "1.5px", display: "flex", alignItems: "center", position: "relative", marginLeft: "1px" }}>
                <div style={{ position: "absolute", right: "-4px", top: "3px", width: "2px", height: "6px", backgroundColor: text, borderRadius: "0 1px 1px 0" }} />
                <div style={{ width: "70%", height: "100%", backgroundColor: "#34c759", borderRadius: "1px" }} />
              </div>
            </div>
          </div>

          {/* iOS nav bar */}
          <div style={{ backgroundColor: card, borderBottom: `0.5px solid ${divider}`, padding: "8px 20px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background-color 0.3s" }}>
            {view === "contact" ? (
              <button onClick={() => setView("credits")} style={{ background: "none", border: "none", color: BLUE, fontSize: "16px", cursor: "pointer", padding: 0 }}>
                ‹ Credits
              </button>
            ) : (
              <button onClick={() => setView("contact")} style={{ background: "none", border: "none", color: BLUE, fontSize: "16px", cursor: "pointer", padding: 0 }}>
                ‹ Card
              </button>
            )}
            <span style={{ fontSize: "15px", fontWeight: 600, color: text }}>
              {view === "contact" ? "Card" : "Credits"}
            </span>
            {/* Dark/light toggle */}
            <button onClick={() => setDarkMode(d => !d)} style={{
              background: "none", border: "none",
              color: BLUE, fontSize: "18px",
              cursor: "pointer", padding: "0 2px",
              lineHeight: 1,
            }}>
              &emsp;&emsp;{darkMode ? "☀︎" : "☾"}
            </button>
          </div>

          {/* Sliding content track */}
          <div style={{ overflow: "hidden" }}>
            <div style={{
              display: "flex",
              transform: view === "credits" ? "translateX(-50%)" : "translateX(0)",
              transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              width: "200%",
            }}>

              {/* ── CONTACT VIEW ── */}
              <div style={{ width: "50%", flexShrink: 0 }}>
                {/* Profile */}
                <div style={{ backgroundColor: bg, padding: "28px 20px 16px", display: "flex", flexDirection: "column", alignItems: "center", transition: "background-color 0.3s" }}>
                  <div style={{
                    width: "80px", height: "80px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #5e5ce6 0%, #bf5af2 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "10px", fontSize: "1.6rem", fontWeight: 600, color: "#fff",
                  }}>HK</div>
                  <h1 style={{ fontSize: "22px", fontWeight: 700, color: text, marginBottom: "3px", letterSpacing: "-0.02em" }}>Henrik Kjeldsberg</h1>
                  <p style={{ fontSize: "13px", color: sub, marginBottom: "16px" }}>Data Engineer · Researcher · Software Developer</p>

                  <div style={{ display: "flex", gap: "12px" }}>
                    {[{ icon: "✉", label: "message" }, { icon: "✈", label: "mail" }].map(btn => (
                      <a key={btn.label} href={`mailto:${EMAIL}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textDecoration: "none" }}>
                        <div style={{ width: "44px", height: "44px", backgroundColor: card, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", color: BLUE, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>{btn.icon}</div>
                        <span style={{ fontSize: "10px", color: BLUE }}>{btn.label}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact fields */}
                <div style={{ backgroundColor: bg, padding: "0 16px", transition: "background-color 0.3s" }}>
                  <div style={{ backgroundColor: card, borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", transition: "background-color 0.3s" }}>
                    {contacts.map((c, i) => (
                      <div key={c.label}>
                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                          style={{ display: "flex", alignItems: "center", padding: "11px 14px", textDecoration: "none", gap: "12px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                            {c.icon}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: "10px", color: sub, textTransform: "lowercase", marginBottom: "1px" }}>{c.label}</p>
                            <p style={{ fontSize: "14px", color: BLUE, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.value}</p>
                          </div>
                          <span style={{ color: sub, fontSize: "11px" }}>›</span>
                        </a>
                        {i < contacts.length - 1 && <div style={{ height: "0.5px", backgroundColor: divider, marginLeft: "58px" }} />}
                      </div>
                    ))}
                  </div>

                  {/* Location */}
                  <div style={{ backgroundColor: card, borderRadius: "12px", padding: "11px 14px", marginTop: "12px", display: "flex", alignItems: "center", gap: "12px", transition: "background-color 0.3s" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#30d158", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>📍</div>
                    <div>
                      <p style={{ fontSize: "10px", color: sub, marginBottom: "1px" }}>location</p>
                      <p style={{ fontSize: "14px", color: text }}>Oslo, Norway</p>
                    </div>
                  </div>
                </div>

                {/* Home indicator (contact) */}
                <div style={{ padding: "24px 0 14px", display: "flex", justifyContent: "center", backgroundColor: bg }}>
                  <div style={{ width: "130px", height: "5px", backgroundColor: darkMode ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)", borderRadius: "3px" }} />
                </div>
              </div>

              {/* ── CREDITS VIEW ── */}
              <div style={{ width: "50%", flexShrink: 0 }}>
                <div style={{ backgroundColor: bg, padding: "20px 16px", transition: "background-color 0.3s" }}>

                  {/* Dependencies */}
                  <p style={{ fontSize: "11px", fontWeight: 500, color: sub, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", paddingLeft: "4px" }}>
                    Dependencies
                  </p>
                  <div style={{ backgroundColor: card, borderRadius: "12px", overflow: "hidden", marginBottom: "20px", transition: "background-color 0.3s" }}>
                    {dependencies.map((dep, i) => (
                      <div key={dep.name}>
                        <a href={dep.href} target="_blank" rel="noopener noreferrer"
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", textDecoration: "none" }}>
                          <span style={{ fontSize: "14px", color: text }}>{dep.name}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ fontSize: "13px", color: sub }}>v{dep.version}</span>
                            <span style={{ color: sub, fontSize: "11px" }}>›</span>
                          </div>
                        </a>
                        {i < dependencies.length - 1 && <div style={{ height: "0.5px", backgroundColor: divider, marginLeft: "14px" }} />}
                      </div>
                    ))}
                  </div>

                  {/* References */}
                  <p style={{ fontSize: "11px", fontWeight: 500, color: sub, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", paddingLeft: "4px" }}>
                    References
                  </p>
                  <div style={{ backgroundColor: card, borderRadius: "12px", overflow: "hidden", transition: "background-color 0.3s" }}>
                    {credits.map((cr, i) => (
                      <div key={cr.name}>
                        <a href={cr.href} target="_blank" rel="noopener noreferrer"
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", textDecoration: "none" }}>
                          <div>
                            <p style={{ fontSize: "10px", color: sub, marginBottom: "1px" }}>{cr.label}</p>
                            <p style={{ fontSize: "14px", color: BLUE }}>{cr.name}</p>
                          </div>
                          <span style={{ color: sub, fontSize: "11px" }}>›</span>
                        </a>
                        {i < credits.length - 1 && <div style={{ height: "0.5px", backgroundColor: divider, marginLeft: "14px" }} />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Home indicator (credits) */}
                <div style={{ padding: "24px 0 14px", display: "flex", justifyContent: "center", backgroundColor: bg }}>
                  <div style={{ width: "130px", height: "5px", backgroundColor: darkMode ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)", borderRadius: "3px" }} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
