import FadeIn from "@/components/FadeIn";
import { ProjectShowcase, type ShowcaseProject } from "@/components/ui/project-showcase";

const mobileProjects: ShowcaseProject[] = [
  {
    title: "Smittestopp",
    description:
      "A Bluetooth-based contact tracing application developed for public health crisis response. Privacy-first architecture with anonymised data handling.",
    year: "2020",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=560&h=360&auto=format&fit=crop&q=80",
  },
  {
    title: "Pomp",
    description:
      "A smart pump-session tracker for parents with insightful analytics and gentle reminders.",
    year: "2022",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=560&h=360&auto=format&fit=crop&q=80",
  },
  {
    title: "Zleep",
    description:
      "A sleep-quality monitoring and improvement app using device sensors and guided evening routines.",
    year: "2023",
    link: "#",
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=560&h=360&auto=format&fit=crop&q=80",
  },
];

export default function MobileProjectsPage() {
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

      <FadeIn delay={0.1}>
        <ProjectShowcase
          projects={mobileProjects}
          sectionLabel="All Apps"
          className="max-w-2xl"
        />
      </FadeIn>
    </section>
  );
}
