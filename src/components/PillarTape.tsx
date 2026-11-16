"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { SPRING_SETTLE } from "@/lib/motion";

export interface Pillar {
  title: string;
  description: string;
}

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Tempo que o alfinete leva de um princípio ao próximo na primeira leitura. */
const STEP_MS = 620;

/**
 * Fita Métrica: os princípios são lidos ao longo de uma fita de costura.
 * Um alfinete desce pela fita e "marca" cada princípio, como numa prova de
 * roupa. Depois da primeira passagem, o alfinete acompanha o cursor.
 */
export default function PillarTape({ pillars }: { pillars: Pillar[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const titleRefs = useRef<(HTMLElement | null)[]>([]);
  const inView = useInView(listRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();

  const [reached, setReached] = useState(-1);
  const [active, setActive] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);

  // Posição vertical do centro de cada título, para o alfinete parar ali.
  useIsoLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    // getBoundingClientRect: as linhas usam transform, então offsetTop
    // seria relativo a elas e não à lista. O deslocamento é só horizontal.
    const measure = () => {
      const listTop = list.getBoundingClientRect().top;
      setOffsets(
        titleRefs.current.map((el) => {
          if (!el) return 0;
          const r = el.getBoundingClientRect();
          return r.top - listTop + r.height / 2;
        })
      );
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  // Primeira passagem: o alfinete visita cada princípio, uma única vez.
  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setReached(pillars.length - 1);
      return;
    }
    const timers = pillars.map((_, i) =>
      window.setTimeout(() => {
        setReached(i);
        setActive(i);
      }, 180 + i * STEP_MS)
    );
    return () => timers.forEach(window.clearTimeout);
  }, [inView, reduceMotion, pillars]);

  const settled = reached >= pillars.length - 1;
  const pinY = offsets[active] ?? 0;

  return (
    <div className="relative w-full pl-7 sm:pl-9">
      {/* A fita: trilho fino com marcações de centímetro e meio centímetro. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-2 sm:left-3 top-0 bottom-0 w-3 transition-opacity duration-700 motion-reduce:transition-none ${
          inView ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="absolute left-0 top-0 bottom-0 w-px bg-rose-antique/35" />
        <span className="absolute left-0 top-0 bottom-0 w-1.5 tape-ticks-minor" />
        <span className="absolute left-0 top-0 bottom-0 w-3 tape-ticks-major" />
      </div>

      {/* O alfinete: cabeça rosada e haste curta cruzando a fita. */}
      <m.span
        aria-hidden="true"
        className="pointer-events-none absolute left-2 sm:left-3 top-0 z-10 -translate-x-1/2"
        initial={false}
        animate={{
          y: pinY,
          opacity: reached >= 0 ? 1 : 0,
        }}
        transition={reduceMotion ? { duration: 0 } : SPRING_SETTLE}
      >
        <span className="relative -top-[5px] flex items-center">
          <span className="block h-2.5 w-2.5 rounded-full bg-rose-antique shadow-[0_0_0_3px_rgba(26,43,32,0.9)]" />
          <span className="block h-px w-2.5 sm:w-3 bg-rose-antique/80" />
        </span>
      </m.span>

      <ol
        ref={listRef}
        className="relative"
        onMouseLeave={() => settled && setActive(pillars.length - 1)}
      >
        {pillars.map((pillar, i) => {
          const isReached = i <= reached;
          const isActive = settled ? i === active : i === reached;
          return (
            <li
              key={pillar.title}
              onMouseEnter={() => settled && setActive(i)}
              className="border-t border-rose-border/50 first:border-t-0 py-2 sm:py-2.5 first:pt-0.5"
            >
              <div
                className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  isReached
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                }`}
              >
                <h3
                  ref={(el) => {
                    titleRefs.current[i] = el;
                  }}
                  className={`font-display text-base sm:text-lg text-rose-antique tracking-wide leading-snug transition-opacity duration-500 motion-reduce:transition-none ${
                    isActive || !settled ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {pillar.title}
                </h3>
                <p className="mt-0.5 text-xs sm:text-[13px] text-rose-light/75 font-light leading-relaxed max-w-xl">
                  {pillar.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
