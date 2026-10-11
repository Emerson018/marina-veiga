import Image from "next/image";
import { BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { generateWhatsAppUrl } from "@/utils/whatsapp";

export default function DossierShowcase() {
  const whatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Gostaria de saber mais sobre como é desenvolvido o Dossiê de Estilo Exclusivo."
  );

  const features = [
    {
      title: "Mapeamento Anatômico & Silhueta",
      description: "Estudo detalhado das suas proporções para indicar caimentos que favorecem sua postura.",
    },
    {
      title: "Cápsula Executiva com +30 Looks",
      description: "Catálogo fotográfico de combinações práticas para reuniões, viagens e eventos corporativos.",
    },
    {
      title: "Guia de Tecidos & Alfaiataria",
      description: "Critérios de seleção de matérias-primas nobres, durabilidade e manutenção de peças.",
    },
    {
      title: "Formato Digital & Impresso de Luxo",
      description: "Acesso permanente no seu smartphone e encadernação editorial premium para sua coleção.",
    },
  ];

  return (
    <section
      id="dossie"
      aria-labelledby="dossier-heading"
      className="py-24 border-b border-rose-border/40 relative overflow-hidden bg-forest-deep/60"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase: Dossier Mockup */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-sm overflow-hidden border border-rose-antique/50 bg-forest-card shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                alt="Amostra editorial do Dossiê de Estilo Mariana Veiga"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-sm bg-forest-deep/90 border border-rose-border backdrop-blur-sm">
                <span className="text-[10px] uppercase tracking-ultra text-rose-antique font-sans font-semibold block mb-1">
                  Exclusividade
                </span>
                <p className="font-display text-base text-rose-light">
                  Edição Personalizada & Encadernação Artesanal
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Description */}
          <div className="lg:col-span-7 flex flex-col items-start order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-border bg-forest-card mb-4">
              <BookOpen className="w-3.5 h-3.5 text-rose-antique" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-ultra text-rose-antique font-sans font-medium">
                Entregável Exclusivo
              </span>
            </div>

            <h2
              id="dossier-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display text-rose-antique tracking-wide leading-tight mb-6"
            >
              O Dossiê de Estilo: Seu Guia Perpétuo
            </h2>

            <p className="text-base sm:text-lg text-rose-light/90 font-light leading-relaxed mb-8">
              A consultoria de imagem não termina na sessão de conversa. Ao final da
              jornada, você recebe seu Dossiê de Estilo: um livro personalizado que
              documenta todas as suas decisões de imagem, garantindo que você nunca mais
              fique em dúvida diante do espelho.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-10">
              {features.map((feat) => (
                <div key={feat.title} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-rose-antique shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-sans text-xs uppercase tracking-widest text-rose-antique font-semibold mb-1">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-rose-light/75 font-light leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-sm bg-rose-antique text-forest-deep text-xs uppercase tracking-widest font-semibold hover:bg-rose-light transition-colors focus-visible:outline-rose-antique"
            >
              <span>Quero Meu Dossiê de Estilo</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
