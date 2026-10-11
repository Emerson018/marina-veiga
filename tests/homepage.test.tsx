import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("Ticket 01: Setup & Initial Page", () => {
  it("renders the primary brand heading and subtitle", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /Elegância & Estratégia de Imagem/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Mariana Veiga Consultoria/i)).toBeInTheDocument();
  });
});
