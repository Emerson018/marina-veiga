import { describe, it, expect } from "vitest";
import { generateWhatsAppUrl, DEFAULT_WHATSAPP_NUMBER } from "@/utils/whatsapp";
import { SERVICES } from "@/data/services";

describe("Ticket 02: WhatsApp Utility and Services Data", () => {
  it("generates a clean wa.me URL with default phone and encoded message", () => {
    const message = "Olá! Gostaria de saber mais sobre a Consultoria.";
    const url = generateWhatsAppUrl(message);

    expect(url).toBe(
      `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    );
  });

  it("allows custom phone numbers and cleans non-digit characters", () => {
    const rawPhone = "+55 (11) 98765-4321";
    const message = "Informações sobre agendamento";
    const url = generateWhatsAppUrl(message, rawPhone);

    expect(url).toBe(
      `https://wa.me/5511987654321?text=${encodeURIComponent(message)}`
    );
  });

  it("handles empty or undefined message gracefully", () => {
    const url = generateWhatsAppUrl();
    expect(url).toBe(`https://wa.me/${DEFAULT_WHATSAPP_NUMBER}`);
  });

  it("contains exactly 5 consultation services with all required fields", () => {
    expect(SERVICES).toHaveLength(5);

    for (const service of SERVICES) {
      expect(service.id).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.tagline).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.deliverables.length).toBeGreaterThan(0);
      expect(service.price).toMatch(/^R\$\s?[\d.,]+/);
      expect(service.paymentTerms).toBeTruthy();
      expect(service.whatsappMessage).toBeTruthy();

      const serviceUrl = generateWhatsAppUrl(service.whatsappMessage);
      expect(serviceUrl).toContain(encodeURIComponent(service.whatsappMessage));
    }
  });

  it("includes the 5 canonical services matching domain glossary", () => {
    const titles = SERVICES.map((s) => s.title);
    expect(titles).toContain("Análise de Estilo & Biótipo");
    expect(titles).toContain("Revitalização de Guarda-Roupa");
    expect(titles).toContain("Personal Shopper");
    expect(titles).toContain("Consultoria Completa 360°");
    expect(titles).toContain("Dossiê de Estilo Exclusivo");
  });
});
