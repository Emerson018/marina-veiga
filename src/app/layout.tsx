import type { Metadata, Viewport } from "next";
import { Italiana, Montserrat } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italiana",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mariana Veiga | Consultoria de Imagem & Estilo Pessoal",
  description:
    "Consultoria de imagem feminina para o trabalho, a rotina, os eventos e as viagens. Dossiê de Estilo, análise de biotipo, closet detox, styling para eventos e personal shopper, com preços e prazos claros.",
  keywords: [
    "consultoria de imagem",
    "estilo pessoal",
    "dossiê de estilo",
    "closet detox",
    "personal shopper",
    "styling para eventos",
    "Mariana Veiga",
  ],
  authors: [{ name: "Mariana Veiga" }],
  openGraph: {
    title: "Mariana Veiga | Consultoria de Imagem & Estilo Pessoal",
    description:
      "Consultoria de imagem feminina a partir das peças que você já tem: looks para o trabalho, a rotina, os eventos e as viagens.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#223829",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${italiana.variable} ${montserrat.variable} scroll-smooth`}
    >
      <head>
        {/* Sem JS, nada fica preso no estado inicial das animações. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.thread-fallback{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body className="bg-forest text-rose-light antialiased selection:bg-rose-antique selection:text-forest-deep min-h-screen">
        {/* Skip link for keyboard accessibility (Web Interface Guidelines) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-rose-antique focus:text-forest-deep focus:font-medium focus:rounded-sm focus:shadow-lg"
        >
          Pular para o conteúdo principal
        </a>
        <div id="root-container" className="flex flex-col min-h-screen">
          <MotionProvider>{children}</MotionProvider>
        </div>
      </body>
    </html>
  );
}
