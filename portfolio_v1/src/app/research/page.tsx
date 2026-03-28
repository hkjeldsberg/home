import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";
import FadeIn from "@/components/FadeIn";
import { ExternalLink } from "lucide-react";

const papers = [
  {
    title: "Paper Title Placeholder — Human-Computer Interaction Study",
    venue: "Conference / Journal Name, Year",
    abstract:
      "A concise abstract describing the research question, methodology, and key findings. Replace with actual content once available.",
    tags: ["HCI", "User Study", "Qualitative"],
    link: "#",
  },
  {
    title: "Paper Title Placeholder — Mobile Health Application Evaluation",
    venue: "Conference / Journal Name, Year",
    abstract:
      "Placeholder abstract. This paper evaluates the efficacy of a mobile health application in a target population, using mixed-methods research design.",
    tags: ["mHealth", "Evaluation", "Mixed Methods"],
    link: "#",
  },
  {
    title: "Paper Title Placeholder — Data Privacy in Consumer Apps",
    venue: "Workshop / Symposium, Year",
    abstract:
      "Placeholder abstract exploring data privacy considerations in modern consumer-facing applications, with a focus on consent and transparency.",
    tags: ["Privacy", "Security", "Ethics"],
    link: "#",
  },
];

export default function ResearchPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Research</h1>
        <p className="text-gray-500 mb-12">Published papers and ongoing work.</p>
      </FadeIn>

      <StaggerContainer className="flex flex-col gap-8">
        {papers.map((paper) => (
          <StaggerItem key={paper.title}>
            <article className="border border-black p-6 hover:border-[var(--accent)] transition-colors group">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold leading-snug group-hover:text-[var(--accent)] transition-colors">
                  {paper.title}
                </h2>
                {paper.link !== "#" && (
                  <a href={paper.link} target="_blank" rel="noopener noreferrer" className="shrink-0">
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1 mb-3">{paper.venue}</p>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{paper.abstract}</p>
              <div className="flex flex-wrap gap-2">
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-black px-2 py-0.5 uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
