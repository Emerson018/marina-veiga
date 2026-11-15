import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CatalogGrid from "@/components/CatalogGrid";
import { SERVICES } from "@/data/services";

describe("Ticket 04: CatalogGrid and ServiceCard components", () => {
  it("renders all catalog services with titles, price, and installments", () => {
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

  it("switches active slide directly when clicking an adjacent catalog card", () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<CatalogGrid />);

    // Initially at index 0 (SERVICES[0].title)
    const firstTab = screen.getByRole("tab", { name: SERVICES[0].title });
    expect(firstTab).toHaveAttribute("aria-selected", "true");

    // Click on adjacent card (SERVICES[1]) directly to bring it to center
    const secondCard = document.getElementById(`service-card-${SERVICES[1].id}`);
    expect(secondCard).not.toBeNull();
    if (secondCard) fireEvent.click(secondCard);

    const secondTab = screen.getByRole("tab", { name: SERVICES[1].title });
    expect(secondTab).toHaveAttribute("aria-selected", "true");
    expect(firstTab).toHaveAttribute("aria-selected", "false");
  });

  it("does not render pagination dots below the stage", () => {
    render(<CatalogGrid />);
    expect(
      screen.queryByRole("tablist", { name: "Indicadores dos serviços do catálogo" })
    ).not.toBeInTheDocument();
  });

  it("offers corporate projects as a catalog card instead of a footer note", () => {
    render(<CatalogGrid />);
    expect(screen.getByRole("tab", { name: "Projetos Corporativos" })).toBeInTheDocument();
    expect(
      screen.queryByText("Necessita de um projeto corporativo sob medida?")
    ).not.toBeInTheDocument();
  });

  it("switches to next and previous slide via touch drag swipe gestures", () => {
    render(<CatalogGrid />);

    const gallery = screen.getByLabelText(
      "Galeria de serviços. Use as setas do teclado ou arraste para navegar."
    );

    // Initial state: SERVICES[0] is active
    expect(
      screen.getByRole("tab", { name: SERVICES[0].title })
    ).toHaveAttribute("aria-selected", "true");

    // Swipe left (drag finger left: deltaX = -80) -> nextSlide()
    fireEvent.touchStart(gallery, {
      touches: [{ clientX: 200, clientY: 100 }],
    });
    fireEvent.touchMove(gallery, {
      touches: [{ clientX: 120, clientY: 100 }],
    });
    fireEvent.touchEnd(gallery, {
      changedTouches: [{ clientX: 120, clientY: 100 }],
    });

    // Should now be on SERVICES[1]
    expect(
      screen.getByRole("tab", { name: SERVICES[1].title })
    ).toHaveAttribute("aria-selected", "true");

    // Swipe right (drag finger right: deltaX = +80) -> prevSlide()
    fireEvent.touchStart(gallery, {
      touches: [{ clientX: 100, clientY: 100 }],
    });
    fireEvent.touchMove(gallery, {
      touches: [{ clientX: 180, clientY: 100 }],
    });
    fireEvent.touchEnd(gallery, {
      changedTouches: [{ clientX: 180, clientY: 100 }],
    });

    // Should be back on SERVICES[0]
    expect(
      screen.getByRole("tab", { name: SERVICES[0].title })
    ).toHaveAttribute("aria-selected", "true");
  });
});
