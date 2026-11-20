"use client";

import { useEffect, useRef } from "react";

const SEQUENCE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/** Calls `onUnlock` when the Konami code is typed. */
export function useKonami(onUnlock: () => void) {
  const cb = useRef(onUnlock);
  useEffect(() => {
    cb.current = onUnlock;
  });

  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = key === SEQUENCE[i] ? i + 1 : key === SEQUENCE[0] ? 1 : 0;
      if (i === SEQUENCE.length) {
        i = 0;
        cb.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
