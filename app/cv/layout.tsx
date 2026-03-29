import { Cinzel, Montserrat, Merriweather } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const merriweather = Merriweather({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-merriweather", display: "swap" });

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${cinzel.variable} ${montserrat.variable} ${merriweather.variable}`}>
      {children}
    </div>
  );
}
