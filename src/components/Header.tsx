"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import { NAV_LINKS } from "@/data/navigation";
import { EASE_SILK, SPRING_SETTLE, pressable } from "@/lib/motion";

/** Rolagem a partir da qual o cabeçalho encolhe e ganha fundo. */
const SCROLL_THRESHOLD = 16;
/** Quanto o cabeçalho sobe ao encolher (px). Só `transform`, sem mexer no layout. */
const SHRINK = 12;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Gostaria de conversar sobre a consultoria de imagem."
  );

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    if (href === "/" || href === "#" || href === "#inicio") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      try {
        window.history.pushState(null, "", "/");
      } catch {
        // Fallback for test runners / environments
      }
      setMobileMenuOpen(false);
      return;
    }

    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 76;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });

        try {
          window.history.pushState(null, "", href);
        } catch {
          // Fallback for test runners / environments
        }
      } else {
        window.location.hash = href;
      }
      setMobileMenuOpen(false);
    }
  };

  const solid = scrolled || mobileMenuOpen;

  return (
    <m.header
      initial={false}
      animate={{ y: scrolled ? -SHRINK : 0 }}
      transition={SPRING_SETTLE}
      className="sticky top-0 z-40 w-full"
    >
      {/* Fundo translúcido: aparece ao rolar, animando só a opacidade */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-forest/90 backdrop-blur-md border-b border-rose-border transition-opacity duration-500 motion-reduce:transition-none ${
          solid ? "opacity-100" : "opacity-0"
        }`}
      />

      <m.div
        initial={false}
        animate={{ y: scrolled ? SHRINK / 2 : 0 }}
        transition={SPRING_SETTLE}
        className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between"
      >
        {/* Brand Logo */}
        <m.div
          initial={false}
          animate={{ scale: scrolled ? 0.9 : 1 }}
          transition={SPRING_SETTLE}
          className="origin-left"
        >
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
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
        </m.div>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="group relative py-2 text-xs uppercase tracking-widest text-rose-light/80 hover:text-rose-antique transition-colors focus-visible:outline-rose-antique"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-0.5 h-px bg-rose-antique origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <m.a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            {...pressable}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-rose-antique/60 text-rose-antique hover:bg-rose-antique hover:text-forest-deep text-xs uppercase tracking-widest transition-colors font-medium focus-visible:outline-rose-antique"
            aria-label="Contato rápido no WhatsApp"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Contato</span>
          </m.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 -mr-2.5 text-rose-antique hover:text-rose-light focus-visible:outline-rose-antique"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </m.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_SILK }}
            className="md:hidden absolute top-full inset-x-0 bg-forest-deep/95 backdrop-blur-md border-b border-rose-border px-6 py-6"
          >
            <nav className="flex flex-col gap-5" aria-label="Navegação mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
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
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
