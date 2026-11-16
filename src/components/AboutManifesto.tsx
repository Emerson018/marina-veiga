"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform, type Variants } from "framer-motion";
import {
  EASE_SILK,
  VIEWPORT_ONCE,
  revealItem,
  staggerContainer,
} from "@/lib/motion";
import PillarTape, { type Pillar } from "./PillarTape";

const PILLARS: Pillar[] = [
  {
    title: "Estilo para a vida real",
    description:
      "Looks pensados para as ocasiões que você vive de fato: o trabalho, a rotina, os eventos e as viagens, sempre a partir das peças que você já tem.",
  },
  {
    title: "Quiet luxury",
    description:
      "Elegância sem excessos: caimentos impecáveis, tecidos nobres e peças atemporais com alto custo por uso.",
  },
  {
    title: "Autonomia perpétua",
    description:
      "Você no controle do seu closet, escolhendo looks pela manhã com rapidez, intenção e sem frustração.",
  },
];

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

  return (
    <section
      ref={sectionRef}
      id="sobre"
      aria-labelledby="about-heading"
      className="scroll-mt-4 pt-4 pb-8 md:pt-5 md:pb-10 border-b border-rose-border/40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <m.div
          data-reveal
          variants={revealItem}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="max-w-3xl mb-3 lg:mb-4"
        >
          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl lg:text-[32px] font-display text-rose-antique tracking-wide leading-tight mb-1.5 text-balance"
          >
            A imagem não é sobre aparência. É sobre posicionamento.
          </h2>
          <p className="text-xs sm:text-[13.5px] text-rose-light/90 font-light leading-relaxed max-w-3xl">
            Numa reunião, num casamento ou numa viagem, sua presença comunica antes mesmo de você dizer uma palavra. Meu trabalho é traduzir quem você é em uma linguagem visual coerente, sem fórmulas prontas e sem tendências passageiras.
          </p>
        </m.div>

        {/* Grid: Story + Pillars (Balanced proportions to fit full section comfortably in viewport) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Editorial Image: Compact aspect ratio and max-width */}
          <div className="lg:col-span-5 relative">
            {/* Revelação por Tecido: a moldura desce como um tecido assentando.
                Duas translações opostas (moldura desce, foto fica parada)
                revelam a imagem só com `transform`. */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="relative aspect-[4/4.2] max-w-[270px] sm:max-w-[290px] lg:max-w-[310px] w-full mx-auto lg:mx-0 overflow-hidden rounded-sm shadow-xl"
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
                      sizes="(max-width: 1024px) 100vw, 310px"
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
              className="absolute -bottom-2.5 -right-2 sm:-right-3 hidden sm:block bg-forest-deep/95 backdrop-blur-sm border border-rose-antique/40 p-2.5 sm:p-3 rounded-sm shadow-xl max-w-[260px] sm:max-w-[285px]"
            >
              <p className="font-display text-xs sm:text-sm text-rose-antique italic leading-snug">
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
              className="relative pl-4 border-l-2 border-rose-antique/40 py-0.5 mb-3"
            >
              <p className="text-xs sm:text-[13px] md:text-sm text-rose-light/90 font-light leading-relaxed">
                Formada em Design de Moda e com 4 anos de experiência em consultoria de estilo, construo com cada cliente um closet inteligente, a partir da rotina real, dos objetivos e das proporções dela. Sem restrições arbitrárias.
              </p>
            </m.div>

            {/* Fita Métrica: os princípios marcados por um alfinete */}
            <PillarTape pillars={PILLARS} />
          </m.div>
        </div>
      </div>
    </section>
  );
}
