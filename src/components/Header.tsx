"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X } from "lucide-react";
import { generateWhatsAppUrl } from "@/utils/whatsapp";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Catálogo", href: "#catalogo" },
    { label: "Sobre", href: "#sobre" },
    { label: "Dossiê", href: "#dossie" },
    { label: "Metodologia", href: "#metodologia" },
    { label: "FAQ", href: "#faq" },
  ];

  const whatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Gostaria de conversar sobre a consultoria de imagem."
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-forest/90 backdrop-blur-md border-b border-rose-border transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex flex-col focus-visible:outline-rose-antique"
          aria-label="Mariana Veiga Consultoria - Início"
        >
          <span className="font-display text-2xl md:text-3xl tracking-wide text-rose-antique group-hover:text-rose-light transition-colors">
            Mariana Veiga
          </span>
          <span className="text-[10px] uppercase tracking-ultra text-rose-antique/70 font-sans -mt-1">
            Consultoria de Imagem
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest text-rose-light/80 hover:text-rose-antique transition-colors focus-visible:outline-rose-antique"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-rose-antique/60 text-rose-antique hover:bg-rose-antique hover:text-forest-deep text-xs uppercase tracking-widest transition-colors font-medium focus-visible:outline-rose-antique"
            aria-label="Contato rápido no WhatsApp"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Contato</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-rose-antique hover:text-rose-light focus-visible:outline-rose-antique"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-forest-deep/95 border-b border-rose-border px-6 py-6 animate-fadeIn">
          <nav className="flex flex-col gap-5" aria-label="Navegação mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-rose-light/90 hover:text-rose-antique py-1 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-rose-border/50">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-rose-antique text-forest-deep text-xs uppercase tracking-widest font-semibold transition-colors"
                aria-label="Falar com Mariana Veiga no WhatsApp"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Iniciar no WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
