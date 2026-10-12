import { SERVICES } from "@/data/services";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import ServiceCard from "./ServiceCard";

export default function CatalogGrid() {
  const corporateWhatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Gostaria de conversar sobre uma proposta corporativa personalizada."
  );

  return (
    <section
      id="catalogo"
      aria-labelledby="catalog-heading"
      className="py-24 border-b border-rose-border/40 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
            Escolha o formato que melhor se alinha aos seus objetivos de carreira e
            estilo de vida. Todos os pacotes contam com orientação direta de Mariana Veiga.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
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
