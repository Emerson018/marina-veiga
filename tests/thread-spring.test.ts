import { describe, it, expect } from "vitest";
import { stepSpring } from "@/lib/thread/spring";

describe("Fio de Alinhavo: mola amortecida", () => {
  it("acomoda no destino sem ultrapassá-lo quando o fio é solto", () => {
    const s = { x: 1, v: 0 };
    let min = Infinity;
    for (let i = 0; i < 180; i++) {
      stepSpring(s, 0, 1 / 60, 11);
      min = Math.min(min, s.x);
    }
    expect(min).toBeGreaterThanOrEqual(0);
    expect(s.x).toBeLessThan(0.001);
    expect(Math.abs(s.v)).toBeLessThan(0.01);
  });

  it("volta ao repouso sem cruzar para o outro lado após um impulso", () => {
    const s = { x: 0, v: 50 };
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < 240; i++) {
      stepSpring(s, 0, 1 / 60, 11);
      min = Math.min(min, s.x);
      max = Math.max(max, s.x);
    }
    expect(max).toBeGreaterThan(1);
    expect(min).toBeGreaterThanOrEqual(0);
    expect(s.x).toBeLessThan(0.001);
  });

  it("continua estável com um quadro muito longo", () => {
    const s = { x: 1, v: 0 };
    stepSpring(s, 0, 1, 11);
    expect(s.x).toBeGreaterThanOrEqual(0);
    expect(s.x).toBeLessThan(0.01);
  });
});
