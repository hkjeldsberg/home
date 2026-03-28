import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import GlobeWrapper from '@/components/GlobeWrapper'
import { webProjects, mobileProjects, papers } from '@/lib/data'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
      {children}
    </p>
  )
}

export default function HomePage() {
  const featuredWeb = webProjects.find((p) => p.featured)!
  const featuredMobile = mobileProjects.find((p) => p.featured)!
  const featuredPaper = papers[0]

  return (
    <>
      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-36 border-b border-[var(--border)]">
        <div className="flex flex-col md:flex-row md:items-center gap-16">
          {/* Left: text */}
          <div className="flex-1">
            <FadeIn>
              <SectionLabel>Software Engineer · Researcher · Builder</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="font-serif text-[clamp(4rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.02em] mb-8 text-[var(--text)]">
                HAK.
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="text-base md:text-lg text-[var(--muted)] max-w-md leading-[1.75] mb-10">
                I build high-performance web and mobile applications, conduct
                research at the intersection of technology and human behaviour,
                and ship products people actually use.
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/web"
                  className="inline-flex items-center gap-2 bg-[var(--accent)] text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-[#7c3aed] transition-colors duration-200"
                >
                  View Work <ArrowRight size={14} />
                </Link>
                <Link
                  href="/cv"
                  className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--text)] px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
                >
                  Read CV
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right: globe */}
          <div className="flex-1 flex justify-center items-center">
            <Suspense fallback={<div className="w-[560px] h-[560px]" />}>
              <GlobeWrapper />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-b border-[var(--border)]">
        <FadeIn>
          <SectionLabel>About Me</SectionLabel>
          <p className="text-[var(--text)] text-lg max-w-2xl leading-relaxed">
            Based in [City]. I work across the full stack — from mobile sensors
            to web infrastructure — with a focus on privacy, performance, and
            human-centred design. Open to collaboration.
          </p>
        </FadeIn>
      </section>

      {/* ── FEATURED ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <FadeIn>
          <SectionLabel>Featured</SectionLabel>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FadeIn delay={0.05}>
            <Link
              href="/web"
              className="bento-card block bg-[var(--surface)] border border-[var(--border)] p-6 group h-full"
            >
              <p className="text-[9px] text-[var(--muted)] uppercase tracking-widest mb-3">
                Web Project
              </p>
              <h3 className="font-serif text-xl font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                {featuredWeb.name}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                {featuredWeb.description}
              </p>
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/mobile"
              className="bento-card block bg-[var(--surface)] border border-[var(--border)] p-6 group h-full"
            >
              <p className="text-[9px] text-[var(--muted)] uppercase tracking-widest mb-3">
                Mobile App
              </p>
              <h3 className="font-serif text-xl font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                {featuredMobile.name}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                {featuredMobile.description}
              </p>
            </Link>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Link
              href="/research"
              className="bento-card block bg-[var(--surface)] border border-[var(--border)] p-6 group h-full"
            >
              <p className="text-[9px] text-[var(--muted)] uppercase tracking-widest mb-3">
                Research
              </p>
              <h3 className="font-serif text-xl font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                {featuredPaper.title}
              </h3>
              <p className="text-[var(--muted)] text-sm">
                {featuredPaper.venue} · {featuredPaper.year}
              </p>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
