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
  title: "Mariana Veiga | Consultoria de Imagem & Dress Code Corporativo",
  description:
    "Catálogo exclusivo de serviços de consultoria de imagem feminina e executiva. Alinhamento de estilo pessoal, biótipo, closet detox e dossiê de estilo com elegância e autoridade.",
  keywords: [
    "consultoria de imagem",
    "dress code corporativo",
    "estilo pessoal",
    "closet detox",
    "personal shopper",
    "Mariana Veiga",
  ],
  authors: [{ name: "Mariana Veiga" }],
  openGraph: {
    title: "Mariana Veiga | Consultoria de Imagem & Estilo Executivo",
    description:
      "Catálogo exclusivo de serviços de consultoria de imagem feminina e executiva. Descubra sua melhor versão com elegância e estratégia.",
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
