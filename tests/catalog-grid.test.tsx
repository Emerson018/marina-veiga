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

  it("displays service numbers on all cards without 'Nº' prefix", () => {
    render(<CatalogGrid />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("04")).toBeInTheDocument();
    expect(screen.getByText("05")).toBeInTheDocument();
    expect(screen.getByText("06")).toBeInTheDocument();
    expect(screen.queryByText("Nº 01")).not.toBeInTheDocument();
  });

  it("renders category tabs above the cards and switches active card on tab click", () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<CatalogGrid />);

    // Verify all category tabs are rendered in the tablist
    for (const service of SERVICES) {
      const tab = screen.getByRole("tab", { name: service.title });
      expect(tab).toBeInTheDocument();
    }

    // Tab for first service should be selected initially
    const firstTab = screen.getByRole("tab", { name: SERVICES[0].title });
    expect(firstTab).toHaveAttribute("aria-selected", "true");

    // Click another category tab (e.g. Consultoria 360°)
    const targetService = SERVICES[4]; // Consultoria 360°
    const targetTab = screen.getByRole("tab", { name: targetService.title });
    fireEvent.click(targetTab);

    // Target tab should now be selected
    expect(targetTab).toHaveAttribute("aria-selected", "true");
    expect(firstTab).toHaveAttribute("aria-selected", "false");
    expect(scrollToMock).toHaveBeenCalled();
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
