"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import ServiceCard from "./ServiceCard";

export default function CatalogGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const corporateWhatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Gostaria de conversar sobre uma proposta corporativa personalizada."
  );

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? SERVICES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === SERVICES.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) nextSlide();
      else prevSlide();
    }
    setTouchStartX(null);
  };

  // Circular offset calculation relative to activeIndex (-3 to +2 for 6 items)
  const getCardOffset = (index: number, active: number, total: number) => {
    let diff = index - active;
    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor((total - 1) / 2)) diff -= total;
    return diff;
  };

  return (
    <section
      id="catalogo"
      aria-labelledby="catalog-heading"
      className="py-24 border-b border-rose-border/40 relative overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-roledescription="carrossel"
      aria-label="Catálogo de Serviços Mariana Veiga"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-ultra text-rose-antique font-sans font-medium block mb-3">
            Catálogo Exclusivo
          </span>
          <h2
            id="catalog-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display text-rose-antique tracking-wide leading-tight mb-4 text-balance"
          >
            Serviços & Experiências de Imagem
          </h2>
          <p className="text-base sm:text-lg text-rose-light/80 font-light leading-relaxed">
            Cada mulher tem um momento e um objetivo diferente. Escolha o formato que faz mais sentido para a sua carreira e para a sua rotina.
          </p>
        </div>

        {/* High-Fashion Spotlight Gallery Stage */}
        <div
          className="relative w-full max-w-5xl mx-auto flex items-start justify-center min-h-[500px] sm:min-h-[560px] md:min-h-[600px] py-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {SERVICES.map((service, index) => {
            const diff = getCardOffset(index, activeIndex, SERVICES.length);
            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;

            let transformClass = "translate-x-0 scale-100 z-30 opacity-100 shadow-2xl";
            if (isLeft) {
              transformClass =
                "-translate-x-[55%] sm:-translate-x-[72%] md:-translate-x-[85%] scale-[0.88] z-20 opacity-40 hover:opacity-75 cursor-pointer";
            } else if (isRight) {
              transformClass =
                "translate-x-[55%] sm:translate-x-[72%] md:translate-x-[85%] scale-[0.88] z-20 opacity-40 hover:opacity-75 cursor-pointer";
            } else if (!isCenter) {
              transformClass = "translate-x-0 scale-75 z-10 opacity-0 pointer-events-none";
            }

            return (
              <div
                key={service.id}
                className={`absolute top-0 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] transition-all duration-500 ease-out motion-reduce:transition-none ${transformClass}`}
                onClick={() => {
                  if (!isCenter) {
                    setActiveIndex(index);
                  }
                }}
                onFocus={() => {
                  if (!isCenter) setActiveIndex(index);
                }}
                tabIndex={isCenter ? 0 : -1}
              >
                <ServiceCard
                  service={service}
                  isActive={isCenter}
                  isExpanded={isCenter && expandedServiceId === service.id}
                  onToggleExpand={() => {
                    if (isCenter) {
                      setExpandedServiceId((prev) =>
                        prev === service.id ? null : service.id
                      );
                    }
                  }}
                  onSelect={() => setActiveIndex(index)}
                />
              </div>
            );
          })}
        </div>

        {/* Minimalist Rosé Navigation Controls & Progress */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <button
              onClick={prevSlide}
              aria-label="Serviço anterior"
              className="w-11 h-11 rounded-full border border-rose-border text-rose-antique hover:border-rose-antique hover:bg-forest-card/80 transition-all flex items-center justify-center active:scale-95 focus-visible:outline-rose-antique shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex flex-col items-center gap-0.5">
              <span className="font-display tabular-nums text-sm tracking-widest text-rose-antique font-medium">
                {String(activeIndex + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-rose-light/60 font-sans truncate max-w-[220px] text-center">
                {SERVICES[activeIndex].title}
              </span>
            </div>

            <button
              onClick={nextSlide}
              aria-label="Próximo serviço"
              className="w-11 h-11 rounded-full border border-rose-border text-rose-antique hover:border-rose-antique hover:bg-forest-card/80 transition-all flex items-center justify-center active:scale-95 focus-visible:outline-rose-antique shadow-sm"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Interactive Pill Dash Indicators */}
          <div
            className="flex items-center gap-2 pt-1"
            role="tablist"
            aria-label="Indicadores dos serviços"
          >
            {SERVICES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveIndex(idx)}
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Ver serviço ${idx + 1}: ${s.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-rose-antique ${
                  idx === activeIndex
                    ? "w-8 bg-rose-antique"
                    : "w-2.5 bg-rose-border hover:bg-rose-antique/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Custom Inquiry Note */}
        <div className="mt-16 text-center p-8 rounded-sm border border-rose-border bg-forest-card/30 max-w-2xl mx-auto">
          <h3 className="font-display text-xl text-rose-antique mb-2">
            Necessita de um projeto corporativo sob medida?
          </h3>
          <p className="text-xs sm:text-sm text-rose-light/70 font-light mb-4">
            Atendemos também executivas de alta liderança, palestras in-company sobre
            dress code corporativo e consultoria para equipes.
          </p>
          <a
            href={corporateWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-rose-antique hover:text-rose-light underline underline-offset-4 font-medium transition-colors"
          >
            Solicitar Proposta Corporativa Customizada →
          </a>
        </div>
      </div>
    </section>
  );
}
