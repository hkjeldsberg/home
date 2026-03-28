'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerMovement = useRef(0)
  const rRef = useRef(0)

  useEffect(() => {
    let phi = 0
    let width = 0

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }
    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.54, 0.36, 0.96],
      markerColor: [0.54, 0.36, 0.96],
      glowColor: [0.23, 0.12, 0.43],
      markers: [],
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.003
        state.phi = phi + rRef.current
        state.width = width * 2
        state.height = width * 2
      },
    })

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="relative w-full aspect-square max-w-[560px]">
      {/* Radial gradient mask so globe fades into background */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(circle at center, transparent 55%, var(--bg) 85%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: 'grab' }}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerMovement.current
          ;(e.target as HTMLElement).style.cursor = 'grabbing'
        }}
        onPointerUp={(e) => {
          pointerInteracting.current = null
          ;(e.target as HTMLElement).style.cursor = 'grab'
        }}
        onPointerOut={(e) => {
          pointerInteracting.current = null
          ;(e.target as HTMLElement).style.cursor = 'grab'
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current
            pointerMovement.current = delta
            rRef.current = delta / 200
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta =
              e.touches[0].clientX - pointerInteracting.current
            pointerMovement.current = delta
            rRef.current = delta / 100
          }
        }}
      />
    </div>
  )
}
