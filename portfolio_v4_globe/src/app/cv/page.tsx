import FadeIn from '@/components/FadeIn'
import CVTimeline from '@/components/CVTimeline'
import { cvEntries } from '@/lib/data'

export default function CVPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      <FadeIn>
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
          Background
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-none tracking-tight text-[var(--text)] mb-16">
          Curriculum Vitae
        </h1>
      </FadeIn>

      <CVTimeline entries={cvEntries} />
    </div>
  )
}
