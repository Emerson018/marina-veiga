import Image from "next/image";
import { Sparkles, ShieldCheck, Compass } from "lucide-react";

export default function AboutManifesto() {
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
        "Elegância sem excessos. Priorizamos caimentos impecáveis, tecidos nobres e peças atemporais com alto custo por uso.",
    },
    {
      icon: Compass,
      title: "Autonomia Perpétua",
      description:
        "Você no controle absoluto do seu closet, escolhendo looks matinais com rapidez, intencionalidade e zero frustração.",
    },
  ];

  return (
    <section
      id="sobre"
      aria-labelledby="about-heading"
      className="py-24 border-b border-rose-border/40 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-ultra text-rose-antique font-sans font-medium block mb-3">
            Manifesto & Metodologia
          </span>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display text-rose-antique tracking-wide leading-tight mb-6"
          >
            A imagem não é sobre aparência. É sobre posicionamento.
          </h2>
          <p className="text-base sm:text-lg text-rose-light/90 font-light leading-relaxed">
            No universo corporativo e nos negócios, sua presença comunica antes de
            você proferir a primeira palavra. Meu trabalho consiste em traduzir
            sua competência e ambição em uma linguagem visual coerente,
            eliminando fórmulas prontas e tendências passageiras.
          </p>
        </div>

        {/* Grid: Story + Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-rose-border bg-forest-card/50 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Mariana Veiga em ambiente de consultoria e alfaiataria"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden sm:block bg-forest-deep border border-rose-antique/40 p-4 rounded-sm shadow-xl max-w-xs">
              <p className="font-display text-lg text-rose-antique italic">
                “O verdadeiro luxo reside na coerência entre quem você é e o que você veste.”
              </p>
              <span className="text-[10px] uppercase tracking-widest text-rose-light/60 font-sans block mt-1">
                — Mariana Veiga
              </span>
            </div>
          </div>

          {/* Pillars & Philosophy */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="space-y-4 text-sm sm:text-base text-rose-light/80 font-light leading-relaxed mb-6">
              <p>
                A consultoria com Mariana Veiga não impõe restrições arbitrárias.
                Construímos um guarda-roupa inteligente a partir da sua rotina real,
                dos seus objetivos executivos e das suas proporções anatômicas.
              </p>
              <p>
                Através do nosso modelo de atendimento híbrido, realizamos
                diagnósticos aprofundados online e intervenções práticas presenciais,
                culminando na entrega do seu Dossiê de Estilo exclusivo.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-2">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-5 rounded-sm border border-rose-border bg-forest-card/40 hover:border-rose-antique/60 transition-colors flex items-start gap-4"
                  >
                    <div className="p-2.5 rounded-sm bg-forest-deep border border-rose-border text-rose-antique shrink-0">
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-sans text-sm uppercase tracking-widest text-rose-antique font-semibold mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-rose-light/80 font-light leading-relaxed">
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
