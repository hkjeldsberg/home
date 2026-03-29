"use client";

import { NavigationProvider } from "@/context/NavigationContext";
import NavigationOverlay from "@/components/NavigationOverlay";
import MacbookOverlay from "@/components/MacbookOverlay";
import ResearchOverlay from "@/components/ResearchOverlay";
import ContactOverlay from "@/components/ContactOverlay";
import CvOverlay from "@/components/CvOverlay";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <NavigationOverlay />
      <MacbookOverlay />
      <ResearchOverlay />
      <ContactOverlay />
      <CvOverlay />
      {children}
    </NavigationProvider>
  );
}
