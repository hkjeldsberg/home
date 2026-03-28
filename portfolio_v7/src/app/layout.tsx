import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ocean Scavenger — Portfolio',
  description: 'An interactive 3D wireframe ocean portfolio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
