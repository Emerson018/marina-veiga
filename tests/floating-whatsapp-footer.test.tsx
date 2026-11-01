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

    it("opens and closes institutional policy modals for terms and privacy", async () => {
      const { fireEvent } = await import("@testing-library/react");
      render(<Footer />);

      const termsButton = screen.getByRole("button", { name: /Termos & Condições/i });
      const privacyButton = screen.getByRole("button", { name: /Privacidade & Sigilo/i });

      expect(termsButton).toBeInTheDocument();
      expect(privacyButton).toBeInTheDocument();

      // Open Terms modal
      fireEvent.click(termsButton);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText(/Diretrizes de agendamento, atendimento e propriedade intelectual/i)).toBeInTheDocument();
      expect(screen.getByText(/Política de Reagendamento \(48h Úteis\)/i)).toBeInTheDocument();

      // Close modal
      const closeButton = screen.getByRole("button", { name: /Fechar janela de políticas/i });
      fireEvent.click(closeButton);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

      // Open Privacy modal
      fireEvent.click(privacyButton);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText(/Compromisso de confidencialidade estrita e conformidade com a LGPD/i)).toBeInTheDocument();
      expect(screen.getByText(/Cláusula de Sigilo Absoluto/i)).toBeInTheDocument();
    });
  });
});
