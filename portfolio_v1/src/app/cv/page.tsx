import FadeIn from "@/components/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";
import { Download, MapPin, Mail } from "lucide-react";

const experience = [
  {
    role: "Senior Software Engineer",
    company: "Company Name",
    period: "20XX – Present",
    location: "City, Country",
    bullets: [
      "Placeholder: Led development of a high-traffic platform serving X+ users.",
      "Placeholder: Architected microservices migration reducing latency by X%.",
      "Placeholder: Mentored a team of X engineers across two product squads.",
    ],
    tags: ["Next.js", "TypeScript", "AWS"],
  },
  {
    role: "Software Engineer",
    company: "Company Name",
    period: "20XX – 20XX",
    location: "City, Country",
    bullets: [
      "Placeholder: Built and shipped mobile features used by X+ daily active users.",
      "Placeholder: Collaborated with design and product to define MVP scope.",
      "Placeholder: Improved test coverage from X% to X%.",
    ],
    tags: ["React Native", "Node.js", "PostgreSQL"],
  },
  {
    role: "Research Assistant",
    company: "University / Institute",
    period: "20XX – 20XX",
    location: "City, Country",
    bullets: [
      "Placeholder: Conducted user studies on mobile health application adoption.",
      "Placeholder: Co-authored X published papers in peer-reviewed venues.",
      "Placeholder: Developed data collection and analysis pipelines.",
    ],
    tags: ["HCI", "Python", "R"],
  },
];

const skills = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "Swift", "Kotlin", "Dart"] },
  { category: "Frontend", items: ["React", "Next.js", "Vue", "SvelteKit", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "FastAPI", "GraphQL", "REST"] },
  { category: "Mobile", items: ["React Native", "Flutter", "iOS (SwiftUI)", "Android"] },
  { category: "Infrastructure", items: ["AWS", "Vercel", "Docker", "PostgreSQL", "Firebase"] },
  { category: "Research", items: ["User Studies", "Mixed Methods", "HCI", "Data Analysis"] },
];

const education = [
  {
    degree: "MSc Computer Science",
    institution: "University Name",
    period: "20XX – 20XX",
    note: "Placeholder — thesis topic and relevant coursework.",
  },
  {
    degree: "BSc Computer Science",
    institution: "University Name",
    period: "20XX – 20XX",
    note: "Placeholder — honours, relevant modules.",
  },
];

export default function CVPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-black">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Curriculum Vitae</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
              <span className="flex items-center gap-1"><MapPin size={14} /> City, Country</span>
              <span className="flex items-center gap-1"><Mail size={14} /> hello@example.com</span>
            </div>
          </div>
          <a
            href="/cv.pdf"
            className="inline-flex items-center gap-2 border border-black px-5 py-2.5 text-sm font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-colors self-start md:self-auto"
          >
            <Download size={15} /> Download PDF
          </a>
        </div>
      </FadeIn>

      {/* Experience */}
      <FadeIn delay={0.1}>
        <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Experience</h2>
      </FadeIn>
      <StaggerContainer className="flex flex-col gap-10 mb-16">
        {experience.map((role) => (
          <StaggerItem key={`${role.role}-${role.company}`}>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
              <div>
                <p className="text-sm font-medium">{role.period}</p>
                <p className="text-xs text-gray-400 mt-0.5">{role.location}</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">{role.role}</h3>
                <p className="text-sm text-[var(--accent)] mb-3">{role.company}</p>
                <ul className="list-disc list-outside ml-4 space-y-1">
                  {role.bullets.map((b) => (
                    <li key={b} className="text-sm text-gray-700">{b}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {role.tags.map((tag) => (
                    <span key={tag} className="text-xs border border-black px-2 py-0.5 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Education */}
      <FadeIn>
        <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Education</h2>
      </FadeIn>
      <StaggerContainer className="flex flex-col gap-6 mb-16">
        {education.map((edu) => (
          <StaggerItem key={edu.degree}>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
              <p className="text-sm font-medium">{edu.period}</p>
              <div>
                <h3 className="font-bold">{edu.degree}</h3>
                <p className="text-sm text-[var(--accent)]">{edu.institution}</p>
                <p className="text-sm text-gray-500 mt-1">{edu.note}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Skills */}
      <FadeIn>
        <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Technical Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map(({ category, items }) => (
            <div key={category}>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-2">{category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="text-xs border border-black px-2 py-0.5">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
