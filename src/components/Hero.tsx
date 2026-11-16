"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { m, type Variants } from "framer-motion";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import { EASE_SILK, pressable, revealItem, staggerContainer } from "@/lib/motion";
import HeroBio from "./HeroBio";
import ThreadMannequin from "./ThreadMannequin";

const TITLE = "Elegância que nasce do que você já tem.";

const SIGNALS = [
  { value: "100%", label: "Personalizado" },
  { value: "Híbrido", label: "Online & Presencial" },
  { value: "Até 7 dias", label: "Dossiê pronto" },
];

const titleWord: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.8, ease: EASE_SILK } },
};

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
        <m.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          <m.h1
            id="hero-title"
            variants={staggerContainer(0.07)}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-display text-rose-antique tracking-wide leading-[1.12] mb-3 text-balance"
          >
            {TITLE.split(" ").map((word, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
                  <m.span
                    data-reveal
                    variants={titleWord}
                    className="inline-block"
                  >
                    {word}
                  </m.span>
                </span>{" "}
              </span>
            ))}
          </m.h1>

          <HeroBio />

          <m.div
            data-reveal
            variants={revealItem}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
          >
            <m.a
              href="#catalogo"
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.getElementById("catalogo");
                if (targetElement) {
                  const headerOffset = 76;
                  const elementPosition = targetElement.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: "smooth",
                  });
                  try {
                    window.history.pushState(null, "", "#catalogo");
                  } catch {}
                }
              }}
              {...pressable}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-sm bg-rose-antique text-forest-deep text-xs uppercase tracking-widest font-semibold hover:bg-rose-light transition-colors shadow-lg hover:shadow-rose-antique/10 focus-visible:outline-rose-antique"
            >
              <span>Conhecer os Serviços</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </m.a>

            <m.a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              {...pressable}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-sm border border-rose-antique/50 text-rose-antique hover:bg-forest-card text-xs uppercase tracking-widest font-medium transition-colors focus-visible:outline-rose-antique"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Falar no WhatsApp</span>
            </m.a>
          </m.div>

          {/* Quick Signals */}
          <m.dl
            variants={staggerContainer(0.1)}
            className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-rose-border/50 grid grid-cols-3 gap-3 sm:gap-10 w-full max-w-md"
          >
            {SIGNALS.map((signal) => (
              <m.div
                key={signal.label}
                data-reveal
                variants={revealItem}
                className="flex flex-col-reverse justify-end"
              >
                <dt className="text-[10px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-widest text-rose-light/70 font-sans">
                  {signal.label}
                </dt>
                <dd className="font-display text-xl sm:text-2xl text-rose-antique tabular-nums">
                  {signal.value}
                </dd>
              </m.div>
            ))}
          </m.dl>
        </m.div>

        {/* Fio de Alinhavo: manequim de moulage costurado em canvas */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <ThreadMannequin className="w-full max-w-[230px] sm:max-w-[300px] lg:max-w-[360px]" />
        </div>
      </div>
    </section>
  );
}
