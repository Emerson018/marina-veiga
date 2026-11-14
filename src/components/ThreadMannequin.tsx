"use client";

import { useEffect, useRef, useState } from "react";
import { THREAD_STROKES, THREAD_VIEWBOX } from "@/lib/thread/mannequin";
import { stepSpring } from "@/lib/thread/spring";

const THREAD_COLOR = "#D49FAB";
const LINE_WIDTH = 1.5;
const BASTE_DASH = [5, 5];
const SAMPLE_STEP = 3;
const DRAW_MS = 2600;
const DRAW_DELAY_MS = 350;
/** Frequência da mola: maior = o fio se acomoda mais rápido. */
const OMEGA = 11;
const PULL_RADIUS = 90;
const PULL_STRENGTH = 0.5;
const SWAY_STRENGTH = 1.1;
const MAX_SWAY_VELOCITY = 160;
const REST_EPSILON = 0.02;

/** Cada subcaminho ("M ...") vira um segmento desenhado separadamente. */
const SEGMENTS = THREAD_STROKES.flatMap((stroke, strokeIndex) =>
  stroke.d
    .split(/(?=M)/)
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => ({ d, strokeIndex }))
);

interface SampledSegment {
  strokeIndex: number;
  first: number;
  count: number;
  length: number;
  /** Comprimento acumulado dos segmentos anteriores do mesmo traço. */
  offsetInStroke: number;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function clamp01(n: number) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

export default function ThreadMannequin({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [mode, setMode] = useState<"pending" | "canvas" | "static">("pending");

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    if (!wrap || !canvas || !svg) return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
    const canSample =
      paths.length > 0 && typeof paths[0].getTotalLength === "function";
    const ctx = !reduceMotion && canSample ? canvas.getContext("2d") : null;

    if (!ctx) {
      setMode("static");
      return;
    }

    // Amostra os pontos de repouso a partir do próprio SVG de fallback.
    const segments: SampledSegment[] = [];
    const strokeLengths = new Array<number>(THREAD_STROKES.length).fill(0);
    const restX: number[] = [];
    const restY: number[] = [];
    paths.forEach((path, i) => {
      const { strokeIndex } = SEGMENTS[i];
      const length = path.getTotalLength();
      const count = Math.max(2, Math.ceil(length / SAMPLE_STEP) + 1);
      const first = restX.length;
      for (let p = 0; p < count; p++) {
        const point = path.getPointAtLength((p / (count - 1)) * length);
        restX.push(point.x);
        restY.push(point.y);
      }
      segments.push({
        strokeIndex,
        first,
        count,
        length,
        offsetInStroke: strokeLengths[strokeIndex],
      });
      strokeLengths[strokeIndex] += length;
    });

    const total = restX.length;
    const offX = new Float32Array(total);
    const offY = new Float32Array(total);
    const velX = new Float32Array(total);
    const velY = new Float32Array(total);
    const pullOf = new Float32Array(total);
    const swayOf = new Float32Array(total);
    for (const segment of segments) {
      const stroke = THREAD_STROKES[segment.strokeIndex];
      for (let p = segment.first; p < segment.first + segment.count; p++) {
        pullOf[p] = stroke.pull;
        const depth = restY[p] / THREAD_VIEWBOX.height;
        swayOf[p] = stroke.sway * depth * depth;
      }
    }

    // Posição do cursor na tela (cliente) e já convertida para a caixa do desenho.
    const pointer = { clientX: 0, clientY: 0, x: 0, y: 0, active: false, seen: false };
    const spring = { x: 0, v: 0 };
    let scale = 1;
    let dpr = 1;
    let elapsed = -DRAW_DELAY_MS;
    let last = 0;
    let raf = 0;
    let visible = false;
    let lastScrollY = window.scrollY;

    const draw = () => {
      const t = clamp01(elapsed / DRAW_MS);
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
      ctx.clearRect(0, 0, THREAD_VIEWBOX.width, THREAD_VIEWBOX.height);
      ctx.strokeStyle = THREAD_COLOR;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (const segment of segments) {
        const stroke = THREAD_STROKES[segment.strokeIndex];
        const strokeProgress = easeOutCubic(
          clamp01((t - stroke.start) / (stroke.end - stroke.start))
        );
        const drawn =
          strokeProgress * strokeLengths[segment.strokeIndex] -
          segment.offsetInStroke;
        if (drawn <= 0) continue;

        const reach = Math.min(drawn / segment.length, 1) * (segment.count - 1);
        const whole = Math.floor(reach);
        const { first } = segment;

        ctx.lineWidth = LINE_WIDTH * (stroke.weight ?? 1);
        ctx.globalAlpha = stroke.basted ? 0.8 : 1;
        ctx.setLineDash(stroke.basted ? BASTE_DASH : []);
        ctx.beginPath();
        ctx.moveTo(restX[first] + offX[first], restY[first] + offY[first]);
        for (let p = first + 1; p <= first + whole; p++) {
          ctx.lineTo(restX[p] + offX[p], restY[p] + offY[p]);
        }
        const frac = reach - whole;
        if (frac > 0 && whole < segment.count - 1) {
          const a = first + whole;
          const b = a + 1;
          const ax = restX[a] + offX[a];
          const ay = restY[a] + offY[a];
          ctx.lineTo(
            ax + (restX[b] + offX[b] - ax) * frac,
            ay + (restY[b] + offY[b] - ay) * frac
          );
        }
        ctx.stroke();
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt * 1000;

      let unrest = 0;
      for (let p = 0; p < total; p++) {
        let targetX = 0;
        let targetY = 0;
        if (pointer.active && pullOf[p] > 0) {
          const dx = pointer.x - restX[p];
          const dy = pointer.y - restY[p];
          const distance = Math.hypot(dx, dy);
          if (distance < PULL_RADIUS) {
            const falloff = 1 - distance / PULL_RADIUS;
            const force = falloff * falloff * PULL_STRENGTH * pullOf[p];
            targetX = dx * force;
            targetY = dy * force;
          }
        }

        spring.x = offX[p];
        spring.v = velX[p];
        stepSpring(spring, targetX, dt, OMEGA);
        offX[p] = spring.x;
        velX[p] = spring.v;
        unrest += Math.abs(spring.x - targetX) + Math.abs(spring.v) * 0.05;

        spring.x = offY[p];
        spring.v = velY[p];
        stepSpring(spring, targetY, dt, OMEGA);
        offY[p] = spring.x;
        velY[p] = spring.v;
        unrest += Math.abs(spring.x - targetY) + Math.abs(spring.v) * 0.05;
      }

      const settled = elapsed >= DRAW_MS && unrest <= REST_EPSILON * total;
      if (settled && !pointer.active) {
        // Assenta exatamente no repouso, sem resíduo de subpixel.
        offX.fill(0);
        offY.fill(0);
        velX.fill(0);
        velY.fill(0);
      }

      draw();

      // Parado: nada de trabalho no thread principal até o próximo estímulo.
      if (!settled) {
        raf = requestAnimationFrame(frame);
      }
    };

    const wake = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const width = wrap.clientWidth;
      if (!width) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      scale = width / THREAD_VIEWBOX.width;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(
        (width * dpr * THREAD_VIEWBOX.height) / THREAD_VIEWBOX.width
      );
      draw();
    };

    // O canvas se move sob um cursor parado quando a página rola, então a
    // posição relativa é recalculada tanto no movimento quanto na rolagem.
    const locatePointer = () => {
      if (!pointer.seen) return;
      const rect = canvas.getBoundingClientRect();
      const x = (pointer.clientX - rect.left) / scale;
      const y = (pointer.clientY - rect.top) / scale;
      const near =
        x > -PULL_RADIUS &&
        y > -PULL_RADIUS &&
        x < THREAD_VIEWBOX.width + PULL_RADIUS &&
        y < THREAD_VIEWBOX.height + PULL_RADIUS;
      if (!near && !pointer.active) return;
      pointer.x = x;
      pointer.y = y;
      pointer.active = near;
      wake();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      pointer.seen = true;
      locatePointer();
    };

    const onPointerGone = () => {
      pointer.seen = false;
      if (!pointer.active) return;
      pointer.active = false;
      wake();
    };

    const onScroll = () => {
      const delta = Math.max(-40, Math.min(40, window.scrollY - lastScrollY));
      lastScrollY = window.scrollY;
      locatePointer();
      if (!visible || delta === 0) return;
      for (let p = 0; p < total; p++) {
        if (swayOf[p] === 0) continue;
        const next = velX[p] + delta * SWAY_STRENGTH * swayOf[p];
        velX[p] = Math.max(-MAX_SWAY_VELOCITY, Math.min(MAX_SWAY_VELOCITY, next));
      }
      wake();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      wake();
    });
    intersectionObserver.observe(wrap);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerGone);
    window.addEventListener("blur", onPointerGone);
    document.addEventListener("visibilitychange", wake);

    resize();
    setMode("canvas");

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onPointerGone);
      window.removeEventListener("blur", onPointerGone);
      document.removeEventListener("visibilitychange", wake);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`relative aspect-[360/440] pointer-events-none select-none ${className}`}
    >
      {/* Desenho estático: serve de fallback (sem JS, movimento reduzido) e
          de molde de onde o canvas amostra os pontos do fio. */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${THREAD_VIEWBOX.width} ${THREAD_VIEWBOX.height}`}
        fill="none"
        stroke={THREAD_COLOR}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`thread-fallback absolute inset-0 w-full h-full ${
          mode === "static" ? "thread-fallback-on" : ""
        }`}
      >
        {SEGMENTS.map(({ d, strokeIndex }, i) => {
          const stroke = THREAD_STROKES[strokeIndex];
          return (
            <path
              key={i}
              d={d}
              strokeWidth={LINE_WIDTH * (stroke.weight ?? 1)}
              strokeDasharray={stroke.basted ? BASTE_DASH.join(" ") : undefined}
              opacity={stroke.basted ? 0.8 : 1}
            />
          );
        })}
      </svg>
      {/* Se o movimento reduzido for ligado depois, o CSS troca o canvas pelo desenho estático. */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full motion-reduce:hidden"
      />
    </div>
  );
}
