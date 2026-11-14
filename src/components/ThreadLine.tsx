"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform } from "framer-motion";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

interface ThreadLineProps {
  orientation: "horizontal" | "vertical";
  /** Trecho da rolagem em que o fio é costurado (formato do `useScroll`). */
  offset: ScrollOffset;
  className?: string;
}

const STITCH = "rgb(212 159 171 / 0.7) 0 6px, transparent 6px 12px";

/**
 * Fio de Alinhavo em versão discreta: um pontilhado que é costurado
 * conforme a rolagem. A revelação usa só `transform` (duas translações
 * opostas), para não esticar os pontos nem animar propriedades de layout.
 */
export default function ThreadLine({
  orientation,
  offset,
  className = "",
}: ThreadLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  // A janela desliza para dentro enquanto o pontilhado desliza o mesmo
  // tanto para fora: o fio fica parado e só a parte costurada aparece.
  const windowShift = useTransform(progress, (value) => `${(value - 1) * 100}%`);
  const stitchShift = useTransform(progress, (value) => `${(1 - value) * 100}%`);

  const horizontal = orientation === "horizontal";
  const stitches = {
    backgroundImage: `repeating-linear-gradient(${
      horizontal ? "90deg" : "180deg"
    }, ${STITCH})`,
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`overflow-hidden pointer-events-none ${className}`}
    >
      {/* Com movimento reduzido, o CSS zera as translações e o fio aparece inteiro. */}
      <m.div
        data-reveal
        className="w-full h-full motion-reduce:!transform-none"
        style={horizontal ? { x: windowShift } : { y: windowShift }}
      >
        <m.div
          data-reveal
          className="w-full h-full motion-reduce:!transform-none"
          style={{
            ...stitches,
            ...(horizontal ? { x: stitchShift } : { y: stitchShift }),
          }}
        />
      </m.div>
    </div>
  );
}
