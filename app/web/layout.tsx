import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira", display: "swap" });

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return <div className={firaCode.variable}>{children}</div>;
}
