"use client";

import { useEffect, useState } from "react";
import { useNavigation } from "@/context/NavigationContext";

const BLUE = "#007aff";
const SYS  = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif";
const EMAIL = "henriakj@simula.no";

const contacts = [
  { label: "linkedin", value: "linkedin.com/in/henriakj", href: "https://linkedin.com/in/henriakj",  icon: "in",  iconBg: "#0a66c2" },
  { label: "github",   value: "github.com/hkjeldsberg",  href: "https://github.com/hkjeldsberg",    icon: "gh",  iconBg: "#1a1a1a" },
  { label: "email",    value: EMAIL,                      href: `mailto:${EMAIL}`,                   icon: "@",   iconBg: "#2563eb" },
  { label: "website",  value: "hkjeldsberg.dev",          href: "/",                                 icon: "www", iconBg: "#6c3ce1" },
];

export default function ContactOverlay() {
  const { iphoneFocused, setIphoneFocused } = useNavigation();
  const [visible, setVisible] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    if (!iphoneFocused) { setVisible(false); return; }
    setTimeStr(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, [iphoneFocused]);

  if (!iphoneFocused) return null;

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
      {/* Back */}
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
        {/* Side/volume buttons */}
        <div style={{ position: "absolute", right: "-3px", top: "110px", width: "3px", height: "70px", backgroundColor: "#2a2a2c", borderRadius: "0 2px 2px 0" }} />
        {[60, 110, 155].map((top, i) => (
          <div key={i} style={{ position: "absolute", left: "-3px", top: `${top}px`, width: "3px", height: i === 0 ? "36px" : "56px", backgroundColor: "#2a2a2c", borderRadius: "2px 0 0 2px" }} />
        ))}

        {/* Screen */}
        <div style={{ backgroundColor: "#f2f2f7", borderRadius: "38px", overflow: "hidden", minHeight: "680px" }}>

          {/* Dynamic Island */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px", paddingBottom: "4px", backgroundColor: "#000" }}>
            <div style={{ width: "120px", height: "34px", backgroundColor: "#000", borderRadius: "20px" }} />
          </div>

          {/* Status bar */}
          <div style={{ backgroundColor: "#fff", padding: "4px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em" }}>{timeStr}</span>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              {[3,5,7,9].map((h, i) => <div key={i} style={{ width: "3px", height: `${h}px`, backgroundColor: "#000", borderRadius: "1px", opacity: i < 3 ? 1 : 0.3 }} />)}
              <span style={{ fontSize: "11px", marginLeft: "1px" }}>◈</span>
              <div style={{ width: "24px", height: "12px", border: "1.5px solid #000", borderRadius: "3px", padding: "1.5px", display: "flex", alignItems: "center", position: "relative", marginLeft: "1px" }}>
                <div style={{ position: "absolute", right: "-4px", top: "3px", width: "2px", height: "6px", backgroundColor: "#000", borderRadius: "0 1px 1px 0" }} />
                <div style={{ width: "70%", height: "100%", backgroundColor: "#34c759", borderRadius: "1px" }} />
              </div>
            </div>
          </div>

          {/* iOS nav bar */}
          <div style={{ backgroundColor: "#fff", borderBottom: "0.5px solid rgba(60,60,67,0.2)", padding: "8px 20px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: BLUE, fontSize: "16px" }}>‹ Contacts</span>
            <span style={{ fontSize: "15px", fontWeight: 600, color: "#000" }}>Card</span>
            <span style={{ color: BLUE, fontSize: "16px" }}>Edit</span>
          </div>

          {/* Profile section */}
          <div style={{ backgroundColor: "#f2f2f7", padding: "28px 20px 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%",
              background: "linear-gradient(135deg, #5e5ce6 0%, #bf5af2 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "10px", fontSize: "1.6rem", fontWeight: 600, color: "#fff",
            }}>HK</div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#000", marginBottom: "3px", letterSpacing: "-0.02em" }}>Henrik Kjeldsberg</h1>
            <p style={{ fontSize: "13px", color: "rgba(60,60,67,0.6)", marginBottom: "16px" }}>Software Engineer · Researcher</p>

            {/* Action buttons — message and mail only, both mailto */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { icon: "✉", label: "message" },
                { icon: "✈", label: "mail" },
              ].map(btn => (
                <a key={btn.label} href={`mailto:${EMAIL}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textDecoration: "none" }}>
                  <div style={{
                    width: "44px", height: "44px", backgroundColor: "#fff", borderRadius: "12px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "17px", color: BLUE, boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  }}>{btn.icon}</div>
                  <span style={{ fontSize: "10px", color: BLUE }}>{btn.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact fields */}
          <div style={{ backgroundColor: "#f2f2f7", padding: "0 16px" }}>
            <div style={{ backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              {contacts.map((c, i) => (
                <div key={c.label}>
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", padding: "11px 14px", textDecoration: "none", gap: "12px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "10px", color: "rgba(60,60,67,0.5)", textTransform: "lowercase", marginBottom: "1px" }}>{c.label}</p>
                      <p style={{ fontSize: "14px", color: BLUE, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.value}</p>
                    </div>
                    <span style={{ color: "rgba(60,60,67,0.3)", fontSize: "11px" }}>›</span>
                  </a>
                  {i < contacts.length - 1 && <div style={{ height: "0.5px", backgroundColor: "rgba(60,60,67,0.18)", marginLeft: "58px" }} />}
                </div>
              ))}
            </div>

            {/* Location */}
            <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "11px 14px", marginTop: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#30d158", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>📍</div>
              <div>
                <p style={{ fontSize: "10px", color: "rgba(60,60,67,0.5)", marginBottom: "1px" }}>location</p>
                <p style={{ fontSize: "14px", color: "#000" }}>Oslo, Norway</p>
              </div>
            </div>
          </div>

          {/* Home indicator */}
          <div style={{ padding: "24px 0 14px", display: "flex", justifyContent: "center", backgroundColor: "#f2f2f7" }}>
            <div style={{ width: "130px", height: "5px", backgroundColor: "rgba(0,0,0,0.18)", borderRadius: "3px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
