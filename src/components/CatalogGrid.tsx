"use client";

import { useState, useRef } from "react";
import { SERVICES } from "@/data/services";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import ServiceCard from "./ServiceCard";
import { m } from "framer-motion";
import { VIEWPORT_ONCE, revealItem } from "@/lib/motion";

export default function CatalogGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isHorizontalDragRef = useRef<boolean | null>(null);
  const hasDraggedRef = useRef<boolean>(false);
  const isTouchActiveRef = useRef<boolean>(false);

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

  // --- Touch Gestures Handling (Mobile Swiping & Dragging) ---
  const handleTouchStart = (e: React.TouchEvent) => {
    isTouchActiveRef.current = true;
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    isHorizontalDragRef.current = null;
    hasDraggedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    if (isHorizontalDragRef.current === null) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      if (absX > 6 || absY > 6) {
        if (absX >= absY) {
          isHorizontalDragRef.current = true;
          setIsDragging(true);
        } else {
          // Vertical page scroll detected, do not intercept
          isHorizontalDragRef.current = false;
        }
      }
    }

    if (isHorizontalDragRef.current === true) {
      hasDraggedRef.current = true;
      setDragOffset(deltaX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isHorizontalDragRef.current === true && touchStartRef.current) {
      const touchEndX = e.changedTouches[0]?.clientX ?? touchStartRef.current.x;
      const deltaX = touchEndX - touchStartRef.current.x;
      const deltaTime = Date.now() - touchStartRef.current.time;

      const isQuickFlick = deltaTime < 300 && Math.abs(deltaX) > 25;
      const isDragPassed = Math.abs(deltaX) > 40;

      if (isQuickFlick || isDragPassed) {
        if (deltaX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    touchStartRef.current = null;
    isHorizontalDragRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    setTimeout(() => {
      hasDraggedRef.current = false;
      isTouchActiveRef.current = false;
    }, 60);
  };

  const handleTouchCancel = () => {
    touchStartRef.current = null;
    isHorizontalDragRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
    hasDraggedRef.current = false;
    isTouchActiveRef.current = false;
  };

  // --- Mouse Drag Gestures (Desktop Support) ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTouchActiveRef.current) return;
    if (e.button !== 0) return;

    touchStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
    isHorizontalDragRef.current = null;
    hasDraggedRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.clientX - touchStartRef.current.x;
    const deltaY = e.clientY - touchStartRef.current.y;

    if (isHorizontalDragRef.current === null) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      if (absX > 6 || absY > 6) {
        if (absX >= absY) {
          isHorizontalDragRef.current = true;
          setIsDragging(true);
        } else {
          isHorizontalDragRef.current = false;
        }
      }
    }

    if (isHorizontalDragRef.current === true) {
      hasDraggedRef.current = true;
      setDragOffset(deltaX);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isHorizontalDragRef.current === true && touchStartRef.current) {
      const deltaX = e.clientX - touchStartRef.current.x;
      const deltaTime = Date.now() - touchStartRef.current.time;

      const isQuickFlick = deltaTime < 300 && Math.abs(deltaX) > 25;
      const isDragPassed = Math.abs(deltaX) > 40;

      if (isQuickFlick || isDragPassed) {
        if (deltaX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    touchStartRef.current = null;
    isHorizontalDragRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      touchStartRef.current = null;
      isHorizontalDragRef.current = null;
      setIsDragging(false);
      setDragOffset(0);
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 60);
    }
  };

  // Suppress accidental clicks when user performed a drag gesture
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <m.div
          data-reveal
          variants={revealItem}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="text-center max-w-3xl mx-auto mb-10"
        >
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
            Cada mulher tem um momento e um objetivo diferente. Escolha o formato que faz mais sentido para o seu momento e para a sua rotina.
          </p>
        </m.div>

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
          className={`relative w-full max-w-5xl mx-auto flex items-start justify-center py-4 [perspective:1200px] focus-visible:ring-1 focus-visible:ring-rose-antique/50 focus-visible:outline-none rounded-sm transition-[min-height] duration-300 touch-pan-y ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          } ${
            expandedServiceId
              ? "min-h-[920px] sm:min-h-[860px] md:min-h-[820px]"
              : "min-h-[660px] sm:min-h-[700px] md:min-h-[740px]"
          }`}
          style={{ touchAction: "pan-y" }}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onClickCapture={handleClickCapture}
          aria-label="Galeria de serviços. Use as setas do teclado ou arraste para navegar."
        >
          {SERVICES.map((service, index) => {
            const diff = getCardOffset(index, activeIndex, SERVICES.length);
            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;

            let transformClass = "translate-x-0 translate-y-0 scale-100 z-30 opacity-100 shadow-2xl";
            if (isLeft) {
              transformClass =
                "-translate-x-[55%] sm:-translate-x-[72%] md:-translate-x-[85%] translate-y-8 sm:translate-y-10 scale-[0.84] z-10 opacity-40 hover:opacity-75 cursor-pointer";
            } else if (isRight) {
              transformClass =
                "translate-x-[55%] sm:translate-x-[72%] md:translate-x-[85%] translate-y-8 sm:translate-y-10 scale-[0.84] z-10 opacity-40 hover:opacity-75 cursor-pointer";
            } else if (!isCenter) {
              transformClass = "translate-x-0 translate-y-14 scale-75 z-0 opacity-0 pointer-events-none";
            }

            // Real-time finger drag translation override with dynamic 3D depth
            let dragTransformStyle: React.CSSProperties | undefined = undefined;
            if (isDragging) {
              const DRAG_RANGE = 260;
              const dragProgress = Math.min(1, Math.abs(dragOffset) / DRAG_RANGE);
              const draggingLeft = dragOffset < 0; // swiping left -> right card incoming
              const draggingRight = dragOffset > 0; // swiping right -> left card incoming

              if (isCenter) {
                // Card in spotlight moves to side, scales down, moves down/backwards
                const scale = 1 - dragProgress * 0.16;
                const translateY = dragProgress * 36;
                const opacity = 1 - dragProgress * 0.55;
                dragTransformStyle = {
                  transform: `translateX(${dragOffset}px) translateY(${translateY}px) scale(${scale})`,
                  opacity,
                  zIndex: 20,
                  transition: "none",
                };
              } else if (isLeft) {
                if (draggingRight) {
                  // Left card is coming up into spotlight: rising up from 36px to 0, scaling from 0.84 to 1
                  const scale = 0.84 + dragProgress * 0.16;
                  const translateY = 36 - dragProgress * 36;
                  const opacity = 0.4 + dragProgress * 0.6;
                  dragTransformStyle = {
                    transform: `translateX(calc(var(--card-peek-left, -55%) + ${dragOffset}px)) translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    zIndex: 30,
                    transition: "none",
                  };
                } else {
                  // Left card stays behind as user drags further left
                  dragTransformStyle = {
                    transform: `translateX(calc(var(--card-peek-left, -55%) + ${dragOffset * 0.25}px)) translateY(36px) scale(0.84)`,
                    opacity: Math.max(0, 0.4 - dragProgress * 0.25),
                    zIndex: 10,
                    transition: "none",
                  };
                }
              } else if (isRight) {
                if (draggingLeft) {
                  // Right card is coming up into spotlight: rising up from 36px to 0, scaling from 0.84 to 1
                  const scale = 0.84 + dragProgress * 0.16;
                  const translateY = 36 - dragProgress * 36;
                  const opacity = 0.4 + dragProgress * 0.6;
                  dragTransformStyle = {
                    transform: `translateX(calc(var(--card-peek-right, 55%) + ${dragOffset}px)) translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    zIndex: 30,
                    transition: "none",
                  };
                } else {
                  // Right card stays behind as user drags further right
                  dragTransformStyle = {
                    transform: `translateX(calc(var(--card-peek-right, 55%) + ${dragOffset * 0.25}px)) translateY(36px) scale(0.84)`,
                    opacity: Math.max(0, 0.4 - dragProgress * 0.25),
                    zIndex: 10,
                    transition: "none",
                  };
                }
              }
            }

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${service.id}`}
                className={`absolute top-0 w-full max-w-[310px] sm:max-w-[390px] md:max-w-[420px] [--card-peek-left:-55%] sm:[--card-peek-left:-72%] md:[--card-peek-left:-85%] [--card-peek-right:55%] sm:[--card-peek-right:72%] md:[--card-peek-right:85%] motion-reduce:transition-none ${
                  isDragging
                    ? "transition-none select-none"
                    : "transition-[transform,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                } ${transformClass}`}
                style={dragTransformStyle}
                onClick={() => {
                  if (hasDraggedRef.current) return;
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
                    if (isCenter && !hasDraggedRef.current) {
                      setExpandedServiceId((prev) =>
                        prev === service.id ? null : service.id
                      );
                      scrollToStage();
                    }
                  }}
                  onSelect={() => {
                    if (!hasDraggedRef.current) {
                      setActiveIndex(index);
                      scrollToStage();
                    }
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Indicators */}
        <div className="flex items-center justify-center mt-8 relative z-30">
          <div
            role="tablist"
            aria-label="Indicadores dos serviços do catálogo"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-forest-card/80 border border-rose-border/60 shadow-lg shadow-forest-deep/40"
          >
            {SERVICES.map((service, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  id={`dot-${service.id}`}
                  aria-selected={isSelected}
                  aria-label={`Ir para o serviço ${idx + 1}: ${service.title}`}
                  onClick={() => {
                    setActiveIndex(idx);
                    scrollToStage();
                  }}
                  className={`transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-antique cursor-pointer ${
                    isSelected
                      ? "w-7 h-2 bg-rose-antique shadow-md shadow-rose-antique/30"
                      : "w-2 h-2 bg-rose-border hover:bg-rose-antique/60"
                  }`}
                  style={{ touchAction: "manipulation" }}
                />
              );
            })}
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
