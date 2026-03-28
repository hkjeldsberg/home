'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import type { CVEntry } from '@/lib/types'

type Category = 'All' | CVEntry['category']

const CATEGORIES: Category[] = ['All', 'Work', 'Education', 'Research', 'Open Source']

// Accent hues per category — using violet base + tint shifts via opacity/border
const CATEGORY_COLOR: Record<CVEntry['category'], string> = {
  Work: 'text-[var(--accent)] border-[var(--accent)]',
  Education: 'text-sky-400 border-sky-400',
  Research: 'text-amber-400 border-amber-400',
  'Open Source': 'text-emerald-400 border-emerald-400',
}

const CATEGORY_DOT: Record<CVEntry['category'], string> = {
  Work: 'bg-[var(--accent)]',
  Education: 'bg-sky-400',
  Research: 'bg-amber-400',
  'Open Source': 'bg-emerald-400',
}

export default function CVTimeline({ entries }: { entries: CVEntry[] }) {
  const [active, setActive] = useState<Category>('All')
  const timelineRef = useRef<HTMLDivElement>(null)

  const filtered =
    active === 'All' ? entries : entries.filter((e) => e.category === active)

  // Scroll-driven line fill
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 40%'],
  })
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  })

  return (
    <>
      {/* ── Filter tabs — matching ProjectShowcase pill style ── */}
      <div className="flex flex-wrap gap-2 mb-14">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`cursor-pointer text-[9px] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 border transition-colors duration-200 ${
              active === cat
                ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-dim)]'
                : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Timeline ── */}
      <div ref={timelineRef} className="relative">

        {/* Track line (background) */}
        <div className="absolute left-[7.5rem] top-0 bottom-0 w-px bg-[var(--border)] hidden md:block" />

        {/* Fill line — driven by scroll progress */}
        <div className="absolute left-[7.5rem] top-0 bottom-0 w-px hidden md:block overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 bg-[var(--accent)] origin-top"
            style={{
              scaleY: lineScaleY,
              height: '100%',
            }}
          />
        </div>

        <div className="flex flex-col">
          {filtered.map((entry, i) => (
            <motion.div
              key={`${entry.title}-${entry.organisation}`}
              data-testid="cv-entry"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid md:grid-cols-[7.5rem_1fr] gap-4 md:gap-10 py-9 border-b border-[var(--border)] group"
            >
              {/* Date column */}
              <div className="md:text-right pt-0.5 flex md:block items-center gap-3">
                <span className="text-[11px] text-[var(--muted)] font-medium tabular-nums leading-relaxed">
                  {entry.dateRange}
                </span>
              </div>

              {/* Content column */}
              <div className="md:pl-8 relative">
                {/* Timeline dot — coloured by category */}
                <div
                  className={`absolute -left-[2.2rem] top-1 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg)] hidden md:block transition-transform duration-200 group-hover:scale-125 ${
                    CATEGORY_DOT[entry.category]
                  }`}
                />

                {/* Category badge — pill shaped, consistent with ProjectShowcase tag style */}
                <span
                  className={`inline-block text-[9px] font-semibold uppercase tracking-[0.12em] border px-2.5 py-0.5 rounded-full mb-2 ${
                    CATEGORY_COLOR[entry.category]
                  } bg-transparent`}
                >
                  {entry.category}
                </span>

                {/* Title + Org */}
                <h3 className="font-serif text-lg md:text-xl font-bold text-[var(--text)] leading-tight mb-0.5 group-hover:text-[var(--accent)] transition-colors duration-200">
                  {entry.title}
                </h3>
                <p className="text-[11px] text-[var(--muted)] uppercase tracking-widest mb-3 font-medium">
                  {entry.organisation}
                </p>

                {/* Description */}
                <p className="text-sm text-[var(--muted)] leading-[1.75] mb-4 max-w-[52ch]">
                  {entry.description}
                </p>

                {/* Tech stack pills */}
                {entry.stack && entry.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {entry.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-medium uppercase tracking-[0.12em] border border-[var(--border)] text-[var(--muted)] px-2 py-0.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Impact highlight */}
                {entry.impact && (
                  <div className="flex items-start gap-2 border-l-2 border-[var(--accent)] pl-3 py-1">
                    <TrendingUp
                      size={12}
                      className="text-[var(--accent)] mt-0.5 shrink-0"
                    />
                    <p className="text-xs text-[var(--text)] leading-relaxed">
                      {entry.impact}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
