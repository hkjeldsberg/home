import FadeIn from '@/components/FadeIn'
import ProjectShowcase from '@/components/ProjectShowcase'
import { mobileProjects } from '@/lib/data'

export default function MobileProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <FadeIn>
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
          Native &amp; Cross-Platform
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-none tracking-tight text-[var(--text)] mb-4">
          Mobile Projects
        </h1>
        <p className="text-[var(--muted)] text-sm mb-14 max-w-md">
          Three apps across iOS and Android — health, care, and public safety
          built with attention to privacy and performance.
        </p>
      </FadeIn>

      <ProjectShowcase projects={mobileProjects} variant="mobile" />
    </div>
  )
}
