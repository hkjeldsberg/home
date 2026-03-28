import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HAK — Software Engineer & Researcher',
  description:
    'Personal portfolio of HAK — software engineer, researcher, and builder of high-performance web and mobile applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[var(--bg)] text-[var(--text)] font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--accent)] focus:text-white focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main-content" className="pt-16">{children}</main>
      </body>
    </html>
  )
}
