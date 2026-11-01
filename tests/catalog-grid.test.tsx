import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CatalogGrid from "@/components/CatalogGrid";
import { SERVICES } from "@/data/services";

describe("Ticket 04: CatalogGrid and ServiceCard components", () => {
  it("renders all 6 consultation services with titles, price, and installments", () => {
    render(<CatalogGrid />);

    for (const service of SERVICES) {
      expect(
        screen.getByRole("heading", { name: service.title })
      ).toBeInTheDocument();
      expect(screen.getAllByText(service.price).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(service.installments).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders valid contextual WhatsApp links for each service", () => {
    render(<CatalogGrid />);

    for (const service of SERVICES) {
      const cta = screen.getByRole("link", {
        name: `Conversar no WhatsApp sobre ${service.title}`,
      });
      expect(cta).toBeInTheDocument();
      expect(cta).toHaveAttribute("target", "_blank");
      expect(cta).toHaveAttribute("rel", "noopener noreferrer");
      expect(cta.getAttribute("href")).toContain(
        encodeURIComponent(service.whatsappMessage)
      );
    }
  });

  it("highlights the featured 360 consultation package", () => {
    render(<CatalogGrid />);
    expect(screen.getByText(/Experiência Integral/i)).toBeInTheDocument();
  });

  it("renders deliverables within disclosure container for each service", () => {
    render(<CatalogGrid />);

    for (const service of SERVICES) {
      expect(screen.getByText(service.deliverables[0])).toBeInTheDocument();
    }
  });

  it("allows switching between grid and carousel view modes", async () => {
    const { fireEvent } = await import("@testing-library/react");
    render(<CatalogGrid />);

    const spotlightButton = screen.getByRole("button", { name: /Modo Destaque/i });
    expect(spotlightButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(spotlightButton);
    expect(spotlightButton).toHaveAttribute("aria-pressed", "true");

    const gridButton = screen.getByRole("button", { name: /Grade Completa/i });
    fireEvent.click(gridButton);
    expect(gridButton).toHaveAttribute("aria-pressed", "true");
  });
});
