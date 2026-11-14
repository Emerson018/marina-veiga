import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutManifesto from "@/components/AboutManifesto";

describe("Ticket 03: Header, Hero, and AboutManifesto components", () => {
  describe("Header", () => {
    it("renders the brand logo and navigation links", () => {
      render(<Header />);
      expect(
        screen.getByRole("link", { name: /Mariana Veiga Consultoria - Início/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Catálogo/i })).toHaveAttribute("href", "#catalogo");
      expect(screen.getByRole("link", { name: /Sobre/i })).toHaveAttribute("href", "#sobre");
      expect(screen.getByRole("link", { name: /FAQ/i })).toHaveAttribute("href", "#faq");
    });

    it("toggles mobile menu accessibility correctly", () => {
      render(<Header />);
      const menuButton = screen.getByRole("button", { name: /abrir menu/i });
      expect(menuButton).toHaveAttribute("aria-expanded", "false");

      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("Hero", () => {
    it("renders editorial title, value proposition, and CTA buttons", () => {
      render(<Hero />);
      expect(
        screen.getByRole("heading", { name: /Elegância que nasce do que você já tem/i })
      ).toBeInTheDocument();

      const ctaCatalog = screen.getByRole("link", { name: /Conhecer os Serviços/i });
      expect(ctaCatalog).toHaveAttribute("href", "#catalogo");

      const ctaWhatsApp = screen.getByRole("link", { name: /Falar no WhatsApp/i });
      expect(ctaWhatsApp).toHaveAttribute("href", expect.stringContaining("wa.me"));
    });

    it("destaca a proposta de valor e ambição feminina no hero bio", () => {
      render(<Hero />);
      expect(
        screen.getByText((_, el) => el?.tagName.toLowerCase() === "p" && (el?.textContent?.includes("vestir sua ambição") ?? false))
      ).toBeInTheDocument();
      expect(
        screen.getByText((_, el) => el?.tagName.toLowerCase() === "p" && (el?.textContent?.includes("mulheres que lideram") ?? false))
      ).toBeInTheDocument();
    });

    it("apresenta o Fio de Alinhavo como elemento decorativo, sem foto", () => {
      const { container } = render(<Hero />);
      expect(screen.queryByRole("img")).toBeNull();
      const canvas = container.querySelector("canvas");
      expect(canvas).not.toBeNull();
      expect(canvas?.closest("[aria-hidden='true']")).not.toBeNull();
    });
  });

  describe("AboutManifesto", () => {
    it("renders the authority manifesto and strategic pillars", () => {
      render(<AboutManifesto />);
      expect(
        screen.getByRole("heading", { name: /A imagem não é sobre aparência/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/Estilo para a Vida Real/i)).toBeInTheDocument();
      expect(screen.getByText(/Quiet Luxury/i)).toBeInTheDocument();
      expect(screen.getByText(/Autonomia Perpétua/i)).toBeInTheDocument();
    });
  });
});
