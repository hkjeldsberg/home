'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ExternalLink } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import AbstractDrawer from '@/components/AbstractDrawer'
import type { Paper } from '@/lib/types'

const STATUS_PILL: Record<Paper['status'], string> = {
  Published: 'border-emerald-500/40 text-emerald-400',
  'Pre-print': 'border-amber-500/40 text-amber-400',
  'Under Review': 'border-sky-500/40 text-sky-400',
}

export default function ResearchList({ papers }: { papers: Paper[] }) {
  const [openPaper, setOpenPaper] = useState<Paper | null>(null)
  const close = useCallback(() => setOpenPaper(null), [])

  return (
    <>
      <div className="flex flex-col">
        {papers.map((paper, i) => (
          <FadeIn key={paper.index} delay={i * 0.08}>
            <motion.article
              className="border-t border-[var(--border)] py-8 group"
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.015)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-[2rem_1fr] gap-x-6 md:gap-x-10 items-start">
                {/* Index */}
                <span className="font-serif text-xs text-[var(--border)] font-medium pt-1 select-none group-hover:text-[var(--muted)] transition-colors duration-200">
                  {paper.index}
                </span>

                {/* Body */}
                <div>
                  {/* Metadata badges row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full border ${
                        STATUS_PILL[paper.status]
                      }`}
                    >
                      {paper.status}
                    </span>
                    <span className="text-[9px] font-medium uppercase tracking-[0.12em] px-2.5 py-0.5 rounded-full border border-[var(--border)] text-[var(--muted)]">
                      {paper.year}
                    </span>
                    <span className="text-[9px] font-medium text-[var(--muted)] truncate hidden sm:block">
                      {paper.venue}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-lg md:text-xl font-semibold leading-snug mb-4 text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                    {paper.title}
                  </h2>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-medium uppercase tracking-[0.12em] border border-[var(--border)] text-[var(--muted)] px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setOpenPaper(paper)}
                      className="cursor-pointer inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] border border-[var(--border)] text-[var(--muted)] px-3 py-1.5 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
                    >
                      <BookOpen size={10} />
                      View Abstract
                    </button>

                    {paper.link !== '#' && (
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Read paper: ${paper.title}`}
                        className="cursor-pointer inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] border border-[var(--border)] text-[var(--muted)] px-3 py-1.5 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
                      >
                        <ExternalLink size={10} />
                        Read Paper
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          </FadeIn>
        ))}
        <div className="border-t border-[var(--border)]" />
      </div>

      <AbstractDrawer paper={openPaper} onClose={close} />
    </>
  )
}
