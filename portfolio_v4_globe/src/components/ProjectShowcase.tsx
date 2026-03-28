'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { WebProject, MobileProject } from '@/lib/types'

// ─── Visual config per project ────────────────────────────────────────────────
type VisualConfig = {
  /** CSS gradient for the preview panel background */
  gradient: string
  /** Accent for spotlight glow & row highlight */
  glow: string
  /** Decorative label drawn inside the preview */
  label?: string
}

const WEB_VISUALS: Record<string, VisualConfig> = {
  Hablar: {
    gradient: 'linear-gradient(135deg, #431407 0%, #7c2d12 40%, #9a3412 100%)',
    glow: 'rgba(234, 88, 12, 0.18)',
    label: 'Language Exchange',
  },
  Middah: {
    gradient: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)',
    glow: 'rgba(22, 163, 74, 0.15)',
    label: 'Character & Habits',
  },
  'Apache Tear': {
    gradient: 'linear-gradient(135deg, #0c0a09 0%, #1c1917 50%, #292524 100%)',
    glow: 'rgba(120, 113, 108, 0.18)',
    label: 'Encrypted Journal',
  },
  Barnshli: {
    gradient: 'linear-gradient(135deg, #3b0764 0%, #581c87 50%, #6b21a8 100%)',
    glow: 'rgba(168, 85, 247, 0.2)',
    label: 'Collaborative Story',
  },
  Vinylify: {
    gradient: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 40%, #4c1d95 100%)',
    glow: 'rgba(139, 92, 246, 0.22)',
    label: 'Record Collection',
  },
  PompWeb: {
    gradient: 'linear-gradient(135deg, #042f2e 0%, #134e4a 50%, #0f766e 100%)',
    glow: 'rgba(20, 184, 166, 0.18)',
    label: 'Analytics Dashboard',
  },
}

const MOBILE_VISUALS: Record<string, VisualConfig> = {
  Smittestopp: {
    gradient: 'linear-gradient(160deg, #0c1445 0%, #1e3a8a 50%, #1d4ed8 100%)',
    glow: 'rgba(37, 99, 235, 0.2)',
    label: 'Contact Tracing',
  },
  Pomp: {
    gradient: 'linear-gradient(160deg, #3d0015 0%, #881337 50%, #be185d 100%)',
    glow: 'rgba(244, 63, 94, 0.2)',
    label: 'Session Tracking',
  },
  Zleep: {
    gradient: 'linear-gradient(160deg, #030712 0%, #0f172a 40%, #1e1b4b 100%)',
    glow: 'rgba(129, 140, 248, 0.2)',
    label: 'Sleep Analytics',
  },
}

// ─── Spotlight Row ─────────────────────────────────────────────────────────────
function SpotlightRow({
  index,
  project,
  visual,
  isActive,
  onEnter,
  onLeave,
  previewAspect,
}: {
  index: number
  project: WebProject | MobileProject
  visual: VisualConfig
  isActive: boolean
  onEnter: () => void
  onLeave: () => void
  previewAspect: 'landscape' | 'portrait'
}) {
  const rowRef = useRef<HTMLDivElement>(null)

  // Update CSS vars directly — no state, no re-renders
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = rowRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--sx', `${e.clientX - rect.left}px`)
      el.style.setProperty('--sy', `${e.clientY - rect.top}px`)
    },
    []
  )

  const num = String(index + 1).padStart(2, '0')

  return (
    <div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-testid="project-card"
      style={
        {
          '--glow': visual.glow,
          '--sx': '50%',
          '--sy': '50%',
        } as React.CSSProperties
      }
      className={`
        group relative px-6 py-6 md:py-7 cursor-pointer
        border-b border-[var(--border)] last:border-b-0
        transition-colors duration-200
        ${isActive ? 'bg-[var(--surface)]' : 'hover:bg-[var(--surface)]/60'}
      `}
    >
      {/* Spotlight radial gradient — rendered via pseudo-equivalent div */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(380px circle at var(--sx) var(--sy), var(--glow), transparent 75%)',
        }}
      />

      {/* Active accent line on the left edge */}
      <div
        className={`absolute left-0 top-4 bottom-4 w-[2px] transition-all duration-300 ${
          isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
        style={{ background: 'var(--accent)' }}
      />

      <div className="relative flex items-start gap-5 md:gap-8">
        {/* Index number */}
        <span
          className={`font-serif text-xs tabular-nums pt-0.5 transition-colors duration-200 select-none shrink-0 w-6 text-right ${
            isActive ? 'text-[var(--accent)]' : 'text-[var(--border)]'
          }`}
        >
          {num}
        </span>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <h3
              className={`font-serif text-lg md:text-xl font-bold leading-tight transition-colors duration-200 ${
                isActive ? 'text-[var(--text)]' : 'text-[var(--muted)] group-hover:text-[var(--text)]'
              }`}
            >
              {project.name}
            </h3>
            <ArrowUpRight
              size={16}
              className={`shrink-0 mt-0.5 transition-all duration-200 ${
                isActive
                  ? 'text-[var(--accent)] translate-x-0 -translate-y-0'
                  : 'text-[var(--border)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              }`}
            />
          </div>

          <p
            className={`text-sm leading-relaxed mt-1.5 mb-4 transition-colors duration-200 max-w-prose ${
              isActive ? 'text-[var(--muted)]' : 'text-[var(--border)] group-hover:text-[var(--muted)]'
            }`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[9px] font-medium uppercase tracking-[0.12em] px-2 py-0.5 border transition-colors duration-200 ${
                  isActive
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-[var(--border)] text-[var(--border)] group-hover:border-[var(--muted)] group-hover:text-[var(--muted)]'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Preview Panel ─────────────────────────────────────────────────────────────
function PreviewPanel({
  project,
  visual,
  aspect,
}: {
  project: WebProject | MobileProject
  visual: VisualConfig
  aspect: 'landscape' | 'portrait'
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm ${
        aspect === 'portrait' ? 'aspect-[9/16] max-w-[240px] mx-auto' : 'aspect-[16/9]'
      }`}
      style={{ background: visual.gradient }}
    >
      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Decorative lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 32px)',
        }}
      />

      {/* Bottom label bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-0.5">
          {visual.label}
        </p>
        <p className="font-serif text-base md:text-lg font-bold text-white/90 leading-none">
          {project.name}
        </p>
      </div>

      {/* Corner dot grid */}
      <div
        aria-hidden="true"
        className="absolute top-4 right-4 grid grid-cols-3 gap-1 opacity-20"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-white" />
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
type ShowcaseVariant = 'web' | 'mobile'

type Props = {
  projects: Array<WebProject | MobileProject>
  variant: ShowcaseVariant
}

export default function ProjectShowcase({ projects, variant }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const visuals = variant === 'web' ? WEB_VISUALS : MOBILE_VISUALS
  const previewAspect = variant === 'mobile' ? 'portrait' : 'landscape'

  const activeProject = projects[activeIndex]
  const activeVisual = visuals[activeProject.name] ?? {
    gradient: 'linear-gradient(135deg, #111 0%, #222 100%)',
    glow: 'rgba(139,92,246,0.15)',
  }

  return (
    <div className="flex gap-0 md:gap-12 lg:gap-20 items-start">
      {/* ── Project list ── */}
      <div className="flex-1 border-t border-[var(--border)]">
        {projects.map((project, i) => {
          const visual = visuals[project.name] ?? {
            gradient: '',
            glow: 'rgba(139,92,246,0.15)',
          }
          return (
            <SpotlightRow
              key={project.name}
              index={i}
              project={project}
              visual={visual}
              isActive={i === activeIndex}
              onEnter={() => setActiveIndex(i)}
              onLeave={() => {}}
              previewAspect={previewAspect}
            />
          )
        })}
      </div>

      {/* ── Sticky preview ── */}
      <div
        className={`hidden md:block shrink-0 sticky top-24 ${
          variant === 'mobile' ? 'w-52 lg:w-60' : 'w-72 lg:w-80 xl:w-96'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <PreviewPanel
              project={activeProject}
              visual={activeVisual}
              aspect={previewAspect}
            />
          </motion.div>
        </AnimatePresence>

        {/* Project counter */}
        <p className="mt-4 text-[10px] text-[var(--muted)] uppercase tracking-widest text-center tabular-nums select-none">
          {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </p>
      </div>
    </div>
  )
}
