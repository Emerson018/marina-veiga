"use client";

import { useEffect, useRef } from "react";
import { X, ShieldCheck, FileText, ArrowRight } from "lucide-react";
import { PolicyDocument } from "@/data/policies";
import { generateWhatsAppUrl } from "@/utils/whatsapp";

interface PolicyModalProps {
  policy: PolicyDocument | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PolicyModal({ policy, isOpen, onClose }: PolicyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Lock background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set initial focus to close button
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !policy) return null;

  const IconComponent = policy.id === "privacidade" ? ShieldCheck : FileText;
  const whatsAppUrl = generateWhatsAppUrl(
    `Olá Mariana! Li as diretrizes de ${policy.title} e gostaria de tirar uma dúvida.`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-forest-deep/85 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-forest-card/95 border border-rose-border rounded-sm shadow-2xl z-10 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 sm:p-8 border-b border-rose-border/40 bg-forest-deep/60">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-sm bg-forest-deep border border-rose-border text-rose-antique shrink-0 mt-0.5">
              <IconComponent className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-ultra text-rose-antique font-sans font-medium block mb-1">
                Mariana Veiga Consultoria · {policy.lastUpdated}
              </span>
              <h2
                id="policy-modal-title"
                className="text-2xl sm:text-3xl font-display text-rose-antique tracking-wide leading-tight"
              >
                {policy.title}
              </h2>
              <p className="text-xs sm:text-sm text-rose-light/70 font-light mt-1">
                {policy.subtitle}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar janela de políticas"
            className="p-2 rounded-sm border border-rose-border/60 text-rose-light/70 hover:text-rose-antique hover:border-rose-antique transition-colors shrink-0 focus-visible:outline-rose-antique"
            style={{ touchAction: "manipulation" }}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 divide-y divide-rose-border/25">
          {policy.sections.map((section, idx) => (
            <div key={idx} className={idx > 0 ? "pt-6" : ""}>
              <h3 className="font-sans text-sm sm:text-base font-semibold text-rose-antique tracking-wide uppercase mb-3">
                {section.title}
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-rose-light/85 font-light leading-relaxed">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}

          {/* Footer Callout */}
          <div className="pt-6 mt-6 border-t border-rose-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-forest-deep/40 -mx-6 -mb-8 p-6 sm:p-8">
            <div>
              <span className="text-xs font-semibold text-rose-antique block">
                Ficou com alguma dúvida sobre nossas diretrizes?
              </span>
              <span className="text-xs text-rose-light/70 block mt-0.5">
                Mariana Veiga atende pessoalmente no WhatsApp para esclarecer qualquer ponto.
              </span>
            </div>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-rose-antique text-forest-deep hover:bg-rose-light text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 shadow-sm focus-visible:outline-rose-antique"
              style={{ touchAction: "manipulation" }}
            >
              <span>Falar no WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
