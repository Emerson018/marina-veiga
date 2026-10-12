# Spec: Catálogo Digital Mariana Veiga Consultoria

Status: resolved


## Problem Statement

Mulheres profissionais e executivas buscam aprimorar sua imagem pessoal e alinhar seu dress code corporativo para transmitir autoridade e elegância, mas encontram dificuldades em entender o escopo de uma consultoria de imagem, os benefícios práticos e os valores envolvidos. Ao mesmo tempo, a consultora precisa de uma vitrine digital sofisticada que posicione sua marca com autoridade (*quiet luxury*), exponha claramente seus serviços e filtre leads qualificados diretamente para o WhatsApp, eliminando a fricção de carrinhos de compras desnecessários para um serviço de alto valor.

## Solution

Desenvolver uma landing page e catálogo digital editorial para Mariana Veiga Consultoria, construída em Next.js com Tailwind CSS, seguindo rigorosamente as *Vercel Web Interface Guidelines*. A aplicação apresenta uma experiência imersiva de alto padrão nas cores verde-floresta (`#223829`) e rosa antigo (`#D49FAB` / `#F2DCE1`), tipografia refinada (*Italiana* e *Montserrat*), vitrine com 5 serviços detalhados e valores visíveis, e conversão direta via links inteligentes contextualizados para o WhatsApp.

## User Stories

1. As a cliente, I want to acessar uma página inicial com estética editorial e refinada, so that eu perceba imediatamente o alto padrão e autoridade da consultoria de Mariana Veiga.
2. As a cliente, I want to ler o manifesto e apresentação profissional de Mariana Veiga, so that eu compreenda sua abordagem sobre estilo pessoal autêntico e dress code corporativo.
3. As a cliente, I want to visualizar um catálogo claro e organizado de serviços, so that eu conheça todas as opções de consultoria disponíveis.
4. As a cliente, I want to ver o escopo detalhado e benefícios da Análise de Estilo & Biótipo, so that eu compreenda como minhas proporções e silhueta serão valorizadas.
5. As a cliente, I want to ver o escopo da Revitalização de Guarda-Roupa (Closet Detox), so that eu saiba como minhas peças existentes serão otimizadas estrategicamente.
6. As a cliente, I want to ver o escopo do Personal Shopper, so that eu entenda como funciona a assessoria para compras certeiras e inteligentes.
7. As a cliente, I want to ver o escopo da Consultoria Completa 360°, so that eu conheça a jornada integral que abrange todas as etapas do processo.
8. As a cliente, I want to ver a apresentação em destaque do Dossiê de Estilo, so that eu valorize o entregável exclusivo e personalizado que receberei.
9. As a cliente, I want to visualizar os valores e condições de pagamento claramente nos cards, so that eu tome uma decisão consciente de investimento sem surpresas.
10. As a cliente, I want to clicar no botão de interesse de um card específico, so that meu WhatsApp abra com uma mensagem pronta mencionando exatamente o serviço que escolhi.
11. As a cliente, I want to encontrar um botão flutuante de WhatsApp acessível a qualquer momento, so that eu possa tirar dúvidas gerais de forma rápida.
12. As a cliente, I want to entender como funciona o processo de atendimento em 3 etapas simples, so that eu saiba o que esperar após o primeiro contato.
13. As a cliente, I want to consultar uma seção de perguntas frequentes (FAQ), so that eu esclareça dúvidas sobre atendimento híbrido (presencial vs online), duração e agendamento.
14. As a cliente com deficiência visual ou usando leitores de tela, I want to navegar por uma página com HTML semântico e rótulos ARIA adequados, so that eu tenha uma experiência inclusiva e fluida.
15. As a cliente acessando pelo celular, I want to navegar com toque responsivo imediato sem delays de zoom duplo, so that a navegação mobile seja ágil e prazerosa.
16. As a cliente navegando por teclado, I want to ver anéis de foco visíveis em todos os botões e links interativos, so that eu nunca me perca durante a navegação.

## Implementation Decisions

- **Arquitetura da Aplicação**: Next.js (App Router) com renderização estática e estilização via Tailwind CSS.
- **Design System e Paleta Restrita**:
  - Fundo principal: `#223829` (Verde-floresta escuro).
  - Títulos, detalhes e bordas finas: `#D49FAB` (Rosa antigo).
  - Textos de leitura longa: `#F2DCE1` (Rosa claro para contraste e legibilidade WCAG).
  - Tipografia: *Italiana* (Google Fonts) para títulos display; *Montserrat* em caixa alta com tracking aberto para subtítulos, menus e tags.
- **Módulo de Dados dos Serviços (`services.ts`)**:
  - Única fonte de verdade para os serviços do catálogo, facilitando edição futura de preços e descrições sem tocar no layout.
  - Cada serviço conterá: `id`, `title`, `tagline`, `description`, `deliverables` (lista), `price` (placeholder formatado com `tabular-nums`), `badge` (ex.: "Mais Escolhido"), e `whatsappMessage`.
- **Módulo de Conversão para WhatsApp (`whatsapp.ts`)**:
  - Função utilitária pura que gera links `https://wa.me/55...` com codificação segura de caracteres (`encodeURIComponent`).
  - Número de WhatsApp configurado centralmente como constante/variável de ambiente.
- **Componentes Modulares**:
  - `Header`: Barra de navegação com logo tipográfico e âncoras.
  - `Hero`: Apresentação de impacto e chamada para o catálogo.
  - `AboutManifesto`: Seção biográfica e de autoridade executiva.
  - `CatalogGrid` e `ServiceCard`: Vitrine responsiva com cartões de alta elegância e botões individuais de WhatsApp.
  - `DossierFeature`: Showcase visual do entregável Dossiê de Estilo.
  - `ProcessSteps`: Etapas do processo de atendimento.
  - `FaqAccordion`: Acordeão acessível com perguntas e respostas essenciais.
  - `Footer`: Rodapé editorial com links e copyright.
  - `FloatingWhatsApp`: Botão de contato flutuante discreto com `aria-label`.
- **Aderência às Web Interface Guidelines**:
  - Sem uso de `outline: none` sem `:focus-visible`.
  - Imagens com dimensões explícitas para evitar CLS.
  - `touch-action: manipulation` em todos os elementos clicáveis.
  - Links externos com `target="_blank"` e `rel="noopener noreferrer"`.

## Testing Decisions

- **Costura de Teste Principal (Primary Seam)**: A interface de ponta a ponta / integração de componentes renderizada no navegador (`@testing-library/react` ou Vitest/Playwright).
- **Comportamentos Externos a Validar**:
  1. *Renderização Completa*: Todos os 5 serviços são exibidos com título, descrição, entregáveis e valores tabulares.
  2. *Geração de Links de Conversão*: Ao clicar no CTA de cada card de serviço, o link gerado aponta para `https://wa.me/` com a mensagem pré-preenchida exata daquele serviço.
  3. *Acessibilidade e Navegação*: Todos os botões e links possuem nomes acessíveis (`aria-label` ou texto visível) e suporte a foco por teclado.
  4. *FAQ Interativo*: Abrir e fechar itens do acordeão exibe e oculta as respostas correspondentes mantendo os atributos ARIA corretos.

## Out of Scope

- Gateway de pagamento online, checkout automatizado ou carrinho de compras (decisão de negócio registrada no ADR-0001).
- Sistema de login ou autenticação de clientes.
- Agendamento de calendário automatizado integrado com APIs externas nesta primeira versão.
- Análise de coloração pessoal (deliberadamente fora do escopo conforme alinhamento de posicionamento).

## Further Notes

- Todas as definições de termos foram alinhadas com o [GLOSSARY.md](../../GLOSSARY.md).
- Decisão sobre conversão direta via WhatsApp sem gateway registrada no [ADR-0001](../../docs/adr/0001-whatsapp-direct-funnel-architecture.md).
