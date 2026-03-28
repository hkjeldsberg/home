import FadeIn from "@/components/FadeIn";
import { ProjectShowcase, type ShowcaseProject } from "@/components/ui/project-showcase";

const webProjects: ShowcaseProject[] = [
  {
    title: "Hablar",
    description:
      "A real-time language-exchange platform connecting native speakers for conversational practice. Built for low-latency, high-concurrency real-time communication.",
    year: "2024",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=560&h=360&auto=format&fit=crop&q=80",
  },
  {
    title: "Middah",
    description:
      "A character-development and habit-tracking web app rooted in ethical frameworks.",
    year: "2024",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=560&h=360&auto=format&fit=crop&q=80",
  },
  {
    title: "Apache Tear",
    description:
      "A minimalist journaling platform with end-to-end encryption and offline support.",
    year: "2023",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=560&h=360&auto=format&fit=crop&q=80",
  },
  {
    title: "Barnshli",
    description:
      "A collaborative storytelling and world-building tool for writers and game designers.",
    year: "2023",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=560&h=360&auto=format&fit=crop&q=80",
  },
  {
    title: "Vinylify",
    description:
      "A vinyl record collection manager with Discogs integration and audio preview.",
    year: "2022",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=560&h=360&auto=format&fit=crop&q=80",
  },
  {
    title: "PompWeb",
    description:
      "Web companion for the Pomp mobile app — browse and manage pump session data.",
    year: "2022",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=560&h=360&auto=format&fit=crop&q=80",
  },
];

export default function WebProjectsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <FadeIn>
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
          Selected Work
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold leading-none tracking-tight mb-3">
          Web Projects
        </h1>
        <p className="text-[#666] text-sm mb-14 max-w-md">
          A selection of web applications I&apos;ve designed and built.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <ProjectShowcase
          projects={webProjects}
          sectionLabel="All Projects"
          className="max-w-2xl"
        />
      </FadeIn>
    </section>
  );
}
