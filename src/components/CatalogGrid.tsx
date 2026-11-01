"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, Sparkles } from "lucide-react";
import { SERVICES } from "@/data/services";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import ServiceCard from "./ServiceCard";

export default function CatalogGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const corporateWhatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Gostaria de conversar sobre uma proposta corporativa personalizada."
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  const navButtonClass =
    "w-11 h-11 rounded-full border border-rose-border text-rose-antique hover:border-rose-antique hover:bg-forest-card/80 transition-[background-color,border-color,transform] duration-200 motion-reduce:transition-none flex items-center justify-center active:scale-95 focus-visible:ring-2 focus-visible:ring-rose-antique focus-visible:outline-none shadow-sm cursor-pointer";

  return (
    <section
      id="catalogo"
      aria-labelledby="catalog-heading"
      className="py-20 sm:py-24 border-b border-rose-border/40 relative overflow-x-clip"
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

        {/* View Mode Switcher (Quiet Luxury Aesthetic) */}
        <div className="flex items-center justify-center gap-2 mb-12" role="group" aria-label="Modo de visualização do catálogo">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs uppercase tracking-widest font-sans transition-all duration-200 min-h-[44px] focus-visible:ring-2 focus-visible:ring-rose-antique focus-visible:outline-none cursor-pointer ${
              viewMode === "grid"
                ? "bg-rose-antique text-forest-deep font-semibold shadow-md"
                : "border border-rose-border/70 text-rose-antique/80 hover:text-rose-antique hover:border-rose-antique/60 bg-forest-card/50"
            }`}
            style={{ touchAction: "manipulation" }}
          >
            <LayoutGrid className="w-4 h-4" aria-hidden="true" />
            <span>Grade Completa</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("carousel")}
            aria-pressed={viewMode === "carousel"}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs uppercase tracking-widest font-sans transition-all duration-200 min-h-[44px] focus-visible:ring-2 focus-visible:ring-rose-antique focus-visible:outline-none cursor-pointer ${
              viewMode === "carousel"
                ? "bg-rose-antique text-forest-deep font-semibold shadow-md"
                : "border border-rose-border/70 text-rose-antique/80 hover:text-rose-antique hover:border-rose-antique/60 bg-forest-card/50"
            }`}
            style={{ touchAction: "manipulation" }}
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Modo Destaque</span>
          </button>
        </div>

        {/* View 1: Responsive Editorial Grid (Natural Flow, Never Clipped) */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isActive={true}
                isExpanded={!!expandedIds[service.id]}
                onToggleExpand={() => toggleExpand(service.id)}
              />
            ))}
          </div>
        )}

        {/* View 2: Spotlight Carousel (Dynamic In-Flow Container, Never Clipped) */}
        {viewMode === "carousel" && (
          <div
            className="w-full max-w-2xl mx-auto focus-visible:ring-2 focus-visible:ring-rose-antique focus-visible:outline-none rounded-sm"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-label="Carrossel de serviços. Use as setas do teclado para navegar."
            aria-roledescription="carrossel"
          >
            {/* Active Card in Normal Flow (Auto Height) */}
            <div className="w-full transition-opacity duration-300">
              <ServiceCard
                service={SERVICES[activeIndex]}
                isActive={true}
                isExpanded={!!expandedIds[SERVICES[activeIndex].id]}
                onToggleExpand={() => toggleExpand(SERVICES[activeIndex].id)}
              />
            </div>

            {/* Navigation Controls */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Serviço anterior"
                  className={navButtonClass}
                  style={{ touchAction: "manipulation" }}
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
                  type="button"
                  onClick={nextSlide}
                  aria-label="Próximo serviço"
                  className={navButtonClass}
                  style={{ touchAction: "manipulation" }}
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Indicator Pills with Minimum 44px Touch Targets */}
              <div
                className="flex items-center gap-1 pt-1"
                role="tablist"
                aria-label="Indicadores dos serviços"
              >
                {SERVICES.map((service, idx) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    role="tab"
                    aria-selected={idx === activeIndex}
                    aria-label={`Ver serviço ${idx + 1}: ${service.title}`}
                    className="py-3 px-1.5 min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-rose-antique focus-visible:outline-none cursor-pointer"
                    style={{ touchAction: "manipulation" }}
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                        idx === activeIndex
                          ? "w-8 bg-rose-antique"
                          : "w-2.5 bg-rose-border hover:bg-rose-antique/60"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

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
            className="text-xs uppercase tracking-widest text-rose-antique hover:text-rose-light underline underline-offset-4 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-rose-antique focus-visible:outline-none"
            style={{ touchAction: "manipulation" }}
          >
            Solicitar Proposta Corporativa Customizada →
          </a>
        </div>
      </div>
    </section>
  );
}
