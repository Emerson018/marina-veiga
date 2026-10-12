import { MessageCircle } from "lucide-react";
import { generateWhatsAppUrl } from "@/utils/whatsapp";

export default function FloatingWhatsApp() {
  const whatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Estou navegando no seu site e gostaria de tirar uma dúvida."
  );

  return (
    <aside
      aria-label="Atendimento rápido via WhatsApp"
      className="fixed bottom-6 right-6 z-50 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))]"
    >
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Atendimento flutuante com Mariana Veiga no WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-rose-antique text-forest-deep shadow-2xl hover:bg-rose-light active:scale-95 transition-transform duration-300 focus-visible:outline-rose-antique focus-visible:outline-offset-4 motion-reduce:transition-none"
      >
        <MessageCircle className="w-7 h-7" aria-hidden="true" />

        {/* Floating tooltip on desktop hover */}
        <span
          role="tooltip"
          className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-forest-deep text-rose-light text-xs uppercase tracking-widest px-3 py-1.5 rounded-sm border border-rose-border opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg hidden sm:block"
        >
          Falar com Mariana
        </span>
      </a>
    </aside>
  );
}
