import { ImageResponse } from "next/og";

export const alt = "HKJELDSBERG – Data Engineer · Researcher · Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the hero: red → lavender gradient with the name and role line.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "linear-gradient(90deg, #943838 0%, #594d80 100%)",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: "0.08em", lineHeight: 1 }}>
          HKJELDSBERG
        </div>
        <div style={{ marginTop: 32, fontSize: 28, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.9 }}>
          Data Engineer · Researcher · Software Developer
        </div>
      </div>
    ),
    size,
  );
}
