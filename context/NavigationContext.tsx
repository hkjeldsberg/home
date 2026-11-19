"use client";

import { createContext, useContext, useState } from "react";

interface NavCtx {
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

export type FocusedObject = "macbook" | "heart" | "iphone" | "mug";

/** The currently focused 3D object, or null. */
export function useFocusedObject(): FocusedObject | null {
  const { macbookFocused, heartFocused, iphoneFocused, mugFocused } = useNavigation();
  if (macbookFocused) return "macbook";
  if (heartFocused) return "heart";
  if (iphoneFocused) return "iphone";
  if (mugFocused) return "mug";
  return null;
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [macbookFocused, setMacbookFocused] = useState(false);
  const [heartFocused, setHeartFocused] = useState(false);
  const [iphoneFocused, setIphoneFocused] = useState(false);
  const [mugFocused, setMugFocused] = useState(false);
  return (
    <NavigationContext.Provider value={{
      macbookFocused, setMacbookFocused,
      heartFocused, setHeartFocused,
      iphoneFocused, setIphoneFocused,
      mugFocused, setMugFocused,
    }}>
      {children}
    </NavigationContext.Provider>
  );
}
