"use client";

import { useState, useRef } from "react";
import { SERVICES } from "@/data/services";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import ServiceCard from "./ServiceCard";

export default function CatalogGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const scrollToStage = () => {
    if (typeof window === "undefined" || !stageRef.current) return;
    try {
      const navbarHeight = 80;
      const topGap = 16;
      const stageTop =
        stageRef.current.getBoundingClientRect().top + window.scrollY;
      const targetScrollY = Math.max(0, stageTop - navbarHeight - topGap);

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    } catch {
      // Graceful fallback for test runners / environments without scrollTo
    }
  };

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
      className="scroll-mt-4 sm:scroll-mt-0 py-24 border-b border-rose-border/40 relative overflow-hidden"
      aria-roledescription="carrossel"
      aria-label="Catálogo de Serviços Mariana Veiga"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
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

        {/* Category Navigation Bar */}
        <nav
          aria-label="Categorias de serviços"
          className="w-full max-w-4xl mx-auto mb-10 px-2"
        >
          <div
            role="tablist"
            className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth flex-nowrap sm:flex-wrap"
          >
            {SERVICES.map((service, index) => {
              const isSelected = activeIndex === index;
              return (
                <button
                  key={service.id}
                  role="tab"
                  id={`tab-${service.id}`}
                  aria-label={service.title}
                  aria-selected={isSelected}
                  aria-controls={`service-card-${service.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => {
                    setActiveIndex(index);
                    scrollToStage();
                  }}
                  className={`whitespace-nowrap px-4 py-2 text-xs uppercase tracking-wider font-sans rounded-sm border transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:ring-1 focus-visible:ring-rose-antique focus-visible:outline-none shrink-0 cursor-pointer ${
                    isSelected
                      ? service.isFeatured
                        ? "bg-rose-antique text-forest-deep border-rose-antique font-bold shadow-lg shadow-rose-antique/30 ring-1 ring-rose-antique"
                        : "bg-rose-antique text-forest-deep border-rose-antique font-semibold shadow-md shadow-rose-antique/20"
                      : service.isFeatured
                      ? "bg-forest-card text-rose-antique border-rose-antique/60 hover:border-rose-antique hover:bg-forest-surface font-semibold"
                      : "bg-forest-card/60 text-rose-light/80 border-rose-border/60 hover:text-rose-antique hover:border-rose-antique/60 hover:bg-forest-card font-medium"
                  }`}
                  style={{ touchAction: "manipulation" }}
                >
                  {service.isFeatured && (
                    <span className="inline-block mr-1 text-rose-antique" aria-hidden="true">
                      ✦
                    </span>
                  )}
                  {service.title}
                </button>
              );
            })}
          </div>
        </nav>

        {/* High-Fashion Spotlight Gallery Stage */}
        <div
          ref={stageRef}
          className={`relative w-full max-w-5xl mx-auto flex items-start justify-center py-4 focus-visible:ring-1 focus-visible:ring-rose-antique/50 focus-visible:outline-none rounded-sm transition-[min-height] duration-300 ${
            expandedServiceId
              ? "min-h-[880px] sm:min-h-[820px] md:min-h-[780px]"
              : "min-h-[620px] sm:min-h-[660px] md:min-h-[700px]"
          }`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Galeria de serviços. Use as setas do teclado para navegar."
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
                id={`service-card-${service.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${service.id}`}
                className={`absolute top-0 w-full max-w-[320px] sm:max-w-[390px] md:max-w-[420px] transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none ${transformClass}`}
                onClick={() => {
                  if (!isCenter) {
                    setActiveIndex(index);
                  }
                  scrollToStage();
                }}
                onFocus={() => {
                  if (!isCenter) setActiveIndex(index);
                }}
                tabIndex={isCenter ? 0 : -1}
              >
                <ServiceCard
                  service={service}
                  serviceNumber={index + 1}
                  isActive={isCenter}
                  isExpanded={isCenter && expandedServiceId === service.id}
                  onToggleExpand={() => {
                    if (isCenter) {
                      setExpandedServiceId((prev) =>
                        prev === service.id ? null : service.id
                      );
                      scrollToStage();
                    }
                  }}
                  onSelect={() => {
                    setActiveIndex(index);
                    scrollToStage();
                  }}
                />
              </div>
            );
          })}
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
