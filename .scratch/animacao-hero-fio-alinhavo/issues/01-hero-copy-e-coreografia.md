# 01: Hero com texto novo e coreografia de entrada

Status: resolved

**What to build:** Reescrever o título e a bio do hero (`Hero.tsx` e `HeroBio.tsx`) para o posicionamento amplo e coreografar a entrada com Framer Motion: título, bio, CTAs e faixa de sinais, em Revelação Sequencial. A coluna da foto é substituída por um contêiner reservado ao Fio de Alinhavo (issue 02), com dimensões fixas para evitar CLS.

**Blocked by:** nenhuma

- [x] Título: "Elegância que nasce do que você já tem."
- [x] Bio nova, com destaque em itálico em "decidir sozinha" (texto na spec).
- [x] Remover "quiet luxury", "vestir sua ambição" e "Autoridade Feminina" do hero.
- [x] Faixa de sinais mantida, com entrada sequencial e sem contador.
- [x] Animações em Framer Motion (curva `[0.22, 1, 0.36, 1]` ou mola amortecida), substituindo as keyframes CSS `hero-animated-*`.
- [x] Botões com microinteração de mola amortecida no hover e no toque, sem quique.
- [x] `prefers-reduced-motion` respeitado (já garantido pelo `MotionConfig reducedMotion="user"`).
- [x] Contêiner do fio com proporção fixa, ocupando a coluna da antiga foto.
