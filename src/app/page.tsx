'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { Nav } from '@/components/ui/Nav';
import { Footer } from '@/components/ui/Footer';

const OceanCanvas = dynamic(() => import('@/components/OceanCanvas'), {
  ssr: false,
});

export default function HomePage() {
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#020b18]">
      {/* Full-screen 3D canvas */}
      <div className="absolute inset-0">
        <OceanCanvas overlayRef={overlayRef} />
      </div>

      {/* Navigation overlay */}
      <Nav />

      {/* Footer hint */}
      <Footer />

      {/* Dive fade overlay — starts transparent, GSAP fades to opaque */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-50 pointer-events-none"
        style={{ opacity: 0 }}
      />
    </main>
  );
}
