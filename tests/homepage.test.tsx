import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage Full Integration", () => {
  it("renders all sections from header down through footer and floating whatsapp", () => {
    render(<HomePage />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Elegância Estratégica & Autoridade Feminina/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /A imagem não é sobre aparência/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Serviços & Experiências de Imagem/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { name: /Dossiê de Estilo/i }).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("heading", { name: /Como Funciona a Consultoria/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Tire Suas Dúvidas/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Atendimento flutuante com Mariana Veiga no WhatsApp/i })
    ).toBeInTheDocument();
  });
});
