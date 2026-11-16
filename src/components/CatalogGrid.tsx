"use client";

import { useState, useRef, useEffect } from "react";
import { SERVICES } from "@/data/services";
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [stageHeight, setStageHeight] = useState<number | null>(null);

  // Cards are absolutely positioned, so the stage must grow to fit the tallest
  // visible card (including an expanded one) or the section clips it.
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const total = SERVICES.length;
    const visible = [-1, 0, 1].map((d) => (activeIndex + d + total) % total);

    const measure = () => {
      let tallest = 0;
      visible.forEach((idx) => {
        const el = cardRefs.current[idx];
        if (!el) return;
        const h = el.offsetHeight;
        // Side cards sit 40px lower and are scaled to 0.84 around their center.
        const bottom = idx === activeIndex ? h : h * 0.92 + 40;
        tallest = Math.max(tallest, bottom);
      });
      // py-4 on the stage + breathing room for the card shadow
      if (tallest > 0) setStageHeight(Math.ceil(tallest + 32 + 24));
    };

    measure();
    const observer = new ResizeObserver(measure);
    visible.forEach((idx) => {
      const el = cardRefs.current[idx];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [activeIndex]);

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
      className="scroll-mt-20 pt-10 sm:pt-12 pb-20 sm:pb-24 border-b border-rose-border/40 relative overflow-hidden"
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
          <h2
            id="catalog-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display text-rose-antique tracking-wide leading-tight text-balance"
          >
            Serviços & Experiências de Imagem
          </h2>
        </m.div>

        {/* Category Navigation Bar */}
        <nav
          aria-label="Categorias de serviços"
          className="w-full max-w-4xl mx-auto mb-10 px-2"
        >
          <div
            role="tablist"
            className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3.5 atelier-scrollbar scroll-smooth flex-nowrap sm:flex-wrap"
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
              ? "min-h-[1050px] sm:min-h-[980px] md:min-h-[950px]"
              : "min-h-[660px] sm:min-h-[700px] md:min-h-[740px]"
          }`}
          style={{
            touchAction: "pan-y",
            ...(stageHeight ? { minHeight: stageHeight } : {}),
          }}
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
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
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
                      setExpandedServiceId((prev) => {
                        const next = prev === service.id ? null : service.id;
                        if (next) {
                          scrollToStage();
                        }
                        return next;
                      });
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

      </div>
    </section>
  );
}
