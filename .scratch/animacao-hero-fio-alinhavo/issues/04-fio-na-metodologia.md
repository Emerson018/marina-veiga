# 04: Fio de Alinhavo costurando a Metodologia

Status: resolved

**What to build:** No `ProcessSteps.tsx`, uma linha fina em rosa antigo, com trechos de alinhavo, que liga as três etapas e é desenhada conforme a rolagem. É discreta e não compete com o hero.

**Blocked by:** 02 (reaproveitar a linguagem visual do fio)

- [x] Linha em SVG (`pathLength` ligado a `useScroll`), não canvas.
- [x] Vertical no celular, acompanhando o empilhamento dos passos.
- [x] Com `prefers-reduced-motion`, a linha aparece completa.
- [x] Revelação Sequencial existente dos passos preservada.

## Comments

- A linha é um pontilhado em CSS revelado por duas translações opostas, não um SVG com `pathLength`: o `pathLength` usa o próprio `stroke-dasharray` e apagaria o pontilhado de alinhavo.
