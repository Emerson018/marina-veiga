"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { generateWhatsAppUrl } from "@/utils/whatsapp";
import { m } from "framer-motion";
import { VIEWPORT_ONCE, revealItem } from "@/lib/motion";

const SCENE_DURATIONS = [5000, 5000, 5000, 5000, 5000, 5000];

export default function DossierShowcase() {
  const [currentScene, setCurrentScene] = useState(0);
  const [progressWidths, setProgressWidths] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const currentSceneRef = useRef(0);
  const t0Ref = useRef(0);
  const elapsedRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const whatsAppUrl = generateWhatsAppUrl(
    "Olá Mariana! Gostaria de encomendar o meu Dossiê de Estilo."
  );

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

  useEffect(() => {
    currentSceneRef.current = 0;
    t0Ref.current = performance.now();
    elapsedRef.current = 0;

    const tick = (now: number) => {
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
        <div className="dossier-stage" id="dossier-stage" aria-live="polite">
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
              <g className="dossier-pop">
                <rect x="10" y="20" width="110" height="170" rx="6" />
                <path d="M45 60h40l12 20v70H33V80z" />
                <text x="65" y="215">Trabalho</text>
              </g>
              <g className="dossier-pop">
                <rect x="145" y="20" width="110" height="170" rx="6" />
                <path d="M180 60h40l10 25-14 8v60h-32V93l-14-8z" />
                <text x="200" y="215">Lazer</text>
              </g>
              <g className="dossier-pop">
                <rect x="280" y="20" width="110" height="170" rx="6" />
                <path d="M335 60l25 20-12 100h-26L310 80z" />
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
              <rect className="dossier-draw" x="120" y="110" width="160" height="110" rx="12" />
              <path className="dossier-draw" d="M165 110V85h70v25" />
              <circle className="fill dossier-pop" cx="160" cy="165" r="9" />
              <circle className="fill dossier-pop" cx="200" cy="165" r="9" />
              <circle className="fill dossier-pop" cx="240" cy="165" r="9" />
              <g className="dossier-pop">
                <path d="M160 156C160 90 70 90 60 50" />
                <path d="M200 156C200 80 200 70 200 40" />
                <path d="M240 156C240 90 330 90 340 50" />
              </g>
              <text x="60" y="38">Look 1</text>
              <text x="200" y="30">Look 2</text>
              <text x="340" y="38">Look 3</text>
            </svg>
          </section>

          {/* Scene 3: Pilar 3 - Silhueta &amp; Proporções */}
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

          {/* Scene 4: Pilar 4 - Digital &amp; Impresso */}
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
          {/* Interactive Progress Segments */}
          <div className="dossier-prog min-w-[100px] flex-1" role="tablist" aria-label="Etapas da apresentação">
            {SCENE_DURATIONS.map((_, idx) => (
              <div
                key={idx}
                role="tab"
                tabIndex={0}
                aria-selected={currentScene === idx}
                aria-label={`Ir para a cena ${idx + 1}`}
                onClick={() => goToScene(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToScene(idx);
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
