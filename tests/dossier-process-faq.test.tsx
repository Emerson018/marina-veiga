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
        screen.getByRole("heading", { name: /Dossiê de Estilo/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/Mapa de Looks/i)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Quero Meu Dossiê/i })).toBeInTheDocument();
    });

    it("allows pausing and unpausing animations on stage click and toggle button", () => {
      render(<DossierShowcase />);
      const stage = screen.getByRole("button", { name: /Apresentação em reprodução/i });
      const pauseBtn = screen.getByRole("button", { name: /Pausar apresentação/i });

      // Click to pause
      fireEvent.click(stage);
      expect(screen.getByText(/Pausado • Clique para continuar/i)).toBeInTheDocument();
      expect(stage).toHaveClass("is-paused");
      expect(screen.getByRole("button", { name: /Continuar apresentação/i })).toBeInTheDocument();

      // Click to unpause via pauseBtn
      const playBtn = screen.getByRole("button", { name: /Continuar apresentação/i });
      fireEvent.click(playBtn);
      expect(screen.queryByText(/Pausado • Clique para continuar/i)).not.toBeInTheDocument();
      expect(stage).not.toHaveClass("is-paused");
    });
  });

  describe("ProcessSteps", () => {
    it("renders the 3 sequential methodology steps and allows interactive stage switching and pause/resume", () => {
      render(<ProcessSteps />);
      expect(
        screen.getByRole("heading", { name: /Como Funciona a Consultoria/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/Diagnóstico & Alinhamento/i)).toBeInTheDocument();
      expect(screen.getByText(/Encontros Práticos/i)).toBeInTheDocument();
      expect(screen.getByText(/Entrega do Dossiê/i)).toBeInTheDocument();

      // Step 1 tab starts selected
      const step1Tab = screen.getByRole("tab", { name: /Etapa 01: Diagnóstico & Alinhamento/i });
      const step2Tab = screen.getByRole("tab", { name: /Etapa 02: Encontros Práticos & Intervenção/i });
      expect(step1Tab).toHaveAttribute("aria-selected", "true");
      expect(step2Tab).toHaveAttribute("aria-selected", "false");

      // Click Step 2 tab to focus stage 2
      fireEvent.click(step2Tab);
      expect(step2Tab).toHaveAttribute("aria-selected", "true");
      expect(step1Tab).toHaveAttribute("aria-selected", "false");

      // Pause and resume cadence
      const pauseBtn = screen.getByRole("button", { name: /Pausar animação automática das etapas/i });
      fireEvent.click(pauseBtn);
      const resumeBtn = screen.getByRole("button", { name: /Continuar animação automática das etapas/i });
      expect(resumeBtn).toBeInTheDocument();
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
