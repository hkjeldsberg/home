import FadeIn from "@/components/FadeIn";
import { ProjectShowcase, type ShowcaseProject } from "@/components/ui/project-showcase";

const papers: ShowcaseProject[] = [
  {
    title: "Paper Title Placeholder — Human-Computer Interaction Study",
    description:
      "A concise abstract describing the research question, methodology, and key findings. Replace with actual content once available.",
    year: "2024",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=560&h=360&auto=format&fit=crop&q=80",
  },
  {
    title: "Paper Title Placeholder — Mobile Health Application Evaluation",
    description:
      "This paper evaluates the efficacy of a mobile health application in a target population, using mixed-methods research design.",
    year: "2023",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=560&h=360&auto=format&fit=crop&q=80",
  },
  {
    title: "Paper Title Placeholder — Data Privacy in Consumer Apps",
    description:
      "Exploring data privacy considerations in modern consumer-facing applications, with a focus on consent and transparency.",
    year: "2023",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=560&h=360&auto=format&fit=crop&q=80",
  },
];

export default function ResearchPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <FadeIn>
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
          Academic Work
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold leading-none tracking-tight mb-3">
          Published Research
        </h1>
        <p className="text-[#666] text-sm mb-14 max-w-md">
          Published papers and ongoing investigations at the intersection of
          technology and human behaviour.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <ProjectShowcase
          projects={papers}
          sectionLabel="All Papers"
          className="max-w-2xl"
        />
      </FadeIn>
    </section>
  );
}
