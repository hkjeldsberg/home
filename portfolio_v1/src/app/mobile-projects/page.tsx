import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";
import FadeIn from "@/components/FadeIn";
import { ExternalLink, GitBranch, Smartphone } from "lucide-react";

const mobileProjects = [
  {
    name: "Smittestopp",
    description:
      "A Bluetooth-based contact tracing application developed for public health purposes. Placeholder description — update with platform, tech stack, and publication links.",
    platform: "iOS · Android",
    tags: ["React Native", "Bluetooth LE", "Privacy"],
    github: "#",
    store: "#",
  },
  {
    name: "Pomp",
    description:
      "A smart pump-session tracker for parents with insightful analytics and reminders. Placeholder description — update with platform, tech stack, and store links.",
    platform: "iOS · Android",
    tags: ["Flutter", "BLE", "Firebase"],
    github: "#",
    store: "#",
  },
  {
    name: "Zleep",
    description:
      "A sleep-quality monitoring and improvement app using device sensors and guided routines. Placeholder description — update with platform, tech stack, and store links.",
    platform: "iOS · Android",
    tags: ["Swift / Kotlin", "HealthKit", "ML"],
    github: "#",
    store: "#",
  },
];

export default function MobileProjectsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Mobile Projects</h1>
        <p className="text-gray-500 mb-12">Native and cross-platform apps shipped to production.</p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mobileProjects.map((project) => (
          <StaggerItem key={project.name}>
            <div className="border border-black p-6 flex flex-col h-full hover:border-[var(--accent)] transition-colors group">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone size={16} className="text-gray-400" />
                <span className="text-xs text-gray-400 uppercase tracking-widest">{project.platform}</span>
              </div>
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
                {project.store !== "#" && (
                  <a href={project.store} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
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
