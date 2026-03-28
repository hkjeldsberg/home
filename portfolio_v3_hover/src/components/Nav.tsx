"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/web-projects", label: "Web" },
  { href: "/mobile-projects", label: "Mobile" },
  { href: "/cv", label: "CV" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      {/* Glassmorphism pill */}
      <div className="bg-white/75 backdrop-blur-md border border-black/10 shadow-[0_2px_20px_rgba(0,0,0,0.07)]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-sm tracking-[0.18em] uppercase hover:text-[var(--accent)] transition-colors duration-200"
          >
            HAK
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-xs font-medium tracking-widest uppercase transition-colors duration-200 hover:text-[var(--accent)] ${
                    pathname === href
                      ? "text-[var(--accent)]"
                      : "text-[#0A0A0A]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden cursor-pointer p-1 hover:text-[var(--accent)] transition-colors duration-200"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden mt-1 bg-white/95 backdrop-blur-md border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <ul className="flex flex-col py-2">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors duration-200 hover:text-[var(--accent)] hover:bg-[var(--accent-dim)] ${
                    pathname === href
                      ? "text-[var(--accent)] bg-[var(--accent-dim)]"
                      : "text-[#0A0A0A]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
