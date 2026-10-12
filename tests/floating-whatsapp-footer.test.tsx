import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

describe("Ticket 06: FloatingWhatsApp and Footer components", () => {
  describe("FloatingWhatsApp", () => {
    it("renders fixed link with accessible name and target blank", () => {
      render(<FloatingWhatsApp />);
      const button = screen.getByRole("link", {
        name: /Atendimento flutuante com Mariana Veiga no WhatsApp/i,
      });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("target", "_blank");
      expect(button).toHaveAttribute("rel", "noopener noreferrer");
      expect(button.getAttribute("href")).toContain("wa.me");
    });
  });

  describe("Footer", () => {
    it("renders brand signature, hybrid notice, and copyright", () => {
      render(<Footer />);
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
      expect(screen.getByText(/Atendimento Híbrido/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Todos os direitos reservados/i)
      ).toBeInTheDocument();
    });

    it("has anchor links to all page sections", () => {
      render(<Footer />);
      expect(screen.getByRole("link", { name: /Catálogo/i })).toHaveAttribute("href", "#catalogo");
      expect(screen.getByRole("link", { name: /Sobre/i })).toHaveAttribute("href", "#sobre");
      expect(screen.getByRole("link", { name: /Dossiê/i })).toHaveAttribute("href", "#dossie");
      expect(screen.getByRole("link", { name: /Metodologia/i })).toHaveAttribute("href", "#metodologia");
      expect(screen.getByRole("link", { name: /FAQ/i })).toHaveAttribute("href", "#faq");
    });
  });
});
