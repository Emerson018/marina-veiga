import { Check, MessageCircle, Clock, MapPin, CreditCard, ChevronDown } from "lucide-react";
import { Service } from "@/data/services";
import { generateWhatsAppUrl } from "@/utils/whatsapp";

export interface ServiceCardProps {
  service: Service;
  serviceNumber?: number;
  isActive?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onSelect?: () => void;
}

export default function ServiceCard({
  service,
  serviceNumber,
  isActive = true,
  isExpanded = false,
  onToggleExpand,
  onSelect,
}: ServiceCardProps) {
  const whatsAppUrl = generateWhatsAppUrl(service.whatsappMessage);

  return (
    <article
      className={`group/card relative flex flex-col justify-between rounded-sm border p-5 sm:p-6 transition-[border-color,background-color,box-shadow] duration-300 motion-reduce:transition-none ${service.isFeatured
          ? "border-rose-antique bg-forest-card/95 shadow-2xl shadow-rose-antique/10 ring-1 ring-rose-antique/40"
          : "border-rose-border bg-forest-card/85 hover:border-rose-antique/60 hover:bg-forest-card shadow-xl"
        } ${!isActive ? "pointer-events-auto select-none" : ""}`}
      aria-labelledby={`service-title-${service.id}`}
      onClick={(e) => {
        if (!isActive && onSelect) {
          e.stopPropagation();
          onSelect();
        }
      }}
    >
      {/* Top Badges */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            {serviceNumber && (
              <span
                className="text-[10px] uppercase tracking-widest font-semibold font-sans px-2 py-0.5 rounded-sm bg-forest-deep border border-rose-antique/50 text-rose-antique tabular-nums"
                aria-label={`Serviço número ${serviceNumber}`}
              >
                Nº {String(serviceNumber).padStart(2, "0")}
              </span>
            )}
            {service.badge && (
              <span
                className={`text-[9px] uppercase tracking-ultra px-2 py-0.5 rounded-sm font-semibold font-sans ${service.isFeatured
                    ? "bg-rose-antique text-forest-deep"
                    : "bg-forest-deep border border-rose-border text-rose-antique"
                  }`}
              >
                {service.badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2.5 text-[11px] text-rose-light/60 font-sans ml-auto">
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
          className="text-xl sm:text-2xl font-display text-rose-antique tracking-wide mb-1.5 leading-snug"
        >
          {service.title}
        </h3>
        {service.tagline && (
          <p className="text-[11px] uppercase tracking-widest text-rose-antique/80 font-medium mb-3">
            {service.tagline}
          </p>
        )}
        <p className="text-xs sm:text-[13px] text-rose-light/80 font-light leading-relaxed mb-4">
          {service.description}
        </p>
      </div>

      {/* Pricing Block */}
      <div className="pt-3.5 border-t border-rose-border/60">
        <div className="mb-3 space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] uppercase tracking-widest text-rose-light/60 font-sans">
              Investimento:
            </span>
            <span className="text-xl sm:text-2xl font-display text-rose-antique tabular-nums tracking-wide">
              {service.price}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-rose-antique font-sans">
            <CreditCard className="w-3.5 h-3.5 text-rose-antique shrink-0" aria-hidden="true" />
            <span>{service.installments}</span>
          </div>
          <span className="text-[11px] text-rose-light/70 font-sans block">
            {service.paymentTerms}
          </span>
        </div>

        {/* Semantic Accessible Toggle Button: Hover / Tap to reveal deliverables */}
        <button
          type="button"
          onClick={(e) => {
            if (isActive && onToggleExpand) {
              e.stopPropagation();
              onToggleExpand();
            }
          }}
          disabled={!isActive}
          aria-expanded={isExpanded}
          aria-controls={`deliverables-${service.id}`}
          className={`w-full flex items-center justify-between py-2 text-[10px] sm:text-[11px] uppercase tracking-widest font-sans transition-colors border-t border-rose-border/30 focus-visible:outline-rose-antique ${isActive
              ? "text-rose-antique hover:text-rose-light cursor-pointer"
              : "text-rose-antique/60 cursor-default"
            }`}
          style={{ touchAction: "manipulation" }}
        >
          <span>{isExpanded ? "Ocultar entregáveis" : "Ver o que está incluso"}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 motion-reduce:transition-none ${isExpanded ? "rotate-180" : "group-hover/card:translate-y-0.5"
              }`}
            aria-hidden="true"
          />
        </button>

        {/* Expandable Deliverables & CTA without redundant heading */}
        <div
          id={`deliverables-${service.id}`}
          className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out motion-reduce:transition-none ${isExpanded
              ? "grid-rows-[1fr] opacity-100 mt-2"
              : "grid-rows-[0fr] opacity-0 group-hover/card:grid-rows-[1fr] group-hover/card:opacity-100 group-hover/card:mt-2 group-focus-within/card:grid-rows-[1fr] group-focus-within/card:opacity-100 group-focus-within/card:mt-2"
            }`}
        >
          <div className="overflow-hidden space-y-4 pt-2">
            <ul className="space-y-2 border-t border-rose-border/40 pt-3" role="list">
              {service.deliverables.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs text-rose-light/90 font-light leading-relaxed"
                >
                  <Check
                    className="w-3.5 h-3.5 text-rose-antique shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold transition-[background-color,color] duration-200 focus-visible:outline-rose-antique ${service.isFeatured
                  ? "bg-rose-antique text-forest-deep hover:bg-rose-light shadow-md"
                  : "border border-rose-antique text-rose-antique hover:bg-rose-antique hover:text-forest-deep"
                }`}
              aria-label={`Conversar no WhatsApp sobre ${service.title}`}
              style={{ touchAction: "manipulation" }}
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Quero Esta Consultoria</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
