"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useNavigation } from "@/context/NavigationContext";

export default function NavigationOverlay() {
  const { pending, clearPending } = useNavigation();
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const didNavigate = useRef(false);
  const isFadingOut = useRef(false);
  const pendingPath = useRef<string | null>(null);

  // Capture path and start fade-in
  useEffect(() => {
    if (!pending) return;
    pendingPath.current = pending;
    clearPending();
    isFadingOut.current = false;
    setVisible(true);
  }, [pending, clearPending]);

  // Once new page mounts, start fade-out
  useEffect(() => {
    if (!didNavigate.current) return;
    didNavigate.current = false;
    isFadingOut.current = true;
    setVisible(false);
  }, [pathname]);

  // CSS transition end: fade-in complete → navigate
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "opacity" || !visible) return;
    if (!pendingPath.current) return;
    didNavigate.current = true;
    router.push(pendingPath.current);
    pendingPath.current = null;
  };

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000",
        zIndex: 200,
        opacity: visible ? 1 : 0,
        transition: isFadingOut.current
          ? "opacity 450ms ease 120ms"
          : "opacity 380ms ease",
        pointerEvents: "none",
      }}
    />
  );
}
