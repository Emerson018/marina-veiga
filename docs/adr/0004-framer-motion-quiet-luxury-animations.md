# 0004: Animações de Fluidez Editorial com Framer Motion (LazyMotion)

Decidimos enriquecer a experiência visual do site integrando a biblioteca **Framer Motion** com carregamento otimizado (**LazyMotion** e **domAnimation**), guiada pela filosofia visual de **Quiet Luxury & Fluidez Editorial**, nas seções de Metodologia, Dossiê de Estilo, FAQ e canal WhatsApp.

1. **Linguagem Visual Quiet Luxury & Curva de Seda (EaseOut Curated):**
   - Transições de 0.5s a 0.7s com curvas de desaceleração sedosas (`easeOut` / `[0.22, 1, 0.36, 1]`), evitando rebotes infantis (*spring bounciness*) e preservando o posicionamento de alta-costura.
   - **Revisão (2026-11):** molas *criticamente amortecidas* (`type: "spring"` / `useSpring` com amortecimento alto, sem overshoot visível) passam a ser permitidas para respostas físicas a cursor, toque e rolagem. O quique continua proibido. O Framer Motion segue como única biblioteca de animação; GSAP foi considerado e descartado para não manter dois dialetos de movimento nem tocar no Catálogo e no Dossiê. Canvas é reservado a um único elemento assinatura no hero.
   - Aplicação de revelação sequencial cadenciada (*stagger reveal*) nos 3 passos da metodologia (`01`, `02`, `03`) e brilho acetinado (*sheen*) na moldura do Dossiê.

2. **Gatilho Único por Rolagem (`viewport={{ once: true }}`):**
   - As animações são acionadas uma única vez quando entram na área visível da tela (`amount: 0.2`).
   - Garante estabilidade na leitura para clientes que sobem e descem a página para comparar serviços e valores, sem recarregamentos intrusivos ou interrupções visuais.

3. **Arquitetura de Desempenho & Acessibilidade:**
   - Utilização de `LazyMotion` com `domAnimation` para manter o bundle enxuto (<35% do tamanho total da biblioteca padrão).
   - Respeito irrestrito à diretiva do sistema operacional `prefers-reduced-motion` (desativando animações pesadas para usuárias que necessitam de redução de movimento).
   - Acordeom do FAQ enriquecido com transições suaves de altura e rotação de Chevron sem quebras de layout (*layout shift*).

Garante uma experiência de navegação viva, altamente tátil e sofisticada para clientes executivas, com alto desempenho móvel e solidez técnica.
