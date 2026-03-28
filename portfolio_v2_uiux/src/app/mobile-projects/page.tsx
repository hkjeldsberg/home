import FadeIn from "@/components/FadeIn";
import { ExternalLink, GitBranch, Smartphone } from "lucide-react";

const mobileProjects = [
  {
    name: "Smittestopp",
    description:
      "A Bluetooth-based contact tracing application developed for public health crisis response. Privacy-first architecture with anonymised data handling.",
    platform: "iOS · Android",
    tags: ["React Native", "Bluetooth LE", "Privacy"],
    github: "#",
    store: "#",
    dark: true,
  },
  {
    name: "Pomp",
    description:
      "A smart pump-session tracker for parents with insightful analytics and gentle reminders.",
    platform: "iOS · Android",
    tags: ["Flutter", "BLE", "Firebase"],
    github: "#",
    store: "#",
    dark: false,
  },
  {
    name: "Zleep",
    description:
      "A sleep-quality monitoring and improvement app using device sensors and guided evening routines.",
    platform: "iOS · Android",
    tags: ["Swift / Kotlin", "HealthKit", "ML"],
    github: "#",
    store: "#",
    dark: false,
  },
];

export default function MobileProjectsPage() {
  const [featured, ...rest] = mobileProjects;

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <FadeIn>
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-4">
          Native &amp; Cross-Platform
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold leading-none tracking-tight mb-3">
          Mobile Projects
        </h1>
        <p className="text-[#666] text-sm mb-14 max-w-md">
          Native and cross-platform apps shipped to production.
        </p>
      </FadeIn>

      {/* Bento grid — featured tall left, two stacked right */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(200px,auto)] gap-4">
          {/* Featured — tall, dark card */}
          <div className="bento-card md:row-span-2 bg-[#0A0A0A] text-white border border-[#0A0A0A] p-8 flex flex-col group">
            <div className="flex items-center gap-2 mb-8">
              <Smartphone size={13} className="text-[#666]" />
              <span className="text-[9px] text-[#666] uppercase tracking-widest">
                {featured.platform}
              </span>
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#555]">
                Featured
              </span>
              <h2 className="font-serif text-4xl font-bold mt-3 mb-4 leading-tight group-hover:text-[var(--accent)] transition-colors duration-200">
                {featured.name}
              </h2>
              <p className="text-[#999] text-sm leading-[1.8]">
                {featured.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-6">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] border border-[#2A2A2A] text-[#888] px-2.5 py-1 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3 pt-4">
              {featured.github !== "#" && (
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-[#555] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
                >
                  <GitBranch size={16} />
                </a>
              )}
              {featured.store !== "#" && (
                <a
                  href={featured.store}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="App store"
                  className="text-[#555] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Two smaller white cards */}
          {rest.map((project) => (
            <div
              key={project.name}
              className="bento-card bg-white border border-[#E2E2E2] p-6 flex flex-col group"
            >
              <div className="flex items-center gap-1.5 mb-4">
                <Smartphone size={12} className="text-[#CCCCCC]" />
                <span className="text-[9px] text-[#CCCCCC] uppercase tracking-widest">
                  {project.platform}
                </span>
              </div>
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
              <div className="flex gap-3 pt-4">
                {project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-[#AAA] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
                  >
                    <GitBranch size={16} />
                  </a>
                )}
                {project.store !== "#" && (
                  <a
                    href={project.store}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="App store"
                    className="text-[#AAA] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
