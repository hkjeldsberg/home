import { Lora, Lato } from "next/font/google";

const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });
const lato = Lato({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-lato", display: "swap" });

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${lora.variable} ${lato.variable}`}>{children}</div>;
}
