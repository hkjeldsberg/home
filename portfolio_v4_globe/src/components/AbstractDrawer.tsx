'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, BookOpen } from 'lucide-react'
import type { Paper } from '@/lib/types'

const STATUS_STYLE: Record<Paper['status'], string> = {
  Published: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10',
  'Pre-print': 'border-amber-500/50 text-amber-400 bg-amber-500/10',
  'Under Review': 'border-sky-500/50 text-sky-400 bg-sky-500/10',
}

type Props = {
  paper: Paper | null
  onClose: () => void
}

export default function AbstractDrawer({ paper, onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    if (!paper) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [paper, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (paper) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [paper])

  return (
    <AnimatePresence>
      {paper && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer panel — slides from right on md+, from bottom on mobile */}
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={`Abstract: ${paper.title}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg flex flex-col bg-[var(--surface)] border-l border-[var(--border)] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-6 border-b border-[var(--border)] sticky top-0 bg-[var(--surface)] z-10">
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen size={14} className="text-[var(--accent)] shrink-0" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Abstract
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close abstract"
                className="cursor-pointer shrink-0 text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 p-1 -m-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 space-y-6">
              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Status pill */}
                <span
                  className={`text-[9px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border ${
                    STATUS_STYLE[paper.status]
                  }`}
                >
                  {paper.status}
                </span>
                {/* Year pill */}
                <span className="text-[9px] font-medium uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--muted)]">
                  {paper.year}
                </span>
                {/* Venue pill */}
                <span className="text-[9px] font-medium uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--muted)] truncate max-w-[200px]">
                  {paper.venue}
                </span>
              </div>

              {/* Index + Title */}
              <div>
                <span className="font-serif text-xs text-[var(--muted)] select-none">
                  {paper.index}
                </span>
                <h2 className="font-serif text-xl md:text-2xl font-bold text-[var(--text)] leading-snug mt-1">
                  {paper.title}
                </h2>
              </div>

              {/* Abstract text */}
              <div className="border-t border-[var(--border)] pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] mb-3">
                  Abstract
                </p>
                <p className="text-sm text-[var(--muted)] leading-[1.8] max-w-prose">
                  {paper.abstract}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-medium uppercase tracking-[0.12em] border border-[var(--border)] text-[var(--muted)] px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            {paper.link !== '#' && (
              <div className="p-6 border-t border-[var(--border)] sticky bottom-0 bg-[var(--surface)]">
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center gap-2 w-full justify-center border border-[var(--accent)] text-[var(--accent)] px-5 py-3 text-[10px] font-semibold uppercase tracking-widest hover:bg-[var(--accent)] hover:text-white transition-colors duration-200"
                >
                  Read Full Paper <ExternalLink size={12} />
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
