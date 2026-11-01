"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, Compass } from "lucide-react";

export default function AboutManifesto() {
  const [isVisible, setIsVisible] = useState(
    () => typeof process !== "undefined" && process.env.NODE_ENV === "test"
  );
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Dress Code Estratégico",
      description:
        "Domine os códigos visuais do ambiente corporativo e posicione sua autoridade com segurança e refinamento.",
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
      className="py-12 md:py-16 border-b border-rose-border/40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`max-w-3xl mb-6 lg:mb-8 transition-all duration-700 motion-reduce:transition-none ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-[11px] uppercase tracking-ultra text-rose-antique font-sans font-medium block mb-2">
            Manifesto & Metodologia
          </span>
          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-display text-rose-antique tracking-wide leading-tight mb-2.5 text-balance"
          >
            A imagem não é sobre aparência. É sobre posicionamento.
          </h2>
          <p className="text-sm sm:text-base text-rose-light/90 font-light leading-relaxed max-w-2xl">
            No universo corporativo e nos negócios, sua presença comunica antes mesmo de você dizer uma palavra. Meu trabalho é traduzir sua competência e sua ambição em uma linguagem visual coerente, sem fórmulas prontas e sem tendências passageiras.
          </p>
        </div>

        {/* Grid: Story + Pillars (Balanced proportions to fit full section in viewport) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Editorial Image: Compact aspect ratio and max-width */}
          <div
            className={`lg:col-span-5 relative transition-all duration-700 delay-150 motion-reduce:transition-none ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="relative aspect-[4/4.5] sm:aspect-[4/4.8] max-w-[340px] sm:max-w-[380px] w-full mx-auto lg:mx-0 rounded-sm overflow-hidden border border-rose-border bg-forest-card/50 shadow-xl">
              <Image
                src="/fotos/foto-2.jpg"
                alt="Mariana Veiga - Consultora de Imagem e Estilo Pessoal"
                fill
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div
              className={`absolute -bottom-4 -right-2 sm:-right-4 hidden sm:block bg-forest-deep border border-rose-antique/40 p-3 sm:p-3.5 rounded-sm shadow-xl max-w-xs transition-all duration-700 delay-[350ms] motion-reduce:transition-none ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="font-display text-base sm:text-lg text-rose-antique italic leading-snug">
                “O verdadeiro luxo reside na coerência entre quem você é e o que você veste.”
              </p>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-rose-light/60 font-sans block mt-1">
                — Mariana Veiga
              </span>
            </div>
          </div>

          {/* Pillars & Philosophy */}
          <div className="lg:col-span-7 flex flex-col items-start lg:-mt-1">
            {/* Bio statement with elegant left border line */}
            <div
              className={`relative pl-4 border-l-2 border-rose-antique/40 py-0.5 mb-4 transition-all duration-700 delay-200 motion-reduce:transition-none ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-xs sm:text-[13px] md:text-sm text-rose-light/90 font-light leading-relaxed">
                Formada em Design de Moda e com 4 anos de experiência em consultoria de estilo, construo com cada cliente um closet inteligente, a partir da rotina real, dos objetivos profissionais e das proporções dela. Sem restrições arbitrárias.
              </p>
            </div>

            {/* Caixinhas Grid: Compact padding and spacing */}
            <div className="w-full grid grid-cols-1 gap-2.5 sm:gap-3">
              {pillars.map((pillar, index) => {
                const IconComponent = pillar.icon;
                const delayStyle =
                  index === 0
                    ? "delay-[300ms]"
                    : index === 1
                    ? "delay-[420ms]"
                    : "delay-[540ms]";

                return (
                  <div
                    key={pillar.title}
                    className={`group p-3.5 sm:p-4 rounded-sm border border-rose-border bg-forest-card/40 hover:border-rose-antique/70 hover:bg-forest-card/70 transition-all duration-500 motion-reduce:transition-none hover:-translate-y-0.5 flex items-start gap-3 sm:gap-3.5 ${delayStyle} ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
