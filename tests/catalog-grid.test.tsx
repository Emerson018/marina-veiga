import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CatalogGrid from "@/components/CatalogGrid";
import { SERVICES } from "@/data/services";

describe("Ticket 04: CatalogGrid and ServiceCard components", () => {
  it("renders all 5 consultation services with titles and price", () => {
    render(<CatalogGrid />);

    for (const service of SERVICES) {
      expect(
        screen.getByRole("heading", { name: new RegExp(service.title, "i") })
      ).toBeInTheDocument();
      expect(screen.getByText(service.price)).toBeInTheDocument();
    }
  });

  it("renders valid contextual WhatsApp links for each service", () => {
    render(<CatalogGrid />);

    for (const service of SERVICES) {
      const cta = screen.getByRole("link", {
        name: new RegExp(`Conversar no WhatsApp sobre ${service.title}`, "i"),
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
});
