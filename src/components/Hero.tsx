import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import HeroBio from "./HeroBio";

export default function Hero() {
  const whatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Gostaria de agendar uma conversa sobre a consultoria de imagem."
  );

  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-6 sm:py-8 lg:py-10 border-b border-rose-border/40 overflow-hidden"
    >
      {/* Subtle background ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-rose-antique/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 w-full">
        {/* Left Editorial Copy */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <h1
            id="hero-title"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-display text-rose-antique tracking-wide leading-[1.12] mb-3 text-balance"
          >
            Elegância Estratégica & Autoridade Feminina
          </h1>

          <HeroBio />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
            <Link
              href="#catalogo"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-sm bg-rose-antique text-forest-deep text-xs uppercase tracking-widest font-semibold hover:bg-rose-light transition-colors shadow-lg hover:shadow-rose-antique/10 focus-visible:outline-rose-antique"
            >
              <span>Conhecer os Serviços</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-sm border border-rose-antique/50 text-rose-antique hover:bg-forest-card text-xs uppercase tracking-widest font-medium transition-colors focus-visible:outline-rose-antique"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>

          {/* Quick Metrics / Signals */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-rose-border/50 grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-md">
            <div>
              <span className="block font-display text-xl sm:text-2xl text-rose-antique tabular-nums">
                100%
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-rose-light/70 font-sans">
                Personalizado
              </span>
            </div>
            <div>
              <span className="block font-display text-xl sm:text-2xl text-rose-antique">
                Híbrido
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-rose-light/70 font-sans">
                Online & Presencial
              </span>
            </div>
            <div>
              <span className="block font-display text-xl sm:text-2xl text-rose-antique">
                Exclusivo
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-rose-light/70 font-sans">
                Dossiê Impresso
              </span>
            </div>
          </div>
        </div>

        {/* Right Editorial Portrait Frame */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[310px] sm:max-w-[340px] lg:max-w-[360px] aspect-[4/4.8] rounded-sm overflow-hidden p-1.5 border border-rose-border bg-forest-card/40 shadow-2xl">
            <div className="relative w-full h-full rounded-sm overflow-hidden">
              <Image
                src="/fotos/foto-1.jpg"
                alt="Mariana Veiga - Consultora de Imagem e Estilo Pessoal"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
