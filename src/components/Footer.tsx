import Link from "next/link";
import { MessageCircle, ArrowUp } from "lucide-react";
import { generateWhatsAppUrl } from "@/utils/whatsapp";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Gostaria de falar sobre a consultoria de imagem."
  );

  const footerLinks = [
    { label: "Catálogo", href: "#catalogo" },
    { label: "Sobre Mariana", href: "#sobre" },
    { label: "Dossiê de Estilo", href: "#dossie" },
    { label: "Metodologia", href: "#metodologia" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <footer
      role="contentinfo"
      className="bg-forest-deep border-t border-rose-border/50 pt-16 pb-12 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-rose-border/30">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <span className="font-display text-2xl sm:text-3xl tracking-wide text-rose-antique block mb-1">
              Mariana Veiga
            </span>
            <span className="text-[11px] uppercase tracking-ultra text-rose-antique/70 font-sans block mb-4">
              Consultoria de Imagem & Dress Code Corporativo
            </span>
            <p className="text-xs sm:text-sm text-rose-light/75 font-light leading-relaxed max-w-sm mb-6">
              Posicionamento de imagem estratégica, elegância atemporal e quiet luxury
              para mulheres profissionais e executivas de alto impacto.
            </p>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-rose-antique/50 text-rose-antique hover:bg-rose-antique hover:text-forest-deep text-xs uppercase tracking-widest font-medium transition-colors focus-visible:outline-rose-antique"
              aria-label="Falar diretamente com Mariana Veiga no WhatsApp"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Falar Diretamente com Mariana</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <span className="text-xs uppercase tracking-widest text-rose-antique font-semibold block mb-4">
              Navegação
            </span>
            <ul className="space-y-2.5" role="list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs uppercase tracking-widest text-rose-light/70 hover:text-rose-antique transition-colors focus-visible:outline-rose-antique"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Modality & Service Information */}
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-widest text-rose-antique font-semibold block mb-4">
              Atendimento Híbrido
            </span>
            <p className="text-xs sm:text-sm text-rose-light/75 font-light leading-relaxed mb-4">
              Sessões estratégicas e diagnósticas realizadas 100% online para todo o
              Brasil e exterior. Etapas práticas presenciais de Closet Detox e Personal
              Shopper sob agendamento.
            </p>
            <div className="p-3.5 rounded-sm border border-rose-border bg-forest-card/30">
              <span className="text-[10px] uppercase tracking-wider text-rose-antique font-medium block">
                Agendamento de Vagas
              </span>
              <span className="text-xs text-rose-light/80 block mt-0.5">
                Atendimento com número restrito de clientes por mês para garantir dedicação exclusiva.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-light/60 font-light">
          <p>
            © {currentYear} Mariana Veiga Consultoria. Todos os direitos reservados.
          </p>

          <a
            href="#main-content"
            className="inline-flex items-center gap-1.5 text-rose-antique hover:text-rose-light transition-colors uppercase tracking-wider text-[11px]"
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
