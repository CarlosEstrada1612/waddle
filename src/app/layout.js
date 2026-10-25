import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata = {
  title: { default: "Waddle | Eventos y comunidad", template: "%s | Waddle" },
  description: "Plataforma de eventos y agrupaciones de Informática PUCP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geist.variable} h-full`}>
      <body className="h-full flex bg-[#030d1c] text-[#f0f6ff]">
        <Sidebar />
        <main className="flex-1 ml-[220px] min-h-screen overflow-x-hidden flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
