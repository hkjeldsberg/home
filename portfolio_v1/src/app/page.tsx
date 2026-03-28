import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 md:py-36">
      <FadeIn>
        <p className="text-sm uppercase tracking-widest text-[var(--accent)] mb-4 font-medium">
          Software Engineer · Researcher · Builder
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-8">
          Hi, I&apos;m HAK.
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-12">
          I build high-performance web and mobile applications, conduct research
          at the intersection of technology and human behaviour, and ship
          products people actually use. Based in [City]. Open to collaboration.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/web-projects"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-sm font-medium uppercase tracking-wide hover:bg-[var(--accent)] transition-colors"
          >
            View Projects <ArrowRight size={16} />
          </Link>
          <Link
            href="/cv"
            className="inline-flex items-center gap-2 border border-black px-6 py-3 text-sm font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
          >
            Read CV
          </Link>
        </div>
      </FadeIn>

      {/* Divider */}
      <FadeIn delay={0.45}>
        <div className="mt-24 pt-12 border-t border-black grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Web Projects", value: "6" },
            { label: "Mobile Projects", value: "3" },
            { label: "Research Papers", value: "—" },
            { label: "Years Building", value: "—" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
