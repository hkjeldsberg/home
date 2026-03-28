import FadeIn from "@/components/FadeIn";
import { ArrowRight, ExternalLink, GitBranch, Smartphone } from "lucide-react";
import Link from "next/link";

/* ─── Data (mirrored from sub-pages for homepage preview) ─── */

const webProjects = [
  {
    name: "Hablar",
    description:
      "Real-time language-exchange platform connecting native speakers for conversational practice.",
    tags: ["Next.js", "WebSockets", "PostgreSQL"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    name: "Middah",
    description:
      "Character-development and habit-tracking web app rooted in ethical frameworks.",
    tags: ["React", "Node.js", "MongoDB"],
    github: "#",
    live: "#",
    featured: false,
  },
  {
    name: "Apache Tear",
    description:
      "Minimalist journaling platform with end-to-end encryption and offline support.",
    tags: ["SvelteKit", "IndexedDB"],
    github: "#",
    live: "#",
    featured: false,
  },
  {
    name: "Barnshli",
    description:
      "Collaborative storytelling tool for writers and game designers.",
    tags: ["Vue.js", "GraphQL"],
    github: "#",
    live: "#",
    featured: false,
  },
];

const mobileProjects = [
  {
    name: "Smittestopp",
    description:
      "Bluetooth-based contact tracing app developed for public health crisis response.",
    platform: "iOS · Android",
    tags: ["React Native", "Bluetooth LE", "Privacy"],
    featured: true,
  },
  {
    name: "Pomp",
    description:
      "Smart pump-session tracker with insightful analytics and gentle reminders.",
    platform: "iOS · Android",
    tags: ["Flutter", "BLE", "Firebase"],
    featured: false,
  },
  {
    name: "Zleep",
    description:
      "Sleep-quality monitor using device sensors and guided evening routines.",
    platform: "iOS · Android",
    tags: ["Swift / Kotlin", "HealthKit", "ML"],
    featured: false,
  },
];

const papers = [
  {
    index: "01",
    title: "Human-Computer Interaction Study — Placeholder Title",
    venue: "Conference / Journal Name",
    year: "2024",
    tags: ["HCI", "User Study", "Qualitative"],
    link: "#",
  },
  {
    index: "02",
    title: "Mobile Health Application Evaluation — Placeholder Title",
    venue: "Conference / Journal Name",
    year: "2023",
    tags: ["mHealth", "Evaluation", "Mixed Methods"],
    link: "#",
  },
  {
    index: "03",
    title: "Data Privacy in Consumer Applications — Placeholder Title",
    venue: "Workshop / Symposium",
    year: "2023",
    tags: ["Privacy", "Security", "Ethics"],
    link: "#",
  },
];

/* ─── Section label component ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] mb-6">
      {children}
    </p>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-36 border-b border-[#E2E2E2]">
        <FadeIn>
          <SectionLabel>Software Engineer · Researcher · Builder</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1
            className="font-serif text-[clamp(4rem,12vw,9rem)] font-bold leading-[0.9] tracking-[-0.02em] mb-10 text-[#0A0A0A]"
          >
            HAK.
          </h1>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="text-base md:text-lg text-[#3D3D3D] max-w-xl leading-[1.75] mb-12">
            I build high-performance web and mobile applications, conduct
            research at the intersection of technology and human behaviour, and
            ship products people actually use. Based in [City]. Open to
            collaboration.
          </p>
        </FadeIn>

        <FadeIn delay={0.24}>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/web-projects"
              className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-[var(--accent)] transition-colors duration-200 cursor-pointer"
            >
              View Work <ArrowRight size={14} />
            </Link>
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 border border-[#0A0A0A] px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-[#0A0A0A] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Read CV
            </Link>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.36}>
          <div className="mt-20 pt-10 border-t border-[#E2E2E2] grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Web Projects", value: "6" },
              { label: "Mobile Projects", value: "3" },
              { label: "Research Papers", value: "3" },
              { label: "Years Building", value: "5+" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-serif text-4xl font-bold text-[#0A0A0A]">{value}</p>
                <p className="text-[10px] text-[#888] uppercase tracking-[0.18em] mt-1.5">{label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── WEB PROJECTS BENTO ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28 border-b border-[#E2E2E2]">
        <FadeIn>
          <div className="flex items-end justify-between mb-10">
            <div>
              <SectionLabel>Selected Work</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-none tracking-tight">
                Web Projects
              </h2>
            </div>
            <Link
              href="/web-projects"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#888] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
            >
              All projects <ArrowRight size={12} />
            </Link>
          </div>
        </FadeIn>

        {/* Bento grid — 3 cols, 2 rows */}
        <FadeIn delay={0.1}>
          <div
            className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-4"
          >
            {/* Featured — spans 2 cols × 2 rows */}
            <Link
              href="/web-projects"
              className="bento-card md:col-span-2 md:row-span-2 bg-white border border-[#E2E2E2] p-8 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#AAAAAA]">
                  Featured
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-bold mt-3 mb-4 leading-tight group-hover:text-[var(--accent)] transition-colors duration-200">
                  {webProjects[0].name}
                </h3>
                <p className="text-[#555] text-sm leading-relaxed max-w-sm">
                  {webProjects[0].description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-6">
                {webProjects[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-[#0A0A0A] text-white px-2.5 py-1 uppercase tracking-wider font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>

            {/* Cards 2–4 */}
            {webProjects.slice(1, 4).map((project) => (
              <Link
                key={project.name}
                href="/web-projects"
                className="bento-card bg-white border border-[#E2E2E2] p-6 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
                    {project.name}
                  </h3>
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
              </Link>
            ))}
          </div>
        </FadeIn>

        <Link
          href="/web-projects"
          className="md:hidden mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#888] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
        >
          All web projects <ArrowRight size={12} />
        </Link>
      </section>

      {/* ── MOBILE PROJECTS BENTO ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28 border-b border-[#E2E2E2]">
        <FadeIn>
          <div className="flex items-end justify-between mb-10">
            <div>
              <SectionLabel>Native & Cross-Platform</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-none tracking-tight">
                Mobile Projects
              </h2>
            </div>
            <Link
              href="/mobile-projects"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#888] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
            >
              All apps <ArrowRight size={12} />
            </Link>
          </div>
        </FadeIn>

        {/* Mobile bento — featured left (tall), two stacked right */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(160px,auto)] gap-4">
            {/* Featured tall card */}
            <Link
              href="/mobile-projects"
              className="bento-card md:row-span-2 bg-[#0A0A0A] text-white border border-[#0A0A0A] p-8 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Smartphone size={14} className="text-[#888]" />
                  <span className="text-[10px] text-[#888] uppercase tracking-widest">
                    {mobileProjects[0].platform}
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-bold mb-3 leading-tight group-hover:text-[var(--accent)] transition-colors duration-200">
                  {mobileProjects[0].name}
                </h3>
                <p className="text-[#AAA] text-sm leading-relaxed">
                  {mobileProjects[0].description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-6">
                {mobileProjects[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] border border-[#333] text-[#AAA] px-2.5 py-1 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>

            {/* Two smaller cards stacked */}
            {mobileProjects.slice(1).map((project) => (
              <Link
                key={project.name}
                href="/mobile-projects"
                className="bento-card bg-white border border-[#E2E2E2] p-6 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Smartphone size={12} className="text-[#AAAAAA]" />
                    <span className="text-[9px] text-[#AAAAAA] uppercase tracking-widest">
                      {project.platform}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
                    {project.name}
                  </h3>
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
              </Link>
            ))}
          </div>
        </FadeIn>

        <Link
          href="/mobile-projects"
          className="md:hidden mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#888] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
        >
          All mobile projects <ArrowRight size={12} />
        </Link>
      </section>

      {/* ── PUBLISHED RESEARCH — Editorial List ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28 border-b border-[#E2E2E2]">
        <FadeIn>
          <div className="flex items-end justify-between mb-16">
            <div>
              <SectionLabel>Academic Work</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-none tracking-tight">
                Published Research
              </h2>
            </div>
            <Link
              href="/research"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#888] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
            >
              Full list <ArrowRight size={12} />
            </Link>
          </div>
        </FadeIn>

        <div className="flex flex-col">
          {papers.map((paper, i) => (
            <FadeIn key={paper.index} delay={i * 0.08}>
              <article className="border-t border-[#E2E2E2] py-8 grid grid-cols-[auto_1fr_auto] gap-x-6 md:gap-x-10 items-start group">
                {/* Index */}
                <span className="font-serif text-xs text-[#BBBBBB] font-medium pt-1 select-none w-6">
                  {paper.index}
                </span>

                {/* Body */}
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-semibold leading-snug mb-1.5 group-hover:text-[var(--accent)] transition-colors duration-200">
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
                  </h3>
                  <p className="text-[11px] text-[#999] uppercase tracking-widest mb-3 font-medium">
                    {paper.venue}
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

                {/* Year + icon */}
                <div className="flex flex-col items-end gap-3 pt-0.5">
                  <span className="font-serif text-sm text-[#AAAAAA] font-medium tabular-nums">
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

          {/* Terminal rule */}
          <div className="border-t border-[#E2E2E2]" />
        </div>

        <Link
          href="/research"
          className="md:hidden mt-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#888] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
        >
          All research <ArrowRight size={12} />
        </Link>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <SectionLabel>Let&apos;s Connect</SectionLabel>
              <h2 className="font-serif text-4xl md:text-6xl font-bold leading-none tracking-tight">
                Open to<br />
                <span className="text-[var(--accent)]">collaboration.</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 md:pb-1">
              <Link
                href="/cv"
                className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-[var(--accent)] transition-colors duration-200 cursor-pointer"
              >
                View CV <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
