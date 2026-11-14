# 02: Fio de Alinhavo em canvas no hero

Status: resolved

**What to build:** Um componente de canvas decorativo que costura o contorno de um manequim de moulage com um vestido alinhavado, em rosa antigo, sobre o fundo verde floresta. Depois da entrada, o fio reage ao cursor como um fio puxado que se acomoda com mola amortecida.

**Blocked by:** 01

- [x] Caminho do desenho (manequim + vestido alinhavado) em traço único fino, com trechos tracejados de alinhavo.
- [x] Entrada: costura progressiva em cerca de 2,5 s.
- [x] Desktop: pontos próximos ao cursor deslocam levemente e voltam com mola criticamente amortecida, sem overshoot visível.
- [x] Toque: sem interação por toque; leve balanço ligado à rolagem.
- [x] `prefers-reduced-motion`: desenho completo e estático.
- [x] Pausa o loop fora da viewport (`IntersectionObserver`) e com a aba oculta (`visibilitychange`).
- [x] `devicePixelRatio` limitado a 2; redimensiona com `ResizeObserver`.
- [x] Canvas com `aria-hidden`; fallback estático (SVG) antes da hidratação, sem CLS.
- [x] Teste unitário da física da mola (converge ao repouso sem ultrapassar).
