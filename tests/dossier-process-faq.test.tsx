import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DossierShowcase from "@/components/DossierShowcase";
import ProcessSteps from "@/components/ProcessSteps";
import FaqSection from "@/components/FaqSection";

describe("Ticket 05: DossierShowcase, ProcessSteps, and FaqSection components", () => {
  describe("DossierShowcase", () => {
    it("renders the dossier showcase with key features and CTA", () => {
      render(<DossierShowcase />);
      expect(
        screen.getByRole("heading", { name: /O Dossiê de Estilo/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/Cápsula Executiva/i)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Quero Meu Dossiê/i })).toBeInTheDocument();
    });
  });

  describe("ProcessSteps", () => {
    it("renders the 3 sequential methodology steps", () => {
      render(<ProcessSteps />);
      expect(
        screen.getByRole("heading", { name: /Como Funciona a Consultoria/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/01. Diagnóstico & Alinhamento/i)).toBeInTheDocument();
      expect(screen.getByText(/02. Encontros Práticos/i)).toBeInTheDocument();
      expect(screen.getByText(/03. Entrega do Dossiê/i)).toBeInTheDocument();
    });
  });

  describe("FaqSection", () => {
    it("renders questions and handles accordion open/close with accessible attributes", () => {
      render(<FaqSection />);
      expect(screen.getByRole("heading", { name: /Tire Suas Dúvidas/i })).toBeInTheDocument();

      const firstQuestionButton = screen.getByRole("button", {
        name: /Como funciona o atendimento híbrido/i,
      });
      expect(firstQuestionButton).toHaveAttribute("aria-expanded", "false");

      // Click to open
      fireEvent.click(firstQuestionButton);
      expect(firstQuestionButton).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText(/As etapas analíticas ocorrem online/i)).toBeInTheDocument();

      // Click again to close
      fireEvent.click(firstQuestionButton);
      expect(firstQuestionButton).toHaveAttribute("aria-expanded", "false");
    });
  });
});
