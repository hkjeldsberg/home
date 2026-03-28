import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";
import FadeIn from "@/components/FadeIn";
import { ExternalLink, GitBranch } from "lucide-react";

const webProjects = [
  {
    name: "Hablar",
    description:
      "A real-time language-exchange platform connecting native speakers for conversational practice. Placeholder description — update with stack, status, and link.",
    tags: ["Next.js", "WebSockets", "PostgreSQL"],
    github: "#",
    live: "#",
  },
  {
    name: "Middah",
    description:
      "A character-development and habit-tracking web app rooted in ethical frameworks. Placeholder description — update with stack, status, and link.",
    tags: ["React", "Node.js", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    name: "Apache Tear",
    description:
      "A minimalist journaling platform with end-to-end encryption and offline support. Placeholder description — update with stack, status, and link.",
    tags: ["SvelteKit", "IndexedDB", "Encryption"],
    github: "#",
    live: "#",
  },
  {
    name: "Barnshli",
    description:
      "A collaborative storytelling and world-building tool for writers and game designers. Placeholder description — update with stack, status, and link.",
    tags: ["Vue.js", "GraphQL", "Firebase"],
    github: "#",
    live: "#",
  },
  {
    name: "Vinylify",
    description:
      "A vinyl record collection manager with Discogs integration and audio preview support. Placeholder description — update with stack, status, and link.",
    tags: ["React", "Discogs API", "Tailwind"],
    github: "#",
    live: "#",
  },
  {
    name: "PompWeb",
    description:
      "The web companion for the Pomp mobile app — browse and manage pump session data via a responsive dashboard. Placeholder description.",
    tags: ["Next.js", "REST API", "Chart.js"],
    github: "#",
    live: "#",
  },
];

export default function WebProjectsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Web Projects</h1>
        <p className="text-gray-500 mb-12">A selection of web applications I&apos;ve designed and built.</p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {webProjects.map((project) => (
          <StaggerItem key={project.name}>
            <div className="border border-black p-6 flex flex-col h-full hover:border-[var(--accent)] transition-colors group">
              <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                {project.name}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-black text-white px-2 py-0.5 uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-auto">
                {project.github !== "#" && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                    <GitBranch size={18} />
                  </a>
                )}
                {project.live !== "#" && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
