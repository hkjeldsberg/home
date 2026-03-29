"use client";

import dynamic from "next/dynamic";
import TextOverlay from "@/components/hero/TextOverlay";

const HeroScene = dynamic(() => import("@/components/hero/HeroScene"), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}>
      <HeroScene />
      <TextOverlay />
    </main>
  );
}
