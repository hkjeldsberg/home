import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#020b18] text-white gap-6">
      <h1 className="text-4xl font-bold tracking-tight">Web Development</h1>
      <p className="text-white/50 text-sm">Coming soon.</p>
      <Link href="/" className="text-blue-400 text-sm hover:underline">
        ← Back to ocean
      </Link>
    </main>
  );
}
