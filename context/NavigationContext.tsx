"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface NavCtx {
  navigateTo: (path: string) => void;
  pending: string | null;
  clearPending: () => void;
  macbookFocused: boolean;
  setMacbookFocused: (b: boolean) => void;
  heartFocused: boolean;
  setHeartFocused: (b: boolean) => void;
  iphoneFocused: boolean;
  setIphoneFocused: (b: boolean) => void;
  mugFocused: boolean;
  setMugFocused: (b: boolean) => void;
}

const NavigationContext = createContext<NavCtx>({
  navigateTo: () => {},
  pending: null,
  clearPending: () => {},
  macbookFocused: false,
  setMacbookFocused: () => {},
  heartFocused: false,
  setHeartFocused: () => {},
  iphoneFocused: false,
  setIphoneFocused: () => {},
  mugFocused: false,
  setMugFocused: () => {},
});

export function useNavigation() {
  return useContext(NavigationContext);
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<string | null>(null);
  const [macbookFocused, setMacbookFocused] = useState(false);
  const [heartFocused, setHeartFocused] = useState(false);
  const [iphoneFocused, setIphoneFocused] = useState(false);
  const [mugFocused, setMugFocused] = useState(false);
  const navigateTo = useCallback((path: string) => setPending(path), []);
  const clearPending = useCallback(() => setPending(null), []);
  return (
    <NavigationContext.Provider value={{
      navigateTo, pending, clearPending,
      macbookFocused, setMacbookFocused,
      heartFocused, setHeartFocused,
      iphoneFocused, setIphoneFocused,
      mugFocused, setMugFocused,
    }}>
      {children}
    </NavigationContext.Provider>
  );
}
