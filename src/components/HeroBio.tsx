"use client";

import { m } from "framer-motion";
import { EASE_SILK, revealItem } from "@/lib/motion";

export default function HeroBio() {
  return (
    <m.div
      data-reveal
      variants={revealItem}
      className="relative pl-4 sm:pl-5 my-4 sm:my-5 max-w-xl"
    >
      {/* Linha de acento que se desenha de cima para baixo */}
      <m.div
        data-reveal
        variants={{
          hidden: { scaleY: 0 },
          visible: { scaleY: 1, transition: { duration: 0.9, ease: EASE_SILK } },
        }}
        className="absolute left-0 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-rose-antique via-rose-antique/40 to-transparent"
        aria-hidden="true"
      />

      <p className="text-sm sm:text-[15px] text-rose-light/90 font-light leading-relaxed">
        Eu parto das suas peças, do seu corpo e da sua rotina para montar um
        estilo que funciona no trabalho, no fim de semana, nos eventos e nas
        viagens.
      </p>
      <p className="mt-2 text-sm sm:text-[15px] text-rose-light font-normal leading-relaxed">
        E te entrego um mapa para{" "}
        <em className="text-rose-antique font-medium underline decoration-rose-antique/40 underline-offset-4">
          decidir sozinha
        </em>{" "}
        depois.
      </p>
    </m.div>
  );
}
