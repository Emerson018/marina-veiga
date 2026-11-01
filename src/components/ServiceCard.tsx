import { Check, MessageCircle, Clock, MapPin, CreditCard } from "lucide-react";
import { Service } from "@/data/services";
import { generateWhatsAppUrl } from "@/utils/whatsapp";

export interface ServiceCardProps {
  service: Service;
  isActive?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onSelect?: () => void;
}

export default function ServiceCard({
  service,
  isActive = true,
  isExpanded = false,
  onToggleExpand,
  onSelect,
}: ServiceCardProps) {
  const whatsAppUrl = generateWhatsAppUrl(service.whatsappMessage);

  return (
    <article
      className={`group/card relative flex flex-col justify-between rounded-sm border p-4 sm:p-5 lg:p-6 transition-[border-color,background-color,box-shadow] duration-300 motion-reduce:transition-none ${
        service.isFeatured
          ? "border-rose-antique bg-forest-card/95 shadow-2xl shadow-rose-antique/10 ring-1 ring-rose-antique/40"
          : "border-rose-border/60 bg-forest-card/85 hover:border-rose-antique/60 hover:bg-forest-card shadow-xl"
      } ${!isActive ? "pointer-events-auto select-none opacity-80" : ""}`}
      aria-labelledby={`service-title-${service.id}`}
      onClick={(e) => {
        if (!isActive && onSelect) {
          e.stopPropagation();
          onSelect();
        } else if (isActive && onToggleExpand) {
          onToggleExpand();
        }
      }}
    >
      {/* Top Badges & Metadata */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          {service.badge && (
            <span
              className={`text-[9px] sm:text-[10px] uppercase tracking-ultra px-2 py-0.5 rounded-sm font-semibold font-sans ${
                service.isFeatured
                  ? "bg-rose-antique text-forest-deep"
                  : "bg-forest-deep border border-rose-border text-rose-antique"
              }`}
            >
              {service.badge}
            </span>
          )}
          <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] text-rose-light/70 font-sans ml-auto">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-antique shrink-0" aria-hidden="true" />
              {service.modality}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-rose-antique shrink-0" aria-hidden="true" />
              {service.duration}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3
          id={`service-title-${service.id}`}
          className="text-xl sm:text-2xl font-display text-rose-antique tracking-wide mb-1 leading-snug"
        >
          {service.title}
        </h3>
        {service.tagline && (
          <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-rose-antique/80 font-medium mb-2">
            {service.tagline}
          </p>
        )}
        <p className="text-xs sm:text-[13px] text-rose-light/85 font-light leading-relaxed mb-3.5">
          {service.description}
        </p>
      </div>

      {/* Pricing Block */}
      <div className="pt-2.5 border-t border-rose-border/60">
        <div className="mb-2 space-y-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-rose-light/60 font-sans">
              Investimento:
            </span>
            <span className="text-xl sm:text-2xl font-display text-rose-antique tabular-nums tracking-wide">
              {service.price}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-rose-antique font-sans">
            <CreditCard className="w-3 h-3 text-rose-antique shrink-0" aria-hidden="true" />
            <span>{service.installments}</span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-rose-light/70 font-sans block">
            {service.paymentTerms}
          </span>
        </div>

        {/* Deliverables & CTA: Revealed on hover, focus-within, or touch tap */}
        <div
          id={`deliverables-${service.id}`}
          className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out motion-reduce:transition-none ${
            isExpanded
              ? "grid-rows-[1fr] opacity-100 mt-2"
              : "grid-rows-[0fr] opacity-0 group-hover/card:grid-rows-[1fr] group-hover/card:opacity-100 group-hover/card:mt-2 group-focus-within/card:grid-rows-[1fr] group-focus-within/card:opacity-100 group-focus-within/card:mt-2"
          }`}
        >
          <div className="overflow-hidden space-y-3">
            <div className="pt-2.5 border-t border-rose-border/40">
              <span className="text-[10px] uppercase tracking-wider text-rose-antique/90 font-semibold block mb-2">
                O que está incluso:
              </span>
              <ul className="space-y-1.5" role="list">
                {service.deliverables.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-xs text-rose-light/90 font-light leading-snug"
                  >
                    <Check
                      className="w-3.5 h-3.5 text-rose-antique shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm text-[11px] sm:text-xs uppercase tracking-widest font-semibold transition-[background-color,color] duration-200 focus-visible:outline-rose-antique min-h-[40px] ${
                service.isFeatured
                  ? "bg-rose-antique text-forest-deep hover:bg-rose-light shadow-md"
                  : "border border-rose-antique text-rose-antique hover:bg-rose-antique hover:text-forest-deep"
              }`}
              aria-label={`Conversar no WhatsApp sobre ${service.title}`}
              style={{ touchAction: "manipulation" }}
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Quero Esta Consultoria</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
