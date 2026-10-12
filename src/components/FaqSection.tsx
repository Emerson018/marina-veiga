"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs: FaqItem[] = [
    {
      id: "hibrido",
      question: "Como funciona o atendimento híbrido (online vs presencial)?",
      answer:
        "As etapas analíticas ocorrem online via videoconferência com total comodidade (diagnóstico de proporções corporais, estilo pessoal e apresentação do dossiê). As etapas práticas (Closet Detox e Personal Shopper) são realizadas presencialmente. Para clientes fora de nossa base, disponibilizamos também a metodologia 100% remota com suporte guiado por vídeo e fotos.",
    },
    {
      id: "duracao",
      question: "Quanto tempo dura todo o processo de consultoria?",
      answer:
        "Em média, a Consultoria Completa 360° é realizada ao longo de 4 a 6 semanas, respeitando sua agenda corporativa e garantindo tempo hábil para a confecção artesanal e encadernação do seu Dossiê de Estilo. Serviços pontuais (como Análise de Biótipo) são concluídos em até 10 dias úteis.",
    },
    {
      id: "coloracao",
      question: "A consultoria inclui análise de coloração pessoal?",
      answer:
        "Não. Nosso foco é puramente estratégico e focado em dress code corporativo, proporções anatômicas, caimento de alfaiataria e qualidade de tecidos. Acreditamos que a autoridade feminina e a elegância atemporal dependem de modelagem, postura e contexto profissional, sem restringir suas escolhas a cartelas cromáticas limitantes.",
    },
    {
      id: "entrega-dossie",
      question: "Como recebo o meu Dossiê de Estilo?",
      answer:
        "Você recebe um arquivo digital interativo em altíssima definição para consulta rápida no smartphone e tablet. Nos pacotes de Consultoria 360°, você também recebe um exemplar impresso exclusivo com acabamento de luxo.",
    },
    {
      id: "agendamento",
      question: "Como faço para agendar ou tirar dúvidas antes de contratar?",
      answer:
        "Basta clicar em qualquer um dos botões do site para falar diretamente com Mariana Veiga no WhatsApp. Alinhamos sua disponibilidade, tiramos dúvidas sobre os pacotes e formalizamos a reserva da sua vaga com antecedência.",
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-24 border-b border-rose-border/40 relative"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-ultra text-rose-antique font-sans font-medium block mb-3">
            Perguntas Frequentes
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display text-rose-antique tracking-wide leading-tight mb-4 text-balance"
          >
            Tire Suas Dúvidas
          </h2>
          <p className="text-base sm:text-lg text-rose-light/80 font-light leading-relaxed">
            Transparência e clareza sobre nosso formato de trabalho, modalidades e entregáveis.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-sm border border-rose-border bg-forest-card/40 overflow-hidden transition-colors hover:border-rose-antique/40"
              >
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-region-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-rose-antique"
                >
                  <span className="font-sans text-sm sm:text-base text-rose-antique font-medium tracking-wide">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-rose-antique shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-region-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="px-6 pb-6 pt-2 text-xs sm:text-sm text-rose-light/80 font-light leading-relaxed border-t border-rose-border/30 animate-fadeIn"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
