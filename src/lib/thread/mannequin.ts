/**
 * Desenho do Fio de Alinhavo: manequim de moulage com um vestido alinhavado.
 * Coordenadas na caixa 360 x 440. Só comandos absolutos (M, L, C),
 * para que o espelhamento horizontal seja uma troca simples de x.
 */

export const THREAD_VIEWBOX = { width: 360, height: 440 } as const;

export interface ThreadStroke {
  id: string;
  d: string;
  /** Pontilhado de alinhavo em vez de traço contínuo. */
  basted?: boolean;
  /** Espessura relativa do traço. */
  weight?: number;
  /** Janela da costura de entrada, em fração do tempo total (0 a 1). */
  start: number;
  end: number;
  /** Quanto o trecho cede ao cursor (0 = rígido, como a base). */
  pull: number;
  /** Quanto o trecho balança com a rolagem. */
  sway: number;
}

function mirror(d: string): string {
  let coordIndex = 0;
  return d.replace(/[MLC]|-?\d+(?:\.\d+)?/g, (token) => {
    if (/[MLC]/.test(token)) {
      coordIndex = 0;
      return token;
    }
    const isX = coordIndex++ % 2 === 0;
    return isX ? String(THREAD_VIEWBOX.width - Number(token)) : token;
  });
}

const OUTLINE_LEFT =
  "M164 58 C162 72 150 80 120 90 C113 93 111 99 114 106 " +
  "C120 122 122 136 118 150 C113 168 118 198 132 222 " +
  "C136 240 114 258 112 300 C106 330 94 352 84 372";

const NECKLINE_LEFT = "M149 80 C158 108 170 124 180 131";

const SEAM_LEFT =
  "M134 87 C138 130 150 180 153 228 C150 280 138 330 128 375";

export const THREAD_STROKES: ThreadStroke[] = [
  {
    id: "finial",
    d: "M175 34 C175 27 185 27 185 34 C185 41 175 41 175 34 M180 41 L180 50",
    start: 0,
    end: 0.1,
    pull: 0.4,
    sway: 0,
  },
  {
    id: "neck-cap",
    d: "M160 56 C160 48 200 48 200 56 C200 64 160 64 160 56",
    start: 0.04,
    end: 0.16,
    pull: 0.4,
    sway: 0,
  },
  { id: "outline-left", d: OUTLINE_LEFT, start: 0.1, end: 0.58, pull: 1, sway: 1 },
  {
    id: "outline-right",
    d: mirror(OUTLINE_LEFT),
    start: 0.1,
    end: 0.58,
    pull: 1,
    sway: 1,
  },
  { id: "neckline-left", d: NECKLINE_LEFT, start: 0.3, end: 0.46, pull: 1, sway: 0.4 },
  {
    id: "neckline-right",
    d: mirror(NECKLINE_LEFT),
    start: 0.3,
    end: 0.46,
    pull: 1,
    sway: 0.4,
  },
  {
    id: "waist-tape",
    d: "M132 222 C152 232 208 232 228 222",
    start: 0.44,
    end: 0.58,
    pull: 1,
    sway: 0.4,
  },
  {
    id: "hem",
    d: "M84 372 C110 384 130 366 156 378 C176 386 190 368 212 378 C236 388 252 366 276 372",
    start: 0.54,
    end: 0.74,
    pull: 1,
    sway: 1.2,
  },
  {
    id: "center-front",
    d: "M180 131 L180 378",
    basted: true,
    start: 0.5,
    end: 0.84,
    pull: 1,
    sway: 1,
  },
  { id: "seam-left", d: SEAM_LEFT, basted: true, start: 0.54, end: 0.88, pull: 1, sway: 1 },
  {
    id: "seam-right",
    d: mirror(SEAM_LEFT),
    basted: true,
    start: 0.54,
    end: 0.88,
    pull: 1,
    sway: 1,
  },
  {
    id: "stand",
    d: "M180 381 L180 412 M150 428 C160 411 200 411 210 428 M138 428 L222 428",
    start: 0.7,
    end: 0.88,
    pull: 0,
    sway: 0,
  },
  {
    id: "loose-thread",
    d: "M236 381 C252 404 300 388 304 344 C308 304 334 296 328 252",
    start: 0.8,
    end: 0.97,
    pull: 1.5,
    sway: 1.6,
  },
  {
    id: "needle",
    d: "M328 252 L319 212",
    weight: 1.9,
    start: 0.95,
    end: 1,
    pull: 1.5,
    sway: 1.6,
  },
];
