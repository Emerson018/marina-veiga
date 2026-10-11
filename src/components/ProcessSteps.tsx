import { MessageSquareText, Sparkles, BookOpenCheck } from "lucide-react";

export default function ProcessSteps() {
  const steps = [
    {
      number: "01",
      icon: MessageSquareText,
      title: "01. Diagnóstico & Alinhamento",
      subtitle: "Online | 1 a 2 Encontros",
      description:
        "Entrevista aprofundada para entender sua rotina corporativa, cargos e aspirações de carreira. Mapeamento do estilo predominante e identificação técnica das proporções anatômicas.",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "02. Encontros Práticos & Intervenção",
      subtitle: "Presencial ou Híbrido",
      description:
        "Sessão de Closet Detox para multiplicar looks com seu acervo real e, conforme o pacote, acompanhamento de Personal Shopper focado em peças-chave de alfaiataria e durabilidade.",
    },
    {
      number: "03",
      icon: BookOpenCheck,
      title: "03. Entrega do Dossiê & Consolidação",
      subtitle: "Digital & Físico + Suporte",
      description:
        "Apresentação detalhada do seu Dossiê de Estilo personalizado com todas as combinações registradas. Inclui 30 dias de acompanhamento contínuo via WhatsApp para tirar dúvidas no dia a dia.",
    },
  ];

  return (
    <section
      id="metodologia"
      aria-labelledby="process-heading"
      className="py-24 border-b border-rose-border/40 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-ultra text-rose-antique font-sans font-medium block mb-3">
            Jornada de Transformação
          </span>
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display text-rose-antique tracking-wide leading-tight mb-4"
          >
            Como Funciona a Consultoria
          </h2>
          <p className="text-base sm:text-lg text-rose-light/80 font-light leading-relaxed">
            Um método estruturado em 3 etapas sequenciais que combina estratégia,
            prática e autonomia perpétua para o seu dia a dia profissional.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative p-8 rounded-sm border border-rose-border bg-forest-card/40 flex flex-col justify-between hover:border-rose-antique/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-3xl sm:text-4xl text-rose-antique/40 tabular-nums">
                      {step.number}
                    </span>
                    <div className="p-2.5 rounded-sm bg-forest-deep border border-rose-border text-rose-antique">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl text-rose-antique mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-rose-antique/80 font-medium block mb-4">
                    {step.subtitle}
                  </span>
                  <p className="text-sm text-rose-light/80 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
