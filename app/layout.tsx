import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const title = "hkjeldsberg – PhD, Data Engineer/Scientist, Lead Consultant";
const description =
  "Henrik Kjeldsberg – data engineer, researcher and software developer. PhD in computational cardiovascular modelling, plus a collection of web projects.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hkjeldsberg.no"),
  title,
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "hkjeldsberg",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-black`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
