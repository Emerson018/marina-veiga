import { Check, MessageCircle, Clock, MapPin, CreditCard, ChevronDown } from "lucide-react";
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
      className={`group/card relative flex flex-col justify-between rounded-sm border p-6 sm:p-8 transition-[border-color,background-color,box-shadow] duration-300 motion-reduce:transition-none h-full ${
        service.isFeatured
          ? "border-rose-antique bg-forest-card/95 shadow-2xl shadow-rose-antique/10 ring-1 ring-rose-antique/40"
          : "border-rose-border/60 bg-forest-card/80 hover:border-rose-antique/60 hover:bg-forest-card shadow-xl"
      } ${!isActive ? "pointer-events-auto select-none opacity-80" : ""}`}
      aria-labelledby={`service-title-${service.id}`}
      onClick={(e) => {
        if (!isActive && onSelect) {
          e.stopPropagation();
          onSelect();
        }
      }}
    >
      {/* Top Badges & Metadata */}
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
          <div className="flex items-center gap-3 text-xs text-rose-light/70 font-sans ml-auto">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-antique shrink-0" aria-hidden="true" />
              {service.modality}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-rose-antique shrink-0" aria-hidden="true" />
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
          <p className="text-xs uppercase tracking-widest text-rose-antique/80 font-medium mb-3">
            {service.tagline}
          </p>
        )}
        <p className="text-sm text-rose-light/85 font-light leading-relaxed mb-6">
          {service.description}
        </p>
      </div>

      {/* Pricing, Deliverables & Permanent CTA */}
      <div className="pt-4 border-t border-rose-border/60 mt-auto flex flex-col justify-end">
        {/* Pricing Block */}
        <div className="mb-4 space-y-1.5">
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

        {/* Semantic Accessible Toggle Button: Click to reveal deliverables */}
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
          className={`w-full flex items-center justify-between py-2.5 text-[11px] uppercase tracking-widest font-sans transition-colors border-t border-rose-border/30 focus-visible:ring-2 focus-visible:ring-rose-antique focus-visible:outline-none min-h-[44px] ${
            isActive
              ? "text-rose-antique hover:text-rose-light cursor-pointer"
              : "text-rose-antique/60 cursor-default"
          }`}
          style={{ touchAction: "manipulation" }}
        >
          <span>{isExpanded ? "Ocultar entregáveis" : "Ver o que está incluso"}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 motion-reduce:transition-none ${
              isExpanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {/* Expandable Deliverables */}
        <div
          id={`deliverables-${service.id}`}
          className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out motion-reduce:transition-none ${
            isExpanded
              ? "grid-rows-[1fr] opacity-100 mt-2"
              : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-3 pb-2 border-t border-rose-border/40">
              <span className="text-[11px] uppercase tracking-wider text-rose-antique/90 font-semibold block mb-2.5">
                O que está incluso:
              </span>
              <ul className="space-y-2" role="list">
                {service.deliverables.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-xs text-rose-light/90 font-light leading-relaxed"
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
          </div>
        </div>

        {/* Permanent Primary CTA (Always Visible & Accessible) */}
        <div className="pt-4 mt-2">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm text-xs uppercase tracking-widest font-semibold transition-[background-color,color] duration-200 focus-visible:ring-2 focus-visible:ring-rose-antique focus-visible:ring-offset-2 focus-visible:ring-offset-forest-deep focus-visible:outline-none min-h-[44px] ${
              service.isFeatured
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
    </article>
  );
}
