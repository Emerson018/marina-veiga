import type { Transition, Variants } from "framer-motion";

/** Curva de seda da Fluidez Editorial (ADR-0004). */
export const EASE_SILK = [0.22, 1, 0.36, 1] as const;

/** Mola criticamente amortecida: responde com peso, acomoda sem quique. */
export const SPRING_SETTLE: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 42,
  mass: 1,
};

/** Microinteração de botões e links de ação. */
export const pressable = {
  whileHover: { y: -2 },
  whileTap: { y: 0, scale: 0.98 },
  transition: SPRING_SETTLE,
} as const;

export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;

/** Revelação Sequencial: contêiner que cadencia os filhos. */
export function staggerContainer(stagger = 0.1, delay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SILK },
  },
};
