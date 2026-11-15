# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Público Primário (B2C):** Mulheres que querem se vestir com segurança e coerência com quem são, em todas as frentes da vida: trabalho, rotina, lazer, eventos e viagens. Executivas e profissionais seniores são um público importante, mas um entre outros; a consultoria não se restringe ao contexto corporativo.
- **Público Secundário (B2B):** Empresas, RH e lideranças interessadas em palestras in-company sobre dress code corporativo e consultoria para equipes (citado no catálogo como atendimento sob consulta).

## Product Purpose

Oferecer consultoria de imagem pessoal com foco em autonomia, elegância e autoconfiança. O site institucional e o catálogo apresentam os formatos de consultoria com preço, entregáveis e prazo, e conduzem a uma conversa personalizada pelo WhatsApp. Sucesso é a visitante entender qual serviço resolve a sua situação e iniciar o contato.

## Positioning

Consultoria de imagem pessoal ampla, ancorada na vida real da cliente: trabalha com as peças que ela já tem, com o seu corpo e com as ocasiões que ela de fato vive. O diferencial é o **Dossiê de Estilo**, um mapa visual de looks montado a partir das próprias peças da cliente (organizado por ocasião, com roteiros de mala), que dá independência para decidir sozinha depois.

## Operating Context

- **Jornada de contratação:** exploração autônoma no site (catálogo com preços, entregáveis, "como funciona" e modalidade) e contato consultivo direto via WhatsApp, com mensagem pré-preenchida por serviço.
- **Formato de entrega:** três modalidades coexistem:
  - **100% online:** Dossiê de Estilo (a cliente fotografa as peças seguindo um guia, envia por WhatsApp ou e-mail e recebe o dossiê digital em até 7 dias) e Styling para Eventos. Atendem clientes fora da cidade da Mariana.
  - **Presencial:** Closet Detox (sessão de 4h) e Personal Shopper (4h de acompanhamento).
  - **Híbrido:** Análise de Estilo & Biotipo (2 encontros) e Consultoria 360° (4 semanas, com 30 dias de acompanhamento pelo WhatsApp).
- **Vagas:** atendimento com número restrito de vagas mensais (`src/data/policies.ts`).

## Capabilities and Constraints

- **Catálogo de 6 serviços** (fonte da verdade: `src/data/services.ts`): Dossiê de Estilo, Consultoria 360° (destaque, pacote com economia em relação aos avulsos), Análise de Estilo & Biotipo, Closet Detox, Styling para Eventos e Personal Shopper. Cada um tem entregáveis expansíveis, preço, parcelamento, condição no Pix, duração e modalidade.
- **Fora do portfólio:** Coloração Pessoal e Visagismo não são oferecidos. A FAQ explica essa escolha deliberada (foco em proporções, caimento e tecidos em vez de cartela de cores). Não reintroduzir sem confirmação.
- **Showcase do Dossiê de Estilo:** apresentação interativa dos pilares do dossiê (`src/components/DossierShowcase.tsx`).
- **Sem checkout:** não há carrinho nem pagamento no site; a conversão é 100% consultiva via WhatsApp.
- **Mobile:** navegação tátil com arrasto/swipe no catálogo, alvos de toque confortáveis e carregamento rápido.
- **Copy institucional:** já reflete o posicionamento amplo (título, rodapé, Sobre, Processo, FAQ). As referências a dress code corporativo que ficam são intencionais: o bloco B2B do catálogo e o texto legal de `src/data/policies.ts`, que não muda sem revisão própria.

## Brand Commitments

- **Nome:** Mariana Veiga | Consultoria de Imagem & Estilo Pessoal (substitui o antigo "& Dress Code Corporativo").
- **Tom de voz:** sofisticado, seguro, acolhedor e pragmático. A Mariana fala em primeira pessoa e de forma direta ("eu monto as combinações", "você recebe"). Sem clichês de moda rápida nem afetação.
- **Cores da marca:** verde floresta profundo (`#1A2B20`, `#223829`) e rosa antigo (`#D49FAB`), já em uso no site.

## Evidence on Hand

- Fotografias de marca da Mariana Veiga em alta resolução (`src/fotos/`).
- Serviços, entregáveis, valores, parcelamento e prazos validados (`src/data/services.ts`).
- Políticas de privacidade, cancelamento e termos de serviço (`src/data/policies.ts`).
- **Ausentes:** depoimentos, casos de clientes, imprensa e números de clientes atendidas. Não inventar nenhum deles.

## Product Principles

1. **Autonomia perpétua:** a consultoria ensina a cliente a decidir sozinha; o Dossiê existe para que ela não dependa da consultora no dia a dia.
2. **Partir do que ela já tem:** o trabalho começa pelas peças, pelo corpo e pela rotina reais da cliente, não por um ideal teórico nem por compras novas.
3. **Elegância para a vida inteira:** o estilo serve ao trabalho, ao lazer, aos eventos e às viagens; nenhuma ocasião é tratada como secundária.
4. **Transparência antes do contato:** preço, entregáveis, etapas, prazo e modalidade ficam claros antes da primeira mensagem.
5. **Relacionamento humanizado:** o site informa e acolhe; a proposta e o plano acontecem individualmente, no WhatsApp.

## Accessibility & Inclusion

- Web Interface Guidelines e WCAG 2.1 AA como referência:
  - navegação completa por teclado e foco visível em todos os controles;
  - alvos de toque de no mínimo 44px, com `touch-action` adequado aos gestos de arrasto;
  - respeito a `prefers-reduced-motion`;
  - `alt` descritivo e semântica correta para leitores de tela em todos os componentes.
