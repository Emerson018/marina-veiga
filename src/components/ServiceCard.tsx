import { Check, MessageCircle, Clock, MapPin, CreditCard } from "lucide-react";
import { Service } from "@/data/services";
import { generateWhatsAppUrl } from "@/utils/whatsapp";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const whatsAppUrl = generateWhatsAppUrl(service.whatsappMessage);

  return (
    <article
      className={`relative flex flex-col justify-between rounded-sm border p-6 sm:p-8 transition-colors duration-300 ${
        service.isFeatured
          ? "border-rose-antique bg-forest-card/90 shadow-2xl shadow-rose-antique/5 ring-1 ring-rose-antique/40"
          : "border-rose-border bg-forest-card/50 hover:border-rose-antique/50 hover:bg-forest-card/70"
      }`}
      aria-labelledby={`service-title-${service.id}`}
    >
      {/* Top Badges */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          {service.badge && (
            <span
              className={`text-[10px] uppercase tracking-ultra px-2.5 py-1 rounded-sm font-semibold font-sans ${
                service.isFeatured
                  ? "bg-rose-antique text-forest-deep"
                  : "bg-forest-deep border border-rose-border text-rose-antique"
              }`}
            >
              {service.badge}
            </span>
          )}
          <div className="flex items-center gap-3 text-xs text-rose-light/60 font-sans ml-auto">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-antique" aria-hidden="true" />
              {service.modality}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-rose-antique" aria-hidden="true" />
              {service.duration}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3
          id={`service-title-${service.id}`}
          className="text-2xl sm:text-3xl font-display text-rose-antique tracking-wide mb-2 leading-snug"
        >
          {service.title}
        </h3>
        {service.tagline && (
          <p className="text-xs uppercase tracking-widest text-rose-antique/80 font-medium mb-4">
            {service.tagline}
          </p>
        )}
        <p className="text-sm text-rose-light/80 font-light leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Deliverables List */}
        <div className="pt-4 border-t border-rose-border/40 mb-8">
          <span className="text-[11px] uppercase tracking-wider text-rose-antique/90 font-semibold block mb-3">
            O que está incluso:
          </span>
          <ul className="space-y-2.5" role="list">
            {service.deliverables.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-light/90 font-light leading-relaxed"
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

      {/* Pricing & CTA */}
      <div className="pt-6 border-t border-rose-border/60">
        <div className="mb-5 space-y-1.5">
          <div className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-widest text-rose-light/60 font-sans">
              Investimento:
            </span>
            <span className="text-2xl sm:text-3xl font-display text-rose-antique tabular-nums tracking-wide">
              {service.price}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-rose-antique font-sans">
            <CreditCard className="w-3.5 h-3.5 text-rose-antique shrink-0" aria-hidden="true" />
            <span>{service.installments}</span>
          </div>
          <span className="text-xs text-rose-light/70 font-sans block">
            {service.paymentTerms}
          </span>
        </div>

        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm text-xs uppercase tracking-widest font-semibold transition-colors duration-200 focus-visible:outline-rose-antique ${
            service.isFeatured
              ? "bg-rose-antique text-forest-deep hover:bg-rose-light shadow-md"
              : "border border-rose-antique text-rose-antique hover:bg-rose-antique hover:text-forest-deep"
          }`}
          aria-label={`Conversar no WhatsApp sobre ${service.title}`}
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          <span>Quero Esta Consultoria</span>
        </a>
      </div>
    </article>
  );
}
