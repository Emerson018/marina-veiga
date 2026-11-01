import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("scrolls to center the catalog stage when a card is clicked", () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<CatalogGrid />);
    const cardTitle = screen.getByRole("heading", { name: SERVICES[0].title });
    fireEvent.click(cardTitle);

    expect(scrollToMock).toHaveBeenCalledWith(
      expect.objectContaining({
        behavior: "smooth",
      })
    );
  });
});
