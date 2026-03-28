import { Anchor } from 'lucide-react';

export function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5 pointer-events-none">
      <div className="flex items-center gap-2 text-white/90 font-semibold text-lg tracking-wide">
        <Anchor className="w-5 h-5 text-blue-400" />
        <span>Portfolio</span>
      </div>
      <ul className="flex gap-6 text-sm text-white/60 pointer-events-auto">
        <li>
          <a href="/cv" className="hover:text-white transition-colors">CV</a>
        </li>
        <li>
          <a href="/research" className="hover:text-white transition-colors">Research</a>
        </li>
        <li>
          <a href="/projects" className="hover:text-white transition-colors">Projects</a>
        </li>
        <li>
          <a href="/mobile" className="hover:text-white transition-colors">Mobile</a>
        </li>
      </ul>
    </nav>
  );
}
