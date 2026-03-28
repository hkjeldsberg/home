import FadeIn from '@/components/FadeIn'
import ProjectShowcase from '@/components/ProjectShowcase'
import { webProjects } from '@/lib/data'

export default function WebProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <FadeIn>
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
          Selected Work
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-none tracking-tight text-[var(--text)] mb-4">
          Web Projects
        </h1>
        <p className="text-[var(--muted)] text-sm mb-14 max-w-md">
          Six products built across the full stack — from real-time platforms to
          privacy-first tools.
        </p>
      </FadeIn>

      <ProjectShowcase projects={webProjects} variant="web" />
    </div>
  )
}
