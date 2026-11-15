"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import { m } from "framer-motion";
import { VIEWPORT_ONCE, revealItem } from "@/lib/motion";

const SCENE_DURATIONS = [5000, 5000, 5000, 5000, 5000, 5000];

export default function DossierShowcase() {
  const [currentScene, setCurrentScene] = useState(0);
  const [progressWidths, setProgressWidths] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const currentSceneRef = useRef(0);
  const isPausedRef = useRef(false);
  const t0Ref = useRef(0);
  const elapsedRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const whatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Gostaria de encomendar o meu Dossiê de Estilo."
  );

  const togglePause = () => {
    setIsPaused((prev) => {
      const next = !prev;
      isPausedRef.current = next;
      if (!next) {
        // Resuming: adjust t0Ref so elapsed continues seamlessly from paused position
        t0Ref.current = performance.now() - elapsedRef.current;
      }
      return next;
    });
  };

  const goToScene = (index: number) => {
    const nextIdx = index % SCENE_DURATIONS.length;
    currentSceneRef.current = nextIdx;
    setCurrentScene(nextIdx);
    elapsedRef.current = 0;
    t0Ref.current = performance.now();
    setProgressWidths((prev) =>
      prev.map((_, k) => (k < nextIdx ? 100 : 0))
    );
  };

  const handleSegmentClick = (index: number) => {
    if (index === currentScene) {
      togglePause();
    } else {
      goToScene(index);
    }
  };

  useEffect(() => {
    currentSceneRef.current = 0;
    t0Ref.current = performance.now();
    elapsedRef.current = 0;

    const tick = (now: number) => {
      if (!isPausedRef.current) {
        const cur = currentSceneRef.current;
        const dur = SCENE_DURATIONS[cur];
        const elapsed = now - t0Ref.current;
        elapsedRef.current = elapsed;

        if (elapsed >= dur) {
          const next = (cur + 1) % SCENE_DURATIONS.length;
          currentSceneRef.current = next;
          setCurrentScene(next);
          elapsedRef.current = 0;
          t0Ref.current = performance.now();
          setProgressWidths((prev) =>
            prev.map((_, k) => (k < next ? 100 : 0))
          );
        } else {
          const percent = Math.min(100, (elapsed / dur) * 100);
          setProgressWidths((prev) => {
            const copy = [...prev];
            copy[cur] = percent;
            return copy;
          });
        }
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      id="dossie"
      aria-label="Dossiê de Estilo em Movimento"
      className="scroll-mt-4 sm:scroll-mt-0 py-3 sm:py-4 border-b border-rose-border/40 relative overflow-hidden bg-forest-deep/60 min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center w-full px-2 sm:px-4 lg:px-6"
    >
      <m.div
        data-reveal
        variants={revealItem}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="w-full flex flex-col items-center justify-center"
      >
        {/* Video / Interactive Stage */}
        <div
          className={`dossier-stage cursor-pointer select-none relative ${isPaused ? "is-paused" : ""}`}
          id="dossier-stage"
          aria-live="polite"
          role="button"
          tabIndex={0}
          aria-label={
            isPaused
              ? "Apresentação pausada. Clique ou pressione Enter para continuar"
              : "Apresentação em reprodução. Clique ou pressione Enter para pausar"
          }
          title={isPaused ? "Clique para continuar a animação" : "Clique para pausar a animação"}
          onClick={togglePause}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              togglePause();
            }
          }}
        >
          {/* Pause Status Indicator Badge */}
          {isPaused && (
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-deep/90 backdrop-blur-md border border-rose-antique/50 text-rose-light text-xs font-sans tracking-wide shadow-lg pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-rose-antique animate-pulse" />
              <span>Pausado • Clique para continuar</span>
            </div>
          )}

          {/* Scene 0: Intro */}
          <section className={`dossier-scene center ${currentScene === 0 ? "on" : ""}`}>
            <div className="dossier-t">
              <h1>Dossiê de Estilo</h1>
              <p>
                Seu mapa perpétuo. A consultoria não termina na sessão: ela continua com você, com autonomia para se vestir bem todos os dias.
              </p>
            </div>
          </section>

          {/* Scene 1: Pilar 1 - Mapa de Looks */}
          <section className={`dossier-scene ${currentScene === 1 ? "on" : ""}`}>
            <div className="dossier-t">
              <div className="dossier-num">Pilar 1</div>
              <h2>Mapa de Looks</h2>
              <p>
                As combinações feitas com as suas peças, fotografadas e organizadas por ocasião. Você abre o armário e já sabe o que vestir.
              </p>
            </div>
            <svg viewBox="0 0 400 260" aria-hidden="true">
              {/* Trabalho: Blazer de Alfaiataria Estruturado */}
              <g className="dossier-pop">
                <rect x="10" y="20" width="110" height="170" rx="6" />
                <path d="M45 62h40l12 22v68H33V84z" />
                <path d="M57 62l8 30 8-30" />
                <text x="65" y="215">Trabalho</text>
              </g>
              {/* Lazer: Look Descontraído e Fluido */}
              <g className="dossier-pop">
                <rect x="145" y="20" width="110" height="170" rx="6" />
                <path d="M180 62h40l10 24-14 8v60h-32V94l-14-8z" />
                <path d="M188 62c4 8 20 8 24 0" />
                <text x="200" y="215">Lazer</text>
              </g>
              {/* Eventos: Vestido de Festa Elegante e Fluido */}
              <g className="dossier-pop">
                <rect x="280" y="20" width="110" height="170" rx="6" />
                {/* Cabide sutil */}
                <path d="M335 50c-3 0-5 2-5 5 0 4 5 5 5 8" />
                <path d="M322 66l13-4 13 4" />
                {/* Silhueta do Vestido: decote delicado, cintura marcada e caimento amplo */}
                <path d="M325 72c1 10 2 19 3 28c-7 20-17 40-19 62 17 4 35 4 52 0-2-22-12-42-19-62 1-9 2-18 3-28" />
                <path d="M325 72c3 8 7 11 10 11s7-3 10-11" />
                <path d="M328 100h14" />
                <path d="M335 100c1 18 0 40-1 62" />
                <text x="335" y="215">Eventos</text>
              </g>
            </svg>
          </section>

          {/* Scene 2: Pilar 2 - Roteiros de Mala */}
          <section className={`dossier-scene ${currentScene === 2 ? "on" : ""}`}>
            <div className="dossier-t">
              <div className="dossier-num">Pilar 2</div>
              <h2>Roteiros de Mala</h2>
              <p>
                Seleções enxutas para viagens: poucas peças e muitas combinações. Você faz a mala com segurança, sem excesso.
              </p>
            </div>
            <svg viewBox="0 0 400 260" aria-hidden="true">
              {/* Mala de viagem estruturada com puxador telescópico */}
              <rect className="dossier-draw" x="70" y="115" width="260" height="115" rx="12" />
              <path className="dossier-draw" d="M175 115V82h50v33" />
              <path className="dossier-draw" d="M183 82h34" />
              <path className="dossier-draw" d="M70 172h260" strokeDasharray="4 4" opacity="0.6" />

              {/* Peça 1 na Mala: Trabalho (alfaiataria compacta) */}
              <g className="dossier-pop">
                <rect x="85" y="125" width="68" height="92" rx="6" opacity="0.5" />
                <path d="M104 140h30l9 16v48h-48v-48z" />
                <path d="M113 140l6 20 6-20" />
                <circle className="fill" cx="119" cy="125" r="3.5" />
                <path d="M119 125C119 85 80 80 80 48" strokeDasharray="3 3" />
                <text x="80" y="38">Trabalho</text>
              </g>

              {/* Peça 2 na Mala: Lazer (look casual descontraído) */}
              <g className="dossier-pop">
                <rect x="166" y="125" width="68" height="92" rx="6" opacity="0.5" />
                <path d="M185 140h30l8 18-10 6v42h-26v-42l-10-6z" />
                <path d="M191 140c3 6 15 6 18 0" />
                <circle className="fill" cx="200" cy="125" r="3.5" />
                <path d="M200 125V42" strokeDasharray="3 3" />
                <text x="200" y="30">Lazer</text>
              </g>

              {/* Peça 3 na Mala: Eventos (vestido de festa dobrado/organizado) */}
              <g className="dossier-pop">
                <rect x="247" y="125" width="68" height="92" rx="6" opacity="0.5" />
                <path d="M276 138l5-3 5 3" />
                <path d="M272 143c1 7 2 14 2 20c-5 11-10 23-12 37 11 3 23 3 34 0-2-14-7-26-12-37 0-6 1-13 2-20" />
                <path d="M272 143c2 5 5 7 9 7s7-2 9-7" />
                <path d="M274 163h14" />
                <circle className="fill" cx="281" cy="125" r="3.5" />
                <path d="M281 125C281 85 320 80 320 48" strokeDasharray="3 3" />
                <text x="320" y="38">Eventos</text>
              </g>
            </svg>
          </section>

          {/* Scene 3: Pilar 3 - Silhueta & Proporções */}
          <section className={`dossier-scene ${currentScene === 3 ? "on" : ""}`}>
            <div className="dossier-t">
              <div className="dossier-num">Pilar 3</div>
              <h2>Silhueta &amp; Proporções</h2>
              <p>
                Cortes, caimentos e comprimentos que valorizam o seu corpo e a sua postura, aplicados aos looks do seu mapa.
              </p>
            </div>
            <svg viewBox="0 0 400 260" aria-hidden="true">
              <path
                className="dossier-draw"
                d="M200 20a22 22 0 1 0 .1 0M170 70q30-12 60 0l14 80-14 8 8 90h-76l8-90-14-8z"
              />
              <g className="dossier-pop">
                <path d="M110 70h180M120 132h160M130 200h140" strokeDasharray="5 6" />
              </g>
              <text x="75" y="74">ombros</text>
              <text x="85" y="136">cintura</text>
              <text x="95" y="204">quadril</text>
            </svg>
          </section>

          {/* Scene 4: Pilar 4 - Digital & Impresso */}
          <section className={`dossier-scene ${currentScene === 4 ? "on" : ""}`}>
            <div className="dossier-t">
              <div className="dossier-num">Pilar 4</div>
              <h2>Digital &amp; Impresso</h2>
              <p>
                Acesso permanente no celular, em alta resolução. Se preferir, a versão impressa e encadernada sai sob solicitação.
              </p>
            </div>
            <svg viewBox="0 0 400 260" aria-hidden="true">
              <g className="dossier-pop">
                <rect x="60" y="30" width="110" height="200" rx="14" />
                <rect x="74" y="52" width="82" height="100" rx="4" />
                <path d="M74 172h82M74 188h54" />
              </g>
              <g className="dossier-pop">
                <path d="M220 60h90a8 8 0 0 1 8 8v150h-98a8 8 0 0 1-8-8V68a8 8 0 0 1 8-8z" />
                <path d="M232 90h66M232 110h66M232 130h40" />
              </g>
            </svg>
          </section>

          {/* Scene 5: Finale */}
          <section className={`dossier-scene center ${currentScene === 5 ? "on" : ""}`}>
            <div className="dossier-t">
              <h2>
                Para nunca mais ficar em dúvida <em>diante do espelho</em>
              </h2>
            </div>
          </section>
        </div>

        {/* Video Control Bar + Compact CTA */}
        <div className="dossier-bar flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={togglePause}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-rose-border/60 text-rose-antique hover:bg-rose-antique/10 hover:border-rose-antique transition-colors focus-visible:outline-rose-antique shrink-0"
            aria-label={isPaused ? "Continuar apresentação" : "Pausar apresentação"}
            title={isPaused ? "Continuar apresentação" : "Pausar apresentação"}
          >
            {isPaused ? (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" aria-hidden="true" />
            ) : (
              <Pause className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
            )}
          </button>

          {/* Interactive Progress Segments */}
          <div className="dossier-prog min-w-[100px] flex-1" role="tablist" aria-label="Etapas da apresentação">
            {SCENE_DURATIONS.map((_, idx) => (
              <div
                key={idx}
                role="tab"
                tabIndex={0}
                aria-selected={currentScene === idx}
                aria-label={`Ir para a cena ${idx + 1}${currentScene === idx ? (isPaused ? " (pausada, clique para continuar)" : " (em reprodução, clique para pausar)") : ""}`}
                onClick={() => handleSegmentClick(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSegmentClick(idx);
                  }
                }}
                className="dossier-seg"
              >
                <i style={{ width: `${progressWidths[idx] || 0}%` }} />
              </div>
            ))}
          </div>

          {/* Compact CTA link */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-sm bg-rose-antique text-forest-deep text-xs uppercase tracking-wider font-semibold hover:bg-rose-light transition-colors focus-visible:outline-rose-antique shadow-md touch-manipulation shrink-0"
            style={{ touchAction: "manipulation" }}
            aria-label="Quero Meu Dossiê de Estilo pelo WhatsApp"
          >
            <span>Quero Meu Dossiê</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </m.div>
    </section>
  );
}
