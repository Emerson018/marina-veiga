"use client";

import {
  MessageSquareText,
  Sparkles,
  BookOpenCheck,
  Check,
  Clock,
  MapPin,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { m, type Variants } from "framer-motion";
import { generateWhatsAppUrl } from "@/utils/whatsapp";

interface ProcessStep {
  number: string;
  phaseLabel: string;
  icon: typeof MessageSquareText;
  title: string;
  modality: string;
  duration: string;
  description: string;
  highlights: string[];
  outcome: string;
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    phaseLabel: "Etapa 01",
    icon: MessageSquareText,
    title: "Diagnóstico & Alinhamento",
    modality: "Online",
    duration: "1 a 2 encontros",
    description:
      "Mapeamento estratégico da sua rotina executiva, cargos e objetivos antes de mexer em qualquer peça do armário.",
    highlights: [
      "Entrevista de posicionamento pessoal e código visual do seu setor",
      "Análise técnica de estilo predominante, contraste e proporções",
      "Definição da imagem que sustenta sua autoridade e seu próximo passo",
    ],
    outcome: "Mapa de Estilo & Direção Visual",
  },
  {
    number: "02",
    phaseLabel: "Etapa 02",
    icon: Sparkles,
    title: "Encontros Práticos & Intervenção",
    modality: "Presencial ou Híbrido",
    duration: "Sessões dirigidas",
    description:
      "Aplicação da estratégia no seu guarda-roupa real para eliminar excessos e multiplicar combinações com intenção.",
    highlights: [
      "Closet Detox guiado: triagem consciente do que valoriza seu biótipo",
      "Montagem e registro fotográfico de looks para trabalho, viagens e lazer",
      "Personal Shopper (conforme o pacote) focado em caimento e durabilidade",
    ],
    outcome: "Acervo Editado + Lista de Peças-Chave",
  },
  {
    number: "03",
    phaseLabel: "Etapa 03",
    icon: BookOpenCheck,
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

export default function ProcessSteps() {
  const diagnosticWhatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Vi como funciona a metodologia e gostaria de entender qual formato faz mais sentido para a minha rotina."
  );

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
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="metodologia"
      aria-labelledby="process-heading"
      className="scroll-mt-4 sm:scroll-mt-0 py-20 sm:py-24 border-b border-rose-border/40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display text-rose-antique tracking-wide leading-tight mb-4 text-balance"
          >
            Como Funciona a Consultoria
          </h2>
          <p className="text-base sm:text-lg text-rose-light/90 font-light leading-relaxed max-w-2xl mx-auto text-pretty">
            Um percurso claro em três etapas — do diagnóstico estratégico à autonomia diária — desenhado para respeitar sua agenda e gerar resultado prático desde o primeiro encontro.
          </p>
        </m.div>

        {/* Desktop Progression Rail */}
        <div
          className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 mb-6 px-8 relative"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-[16%] right-[16%] h-px bg-rose-border/70 -translate-y-1/2" />
          {STEPS.map((step) => (
            <div key={step.number} className="relative z-10 flex justify-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-deep border border-rose-antique/50 text-[11px] uppercase tracking-widest text-rose-antique font-sans font-semibold tabular-nums">
                {step.phaseLabel}
              </span>
            </div>
          ))}
        </div>

        {/* 3 Structured Editorial Step Panels */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <m.article
                key={step.number}
                variants={cardVariants}
                className="group relative rounded-xl border border-rose-border/80 bg-forest-card/55 p-6 sm:p-7 flex flex-col justify-between transition-[border-color,background-color] duration-300 hover:border-rose-antique/60 hover:bg-forest-card/85 motion-reduce:transition-none"
              >
                <div>
                  {/* Top Meta Row: Step Number + Modality/Duration */}
                  <div className="flex items-start justify-between gap-3 pb-5 mb-5 border-b border-rose-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-forest-deep border border-rose-antique/40 flex items-center justify-center text-rose-antique shrink-0">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-widest text-rose-antique/80 font-sans font-semibold block md:hidden">
                          {step.phaseLabel}
                        </span>
                        <span className="font-display text-2xl sm:text-3xl text-rose-antique leading-none tabular-nums">
                          {step.number}
                        </span>
                      </div>
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

                  {/* Step Title & Lead */}
                  <h3 className="font-display text-2xl text-rose-antique mb-2.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-rose-light/90 font-light leading-relaxed mb-5 text-pretty">
                    {step.description}
                  </p>

                  {/* Actionable Highlights */}
                  <div className="space-y-2.5 mb-6">
                    <p className="text-xs uppercase tracking-widest text-rose-antique font-sans font-semibold">
                      Na prática:
                    </p>
                    <ul className="space-y-2.5" role="list">
                      {step.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-rose-light/90 font-light leading-relaxed text-pretty"
                        >
                          <Check
                            className="w-4 h-4 text-rose-antique shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tangible Stage Outcome Footer */}
                <div className="pt-4 border-t border-rose-border/50 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-rose-light/80 font-sans block mb-0.5">
                      Você sai desta etapa com
                    </span>
                    <span className="text-sm font-medium text-rose-antique font-sans">
                      {step.outcome}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <ArrowRight
                      className="w-4 h-4 text-rose-antique/50 hidden md:block shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </m.article>
            );
          })}
        </m.div>

        {/* Bottom Consultation Entry Strip */}
        <div className="mt-12 rounded-xl border border-rose-border/70 bg-forest-deep/70 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="text-center md:text-left">
            <h3 className="font-display text-xl sm:text-2xl text-rose-antique mb-1.5">
              Quer entender qual etapa ou pacote atende ao seu momento?
            </h3>
            <p className="text-xs sm:text-sm text-rose-light/80 font-light">
              Antes de contratar, alinhamos sua rotina e objetivos em uma conversa rápida e sem compromisso.
            </p>
          </div>
          <a
            href={diagnosticWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm bg-rose-antique text-forest-deep text-xs uppercase tracking-widest font-semibold hover:bg-rose-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-antique shrink-0"
            style={{ touchAction: "manipulation" }}
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Alinhar Minha Consultoria</span>
          </a>
        </div>
      </div>
    </section>
  );
}
