"use client";

import { useState, useEffect, useRef } from "react";
import {
  Check,
  Clock,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Pause,
  Play,
} from "lucide-react";
import { m, useReducedMotion, type Variants } from "framer-motion";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import { EASE_SILK, VIEWPORT_ONCE, pressable, revealItem } from "@/lib/motion";
import ThreadLine from "./ThreadLine";

interface ProcessStep {
  number: string;
  phaseLabel: string;
  shortLabel: string;
  title: string;
  modality: string;
  duration: string;
  description: string;
  highlights: string[];
  outcome: string;
}

const STEP_DURATION_MS = 5500;

const STEPS: ProcessStep[] = [
  {
    number: "01",
    phaseLabel: "Etapa 01",
    shortLabel: "Diagnóstico",
    title: "Diagnóstico & Alinhamento",
    modality: "Online",
    duration: "1 a 2 encontros",
    description:
      "Mapeamento da sua rotina, das ocasiões que você vive e dos seus objetivos antes de mexer em qualquer peça do armário.",
    highlights: [
      "Entrevista sobre o seu estilo, a sua rotina e os códigos dos ambientes que você frequenta",
      "Análise técnica de estilo predominante, contraste e proporções",
      "Definição da imagem que traduz quem você é e o seu próximo passo",
    ],
    outcome: "Mapa de Estilo & Direção Visual",
  },
  {
    number: "02",
    phaseLabel: "Etapa 02",
    shortLabel: "Prática & Closet",
    title: "Encontros Práticos & Intervenção",
    modality: "Presencial ou Híbrido",
    duration: "Sessões dirigidas",
    description:
      "Aplicação da estratégia no seu guarda-roupa real para eliminar excessos e multiplicar combinações com intenção.",
    highlights: [
      "Closet Detox guiado: triagem consciente do que valoriza seu biotipo",
      "Montagem e registro fotográfico de looks para trabalho, viagens e lazer",
      "Personal Shopper (conforme o pacote) focado em caimento e durabilidade",
    ],
    outcome: "Acervo Editado + Lista de Peças-Chave",
  },
  {
    number: "03",
    phaseLabel: "Etapa 03",
    shortLabel: "Dossiê & Suporte",
    title: "Entrega do Dossiê & Consolidação",
    modality: "Digital & Impresso",
    duration: "+ 30 dias de suporte",
    description:
      "A consultoria continua com você no dia a dia, garantindo autonomia definitiva diante do espelho.",
    highlights: [
      "Apresentação do Dossiê de Estilo em alta resolução para consulta no celular",
      "Guia perpétuo com looks fotografados, paleta, proporções e roteiros de mala",
      "30 dias de acompanhamento direto via WhatsApp para dúvidas e compras",
    ],
    outcome: "Dossiê de Estilo + Suporte Contínuo",
  },
];

function StepAtelierVignette({
  stepIndex,
  isActive,
}: {
  stepIndex: number;
  isActive: boolean;
}) {
  if (stepIndex === 0) {
    // Etapa 01: Proporções, Arquitetura Visual & Paleta Pessoal
    return (
      <svg
        viewBox="0 0 280 76"
        className="w-full h-16 overflow-visible"
        aria-hidden="true"
      >
        {/* Grade de proporção áurea / enquadramento */}
        <rect
          x="14"
          y="10"
          width="116"
          height="56"
          rx="4"
          fill="none"
          stroke="rgba(212, 159, 171, 0.28)"
          strokeWidth="1"
        />
        <line
          x1="14"
          y1="28"
          x2="130"
          y2="28"
          stroke="rgba(212, 159, 171, 0.35)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <line
          x1="14"
          y1="48"
          x2="130"
          y2="48"
          stroke="rgba(212, 159, 171, 0.35)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        {/* Silhueta abstrata de proporção */}
        <g
          className={`transition-transform duration-700 ${
            isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"
          }`}
          style={{ transformOrigin: "72px 38px" }}
        >
          <circle
            cx="72"
            cy="20"
            r="5.5"
            fill="none"
            stroke="#D49FAB"
            strokeWidth="1.4"
          />
          <path
            d="M56 32 Q72 26 88 32 L82 48 L86 62 H58 L62 48 Z"
            fill="rgba(212, 159, 171, 0.1)"
            stroke="#D49FAB"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </g>
        {/* Linha conectora de leitura */}
        <path
          d="M136 38 H164"
          stroke="#D49FAB"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          className={`transition-opacity duration-500 ${
            isActive ? "opacity-90" : "opacity-35"
          }`}
        />
        {/* Cartela de direção visual & amostras */}
        <g
          className={`transition-transform duration-700 ${
            isActive ? "translate-x-0 opacity-100" : "translate-x-1 opacity-60"
          }`}
        >
          <rect
            x="170"
            y="14"
            width="96"
            height="48"
            rx="5"
            fill="rgba(26, 43, 32, 0.85)"
            stroke="rgba(212, 159, 171, 0.55)"
            strokeWidth="1.2"
          />
          <circle cx="188" cy="30" r="6" fill="#D49FAB" opacity={isActive ? "0.95" : "0.55"} />
          <circle cx="206" cy="30" r="6" fill="#F2DCE1" opacity={isActive ? "0.85" : "0.45"} />
          <circle
            cx="224"
            cy="30"
            r="6"
            fill="rgba(212, 159, 171, 0.35)"
            stroke="#D49FAB"
            strokeWidth="1"
          />
          <line
            x1="182"
            y1="47"
            x2="252"
            y2="47"
            stroke="#D49FAB"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity={isActive ? "0.9" : "0.45"}
          />
        </g>
      </svg>
    );
  }

  if (stepIndex === 1) {
    // Etapa 02: Curadoria de Cabideiro & Registro de Looks
    return (
      <svg
        viewBox="0 0 280 76"
        className="w-full h-16 overflow-visible"
        aria-hidden="true"
      >
        {/* Arara de ateliê */}
        <line
          x1="16"
          y1="16"
          x2="162"
          y2="16"
          stroke="rgba(212, 159, 171, 0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Peça 1: Alfaiataria selecionada */}
        <g
          className={`transition-transform duration-700 ${
            isActive ? " -translate-y-0.5 opacity-100" : "opacity-60"
          }`}
        >
          <path
            d="M45 16 C45 11 49 11 49 16 L36 23 L49 20 L62 23"
            fill="none"
            stroke="#D49FAB"
            strokeWidth="1.2"
          />
          <path
            d="M36 23 H62 L66 36 V60 H32 V36 Z"
            fill="rgba(212, 159, 171, 0.14)"
            stroke="#D49FAB"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </g>
        {/* Peça 2: Vestido fluido selecionado */}
        <g
          className={`transition-transform duration-700 delay-100 ${
            isActive ? "-translate-y-0.5 opacity-100" : "opacity-60"
          }`}
        >
          <path
            d="M96 16 C96 11 100 11 100 16 L88 23 L100 20 L112 23"
            fill="none"
            stroke="#D49FAB"
            strokeWidth="1.2"
          />
          <path
            d="M90 23 H110 L116 60 H84 Z"
            fill="rgba(212, 159, 171, 0.1)"
            stroke="#D49FAB"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </g>
        {/* Peça 3: Excesso triado (pontilhado suave) */}
        <g className="opacity-35">
          <path
            d="M136 23 H154 L156 58 H134 Z"
            fill="none"
            stroke="#D49FAB"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
        </g>
        {/* Visor Fotográfico de Lookbook */}
        <g
          className={`transition-transform duration-700 ${
            isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"
          }`}
          style={{ transformOrigin: "222px 38px" }}
        >
          <rect
            x="182"
            y="12"
            width="82"
            height="52"
            rx="5"
            fill="rgba(26, 43, 32, 0.85)"
            stroke="#D49FAB"
            strokeWidth="1.2"
          />
          {/* Cantoneiras de foco fotográfico */}
          <path
            d="M190 24 V19 H195 M256 24 V19 H251 M190 52 V57 H195 M256 52 V57 H251"
            fill="none"
            stroke="#F2DCE1"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle
            cx="223"
            cy="38"
            r="9"
            fill="rgba(212, 159, 171, 0.18)"
            stroke="#D49FAB"
            strokeWidth="1.3"
          />
          <circle cx="223" cy="38" r="2.5" fill="#F2DCE1" />
        </g>
      </svg>
    );
  }

  // Etapa 03: Dossiê Editorial Aberto + 30 Dias de Suporte
  return (
    <svg
      viewBox="0 0 280 76"
      className="w-full h-16 overflow-visible"
      aria-hidden="true"
    >
      {/* Dossiê Editorial aberto */}
      <g
        className={`transition-transform duration-700 ${
          isActive ? "scale-100 opacity-100" : "scale-95 opacity-65"
        }`}
        style={{ transformOrigin: "92px 38px" }}
      >
        <path
          d="M28 16 Q60 12 92 18 V60 Q60 54 28 58 Z"
          fill="rgba(26, 43, 32, 0.85)"
          stroke="#D49FAB"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M92 18 Q124 12 156 16 V58 Q124 54 92 60 Z"
          fill="rgba(212, 159, 171, 0.12)"
          stroke="#D49FAB"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <line x1="40" y1="28" x2="78" y2="28" stroke="#D49FAB" strokeWidth="1.2" />
        <line x1="40" y1="37" x2="74" y2="37" stroke="rgba(242, 220, 225, 0.65)" strokeWidth="1" />
        <line x1="40" y1="45" x2="66" y2="45" stroke="rgba(242, 220, 225, 0.5)" strokeWidth="1" />
        <rect
          x="104"
          y="24"
          width="38"
          height="24"
          rx="2"
          fill="none"
          stroke="#F2DCE1"
          strokeWidth="1.1"
        />
      </g>
      {/* Linha conectora de suporte contínuo */}
      <path
        d="M158 38 H174"
        stroke="#D49FAB"
        strokeWidth="1.2"
        strokeDasharray="2 3"
        className={isActive ? "opacity-90" : "opacity-40"}
      />
      {/* Selo +30 Dias de Acompanhamento */}
      <g
        className={`transition-transform duration-700 ${
          isActive ? "translate-y-0 opacity-100" : "translate-y-0.5 opacity-60"
        }`}
      >
        <rect
          x="174"
          y="14"
          width="96"
          height="48"
          rx="6"
          fill="rgba(212, 159, 171, 0.14)"
          stroke="#D49FAB"
          strokeWidth="1.3"
        />
        <text
          x="222"
          y="32"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#D49FAB"
          className="font-display font-semibold"
          style={{ fontSize: "12px", letterSpacing: "0.02em" }}
        >
          +30 DIAS
        </text>
        <text
          x="222"
          y="47"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#F2DCE1"
          className="font-sans uppercase"
          style={{ fontSize: "7.5px", letterSpacing: "0.05em", fontWeight: 500 }}
        >
          Suporte Direto
        </text>
      </g>
    </svg>
  );
}

export default function ProcessSteps() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeStepRef = useRef(0);
  const isPausedRef = useRef(false);
  const isHoveringRef = useRef(false);
  const elapsedRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const diagnosticWhatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Vi como funciona a metodologia e gostaria de entender qual formato faz mais sentido para a minha rotina."
  );

  const selectStep = (index: number) => {
    activeStepRef.current = index;
    setActiveStep(index);
    elapsedRef.current = 0;
    lastTickRef.current = performance.now();
    setStepProgress(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - touchStartYRef.current;

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // Detect horizontal swipe (at least 40px and dominant horizontal)
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        // Swipe left -> next step
        const next = (activeStepRef.current + 1) % STEPS.length;
        selectStep(next);
      } else {
        // Swipe right -> prev step
        const prev = (activeStepRef.current - 1 + STEPS.length) % STEPS.length;
        selectStep(prev);
      }
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => {
      const next = !prev;
      isPausedRef.current = next;
      lastTickRef.current = performance.now();
      return next;
    });
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      setStepProgress(100);
      return;
    }

    let frameId: number;
    lastTickRef.current = performance.now();

    const tick = (now: number) => {
      const last = lastTickRef.current ?? now;
      const delta = now - last;
      lastTickRef.current = now;

      if (!isPausedRef.current && !isHoveringRef.current) {
        elapsedRef.current += delta;
        if (elapsedRef.current >= STEP_DURATION_MS) {
          const nextStep = (activeStepRef.current + 1) % STEPS.length;
          activeStepRef.current = nextStep;
          setActiveStep(nextStep);
          elapsedRef.current = 0;
          setStepProgress(0);
        } else {
          setStepProgress(
            Math.min(100, (elapsedRef.current / STEP_DURATION_MS) * 100)
          );
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [shouldReduceMotion]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: EASE_SILK,
      },
    },
  };

  // Overall progress along the 3 steps (0 to 1)
  const overallRailScale = shouldReduceMotion
    ? 1
    : Math.min(1, (activeStep + stepProgress / 100) / STEPS.length);

  return (
    <section
      id="metodologia"
      aria-labelledby="process-heading"
      className="scroll-mt-20 pt-10 sm:pt-12 pb-20 sm:pb-24 border-b border-rose-border/40 relative overflow-hidden"
    >
      {/* Luz de ambiência sutil acompanhando a etapa em foco */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="hidden md:block absolute top-1/3 w-[34rem] h-[34rem] -translate-y-1/2 rounded-full bg-rose-antique/[0.06] blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate3d(${activeStep * 36 + 6}vw, -40%, 0)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <m.div
          data-reveal
          variants={revealItem}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display text-rose-antique tracking-wide leading-tight text-balance"
          >
            Como Funciona a Consultoria
          </h2>
        </m.div>

        {/* Interactive Progression Rail & Cadence Controller (Desktop only) */}
        <div className="hidden md:block mb-8 sm:mb-10">
          <div className="flex flex-row items-center justify-between gap-4 max-w-4xl mx-auto mb-5">
            <div
              role="tablist"
              aria-label="Selecionar etapa da consultoria em destaque"
              className="grid grid-cols-3 gap-3 w-full"
            >
              {STEPS.map((step, index) => {
                const isActive = activeStep === index;
                const isCompleted = index < activeStep;
                return (
                  <button
                    key={step.number}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`${step.phaseLabel}: ${step.title}`}
                    onClick={() => selectStep(index)}
                    className={`group relative overflow-hidden rounded-lg border px-4 py-3 text-left transition-[border-color,background-color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-antique ${
                      isActive
                        ? "border-rose-antique bg-forest-card/95 shadow-md"
                        : isCompleted
                        ? "border-rose-border/70 bg-forest-deep/80 hover:border-rose-antique/60"
                        : "border-rose-border/40 bg-forest-deep/50 hover:border-rose-antique/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span className="text-[11px] uppercase tracking-widest text-rose-antique font-sans font-semibold tabular-nums">
                        {step.phaseLabel}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                          isActive
                            ? "bg-rose-antique scale-110"
                            : isCompleted
                            ? "bg-rose-antique/60 scale-90"
                            : "bg-rose-border/50 scale-75"
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <p
                      className={`text-sm font-display truncate transition-colors duration-300 ${
                        isActive ? "text-rose-light" : "text-rose-light/70"
                      }`}
                    >
                      {step.shortLabel}
                    </p>

                    {/* Barra de progresso individual da etapa em foco (compositor-friendly scaleX) */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-border/25 overflow-hidden"
                    >
                      <span
                        className="block h-full w-full origin-left bg-rose-antique transition-transform duration-150 ease-linear"
                        style={{
                          transform: `scaleX(${
                            isCompleted
                              ? 1
                              : isActive
                              ? shouldReduceMotion
                                ? 1
                                : stepProgress / 100
                              : 0
                          })`,
                        }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Botão Pausar / Reproduzir cadência automática */}
            <button
              type="button"
              onClick={togglePause}
              aria-label={
                isPaused
                  ? "Continuar animação automática das etapas"
                  : "Pausar animação automática das etapas"
              }
              title={
                isPaused
                  ? "Continuar animação automática"
                  : "Pausar animação automática"
              }
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-rose-border/60 bg-forest-deep/80 text-[11px] uppercase tracking-widest text-rose-antique hover:bg-rose-antique/10 hover:border-rose-antique transition-colors shrink-0"
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 fill-current" aria-hidden="true" />
                  <span> Animar</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 fill-current" aria-hidden="true" />
                  <span>Pausar</span>
                </>
              )}
            </button>
          </div>

          {/* Desktop Progression Rail com Fio de Alinhavo e Feixe de Progresso */}
          <div
            className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 px-8 relative items-center"
            aria-hidden="true"
          >
            <ThreadLine
              orientation="horizontal"
              offset={["start 0.9", "start 0.45"]}
              className="absolute top-1/2 left-[16%] right-[16%] h-px -translate-y-1/2"
            />
            {/* Fio iluminado acompanhando o ciclo ativo */}
            <div className="absolute top-1/2 left-[16%] right-[16%] h-px -translate-y-1/2 overflow-hidden pointer-events-none">
              <div
                className="w-full h-full bg-rose-antique/80 origin-left transition-transform duration-300 ease-out"
                style={{ transform: `scaleX(${overallRailScale})` }}
              />
            </div>

            {STEPS.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div key={step.number} className="relative z-10 flex justify-center">
                  <span
                    className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] uppercase tracking-widest font-sans font-semibold tabular-nums transition-[background-color,color,border-color,transform,box-shadow] duration-500 motion-reduce:transition-none ${
                      isActive
                        ? "bg-rose-antique text-forest-deep border-rose-antique shadow-[0_0_20px_rgba(212,159,171,0.35)] scale-105"
                        : "bg-forest-deep border-rose-antique/45 text-rose-antique/85"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? "bg-forest-deep" : "bg-rose-antique/70"
                      }`}
                    />
                    {step.phaseLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Structured Editorial Step Panels */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative -mx-2 sm:mx-0 px-9 sm:px-11 md:px-0 overflow-hidden md:overflow-visible"
        >
          {/* Botões de Pular Etapa (Mobile - Posicionados para fora do card) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              selectStep((activeStep - 1 + STEPS.length) % STEPS.length);
            }}
            aria-label="Voltar para etapa anterior"
            className="md:hidden absolute left-0.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-forest-card/95 border border-rose-antique/70 text-rose-antique hover:text-rose-light hover:border-rose-antique shadow-[0_6px_22px_rgba(0,0,0,0.7),0_0_12px_rgba(212,159,171,0.25)] flex items-center justify-center active:scale-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-antique"
            style={{ touchAction: "manipulation" }}
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              selectStep((activeStep + 1) % STEPS.length);
            }}
            aria-label="Pular para próxima etapa"
            className="md:hidden absolute right-0.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-forest-card/95 border border-rose-antique/70 text-rose-antique hover:text-rose-light hover:border-rose-antique shadow-[0_6px_22px_rgba(0,0,0,0.7),0_0_12px_rgba(212,159,171,0.25)] flex items-center justify-center active:scale-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-antique"
            style={{ touchAction: "manipulation" }}
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>

          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          >
            {STEPS.map((step, index) => {
              const isActive = activeStep === index;

              // Direção do deslocamento no mobile para transição suave de slide
              const getMobileTranslateClass = () => {
                if (isActive) return "!translate-x-0";
                if (activeStep === 0 && index === STEPS.length - 1) return "-translate-x-8";
                if (activeStep === STEPS.length - 1 && index === 0) return "translate-x-8";
                return index < activeStep ? "-translate-x-8" : "translate-x-8";
              };

              return (
                <m.article
                  key={step.number}
                  data-reveal
                  variants={cardVariants}
                  onMouseEnter={() => {
                    isHoveringRef.current = true;
                    selectStep(index);
                  }}
                  onMouseLeave={() => {
                    isHoveringRef.current = false;
                    lastTickRef.current = performance.now();
                  }}
                  onFocus={() => {
                    isHoveringRef.current = true;
                    selectStep(index);
                  }}
                  onBlur={() => {
                    isHoveringRef.current = false;
                    lastTickRef.current = performance.now();
                  }}
                  onClick={() => selectStep(index)}
                  className={`group rounded-xl border p-6 sm:p-7 flex flex-col justify-between cursor-pointer overflow-hidden transition-[opacity,transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isActive
                      ? "!relative z-10 !opacity-100 !translate-x-0 !scale-100 !pointer-events-auto border-rose-antique bg-forest-card/90 md:-translate-y-1.5 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.55),0_0_25px_rgba(212,159,171,0.14)]"
                      : `!absolute !inset-0 z-0 !opacity-0 ${getMobileTranslateClass()} !scale-[0.97] !pointer-events-none md:!relative md:!inset-auto md:z-auto md:!opacity-100 md:!scale-100 md:!translate-x-0 md:!pointer-events-auto border-rose-border/65 bg-forest-card/45 hover:border-rose-antique/60 hover:bg-forest-card/75`
                  }`}
                >
                {/* Brilho acetinado superior quando a etapa está em foco */}
                {isActive && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-24 overflow-hidden"
                  >
                    <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-rose-antique/15 to-transparent process-active-sheen" />
                  </div>
                )}

                <div className="relative z-10">
                  {/* Top Meta Row: Step Number + Modality/Duration */}
                  <div className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-rose-border/50">
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-rose-antique/80 font-sans font-semibold block md:hidden">
                        {step.phaseLabel}
                      </span>
                      <span
                        className={`font-display text-3xl sm:text-4xl leading-none tabular-nums transition-colors duration-500 ${
                          isActive ? "text-rose-light" : "text-rose-antique"
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>

                    <div className="flex flex-col items-end text-right gap-1 text-xs text-rose-light/85 font-sans">
                      <span className="inline-flex items-center gap-1 text-rose-antique font-medium">
                        <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        {step.modality}
                      </span>
                      <span className="inline-flex items-center gap-1 tabular-nums">
                        <Clock className="w-3.5 h-3.5 text-rose-antique shrink-0" aria-hidden="true" />
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  {/* Vinheta de Ateliê Animada da Etapa */}
                  <div
                    className={`mb-5 rounded-lg border px-2 py-2 transition-colors duration-500 ${
                      isActive
                        ? "border-rose-antique/45 bg-forest-deep/80"
                        : "border-rose-border/30 bg-forest-deep/40"
                    }`}
                  >
                    <StepAtelierVignette stepIndex={index} isActive={isActive} />
                  </div>

                  {/* Step Title & Lead */}
                  <h3
                    className={`font-display text-2xl mb-2.5 leading-snug transition-colors duration-300 ${
                      isActive ? "text-rose-light" : "text-rose-antique"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-rose-light/90 font-light leading-relaxed mb-5 text-pretty">
                    {step.description}
                  </p>

                  {/* Actionable Highlights com Iluminação Sequencial */}
                  <div className="space-y-2.5 mb-6">
                    <p className="text-xs uppercase tracking-widest text-rose-antique font-sans font-semibold">
                      Na prática:
                    </p>
                    <ul className="space-y-2.5" role="list">
                      {step.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          style={{ transitionDelay: isActive ? `${idx * 90}ms` : "0ms" }}
                          className={`flex items-start gap-2.5 text-sm font-light leading-relaxed text-pretty rounded-md px-2 py-1.5 -mx-2 transition-[background-color,color,transform] duration-500 ${
                            isActive
                              ? "bg-forest-deep/55 text-rose-light translate-x-0.5"
                              : "text-rose-light/85"
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-500 ${
                              isActive
                                ? "bg-rose-antique text-forest-deep"
                                : "bg-rose-antique/15 text-rose-antique"
                            }`}
                          >
                            <Check className="w-3 h-3" aria-hidden="true" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tangible Stage Outcome Footer */}
                <div
                  className={`relative z-10 pt-4 border-t flex items-center justify-between gap-2 transition-colors duration-500 ${
                    isActive ? "border-rose-antique/60" : "border-rose-border/50"
                  }`}
                >
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-rose-light/80 font-sans block mb-0.5">
                      Você sai desta etapa com
                    </span>
                    <span
                      className={`text-sm font-medium font-sans transition-colors duration-300 ${
                        isActive ? "text-rose-light" : "text-rose-antique"
                      }`}
                    >
                      {step.outcome}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <ArrowRight
                      className={`w-4 h-4 hidden md:block shrink-0 transition-transform duration-500 ${
                        isActive
                          ? "text-rose-antique translate-x-1"
                          : "text-rose-antique/50"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </m.article>
            );
          })}
        </m.div>
        </div>

        {/* Bottom Consultation Entry Strip */}
        <m.div
          data-reveal
          variants={revealItem}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-12 rounded-xl border border-rose-border/70 bg-forest-deep/70 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto"
        >
          <div className="text-center md:text-left">
            <h3 className="font-display text-xl sm:text-2xl text-rose-antique mb-1.5">
              Quer entender qual etapa ou pacote atende ao seu momento?
            </h3>
            <p className="text-xs sm:text-sm text-rose-light/80 font-light">
              Antes de contratar, alinhamos sua rotina e objetivos em uma conversa rápida e sem compromisso.
            </p>
          </div>
          <m.a
            href={diagnosticWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            {...pressable}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm bg-rose-antique text-forest-deep text-xs uppercase tracking-widest font-semibold hover:bg-rose-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-antique shrink-0"
            style={{ touchAction: "manipulation" }}
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Alinhar Minha Consultoria</span>
          </m.a>
        </m.div>
      </div>
    </section>
  );
}
