import FadeIn from "@/components/FadeIn";
import { ExternalLink } from "lucide-react";

const papers = [
  {
    index: "01",
    title: "Paper Title Placeholder — Human-Computer Interaction Study",
    venue: "Conference / Journal Name",
    year: "2024",
    abstract:
      "A concise abstract describing the research question, methodology, and key findings. Replace with actual content once available.",
    tags: ["HCI", "User Study", "Qualitative"],
    link: "#",
  },
  {
    index: "02",
    title: "Paper Title Placeholder — Mobile Health Application Evaluation",
    venue: "Conference / Journal Name",
    year: "2023",
    abstract:
      "This paper evaluates the efficacy of a mobile health application in a target population, using mixed-methods research design.",
    tags: ["mHealth", "Evaluation", "Mixed Methods"],
    link: "#",
  },
  {
    index: "03",
    title: "Paper Title Placeholder — Data Privacy in Consumer Apps",
    venue: "Workshop / Symposium",
    year: "2023",
    abstract:
      "Exploring data privacy considerations in modern consumer-facing applications, with a focus on consent and transparency.",
    tags: ["Privacy", "Security", "Ethics"],
    link: "#",
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
        <p className="text-[#666] text-sm mb-16 max-w-md">
          Published papers and ongoing investigations at the intersection of
          technology and human behaviour.
        </p>
      </FadeIn>

      <div className="flex flex-col">
        {papers.map((paper, i) => (
          <FadeIn key={paper.index} delay={i * 0.08}>
            <article className="border-t border-[#E2E2E2] py-10 grid grid-cols-[auto_1fr_auto] gap-x-6 md:gap-x-12 items-start group">
              {/* Index number */}
              <span className="font-serif text-xs text-[#CCCCCC] font-medium pt-1 select-none w-6 shrink-0">
                {paper.index}
              </span>

              {/* Content */}
              <div>
                <h2 className="font-serif text-xl md:text-2xl font-semibold leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
                  {paper.link !== "#" ? (
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      {paper.title}
                    </a>
                  ) : (
                    paper.title
                  )}
                </h2>

                <p className="text-[11px] text-[#AAAAAA] uppercase tracking-[0.16em] font-medium mb-4">
                  {paper.venue}
                </p>

                <p className="text-sm text-[#555] leading-[1.8] max-w-2xl mb-5">
                  {paper.abstract}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] border border-[#D9D9D9] text-[#777] px-2.5 py-0.5 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Year + link */}
              <div className="flex flex-col items-end gap-3 pt-0.5 shrink-0">
                <span className="font-serif text-sm text-[#BBBBBB] font-medium tabular-nums">
                  {paper.year}
                </span>
                {paper.link !== "#" && (
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open paper: ${paper.title}`}
                    className="text-[#CCCCCC] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </article>
          </FadeIn>
        ))}

        {/* Closing rule */}
        <div className="border-t border-[#E2E2E2]" />
      </div>
    </section>
  );
}
