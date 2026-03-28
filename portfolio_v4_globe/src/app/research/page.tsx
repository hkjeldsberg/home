import FadeIn from '@/components/FadeIn'
import ResearchList from '@/components/ResearchList'
import { papers } from '@/lib/data'

export default function ResearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      <FadeIn>
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
          Academic Work
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-none tracking-tight text-[var(--text)] mb-4">
          Published Research
        </h1>
        <p className="text-[var(--muted)] text-sm mb-16 max-w-md">
          Peer-reviewed work spanning human-computer interaction, mobile health,
          and data privacy. Click any paper to read the abstract.
        </p>
      </FadeIn>

      <ResearchList papers={papers} />
    </div>
  )
}
