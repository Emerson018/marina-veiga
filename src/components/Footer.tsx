"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, ArrowUp } from "lucide-react";
import { m } from "framer-motion";
import {
  VIEWPORT_ONCE,
  pressable,
  revealItem,
  staggerContainer,
} from "@/lib/motion";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import { NAV_LINKS } from "@/data/navigation";
import { POLICIES, PolicyDocument } from "@/data/policies";
import PolicyModal from "./PolicyModal";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activePolicy, setActivePolicy] = useState<PolicyDocument | null>(null);

  const whatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Gostaria de falar sobre a consultoria de imagem."
  );

  return (
    <>
      <footer
        role="contentinfo"
        className="bg-forest-deep border-t border-rose-border/50 pt-16 pb-12 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <m.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-rose-border/30"
          >
            {/* Brand Column */}
            <m.div
              data-reveal
              variants={revealItem}
              className="md:col-span-5 flex flex-col items-start"
            >
              <span className="font-display text-2xl sm:text-3xl tracking-wide text-rose-antique block mb-1">
                Mariana Veiga
              </span>
              <span className="text-[11px] uppercase tracking-ultra text-rose-antique/70 font-sans block mb-4">
                Consultoria de Imagem & Estilo Pessoal
              </span>
              <p className="text-xs sm:text-sm text-rose-light/75 font-light leading-relaxed max-w-sm mb-6">
                Elegância atemporal e quiet luxury para mulheres que querem se vestir
                com segurança no trabalho, na rotina, nos eventos e nas viagens.
              </p>

              <m.a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                {...pressable}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-rose-antique/50 text-rose-antique hover:bg-rose-antique hover:text-forest-deep text-xs uppercase tracking-widest font-medium transition-colors focus-visible:outline-rose-antique"
                aria-label="Falar diretamente com Mariana Veiga no WhatsApp"
                style={{ touchAction: "manipulation" }}
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Falar Diretamente com Mariana</span>
              </m.a>
            </m.div>

            {/* Navigation Links */}
            <m.div data-reveal variants={revealItem} className="md:col-span-3">
              <span className="text-xs uppercase tracking-widest text-rose-antique font-semibold block mb-4">
                Navegação
              </span>
              <ul className="space-y-2.5" role="list">
                {NAV_LINKS.map((link) => (
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
            </m.div>

            {/* Modality & Service Information */}
            <m.div data-reveal variants={revealItem} className="md:col-span-4">
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
            </m.div>
          </m.div>

          {/* Bottom Bar: Copyright, Policies & Back to Top */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-rose-light/60 font-light">
            <p className="text-center md:text-left">
              © {currentYear} Mariana Veiga Consultoria. Todos os direitos reservados.
            </p>

            {/* Institutional Policies Trigger Buttons with Accessible Touch Targets (>= 44px) */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-sans">
              <button
                type="button"
                onClick={() => setActivePolicy(POLICIES.termos)}
                className="py-3 px-2 inline-flex items-center min-h-[44px] text-rose-light/70 hover:text-rose-antique underline underline-offset-4 decoration-rose-border transition-colors focus-visible:outline-rose-antique cursor-pointer"
                style={{ touchAction: "manipulation" }}
              >
                Termos & Condições
              </button>

              <span className="text-rose-border/60 select-none px-1" aria-hidden="true">
                ·
              </span>

              <button
                type="button"
                onClick={() => setActivePolicy(POLICIES.privacidade)}
                className="py-3 px-2 inline-flex items-center min-h-[44px] text-rose-light/70 hover:text-rose-antique underline underline-offset-4 decoration-rose-border transition-colors focus-visible:outline-rose-antique cursor-pointer"
                style={{ touchAction: "manipulation" }}
              >
                Privacidade & Sigilo (LGPD)
              </button>
            </div>

            <a
              href="#main-content"
              className="inline-flex items-center gap-1.5 text-rose-antique hover:text-rose-light transition-colors uppercase tracking-wider text-[11px]"
              aria-label="Voltar ao topo da página"
              style={{ touchAction: "manipulation" }}
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>

      {/* Policy Modal Overlay */}
      <PolicyModal
        policy={activePolicy}
        isOpen={activePolicy !== null}
        onClose={() => setActivePolicy(null)}
      />
    </>
  );
}
