import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage Integration", () => {
  it("renders header, hero section, about manifesto, and catalog", () => {
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
  });
});
