"use client";

import { useRef } from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, Compass } from "lucide-react";
import { m, useScroll, useTransform, type Variants } from "framer-motion";
import {
  EASE_SILK,
  SPRING_SETTLE,
  VIEWPORT_ONCE,
  revealItem,
  staggerContainer,
} from "@/lib/motion";

/** Metade da Revelação por Tecido: sai de `from` e assenta em 0. */
function fabricDrop(from: string): Variants {
  return {
    hidden: { y: from },
    visible: { y: 0, transition: { duration: 1.2, ease: EASE_SILK } },
  };
}

export default function AboutManifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  // Paralaxe sutil do retrato enquanto a seção atravessa a tela.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Estilo para a Vida Real",
      description:
        "Looks pensados para as ocasiões que você vive de fato: o trabalho, a rotina, os eventos e as viagens, sempre a partir das peças que você já tem.",
    },
    {
      icon: Sparkles,
      title: "Quiet Luxury",
      description:
        "Elegância sem excessos: caimentos impecáveis, tecidos nobres e peças atemporais com alto custo por uso.",
    },
    {
      icon: Compass,
      title: "Autonomia Perpétua",
      description:
        "Você no controle do seu closet, escolhendo looks pela manhã com rapidez, intenção e sem frustração.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="sobre"
      aria-labelledby="about-heading"
      className="scroll-mt-8 py-12 md:py-16 border-b border-rose-border/40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <m.div
          data-reveal
          variants={revealItem}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="max-w-3xl mb-5 lg:mb-6"
        >
          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-display text-rose-antique tracking-wide leading-tight mb-2 text-balance"
          >
            A imagem não é sobre aparência. É sobre posicionamento.
          </h2>
          <p className="text-sm sm:text-[15px] text-rose-light/90 font-light leading-relaxed max-w-3xl">
            Numa reunião, num casamento ou numa viagem, sua presença comunica antes mesmo de você dizer uma palavra. Meu trabalho é traduzir quem você é em uma linguagem visual coerente, sem fórmulas prontas e sem tendências passageiras.
          </p>
        </m.div>

        {/* Grid: Story + Pillars (Balanced proportions to fit full section in viewport) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Editorial Image: Compact aspect ratio and max-width */}
          <div className="lg:col-span-5 relative">
            {/* Revelação por Tecido: a moldura desce como um tecido assentando.
                Duas translações opostas (moldura desce, foto fica parada)
                revelam a imagem só com `transform`. */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="relative aspect-[4/4.5] sm:aspect-[4/4.8] max-w-[340px] sm:max-w-[380px] w-full mx-auto lg:mx-0 overflow-hidden rounded-sm shadow-xl"
            >
              <m.div
                data-reveal
                variants={fabricDrop("-100%")}
                className="absolute inset-0 rounded-sm overflow-hidden border border-rose-border bg-forest-card/50"
              >
                <m.div
                  data-reveal
                  variants={fabricDrop("100%")}
                  className="absolute inset-0"
                >
                  <m.div
                    style={{ y: portraitY }}
                    className="absolute -inset-y-[5%] inset-x-0 motion-reduce:!transform-none"
                  >
                    <Image
                      src="/fotos/foto-2.jpg"
                      alt="Mariana Veiga - Consultora de Imagem e Estilo Pessoal"
                      fill
                      sizes="(max-width: 1024px) 100vw, 380px"
                      className="object-cover object-top hover:scale-[1.02] transition-transform duration-500 motion-reduce:transition-none"
                    />
                  </m.div>
                </m.div>
              </m.div>
            </m.div>
            <m.div
              data-reveal
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.6, ease: EASE_SILK, delay: 0.7 }}
              className="absolute -bottom-4 -right-2 sm:-right-4 hidden sm:block bg-forest-deep border border-rose-antique/40 p-3 sm:p-3.5 rounded-sm shadow-xl max-w-xs"
            >
              <p className="font-display text-base sm:text-lg text-rose-antique italic leading-snug">
                “O verdadeiro luxo reside na coerência entre quem você é e o que você veste.”
              </p>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-rose-light/60 font-sans block mt-1">
                — Mariana Veiga
              </span>
            </m.div>
          </div>

          {/* Pillars & Philosophy */}
          <m.div
            variants={staggerContainer(0.11, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="lg:col-span-7 flex flex-col items-start lg:-mt-1"
          >
            {/* Bio statement with elegant left border line */}
            <m.div
              data-reveal
              variants={revealItem}
              className="relative pl-4 border-l-2 border-rose-antique/40 py-0.5 mb-4"
            >
              <p className="text-xs sm:text-[13px] md:text-sm text-rose-light/90 font-light leading-relaxed">
                Formada em Design de Moda e com 4 anos de experiência em consultoria de estilo, construo com cada cliente um closet inteligente, a partir da rotina real, dos objetivos e das proporções dela. Sem restrições arbitrárias.
              </p>
            </m.div>

            {/* Caixinhas Grid: Compact padding and spacing */}
            <div className="w-full grid grid-cols-1 gap-2.5 sm:gap-3">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;

                return (
                  <m.div
                    key={pillar.title}
                    data-reveal
                    variants={revealItem}
                    whileHover={{ y: -2, transition: SPRING_SETTLE }}
                    className="group p-3.5 sm:p-4 rounded-sm border border-rose-border bg-forest-card/40 hover:border-rose-antique/70 hover:bg-forest-card/70 transition-colors duration-500 motion-reduce:transition-none flex items-start gap-3 sm:gap-3.5"
                  >
                    <div className="p-2 rounded-sm bg-forest-deep border border-rose-border text-rose-antique shrink-0 group-hover:border-rose-antique/50 group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-4 h-4 text-rose-antique" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-sans text-xs sm:text-[13px] uppercase tracking-widest text-rose-antique font-semibold mb-0.5">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-rose-light/80 font-light leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
