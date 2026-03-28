import FadeIn from "@/components/FadeIn";
import { ExternalLink, GitBranch } from "lucide-react";

const webProjects = [
  {
    name: "Hablar",
    description:
      "A real-time language-exchange platform connecting native speakers for conversational practice. Built for low-latency, high-concurrency real-time communication.",
    tags: ["Next.js", "WebSockets", "PostgreSQL"],
    github: "#",
    live: "#",
    size: "large", // col-span-2, row-span-2
  },
  {
    name: "Middah",
    description:
      "A character-development and habit-tracking web app rooted in ethical frameworks.",
    tags: ["React", "Node.js", "MongoDB"],
    github: "#",
    live: "#",
    size: "medium",
  },
  {
    name: "Apache Tear",
    description:
      "A minimalist journaling platform with end-to-end encryption and offline support.",
    tags: ["SvelteKit", "IndexedDB", "Encryption"],
    github: "#",
    live: "#",
    size: "medium",
  },
  {
    name: "Barnshli",
    description:
      "A collaborative storytelling and world-building tool for writers and game designers.",
    tags: ["Vue.js", "GraphQL", "Firebase"],
    github: "#",
    live: "#",
    size: "small",
  },
  {
    name: "Vinylify",
    description:
      "A vinyl record collection manager with Discogs integration and audio preview.",
    tags: ["React", "Discogs API", "Tailwind"],
    github: "#",
    live: "#",
    size: "small",
  },
  {
    name: "PompWeb",
    description:
      "Web companion for the Pomp mobile app — browse and manage pump session data.",
    tags: ["Next.js", "REST API", "Chart.js"],
    github: "#",
    live: "#",
    size: "small",
  },
];

function ProjectLinks({
  github,
  live,
  dark = false,
}: {
  github: string;
  live: string;
  dark?: boolean;
}) {
  const iconClass = dark
    ? "text-[#666] hover:text-[var(--accent)]"
    : "text-[#888] hover:text-[var(--accent)]";
  return (
    <div className="flex gap-3 mt-auto pt-4">
      {github !== "#" && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
          className={`${iconClass} transition-colors duration-200 cursor-pointer`}
        >
          <GitBranch size={16} />
        </a>
      )}
      {live !== "#" && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Live site"
          className={`${iconClass} transition-colors duration-200 cursor-pointer`}
        >
          <ExternalLink size={16} />
        </a>
      )}
    </div>
  );
}

export default function WebProjectsPage() {
  const [featured, ...rest] = webProjects;
  const midCards = rest.slice(0, 2);
  const smallCards = rest.slice(2);

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

      {/* Bento grid */}
      <FadeIn delay={0.1}>
        {/* Row 1 — Featured (2×2) + 2 medium cards stacked */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(200px,auto)] gap-4 mb-4">
          {/* Featured large card */}
          <div className="bento-card md:col-span-2 md:row-span-2 bg-white border border-[#E2E2E2] p-8 flex flex-col group">
            <div className="flex-1">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#AAAAAA]">
                Featured
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-5 leading-tight group-hover:text-[var(--accent)] transition-colors duration-200">
                {featured.name}
              </h2>
              <p className="text-[#555] text-sm leading-[1.8] max-w-sm">
                {featured.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-6">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] bg-[#0A0A0A] text-white px-2.5 py-1 uppercase tracking-wider font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <ProjectLinks github={featured.github} live={featured.live} />
          </div>

          {/* Two medium cards stacked */}
          {midCards.map((project) => (
            <div
              key={project.name}
              className="bento-card bg-white border border-[#E2E2E2] p-6 flex flex-col group"
            >
              <div className="flex-1">
                <h2 className="font-serif text-2xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
                  {project.name}
                </h2>
                <p className="text-[#666] text-xs leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] border border-[#D9D9D9] text-[#666] px-2 py-0.5 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ProjectLinks github={project.github} live={project.live} />
            </div>
          ))}
        </div>

        {/* Row 2 — three small cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-4">
          {smallCards.map((project) => (
            <div
              key={project.name}
              className="bento-card bg-white border border-[#E2E2E2] p-6 flex flex-col group"
            >
              <div className="flex-1">
                <h2 className="font-serif text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
                  {project.name}
                </h2>
                <p className="text-[#666] text-xs leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] border border-[#D9D9D9] text-[#666] px-2 py-0.5 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ProjectLinks github={project.github} live={project.live} />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
